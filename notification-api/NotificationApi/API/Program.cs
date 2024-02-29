using Contracts;
using DAL;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Services;
using System.Reflection;

var allowResources = "AllowResources";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                            throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

var migrationsAssembly = typeof(NotificationDbContext).GetTypeInfo().Assembly.GetName().Name;

builder.Services.AddDbContext<NotificationDbContext>(options =>
    options.UseSqlServer(connectionString, b => b.MigrationsAssembly(migrationsAssembly)));
builder.Services.Configure<AppSettings>(builder.Configuration);
builder.Services.AddCors(options =>
{
    // ToDo: change headers
    options.AddPolicy(name: allowResources,
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var serverConfig = builder.Configuration.Get<AppSettings>()!.IdentityServerConfig;

builder.Services.AddScoped<INotificationService, NotificationService>();

builder.Services.AddAuthentication("Bearer")
            .AddJwtBearer("Bearer", options =>
            {
                options.Authority = serverConfig?.ServerUrl;
                options.Audience = serverConfig?.ApiName;
                options.TokenValidationParameters.ValidateAudience = false;
                options.TokenValidationParameters.ValidateLifetime = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };
                options.MapInboundClaims = false;
                options.RequireHttpsMetadata = false;
            });

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "notification-application-6803b-firebase-adminsdk-rnnhy-cae63987fa.json"))
});

builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

var app = builder.Build();

app.UseCors(allowResources);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.DocumentTitle = "Swagger UI - Notification API";
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notification API V1");
});

app.Run();
