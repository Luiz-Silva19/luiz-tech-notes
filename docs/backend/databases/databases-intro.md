---
id: databases-intro
title: Bancos de Dados
sidebar_label: Bancos de Dados
---

## O que são Bancos de Dados?

Sistemas organizados para armazenar, gerenciar e recuperar dados de forma eficiente e confiável. Fundamentais para persistir informação em aplicações.

**Analogia**: Banco de dados é como uma biblioteca - tem organização (esquema), catalogação (índices), e regras de empréstimo (transações). Você pode buscar informação específica rapidamente sem revirar tudo.

## Tipos Principais

### Relacionais (SQL)

Dados estruturados em tabelas com relacionamentos.

### Não-Relacionais (NoSQL)

Dados sem esquema fixo, flexibilidade.

## Bancos Relacionais (SQL)

### Características

- **Estrutura rígida**: Esquema definido (tabelas, colunas, tipos)
- **ACID**: Atomicidade, Consistência, Isolamento, Durabilidade
- **Relacionamentos**: Foreign keys, joins
- **SQL**: Linguagem padrão de consulta

### Quando usar?

✅ **Ideal para**:

- Dados estruturados e relacionados
- Necessidade de transações ACID
- Integridade referencial importante
- Consultas complexas com joins
- Reporting e analytics

### Principais Bancos SQL

#### PostgreSQL

Open-source, robusto, features avançadas.

```sql
-- Criar tabela
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir
INSERT INTO users (name, email)
VALUES ('João Silva', 'joao@example.com');

-- Consultar
SELECT * FROM users WHERE email = 'joao@example.com';

-- Relacionamento
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10, 2),
  status VARCHAR(20)
);

-- Join
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';
```

#### MySQL

Popular, rápido, fácil de usar.

#### SQL Server

Microsoft, integração com ecossistema Windows.

#### SQLite

Leve, embedded, sem servidor.

### Conceitos SQL

#### Primary Key

Identificador único da linha.

#### Foreign Key

Referência a outra tabela.

#### Índices

Aceleram buscas.

```sql
CREATE INDEX idx_users_email ON users(email);
```

#### Transações

Operações atômicas.

```sql
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

#### Normalização

Organizar dados para reduzir redundância.

- **1NF**: Valores atômicos
- **2NF**: Sem dependências parciais
- **3NF**: Sem dependências transitivas

## Bancos Não-Relacionais (NoSQL)

### Tipos de NoSQL

#### Document Store

Documentos JSON/BSON.

**MongoDB**:

```javascript
// Inserir
db.users.insertOne({
  name: "João Silva",
  email: "joao@example.com",
  addresses: [{ street: "Rua A", city: "São Paulo" }],
  createdAt: new Date(),
});

// Buscar
db.users.findOne({ email: "joao@example.com" });

// Atualizar
db.users.updateOne(
  { email: "joao@example.com" },
  { $set: { name: "João S. Silva" } }
);

// Query complexa
db.orders.find({
  status: "completed",
  total: { $gte: 100 },
  createdAt: { $gte: new Date("2024-01-01") },
});
```

**Quando usar**:

- Dados semi-estruturados
- Esquema flexível
- Desenvolvimento ágil
- Escalabilidade horizontal

#### Key-Value Store

Pares chave-valor simples.

**Redis**:

```javascript
// Set
await redis.set("user:123", JSON.stringify(user));

// Get
const user = JSON.parse(await redis.get("user:123"));

// Expire
await redis.setex("session:abc", 3600, sessionData);

// Lists
await redis.lpush("queue:emails", email);
const email = await redis.rpop("queue:emails");

// Sets
await redis.sadd("tags:post:123", "javascript", "nodejs");
```

**Quando usar**:

- Cache
- Sessões
- Contadores
- Filas
- Rate limiting

#### Column-Family Store

Dados em colunas, não linhas.

**Cassandra**:

- Alta escalabilidade
- Write-heavy workloads
- Time-series data
- IoT applications

#### Graph Database

Relacionamentos complexos.

**Neo4j**:

```cypher
// Criar nós
CREATE (u:User {name: 'João', email: 'joao@example.com'})
CREATE (p:Post {title: 'Hello World'})

