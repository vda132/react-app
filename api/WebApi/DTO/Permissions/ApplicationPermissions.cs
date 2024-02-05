using System.Collections.ObjectModel;

namespace DTO.Permissions;

public static class ApplicationPermissions
{
    public static ReadOnlyCollection<ApplicationPermission> AllPermissions;

    //USERS
    public const string UsersPermissionGroupName = "User Permissions";
    public static ApplicationPermission ViewUsers = new ApplicationPermission("View Users", "users.view", UsersPermissionGroupName, "Permission to view other users account details");
    public static ApplicationPermission ManageUsers = new ApplicationPermission("Manage Users", "users.manage", UsersPermissionGroupName, "Permission to create, delete and modify other users account details");
    //ROLES
    public const string RolesPermissionGroupName = "Role Permissions";
    public static ApplicationPermission ViewRoles = new ApplicationPermission("View Roles", "roles.view", RolesPermissionGroupName, "Permission to view available roles");
    public static ApplicationPermission ManageRoles = new ApplicationPermission("Manage Roles", "roles.manage", RolesPermissionGroupName, "Permission to create, delete and modify roles");
    public static ApplicationPermission AssignRoles = new ApplicationPermission("Assign Roles", "roles.assign", RolesPermissionGroupName, "Permission to assign roles to users");
    
    //MARKETS
    public const string MarketPermissionGroupName = "Market Permissions";
    public static ApplicationPermission ViewClients = new ApplicationPermission("View Clients", "market.clients.view", MarketPermissionGroupName, "Permission to view market clients");
    public static ApplicationPermission ManageClients = new ApplicationPermission("Manage Clients", "market.clients.manage", MarketPermissionGroupName, "Permission to manage market clients");
    public static ApplicationPermission ManageMarkets = new ApplicationPermission("Manage Markets", "market.manage", MarketPermissionGroupName, "Permission to create delete and modify markets");

    //ORDERS
    public const string OrdersPermissionGroupName = "Orders Permissions";
    public static ApplicationPermission ViewOrders = new ApplicationPermission("View Orders", "orders.view", OrdersPermissionGroupName, "Permission to view market orders  details");
    public static ApplicationPermission ManageOrders = new ApplicationPermission("Manage Orders", "orders.manage", OrdersPermissionGroupName, "Permission to manage market orders");

    //CATEGORIES
    public const string CategoriesPermissionGroupName = "Categories Permissions";
    public static ApplicationPermission ManageCategories = new ApplicationPermission("Manage Categories", "categories.manage", CategoriesPermissionGroupName, "Permission to create delete and modify categories");

    //PRODUCTS
    public const string ProductsPermissionGroupName = "Products Permissions";
    public static ApplicationPermission ManageProducts = new ApplicationPermission("Manage Products", "products.manage", ProductsPermissionGroupName, "Permission to create modify and delete products");

    static ApplicationPermissions()
    {
        var allPermissions = new List<ApplicationPermission>
        {
            ViewUsers,
            ManageUsers,
            ManageCategories,
            ViewRoles,
            ManageRoles,
            AssignRoles,
            ManageProducts,
            ManageMarkets,
            ManageOrders
        };

        AllPermissions = allPermissions.AsReadOnly();
    }

    public static ApplicationPermission GetPermissionByName(string permissionName)
    {
        return AllPermissions.SingleOrDefault(p => p.Name == permissionName);
    }

    public static ApplicationPermission GetPermissionByValue(string permissionValue)
    {
        return AllPermissions.SingleOrDefault(p => p.Value == permissionValue);
    }

    public static string[] GetSuperAdminPermissions()
    {
        return AllPermissions.Select(p => p.Value).ToArray();
    }

    public static string[] GetAdministrativePermissionValues()
    {
        return new string[] { ManageUsers, ManageRoles, AssignRoles, ManageCategories, ManageProducts, ManageMarkets };
    }

    public static string[] GetMarketSuperAdminPermissionValues()
    {
        return new string[] { ManageMarkets, ManageClients, ManageOrders, ManageProducts, ViewClients, ViewOrders };
    }
}
