﻿using API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Security.Claims;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationsController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpPost("/register-user-device")]
    [Authorize]
    public async Task<IActionResult> RegisterUserDevice([FromBody] string registrationToken)
    {
        var userId = User.FindFirstValue("sub")?.Trim();

        await _notificationService.RegisterUserTokenAsync(userId!, registrationToken);
        return Ok();
    }

    [HttpGet("by-user")]
    [Authorize]
    public async Task<IActionResult> GetUserNotifications()
    {
        var userId = User.FindFirstValue("sub")?.Trim();

        var notifications = await _notificationService.GetNotificationsByUser(userId!);
        var result = new List<NotificationViewModel>();
        
        foreach (var notification in notifications) 
            result.Add(new NotificationViewModel
            {
                Id = notification.Id,
                Description = notification.Description,
                IsRead = notification.IsRead,
                NotificationInfo = notification.NotificationInfo,
                Title = notification.Title
            });

        return Ok(result);
    }

    [HttpDelete("/delete-user-device/{token}")]
    [Authorize]
    public async Task<IActionResult> DeleteUserDevice([FromRoute] string registrationToken)
    {
        var userId = User.FindFirstValue("sub")?.Trim();
        
        await _notificationService.DeleteUserTokenAsync(userId!, registrationToken);
        return Ok();
    }

    [HttpPost("/send")]
    [Authorize]
    public async Task<IActionResult> SendNotification([FromBody] NotificationViewModel notificationViewModel, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue("sub")?.Trim();
        await _notificationService.SendNotificationAsync(notificationViewModel.ToDto(), userId!, cancellationToken);

        return Ok();
    }

    [HttpPut("/mark-as-read/{id}")]
    [Authorize]
    public async Task<IActionResult> MarkAsRead([FromRoute] Guid id, [FromBody] string registrationToken, CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue("sub")?.Trim();
        await _notificationService.MarkNotificationAsReadAsync(id, userId!, registrationToken);

        return Ok();
    }
}
