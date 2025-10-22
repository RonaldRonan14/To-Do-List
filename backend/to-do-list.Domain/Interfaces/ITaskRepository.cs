using to_do_list.Domain.Entities;
using to_do_list.Domain.Models;

namespace to_do_list.Domain.Interfaces;

public interface ITaskRepository
{
    Task<TaskEntity?> GetTaskByIdAsync(string userId, Guid id);
    Task AddTaskAsync(TaskEntity task);
    Task UpdateTaskAsync(TaskEntity task);
    Task DeleteTaskAsync(TaskEntity task);
    Task<IReadOnlyList<TaskEntity>> GetTaskByFiltersAsync(string userId, TaskFilterModel filter);
}
