namespace Contracts;

public class NotificationDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsRead { get; set; } = false;
    public string? NotificationInfo { get; set; }
}
