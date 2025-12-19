---
id: messaging-intro
title: Mensageria e Filas
sidebar_label: Mensageria
---

## O que é Mensageria?

Sistema de comunicação assíncrona entre aplicações usando mensagens. Mensagens são colocadas em filas e processadas independentemente, desacoplando produtor e consumidor.

**Analogia**: É como o sistema de correios - você posta uma carta (mensagem) e não precisa esperar o carteiro entregar. O destinatário processa quando puder. Sistema de filas garante entrega.

## Por que usar Mensageria?

### Problemas que resolve:

- ❌ Acoplamento entre sistemas
- ❌ Processamento síncrono bloqueante
- ❌ Perda de dados em falhas
- ❌ Picos de carga
- ❌ Necessidade de retry manual

### Benefícios:

- ✅ **Desacoplamento**: Sistemas independentes
- ✅ **Assíncrono**: Não bloqueia operações
- ✅ **Confiabilidade**: Mensagens persistidas
- ✅ **Escalabilidade**: Múltiplos consumidores
- ✅ **Buffer de carga**: Absorve picos
- ✅ **Retry automático**: Resiliência

## Conceitos Fundamentais

### Mensagem (Message)

Unidade de dados trafegada.

```json
{
  "id": "msg-123",
  "type": "order.created",
  "timestamp": "2024-12-18T10:30:00Z",
  "data": {
    "orderId": "456",
    "userId": "789",
    "total": 150.0
  }
}
```

### Fila (Queue)

Buffer que armazena mensagens.

- FIFO (First In, First Out) geralmente
- Persistente ou em memória
- Garante entrega

### Produtor (Producer)

Quem envia mensagens.

```javascript
await queue.send("orders", {
  orderId: "456",
  userId: "789",
});
```

### Consumidor (Consumer)

Quem processa mensagens.

```javascript
queue.consume("orders", async (message) => {
  await processOrder(message.data);
});
```

### Broker (Message Broker)

Intermediário que gerencia filas.

- RabbitMQ
- Apache Kafka
- AWS SQS
- Azure Service Bus

## Padrões de Mensageria

### Point-to-Point (Queue)

Mensagem consumida por um único consumidor.

```
[Producer] → [Queue] → [Consumer 1]
                    → [Consumer 2] (compete)
                    → [Consumer 3] (compete)
```

**Uso**: Processamento de trabalho, load balancing.

### Publish-Subscribe (Pub/Sub)

Mensagem entregue a múltiplos subscribers.

```
                   ┌→ [Subscriber 1]
[Publisher] → [Topic] → [Subscriber 2]
                   └→ [Subscriber 3]
```

**Uso**: Notificações, eventos, broadcast.

### Request-Reply

Requisição com resposta via mensageria.

```
[Client] → [Request Queue] → [Server]
         ← [Reply Queue]   ←
```

**Uso**: RPC assíncrono.

## Garantias de Entrega

### At-Most-Once

Mensagem pode ser perdida, nunca duplicada.

- ⚡ Mais rápido
- ⚠️ Pode perder dados
- **Uso**: Métricas, logs não-críticos

### At-Least-Once

Mensagem sempre entregue, pode duplicar.

- ✅ Não perde dados
- ⚠️ Consumidor deve ser idempotente
- **Uso**: Maioria dos casos

### Exactly-Once

Mensagem entregue exatamente uma vez.

- ✅ Ideal
- ⚠️ Complexo e caro
- **Uso**: Transações financeiras

## Tecnologias Populares

### RabbitMQ

Message broker tradicional, AMQP.

**Características**:

- Exchanges e routing flexível
- Múltiplos protocols
- Management UI
- Plugins extensíveis

**Quando usar**:

- Routing complexo necessário
- Múltiplos padrões de mensageria
- Priorização de mensagens

```javascript
// RabbitMQ Producer
const amqp = require("amqplib");

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();
await channel.assertQueue("orders");

channel.sendToQueue(
  "orders",
  Buffer.from(
    JSON.stringify({
      orderId: "456",
      userId: "789",
    })
  )
);

// Consumer
channel.consume("orders", async (msg) => {
  const order = JSON.parse(msg.content.toString());
  await processOrder(order);
  channel.ack(msg);
});
```

