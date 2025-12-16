---
sidebar_position: 3
title: Gateway Load Balancer (GWLB)
description: Load balancer para appliances de rede
---

# 🌐 Gateway Load Balancer (GWLB)

O **Gateway Load Balancer** é um load balancer especializado para **appliances de rede** como firewalls, sistemas de prevenção de intrusão (IPS) e monitores de tráfego.

## 🤔 O que é um appliance de rede?

Um appliance é uma **aplicação especializada** que processa tráfego de rede:

```
Cliente
  │
  └─→ [Firewall]      ← Appliance
       │
       ├─→ Bloqueia tráfego malicioso
       ├─→ Inspeciona pacotes
       └─→ Registra anomalias
  │
  └─→ Servidor
```

## 🏗️ Quando usar GWLB

| Cenário             | Descrição                                     |
| ------------------- | --------------------------------------------- |
| **Firewalls**       | Distribuir tráfego entre múltiplas instâncias |
| **IPS/IDS**         | Detecção de intrusão em escala                |
| **WAF**             | Web Application Firewall centralizado         |
| **DDoS Protection** | Scrubbing de tráfego malicioso                |
| **Proxy**           | Proxy de tráfego centralizado                 |

## 🔄 Arquitetura GWLB

```
Internet (Tráfego)
    │
    └─→ [GWLB]
         │
         ├─→ [Firewall Instance 1]
         ├─→ [Firewall Instance 2]
         └─→ [Firewall Instance 3]
         │
         └─→ Servidores de aplicação
```

## 🔌 GENEVE Protocol

GWLB usa o protocolo **GENEVE** (Generic Network Virtualization Encapsulation):

```
Original Packet: [IP Header] [TCP] [Payload]
                        │
                        └─→ Encapsulado
                        │
GENEVE Packet: [IP] [UDP:6081] [GENEVE] [Original Packet]
               └─────────────────────────────────┘
                    Tráfego entre GWLB e appliances
```

## 💾 Exemplo de arquitetura

```
VPC com GWLB:
┌─────────────────────────────────────────┐
│ VPC (10.0.0.0/16)                       │
│                                         │
│  Subnet Pública                        │
│  ┌─────────────────────────────────┐   │
│  │ GWLB Endpoint                   │   │
│  │ ├─ Consumer (Traffic source)    │   │
│  │ └─ Provider (Appliances)        │   │
│  └─────────────────────────────────┘   │
│           │                             │
│  Subnet Firewall                       │
│  ┌─────────────────────────────────┐   │
│  │ GWLB Target Group               │   │
│  │ ├─ Firewall EC2-1 (10.0.1.10)  │   │
│  │ ├─ Firewall EC2-2 (10.0.1.11)  │   │
│  │ └─ Firewall EC2-3 (10.0.1.12)  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Subnet Servidores                     │
│  ┌─────────────────────────────────┐   │
│  │ ├─ App Server 1 (10.0.2.10)    │   │
│  │ ├─ App Server 2 (10.0.2.11)    │   │
│  │ └─ App Server 3 (10.0.2.12)    │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## ⚙️ Configuração básica

```
Nome: security-gwlb
Protocolo: GENEVE
Porta: 6081
Tipo: Gateway Load Balancer

Target Group:
├── Protocolo: GENEVE
├── Porta: 6081
├── Targets: Firewall-1, Firewall-2, Firewall-3
└── Health Check: TCP :6081
```

## 💾 Criação via AWS CLI

```bash
# Criar GWLB
aws elbv2 create-load-balancer \
  --name security-gwlb \
  --subnets subnet-12345 subnet-67890 \
  --type gateway \
  --scheme internal

# Criar target group GENEVE
aws elbv2 create-target-group \
  --name firewall-targets \
  --protocol GENEVE \
  --port 6081 \
  --vpc-id vpc-12345

# Registrar appliances
aws elbv2 register-targets \
  --target-group-arn arn:aws:... \
  --targets Id=i-firewall1 Id=i-firewall2
```

## 🔐 Vantagens do GWLB

✅ **Alta disponibilidade**: Múltiplas instâncias de firewall  
✅ **Escalabilidade**: Adicione appliances conforme necessário  
✅ **Transparência**: Aplicação não precisa conhecer firewall  
✅ **Simetria**: Tráfego vai e volta pelo mesmo appliance  
✅ **Health checks**: Remove appliances defeituosos

## 📊 GWLB vs Outras abordagens

| Abordagem          | Vantagens                            | Desvantagens                            |
| ------------------ | ------------------------------------ | --------------------------------------- |
| **GWLB**           | Escalável, transparente, distribuído | Complexidade, preço                     |
| **Firewall único** | Simples                              | SPOF (Single Point of Failure), gargalo |
| **VPC Routing**    | Controle fino                        | Complexo, manual                        |

## 🎯 Caso prático: Firewall distribuído

```
Diagrama de fluxo:

┌──────────────┐
│  Internet    │
└──────┬───────┘
       │ (Tráfego)
       │
    ┌──┴──────────┐
    │ GWLB        │
    │ (balanceador)│
    └──┬──────┬───┘
       │      │
   ┌───▼──┐ ┌─▼──┐
   │FW-1  │ │FW-2│  ← Instâncias de firewall
   └───┬──┘ └─┬──┘
       │      │
   ┌───▼──────▼───┐
   │ App Servers  │
   │ (processam)  │
   └──────────────┘
```

## ⚠️ Considerações importantes

- ⚠️ Adiciona latência (processamento extra)
- ⚠️ Custo adicional por GB processado
- ⚠️ Requer appliances compatíveis com GENEVE
- ⚠️ Configuração mais complexa

## 📈 Monitoramento

```
CloudWatch Metrics:
├── ActiveFlowCount_TLS
├── NewFlowCount_TLS
├── ProcessedBytes_TLS
├── ClientTLSNegotiationErrorCount
└── TargetUnhealthyCount
```

## 🚀 Próximas lições

1. [Application Load Balancer (ALB)](/docs/aws/load-balancers/alb) - Para aplicações web
2. [Network Load Balancer (NLB)](/docs/aws/load-balancers/nlb) - Para performance extrema
3. [VPC Security](/docs/aws/) - Segurança em VPC

:::info Quando usar GWLB

✅ Você tem appliances de segurança/rede  
✅ Precisa de escalabilidade para esses appliances  
✅ Quer transparência na arquitetura  
❌ Não use se tem apenas ALB ou NLB (use security groups)

:::

:::tip Documentação Oficial
[GWLB Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/) para detalhes técnicos.
:::
