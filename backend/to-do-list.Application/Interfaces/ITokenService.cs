using to_do_list.Core.Dtos;
using to_do_list.Identity;

namespace to_do_list.Core.Interfaces;

public interface ITokenService
{
    Task<AuthDto> CreateTokenAsync(User user);
}
