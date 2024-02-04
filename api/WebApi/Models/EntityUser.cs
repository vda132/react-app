using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Models;

public class EntityUser : IdentityUser
{
    public virtual string FriendlyName
    {
        get
        {
            var friendlyName = string.IsNullOrWhiteSpace(FullName) ? UserName : FullName;

            if (!string.IsNullOrWhiteSpace(JobTitle))
                friendlyName = $"{JobTitle} {friendlyName}";

            return friendlyName!;
        }
    }
    [MaxLength(50)]
    public string JobTitle { get; set; }
    public string FullName { get; set; }

    public string Configuration { get; set; }

    public bool IsEnabled { get; set; }

    public bool IsLockedOut => LockoutEnabled && LockoutEnd >= DateTimeOffset.UtcNow;

    /// <summary>
    /// Navigation property for the roles this user belongs to.
    /// </summary>
    public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

    /// <summary>
    /// Navigation property for the claims this user possesses.
    /// </summary>
    public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }
}
