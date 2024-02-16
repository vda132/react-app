using AutoMapper;
using Contracts.Business;
using DAL;
using DB.Models;
using DTO;
using DTO.Constants;
using DTO.Permissions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Models;
using System.Security.Claims;
using WebClient;

namespace BLL;

/// <summary>
/// TODO: Add logic for Test before delete for users and roles
/// </summary>
public class AccountService : IAccountService
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<EntityUser> _userManager;
    private readonly RoleManager<EntityRole> _roleManager;
    private readonly ContentManagerServiceResolver _contenetManagerResolver;
    private readonly IMapper _mapper;
    private readonly UserConfig _userConfig;
    private const string folderPath = "users/avatars";

    public AccountService(
    ApplicationDbContext context,
    UserManager<EntityUser> userManager,
    RoleManager<EntityRole> roleManager,
    IMapper mapper,
    IOptions<AppSettings> config,
    ContentManagerServiceResolver contenetManagerResolver)
    {
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
        _mapper = mapper;
        _contenetManagerResolver = contenetManagerResolver;
        _userConfig = config.Value.ContentConfig.UserConfig;
    }

    public async Task<bool> CheckPasswordAsync(DtoRole user, string password)
    {
        var userEntity = _mapper.Map<EntityUser>(user);
        var result = await _userManager.CheckPasswordAsync(userEntity, password);
        return result;
    }

    public async Task<(bool Succeeded, string[] Errors)> CreateRoleAsync(DtoRole role, IEnumerable<string> claims)
    {
        claims ??= new string[] { };

        var roleEntity = _mapper.Map<EntityRole>(role); 
        var invalidClaims = claims.Where(el => ApplicationPermissions.GetPermissionByValue(el) == null).ToArray();
        
        if (invalidClaims.Any())
            return (false, new[] { $"The following claim types are invalid: {string.Join(", ", invalidClaims)}" });

        var result = await _roleManager.CreateAsync(roleEntity);

        if (!result.Succeeded)
            return (false, result.Errors.Select(el => el.Description).ToArray());

        foreach (var claim in claims)
        {
            result = await _roleManager.AddClaimAsync(roleEntity, new Claim(ClaimConstants.Permission, ApplicationPermissions.GetPermissionByValue(claim)));
            if (!result.Succeeded)
            {
                await DeleteRoleAsync(roleEntity);
                return (false, result.Errors.Select(el => el.Description).ToArray());
            }
        }

        return (true, new string[] { });
    }

    public async Task<(bool Succeeded, string[] Errors)> CreateUserAsync(DtoUser user, IEnumerable<string> roles, string password)
    {
        var userEntity = _mapper.Map<EntityUser>(user);
        var result = await _userManager.CreateAsync(userEntity, password);
        if (!result.Succeeded)
            return (false, result.Errors.Select(e => e.Description).ToArray());

        userEntity = await _userManager.FindByNameAsync(userEntity.UserName);

        user.Id = userEntity.Id;
        try
        {
            result = await _userManager.AddToRolesAsync(userEntity, roles.Distinct());
        }
        catch
        {
            await DeleteUserAsync(userEntity);
            throw;
        }

        if (!result.Succeeded)
        {
            await DeleteUserAsync(userEntity);
            return (false, result.Errors.Select(e => e.Description).ToArray());
        }

        return (true, new string[] { });
    }

    public async Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(DtoRole role)
    {
        var roleEntity = _mapper.Map<EntityRole>(role);
        var result = await DeleteRoleAsync(roleEntity);

        return result;
    }

    public async Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(string roleName)
    {
        var roleEntity = await _roleManager.FindByNameAsync(roleName);
        var result = await DeleteRoleAsync(roleEntity);

        return result;
    }

    public async Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(DtoUser user)
    {
        var userEntity = _mapper.Map<EntityUser>(user);
        var result = await DeleteUserAsync(userEntity);

        return result;
    }

    public async Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user != null)
            return await DeleteUserAsync(user);

        return (true, new string[] { });
    }

    public async Task<DtoRole> GetRoleByIdAsync(string roleId)
    {
        var role = await _roleManager.FindByIdAsync(roleId);
        var result = _mapper.Map<DtoRole>(role);
        return result;
    }

    public async Task<DtoRole> GetRoleByNameAsync(string roleName)
    {
        var role = await _roleManager.FindByNameAsync(roleName);
        var result = _mapper.Map<DtoRole>(role);
        return result;
    }

    public async Task<DtoRole> GetRoleLoadRelatedAsync(string roleName)
    {
        var roles = await _context
            .Roles
            .Where(el => el.Name == roleName)
            .Include(el => el.Users)
            .Include(el => el.Claims)
            .AsSingleQuery()
            .SingleOrDefaultAsync();
        var result = _mapper.Map<DtoRole>(roles);
        
        return result;
    }

    public async Task<List<DtoRole>> GetRolesLoadRelatedAsync(int page, int pageSize)
    {
        var roles = await _context
            .Roles
            .Include(el => el.Users)
            .Include(el => el.Claims)
            .AsSingleQuery()
            .ToListAsync();
        var result = _mapper.Map<List<DtoRole>>(roles);

        return result;
    }

    public async Task<(DtoUser User, string[] Roles)?> GetUserAndRolesAsync(string userId)
    {
        var user = await _context
            .Users.Include(u => u.Roles)
            .Where(u => u.Id == userId)
            .SingleOrDefaultAsync();

        if (user is null) 
            return null;

        var userRoleIds = user.Roles.Select(el => el.RoleId).ToList();
        var roles = await _context.Roles.Where(el => userRoleIds.Contains(el.Id)).Select(el => el.Name).ToArrayAsync();

        var userResult = _mapper.Map<DtoUser>(user);
        ApplyContentPath(userResult);

        return (userResult, roles);
    }

    public async Task<DtoUser> GetUserByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        var result = _mapper.Map<DtoUser>(user);

        return result;
    }

    public async Task<DtoUser> GetUserByIdAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        var result = _mapper.Map<DtoUser>(user);
        ApplyContentPath(result);

        return result;
    }

    public async Task<DtoUser> GetUserByUserNameAsync(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        var result = _mapper.Map<DtoUser>(user);

        return result;
    }

    public async Task<IList<string>> GetUserRolesAsync(DtoUser user)
    {
        var userEntity = _mapper.Map<EntityUser>(user);
        var roles = await _userManager.GetRolesAsync(userEntity);

        return roles;
    }

    public async Task<List<(DtoUser User, string[] Roles)>> GetUsersAndRolesAsync(int page, int pageSize)
    {
        IQueryable<EntityUser> usersQuery = _context.Users.Include(el => el.Roles);

        if (page > 0)
            usersQuery = usersQuery.Skip((page - 1) * pageSize);

        if (pageSize > -1)
            usersQuery = usersQuery.Take(pageSize);

        var users = await usersQuery.ToListAsync();
        var userRoleIds = users.SelectMany(u => u.Roles, (u, r) => r.RoleId).ToList();
        var roles = await _context.Roles
                .Where(r => userRoleIds.Contains(r.Id))
                .ToArrayAsync();

        return users
               .Select(u => (_mapper.Map<DtoUser>(u), roles.Where(r => u.Roles.Select(ur => ur.RoleId).Contains(r.Id)).Select(r => r.Name).ToArray()))
               .ToList();
    }

    public async Task<(bool Succeeded, string[] Errors)> ResetPasswordAsync(DtoUser user, string newPassword)
    {
        var userEntity = await _userManager.FindByIdAsync(user.Id);
        var resetToken = await _userManager.GeneratePasswordResetTokenAsync(userEntity!);
        var result = await _userManager.ResetPasswordAsync(userEntity!, resetToken, newPassword);

        if (!result.Succeeded)
            return (false, result.Errors.Select(e => e.Description).ToArray());

        return (true, new string[] { });
    }

    public Task<bool> TestCanDeleteRoleAsync(string roleId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> TestCanDeleteUserAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public async Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(DtoUser user, string currentPassword, string newPassword)
    {
        var userEntity = await _userManager.FindByIdAsync(user.Id);
        var result = await _userManager.ChangePasswordAsync(userEntity, currentPassword, newPassword);
        if (!result.Succeeded)
            return (false, result.Errors.Select(e => e.Description).ToArray());

        return (true, new string[] { });
    }

    public async Task<(bool Succeeded, string[] Errors)> UpdateRoleAsync(DtoRole role, IEnumerable<string> claims)
    {
        var roleEntity = _mapper.Map<EntityRole>(role);
        if (claims != null)
        {
            var invalidClaims = claims.Where(c => ApplicationPermissions.GetPermissionByValue(c) == null).ToArray();
            if (invalidClaims.Any())
                return (false, new[] { $"The following claim types are invalid: {string.Join(", ", invalidClaims)}" });
        }

        var result = await _roleManager.UpdateAsync(roleEntity);
        if (!result.Succeeded)
            return (false, result.Errors.Select(e => e.Description).ToArray());

        if (claims != null)
        {
            var roleClaims = (await _roleManager.GetClaimsAsync(roleEntity)).Where(c => c.Type == ClaimConstants.Permission);
            var roleClaimValues = roleClaims.Select(c => c.Value).ToArray();

            var claimsToRemove = roleClaimValues.Except(claims).ToArray();
            var claimsToAdd = claims.Except(roleClaimValues).Distinct().ToArray();

            if (claimsToRemove.Any())
            {
                foreach (var claim in claimsToRemove)
                {
                    result = await _roleManager.RemoveClaimAsync(roleEntity, roleClaims.Where(c => c.Value == claim).FirstOrDefault());
                    if (!result.Succeeded)
                        return (false, result.Errors.Select(e => e.Description).ToArray());
                }
            }

            if (claimsToAdd.Any())
            {
                foreach (var claim in claimsToAdd)
                {
                    result = await _roleManager.AddClaimAsync(roleEntity, new Claim(ClaimConstants.Permission, ApplicationPermissions.GetPermissionByValue(claim)));
                    if (!result.Succeeded)
                        return (false, result.Errors.Select(e => e.Description).ToArray());
                }
            }
        }

        return (true, new string[] { });
    }

    public async Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(DtoUser user)
    {
        return await UpdateUserAsync(user, null);
    }

    public async Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(DtoUser user, IEnumerable<string> roles)
    {
        var userEntity = await _userManager.FindByIdAsync(user.Id);
        _mapper.Map<DtoUser, EntityUser>(user, userEntity);

        var result = await _userManager.UpdateAsync(userEntity);
        if (!result.Succeeded)
            return (false, result.Errors.Select(e => e.Description).ToArray());

        if (roles != null)
        {
            var userRoles = await _userManager.GetRolesAsync(userEntity);

            var rolesToRemove = userRoles.Except(roles).ToArray();
            var rolesToAdd = roles.Except(userRoles).Distinct().ToArray();

            if (rolesToRemove.Any())
            {
                result = await _userManager.RemoveFromRolesAsync(userEntity, rolesToRemove);
                if (!result.Succeeded)
                    return (false, result.Errors.Select(e => e.Description).ToArray());
            }

            if (rolesToAdd.Any())
            {
                result = await _userManager.AddToRolesAsync(userEntity, rolesToAdd);
                if (!result.Succeeded)
                    return (false, result.Errors.Select(e => e.Description).ToArray());
            }
        }

        return (true, new string[] { });
    }

    public async Task<(bool Succeeded, string[] Errors)> UploadAvatarAsync(string userId, IFormFile file)
    {
        var service = _contenetManagerResolver(ContentManagerKey.AWS);
        try
        {
            var result = await service.UploadFile(file, folderPath);
            var user = await _userManager.FindByIdAsync(userId);
            
            if (user == null) 
                return (false, new string[] { "User not found" });

            user.AvatarUrl = result;
            var updateResult = await _userManager.UpdateAsync(user);

            return (updateResult.Succeeded, updateResult.Errors.Select(el => el.Description).ToArray());
        }
        catch (Exception ex) 
        {
            return (false, new string[] { ex.Message });
        }
    }

    private async Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(EntityRole role)
    {
        var result = await _roleManager.DeleteAsync(role);

        return (result.Succeeded, result.Errors.Select(el => el.Description).ToArray());
    }

    private async Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(EntityUser user)
    {
        var result = await _userManager.DeleteAsync(user);

        return (result.Succeeded, result.Errors.Select(el => el.Description).ToArray());
    }

    private void ApplyContentPath(DtoUser dtoUser)
    {
        dtoUser.ContentPath = _userConfig.ImageServer;
    }
}
