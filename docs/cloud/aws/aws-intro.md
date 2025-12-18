---
id: aws-intro
title: Amazon Web Services (AWS)
sidebar_label: AWS
---

# Amazon Web Services (AWS)

## Visão Geral

AWS é o provedor de nuvem mais maduro e com maior market share. Oferece mais de 200 serviços e está presente em múltiplas regiões globalmente.

## Serviços Principais

### Compute

- **EC2**: Máquinas virtuais
- **Lambda**: Serverless functions
- **ECS/EKS**: Containers e Kubernetes

### Storage

- **S3**: Object storage
- **EBS**: Block storage
- **EFS**: File storage

### Database

- **RDS**: Bancos relacionais gerenciados
- **DynamoDB**: NoSQL gerenciado
- **Aurora**: Banco relacional de alta performance

### Networking

- **VPC**: Rede privada virtual
- **Route 53**: DNS gerenciado
- **CloudFront**: CDN

## Quando usar AWS?

✅ **Ideal para**:

- Maior variedade de serviços
- Ecossistema maduro com muitas ferramentas
- Startup até enterprise
- Workloads que precisam de serviços específicos AWS

## Conceitos-chave

- **Regions e Availability Zones**: Distribuição geográfica
- **IAM**: Gerenciamento de identidade e acesso
- **Well-Architected Framework**: Boas práticas de arquitetura
- **Free Tier**: Nível gratuito para testes

## Exemplo Básico: EC2

```bash
# Listar instâncias EC2
aws ec2 describe-instances

# Criar instância
aws ec2 run-instances \
  --image-id ami-xxxxx \
  --instance-type t2.micro \
  --key-name my-key
```

## Recursos

- [Documentação oficial AWS](https://docs.aws.amazon.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
