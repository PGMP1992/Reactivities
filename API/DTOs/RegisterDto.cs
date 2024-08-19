using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.=[a-z])(?=.*[A-Z]).{4,8}$", 
            ErrorMessage = "Password must contain an Upper Letter, a Lower letter, a Number and a special Character!")]
        public string Password { get; set; }
        
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string UserName { get; set; } 
    }
}