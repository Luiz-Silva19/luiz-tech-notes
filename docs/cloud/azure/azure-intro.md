---
id: azure-intro
title: Microsoft Azure
sidebar_label: Azure
---

## Visão Geral

Azure é o provedor de nuvem da Microsoft, com forte integração ao ecossistema Windows e ferramentas enterprise. Segunda maior plataforma de nuvem do mundo.

## Serviços Principais

### Compute

- **Virtual Machines**: VMs Windows e Linux
- **Azure Functions**: Serverless
- **App Service**: PaaS para web apps
- **AKS**: Azure Kubernetes Service

### Storage

- **Blob Storage**: Object storage
- **Azure Files**: File shares
- **Managed Disks**: Block storage

### Database

- **Azure SQL Database**: SQL Server gerenciado
- **Cosmos DB**: NoSQL multi-modelo
- **Azure Database for PostgreSQL/MySQL**

### Networking

- **Virtual Network**: Rede privada
- **Azure DNS**: Gerenciamento de DNS
- **Azure CDN**: Content delivery

## Quando usar Azure?

✅ **Ideal para**:

- Ambientes Windows/.NET/Microsoft
- Integração com Active Directory
- Empresas que já usam Microsoft 365
- Hybrid cloud (on-premises + cloud)

## Conceitos-chave

- **Resource Groups**: Agrupamento lógico de recursos
- **Azure AD**: Identidade e acesso
- **Regions e Availability Zones**: Distribuição geográfica
- **Azure Portal**: Interface web de gerenciamento

## Exemplo Básico: Azure CLI

```bash
# Login
az login

# Criar resource group
az group create --name MyResourceGroup --location eastus

# Criar VM
az vm create \
  --resource-group MyResourceGroup \
  --name MyVM \
  --image UbuntuLTS \
  --admin-username azureuser \
  --generate-ssh-keys
```

## Recursos

- [Documentação oficial Azure](https://docs.microsoft.com/azure/)
- [Azure Free Account](https://azure.microsoft.com/free/)
- [Azure Architecture Center](https://docs.microsoft.com/azure/architecture/)
