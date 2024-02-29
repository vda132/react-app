namespace WebApi.ViewModels.Market;

public class MarketViewModel
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Icon { get; set; }
    public bool Active { get; set; }
    public string Description { get; set; }
    public string OwnerId { get; set; }
    public string ContentPath { get; set; }
}
