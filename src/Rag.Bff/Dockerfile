# 1) 建置 Vue 前端
FROM node:22-alpine AS web
WORKDIR /web
COPY web/package*.json ./
RUN npm ci
COPY web .
RUN npm run build

# 2) 建置 BFF
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY src/Rag.Domain/*.csproj src/Rag.Domain/
COPY src/Rag.Application/*.csproj src/Rag.Application/
COPY src/Rag.Infrastructure/*.csproj src/Rag.Infrastructure/
COPY src/Rag.Bff/*.csproj src/Rag.Bff/
RUN dotnet restore src/Rag.Bff
COPY src/Rag.Domain src/Rag.Domain
COPY src/Rag.Application src/Rag.Application
COPY src/Rag.Infrastructure src/Rag.Infrastructure
COPY src/Rag.Bff src/Rag.Bff
RUN dotnet publish src/Rag.Bff -c Release -o /out --no-restore

# 3) 執行：前端靜態檔放進 wwwroot，由 BFF 同源提供
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .
COPY --from=web /web/dist ./wwwroot
ENV ASPNETCORE_HTTP_PORTS=8080
ENTRYPOINT ["dotnet", "Rag.Bff.dll"]