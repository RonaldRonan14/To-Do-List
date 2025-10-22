namespace to_do_list.Domain.Models;

public class TaskFilterModel
{
    public bool? Completed { get; set; }
    public bool? Favorited { get; set; }
    public bool? Expired { get; set; }
    public bool? Today { get; set; }
}
