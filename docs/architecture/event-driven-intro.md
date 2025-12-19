---
id: event-driven-intro
title: Arquitetura Orientada a Eventos
sidebar_label: Event-Driven
---

## O que é Event-Driven Architecture?

Padrão arquitetural onde componentes se comunicam através de eventos. Produtores emitem eventos quando algo acontece, e consumidores reagem a esses eventos de forma assíncrona e desacoplada.

**Analogia**: É como um sistema de notificações do WhatsApp. Quando alguém posta uma mensagem (evento), todos do grupo recebem e podem reagir, mas quem postou não precisa esperar ou saber quem vai ler.

## Conceitos Fundamentais

### Evento

Registro de algo que aconteceu no passado.

- **Exemplo**: `PedidoCriado`, `PagamentoAprovado`, `EstoqueAtualizado`
- Imutável (já aconteceu)
- Contém dados do que ocorreu

### Produtor (Producer)

Componente que emite eventos.

- Não sabe quem vai consumir
- Fire and forget

### Consumidor (Consumer)

Componente que reage a eventos.

- Processa eventos de forma assíncrona
- Pode haver múltiplos consumidores

### Event Broker

Intermediário que distribui eventos.

- **Exemplos**: Kafka, RabbitMQ, AWS SNS/SQS

## Quando usar?

✅ **Use quando**:

- Necessita de processamento assíncrono
- Desacoplamento entre componentes é crucial
- Múltiplos sistemas precisam reagir ao mesmo evento
- Escalabilidade e resiliência são prioridades
- Auditoria e histórico são importantes

❌ **Evite quando**:

- Precisa de resposta imediata e síncrona
- Fluxo é estritamente sequencial
- Complexidade não se justifica
- Time não tem experiência com sistemas assíncronos

## Vantagens

🔌 **Desacoplamento**: Produtores e consumidores independentes  
📈 **Escalabilidade**: Processa eventos em paralelo  
💪 **Resiliência**: Falha de um consumidor não afeta outros  
🔄 **Flexibilidade**: Adicionar novos consumidores sem alterar produtores  
📚 **Auditoria**: Eventos formam histórico natural  
⚡ **Performance**: Processamento assíncrono

## Desafios

🤔 **Complexidade**: Debugging e rastreamento mais difíceis  
🔄 **Consistência eventual**: Dados nem sempre sincronizados  
📦 **Duplicação**: Eventos podem ser processados mais de uma vez  
📊 **Ordenação**: Garantir ordem pode ser complexo  
⚠️ **Monitoramento**: Requer observabilidade robusta

## Padrões Comuns

### Event Notification

Notifica que algo aconteceu, dados mínimos.

```
{ "eventType": "PedidoCriado", "pedidoId": "123" }
```

### Event-Carried State Transfer

Evento carrega todos os dados necessários.

```json
{
  "eventType": "PedidoCriado",
  "pedidoId": "123",
  "cliente": "João",
  "valor": 150.00,
  "itens": [...]
}
```

### Event Sourcing

Estado é derivado da sequência de eventos.

- Todos os eventos são salvos
- Estado reconstruído a partir do histórico

### CQRS (Command Query Responsibility Segregation)

Separa leitura e escrita, frequentemente com eventos.

## Exemplo Básico

```
[Pedido Service]
      │
      │ Emite: PedidoCriado
      ▼
 [Event Broker]
      │
      ├──────────┬──────────┬──────────┐
      ▼          ▼          ▼          ▼
  [Email    [Estoque  [Pagamento [Analytics
   Service]  Service]  Service]   Service]
```

## Tecnologias Comuns

### Message Brokers

- **Apache Kafka**: Alto throughput, persistência
- **RabbitMQ**: Flexível, routing complexo
- **AWS SNS/SQS**: Gerenciado, integração AWS
- **Google Pub/Sub**: Gerenciado, Google Cloud
- **Azure Service Bus**: Gerenciado, Azure

### Frameworks

- **Spring Cloud Stream**: Java/Spring
- **MassTransit**: .NET
- **Dapr**: Cloud-native, polyglot

## Event Sourcing vs Event-Driven

| Aspecto      | Event-Driven | Event Sourcing         |
| ------------ | ------------ | ---------------------- |
| Objetivo     | Comunicação  | Persistência de estado |
| Eventos      | Notificações | Fonte da verdade       |
| Complexidade | Média        | Alta                   |
| Uso          | Integrações  | Auditoria, temporal    |

