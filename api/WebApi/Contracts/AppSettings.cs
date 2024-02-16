namespace WebClient;

public class AppSettings
{
    public SmtpConfig SmtpConfig { get; set; }
    public ContentConfig ContentConfig { get; set; }
    public S3Config S3Config { get; set; }
}

public class SmtpConfig
{
    public string Host { get; set; }
    public int Port { get; set; }
    public bool UseSSL { get; set; }

    public string Name { get; set; }
    public string Username { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }
}

public class ContentConfig 
{
    public CategoryConfig CategoryConfig { get; set; }
    public MarketConfig MarketConfig { get; set; }
    public ProductConfig ProductConfig { get; set; }
    public UserConfig UserConfig { get; set; }
}

public class BaseImageConfig
{
    public string ImageServer { get; set; }
}

public class CategoryConfig : BaseImageConfig
{
}

public class MarketConfig : BaseImageConfig
{
}

public class ProductConfig : BaseImageConfig
{
}

public class UserConfig : BaseImageConfig
{ 
}

public class S3Config
{
    public string Profile { get; set;}
    public string FolderKey { get; set; }
    public string BucketName { get; set; }
    public string Region {  get; set; }
    public string BucketPath { get; set; }
}
