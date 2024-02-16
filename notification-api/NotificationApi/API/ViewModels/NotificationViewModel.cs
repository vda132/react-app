using Contracts;

namespace API.ViewModels;

public class NotificationViewModel
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsRead { get; set; } = false;
    public string? NotificationInfo { get; set; }

    public NotificationViewModel(NotificationDto dto)
    {
        Id = dto.Id;
        Title = dto.Title;
        Description = dto.Description;
        IsRead = dto.IsRead;
        NotificationInfo = dto.NotificationInfo;
    }

    public NotificationDto ToDto() => 
        new NotificationDto { Id = Id, Title = Title, Description = Description, IsRead = IsRead, NotificationInfo = NotificationInfo };
}