## Exemplo Prático

```javascript
// Produtor
async function criarPedido(pedidoData) {
  const pedido = await pedidoRepository.save(pedidoData);

  await eventBroker.publish("PedidoCriado", {
    pedidoId: pedido.id,
    clienteId: pedido.clienteId,
    valor: pedido.valor,
    timestamp: new Date(),
  });

  return pedido;
}

// Consumidor
eventBroker.subscribe("PedidoCriado", async (evento) => {
  await emailService.enviarConfirmacao(evento.clienteId);
  await estoqueService.reservarItens(evento.pedidoId);
});
```

## Boas Práticas

✅ **Idempotência**: Processar evento múltiplas vezes = mesmo resultado  
✅ **Schemas bem definidos**: Use JSON Schema ou Avro  
✅ **Versionamento**: Eventos evoluem, mantenha compatibilidade  
✅ **Dead Letter Queue**: Eventos que falharam repetidamente  
✅ **Monitoring**: Trace distribuído (Jaeger, Zipkin)  
✅ **At-least-once**: Garanta entrega, trate duplicatas

## Anti-Patterns

❌ **Event chain excessiva**: Eventos gerando eventos infinitos  
❌ **Eventos grandes**: Mantenha leve, use referências  
❌ **Dependência temporal**: Assumir ordem específica  
❌ **Falta de idempotência**: Processamento duplicado causa problemas

## Use Cases Reais

- **E-commerce**: Pedido → Pagamento → Estoque → Envio
- **Banking**: Transação → Auditoria → Notificação → Analytics
- **IoT**: Sensores → Processamento → Alertas → Dashboards

## Pontos de Atenção

### 💡 Dicas para Certificação

**Palavras-chave que indicam Event-Driven:**

- ✅ "Processamento assíncrono"
- ✅ "Desacoplamento"
- ✅ "Múltiplos consumidores"
- ✅ "Eventual consistency"
- ✅ "Auditoria/histórico"
- ✅ "Escalabilidade de processamento"
- ✅ "Reação a mudanças"

**Comparação: Síncrono vs Assíncrono**

| Aspecto            | Síncrono (REST)             | Assíncrono (Events) |
| ------------------ | --------------------------- | ------------------- |
| **Resposta**       | Imediata                    | Eventual            |
| **Acoplamento**    | Temporal (precisa estar UP) | Desacoplado         |
| **Falha**          | Bloqueia requisição         | Retry automático    |
| **Escalabilidade** | Limitada                    | Alta (fila buffer)  |
| **Complexidade**   | Baixa                       | Alta                |

**Em prova:**

- "Precisa de resposta imediata" → Síncrono (REST)
- "Pode processar depois" → Assíncrono (Events)

### ⚠️ Pegadinhas Comuns

**1. Event-Driven ≠ Event Sourcing**

Muita confusão entre os dois!

**Event-Driven Architecture:**

- Comunicação via eventos
- Estado atual no banco de dados
- Eventos para integração

```
PedidoCriado → Service B reage
Banco guarda: {pedido_id: 1, status: "criado"}
```

**Event Sourcing:**

- Eventos são a fonte da verdade
- Estado é derivado dos eventos
- Histórico completo preservado

```
Eventos: [PedidoCriado, ItemAdicionado, PagamentoAprovado]
Estado atual = replay de todos eventos
Banco guarda: eventos, não estado
```

**Em prova:**

- Event-Driven = Arquitetura de comunicação
- Event Sourcing = Padrão de persistência

**2. Consistência Eventual é DIFÍCIL**

**Problema:**

```
Usuário cria pedido → "Pedido criado com sucesso!"
Mas... email ainda não foi enviado (processando)
E... estoque ainda não foi atualizado (fila)
```

**Usuário vê:**

- Pedido aparece no sistema ✓
- Mas estoque ainda não descontou ✗

**Como lidar:**

- UI mostra status: "Processando..."
- Notificações quando completo
- Timeout + retry se demorar muito

**Em prova:**

- "Consistência eventual" = dados podem estar temporariamente inconsistentes
- "ACID" = consistência imediata (banco relacional)

**3. Idempotência é OBRIGATÓRIA**

**Problema:**
Eventos podem ser processados múltiplas vezes!

