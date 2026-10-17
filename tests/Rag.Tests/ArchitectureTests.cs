using System.Reflection;

namespace Rag.Tests;

/// <summary>
/// 守住 Clean Architecture 的依賴方向：依賴只能「向內」。
/// 注意：編譯器只會把「真的有用到」的組件寫進參考清單，
/// 所以這些測試抓的是「實際使用」而不是單純的 csproj 參考。
/// </summary>
public class ArchitectureTests
{
    private static string[] RagReferences(string assemblyName) =>
        Assembly.Load(assemblyName)
            .GetReferencedAssemblies()
            .Select(a => a.Name!)
            .Where(n => n.StartsWith("Rag."))
            .ToArray();

    [Fact]
    public void Domain_DependsOnNothingInThisSolution()
        => Assert.Empty(RagReferences("Rag.Domain"));

    [Fact]
    public void Application_OnlyDependsOnDomain()
        => Assert.All(RagReferences("Rag.Application"), n => Assert.Equal("Rag.Domain", n));

    [Fact]
    public void Infrastructure_DoesNotDependOnHosts()
        => Assert.DoesNotContain(RagReferences("Rag.Infrastructure"),
            n => n is "Rag.Bff" or "Rag.Ingest" or "Rag.Idp");
}