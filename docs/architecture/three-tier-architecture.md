---
id: three-tier-architecture
title: Arquitetura Three-Tier (Três Camadas)
sidebar_label: Three-Tier
---

## O que é Three-Tier Architecture?

Arquitetura Three-Tier (Três Camadas) é um padrão de design que separa a aplicação em três camadas lógicas distintas: **Apresentação** (frontend), **Lógica de Negócio** (backend/aplicação), e **Dados** (banco de dados). Cada camada tem responsabilidades específicas e pode ser desenvolvida, implantada e escalada independentemente.

**Analogia**: Como um restaurante - o salão (apresentação) onde clientes pedem, a cozinha (lógica) que prepara, e a despensa (dados) que armazena ingredientes. Cada área tem função específica e pode operar independentemente.

## Para que serve

A arquitetura de três camadas resolve problemas fundamentais de organização e manutenção de sistemas:

### Separação de Responsabilidades

- **Apresentação**: Interface com usuário (UI/UX)
- **Lógica**: Processamento de regras de negócio
- **Dados**: Persistência e recuperação de informações

### Benefícios Práticos

✅ **Manutenção facilitada**: Alterações em uma camada não afetam as outras  
✅ **Escalabilidade independente**: Escalar frontend, backend e banco separadamente  
✅ **Segurança**: Banco de dados isolado da internet  
✅ **Reutilização**: Mesma API serve múltiplos frontends (web, mobile, desktop)  
✅ **Times especializados**: Frontend, backend e DBA podem trabalhar independentemente

## Como funciona

### Camada 1: Presentation Layer (Camada de Apresentação)

**Responsabilidade**: Interface com o usuário

- Renderiza UI (HTML, CSS, JavaScript)
- Captura input do usuário
- Exibe dados formatados
- Comunica-se apenas com a camada de lógica

**Tecnologias Comuns**:

- Web: React, Angular, Vue.js
- Mobile: React Native, Flutter
- Desktop: Electron, WPF

### Camada 2: Application Layer (Camada de Lógica/Negócio)

**Responsabilidade**: Processar requisições e executar regras de negócio

- Valida dados recebidos
- Executa lógica de negócio
- Processa cálculos e transformações
- Coordena acesso aos dados
- Retorna respostas para apresentação

**Tecnologias Comuns**:

- Node.js (Express, NestJS)
- Java (Spring Boot)
- Python (Django, FastAPI)
- .NET (ASP.NET Core)
- Go (Gin, Echo)

### Camada 3: Data Layer (Camada de Dados)

**Responsabilidade**: Persistir e recuperar dados

- Armazena dados persistentes
- Executa queries e operações CRUD
- Garante integridade dos dados
- Backups e recuperação

**Tecnologias Comuns**:

- Relacionais: PostgreSQL, MySQL, SQL Server
- NoSQL: MongoDB, DynamoDB, Cassandra
- Cache: Redis, Memcached

### Fluxo de Comunicação

```
┌─────────────────────────┐
│   Presentation Layer    │  ← Usuário interage aqui
│  (React, Mobile App)    │
└───────────┬─────────────┘
            │ HTTP/REST/GraphQL
            ▼
┌─────────────────────────┐
│   Application Layer     │  ← Lógica de negócio
│   (Node.js, Spring)     │
└───────────┬─────────────┘
            │ SQL/ORM
            ▼
┌─────────────────────────┐
│      Data Layer         │  ← Armazenamento
│   (PostgreSQL, Mongo)   │
└─────────────────────────┘
```

## Exemplo Prático

### Cenário: E-commerce - Adicionar item ao carrinho

#### 1. Presentation Layer (React)

```javascript
// Frontend: Componente React
function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      // Chama API da camada de aplicação
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      const data = await response.json();
      alert("Item adicionado ao carrinho!");
    } catch (error) {
      alert("Erro ao adicionar item");
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>R$ {product.price}</p>
      <button onClick={addToCart}>Adicionar ao Carrinho</button>
    </div>
  );
}
```

#### 2. Application Layer (Node.js/Express)

