using System.ComponentModel.DataAnnotations;

namespace to_do_list.Application.Dtos;

public class TaskDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Annotations { get; set; }
    public bool Completed { get; set; }
    public bool Favorited { get; set; }
    public DateTime? DateCompleted { get; set; }
    public DateTime? DueDate { get; set; }
}

public class TaskCreateDto
{
    [Required(ErrorMessage = "O campo Título é obrigatório.")]
    [MaxLength(250, ErrorMessage = "O campo Título deve ter no máximo 250 caracteres.")]
    public string Title { get; set; } = string.Empty;
}

public class TaskUpdateDto
{
    [Required(ErrorMessage = "O campo Título é obrigatório.")]
    [MaxLength(250, ErrorMessage = "O campo Título deve ter no máximo 250 caracteres.")]
    public string Title { get; set; } = string.Empty;
    public string? Annotations { get; set; }
    public DateTime? DueDate { get; set; }
}

public class TaskModeCreate
{
    public bool? Completed { get; set; }
    public bool? Favorited { get; set; }
    public bool? Today { get; set; }
}