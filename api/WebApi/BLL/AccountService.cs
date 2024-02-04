using Contracts.Business;
using DAL;
using DB.Models;
using DTO;
using Microsoft.AspNetCore.Identity;
using Models;

namespace BLL;

/// <summary>
/// TODO: Add base logic for this service
/// </summary>
public class AccountService : IAccountService
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<EntityUser> _userManager;
    private readonly RoleManager<EntityRole> _roleManager;

    public AccountService(
    ApplicationDbContext context,
    UserManager<EntityUser> userManager,
    RoleManager<EntityRole> roleManager)
    {
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public Task<bool> CheckPasswordAsync(DtoRole user, string password)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> CreateRoleAsync(DtoRole role, IEnumerable<string> claims)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> CreateUserAsync(DtoUser user, IEnumerable<string> roles, string password)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(DtoRole role)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(string roleName)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(DtoUser user)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<DtoRole> GetRoleByIdAsync(string roleId)
    {
        throw new NotImplementedException();
    }

    public Task<DtoRole> GetRoleByNameAsync(string roleName)
    {
        throw new NotImplementedException();
    }

    public Task<DtoRole> GetRoleLoadRelatedAsync(string roleName)
    {
        throw new NotImplementedException();
    }

    public Task<List<DtoRole>> GetRolesLoadRelatedAsync(int page, int pageSize)
    {
        throw new NotImplementedException();
    }

    public Task<(DtoUser User, string[] Roles)?> GetUserAndRolesAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<DtoUser> GetUserByEmailAsync(string email)
    {
        throw new NotImplementedException();
    }

    public Task<DtoUser> GetUserByIdAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<DtoUser> GetUserByUserNameAsync(string userName)
    {
        throw new NotImplementedException();
    }

    public Task<IList<string>> GetUserRolesAsync(DtoUser user)
    {
        throw new NotImplementedException();
    }

    public Task<List<(DtoUser User, string[] Roles)>> GetUsersAndRolesAsync(int page, int pageSize)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> ResetPasswordAsync(DtoUser user, string newPassword)
    {
        throw new NotImplementedException();
    }

    public Task<bool> TestCanDeleteRoleAsync(string roleId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> TestCanDeleteUserAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(DtoUser user, string currentPassword, string newPassword)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> UpdateRoleAsync(DtoRole role, IEnumerable<string> claims)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(DtoUser user)
    {
        throw new NotImplementedException();
    }

    public Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(DtoUser user, IEnumerable<string> roles)
    {
        throw new NotImplementedException();
    }
}
