using AutoMapper;
using to_do_list.Application.Dtos;
using to_do_list.Domain.Entities;

namespace to_do_list.Core.Profiles;

public class TaskProfile : Profile
{
    public TaskProfile()
    {
        CreateMap<TaskEntity, TaskDto>();
    }
}
