using Contracts.Business;
using Contracts.Data;
using DAL;
using DTO;
using DTO.Permissions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Roles = DTO.Constants.RolesConstants;

namespace BLL;

public class DatabaseInitializer : IDatabaseInitializer
{
    private readonly ApplicationDbContext _context;
    private readonly IAccountService _accountManager;
    private readonly ILogger<DatabaseInitializer> _logger;

    public DatabaseInitializer(ApplicationDbContext context, IAccountService accountManager, ILogger<DatabaseInitializer> logger)
    {
        _context = context;
        _accountManager = accountManager;
        _logger = logger;
    }

    public async Task SeedAsync()
    {
        await _context.Database.MigrateAsync().ConfigureAwait(false);
        await SeedDefaultUsersAsync();
    }

    private async Task SeedDefaultUsersAsync()
    {
        if (!await _context.Users.AnyAsync())
        {
            _logger.LogInformation("Generating inbuilt accounts");

            const string superAdminRoleName = Roles.SuperAdminRole;
            const string adminRoleName = Roles.AdminRole;
            const string marketRoleName = Roles.MarketRole;
            const string marketAdminRoleName = Roles.MarketAdminRole;
            const string userRoleName = Roles.UserRole;

            await EnsureRoleAsync(superAdminRoleName, "Super administrator", ApplicationPermissions.GetSuperAdminPermissions());
            await EnsureRoleAsync(adminRoleName, "Platform administrator", ApplicationPermissions.GetSuperAdminPermissions());
            await EnsureRoleAsync(marketRoleName, "Market super administrator", ApplicationPermissions.GetSuperAdminPermissions());
            await EnsureRoleAsync(marketAdminRoleName, "Market administrator", ApplicationPermissions.GetSuperAdminPermissions());
            await EnsureRoleAsync(userRoleName, "Default user", new string[] { });

            await CreateUserAsync("super-admin", "tempP@ss123", "Super Administrator", "super-admin@gmail.com", "+1 (123) 000-0000", new string[] { superAdminRoleName });
            await CreateUserAsync("admin", "tempP@ss123", "Platform Administrator", "admin@gmail.com", "+1 (123) 000-0001", new string[] { adminRoleName });
            await CreateUserAsync("market", "tempP@ss123", "Market Administrator", "market@gmail.com", "+1 (123) 000-0002", new string[] { marketRoleName });
            await CreateUserAsync("market-admin", "tempP@ss123", "Market administrator user", "market-admin@gmail.com", "+1 (123) 000-0003", new string[] { marketAdminRoleName });
            await CreateUserAsync("user", "tempP@ss123", "Standard User", "user@gmail.com", "+1 (123) 000-0004", new string[] { userRoleName });

            _logger.LogInformation("Inbuilt account generation completed");
        }
    }

    private async Task EnsureRoleAsync(string roleName, string description, string[] claims)
    {
        if ((await _accountManager.GetRoleByNameAsync(roleName)) == null)
        {
            _logger.LogInformation($"Generating default role: {roleName}");

            var role = new DtoRole 
            {
                Name = roleName,
                Description = description,
            };

            var result = await _accountManager.CreateRoleAsync(role, claims);

            if (!result.Succeeded)
                throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Errors)}");
        }
    }

    private async Task<(bool Succeeded, string[] Errors)> CreateUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
    {
        _logger.LogInformation($"Generating default user: {userName}");

        var applicationUser = new DtoUser
        {
            UserName = userName,
            FullName = fullName,
            Email = email,
            PhoneNumber = phoneNumber,
            IsEnabled = true
        };

        var result = await _accountManager.CreateUserAsync(applicationUser, roles, password);

        if (!result.Succeeded)
            throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Errors)}");

        return result;
    }
}
