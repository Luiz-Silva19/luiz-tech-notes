---
id: devops-intro
title: DevOps & Infraestrutura
sidebar_label: Visão Geral
---

# ⚙️ DevOps & Infraestrutura

## O que é DevOps?

DevOps é a união de práticas, ferramentas e filosofia cultural que aumenta a capacidade de uma organização entregar aplicações e serviços rapidamente. Quebra barreiras entre desenvolvimento (Dev) e operações (Ops).

**Analogia**: Imagina uma fábrica onde quem projeta o produto também ajuda na linha de montagem. Todos entendem o processo completo e colaboram para melhorar continuamente.

## Pilares do DevOps

### Culture (Cultura)

- Colaboração entre times
- Compartilhamento de responsabilidades
- Aprendizado contínuo

### Automation (Automação)

- CI/CD pipelines
- Infrastructure as Code
- Testes automatizados

### Measurement (Medição)

- Métricas e monitoramento
- Feedback loops
- Continuous improvement

### Sharing (Compartilhamento)

- Conhecimento
- Ferramentas
- Responsabilidades

## Áreas Principais

### [Docker](docker/docker-intro.md)

Containerização de aplicações para portabilidade e consistência.

### [Kubernetes](kubernetes/k8s-intro.md)

Orquestração de containers em escala.

### [CI/CD](ci-cd/cicd-intro.md)

Integração e entrega contínuas.

## Conceitos-chave

### Infrastructure as Code (IaC)

Gerenciar infraestrutura via código versionado.

- **Ferramentas**: Terraform, Ansible, CloudFormation

### Continuous Integration

Integrar código frequentemente, com testes automáticos.

### Continuous Deployment

Deploy automático após passar pelos testes.

### Observabilidade

Entender o sistema através de logs, métricas e traces.

- **Ferramentas**: Prometheus, Grafana, ELK Stack

## Quando aplicar DevOps?

✅ **Aplique quando**:

- Múltiplos deploys por dia/semana
- Necessidade de escala e disponibilidade
- Times ágeis com entregas frequentes
- Infraestrutura complexa

❌ **Cuidado quando**:

- Time muito pequeno (< 3 pessoas)
- Projeto simples com poucos deploys
- Falta de expertise inicial (mas aprenda!)

## Benefícios

🚀 **Deploy mais rápido**: Automação reduz tempo  
🐛 **Menos bugs em produção**: Testes automatizados  
📈 **Melhor escalabilidade**: Infraestrutura flexível  
🔄 **Recovery rápido**: Rollback automatizado  
👥 **Colaboração**: Times trabalham juntos  
📊 **Visibilidade**: Métricas em tempo real

## Desafios

⚡ **Curva de aprendizado**: Muitas ferramentas  
🔧 **Complexidade inicial**: Setup requer tempo  
💰 **Investimento**: Ferramentas e treinamento  
🔄 **Mudança cultural**: Resistência organizacional

## Ferramentas Essenciais

### Version Control

- Git, GitHub, GitLab

### CI/CD

- Jenkins, GitHub Actions, GitLab CI, CircleCI

### Containers

- Docker, Podman

### Orquestração

- Kubernetes, Docker Swarm

### IaC

- Terraform, Ansible, Pulumi

### Monitoring

- Prometheus, Grafana, DataDog, New Relic

### Logging

- ELK Stack (Elasticsearch, Logstash, Kibana)
- Loki, Fluentd

## Pipeline Típico

```
[Código] → [Commit] → [Build] → [Test] → [Deploy] → [Monitor]
                         ↓         ↓         ↓          ↓
                    [Docker]  [Testes]  [K8s]    [Prometheus]
```

## Boas Práticas

✅ **Automatize tudo**: Manual é erro esperando acontecer  
✅ **Version control**: Tudo (código, infra, configs)  
✅ **Testes em camadas**: Unit, integration, e2e  
✅ **Monitoramento proativo**: Detecte antes do usuário  
✅ **Rollback fácil**: Sempre tenha plano B  
✅ **Documentação**: Onboarding e troubleshooting

## Métricas Importantes (DORA)

### Deployment Frequency

Quantas vezes você faz deploy?

### Lead Time for Changes

Tempo de código → produção

### Time to Restore Service

Quanto tempo para recuperar de falha?

### Change Failure Rate

% de deploys que causam falha

## Jornada DevOps

1. **Iniciante**: Manual, deploys raros
2. **Básico**: CI/CD básico, alguns testes
3. **Intermediário**: Automação ampla, IaC
4. **Avançado**: Self-service, full automation
5. **Elite**: Observability completa, chaos engineering

## Anti-Patterns

❌ **DevOps como time separado**: É cultura, não silo  
❌ **Automação sem testes**: Falha rápida não é benefício  
❌ **Ferramentas sem processo**: Processo vem primeiro  
❌ **Ignorar segurança**: DevSecOps desde o início

## Próximos Passos

Comece simples:

1. **Git + GitHub**: Version control básico
2. **Docker**: Containerize uma aplicação
3. **CI básico**: GitHub Actions com testes
4. **Kubernetes**: Quando precisar orquestração

**Lembre-se**: DevOps é jornada, não destino!
