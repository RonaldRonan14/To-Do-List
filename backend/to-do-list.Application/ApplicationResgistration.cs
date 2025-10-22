using Microsoft.Extensions.DependencyInjection;
using to_do_list.Core.Interfaces;
using to_do_list.Core.Services;

namespace to_do_list.Application;

public static class ApplicationResgistration
{
    public static IServiceCollection AddApplication (this IServiceCollection services)
    {
        services.AddScoped<ITaskService, TaskService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}
