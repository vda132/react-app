using System.ComponentModel.DataAnnotations;

namespace DTO
{
    public class DtoUser
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }

        public bool IsEnabled { get; set; }
        public bool IsLockedOut { get; set; }

        public string[] Roles { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string AvatarUrl { get; set; }
        public string ContentPath { get; set; }
    }
}
