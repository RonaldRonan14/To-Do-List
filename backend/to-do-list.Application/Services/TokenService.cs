using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using to_do_list.Core.Dtos;
using to_do_list.Core.Interfaces;
using to_do_list.Identity;

namespace to_do_list.Core.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly DateTime _now;

    public TokenService(IConfiguration config)
    {
        _config = config;
        _now = DateTime.UtcNow;
    }

    public Task<AuthDto> CreateTokenAsync(User user)
    {
        var jwtSection = _config.GetSection("Jwt");
        var key = jwtSection["Key"] ?? throw new InvalidOperationException("JWT key está faltando");
        var issuer = jwtSection["Issuer"] ?? string.Empty;
        var audience = jwtSection["Audience"] ?? string.Empty;
        var minutes = int.TryParse(jwtSection["AccessTokenExpirationMinutes"], out var m) ? m : 60;

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Sub, user.Id),
            new (JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var expires = _now.AddMinutes(minutes);

        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = expires,
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = creds
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        var response = new AuthDto
        {
            AccessToken = tokenString,
            ExpiresAt = expires,
            UserId = user.Id,
            Surname = user.Surname,
            photoData = user.PhotoData
        };

        return Task.FromResult(response);
    }
}
