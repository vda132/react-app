namespace DB.Models;

public class NotificationUser
{
    public Guid NotificationId { get; set; }
    public string UserId { get; set; }
    public bool IsRead { get; set; }

    public Notification Notification { get; set; }
}