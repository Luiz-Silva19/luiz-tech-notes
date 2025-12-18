---
id: microservices-intro
title: Arquitetura de Microsserviços
sidebar_label: Microsserviços
---

# Microsserviços

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

## Próximos Passos

- Entenda bem [monolitos](../monolith/monolith-intro.md) primeiro
- Considere [event-driven](../event-driven/event-driven-intro.md) para comunicação
- Explore padrões de resiliência
