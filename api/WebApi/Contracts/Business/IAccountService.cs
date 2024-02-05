using DTO;

namespace Contracts.Business;

public interface IAccountService
{
        Task<bool> CheckPasswordAsync(DtoRole user, string password);
        Task<(bool Succeeded, string[] Errors)> CreateRoleAsync(DtoRole role, IEnumerable<string> claims);
        Task<(bool Succeeded, string[] Errors)> CreateUserAsync(DtoUser user, IEnumerable<string> roles, string password);
        Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(DtoRole role);
        Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(string roleName);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(DtoUser user);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(string userId);
        Task<DtoRole> GetRoleByIdAsync(string roleId);
        Task<DtoRole> GetRoleByNameAsync(string roleName);
        Task<DtoRole> GetRoleLoadRelatedAsync(string roleName);
        Task<List<DtoRole>> GetRolesLoadRelatedAsync(int page, int pageSize);
        Task<(DtoUser User, string[] Roles)?> GetUserAndRolesAsync(string userId);
        Task<DtoUser> GetUserByEmailAsync(string email);
        Task<DtoUser> GetUserByIdAsync(string userId);
        Task<DtoUser> GetUserByUserNameAsync(string userName);
        Task<IList<string>> GetUserRolesAsync(DtoUser user);
        Task<List<(DtoUser User, string[] Roles)>> GetUsersAndRolesAsync(int page, int pageSize);
        Task<(bool Succeeded, string[] Errors)> ResetPasswordAsync(DtoUser user, string newPassword);
        Task<bool> TestCanDeleteRoleAsync(string roleId);
        Task<bool> TestCanDeleteUserAsync(string userId);
        Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(DtoUser user, string currentPassword, string newPassword);
        Task<(bool Succeeded, string[] Errors)> UpdateRoleAsync(DtoRole role, IEnumerable<string> claims);
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(DtoUser user);
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(DtoUser user, IEnumerable<string> roles);
}
