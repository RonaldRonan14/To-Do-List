using AutoMapper;
using to_do_list.Application.Dtos;
using to_do_list.Core.Interfaces;
using to_do_list.Domain.Entities;
using to_do_list.Domain.Interfaces;
using to_do_list.Domain.Models;

namespace to_do_list.Core.Services;

public class TaskService : ITaskService
{
    private readonly IMapper _mapper;
    private readonly ITaskRepository _taskRepository;

    public TaskService(IMapper mapper, ITaskRepository taskRepository)
    {
        _mapper = mapper;
        _taskRepository = taskRepository;
    }

    public async Task<TaskDto> GetTaskByIdAsync(string userId, Guid id)
    {
        var task = await _taskRepository.GetTaskByIdAsync(userId, id);
        if (task == null)
            throw new KeyNotFoundException("Tarefa não encontrada");
        return _mapper.Map<TaskDto>(task);
    }

    public async Task<IReadOnlyList<TaskDto>> GetTaskByFiltersAsync(string userId, TaskFilterModel filter)
    {
        var tasks = await _taskRepository.GetTaskByFiltersAsync(userId, filter);
        return _mapper.Map<IReadOnlyList<TaskDto>>(tasks);
    }

    public async Task<TaskDto> AddTaskAsync(string userId, TaskModeCreate mode, TaskCreateDto dto)
    {
        var task = new TaskEntity(dto.Title, userId);
        if (mode.Favorited != null)
            task.SetFavorite(mode.Favorited ?? false);

        if (mode.Completed != null && mode.Completed == true)
            task.MarkCompleted();
        else if (mode.Completed != null && mode.Completed == false)
            task.UnmarkCompleted();

        if (mode.Today != null && mode.Today == true)
            task.SetDueDate(DateTime.Now);

        await _taskRepository.AddTaskAsync(task);
        return _mapper.Map<TaskDto>(task);
    }

    public async Task<TaskDto> UpdateTaskAsync(string userId, Guid id, TaskUpdateDto dto)
    {
        var task = await _taskRepository.GetTaskByIdAsync(userId, id);
        if (task == null)
            throw new KeyNotFoundException("Tarefa não encontrada");
        task.UpdateTask(dto.Title, dto.Annotations, dto.DueDate);
        await _taskRepository.UpdateTaskAsync(task);
        return _mapper.Map<TaskDto>(task);
    }

    public async Task DeleteTaskAsync(string userId, Guid id)
    {
        var task = await _taskRepository.GetTaskByIdAsync(userId, id);
        if (task == null)
            throw new KeyNotFoundException("Tarefa não encontrada");
        await _taskRepository.DeleteTaskAsync(task);
    }

    public async Task<bool> SetFavoriteAsync(string userId, Guid id)
    {
        var task = await _taskRepository.GetTaskByIdAsync(userId, id);
        if (task == null)
            throw new KeyNotFoundException("Tarefa não encontrada");
        task.SetFavorite(!task.Favorited);
        await _taskRepository.UpdateTaskAsync(task);
        return task.Favorited;
    }

    public async Task MarkCompletedAsync(string userId, Guid id, bool completed)
    {
        var task = await _taskRepository.GetTaskByIdAsync(userId, id);
        if (task == null)
            throw new KeyNotFoundException("Tarefa não encontrada");
        if (completed)
            task.MarkCompleted();
        else
            task.UnmarkCompleted();
        await _taskRepository.UpdateTaskAsync(task);
    }
}