namespace DTO;

public class DtoBaseSearch
{
    public string SearchTerm { get; set; }
    public int CurrentPage { get; set; }
    public int ItemsPerPage { get; set; }
}
