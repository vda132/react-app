using Contracts.Business;

namespace BLL;

public enum ContentManagerKey
{
    AWS,
    WWWROOT
}

public delegate IContentManagerService ContentManagerServiceResolver(ContentManagerKey key);
