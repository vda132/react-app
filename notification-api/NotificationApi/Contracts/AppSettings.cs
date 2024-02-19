namespace Contracts;

public class AppSettings
{
    public IdentityServerConfig IdentityServerConfig { get; set; }
}

public class IdentityServerConfig 
{
    public string ServerUrl { get; set; }
    public string ApiName { get; set; }
}
