using Microsoft.AspNetCore.Http;

namespace Contracts.Business;

public interface IContentManagerService
{
    Task<string> UploadFile(IFormFile file, string folderPath);
    Task<IEnumerable<string>> UploadFiles(IFormFileCollection files, string folderPath);
    Task DeleteFile(string file);
    Task DeleteFiles(IEnumerable<string> files);
}