```javascript
// Backend: Controller + Service
const express = require("express");
const router = express.Router();

// Controller
router.post("/api/cart/items", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // do JWT token

    // Validação (regra de negócio)
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantidade inválida" });
    }

    // Service - lógica de negócio
    const cartItem = await CartService.addItem({
      userId,
      productId,
      quantity,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar item" });
  }
});

// Service - Regras de negócio
class CartService {
  static async addItem({ userId, productId, quantity }) {
    // Verifica se produto existe e tem estoque
    const product = await db.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);

    if (!product || product.stock < quantity) {
      throw new Error("Produto indisponível");
    }

    // Adiciona ao carrinho (chamada à camada de dados)
    const result = await db.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + $3
       RETURNING *`,
      [userId, productId, quantity]
    );

    return result.rows[0];
  }
}
```

#### 3. Data Layer (PostgreSQL)

```sql
-- Schema do banco de dados

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Índices para performance
CREATE INDEX idx_cart_user ON cart_items(user_id);
CREATE INDEX idx_cart_product ON cart_items(product_id);
```

## Pontos de Atenção

### 💡 Dicas para Certificação

**Em questões de prova:**

- Three-Tier = 3 camadas **físicas** ou lógicas separadas
- Não confundir com MVC (padrão dentro da camada de aplicação)
- Palavra-chave: "separação de responsabilidades"
- Se questão menciona "escalabilidade independente", pense em three-tier

**Comparação com outros padrões:**

| Padrão            | Camadas   | Foco                     |
| ----------------- | --------- | ------------------------ |
| **Three-Tier**    | 3 físicas | Separação infraestrutura |
| **MVC**           | 3 lógicas | Padrão de código         |
| **Monolito**      | 1 física  | Tudo junto               |
| **Microservices** | N físicas | Serviços independentes   |

### ⚠️ Pegadinhas Comuns

**1. Three-Tier NÃO é o mesmo que MVC**

❌ **Errado**: "Three-tier é frontend com MVC"  
✅ **Correto**: "Three-tier separa UI, lógica e dados em camadas físicas distintas. MVC organiza código dentro da camada de aplicação"

**2. Camadas vs Tiers**

- **Tier** (Camada física): Diferentes servidores/containers
- **Layer** (Camada lógica): Organização de código

Three-Tier geralmente tem 3 **tiers físicos**:

- Servidor web (nginx, Apache)
- Servidor de aplicação (Node, Java)
- Servidor de banco de dados (PostgreSQL, MySQL)

**3. Comunicação Direta entre Camadas**

❌ **Errado**: Presentation → Data (pular Application)  
✅ **Correto**: Presentation → Application → Data

Frontend NUNCA deve acessar banco diretamente (segurança e lógica)

**4. Confusão com N-Tier**

- **3-Tier**: Especificamente 3 camadas
- **N-Tier**: Número variável (pode ter 4, 5+ camadas)

**5. Escalabilidade**

Em questões sobre "como escalar":

- Horizontal: Adicionar mais servidores na mesma camada
- Vertical: Aumentar recursos do servidor
- Three-tier permite escalar cada camada independentemente

### 🎯 Quando Usar Three-Tier

✅ **Use quando:**

- Aplicação de médio/grande porte
- Necessidade de escalar partes diferentes
- Múltiplos clientes (web, mobile, API pública)
- Segurança é prioridade (isolar banco de dados)
- Times separados (frontend, backend, DBA)

❌ **Evite quando:**

- MVP ou protótipo rápido
- Aplicação muito simples
- Time muito pequeno (overhead de manutenção)
- Necessidade de deploy extremamente rápido

### 🔒 Segurança

**Pontos importantes para prova:**

- **Camada de dados nunca exposta à internet**
- **Application layer valida TUDO** (nunca confie no frontend)
- **Principle of Least Privilege**: Cada camada só acessa o necessário
- **Defense in Depth**: Firewall entre cada camada

```
Internet → [Firewall] → Presentation
                          ↓
              [Firewall] → Application
                          ↓
              [Firewall] → Database (rede privada)
```

### 📊 Performance

- **Cache** pode ser adicionado entre camadas
- **Load Balancer** na frente da presentation e application
- **Database Replication** para leitura/escrita separada
- **CDN** para assets estáticos da presentation

---

**Recursos Externos:**

- <a href="https://www.ibm.com/topics/three-tier-architecture" target="_blank" rel="noopener noreferrer">IBM - Three-Tier Architecture</a>
- <a href="https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier" target="_blank" rel="noopener noreferrer">Microsoft - N-tier architecture style</a>
- <a href="https://aws.amazon.com/architecture/three-tier-architecture/" target="_blank" rel="noopener noreferrer">AWS - Three-Tier Web Application</a>
