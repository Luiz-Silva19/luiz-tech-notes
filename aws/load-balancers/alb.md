---
title: Application Load Balancer (ALB)
parent: Load Balancers
nav_order: 1
description: "Guia completo sobre AWS ALB com conceitos, exemplos e recursos para aprofundamento"
---

# Application Load Balancer (ALB)

O **Application Load Balancer (ALB)** é um load balancer moderno que funciona na **Camada 7 (Aplicação)** do modelo OSI, permitindo roteamento inteligente baseado em conteúdo.

## 📌 Conceito

O ALB distribui requisições entre múltiplos targets (instâncias EC2, containers, IPs) baseado em:

- **URL Path** - `/api/*` vai para um grupo, `/static/*` para outro
- **Hostname** - `api.example.com` vs `www.example.com`
- **HTTP Header** - Baseado em headers customizados
- **HTTP Method** - GET, POST, etc.
- **Source IP** - Endereço IP de origem
- **Porta** - Múltiplas portas na mesma instância

### Vantagens

✅ Roteamento baseado em conteúdo  
✅ Suporte a HTTP/2 e WebSocket  
✅ Melhor para aplicações modernas e microserviços  
✅ Integrado com Auto Scaling e Target Groups  
✅ CloudWatch Metrics nativo

### Limitações

⚠️ Latência ligeiramente maior que NLB  
⚠️ Custo um pouco maior que CLB

---

## 💻 Exemplo Prático

### Cenário

Você tem uma aplicação de microserviços:

- `/api/*` → Servidor API (porta 8080)
- `/web/*` → Frontend Web (porta 80)
- `/admin/*` → Admin Panel (porta 3000)

### Passo 1: Criar o ALB

```bash
# Via AWS CLI
aws elbv2 create-load-balancer \
  --name my-alb \
  --subnets subnet-12345 subnet-67890 \
  --security-groups sg-12345 \
  --scheme internet-facing \
  --type application \
  --tags Key=Name,Value=MyALB
```

### Passo 2: Criar Target Groups

```bash
# Target Group para API
aws elbv2 create-target-group \
  --name api-tg \
  --protocol HTTP \
  --port 8080 \
  --vpc-id vpc-12345 \
  --health-check-protocol HTTP \
  --health-check-path /health \
  --health-check-interval-seconds 30 \
  --health-check-timeout-seconds 5 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 3

# Target Group para Web
aws elbv2 create-target-group \
  --name web-tg \
  --protocol HTTP \
  --port 80 \
  --vpc-id vpc-12345
```

### Passo 3: Registrar Targets

```bash
# Adicionar instâncias ao Target Group de API
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-1234567890abcdef0 Port=8080

# Adicionar instâncias ao Target Group Web
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-0987654321abcdef0 Port=80
```

### Passo 4: Criar Rules (Roteamento)

```bash
# Rule: Rotear /api para API Target Group
aws elbv2 create-rule \
  --listener-arn arn:aws:elasticloadbalancing:... \
  --priority 1 \
  --conditions Field=path-pattern,Values=/api/* \
  --actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...

# Rule: Rotear /web para Web Target Group
aws elbv2 create-rule \
  --listener-arn arn:aws:elasticloadbalancing:... \
  --priority 2 \
  --conditions Field=path-pattern,Values=/web/* \
  --actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...
```

---

## 🏗️ Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    Internet                              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │   Application Load Balancer  │
        │      (Port 80, 443)          │
        └──────────────┬───────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   /api/*         /web/*         /admin/*
        │              │              │
        ▼              ▼              ▼
 ┌────────────┐  ┌─────────┐  ┌──────────┐
 │ API TG     │  │ Web TG  │  │ Admin TG │
 │ Port 8080  │  │ Port 80 │  │ Port 3000│
 └────┬───────┘  └────┬────┘  └────┬─────┘
      │               │             │
   ┌──┴──┐         ┌──┴──┐      ┌──┴──┐
   │ i-1 │         │ i-2 │      │ i-3 │
   │ EC2 │         │ EC2 │      │ EC2 │
   └─────┘         └─────┘      └─────┘
```

---

## 📊 Pontos-chave

✨ **Roteamento Inteligente**

- Baseado em URL path, hostname e headers
- Múltiplos backends com uma única entrada

🔒 **Segurança**

- Suporta HTTPS/TLS
- WAF (Web Application Firewall) compatível
- Grupos de segurança integrados

📈 **Escalabilidade**

- Auto Scaling automático
- Suporta centenas de requisições por segundo
- Multi-AZ para alta disponibilidade

🔍 **Monitoramento**

- CloudWatch Metrics nativo
- Access logs automáticos
- Health checks configuráveis

---

## 🔗 Recursos para Aprofundar

- [AWS ALB Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/)
- [ALB Request Routing](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html)
- [Tutorial: Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html)
- [Best Practices for ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#load-balancer-benefits)
- [ALB Pricing](https://aws.amazon.com/pt/elasticloadbalancing/pricing/)

---

_Próximo: Explore [Network Load Balancer (NLB)](./nlb.md) para casos de ultra-alta performance!_