```
Evento: DebitarConta(100)
Processado 2x = Debitou R$ 200! ❌
```

**Solução: Idempotência**

```javascript
// Gravar ID do evento processado
function processDebitEvent(event) {
  // Verifica se já processou
  if (await db.exists('processed_events', event.id)) {
    console.log('Evento já processado, ignorando');
    return; // Idempotente!
  }

  // Processa + marca como processado (transação)
  await db.transaction(async (tx) => {
    await tx.debit(event.accountId, event.amount);
    await tx.insert('processed_events', {id: event.id});
  });
}
```

**Em prova:**

- "At-least-once delivery" → Precisa idempotência
- "Exactly-once" → Ideal, mas difícil de garantir

**4. Ordem de Eventos**

**Problema:**
Eventos podem chegar fora de ordem!

```
Enviados: [ItemAdicionado(id=1), ItemRemovido(id=1)]
Recebidos: [ItemRemovido(id=1), ItemAdicionado(id=1)]

Resultado: Item existe (errado!)
```

**Soluções:**

**a) Partition Key (Kafka):**

```
Partition key = pedido_id
Todos eventos do mesmo pedido → mesma partição → ordem garantida
```

**b) Sequence Number:**

```javascript
if (event.sequence > lastProcessedSequence) {
  process(event);
  lastProcessedSequence = event.sequence;
} else {
  // Evento antigo, ignorar
}
```

**c) Timestamp + Logic:**

```javascript
// Apenas processa se evento é mais recente
if (event.timestamp > entity.lastUpdated) {
  update(entity);
}
```

**Em prova:**

- Kafka com partition key → Ordem garantida
- SQS padrão → Ordem NÃO garantida (use FIFO queue)

**5. Dead Letter Queue (DLQ)**

**Problema:**
Evento falha sempre (bug no código, dado inválido)

```
Evento tentado 10x → sempre falha → bloqueia fila
```

**Solução: DLQ**

```
Fila Principal
    ↓ (tenta 3x)
    ✗ (falha)
    ↓
Dead Letter Queue (eventos que falharam)
    ↓
Alarme + investigação manual
```

**Configuração típica:**

- Max retries: 3-5 vezes
- Backoff exponencial: 1s, 2s, 4s, 8s
- Depois de max retries → DLQ

**Em prova:**

- "Evento sempre falha" → Dead Letter Queue
- "Retry com backoff" → Exponential backoff

**6. Event Schema Evolution**

**Problema:**
Como mudar estrutura do evento sem quebrar consumidores?

**V1:**

```json
{
  "type": "OrderCreated",
  "orderId": 123,
  "amount": 100
}
```

**V2 (adiciona campo):**

```json
{
  "type": "OrderCreated",
  "orderId": 123,
  "amount": 100,
  "currency": "BRL" // Novo campo
}
```

**Estratégias:**

**a) Backward Compatibility:**

- Novos campos são opcionais
- Consumidores antigos ignoram campos novos

**b) Forward Compatibility:**

- Consumidores novos lidam com eventos antigos
- Valores default para campos faltantes

**c) Schema Registry:**

- Kafka Schema Registry, AWS Glue
- Valida eventos contra schema
- Evolução controlada

**Regras de ouro:**

- ✅ Adicionar campos opcionais = OK
- ❌ Remover campos = Breaking change
- ❌ Mudar tipo de campo = Breaking change

### 🎯 Padrões de Event-Driven

**1. Event Notification**

Evento mínimo, consumidor busca dados:

```json
{ "type": "OrderCreated", "orderId": 123 }
```

Consumidor → GET /orders/123

**Vantagens:**

- ✅ Evento pequeno
- ✅ Dados sempre atualizados

**Desvantagens:**

- ❌ Acoplamento (precisa chamar API)
- ❌ Mais latência

**2. Event-Carried State Transfer**

Evento com todos os dados:

```json
{
  "type": "OrderCreated",
  "orderId": 123,
  "customer": {...},
  "items": [...],
  "total": 100
}
```

**Vantagens:**

- ✅ Consumidor autossuficiente
- ✅ Sem chamadas externas

**Desvantagens:**

- ❌ Evento grande
- ❌ Dados podem ficar desatualizados

**3. Event Sourcing**

Eventos são a única fonte da verdade:

```
Events: [AccountCreated, Deposited(100), Withdrawn(30)]
Balance = sum(events) = 70
```

**Vantagens:**

