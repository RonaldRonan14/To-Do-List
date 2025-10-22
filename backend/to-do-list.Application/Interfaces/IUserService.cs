using to_do_list.Core.Dtos;

namespace to_do_list.Core.Interfaces;

public interface IUserService
{
    Task<UserDto> CreateUserAsync(CreateUserDto dto);
    Task<UserDto> UpdateUserAsync(string userId, UpdateUserDto dto);
    Task<UserDto> GetUserByIdAsync(string id);
}
