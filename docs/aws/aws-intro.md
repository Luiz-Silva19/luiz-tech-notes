---
id: aws-intro
title: Amazon Web Services (AWS)
sidebar_label: Visão Geral
---

AWS é o provedor de nuvem mais maduro e com maior market share do mercado. Oferece mais de 200 serviços distribuídos em múltiplas regiões globalmente, sendo a escolha principal para empresas que buscam escalabilidade, confiabilidade e um ecossistema robusto de ferramentas.

**Analogia**: Como uma cidade completa de infraestrutura pronta para alugar - em vez de construir tijolo por tijolo, você aluga prédios (EC2), armazéns (S3), energia (Lambda) e foca no seu negócio. Pode expandir ou reduzir em minutos.

## Por que escolher AWS?

### Vantagens

✅ **Maior variedade de serviços** - Mais de 200 serviços em diferentes categorias  
✅ **Ecossistema maduro** - Vasta comunidade, documentação e ferramentas de terceiros  
✅ **Presença global** - 30+ regiões geográficas com múltiplas Availability Zones  
✅ **Certificações** - Ampla gama de certificações de compliance (HIPAA, PCI-DSS, SOC)  
✅ **Marketplace** - Grande quantidade de soluções prontas de terceiros

### Quando considerar alternativas

⚠️ **Custo** - Pode ser mais caro em cenários específicos  
⚠️ **Complexidade** - Curva de aprendizado maior devido à quantidade de opções  
⚠️ **Lock-in** - Alguns serviços são muito específicos da AWS

## Principais Categorias de Serviços

### Computação

- **EC2** - Máquinas virtuais escaláveis
- **Lambda** - Computação serverless
- **ECS/EKS** - Orquestração de containers
- **Fargate** - Containers serverless

### Armazenamento

- **S3** - Armazenamento de objetos
- **EBS** - Block storage para EC2
- **EFS** - File system compartilhado
- **Glacier** - Arquivamento de longo prazo

### Banco de Dados

- **RDS** - Bancos relacionais gerenciados
- **DynamoDB** - NoSQL serverless
- **ElastiCache** - Cache em memória
- **Redshift** - Data warehouse

### Rede

- **VPC** - Rede virtual privada
- **Route 53** - DNS e roteamento
- **CloudFront** - CDN global
- **ELB/ALB/NLB** - Load balancers

## Estrutura desta Seção

Nesta documentação sobre AWS, você encontrará:

- 📦 **Load Balancers** - Detalhes sobre ALB, NLB e GLB

## Pontos de Atenção

### 🎯 Dicas para Certificações AWS

💡 **AWS Solutions Architect Associate:**

- Questões costumam focar em "qual serviço usar quando" - memorize os casos de uso principais de cada categoria
- **Palavra-chave "serverless"** → considere Lambda, DynamoDB, S3, API Gateway
- **Palavra-chave "IP fixo"** → considere Elastic IP ou NLB
- **Palavra-chave "SQL"** → RDS; **"NoSQL"** → DynamoDB
- **Palavra-chave "arquivo compartilhado"** → EFS; **"objeto"** → S3

💡 **Pegadinhas comuns:**

- **CloudWatch vs CloudTrail**: CloudWatch = monitoramento de performance; CloudTrail = auditoria de ações (quem fez o quê)
- **Security Group vs NACL**: Security Group = stateful (retorno automático); NACL = stateless (precisa regra de retorno)
- **EBS vs Instance Store**: EBS persiste dados; Instance Store é efêmero (perde dados ao parar instância)

💡 **Custo-benefício:**

- Sempre considere alternativas serverless antes de provisionar servidores
- Reserved Instances e Savings Plans podem economizar até 75% - questões de otimização de custo frequentemente envolvem isso
- S3 tem classes de armazenamento diferentes - questões sobre arquivamento geralmente apontam para Glacier

### ⚠️ Erros Comuns

❌ **Lock-in vendor**: Usar serviços muito específicos da AWS (como DynamoDB Streams) dificulta migração futura  
❌ **Região errada**: Escolher região geograficamente distante dos usuários aumenta latência  
❌ **Não usar Multi-AZ**: Aplicações críticas devem estar em múltiplas Availability Zones  
❌ **Esquecer de limpar recursos**: Recursos não utilizados (snapshots antigos, EBS volumes desanexados) continuam gerando custo

## Recursos Externos

- [Documentação Oficial AWS](https://docs.aws.amazon.com/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Free Tier](https://aws.amazon.com/free/)
