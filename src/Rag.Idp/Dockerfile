FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY src/Rag.Idp/*.csproj src/Rag.Idp/
RUN dotnet restore src/Rag.Idp
COPY src/Rag.Idp src/Rag.Idp
RUN dotnet publish src/Rag.Idp -c Release -o /out --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .
ENV ASPNETCORE_HTTP_PORTS=8080
ENTRYPOINT ["dotnet", "Rag.Idp.dll"]