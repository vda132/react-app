using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Authorize]
public abstract class BaseController : ControllerBase
{
    public BaseController()
    {
    }
}