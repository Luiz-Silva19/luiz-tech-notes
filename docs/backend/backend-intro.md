---
id: backend-intro
title: Backend & Integrações
sidebar_label: Visão Geral
---

# 💻 Backend & Integrações

## O que é Backend?

Backend é a parte do sistema que roda no servidor, lidando com lógica de negócio, processamento de dados, autenticação, e comunicação com bancos de dados. É o "cérebro" da aplicação.

**Analogia**: Se uma aplicação fosse um restaurante, o backend seria a cozinha - onde a mágica acontece, invisível para o cliente (frontend), mas essencial para entregar o produto final.

## Responsabilidades do Backend

### Processamento de Dados

Validar, transformar e processar informações.

### Persistência

Salvar e recuperar dados de bancos de dados.

### Autenticação e Autorização

Quem é o usuário? O que ele pode fazer?

### Integração

Comunicação com outros sistemas e serviços.

### Lógica de Negócio

Regras e processos específicos do domínio.

## Áreas Principais

### [APIs REST](rest/rest-intro.md)

Comunicação HTTP entre cliente e servidor.

### [Mensageria](messaging/messaging-intro.md)

Comunicação assíncrona via filas e eventos.

### [Bancos de Dados](databases/databases-intro.md)

Persistência e consulta de dados.

## Padrões Arquiteturais

### Layered Architecture

- **Presentation**: Controllers, APIs
- **Business Logic**: Services, Use Cases
- **Data Access**: Repositories
- **Database**: Persistência

### MVC (Model-View-Controller)

Separação entre dados, visualização e controle.

### Clean Architecture

Independência de frameworks, testabilidade.

### Hexagonal (Ports & Adapters)

Core isolado, adaptadores para externos.

## Comunicação entre Sistemas

### Síncrona

Cliente espera resposta.

- **REST**: HTTP/JSON
- **GraphQL**: Queries flexíveis
- **gRPC**: Protocol Buffers, high performance

### Assíncrona

Cliente não espera resposta.

- **Message Queues**: RabbitMQ, AWS SQS
- **Event Streaming**: Kafka
- **Pub/Sub**: Redis, Google Pub/Sub

## Conceitos-chave

### Stateless vs Stateful

**Stateless**: Servidor não guarda estado entre requests.

- ✅ Escalável horizontalmente
- ✅ Simples de deployar
- ⚠️ Sessão em storage externo (Redis)

**Stateful**: Servidor mantém estado.

- ⚠️ Mais complexo escalar
- ✅ Performance (cache local)
- ⚠️ Sticky sessions necessárias

### Idempotência

Executar operação múltiplas vezes = mesmo resultado.

```http
GET /users/123        # Idempotente ✓
POST /users           # Não idempotente ✗
PUT /users/123        # Idempotente ✓
DELETE /users/123     # Idempotente ✓
```

### Transações

Operações atômicas - tudo ou nada.

```sql
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

## Segurança

### Autenticação

Identificar o usuário.

- **JWT**: JSON Web Tokens
- **OAuth 2.0**: Delegação de autorização
- **Session-based**: Cookies

### Autorização

Determinar permissões.

- **RBAC**: Role-Based Access Control
- **ABAC**: Attribute-Based Access Control

### Proteções Essenciais

- ✅ HTTPS sempre
- ✅ Input validation
- ✅ SQL Injection prevention
- ✅ CORS configurado corretamente
- ✅ Rate limiting
- ✅ Secrets management

## Performance

### Caching

Armazenar resultados para reuso.

- **In-memory**: Redis, Memcached
- **HTTP cache**: ETags, Cache-Control
- **Database cache**: Query cache

### Database Optimization

- **Indexes**: Acelerar queries
- **Connection pooling**: Reuso de conexões
- **Query optimization**: Evitar N+1, SELECT \*

### Load Balancing

Distribuir requisições entre múltiplos servidores.

## Observabilidade

### Logs

Registro de eventos do sistema.

```
[2024-12-18 10:30:45] INFO: User 123 logged in
[2024-12-18 10:30:50] ERROR: Failed to connect to database
```

### Métricas

Números sobre o sistema.

- Request rate
- Error rate
- Response time
- CPU/Memory usage

### Tracing

Rastreamento de requisições distribuídas.

- Identificar gargalos
- Debugging em microservices

### Ferramentas

- **Logs**: ELK, Loki
- **Métricas**: Prometheus, DataDog
- **Tracing**: Jaeger, Zipkin
- **APM**: New Relic, Dynatrace

## Escalabilidade

### Vertical Scaling (Scale Up)

Aumentar recursos da máquina.

- ✅ Simples
- ❌ Limite físico
- ❌ Downtime

### Horizontal Scaling (Scale Out)

Adicionar mais máquinas.

- ✅ Praticamente ilimitado
- ✅ Alta disponibilidade
- ⚠️ Mais complexo

### Estratégias

- **Stateless servers**: Facilita scale out
- **Database replication**: Read replicas
- **Caching**: Reduz carga no DB
- **CDN**: Cache de assets estáticos
- **Async processing**: Offload work pesado

## Boas Práticas

✅ **Validação de dados**: Never trust user input  
✅ **Error handling**: Graceful degradation  
✅ **Logging estruturado**: JSON logs  
✅ **Health checks**: /health endpoint  
✅ **Versionamento de API**: /v1/users  
✅ **Documentação**: OpenAPI/Swagger  
✅ **Testes**: Unit, integration, e2e  
✅ **CI/CD**: Deploy automatizado

## Tecnologias Populares

### Linguagens

- **Node.js/TypeScript**: JavaScript no servidor
- **Python**: Django, Flask, FastAPI
- **Java**: Spring Boot
- **Go**: Alta performance
- **C#/.NET**: Ecossistema Microsoft
- **Ruby**: Rails

### Frameworks

- **Express.js**: Node.js minimalista
- **NestJS**: Node.js enterprise
- **FastAPI**: Python moderno
- **Spring Boot**: Java enterprise
- **Django**: Python full-featured

## Anti-Patterns

❌ **God Object**: Classe/serviço que faz tudo  
❌ **Hardcoded values**: Use env vars  
❌ **Tight coupling**: Componentes muito dependentes  
❌ **No error handling**: Crashes inevitáveis  
❌ **Premature optimization**: Otimize quando necessário  
❌ **Lack of logging**: Debugging impossível

## API Design

### RESTful Principles

- Recursos como substantivos
- HTTP verbs semânticos
- Status codes apropriados
- HATEOAS (quando aplicável)

### Exemplo

```http
GET    /users          # Listar usuários
POST   /users          # Criar usuário
GET    /users/123      # Buscar usuário
PUT    /users/123      # Atualizar usuário
DELETE /users/123      # Deletar usuário
```

## Testes

### Unit Tests

Testar funções/métodos isolados.

### Integration Tests

Testar integração entre componentes.

### E2E Tests

Testar fluxo completo.

### Contract Tests

Garantir compatibilidade entre serviços.

```javascript
// Exemplo unit test
describe("UserService", () => {
  it("should create user", async () => {
    const user = await userService.create({
      name: "João",
      email: "joao@example.com",
    });
    expect(user.id).toBeDefined();
  });
});
```

## Próximos Passos

Explore cada área em detalhes:

- **[REST APIs](rest/rest-intro.md)**: Fundamentos de APIs HTTP
- **[Mensageria](messaging/messaging-intro.md)**: Comunicação assíncrona
- **[Bancos de Dados](databases/databases-intro.md)**: Persistência de dados

**Lembre-se**: Backend robusto = Aplicação confiável!
