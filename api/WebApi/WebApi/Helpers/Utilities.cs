﻿using IdentityModel;
using System.Security.Claims;

namespace WebApi.Helpers;

public static class Utilities
{
    public static void QuickLog(string text, string logPath)
    {
        var dirPath = Path.GetDirectoryName(logPath);

        if (!Directory.Exists(dirPath))
            Directory.CreateDirectory(dirPath);

        using (var writer = File.AppendText(logPath))
        {
            writer.WriteLine($"{DateTime.Now} - {text}");
        }
    }

    public static string GetUserId(ClaimsPrincipal user)
    {
        return user.FindFirstValue(JwtClaimTypes.Subject)?.Trim();
    }

    public static string[] GetRoles(ClaimsPrincipal identity)
    {
        return identity.Claims
            .Where(c => c.Type == JwtClaimTypes.Role)
            .Select(c => c.Value)
            .ToArray();
    }
}
