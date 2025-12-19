---
id: microservices-intro
title: Arquitetura de Microsserviços
sidebar_label: Microsserviços
---

## O que são Microsserviços?

Estilo arquitetural onde a aplicação é um conjunto de serviços pequenos, independentes e deployáveis separadamente. Cada serviço roda em seu próprio processo e se comunica via APIs leves (HTTP/gRPC).

**Analogia**: Em vez de um restaurante com uma mega-cozinha (monolito), você tem food trucks especializados (microsserviços) - um para pizza, outro para hambúrguer, etc. Cada um opera independentemente.

## Características Principais

### Independência

- Deploy independente
- Banco de dados próprio (se necessário)
- Ciclo de vida autônomo

### Organização por Domínio

- Cada serviço representa uma capacidade de negócio
- Alinhado com bounded contexts (DDD)

### Comunicação

- APIs REST ou gRPC
- Mensageria assíncrona
- Event-driven quando apropriado

## Quando usar?

✅ **Use quando**:

- Aplicação grande com times múltiplos
- Necessidade de escalar partes específicas
- Tecnologias diferentes para diferentes problemas
- Deploy frequente e independente é necessário
- Tolerância a falhas parciais

❌ **Evite quando**:

- Time pequeno (< 5 desenvolvedores)
- Aplicação simples com baixa complexidade
- Overhead de distribuição não se justifica
- Falta de expertise em sistemas distribuídos

## Vantagens

🎯 **Escalabilidade granular**: Escale só o que precisa  
🚀 **Deploy independente**: Times autônomos  
🔧 **Flexibilidade tecnológica**: Cada serviço pode usar stack diferente  
💪 **Resiliência**: Falha isolada não derruba tudo  
📦 **Manutenibilidade**: Serviços menores e focados

## Desafios

⚠️ **Complexidade distribuída**: Debugging, tracing, monitoramento  
🔄 **Consistência de dados**: Transações distribuídas são difíceis  
🌐 **Latência de rede**: Chamadas entre serviços  
📊 **Observabilidade**: Precisa de ferramentas robustas  
🏗️ **Infraestrutura**: Requer DevOps maduro

## Padrões Comuns

### API Gateway

Ponto único de entrada que roteia requisições.

### Service Discovery

Serviços encontram uns aos outros dinamicamente.

### Circuit Breaker

Previne cascata de falhas.

### Saga Pattern

Transações distribuídas com compensação.

## Exemplo Básico

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │────▶│   Order     │────▶│   Payment   │
│  Service    │     │  Service    │     │   Service   │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │                    │
      ▼                    ▼                    ▼
  [User DB]           [Order DB]          [Payment DB]
```

## Tecnologias Comuns

- **Containers**: Docker
- **Orquestração**: Kubernetes
- **Service Mesh**: Istio, Linkerd
- **API Gateway**: Kong, API Gateway (AWS)
- **Mensageria**: Kafka, RabbitMQ

## Anti-Patterns

❌ **Nano-serviços**: Serviços pequenos demais  
❌ **Banco compartilhado**: Acoplamento de dados  
❌ **Comunicação síncrona excessiva**: Acoplamento temporal  
❌ **Falta de monitoramento**: Debugging impossível

## Pontos de Atenção

### 💡 Dicas para Certificação

**Palavras-chave que indicam Microsserviços:**

- ✅ "Times independentes"
- ✅ "Escalar componentes específicos"
- ✅ "Deploy independente"
- ✅ "Tecnologias diferentes"
- ✅ "Falha isolada"
- ✅ "Domain-Driven Design"
- ✅ "Alta disponibilidade com degradação"

**Palavras-chave que NÃO indicam Microsserviços:**

- ❌ "Time pequeno" (< 10 pessoas)
- ❌ "Aplicação simples"
- ❌ "Startup/MVP"
- ❌ "Sem experiência em sistemas distribuídos"
- ❌ "Budget limitado"

### ⚠️ Pegadinhas Comuns

**1. Microsserviços ≠ SOA (Service-Oriented Architecture)**

Embora relacionados, há diferenças importantes:

| Característica     | SOA                          | Microsserviços             |
| ------------------ | ---------------------------- | -------------------------- |
| **Tamanho**        | Serviços maiores             | Serviços pequenos          |
| **Comunicação**    | ESB (Enterprise Service Bus) | APIs leves (REST/gRPC)     |
| **Banco de dados** | Pode compartilhar            | Banco próprio              |
| **Deploy**         | Monolítico (ESB)             | Completamente independente |
| **Governança**     | Centralizada                 | Descentralizada            |

**Em prova:**

- SOA = Mais antigo, ESB centralizado
- Microsserviços = Moderno, descentralizado

**2. Tamanho do Serviço - Quanto é "micro"?**

❌ **Erro**: "Microsserviço precisa ter < 100 linhas de código"  
✅ **Correto**: "Tamanho adequado para um time manter (2-pizza team)"

**Regra prática:**

- 1 serviço = 1 bounded context (DDD)
- Pequeno o suficiente para reescrever em 2 semanas
- Grande o suficiente para ter valor de negócio

**3. Banco de Dados por Serviço**

✅ **Correto**: Cada microsserviço tem seu próprio banco de dados (ou schema)

❌ **Anti-pattern**: Todos os serviços compartilhando mesmo banco

**Por quê?**

- Evita acoplamento de dados
- Permite escolher DB adequado para cada serviço
- Permite escalar dados independentemente

**Como compartilhar dados então?**

- APIs entre serviços
- Event-driven (pub/sub)
- CQRS com read replicas

**4. Transações Distribuídas são DIFÍCEIS**

**Problema:**

```
Compra = Criar Pedido + Reduzir Estoque + Cobrar Pagamento
         (Service A)   (Service B)     (Service C)

