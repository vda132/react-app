namespace Contracts.Business;

public interface IService<TModel, TEntity, TId, TDbContext>
        where TModel : class
        where TEntity : class
        where TDbContext : class
{
    TDbContext Context { get; }

    Task<TModel> Add(TModel model);

    Task<IEnumerable<TModel>> AddRange(IEnumerable<TModel> models);

    Task<TModel> Update(TModel model);

    Task<IEnumerable<TModel>> UpdateRange(IEnumerable<TModel> models);

    Task Remove(TModel model);

    Task RemoveRange(IEnumerable<TModel> models);

    Task<int> Count();

    Task<TModel> Get(TId id);

    Task<IList<TModel>> All();
}