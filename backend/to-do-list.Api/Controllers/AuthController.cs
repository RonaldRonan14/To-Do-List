using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using to_do_list.Core.Dtos;
using to_do_list.Core.Interfaces;
using to_do_list.Identity;

namespace to_do_list.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;

        public AuthController(UserManager<User> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthDto>> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            User? user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new ArgumentException("Credenciais inválidas.");
            var passwordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!passwordValid)
                throw new ArgumentException("Credenciais inválidas.");

            var token = await _tokenService.CreateTokenAsync(user);

            return Ok(token);
        }
    }
}
