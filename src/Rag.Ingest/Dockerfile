FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY src/Rag.Domain/*.csproj src/Rag.Domain/
COPY src/Rag.Application/*.csproj src/Rag.Application/
COPY src/Rag.Infrastructure/*.csproj src/Rag.Infrastructure/
COPY src/Rag.Ingest/*.csproj src/Rag.Ingest/
RUN dotnet restore src/Rag.Ingest
COPY src/Rag.Domain src/Rag.Domain
COPY src/Rag.Application src/Rag.Application
COPY src/Rag.Infrastructure src/Rag.Infrastructure
COPY src/Rag.Ingest src/Rag.Ingest
RUN dotnet publish src/Rag.Ingest -c Release -o /out --no-restore

FROM mcr.microsoft.com/dotnet/runtime:9.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "Rag.Ingest.dll"]