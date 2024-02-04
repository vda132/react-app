namespace Contracts.Data
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }
}
