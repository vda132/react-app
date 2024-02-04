using DTO.Constants;
using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Identity;
using Models;
using System.Security.Claims;

namespace WebApi.Authorization;

public class ProfileService : IProfileService
{
    private readonly UserManager<EntityUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<EntityUser> _claimsFactory;

    public ProfileService(UserManager<EntityUser> userManager, IUserClaimsPrincipalFactory<EntityUser> claimsFactory)
    {
        _userManager = userManager;
        _claimsFactory = claimsFactory;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await _userManager.FindByIdAsync(sub);
        var principal = await _claimsFactory.CreateAsync(user);

        var claims = principal.Claims.ToList();
        claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

        if (user.JobTitle != null)
            claims.Add(new Claim(PropertyConstants.JobTitle, user.JobTitle));

        if (user.FullName != null)
            claims.Add(new Claim(PropertyConstants.FullName, user.FullName));

        if (user.Configuration != null)
            claims.Add(new Claim(PropertyConstants.Configuration, user.Configuration));

        context.IssuedClaims = claims;
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await _userManager.FindByIdAsync(sub);

        context.IsActive = (user != null) && user.IsEnabled;
    }
}