using Contracts;

namespace Services;
public interface INotificationService
{
    Task RegisterUserTokenAsync(string userId, string userDeviceToken);
    Task DeleteUserTokenAsync(string userId, string userDeviceToken);
    Task SendNotificationAsync(NotificationDto notificationDto, string senderId, CancellationToken cancellationToken);
    Task SendNotificationToUserAsync(NotificationDto notificationDto, string senderId, string receiverId);
    Task MarkNotificationAsReadAsync(Guid notificationId, string userId, string userDeviceToken);
}
