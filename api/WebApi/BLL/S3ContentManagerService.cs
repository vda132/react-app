using Amazon.S3;
using Amazon.S3.Model;
using Contracts.Business;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using WebClient;

namespace BLL;

public class S3ContentManagerService : IContentManagerService
{
    private readonly IAmazonS3 _s3Client;
    private readonly S3Config _s3Config;
    public S3ContentManagerService(IAmazonS3 s3Client, IOptions<AppSettings> options)
    {
        _s3Client = s3Client;
        _s3Config = options.Value.S3Config;
    }
    public async Task<string> UploadFile(IFormFile file, string folderPath)
    {
        var filePath = $"{folderPath}/{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var request = new PutObjectRequest
        {
            BucketName = _s3Config.BucketName,
            Key = $"{_s3Config.FolderKey}/{filePath}",
            InputStream = file.OpenReadStream(),
            StorageClass = S3StorageClass.Standard
        };
        await _s3Client.PutObjectAsync(request);
        return filePath;
    }

    public async Task<IEnumerable<string>> UploadFiles(IFormFileCollection files, string folderPath)
    {
        var tasks = new List<Task<string>>();
        foreach (var file in files)
        {
            tasks.Add(UploadFile(file, folderPath));
        }
        return await Task.WhenAll(tasks);
    }

    public async Task DeleteFile(string file)
    {
        var fileKey = $"{_s3Config.FolderKey}/{file}";
        var request = new DeleteObjectRequest
        {
            BucketName= _s3Config.BucketName,
            Key = fileKey,
        };

        await _s3Client.DeleteObjectAsync(request);
    }

    public async Task DeleteFiles(IEnumerable<string> files)
    {
        var tasks = new List<Task>();
        foreach (var file in files)
        {
            tasks.Add(DeleteFile(file));
        }

        await Task.WhenAll(tasks);
    }
}