- ✅ Histórico completo
- ✅ Auditoria natural
- ✅ Time travel (estado em qualquer momento)

**Desvantagens:**

- ❌ Complexidade alta
- ❌ Queries complexas (precisa replay)

**4. CQRS (Command Query Responsibility Segregation)**

Separa escrita (command) de leitura (query):

```
Write Side:            Read Side:
Commands              Queries
    ↓                     ↑
 Events  ────────────→  Read Model
    ↓                  (otimizado)
Event Store
```

**Vantagens:**

- ✅ Escala leitura/escrita independente
- ✅ Read models otimizados

**Desvantagens:**

- ❌ Eventual consistency
- ❌ Complexidade

### 🔧 Ferramentas e Tecnologias

**Message Brokers:**

| Ferramenta         | Tipo            | Quando Usar                       |
| ------------------ | --------------- | --------------------------------- |
| **Kafka**          | Event Streaming | Alto throughput, replay, ordering |
| **RabbitMQ**       | Message Queue   | Roteamento complexo, ACK          |
| **AWS SNS/SQS**    | Pub/Sub + Queue | Serverless, AWS ecosystem         |
| **Redis Pub/Sub**  | Pub/Sub         | Simples, in-memory                |
| **Google Pub/Sub** | Pub/Sub         | GCP ecosystem                     |

**Em prova:**

**Kafka:**

- ✅ Milhões de eventos/segundo
- ✅ Replay de eventos
- ✅ Partitions para escala
- ❌ Mais complexo

**RabbitMQ:**

- ✅ Fácil de começar
- ✅ Roteamento flexível
- ❌ Menor throughput que Kafka

**AWS SQS:**

- ✅ Serverless, escalável
- ✅ Fácil integração AWS
- ❌ Ordem não garantida (use FIFO)

### 🚀 Implementação Prática

**Quando implementar Event-Driven:**

✅ **Cenários ideais:**

1. Notificações (email, SMS, push)
2. Auditoria e logging
3. Analytics e data warehouse
4. Processamento de imagens/vídeos
5. Webhooks e integrações
6. Workflows complexos (saga)

✅ **Exemplo: E-commerce**

```
OrderCreated event →
  ├→ EmailService (envia confirmação)
  ├→ InventoryService (reserva estoque)
  ├→ PaymentService (processa pagamento)
  ├→ AnalyticsService (atualiza métricas)
  └→ NotificationService (push notification)
```

Cada serviço:

- Processa independentemente
- Falha isolada
- Escala independente

**Quando NÃO usar:**

❌ **Evite para:**

1. Operações síncronas críticas (login)
2. Queries simples (buscar usuário)
3. Operações que precisam resposta imediata
4. Times sem experiência em async

### 📊 Monitoramento e Debugging

**Métricas importantes:**

```
Producer:
├── Events published/sec
├── Publish failures
└── Publish latency

Queue:
├── Queue depth (backlog)
├── Age of oldest message
└── Dead letter queue size

Consumer:
├── Events processed/sec
├── Processing errors
├── Processing latency
└── Retry count
```

**Alarmes críticos:**

- 🚨 Queue depth > 1000 (backlog crescendo)
- 🚨 DLQ não vazio (eventos falhando)
- 🚨 Consumer lag > 5min (consumidor lento)

**Debugging:**

- Correlation ID em todos eventos
- Distributed tracing (Jaeger, X-Ray)
- Logs estruturados (JSON)

### 🔒 Segurança

**Considerações:**

1. **Encryption:**

   - At rest (eventos armazenados)
   - In transit (TLS/SSL)

2. **Authentication:**

   - Quem pode publicar?
   - Quem pode consumir?

3. **Authorization:**

   - ACLs por tópico/fila
   - IAM roles (AWS)

4. **Sensitive Data:**
   - Não colocar senhas em eventos
   - PII (dados pessoais) → criptografar ou referenciar por ID

**Exemplo seguro:**

```json
// ❌ Ruim
{"type": "UserCreated", "cpf": "123.456.789-00"}

// ✅ Bom
{"type": "UserCreated", "userId": "uuid-123"}
// Consumidor busca detalhes via API autenticada
```

## Próximos Passos

- Entenda [Microsserviços](microservices-intro.md)
- Explore [Mensageria](../backend/messaging/messaging-intro.md)
- Estude Event Sourcing e CQRS