// Criar relacionamento
MATCH (u:User {name: 'João'})
MATCH (p:Post {title: 'Hello World'})
CREATE (u)-[:WROTE]->(p)

// Query
MATCH (u:User)-[:FOLLOWS]->(friend)-[:WROTE]->(post)
WHERE u.name = 'João'
RETURN post.title
```

**Quando usar**:

- Redes sociais
- Recomendações
- Detecção de fraude
- Grafos de conhecimento

## SQL vs NoSQL

| Aspecto         | SQL                       | NoSQL                       |
| --------------- | ------------------------- | --------------------------- |
| Esquema         | Rígido                    | Flexível                    |
| Escalabilidade  | Vertical (principalmente) | Horizontal                  |
| Transações      | ACID forte                | BASE (eventual consistency) |
| Relacionamentos | Joins nativos             | Denormalização              |
| Queries         | SQL complexo              | APIs específicas            |
| Uso             | Dados estruturados        | Dados diversos              |

## Conceitos Importantes

### ACID (SQL)

- **Atomicity**: Tudo ou nada
- **Consistency**: Dados sempre válidos
- **Isolation**: Transações isoladas
- **Durability**: Dados persistidos

### BASE (NoSQL)

- **Basically Available**: Sempre disponível
- **Soft state**: Estado pode mudar
- **Eventual consistency**: Consistência eventual

### CAP Theorem

Impossível ter os 3 simultaneamente:

- **Consistency**: Todos veem mesmos dados
- **Availability**: Sempre responde
- **Partition tolerance**: Funciona com falhas de rede

Escolha 2 de 3:

- **CA**: Bancos SQL tradicionais
- **CP**: MongoDB, HBase
- **AP**: Cassandra, DynamoDB

## Indexação

Acelera buscas, desacelera escritas.

### Tipos de Índices

#### B-Tree (padrão)

```sql
CREATE INDEX idx_users_email ON users(email);
```

#### Hash

Rápido para igualdade exata.

#### Full-Text

Busca textual.

```sql
CREATE FULLTEXT INDEX idx_posts_content ON posts(content);
SELECT * FROM posts WHERE MATCH(content) AGAINST('search term');
```

#### Composite

Múltiplas colunas.

```sql
CREATE INDEX idx_users_name_email ON users(name, email);
```

### Boas Práticas de Índices

✅ Indexe colunas em WHERE, JOIN, ORDER BY  
✅ Não indexe tudo (overhead em writes)  
✅ Monitore uso de índices  
❌ Não indexe colunas de baixa cardinalidade  
❌ Evite índices em tabelas pequenas

## Otimização de Queries

### EXPLAIN

Analisa plano de execução.

```sql
EXPLAIN SELECT * FROM users WHERE email = 'joao@example.com';
```

### N+1 Problem

```javascript
// ❌ N+1 queries
const users = await User.findAll();
for (const user of users) {
  user.posts = await Post.findByUserId(user.id); // N queries!
}

// ✅ 1 query com join
const users = await User.findAll({
  include: [{ model: Post }],
});
```

### SELECT específico

```sql
-- ❌ Evite
SELECT * FROM users;

-- ✅ Selecione apenas necessário
SELECT id, name, email FROM users;
```

## Caching

### Query Cache

Cache de resultados.

### Object Cache

Cache de objetos (Redis, Memcached).

```javascript
// Cache pattern
async function getUser(id) {
  // 1. Tentar cache
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);

  // 2. Buscar no DB
  const user = await db.users.findById(id);

  // 3. Cachear
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));

  return user;
}
```

## Migrações

Versionamento de esquema.

```javascript
// Migration: Create users table
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 255).unique().notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
```

## ORMs (Object-Relational Mapping)

Abstração sobre banco de dados.

### Sequelize (Node.js)

```javascript
const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

// Usar
const user = await User.create({
  name: "João",
  email: "joao@example.com",
});

