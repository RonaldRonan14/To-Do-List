using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using to_do_list.Application.Dtos;
using to_do_list.Core.Interfaces;
using to_do_list.Domain.Models;

namespace to_do_list.Api.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    private string getUserId()
        => User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value
            ?? throw new ArgumentException("Usuário não autenticado");

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<TaskDto>> GetTaskByIdAsync(Guid id)
    {
        var task = await _taskService.GetTaskByIdAsync(getUserId(), id);
        return Ok(task);
    }

    [HttpGet("filter")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IReadOnlyList<TaskDto>>> GetTaskByFiltersAsync([FromQuery] TaskFilterModel model)
    {
        var tasks = await _taskService.GetTaskByFiltersAsync(getUserId(), model);
        return Ok(tasks);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<TaskDto>> AddTaskAsync([FromQuery] TaskModeCreate mode, [FromBody] TaskCreateDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var task = await _taskService.AddTaskAsync(getUserId(), mode, dto);
        return CreatedAtAction("GetTaskById", new { id = task.Id }, task);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<TaskDto>> UpdateTaskAsync(Guid id, [FromBody] TaskUpdateDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var task = await _taskService.UpdateTaskAsync(getUserId(), id, dto);
        return Ok(task);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> DeleteTaskAsync(Guid id)
    {
        await _taskService.DeleteTaskAsync(getUserId(), id);
        return NoContent();
    }

    [HttpPatch("{id:guid}/favorited")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<bool>> SetFavoriteAsync(Guid id)
    {
        bool favorited = await _taskService.SetFavoriteAsync(getUserId(), id);
        return Ok(new { favorited });
    }

    [HttpPatch("{id:guid}/completed")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> MarkCompletedAsync(Guid id, [FromBody] bool completed)
    {
        await _taskService.MarkCompletedAsync(getUserId(), id, completed);
        return NoContent();
    }
}
