using Domain;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServicesExtention
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, 
            IConfiguration config) 
        {
            services.AddIdentityCore<AppUser> (opt => {
                opt.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<DataContext> ();

            services.AddAuthorization();

            return services;
        }
    }
}