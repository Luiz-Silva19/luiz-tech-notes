---
title: Network Load Balancer (NLB)
parent: Load Balancers
nav_order: 2
description: "Guia completo sobre AWS NLB - Load Balancer para ultra-alta performance"
---

# Network Load Balancer (NLB)

O **Network Load Balancer (NLB)** é um load balancer de **ultra-alta performance** que funciona na **Camada 4 (Transporte)** do modelo OSI, ideal para tráfego de tempo real.

## 📌 Conceito

O NLB distribui requisições entre múltiplos targets baseado em:

- **IP Protocol data** - TCP, UDP, TLS
- **Source IP** - Endereço IP de origem
- **Destination IP** - Endereço IP de destino
- **Porta** - Porta de origem/destino
- **Flow hash algorithm** - Consistência de conexão

### Vantagens

✅ Latência ultra-baixa (sub-milissegundos)  
✅ Suporta milhões de requisições por segundo  
✅ Ideal para protocolos não-HTTP (TCP, UDP)  
✅ Preserva IP de origem (Client IP)  
✅ Custo competitivo

### Limitações

⚠️ Sem roteamento baseado em conteúdo (camada 7)  
⚠️ Menos flexível que ALB

---

## 💻 Exemplo Prático

### Cenário

Você tem um servidor de **game online** que precisa de:

- Ultra-baixa latência
- Suporte a UDP (protocolo de game)
- Milhões de conexões simultâneas

### Passo 1: Criar o NLB

```bash
aws elbv2 create-load-balancer \
  --name my-nlb \
  --subnets subnet-12345 subnet-67890 \
  --scheme internet-facing \
  --type network \
  --tags Key=Name,Value=MyNLB
```

### Passo 2: Criar Target Group UDP

```bash
aws elbv2 create-target-group \
  --name game-servers-udp \
  --protocol UDP \
  --port 5005 \
  --vpc-id vpc-12345 \
  --target-type ip \
  --health-check-protocol TCP \
  --health-check-port 5005 \
  --health-check-interval-seconds 10
```

### Passo 3: Registrar Targets

```bash
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=10.0.1.10 Port=5005 \
              Id=10.0.2.10 Port=5005
```

### Passo 4: Criar Listener

```bash
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:... \
  --protocol UDP \
  --port 5005 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:...
```

---

## 🏗️ Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────┐
│         Internet (Jogadores Online)             │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
     ┌──────────────────────────────────┐
     │   Network Load Balancer (NLB)    │
     │      UDP/TCP Port 5005           │
     │   Ultra-Low Latency              │
     └──────────────────┬───────────────┘
                        │
             ┌──────────┼──────────┐
             │          │          │
             ▼          ▼          ▼
        ┌────────┐  ┌────────┐  ┌────────┐
        │ Game   │  │ Game   │  │ Game   │
        │Server-1│  │Server-2│  │Server-3│
        │UDP5005 │  │UDP5005 │  │UDP5005 │
        └────────┘  └────────┘  └────────┘
```

---

## 🎮 Casos de Uso

### 1. Gaming Online

- Protocolo UDP para latência mínima
- Milhões de jogadores simultâneos
- Distribuição por localização geográfica

### 2. IoT (Internet of Things)

- Comunicação leve e rápida
- Protocols MQTT, CoAP
- Conexões long-lived

### 3. Real-time Applications

- Streaming de vídeo
- VoIP
- Aplicações financeiras

### 4. Non-HTTP Services

- DNS
- Databases
- Custom protocols

---

## 📊 Pontos-chave

⚡ **Performance Extrema**

- 26 bilhões de pacotes/segundo
- Sub-milissegundo de latência
- 100Gbps throughput

🔗 **Conexões Persistentes**

- Long-lived connections suportadas
- Flow hash mantém consistência
- Ideal para protocolos stateful

🛡️ **DDoS Protection**

- AWS Shield Standard incluído
- Detecção automática de anomalias
- Rate limiting nativo

---

## 🔬 Teste de Performance

```python
# Simular múltiplas conexões UDP
import socket
import time

nlb_ip = "nlb-12345.elb.us-east-1.amazonaws.com"
nlb_port = 5005

for i in range(1000):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    message = f"Player {i} data"
    sock.sendto(message.encode(), (nlb_ip, nlb_port))
    sock.close()

print("1000 UDP packets sent!")
```

---

## 🔗 Recursos para Aprofundar

- [AWS NLB Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/)
- [NLB Use Cases](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html)
- [UDP Load Balancing](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html#protocol)
- [NLB Best Practices](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html)
- [Performance Tuning](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-ip-address-type.html)

---

_Próximo: Explore [Gateway Load Balancer (GWLB)](./gwlb.md) para appliances de rede!_
