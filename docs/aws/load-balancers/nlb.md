---
sidebar_position: 2
title: Network Load Balancer (NLB)
description: Load balancer ultra-rápido para aplicações exigentes
---

# ⚡ Network Load Balancer (NLB)

O **Network Load Balancer** é um load balancer de **Camada 4 (Transporte)** otimizado para **ultra-baixa latência** e **altíssima performance**.

## 🏎️ Performance extrema

Enquanto o ALB é como um **gerente de restaurante inteligente**, o NLB é como um **sistema automático de distribuição de cargas**:

```
ALB (Aplicação)        vs        NLB (Rede)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Latência: ~100ms                Latência: menor que 100μs
Conexões: 1M/seg               Conexões: 10M/seg
Throughput: Alto               Throughput: Ultra-alto
Roteamento: Inteligente         Roteamento: Simples
```

## 🔍 Como funciona

NLB foca em **velocidade pura** analisando apenas:

- Protocolo (TCP/UDP)
- Porta de origem e destino
- IP de origem

Não analisa conteúdo HTTP (muito mais rápido!):

```
Conexão TCP
    │
    └─→ [NLB] ← Instantâneo!
         │
         └─→ Backend Server
             (Roteamento determinístico)
```

## 🎯 Tipos de protocolo

### **TCP**

Confiável, orientado a conexão:

```
Exemplo: Banco de dados, Aplicações customizadas
Porta: Qualquer uma
```

### **UDP**

Sem conexão, ultra-rápido:

```
Exemplo: DNS, VoIP, Jogos online
Porta: Qualquer uma
```

## 🎮 Casos de uso ideais

| Caso               | Por quê                                   |
| ------------------ | ----------------------------------------- |
| **Jogos Online**   | Latência ultra-baixa = melhor experiência |
| **IoT/Telemetria** | Milhões de conexões simultâneas           |
| **DNS**            | Requisições DNS requerem velocidade       |
| **Streaming**      | Throughput extremamente alto              |
| **Finanças**       | Trading de altíssima frequência           |

## 📊 NLB vs ALB vs CLB

| Característica | NLB                | ALB           | CLB       |
| -------------- | ------------------ | ------------- | --------- |
| Camada         | 4 (Rede)           | 7 (App)       | 4 (Rede)  |
| Latência       | menor que 100μs ⚡ | ~100ms        | ~100ms    |
| Throughput     | 10M conn/s         | 1M req/s      | 1M conn/s |
| Roteamento     | Port/Protocol      | Conteúdo HTTP | Básico    |
| Preço          | Médio              | Médio         | Baixo     |

## 🚀 Próximas lições

1. [Application Load Balancer (ALB)](/docs/aws/load-balancers/alb) - Para web apps
2. [Gateway Load Balancer (GWLB)](/docs/aws/load-balancers/gwlb) - Para appliances
3. [EC2](/docs/aws/ec2) - Instâncias para usar com NLB
