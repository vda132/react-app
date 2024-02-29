namespace DTO;

public class DtoPageableResult<T>
{
    public IEnumerable<T> Results { get; set; }
    public int ItemsPerPage { get; set; }
    public int TotalItems { get; set; }
}
