using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace to_do_list.Core.Dtos;

public class UserDto
{
    public string Id { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public byte[] PhotoData { get; set; } = [];
}

public class CreateUserDto
{
    [Required(ErrorMessage = "O campo Email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Informe um e-mail válido")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo Senha é obrigatório.")]
    [MinLength(6, ErrorMessage = "A Senha deve conter no mínimo 6 digitos.")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo Apelido é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O Apelido deve conter no máximo 100 caracteres.")]
    public string Surname { get; set; } = string.Empty;

    public IFormFile? PhotoData { get; set; }
}

public class UpdateUserDto
{
    [Required(ErrorMessage = "O campo Apelido é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O Apelido deve conter no máximo 100 caracteres.")]
    public string Surname { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo Email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Informe um e-mail válido")]
    public string Email { get; set; } = string.Empty;

    public IFormFile? PhotoData { get; set; }

    public string? Password { get; set; }

    public string? CurrentPassword { get; set; }
}