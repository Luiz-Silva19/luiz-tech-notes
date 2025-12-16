---
sidebar_position: 1
title: AWS - Introdução
description: Fundamentos de Amazon Web Services e seus principais serviços
---

# 🏢 Amazon Web Services (AWS)

AWS é a plataforma de computação em nuvem mais utilizada globalmente, oferecendo centenas de serviços para computação, armazenamento, banco de dados, redes e muito mais.

## 🎯 O que é Cloud Computing?

Pense em cloud como **alugar poder computacional** ao invés de comprar e manter computadores físicos:

```
┌─────────────────────────────────────────────┐
│           ANTES (On-Premises)               │
│  Você possui servidores e mantém tudo      │
│  - Altos custos iniciais                   │
│  - Manutenção complexa                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│           AGORA (Cloud - AWS)              │
│  Você usa serviços sob demanda             │
│  - Pague o que usar                        │
│  - AWS mantém a infraestrutura             │
└─────────────────────────────────────────────┘
```

## 📊 Categorias principais de serviços

### **1. Computação**

- **EC2**: Máquinas virtuais sob demanda
- **Lambda**: Computação serverless
- **ECS/EKS**: Orquestração de containers

### **2. Armazenamento**

- **S3**: Armazenamento de objetos (fotos, vídeos, etc)
- **EBS**: Discos para EC2
- **Glacier**: Armazenamento de arquivo de longo prazo

### **3. Rede**

- **VPC**: Rede virtual isolada
- **Load Balancers**: Distribuição de tráfego
- **CloudFront**: CDN para conteúdo estático

### **4. Banco de Dados**

- **RDS**: Banco relacional gerenciado
- **DynamoDB**: NoSQL completamente gerenciado
- **ElastiCache**: Cache em memória

## 🌍 Regiões e Zonas de Disponibilidade

AWS opera em múltiplas **regiões** no mundo (ex: us-east-1, eu-west-1, sa-east-1).

Cada região possui múltiplas **zonas de disponibilidade (AZs)** isoladas fisicamente:

```
Região (São Paulo - sa-east-1)
├── AZ-1 (Datacenter)
├── AZ-2 (Datacenter)
└── AZ-3 (Datacenter)
```

**Por que isso importa?** Para alta disponibilidade, distribua recursos entre múltiplas AZs!

## 💰 Modelo de preços

AWS segue o modelo **pay-as-you-go**:

- ✅ Pague apenas pelo que usar
- ✅ Sem contratos de longo prazo
- ✅ Cancele quando quiser
- ✅ Quanto mais usa, maior o desconto

## 🚀 Próximos passos

1. Explore [Load Balancers](/docs/aws/load-balancers/alb) para distribuição de tráfego
2. Aprenda sobre [EC2](/docs/aws/ec2) para computação
3. Domine [S3](/docs/aws/s3) para armazenamento

:::tip Documentação Oficial
Para informações completas, visite a [AWS Documentation](https://docs.aws.amazon.com/)
:::
