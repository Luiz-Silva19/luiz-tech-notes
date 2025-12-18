---
id: rest-intro
title: APIs REST
sidebar_label: REST APIs
---

# 🌐 APIs REST

## O que é REST?

REST (Representational State Transfer) é um estilo arquitetural para criar APIs web usando HTTP. Define um conjunto de princípios para comunicação entre cliente e servidor.

**Analogia**: REST é como um cardápio de restaurante padronizado - você sempre sabe como pedir (GET), fazer pedido (POST), modificar (PUT) ou cancelar (DELETE). Formato consistente facilita comunicação.

## Princípios REST

### 1. Client-Server

Separação entre cliente e servidor.

- Cliente não se preocupa com armazenamento
- Servidor não se preocupa com interface

### 2. Stateless

Cada requisição contém todas as informações necessárias.

- Servidor não guarda estado do cliente
- Escalabilidade facilitada

### 3. Cacheable

Respostas indicam se podem ser cacheadas.

- Performance melhorada
- Redução de carga no servidor

### 4. Uniform Interface

Interface consistente e previsível.

- Recursos identificados por URIs
- Manipulação via representações
- Mensagens auto-descritivas
- HATEOAS (opcional)

### 5. Layered System

Cliente não sabe se está falando com servidor final.

- Load balancers
- Proxies
- Gateways

## HTTP Methods (Verbos)

### GET - Buscar recurso

```http
GET /api/users/123
Response: 200 OK
{
  "id": 123,
  "name": "João Silva",
  "email": "joao@example.com"
}
```

- ✅ Idempotente
- ✅ Seguro (não modifica)
- ✅ Cacheable

### POST - Criar recurso

```http
POST /api/users
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@example.com"
}

Response: 201 Created
Location: /api/users/124
{
  "id": 124,
  "name": "Maria Santos",
  "email": "maria@example.com"
}
```

- ❌ Não idempotente
- ❌ Não seguro

### PUT - Atualizar recurso completo

```http
PUT /api/users/123
Content-Type: application/json

{
  "name": "João Silva Updated",
  "email": "joao.new@example.com"
}

Response: 200 OK
{
  "id": 123,
  "name": "João Silva Updated",
  "email": "joao.new@example.com"
}
```

- ✅ Idempotente
- ❌ Não seguro

### PATCH - Atualizar parcialmente

```http
PATCH /api/users/123
Content-Type: application/json

{
  "email": "joao.updated@example.com"
}

Response: 200 OK
```

- ⚠️ Não necessariamente idempotente
- ❌ Não seguro

### DELETE - Remover recurso

```http
DELETE /api/users/123

Response: 204 No Content
```

- ✅ Idempotente
- ❌ Não seguro

## Status Codes HTTP

### 2xx - Sucesso

- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado
- **204 No Content**: Sucesso, sem corpo de resposta

### 3xx - Redirecionamento

- **301 Moved Permanently**: Recurso movido permanentemente
- **304 Not Modified**: Cache ainda válido

### 4xx - Erro do Cliente

- **400 Bad Request**: Requisição inválida
- **401 Unauthorized**: Autenticação necessária
- **403 Forbidden**: Sem permissão
- **404 Not Found**: Recurso não encontrado
- **409 Conflict**: Conflito (ex: email duplicado)
- **422 Unprocessable Entity**: Validação falhou
- **429 Too Many Requests**: Rate limit excedido

### 5xx - Erro do Servidor

- **500 Internal Server Error**: Erro genérico
- **502 Bad Gateway**: Gateway inválido
- **503 Service Unavailable**: Serviço indisponível
- **504 Gateway Timeout**: Timeout no gateway

## Design de URLs

### Boas Práticas

✅ **Use substantivos, não verbos**

```
GET /users          ✓
GET /getUsers       ✗
```

✅ **Plural para coleções**

```
GET /users          ✓
GET /user           ✗
```

✅ **Hierarquia clara**

```
GET /users/123/posts/456/comments
```

✅ **Query params para filtros**

```
GET /users?status=active&role=admin
```

✅ **Versionamento**

```
GET /v1/users
GET /v2/users
```

### Exemplos de URLs RESTful

