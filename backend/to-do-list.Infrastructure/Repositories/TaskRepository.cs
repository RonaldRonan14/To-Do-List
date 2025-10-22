using Microsoft.EntityFrameworkCore;
using to_do_list.Domain.Entities;
using to_do_list.Domain.Interfaces;
using to_do_list.Domain.Models;
using to_do_list.Infrastructure.Persistence;

namespace to_do_list.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<TaskEntity?> GetTaskByIdAsync(string userId, Guid id)
    {
        return await _context.Tasks.FirstOrDefaultAsync(t => t.UserId == userId && t.Id == id);
    }

    public async Task AddTaskAsync(TaskEntity task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateTaskAsync(TaskEntity task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTaskAsync(TaskEntity task)
    {
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<TaskEntity>> GetTaskByFiltersAsync(string userId, TaskFilterModel filter)
    {
        var query = _context.Tasks
            .Where(t => t.UserId == userId)
            .AsNoTracking()
            .AsQueryable();

        var today = DateTime.Now.Date;

        if (filter.Favorited != null && filter.Favorited == true)
            query = query.Where(t => t.Favorited);

        if (filter.Today != null && filter.Today == true)
            query = query.Where(t => t.DueDate.HasValue && t.DueDate.Value.Date == today);

        if (filter.Expired != null && filter.Expired == true)
            query = query.Where(t => !t.Completed && t.DueDate.HasValue && t.DueDate.Value.Date < today);
        else
            query = query.Where(t => t.Completed == filter.Completed);

        return await query.ToListAsync();
    }
}
