using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Sets up required authentication for app at controller level
builder.Services.AddControllers(option =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser().Build();
    option.Filters.Add(new AuthorizeFilter (policy));
});

// Create class below containing all Services.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices( builder.Configuration);
var app = builder.Build();

// Configure the HTTP request pipeline.
//app.UseMiddleware<ExceptionMiddleware>(); // Created this Exception Handler

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Creating Migrations on the run 
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);

} catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Error on Migrations");
}

app.Run();
