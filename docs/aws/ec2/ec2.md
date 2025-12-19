---
id: aws-ec2
title: Amazon EC2 (Elastic Compute Cloud)
sidebar_label: EC2
---

O **Amazon EC2** (Elastic Compute Cloud) é o serviço de computação em nuvem da AWS que fornece capacidade computacional redimensionável através de servidores virtuais (instâncias).

## O que é EC2?

EC2 permite criar e gerenciar máquinas virtuais na nuvem AWS, oferecendo controle total sobre o sistema operacional, configurações de rede e armazenamento. É a base para a maioria das workloads na AWS.

## Principais Conceitos

### Instâncias

Servidores virtuais que executam aplicações. Cada instância tem:

- **Tipo de instância**: Define CPU, memória, armazenamento e rede
- **AMI (Amazon Machine Image)**: Template do sistema operacional
- **Security Groups**: Firewall virtual
- **Key Pairs**: Autenticação SSH

### Tipos de Instância

#### Propósito Geral (T, M)

- **T3/T4g**: Burstable, ideal para cargas variáveis
- **M5/M6**: Balanceado entre CPU e memória

#### Otimizadas para Computação (C)

- **C5/C6**: Alta performance de CPU
- Casos de uso: processamento batch, HPC, gaming

#### Otimizadas para Memória (R, X)

- **R5/R6**: Alto throughput de memória
- **X1/X2**: Memória extrema para bancos in-memory

#### Otimizadas para Storage (I, D)

- **I3/I4**: IOPS extremo com NVMe
- **D2/D3**: Storage denso (HDD)

#### GPU (P, G, Inf)

- **P4/P5**: ML training, HPC
- **G5**: Renderização, streaming
- **Inf1/Inf2**: Inferência de ML

## Modelos de Pricing

### On-Demand

💰 Pague por hora/segundo sem compromisso

- ✅ Flexibilidade total
- ❌ Mais caro

### Reserved Instances (RI)

💰 Desconto de até 75% com compromisso de 1-3 anos

- ✅ Custo reduzido
- ❌ Menor flexibilidade

### Spot Instances

💰 Desconto de até 90% usando capacidade não utilizada

- ✅ Custo extremamente baixo
- ❌ Pode ser interrompido pela AWS

### Savings Plans

💰 Desconto em troca de compromisso de valor por hora

- ✅ Mais flexível que RI
- ✅ Aplica-se a Lambda e Fargate também

## Armazenamento no EC2

### EBS (Elastic Block Store)

- Volume de rede persistente
- Pode ser anexado/desanexado de instâncias
- Veja mais em [EBS](ebs.md)

### Instance Store

- Armazenamento local efêmero
- Alto IOPS
- ⚠️ Dados perdidos quando instância é parada

### EFS (Elastic File System)

- Sistema de arquivos compartilhado NFS
- Múltiplas instâncias podem acessar simultaneamente

## Networking

### Elastic IP

Endereço IP público estático que pode ser reatribuído entre instâncias.

### ENI (Elastic Network Interface)

Interface de rede virtual que pode ser anexada a instâncias.

### Placement Groups

- **Cluster**: Baixa latência, alta largura de banda
- **Spread**: Alta disponibilidade, falhas isoladas
- **Partition**: Distribuição entre partições

## Auto Scaling

Ajusta automaticamente o número de instâncias baseado em:

- **CPU Utilization**
- **Network Traffic**
- **Métricas customizadas do CloudWatch**

Configurações:

- **Desired Capacity**: Número ideal de instâncias
- **Min/Max Capacity**: Limites de escalabilidade
- **Scaling Policies**: Regras de quando escalar

## Boas Práticas

✅ **Use Auto Scaling** para alta disponibilidade  
✅ **Reserve instâncias** de longa duração para economizar  
✅ **Use Spot** para workloads tolerantes a falhas  
✅ **Implemente em múltiplas AZs** para resiliência  
✅ **Monitore com CloudWatch** métricas e alarmes  
✅ **Automatize com User Data** scripts de inicialização  
✅ **Use IMDSv2** para metadados mais seguros

## Casos de Uso Comuns

- **Aplicações Web**: Servidores web e APIs
- **Batch Processing**: Processamento de grandes volumes de dados
- **Desenvolvimento**: Ambientes de dev/test sob demanda
- **High Performance Computing**: Simulações científicas
- **Gaming**: Servidores de jogos
- **Machine Learning**: Training e inferência de modelos

## Recursos

- [Documentação Oficial EC2](https://docs.aws.amazon.com/ec2/)
- [Tipos de Instância](https://aws.amazon.com/ec2/instance-types/)
- [Preços EC2](https://aws.amazon.com/ec2/pricing/)
