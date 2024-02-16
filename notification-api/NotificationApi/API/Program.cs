using DAL;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                            throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

var migrationsAssembly = typeof(NotificationDbContext).GetTypeInfo().Assembly.GetName().Name;

builder.Services.AddDbContext<NotificationDbContext>(options =>
    options.UseSqlServer(connectionString, b => b.MigrationsAssembly(migrationsAssembly)));

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "notification-application-6803b-firebase-adminsdk-ixmvl-b4a98b8fc4.json"))
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
