using Microsoft.AspNetCore.Identity;

namespace to_do_list.Identity;
 
public class User : IdentityUser
{
    public string Surname { get; set; } = string.Empty;
    public byte[] PhotoData { get; set; } = [];
}
 