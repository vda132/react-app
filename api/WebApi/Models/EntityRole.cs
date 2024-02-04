using Microsoft.AspNetCore.Identity;

namespace DB.Models;

public class EntityRole : IdentityRole
{
    public EntityRole() : base()
    { 
    }

    /// <summary>
    /// Initializes a new instance of <see cref="EntityRole"/>.
    /// </summary>
    /// <param name="roleName">The role name.</param>
    public EntityRole(string roleName) : base(roleName)
    {
    }

    /// <summary>
    /// Initializes a new instance of <see cref="EntityRole"/>.
    /// </summary>
    /// <param name="roleName">The role name.</param>
    /// <param name="description">Description of the role.</param>
    public EntityRole(string roleName, string description) : base(roleName)
    {
        Description = description;
    }

    /// <summary>
    /// Gets or sets the description for this role.
    /// </summary>
    public string Description { get; set; }
    //public string CreatedBy { get; set; }
    //public string UpdatedBy { get; set; }
    //public DateTime CreatedDate { get; set; }
    //public DateTime UpdatedDate { get; set; }

    /// <summary>
    /// Navigation property for the users in this role.
    /// </summary>
    public virtual ICollection<IdentityUserRole<string>> Users { get; set; }

    /// <summary>
    /// Navigation property for claims in this role.
    /// </summary>
    public virtual ICollection<IdentityRoleClaim<string>> Claims { get; set; }
}
