namespace DB.Models;

public class Notification
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string? NotificationInfo { get; set; }

    public IEnumerable<NotificationUser> NotificationUsers { get; set; }
}
