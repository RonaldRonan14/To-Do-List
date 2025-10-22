using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using to_do_list.Core.Dtos;
using to_do_list.Core.Interfaces;

namespace to_do_list.Api.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private string getUserId()
        => User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value
            ?? throw new ArgumentException("Usuário não autenticado");

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}", Name = "GetUserById")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<UserDto>> GetUserByIdAsync(string id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        return Ok(user);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<UserDto>> CreateUserAsync([FromForm] CreateUserDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var created = await _userService.CreateUserAsync(dto);
        return CreatedAtRoute("GetUserById", new { id = created.Id }, created);
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateUserAsync([FromForm] UpdateUserDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var updated = await _userService.UpdateUserAsync(getUserId(), dto);
        return Ok(updated);
    }
}
