---
title: Gateway Load Balancer (GWLB)
parent: Load Balancers
nav_order: 3
description: "Guia completo sobre AWS GWLB para distribuição de appliances de rede"
---

# Gateway Load Balancer (GWLB)

O **Gateway Load Balancer (GWLB)** é um load balancer especializado que funciona na **Camada 3 (Rede)** do modelo OSI, projetado para distribuir tráfego para appliances de rede de forma transparente.

## 📌 Conceito

O GWLB distribui tráfego para appliances de rede como:

- **Firewalls** - Deep packet inspection
- **IDS/IPS** - Intrusion detection/prevention
- **Proxies** - Middleware de segurança
- **WAF** - Web application firewalls
- **Load Balancers** - Cascatados
- **Routers** - Network appliances customizados

### Vantagens

✅ Transparent para origem e destino  
✅ Preserva pacotes originais (encapsulamento GENEVE)  
✅ Escalabilidade transparente para appliances  
✅ Sub-milissegundo de latência  
✅ Suporte a stateful connections

### Limitações

⚠️ Caso de uso específico (appliances)  
⚠️ Requer appliances que suportam GENEVE  
⚠️ Complexidade maior de configuração

---

## 💻 Exemplo Prático

### Cenário

Você quer adicionar uma camada de **firewall virtualizado** antes de suas aplicações:

```
Cliente → GWLB → Firewall Appliance → Aplicação
```

### Passo 1: Criar GWLB

```bash
aws elbv2 create-load-balancer \
  --name my-gwlb \
  --subnets subnet-12345 subnet-67890 \
  --type gateway \
  --tags Key=Name,Value=MyGWLB
```

### Passo 2: Criar Target Group

```bash
aws elbv2 create-target-group \
  --name firewall-appliances \
  --protocol GENEVE \
  --port 6081 \
  --vpc-id vpc-12345 \
  --target-type instance \
  --health-check-protocol HTTPS \
  --health-check-path /health \
  --health-check-port 443
```

### Passo 3: Registrar Appliances

```bash
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-1234567890abcdef0 \
              Id=i-0987654321abcdef0 \
              Id=i-abcdef1234567890
```

### Passo 4: Criar Listener

```bash
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:... \
  --protocol GENEVE \
  --port 6081 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:...
```

---

## 🏗️ Diagrama de Arquitetura

```
┌─────────────────────────────────────────────┐
│                  Clientes                   │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────┐
    │   Gateway Load Balancer (GWLB)   │
    │        GENEVE Protocol           │
    └──────────────────┬───────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │Firewall  │  │Firewall  │  │Firewall  │
    │Appliance │  │Appliance │  │Appliance │
    │(GENEVE)  │  │(GENEVE)  │  │(GENEVE)  │
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │             │
         ▼             ▼             ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Target   │  │ Target   │  │ Target   │
    │ App 1    │  │ App 2    │  │ App 3    │
    └──────────┘  └──────────┘  └──────────┘
```

---

## 🔒 Casos de Uso de Segurança

### 1. Firewall Centralizado

```
Internet → GWLB → Firewall Appliance → VPC Internal
```

Toda entrada e saída passa por firewall centralizado

### 2. IDS/IPS

```
VPC Traffic → GWLB → IDS/IPS Appliance → Destination
```

Monitorar e bloquear intrusões em tempo real

### 3. WAF (Web Application Firewall)

```
Web Clients → GWLB → WAF Appliance → Web Servers
```

Proteção de camada 7 com appliances especializadas

### 4. Proxy/Monitoring

```
VPC Traffic → GWLB → Proxy Appliance → Target
```

Monitoramento transparente de tráfego

---

## 📊 Pontos-chave

🔐 **Segurança Avançada**

- Inspection profunda de pacotes (DPI)
- Proteção contra ataques de rede
- Integração com SIEM

🔄 **Transparência Total**

- Protocolo GENEVE encapsula pacotes originais
- Appliances não veem mudanças nos pacotes
- Destino final recebe pacote original

⚡ **Performance**

- Latência mínima
- Processamento em tempo real
- Throughput alto

🛠️ **Gerenciamento**

- Escalabilidade automática de appliances
- Health checks configuráveis
- Failover automático

---

## 🔧 Configuração de Appliance GENEVE

Exemplo com Linux + GENEVE:

```bash
# Criar interface GENEVE no appliance
ip link add geneve0 type geneve id 0 remote 0.0.0.0

# Adicionar IP
ip addr add 192.168.1.1/24 dev geneve0
ip link set geneve0 up

# Ativar packet forwarding
sysctl -w net.ipv4.ip_forward=1

# Configurar firewall (exemplo iptables)
iptables -A FORWARD -j ACCEPT
```

---

## 🔗 Recursos para Aprofundar

- [AWS GWLB Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/)
- [GENEVE Protocol RFC](https://datatracker.ietf.org/doc/html/rfc8926)
- [GWLB Endpoints](https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/gwl-endpoints.html)
- [Architecture Patterns](https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html#benefits)
- [Appliance Partner Solutions](https://aws.amazon.com/marketplace/search/results?searchTerms=gateway+load+balancer)

---

_Próximo: Volte para [Load Balancers Overview](./index.md) para comparação geral!_
