using Azure;
using Contracts;
using DAL;
using DB.Models;
using FirebaseAdmin.Messaging;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using System.Collections.ObjectModel;

namespace Services;

public class NotificationService : INotificationService
{
    private readonly NotificationDbContext _dbContext;
    private static readonly FirebaseMessaging messaging = FirebaseMessaging.DefaultInstance; 
    private const string adminTopic = "admin";


    public NotificationService(NotificationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task MarkAllNotificationsAsReadAsync(IEnumerable<Guid> notificationIds, string userId, string userDeviceToken)
    {
        var notifications = await _dbContext
            .Notifications
            .Where(el => notificationIds.Contains(el.Id))
            .ToListAsync();

        var userRegistrationTokens = await _dbContext
            .UserRegistrationTokens
            .Where(el => el.UserId == userId 
                && el.RegistrationToken != userDeviceToken)
            .AsSingleQuery()
            .ToListAsync();

        var userNotifications = await _dbContext
            .NotificationUsers
            .Where(el => el.UserId == userId 
                && notificationIds.Contains(el.NotificationId))
            .ToListAsync();
        
        foreach (var notification in userNotifications) 
            notification.IsRead = true;

        await _dbContext.SaveChangesAsync();

        for (var index = 0; index < userRegistrationTokens.Count; index += 500)
        {
            var batchTokens = userRegistrationTokens.GetRange(index, Math.Min(500, userRegistrationTokens.Count - index));
            await SendNotifications(batchTokens, notifications, true);
        }
    }

    public async Task MarkNotificationAsReadAsync(Guid notificationId, string userId, string userDeviceToken)
    {
        var userRegistrationTokens = await _dbContext
            .UserRegistrationTokens
            .Where(el => el.UserId == userId
                && el.RegistrationToken != userDeviceToken)
            .Select(el => el.RegistrationToken)
            .AsSingleQuery()
            .ToListAsync();
    }

    public async Task RegisterUserTokenAsync(string userId, string userDeviceToken)
    {
        var userToAdd = new UserRegistrationToken
        {
            UserId = userId,
            RegistrationToken = userDeviceToken
        };

        var user = await _dbContext.UserRegistrationTokens
            .Where(el => el.UserId == userId && el.RegistrationToken == userDeviceToken)
            .SingleOrDefaultAsync();

        if (user is not null)
            return;

        await _dbContext.UserRegistrationTokens.AddAsync(userToAdd);
        
        await _dbContext.SaveChangesAsync();
    }


    public async Task DeleteUserTokenAsync(string userId, string userDeviceToken)
    {
        _dbContext.Remove(new UserRegistrationToken { UserId = userId, RegistrationToken = userDeviceToken });
        await _dbContext.SaveChangesAsync();
    }

    public async Task SendNotificationAsync(NotificationDto notificationDto, string senderId, CancellationToken cancellationToken)
    {
        var notificationId = Guid.NewGuid();

        var userRegistrationTokens = await _dbContext
                .UserRegistrationTokens
                .Where(el => el.UserId != senderId)
                .ToListAsync(cancellationToken);
        

        var notificationToAdd = new DB.Models.Notification
        {
            Id = notificationId,
            Description = notificationDto.Description,
            NotificationInfo = notificationDto.NotificationInfo,
            Title = notificationDto.Title
        };

        await _dbContext.AddAsync(notificationToAdd);
        var notificationUsers = new List<NotificationUser>();

        foreach (var userRegistrationToken in userRegistrationTokens)
            notificationUsers.Add(new NotificationUser
            {
                UserId = userRegistrationToken.UserId,
                NotificationId = notificationId,
                IsRead = false
            });

        await _dbContext.NotificationUsers.AddRangeAsync(notificationUsers);

        var result = await SendNotification(userRegistrationTokens, notificationToAdd);
        await PostProcessMessageSendingAsync(result, userRegistrationTokens);
    }

    public Task SendNotificationToUserAsync(NotificationDto notificationDto, string senderId, string receiverId)
    {
        throw new NotImplementedException();
    }

    private async Task<BatchResponse> SendNotification(List<UserRegistrationToken> userTokens, DB.Models.Notification notification, bool isRead = false)
    {
        var tokens = userTokens.Select(el => el.RegistrationToken).ToList();
        var multicastMessage = ToMessage(notification, tokens, isRead);
        var result = await messaging.SendEachForMulticastAsync(multicastMessage);
        return result;
    }

    private async Task SendNotifications(List<UserRegistrationToken> userTokens, List<DB.Models.Notification> notifications, bool isRead = false)
    {
        var results = new ConcurrentBag<BatchResponse>();
        var parallelOptions = new ParallelOptions
        {
            MaxDegreeOfParallelism = 3
        };
        
        await Parallel.ForEachAsync(notifications, parallelOptions, async (notification, _) =>
        {
            var result = await SendNotification(userTokens, notification, isRead);
            results.Add(result);
        });
        
        foreach (var result in results.ToList()) 
            await PostProcessMessageSendingAsync(result, userTokens);
    }

    private MulticastMessage ToMessage(DB.Models.Notification notification, IList<string> tokens, bool isRead = false)
    {
        return new MulticastMessage
        {
            Tokens = new ReadOnlyCollection<string>(tokens),
            Notification = new FirebaseAdmin.Messaging.Notification
            {
                Title = notification.Title,
                Body = notification.Description
            },
            Data = new Dictionary<string, string>()
            {
                { "isRead", isRead.ToString() },
                { "notificationInfo", notification.NotificationInfo! }
            }
        };
    }

    private async Task PostProcessMessageSendingAsync(BatchResponse result, List<UserRegistrationToken> tokens)
    {
        if (result.FailureCount <= 0)
            return;

        var failedTokens = new HashSet<UserRegistrationToken>(new UserRegisterTokenComparer());
        for (var i = 0; i < result.Responses.Count; i++)
        {
            if (result.Responses[i].IsSuccess)
                continue;

            failedTokens.Add(tokens[i]);
        }

        if (failedTokens.Count <= 0)
            return;

        _dbContext.UserRegistrationTokens.RemoveRange(failedTokens);
        await _dbContext.SaveChangesAsync();
    }
}
