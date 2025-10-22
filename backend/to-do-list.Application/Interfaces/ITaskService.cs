using to_do_list.Application.Dtos;
using to_do_list.Domain.Models;

namespace to_do_list.Core.Interfaces;

public interface ITaskService
{
    Task<TaskDto> GetTaskByIdAsync(string userId, Guid id);
    Task<IReadOnlyList<TaskDto>> GetTaskByFiltersAsync(string userId, TaskFilterModel filter);
    Task<TaskDto> AddTaskAsync(string userId, TaskModeCreate mode, TaskCreateDto dto);
    Task<TaskDto> UpdateTaskAsync(string userId, Guid id, TaskUpdateDto dto);
    Task DeleteTaskAsync(string userId, Guid id);
    Task<bool> SetFavoriteAsync(string userId, Guid id);
    Task MarkCompletedAsync(string userId, Guid id, bool completed);
}
