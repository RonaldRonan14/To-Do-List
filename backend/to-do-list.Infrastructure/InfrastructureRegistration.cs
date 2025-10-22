using Microsoft.Extensions.DependencyInjection;
using to_do_list.Domain.Interfaces;
using to_do_list.Infrastructure.Repositories;

namespace to_do_list.Infrastructure;

public static class InfrastructureRegistration
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<ITaskRepository, TaskRepository>();

        return services;
    }
}
