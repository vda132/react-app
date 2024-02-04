namespace DTO.Constants
{
    public static class RolesConstants
    {
        public const string SuperAdminRole = "super-admin";
        public const string AdminRole = "admin";
        public const string MarketAdminRole = "market-admin";
        public const string MarketRole = "market";
        public const string UserRole = "user";

        public const string ManagePlatformRoles = $"{SuperAdminRole},{AdminRole}";
        public const string ManageMarketRoles = $"{MarketAdminRole},{MarketRole}";
    }
}
