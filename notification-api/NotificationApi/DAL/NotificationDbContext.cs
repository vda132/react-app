using DB.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL;

public class NotificationDbContext : DbContext
{
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<UserRegistrationToken> UserRegistrationTokens { get; set; }
    public DbSet<NotificationUser> NotificationUsers { get; set; }

    public NotificationDbContext(DbContextOptions<NotificationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<NotificationUser>().HasKey(el => new { el.UserId, el.NotificationId });
        modelBuilder.Entity<UserRegistrationToken>().HasKey(el => new { el.UserId, el.RegistrationToken });
    }
}
