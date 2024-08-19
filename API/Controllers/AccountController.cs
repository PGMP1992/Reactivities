using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Security.Claims;

namespace API.Controllers
{
    //[AllowAnonymous] // clears authentication for this controller
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto logindto)
        {
            var user = await _userManager.FindByEmailAsync(logindto.Email);
            if (user == null) return Unauthorized();
            
            var result = await _userManager.CheckPasswordAsync(user, logindto.Password);
            if(result )
            {
                return CreateUserObj(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registeDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registeDto.UserName))
            {
                return BadRequest("UserName is already taken");
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registeDto.Email))
            {
                return BadRequest("Email is already taken");
            }

            var user = new AppUser
            {
                DisplayName = registeDto.DisplayName,
                Email = registeDto.Email,
                UserName = registeDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registeDto.Password);

            if (result.Succeeded)
            {
                return CreateUserObj(user);
            }

            return BadRequest(result.Errors);
        }

        
        private ActionResult<UserDto> CreateUserObj(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObj(user);

        }

    }
}