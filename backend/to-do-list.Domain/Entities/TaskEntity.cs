namespace to_do_list.Domain.Entities;

public class TaskEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Annotations { get; set; } = string.Empty;
    public bool Completed { get; set; }
    public bool Favorited { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? DateCompleted { get; set; }
    public string UserId { get; set; } = string.Empty;

    private TaskEntity() { }

    public TaskEntity(string title, string userId)
    {
        Id = Guid.NewGuid();
        SetTitle(title);
        Completed = false;
        Favorited = false;
        UserId = userId;
    }

    public void SetTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title)) 
            throw new InvalidOperationException("Título é obrigatório");
        if (title.Length > 250) 
            throw new InvalidOperationException("Título muito longo");
        Title = title.Trim();
    }

    public void SetFavorite(bool favorite) =>
        Favorited = favorite;

    public void SetDueDate(DateTime? dueDate) =>
        DueDate = dueDate;

    public void UpdateTask(string title, string? annotations, DateTime? dueDate)
    {
        SetTitle(title);
        Annotations = annotations?.Trim();
        SetDueDate(dueDate);
    }

    public void MarkCompleted()
    {
        if (Completed) return;
        Completed = true;
        DateCompleted = DateTime.Now;
    }

    public void UnmarkCompleted()
    {
        if (!Completed) return;
        Completed = false;
        DateCompleted = null;
    }
}