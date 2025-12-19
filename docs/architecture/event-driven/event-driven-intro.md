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

## Próximos Passos

- Entenda [Microsserviços](../microservices/microservices-intro.md)
- Explore [Mensageria](../../backend/messaging/messaging-intro.md)
- Estude Event Sourcing e CQRS
