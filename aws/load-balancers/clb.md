---
title: Classic Load Balancer (CLB)
parent: Load Balancers
nav_order: 4
description: "Informações sobre AWS Classic Load Balancer (legado)"
---

# ⚠️ Classic Load Balancer (CLB)

O **Classic Load Balancer (CLB)**, também conhecido como **Elastic Load Balancer (ELB)**, é a **primeira geração** de load balancers da AWS.

## ⚠️ Status: LEGADO

**A AWS não recomenda mais o uso de CLB para novos projetos.**

Se você tem um CLB existente, considere migrar para:

- ✅ **ALB** - Para aplicações web (recomendado)
- ✅ **NLB** - Para performance extrema
- ✅ **GWLB** - Para appliances de rede

---

## 📌 Características

O CLB funciona em **Camada 4 (Transporte)** e também oferece roteamento básico de **Camada 7 (Aplicação)**.

### Limitações

❌ Funcionalidades limitadas de roteamento  
❌ Sem suporte a container (ECS)  
❌ Sem roteamento baseado em path/hostname  
❌ Performance inferior ao NLB  
❌ Menos flexível para microserviços

### Quando Usar (Casos Raros)

- Aplicações legadas que ainda usam CLB
- Pequena escalabilidade (< 1000 req/s)
- Protocolos não-HTTP que não cabem em NLB

---

## 🔄 Migração de CLB

Se você tem um CLB, aqui estão os passos para migrar:

### 1. Avaliar Seu Caso de Uso

```bash
# Listar CLBs
aws elb describe-load-balancers

# Verificar listener config
aws elb describe-load-balancer-listeners \
  --load-balancer-name my-classic-lb
```

### 2. Escolher Target (ALB ou NLB)

```bash
# ALB é melhor para:
# - Aplicações web
# - Múltiplos serviços
# - Roteamento por path/host

# NLB é melhor para:
# - TCP/UDP puro
# - Performance extrema
# - Protocols customizados
```

### 3. Criar Novo Load Balancer

```bash
# Exemplo: Migrar para ALB
aws elbv2 create-load-balancer \
  --name my-new-alb \
  --subnets subnet-12345 subnet-67890 \
  --type application

# Criar Target Groups com mesma config do CLB
aws elbv2 create-target-group \
  --name legacy-app-tg \
  --protocol HTTP \
  --port 80 \
  --vpc-id vpc-12345
```

### 4. Validar e Migrar Tráfego

```bash
# Registrar targets no novo LB
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-1234567890abcdef0

# Validar health
aws elbv2 describe-target-health \
  --target-group-arn arn:aws:elasticloadbalancing:...

# Atualizar DNS (mude apontamento do CLB para ALB/NLB)
aws route53 change-resource-record-sets ...
```

---

## 🔗 Recursos

- [CLB Documentation (Archive)](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/)
- [Migrar para ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/migration-from-classic.html)
- [Retiring CLB](https://aws.amazon.com/blogs/aws/new-application-network-load-balancer/)

---

⚠️ **Recomendação: Migre para ALB ou NLB o quanto antes!**

_Volte para: [Load Balancers Overview](./index.md)_
