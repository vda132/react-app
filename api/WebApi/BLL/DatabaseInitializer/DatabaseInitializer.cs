using Contracts.Data;
using DAL;
using Microsoft.EntityFrameworkCore;

namespace BLL;

public class DatabaseInitializer : IDatabaseInitializer
{
    private readonly ApplicationDbContext _context;

    public DatabaseInitializer(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SeedAsync()
    {
        await _context.Database.MigrateAsync().ConfigureAwait(false);

    }
}
