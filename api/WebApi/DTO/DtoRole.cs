using DTO.Permissions;

namespace DTO;

public class DtoRole
{
    public string Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public int UsersCount { get; set; }
    public ApplicationPermission[] Permissions { get; set; }
}