```http
# Usuários
GET    /api/v1/users              # Listar todos
GET    /api/v1/users?page=2       # Paginação
GET    /api/v1/users/123          # Buscar específico
POST   /api/v1/users              # Criar
PUT    /api/v1/users/123          # Atualizar completo
PATCH  /api/v1/users/123          # Atualizar parcial
DELETE /api/v1/users/123          # Deletar

# Posts de um usuário
GET    /api/v1/users/123/posts
POST   /api/v1/users/123/posts

# Busca
GET    /api/v1/users/search?name=João

# Ações não-CRUD (quando necessário)
POST   /api/v1/users/123/activate
POST   /api/v1/users/123/reset-password
```

## Formato de Dados

### Request/Response JSON

```json
// Request
POST /api/v1/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "admin"
}

// Response Success
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/users/123

{
  "id": 123,
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "admin",
  "createdAt": "2024-12-18T10:30:00Z"
}

// Response Error
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## Autenticação e Autorização

### Bearer Token (JWT)

```http
GET /api/v1/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### API Key

```http
GET /api/v1/users
X-API-Key: your-api-key-here
```

### OAuth 2.0

Delegação de autorização para terceiros.

## Paginação

### Offset-based

```http
GET /api/v1/users?page=2&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Cursor-based

```http
GET /api/v1/users?cursor=abc123&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "nextCursor": "xyz789",
    "hasMore": true
  }
}
```

## Filtros e Ordenação

```http
# Filtros
GET /api/v1/users?status=active&role=admin

# Ordenação
GET /api/v1/users?sort=createdAt&order=desc

# Busca
GET /api/v1/users?search=joão

# Combinado
GET /api/v1/users?status=active&sort=name&order=asc&page=1&limit=20
```

## Versionamento

### URL Path (Recomendado)

```
/api/v1/users
/api/v2/users
```

### Header

```http
GET /api/users
Accept: application/vnd.myapi.v1+json
```

### Query Parameter

```
/api/users?version=1
```

## CORS (Cross-Origin Resource Sharing)

```http
# Preflight request
OPTIONS /api/v1/users
Origin: https://example.com

# Response
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Rate Limiting

```http
GET /api/v1/users

Response Headers:
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1640000000

# Quando exceder
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
```

## Documentação

### OpenAPI (Swagger)

```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List all users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
      responses:
        "200":
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
```

## Boas Práticas

✅ **Use HTTPS**: Sempre, sem exceções  
✅ **Versionamento**: Desde o início  
✅ **Documentação**: OpenAPI/Swagger  
✅ **Error handling**: Mensagens claras  
✅ **Validation**: Valide input  
✅ **Status codes**: Use corretamente  
✅ **Idempotência**: PUT e DELETE  
✅ **Paginação**: Para listas grandes  
✅ **Rate limiting**: Proteja sua API  
✅ **Logging**: Rastreie requisições

## Exemplo Completo: Node.js/Express

```javascript
const express = require("express");
const app = express();

app.use(express.json());

// GET - Listar
app.get("/api/v1/users", async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const users = await User.find()
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: await User.countDocuments(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST - Criar
app.post("/api/v1/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validação
    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required",
      });
    }

    const user = await User.create({ name, email });

    res.status(201).location(`/api/v1/users/${user.id}`).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET - Buscar específico
app.get("/api/v1/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT - Atualizar
app.put("/api/v1/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE - Remover
app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## Anti-Patterns

❌ **Verbos em URLs**: `/getUser`, `/createUser`  
❌ **Status codes errados**: 200 para erro  
❌ **Falta de versionamento**: Quebra clientes  
❌ **Dados sensíveis em GET**: Use POST  
❌ **Não validar input**: Vulnerabilidades  
❌ **Ignorar idempotência**: Inconsistências  
❌ **Sem rate limiting**: Abuse de API

## Alternativas a REST

- **GraphQL**: Cliente define exatamente o que quer
- **gRPC**: Protocol Buffers, alta performance
- **WebSockets**: Comunicação bidirecional real-time

## Ferramentas

- **Postman**: Testar APIs
- **Insomnia**: Cliente REST
- **Swagger UI**: Documentação interativa
- **curl**: CLI para requests HTTP

## Recursos

- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [OpenAPI Specification](https://swagger.io/specification/)

## Próximos Passos

- Implemente uma API REST completa
- Adicione autenticação JWT
- Configure rate limiting
- Documente com OpenAPI/Swagger
- Integre com [CI/CD](../../devops/ci-cd/cicd-intro.md)

**Lembre-se**: Consistência e convenções são chave para APIs de qualidade!
