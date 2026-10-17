using Microsoft.Extensions.DependencyInjection;

namespace Rag.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // TODO: 註冊 Use Case（handler）
        return services;
    }
}