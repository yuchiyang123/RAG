FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY src/Rag.Data/*.csproj src/Rag.Data/
COPY src/Rag.Ingest/*.csproj src/Rag.Ingest/
RUN dotnet restore src/Rag.Ingest
COPY src/Rag.Data src/Rag.Data
COPY src/Rag.Ingest src/Rag.Ingest
RUN dotnet publish src/Rag.Ingest -c Release -o /out --no-restore

FROM mcr.microsoft.com/dotnet/runtime:9.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "Rag.Ingest.dll"]