E se Service C falhar? Como reverter A e B?
```

**Soluções:**

**a) Saga Pattern (mais comum em prova):**

```
Coreografia (eventos):
1. OrderService → PedidoCriado
2. StockService → EstoqueReduzido OU FalhaEstoque (compensação)
3. PaymentService → PagamentoCobrado OU FalhaPagamento (compensação)

Se falhar: Eventos de compensação revertem operações
```

**b) Two-Phase Commit (2PC):**

- ❌ Raramente usado (complexo, lento)
- ✅ Use Saga em vez de 2PC

**Em prova:**

- Pergunta sobre transações distribuídas → **Saga Pattern**
- Pergunta sobre consistência → **Eventual Consistency**

**5. Comunicação: Síncrona vs Assíncrona**

**Síncrona (REST/gRPC):**

- ✅ Simples de implementar
- ❌ Acoplamento temporal (precisa estar disponível)
- ❌ Cascata de falhas

**Assíncrona (Message Queue/Events):**

- ✅ Desacoplamento total
- ✅ Resistente a falhas
- ❌ Mais complexo (eventual consistency)

**Regra para prova:**

- Operações críticas de negócio → Assíncrona
- Queries simples → Síncrona OK
- "Alta disponibilidade" → Preferir assíncrona

**6. Circuit Breaker - Padrão Essencial**

**Problema:**

```
Service A chama Service B
Service B está lento/falhando
Service A fica esperando → timeout → trava tudo
```

**Solução: Circuit Breaker**

```
Estados:
1. Closed (normal): Requisições passam
2. Open (falhas detectadas): Retorna erro imediato
3. Half-Open (teste): Tenta novamente após timeout

Threshold: 50% de falhas em 10 req → abre circuito
```

**Em prova:**

- "Prevenir cascata de falhas" → **Circuit Breaker**
- "Degradação graciosa" → **Circuit Breaker + Fallback**

### 🎯 Quando Usar vs Quando NÃO Usar

**✅ USE Microsserviços quando:**

1. **Time grande** (> 30 desenvolvedores)

   - Múltiplos times precisam autonomia
   - Conway's Law: Arquitetura espelha estrutura do time

2. **Escalabilidade diferenciada**

   - Login precisa 10x mais capacidade que Admin Panel
   - Permite escalar serviços independentemente

3. **Deploy frequente**

   - Múltiplos deploys por dia
   - Releases independentes por time

4. **Tecnologias diferentes**

   - ML model em Python, API em Node.js, processamento em Go

5. **Domínio complexo**
   - Bounded contexts claros
   - Subdomínios bem definidos

**❌ NÃO USE Microsserviços quando:**

1. **Time pequeno** (< 10 pessoas)

   - Overhead operacional muito alto
   - Falta de especialização

2. **MVP/Startup**

   - Velocidade > Escala
   - Requisitos mudam rapidamente

3. **Falta de expertise**

   - Sem experiência em sistemas distribuídos
   - Sem cultura DevOps madura

4. **Domínio simples**

   - CRUD básico
   - Pouca lógica de negócio

5. **Budget limitado**
   - Infraestrutura complexa = custo alto
   - Ferramentas de monitoramento, service mesh, etc.

### 📊 Métricas e Monitoramento

**Para prova - Conceitos importantes:**

**Distributed Tracing:**

- Rastreia requisição através de múltiplos serviços
- Ferramentas: Jaeger, Zipkin, AWS X-Ray

**Service Mesh:**

- Gerencia comunicação service-to-service
- Ferramentas: Istio, Linkerd

**Observabilidade (3 Pilares):**

1. **Logs**: O que aconteceu
2. **Métricas**: Quantas vezes, quão rápido
3. **Traces**: Caminho da requisição

**SLA vs SLO vs SLI:**

- **SLA**: Service Level Agreement (contrato)
- **SLO**: Service Level Objective (meta interna)
- **SLI**: Service Level Indicator (métrica real)

### 🔐 Segurança em Microsserviços

**Autenticação vs Autorização:**

**Autenticação (quem é?):**

- JWT tokens
- OAuth 2.0
- API Gateway valida token

**Autorização (o que pode fazer?):**

- Cada serviço valida permissões
- Não confiar apenas no gateway

**Service-to-Service Auth:**

- mTLS (mutual TLS)
- Service mesh
- API keys por serviço

**Em prova:**

- "Autenticar usuários" → API Gateway + JWT
- "Comunicação segura entre serviços" → mTLS

### 🚀 Migração de Monolito para Microsserviços

**Estratégia (Strangler Fig Pattern):**

```
Fase 1: Monolito + Roteador
┌────────────────┐
│   API Gateway  │
└────────────────┘
        │
   ┌────┴────┐
   ▼         ▼
Monolito   (vazio)

Fase 2: Extrair serviços gradualmente
┌────────────────┐
│   API Gateway  │
└────────────────┘
        │
   ┌────┴────┐
   ▼         ▼
Monolito   Serviço A
(menor)    Serviço B

Fase 3: Monolito desaparece
┌────────────────┐
│   API Gateway  │
└────────────────┘
        │
   ┌────┴────┬─────┐
   ▼         ▼     ▼
Serviço A  Serv B  Serv C
```

**Ordem de extração:**

1. Funcionalidades periféricas primeiro
2. Serviços com poucos dependentes
3. Core business por último

**Em prova:**

- "Migrar gradualmente" → **Strangler Fig Pattern**
- "Sem reescrever tudo" → **Incremental migration**

## Próximos Passos

- Entenda bem [monolitos](monolith-intro.md) primeiro
- Considere [event-driven](event-driven-intro.md) para comunicação
- Explore padrões de resiliência