### Apache Kafka

Plataforma de streaming distribuída.

**Características**:

- Alto throughput
- Persistência longa
- Particionamento
- Replicação

**Quando usar**:

- Event streaming
- Big data pipelines
- Event sourcing
- Log aggregation

```javascript
// Kafka Producer
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
await producer.connect();

await producer.send({
  topic: "orders",
  messages: [
    {
      key: "order-456",
      value: JSON.stringify({
        orderId: "456",
        userId: "789",
      }),
    },
  ],
});

// Consumer
const consumer = kafka.consumer({ groupId: "order-processors" });
await consumer.subscribe({ topic: "orders" });

await consumer.run({
  eachMessage: async ({ message }) => {
    const order = JSON.parse(message.value.toString());
    await processOrder(order);
  },
});
```

### AWS SQS (Simple Queue Service)

Fila gerenciada AWS.

**Características**:

- Serverless
- Escalabilidade automática
- Integração AWS
- Pay per use

```javascript
const {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
} = require("@aws-sdk/client-sqs");

const client = new SQSClient({ region: "us-east-1" });

// Send
await client.send(
  new SendMessageCommand({
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/123/orders",
    MessageBody: JSON.stringify({ orderId: "456" }),
  })
);

// Receive
const { Messages } = await client.send(
  new ReceiveMessageCommand({
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/123/orders",
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
  })
);
```

### Redis Pub/Sub

In-memory messaging.

**Características**:

- Muito rápido
- Sem persistência (por padrão)
- Simples

```javascript
const redis = require("redis");

// Publisher
const publisher = redis.createClient();
publisher.publish("orders", JSON.stringify({ orderId: "456" }));

// Subscriber
const subscriber = redis.createClient();
subscriber.subscribe("orders");
subscriber.on("message", (channel, message) => {
  const order = JSON.parse(message);
  processOrder(order);
});
```

## Quando usar Mensageria?

✅ **Use quando**:

- Processamento assíncrono necessário
- Desacoplamento entre sistemas
- Necessidade de buffer para picos
- Integração entre microservices
- Event-driven architecture
- Precisa de retry e durabilidade

❌ **Evite quando**:

- Precisa de resposta imediata
- Fluxo simples e síncrono suficiente
- Overhead não se justifica
- CRUD básico

## Casos de Uso

### E-commerce

```
[Order Service] → [Queue: orders.created]
                     ↓
    ┌────────────────┼────────────────┐
    ▼                ▼                ▼
[Payment]      [Inventory]       [Email]
```

### Processamento de Imagens

```
[Upload] → [Queue: images.uploaded] → [Resize Workers]
```

### Notificações

```
[Event] → [Pub/Sub] → [Email Service]
                   → [SMS Service]
                   → [Push Service]
```

### Log Aggregation

```
[App 1] →
[App 2] → [Kafka] → [Log Processor] → [Elasticsearch]
[App 3] →
```

## Dead Letter Queue (DLQ)

Fila para mensagens que falharam repetidamente.

```javascript
// Após N tentativas
if (retryCount > maxRetries) {
  await dlq.send(message);
  logger.error("Message moved to DLQ", { message });
}
```

**Uso**:

- Debugging de falhas
- Reprocessamento manual
- Alertas

## Idempotência

Consumidor deve processar mensagem múltiplas vezes com mesmo resultado.

```javascript
// ❌ Não idempotente
async function processOrder(order) {
  await db.orders.insert(order); // Duplica!
}

// ✅ Idempotente
async function processOrder(order) {
  await db.orders.upsert(order); // OK duplicar
}

// ✅ Idempotente com chave única
async function processOrder(order) {
  const exists = await db.processed.exists(order.id);
  if (exists) return; // Já processado

  await db.orders.insert(order);
  await db.processed.insert({ id: order.id });
}
```

## Boas Práticas

✅ **Mensagens pequenas**: Dados essenciais, não payloads gigantes  
✅ **Idempotência**: Consumidor deve ser idempotente  
✅ **Retry strategy**: Exponential backoff  
✅ **DLQ**: Para mensagens problemáticas  
✅ **Monitoring**: Tamanho da fila, lag, erros  
✅ **Schema validation**: Valide estrutura da mensagem  
✅ **Timeouts**: Configure visibility timeout  
✅ **Logging**: Trace mensagens  
✅ **Error handling**: Capture e logue erros

