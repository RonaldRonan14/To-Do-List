namespace to_do_list.Core.Dtos;

public class AuthDto
{
    public string AccessToken { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public byte[] photoData { get; set; } = [];
}
