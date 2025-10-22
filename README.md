# To-Do-List (Monorepo)

Monorepo contendo dois projetos:

* `frontend/` — cliente em **Angular**
* `backend/` — API em **ASP.NET Core**

---

## Estrutura do repositório

```
/ (root)
├─ frontend/          # app Angular (frontend)
├─ backend/           # API ASP.NET Core (backend)
├─ .gitignore
├─ .gitattributes
└─ README.md (this file)
```

---

## Visão geral

Este repositório reúne o frontend e o backend da aplicação *To-Do-List*. A ideia é facilitar desenvolvimento conjunto, testes locais e versionamento.

---

## Pré-requisitos

* Editor (VS Code ou Visual Studio)
* Node.js (recomendado v16+)
* .NET SDK (recomendado .NET 7+)
* SQL Server (local ou remoto)

---

## Quickstart — rodando localmente

Abra dois terminais (um para backend e outro para frontend).

> Observação: os comandos abaixo assumem um ambiente de desenvolvimento (PowerShell/Terminal).

### Backend (API)

**Tecnologias:** ASP.NET Core Web API, Entity Framework Core, Identity, AutoMapper e Swagger.

No terminal do backend:
```powershell
cd backend
dotnet restore
dotnet build
dotnet run
```

A API ficará disponível em `https://localhost:7260` e `http://localhost:5006` — confirme a URL/porta observando a saída do `dotnet run`.

#### Banco de dados

Edite a connection string em `appsettings.json`:

```
Server=localhost;Database=ToDoListDb;User ID=to-do-list;Password=to-do-list@123;TrustServerCertificate=True;
```

A base é gerenciada por migrations do Entity Framework. Para aplicar as migrations manualmente:

```powershell
# no diretório backend
dotnet tool install --global dotnet-ef    # se ainda não tiver o dotnet-ef
dotnet ef database update
```

> Observação: Ao iniciar a aplicação, as migrations serão aplicadas automaticamente.

#### Configuração da API (JWT)

Exemplo de configuração no `appsettings.json`:

```json
"Jwt": {
  "Key": "DDHQtNkAMTIZhomJ4kQdgijdOzQ3tiLlSSiVZyHYvpBV5HuxK4m0wThmcfzgCJDg",
  "Issuer": "ToDoListApi",
  "Audience": "ToDoListApiClient",
  "AccessTokenExpirationMinutes": 180
}
```

> Segurança: não armazene chaves sensíveis em `appsettings.json` para ambientes de produção. Prefira variáveis de ambiente, Azure Key Vault ou user-secrets.

---

### Frontend (Angular)

**Tecnologias:** Angular, TypeScript, RxJS, Bootstrap e Bootstrap-Icon.

No terminal do frontend:
```powershell
cd frontend
npm install
npm start
```

Por padrão o frontend ficará disponível em `http://localhost:4200`.
