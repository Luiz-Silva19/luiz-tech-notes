---
sidebar_position: 1
title: Application Load Balancer (ALB)
description: Entenda como usar ALB para distribuir tráfego HTTP/HTTPS
---

# 🎯 Application Load Balancer (ALB)

O ALB funciona como um **porteiro de prédio corporativo** 🏢

Ele não decide só quem entra, mas **para qual andar cada pessoa vai**.

O **Application Load Balancer** é um load balancer de **Camada 7 (Aplicação)** ideal para aplicações web modernas com roteamento baseado em conteúdo.

## 📖 O que é Load Balancing?

Imagine um restaurante com apenas um garçom durante a hora de pico. Fila imensa! Agora imagine múltiplos garçons:

```
Clientes (Tráfego)
      │
      └─→ [Load Balancer ALB] ← Distribuidor
           │        │        │
           ▼        ▼        ▼
          EC2      EC2      EC2    (Instâncias)
```

O ALB é o **distribuidor inteligente** que:

- ✅ Recebe todas as requisições
- ✅ Entende conteúdo HTTP/HTTPS
- ✅ Roteia para o servidor mais apropriado
- ✅ Monitora saúde dos servidores
- ✅ Distribui carga uniformemente

## 🔑 Características principais

### **Roteamento baseado em conteúdo**

```
GET /api/users    → Servidores API
GET /images/*     → Servidores de mídia
GET /admin/*      → Servidores administrativos
```

### **Host-based routing**

```
api.exemplo.com      → Servidor API
www.exemplo.com      → Servidor Web
admin.exemplo.com    → Painel administrativo
```

## 📊 ALB vs NLB vs CLB

| Recurso        | ALB           | NLB            | CLB            |
| -------------- | ------------- | -------------- | -------------- |
| **Camada**     | Aplicação (7) | Transporte (4) | Transporte (4) |
| **Latência**   | Moderada      | Ultra-baixa    | Moderada       |
| **Throughput** | Alto          | Ultra-alto     | Alto           |
| **Conexões**   | 1M/seg        | 10M/seg        | 1M/seg         |
| **Roteamento** | Conteúdo      | Port/Protocol  | Básico         |

## 🚀 Próximas lições

1. [Network Load Balancer (NLB)](/docs/aws/load-balancers/nlb) - Para ultra-alta performance
2. [Gateway Load Balancer (GWLB)](/docs/aws/load-balancers/gwlb) - Para appliances
3. [EC2](/docs/aws/ec2) - Instâncias para usar com ALB
