using BLL;
using Contracts.Data;
using DAL;
using DB.Models;
using Duende.IdentityServer.AspNetIdentity;
using IdentityModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.OpenApi.Models;
using Models;
using System.Reflection;
using WebApi;
using WebApi.Authorization;
using WebApi.Helpers;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                            throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

var authServerUrl = builder.Configuration["AuthServerUrl"].TrimEnd('/');

var migrationsAssembly = typeof(ApplicationDbContext).GetTypeInfo().Assembly.GetName().Name; //DAL

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString, b => b.MigrationsAssembly(migrationsAssembly)));
builder.Services.AddIdentity<EntityUser, EntityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

// Configure Identity options and password complexity here
builder.Services.Configure<IdentityOptions>(options =>
{
    // User settings
    options.User.RequireUniqueEmail = true;

    //// Password settings
    //options.Password.RequireDigit = true;
    //options.Password.RequiredLength = 8;
    //options.Password.RequireNonAlphanumeric = false;
    //options.Password.RequireUppercase = true;
    //options.Password.RequireLowercase = false;

    //// Lockout settings
    //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
    //options.Lockout.MaxFailedAccessAttempts = 10;
});

// Adds IdentityServer.
builder.Services.AddIdentityServer(o =>
{
    o.IssuerUri = authServerUrl;
})
  .AddInMemoryPersistedGrants()
  // To configure IdentityServer to use EntityFramework (EF) as the storage mechanism
  // see https://www..com/configure-identityserver-to-use-entityframework-for-storage
  .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
  .AddInMemoryApiScopes(IdentityServerConfig.GetApiScopes())
  .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
  .AddInMemoryClients(IdentityServerConfig.GetClients())
  .AddAspNetIdentity<EntityUser>()
  .AddProfileService<ProfileService>();

//        services.AddAuthentication()
//.AddOpenIdConnect(options =>
//{
//    options.RequireHttpsMetadata = false;
//});
builder.Services.AddAuthentication(o =>
{
    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    //o.RequireHttpsMetadata = false;
}).AddJwtBearer(options =>
  {
        options.Authority = authServerUrl; // base-address of your identityserver
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };
        options.MapInboundClaims = false;
        options.TokenValidationParameters.NameClaimType = JwtClaimTypes.Name;
        options.TokenValidationParameters.RoleClaimType = JwtClaimTypes.Role;
        options.RequireHttpsMetadata = false;//!!!
  });

builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = IdentityServerConfig.ApiFriendlyName, Version = "v1" });
    c.OperationFilter<AuthorizeCheckOperationFilter>();
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            Password = new OpenApiOAuthFlow
            {
                TokenUrl = new Uri("/connect/token", UriKind.Relative),
                Scopes = new Dictionary<string, string>
                            {
                                { IdentityServerConfig.ApiName, IdentityServerConfig.ApiFriendlyName }
                            }
            }
        }
    });
});
builder.Services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    IdentityModelEventSource.ShowPII = true;
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.DocumentTitle = "Swagger UI - WebClient";
    c.SwaggerEndpoint("/swagger/v1/swagger.json", $"{IdentityServerConfig.ApiFriendlyName} V1");
    c.OAuthClientId(IdentityServerConfig.SwaggerClientID);
    c.OAuthClientSecret("no_password"); //Leaving it blank doesn't work
});

SeedDatabase(app);

app.Run();


static void SeedDatabase(WebApplication app)
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;

        try
        {
            var databaseInitializer = services.GetRequiredService<IDatabaseInitializer>();
            databaseInitializer.SeedAsync().Wait();
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogCritical(LoggingEvents.INIT_DATABASE, ex, LoggingEvents.INIT_DATABASE.Name);

            throw new Exception(LoggingEvents.INIT_DATABASE.Name, ex);
        }
    }
}
