---
sidebar_position: 2
title: EC2 - Computação em Nuvem
description: Máquinas virtuais sob demanda na AWS
---

# 🖥️ EC2 - Elastic Compute Cloud

**EC2** é o serviço de computação em nuvem da AWS que oferece máquinas virtuais (instâncias) sob demanda, configuráveis e escaláveis.

## 🎯 O que é uma instância EC2?

Pense em uma instância como um **computador que você aluga**:

```
Você quer rodar uma aplicação web:

┌─────────────────────────────────────┐
│ Antes (On-premises)                 │
│                                     │
│ 1. Comprar hardware    ← $$$$$     │
│ 2. Instalar SO         ← Tempo     │
│ 3. Configurar rede     ← Complexo  │
│ 4. Manter/atualizar    ← Contínuo  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Agora (EC2)                         │
│                                     │
│ 1. Clique e crie      ← 1 minuto   │
│ 2. Está pronta imediatamente        │
│ 3. Rede pré-configurada             │
│ 4. AWS cuida da manutenção          │
└─────────────────────────────────────┘
```

## 🔧 Tipos de instâncias

AWS oferece vários tipos otimizados para diferentes cargas:

### **General Purpose (T, M)**

Balanceadas para a maioria das workloads:

```
- t3.micro    : 1 vCPU, 1 GB RAM  (Free Tier!)
- t3.small    : 2 vCPU, 2 GB RAM
- m5.large    : 2 vCPU, 8 GB RAM
- m5.xlarge   : 4 vCPU, 16 GB RAM
```

**Use para**: Web servers, aplicações pequenas/médias, desenvolvimento

### **Compute Optimized (C)**

Otimizadas para CPU intensivo:

```
- c5.large    : 2 vCPU, 4 GB RAM
- c5.xlarge   : 4 vCPU, 8 GB RAM
- c5.2xlarge  : 8 vCPU, 16 GB RAM
```

**Use para**: Processamento de vídeo, simulações, compilação

### **Memory Optimized (R, X)**

Otimizadas para operações em memória:

```
- r5.large    : 2 vCPU, 16 GB RAM
- r5.xlarge   : 4 vCPU, 32 GB RAM
- x1.xlarge   : 4 vCPU, 122 GB RAM
```

**Use para**: Bancos de dados in-memory, big data, caches

### **Storage Optimized (I, H, D)**

Otimizadas para I/O intensivo:

```
- i3.large    : SSD NVMe de alta performance
- h1.2xlarge  : HDD de alta capacidade
```

**Use para**: Data warehouses, NoSQL, Elasticsearch

## 📊 Ciclo de vida da instância

```
┌─────────┐
│ Pending │  (Iniciando)
└────┬────┘
     │
┌────▼──────┐
│ Running   │  (Ativa, você está pagando)
└────┬──────┘
     │
┌────▼──────────────────┐
│ Stopping / Stopped    │  (Pausada, disco mantém dados)
│ (você NÃO paga!)      │
└────┬─────────────────┘
     │
┌────▼──────┐
│Terminating│  (Deletando, irreversível)
└────┬──────┘
     │
┌────▼──────┐
│Terminated │  (Deletada, não existe mais)
└───────────┘
```

## 💾 Armazenamento em EC2

### **EBS (Elastic Block Storage)**

Discos persistentes que podem ser desanexados:

```
┌──────────┐
│   EC2    │
│          │
│ ┌──────┐ │
│ │ EBS  │ │  ← Volume persistente
│ │ 100GB│ │     Pode ser movido entre instâncias
│ └──────┘ │
└──────────┘
```

Tipos de EBS:

- **gp3/gp2**: Uso geral (mais comum)
- **io1/io2**: IOPS extremamente alta
- **st1**: Throughput otimizado
- **sc1**: Cold storage

### **Instance Store**

Armazenamento temporário muito rápido (SSD/NVMe):

```
⚠️ OBS: Se a instância parar, perde os dados!
Use para: Cache, dados temporários
```

## 🌍 Zona de Disponibilidade (AZ)

Sempre crie instâncias em múltiplas AZs para alta disponibilidade:

```
Região us-east-1
├── us-east-1a
│   └── EC2-Web-1  ✓
│
├── us-east-1b
│   └── EC2-Web-2  ✓
│
└── us-east-1c
    └── EC2-Web-3  ✓

Se us-east-1a cair, você ainda tem us-east-1b e us-east-1c!
```

## 💾 Criação básica via AWS CLI

```bash
# Encontrar AMI mais recente Ubuntu
aws ec2 describe-images \
  --owners 099720109477 \
  --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04*" \
  --query 'sort_by(Images, &CreationDate)[-1].[ImageId,Name]'

# Criar instância
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.micro \
  --key-name minha-chave \
  --security-group-ids sg-12345678 \
  --subnet-id subnet-12345678 \
  --monitoring Enabled=true

# Obter IP público
aws ec2 describe-instances \
  --instance-ids i-1234567890abcdef0 \
  --query 'Reservations[0].Instances[0].PublicIpAddress'
```

## 🔐 Segurança

### **Pares de chaves (Key Pairs)**

```
Chave privada (.pem)  ← Você guarda com segurança
Chave pública         ← AWS armazena nas instâncias
          │
          └─→ ssh -i chave.pem ec2-user@IP
```

### **Security Groups**

Firewall virtual para EC2:

```
Inbound rules:
├── SSH (22) ← De seu IP
├── HTTP (80) ← De anywhere (0.0.0.0/0)
└── HTTPS (443) ← De anywhere

Outbound rules:
└── All traffic (padrão)
```

## 📊 Comparação: On-premises vs EC2

| Aspecto            | On-premises | EC2         |
| ------------------ | ----------- | ----------- |
| **Custo inicial**  | Muito alto  | Baixo       |
| **Tempo setup**    | Semanas     | Minutos     |
| **Escalabilidade** | Lenta       | Instantânea |
| **Manutenção**     | Você        | AWS         |
| **Flexibilidade**  | Limitada    | Total       |

## 🚀 Próximas lições

1. [Load Balancers (ALB/NLB)](/docs/aws/load-balancers/alb) - Distribuir tráfego
2. [S3](/docs/aws/s3) - Armazenamento de objetos
3. [Auto Scaling](/docs/aws/) - Escalar EC2 automaticamente

:::info Dicas Importantes

✅ Use Free Tier (t2.micro/t3.micro) para aprender  
✅ Sempre coloque instances em múltiplas AZs  
✅ Use EBS gp3 para a maioria dos casos  
✅ Configure backups automáticos com snapshots  
✅ Monitore com CloudWatch

:::

:::tip Referência
[EC2 User Guide](https://docs.aws.amazon.com/ec2/index.html) para documentação completa.
:::