## Monitoramento

Métricas importantes:

- **Queue depth**: Mensagens na fila
- **Processing time**: Tempo de processamento
- **Error rate**: Taxa de erro
- **Consumer lag**: Atraso no consumo (Kafka)
- **DLQ size**: Mensagens na DLQ

```javascript
// Exemplo de métricas
setInterval(async () => {
  const depth = await queue.getDepth();
  metrics.gauge("queue.depth", depth);

  if (depth > threshold) {
    alert("Queue depth too high!");
  }
}, 60000);
```

## Comparação: RabbitMQ vs Kafka

| Aspecto      | RabbitMQ               | Kafka                |
| ------------ | ---------------------- | -------------------- |
| Padrão       | Message broker         | Event streaming      |
| Throughput   | Moderado               | Muito alto           |
| Latência     | Baixa                  | Baixa/Moderada       |
| Persistência | Opcional               | Sempre               |
| Retenção     | Até consumo            | Configurável (dias)  |
| Routing      | Flexível (exchanges)   | Tópicos/partições    |
| Ordem        | Por fila               | Por partição         |
| Uso          | Mensageria tradicional | Event log, streaming |

## Anti-Patterns

❌ **Fire and forget sem DLQ**: Perde mensagens  
❌ **Processamento não-idempotente**: Duplicatas causam problemas  
❌ **Mensagens gigantes**: Use referências  
❌ **Falta de retry**: Falhas temporárias viram permanentes  
❌ **Não monitorar filas**: Gargalos invisíveis  
❌ **Acoplamento temporal excessivo**: Perde benefício assíncrono

## Exemplo Completo: Order Processing

```javascript
const { Kafka } = require("kafkajs");

// Producer (Order Service)
class OrderService {
  async createOrder(orderData) {
    // 1. Salvar no banco
    const order = await db.orders.create(orderData);

    // 2. Publicar evento
    await producer.send({
      topic: "orders.created",
      messages: [
        {
          key: order.id.toString(),
          value: JSON.stringify({
            orderId: order.id,
            userId: order.userId,
            items: order.items,
            total: order.total,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });

    return order;
  }
}

// Consumer (Payment Service)
class PaymentService {
  async start() {
    const consumer = kafka.consumer({ groupId: "payment-service" });
    await consumer.subscribe({ topic: "orders.created" });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const order = JSON.parse(message.value.toString());

        try {
          // Processar pagamento
          await this.processPayment(order);

          // Publicar sucesso
          await producer.send({
            topic: "payments.completed",
            messages: [
              {
                key: order.orderId,
                value: JSON.stringify({
                  orderId: order.orderId,
                  status: "paid",
                }),
              },
            ],
          });
        } catch (error) {
          // Publicar falha
          await producer.send({
            topic: "payments.failed",
            messages: [
              {
                key: order.orderId,
                value: JSON.stringify({
                  orderId: order.orderId,
                  error: error.message,
                }),
              },
            ],
          });
        }
      },
    });
  }

  async processPayment(order) {
    // Idempotência: verificar se já processado
    const exists = await db.payments.findByOrderId(order.orderId);
    if (exists) return;

    // Processar...
    const payment = await paymentGateway.charge({
      amount: order.total,
      userId: order.userId,
    });

    // Salvar
    await db.payments.create({
      orderId: order.orderId,
      paymentId: payment.id,
      status: "completed",
    });
  }
}
```

## Recursos

- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)
- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [Enterprise Integration Patterns (livro)](https://www.enterpriseintegrationpatterns.com/)

## Próximos Passos

- Implemente fila simples com RabbitMQ
- Explore event streaming com Kafka
- Integre com [arquitetura event-driven](../../architecture/event-driven/event-driven-intro.md)
- Configure monitoring e alertas
- Pratique idempotência

**Lembre-se**: Mensageria é ferramenta poderosa, mas adiciona complexidade. Use quando benefícios superam custos!
