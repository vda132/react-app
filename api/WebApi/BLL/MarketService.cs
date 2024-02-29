using AutoMapper;
using Contracts.Business;
using DAL;
using DB.Models;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebClient;

namespace BLL;

public class MarketService : Service<DtoMarket, EntityMarket, string, ApplicationDbContext>, IMarketService
{
    private readonly MarketConfig _marketConfig;
    private readonly ContentManagerServiceResolver _contentManagerServiceResolver;
    private const string folderPath = "markets";

    public MarketService(ApplicationDbContext dataContext,
        IMapper mapper,
        IHttpContextAccessor httpAccessor,
        IOptions<AppSettings> options,
        ContentManagerServiceResolver contentManagerServiceResolver)
        : base(dataContext, mapper, httpAccessor)
    {
        _marketConfig = options.Value.ContentConfig.MarketConfig;
        _contentManagerServiceResolver = contentManagerServiceResolver;
    }

    public async Task<IEnumerable<DtoMarket>> GetMarketsByOwnerId(string ownerId)
    {
        var markets = await Table.Where(el => el.OwnerId == ownerId).ToListAsync();
        var result = Mapper.Map<List<DtoMarket>>(markets);

        return result;
    }

    public async Task<DtoPageableResult<DtoMarket>> SearchMarkets(DtoMarketSearch search)
    {
        var marketsQuery = Table
            .Where(el => search.SearchTerm.IsNullOrEmpty() ? true : (
                el.Name.Contains(search.SearchTerm, StringComparison.OrdinalIgnoreCase) || 
                el.Description.Contains(search.SearchTerm, StringComparison.OrdinalIgnoreCase)
            ));

        var count = marketsQuery.Count();

        if (search.CurrentPage > 0)
            marketsQuery = marketsQuery.Skip((search.CurrentPage - 1) * search.ItemsPerPage);

        if (search.ItemsPerPage > 0)
            marketsQuery = marketsQuery.Take(search.ItemsPerPage);

        var markets = await marketsQuery.AsSingleQuery().ToListAsync();
        var results = Mapper.Map<IEnumerable<DtoMarket>>(markets);

        foreach (var item in results)
            SetImagePath(item);

        return new DtoPageableResult<DtoMarket>
        {
            TotalItems = count,
            ItemsPerPage = search.ItemsPerPage,
            Results = results
        };
    }

    public async Task UploadIcon(IFormFile file, string marketId)
    {
        var market = Table.FirstOrDefault(el => el.Id ==  marketId);

        if (market is null)
            throw new Exception("Market does not exist");
        var service = _contentManagerServiceResolver(ContentManagerKey.AWS);

        var result = await service.UploadFile(file, folderPath);
        market.Icon = result;
        await Context.SaveChangesAsync();
    }

    private void SetImagePath(DtoMarket market)
    {
        if (market.Icon != null)
            market.ContentPath = _marketConfig.ImageServer;
    }
}
