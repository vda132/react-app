namespace WebApi.ViewModels;

public class BaseSearchViewModel
{
    public string SearchTerm { get; set; }
    public int CurrentPage { get; set; }
    public int ItemsPerPage { get; set; }
}
