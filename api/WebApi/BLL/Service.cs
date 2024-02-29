using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using DTO.Constants;
using Contracts.Business;

namespace BLL;

public abstract class Service<TModel, TEntity, TId, TDbContext>
    : IService<TModel, TEntity, TId, TDbContext>
     where TModel : class
     where TEntity : class
     where TDbContext : DbContext
{
    public string CurrentUserId { get; protected set; }
    //protected IRepository<TEntity, TId,TDataContext> _repository;
    protected IMapper Mapper;
    public TDbContext Context { get; private set; }
    protected DbSet<TEntity> Table { get; private set; }
    protected IHttpContextAccessor HttpAccessor { get; private set; }

    public Service(TDbContext dataContext, 
        IMapper mapper, 
        IHttpContextAccessor httpAccessor)
    {
        Mapper = mapper;
        HttpAccessor = httpAccessor;
        Context = dataContext;

        CurrentUserId = httpAccessor?.HttpContext?.User.FindFirst(ClaimConstants.Subject)?.Value?.Trim();
        Table = dataContext.Set<TEntity>();
    }

    public virtual async Task<TModel> Add(TModel model)
    {
        TEntity entity = Mapper.Map<TEntity>(model);
        var result = Table.Add(entity);
        await Context.SaveChangesAsync();
        return Mapper.Map<TModel>(result.Entity);
    }

    public virtual async Task<IEnumerable<TModel>> AddRange(IEnumerable<TModel> models)
    {
        IEnumerable<TEntity> entities = Mapper.Map<IEnumerable<TEntity>>(models);
        Table.AddRange(entities);
        await Context.SaveChangesAsync();
        return Mapper.Map<IEnumerable<TModel>>(entities);
    }

    public virtual async Task<IList<TModel>> All()
    {
        var data = await Table.ToListAsync();
        var result = Mapper.Map<IList<TModel>>(data);
        return result;
    }

    public virtual async Task<int> Count()
    {
        return await Table.CountAsync();
    }

    public virtual async Task<TModel> Get(TId id)
    {
        var data = await Table.FindAsync(id);
        var result = Mapper.Map<TModel>(data);
        return result;
    }

    public virtual async Task Remove(TModel model)
    {
        var entity = Mapper.Map<TEntity>(model);
        Context.Entry(entity).State = EntityState.Detached;
        Table.Remove(entity);
        await Context.SaveChangesAsync();
    }

    public virtual async Task RemoveRange(IEnumerable<TModel> models)
    {
        var entities = Mapper.Map<IEnumerable<TEntity>>(models);
        Table.RemoveRange(entities);
        await Context.SaveChangesAsync();
    }

    public virtual async Task<TModel> Update(TModel model)
    {
        var entity = Mapper.Map<TEntity>(model);
        Table.Update(entity);
        await Context.SaveChangesAsync();
        return Mapper.Map<TModel>(entity);
    }

    public virtual async Task<IEnumerable<TModel>> UpdateRange(IEnumerable<TModel> models)
    {
        var entities = Mapper.Map<IEnumerable<TEntity>>(models);
        Table.UpdateRange(entities);
        await Context.SaveChangesAsync();
        return Mapper.Map<IEnumerable<TModel>>(entities);
    }
}
