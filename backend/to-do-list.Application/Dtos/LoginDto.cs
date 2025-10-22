using System.ComponentModel.DataAnnotations;

namespace to_do_list.Core.Dtos;

public class LoginDto
{
    [Required(ErrorMessage = "O campo Email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Informe um e-mail válido")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo Senha é obrigatório.")]
    public string Password { get; set; } = string.Empty;
}
