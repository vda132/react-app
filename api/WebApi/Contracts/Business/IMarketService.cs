using DAL;
using DB.Models;
using DTO;
using Microsoft.AspNetCore.Http;

namespace Contracts.Business;

public interface IMarketService : IService<DtoMarket, EntityMarket, string, ApplicationDbContext>
{
    Task<IEnumerable<DtoMarket>> GetMarketsByOwnerId(string ownerId);
    Task<DtoPageableResult<DtoMarket>> SearchMarkets(DtoMarketSearch search);
    Task UploadIcon(IFormFile file, string marketId);
}
