﻿using Domain;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    /* This is an example of a simple token.
     * Major companies will be using something like a 3rd party Token creation tool
     * or even Azure services for added security 
     - PM */

    public class TokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config) // Reading this inside appsettings.development.json
        {
            _config = config;
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim( ClaimTypes.Name, user.UserName ),
                new Claim( ClaimTypes.NameIdentifier, user.Id ),
                new Claim( ClaimTypes.Email, user.Email ),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes( _config["TokenKey"])); // has to be at least 12 chars
            var creds = new SigningCredentials( key, SecurityAlgorithms.HmacSha512Signature );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
