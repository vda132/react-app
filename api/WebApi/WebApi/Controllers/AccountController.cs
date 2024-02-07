using AutoMapper;
using Contracts.Business;
using DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebApi.Helpers;
using WebApi.ViewModels.Account;

namespace WebApi.Controllers;

[Route("api/[controller]")]
public class AccountController : BaseController
{
    private readonly IAccountService _accountService;
    private readonly IMapper _mapper;

    private const string GetUserByIdActionName = "GetUserById";
    private const string GetRoleByIdActionName = "GetRoleById";

    public AccountController(IAccountService accountService, IMapper mapper)
    {
        _accountService = accountService;
        _mapper = mapper;
    }

    [HttpGet("/users/me")]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(UserViewModel))]
    public async Task<IActionResult> GetCurrentUser()
    {
        return await GetUserById(Utilities.GetUserId(User));
    }

    [HttpGet("/user/{id}", Name = GetUserByIdActionName)]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(UserViewModel))]
    public async Task<IActionResult> GetUserById([FromRoute] string id)
    {
        var user = await _accountService.GetUserAndRolesAsync(id);
        var userVM = _mapper.Map<UserViewModel>(user.Value.User);
        userVM.Roles = user.Value.Roles;

        return Ok(userVM);
    }

    [HttpPost("/register")]
    [AllowAnonymous]
    [ProducesResponseType(200, Type = typeof(UserViewModel))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Register([FromBody] UserEditViewModel userVM)
    {
        var userDto = _mapper.Map<DtoUser>(userVM);
        var result = await _accountService.CreateUserAsync(userDto, userVM.Roles, userVM.NewPassword);

        if (result.Succeeded)
            return CreatedAtAction(GetUserByIdActionName, new { id = userVM.Id }, userVM);

        AddError(result.Errors);
        return BadRequest(ModelState);
    }

    [HttpDelete("/users/{id}")]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(UserViewModel))]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> DeleteUser([FromRoute] string id)
    {
        var user = await _accountService.GetUserByIdAsync(id);

        if (user is null)
            return NotFound("User cannot be found");
        
        var userVM = _mapper.Map<UserViewModel>(user);
        var result = await _accountService.DeleteUserAsync(user);

        if (!result.Succeeded)
            throw new Exception($"The following errors occurred whilst deleting user: {string.Join(", ", result.Errors)}");

        return Ok(userVM);
    }

    [HttpPut("/users/{id}")]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(UserViewModel))]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> UpdateUser([FromRoute] string id, [FromBody] UserEditViewModel user)
    {
        var userDto = _mapper.Map<DtoUser>(user);
        var isPasswordChanged = !string.IsNullOrWhiteSpace(user.NewPassword);

        var result = await _accountService.UpdateUserAsync(userDto, user.Roles);
        if (result.Succeeded)
        {
            if (isPasswordChanged)
            {
                if (!string.IsNullOrWhiteSpace(user.CurrentPassword))
                    result = await _accountService.UpdatePasswordAsync(userDto, user.CurrentPassword, user.NewPassword);
                else
                    result = await _accountService.ResetPasswordAsync(userDto, user.NewPassword);
            }
        }
        var updatedUser = await _accountService.GetUserByIdAsync(id);
        var userVM = _mapper.Map<UserViewModel>(updatedUser);

        return Ok(userVM);
    }

    [HttpPut("/users/me")]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(UserViewModel))]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> UpdateCurrentUser([FromBody] UserEditViewModel user)
    {
        return await UpdateUser(Utilities.GetUserId(User), user);
    }

    [HttpGet("/roles/{id}", Name = GetRoleByIdActionName)]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(RoleViewModel))]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetRoleById(string id)
    {
        var role = await _accountService.GetRoleByIdAsync(id);
        var result = _mapper.Map<RoleViewModel>(role);

        return Ok(result);
    }

    [HttpPost("/roles")]
    [Authorize]
    [ProducesResponseType(201, Type = typeof(RoleViewModel))]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> CreateRole([FromBody] RoleViewModel roleViewModel)
    {
        var roleDto = _mapper.Map<DtoRole>(roleViewModel);
        var result = await _accountService.CreateRoleAsync(roleDto, roleViewModel.Permissions?.Select(p => p.Value).ToArray());
        if (result.Succeeded)
        {
            var roleVM = await _accountService.GetRoleByNameAsync(roleDto.Name);
            return CreatedAtAction(GetRoleByIdActionName, new { id = roleVM.Id }, roleVM);
        }

        AddError(result.Errors);

        return BadRequest(ModelState);
    }

    [HttpPut("/roles/{id}")]
    [Authorize]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> UpdateRole([FromBody] RoleViewModel roleViewModel)
    {
        var roleDto = _mapper.Map<DtoRole>(roleViewModel);
        var result = await _accountService.UpdateRoleAsync(roleDto, roleViewModel.Permissions?.Select(p => p.Value).ToArray());
        if (result.Succeeded)
            return NoContent();

        AddError(result.Errors);
        return BadRequest(ModelState);
    }

    [HttpDelete("/roles/{id}")]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(RoleViewModel))]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> DeleteRole([FromRoute] string id)
    {
        var roleDto = await _accountService.GetRoleByIdAsync(id);

        if (roleDto is null)
            return NotFound("Role with current id cannot be found");

        var roleVM = _mapper.Map<RoleViewModel>(roleDto);
        var result = await _accountService.DeleteRoleAsync(roleDto);

        if (!result.Succeeded)
            throw new Exception($"The following errors occurred whilst deleting role: {string.Join(", ", result.Errors)}");
        
        return Ok(roleVM);
    }

    [HttpGet("/roles/{page}/{pageSize}")]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(List<RoleViewModel>))]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetRoles([FromRoute] int page, [FromRoute] int pageSize)
    {
        var roleDtos = await _accountService.GetRolesLoadRelatedAsync(page, pageSize);
        var roles = _mapper.Map<List<RoleViewModel>>(roleDtos);

        return Ok(roles);
    }

    [HttpGet("/roles")]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(RoleViewModel))]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetRoleByName([FromQuery] string name)
    {
        var roleDto = await _accountService.GetRoleLoadRelatedAsync(name);
        var role = _mapper.Map<RoleViewModel>(roleDto);

        return Ok(role);
    }

    private void AddError(IEnumerable<string> errors, string key = "")
    {
        foreach (var error in errors)
        {
            AddError(error, key);
        }
    }

    private void AddError(string error, string key = "")
    {
        ModelState.AddModelError(key, error);
    }
}
