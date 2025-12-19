---
id: gcp-intro
title: Google Cloud Platform (GCP)
sidebar_label: GCP
---

## Visão Geral

GCP é o provedor de nuvem do Google, conhecido por serviços de machine learning, big data e infraestrutura de alta performance. Terceiro maior provedor de nuvem.

## Serviços Principais

### Compute

- **Compute Engine**: VMs
- **Cloud Functions**: Serverless
- **App Engine**: PaaS
- **GKE**: Google Kubernetes Engine

### Storage

- **Cloud Storage**: Object storage
- **Persistent Disk**: Block storage
- **Filestore**: File storage

### Database

- **Cloud SQL**: SQL gerenciado
- **Cloud Spanner**: SQL distribuído globalmente
- **Firestore**: NoSQL document database
- **BigQuery**: Data warehouse

### Networking

- **VPC**: Virtual Private Cloud
- **Cloud DNS**: DNS gerenciado
- **Cloud CDN**: Content delivery

## Quando usar GCP?

✅ **Ideal para**:

- Machine Learning e AI (TensorFlow, Vertex AI)
- Big Data e Analytics (BigQuery)
- Kubernetes (GKE é referência)
- Aplicações que precisam da rede global do Google

## Conceitos-chave

- **Projects**: Unidade organizacional
- **IAM**: Identity and Access Management
- **Regions e Zones**: Distribuição geográfica
- **Cloud Console**: Interface de gerenciamento

## Exemplo Básico: gcloud CLI

```bash
# Autenticar
gcloud auth login

# Criar instância
gcloud compute instances create my-instance \
  --zone=us-central1-a \
  --machine-type=e2-medium \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud
```

## Recursos

- [Documentação oficial GCP](https://cloud.google.com/docs)
- [GCP Free Tier](https://cloud.google.com/free)
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)
