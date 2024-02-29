using Models;
using Models.BaseEntity;

namespace DB.Models;

public class EntityMarket : IBaseEntity
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Icon { get; set; }
    public bool Active { get; set; } = true;
    public string Description { get; set; }
    public string OwnerId { get; set; }
    
    public EntityUser? Owner { get; set; }
}
