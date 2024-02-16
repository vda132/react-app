using DB.Models;
using System.Diagnostics.CodeAnalysis;

namespace Services;

internal class UserRegisterTokenComparer : IEqualityComparer<UserRegistrationToken>
{
    public bool Equals(UserRegistrationToken? x, UserRegistrationToken? y)
    {
        return x?.UserId == y?.UserId && x?.RegistrationToken == y?.RegistrationToken;
    }

    public int GetHashCode([DisallowNull] UserRegistrationToken obj)
    {
        return obj.GetHashCode();
    }
}
