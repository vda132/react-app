using DB.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DAL;

public class ApplicationDbContext : IdentityDbContext<EntityUser, EntityRole, string>
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        ConfigureTables(builder);
        BuildRelations(builder);

    }
    public static void ConfigureTables(ModelBuilder builder)
    {
        builder.Entity<EntityUser>(entity =>
        {
            entity.ToTable(name: "Users");
        });
        builder.Entity<EntityRole>(entity =>
        {
            entity.ToTable(name: "Roles");
        });

        builder.Entity<IdentityUserRole<string>>(entity =>
        {
            entity.ToTable("UsersRoles");
        });

        builder.Entity<IdentityUserClaim<string>>(entity =>
        {
            entity.ToTable("UsersPermissions");
        });

        builder.Entity<IdentityUserLogin<string>>(entity =>
        {
            entity.ToTable("UserLogins");
        });

        builder.Entity<IdentityRoleClaim<string>>(entity =>
        {
            entity.ToTable("RolePermissions");
        });

        builder.Entity<IdentityUserToken<string>>(entity =>
        {
            entity.ToTable("UserTokens");
        });

    }
    private static void BuildRelations(ModelBuilder builder)
    {
        //const string priceDecimalType = "decimal(18,2)";

        builder.Entity<EntityUser>()
            .HasMany(u => u.Claims)
            .WithOne()
            .HasForeignKey(c => c.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        builder.Entity<EntityUser>().Property(el => el.JobTitle).IsRequired(false);
        builder.Entity<EntityUser>().Property(el => el.Configuration).IsRequired(false);

        builder.Entity<EntityUser>()
            .HasMany(u => u.Roles)
            .WithOne()
            .HasForeignKey(r => r.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<EntityRole>()
            .HasMany(r => r.Claims)
            .WithOne()
            .HasForeignKey(c => c.RoleId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<EntityRole>()
            .HasMany(r => r.Users)
            .WithOne()
            .HasForeignKey(r => r.RoleId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
