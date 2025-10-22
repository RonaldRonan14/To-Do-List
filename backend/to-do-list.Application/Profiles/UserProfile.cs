using AutoMapper;
using to_do_list.Core.Dtos;
using to_do_list.Identity;

namespace to_do_list.Core.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<CreateUserDto, User>()
            .ForMember(p => p.PhotoData, x => x.Ignore());
    }
}