const users = await User.findAll({
  where: { name: "João" },
  include: [Order],
});
```

### Prisma (Node.js/TypeScript)

```typescript
// schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]
}

// Use
const user = await prisma.user.create({
  data: {
    name: 'João',
    email: 'joao@example.com'
  }
});
```

## Escalabilidade

### Replicação

Cópias do banco.

- **Master-Slave**: Escrita no master, leitura nos slaves
- **Multi-Master**: Escrita em múltiplos

### Sharding

Particionar dados horizontalmente.

```
User ID 1-1000   → Shard 1
User ID 1001-2000 → Shard 2
User ID 2001-3000 → Shard 3
```

### Connection Pooling

Reuso de conexões.

```javascript
const pool = new Pool({
  max: 20, // Máximo de conexões
  min: 5, // Mínimo sempre aberto
  idle: 10000, // Timeout idle
});
```

## Backup e Recovery

### Estratégias

#### Full Backup

Cópia completa.

#### Incremental

Apenas mudanças.

#### Point-in-Time Recovery

Restaurar para momento específico.

```bash
# PostgreSQL
pg_dump mydb > backup.sql
psql mydb < backup.sql

# MongoDB
mongodump --db mydb
mongorestore --db mydb dump/mydb/
```

## Segurança

✅ **Least privilege**: Mínimo de permissões necessário  
✅ **Prepared statements**: Previne SQL injection  
✅ **Encryption at rest**: Dados criptografados no disco  
✅ **Encryption in transit**: SSL/TLS  
✅ **Auditoria**: Log de acessos  
✅ **Backup regular**: E teste de restore!

```javascript
// ❌ SQL Injection vulnerável
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Prepared statement
const query = "SELECT * FROM users WHERE email = ?";
db.execute(query, [email]);
```

## Monitoramento

Métricas importantes:

- **Query performance**: Queries lentas
- **Connection pool**: Uso de conexões
- **Cache hit rate**: Eficiência do cache
- **Replication lag**: Atraso em réplicas
- **Disk usage**: Espaço em disco
- **Lock waits**: Contenção

## Boas Práticas

✅ **Normalize, then denormalize**: Comece normalizado, denormalize se necessário  
✅ **Index strategically**: Não todos, mas os certos  
✅ **Monitor slow queries**: EXPLAIN é seu amigo  
✅ **Use connection pooling**: Não abra/feche sempre  
✅ **Backups regulares**: E teste restauração!  
✅ **Migrations**: Versione mudanças no esquema  
✅ **Security**: Prepared statements, least privilege  
✅ **Caching**: Redis para hot data

## Escolhendo o Banco

### Use PostgreSQL se:

- Precisa ACID robusto
- Queries complexas
- Dados estruturados
- Features avançadas (JSON, full-text, etc)

### Use MongoDB se:

- Esquema flexível
- Desenvolvimento ágil
- Dados semi-estruturados
- Escalabilidade horizontal

### Use Redis se:

- Cache
- Sessões
- Real-time
- Pub/Sub

### Use Cassandra se:

- Write-heavy
- Time-series
- Escalabilidade massiva
- Alta disponibilidade

## Anti-Patterns

❌ **God table**: Tabela gigante com tudo  
❌ **No indexes**: Queries lentas  
❌ **Over-indexing**: Writes lentos  
❌ **SELECT \***: Desperdício  
❌ **No connection pooling**: Overhead  
❌ **Falta de backups**: Desastre esperando acontecer  
❌ **SQL injection**: Vulnerabilidade crítica

## Recursos

- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [MongoDB University](https://university.mongodb.com/)
- [SQL Zoo](https://sqlzoo.net/)
- [Database Design (livro)](https://opentextbc.ca/dbdesign01/)

## Próximos Passos

- Pratique SQL com PostgreSQL
- Explore NoSQL com MongoDB
- Configure Redis para cache
- Estude índices e otimização
- Implemente backups automatizados

**Lembre-se**: Escolha do banco de dados impacta arquitetura inteira. Escolha bem desde o início!
