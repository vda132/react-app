using AutoMapper;
using Contracts.Business;
using DTO;
using DTO.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.ViewModels;
using WebApi.ViewModels.Market;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketsController : BaseController
    {
        private readonly IMarketService _marketService;
        private IMapper _mapper;

        public MarketsController(IMarketService marketService, IMapper mapper)
        {
            _marketService = marketService;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetMarkets([FromQuery] MarketSearchViewModel search)
        {
            var searchDto = _mapper.Map<DtoMarketSearch>(search);
            var markets = await _marketService.SearchMarkets(searchDto);
            var result = _mapper.Map<PageableResultViewModel<MarketViewModel>>(markets);
            
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMarketById([FromRoute] string id)
        {
            var market = await _marketService.Get(id);
            var result = _mapper.Map<MarketViewModel>(market);

            return Ok(result);
        }

        [HttpGet("by-owner/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMarketsByOwnerId([FromRoute] string ownerId)
        {
            var market = await _marketService.GetMarketsByOwnerId(ownerId);
            var result = _mapper.Map<IEnumerable<MarketViewModel>>(market);

            return Ok(result);
        }

        [HttpGet("/all")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllMarkets()
        {
            var markets = await _marketService.All();
            var result = _mapper.Map<IEnumerable<MarketViewModel>>(markets);
            
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = $"{RolesConstants.ManagePlatformRoles},{RolesConstants.ManageMarketRoles}")]
        public async Task<IActionResult> CreateMarket([FromBody] MarketViewModel marketViewModel)
        {
            var dto = _mapper.Map<DtoMarket>(marketViewModel);
            await _marketService.Add(dto);

            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = $"{RolesConstants.ManagePlatformRoles},{RolesConstants.ManageMarketRoles}")]
        public async Task<IActionResult> UpdateMarket([FromBody] MarketViewModel marketViewModel)
        {
            var dto = _mapper.Map<DtoMarket>(marketViewModel);
            await _marketService.Update(dto);

            return Ok();
        }

        [HttpPut("/upload-icon/{id}")]
        [Authorize(Roles = $"{RolesConstants.ManagePlatformRoles},{RolesConstants.ManageMarketRoles}")]
        [Produces("application/json")]
        public async Task<IActionResult> UploadIcon([FromForm] IFormFile file, [FromRoute] string id)
        {
            await _marketService.UploadIcon(file, id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = $"{RolesConstants.ManagePlatformRoles},{RolesConstants.ManageMarketRoles}")]
        public async Task<IActionResult> DeleteMarket([FromRoute] string id)
        {
            var market = await _marketService.Get(id);
            await _marketService.Remove(market);
            var result = _mapper.Map<MarketViewModel>(market);
            
            return Ok(result);
        }
    }
}
