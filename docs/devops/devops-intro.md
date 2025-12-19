---
id: devops-intro
title: DevOps & Infraestrutura
sidebar_label: Visão Geral
---

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

## Pontos de Atenção

💡 **Em provas e entrevistas:**

**O que DevOps NÃO É:**

- ❌ "DevOps é um cargo/time separado" - FALSO! É cultura e práticas, não silo
- ❌ "DevOps é só ferramentas" - FALSO! Ferramentas sem cultura não funcionam
- ❌ "DevOps substitui QA/Ops" - FALSO! Integra todos, não substitui
- ❌ "DevOps é só automação" - FALSO! Automação sem processo é caos rápido

**Pilares CAMS (muito cobrado!):**

- **Culture**: Colaboração Dev + Ops, responsabilidade compartilhada
- **Automation**: CI/CD, IaC, testes automatizados
- **Measurement**: Métricas, observabilidade, feedback loops
- **Sharing**: Conhecimento, ferramentas, responsabilidades

**Métricas DORA (DevOps Research and Assessment):**
Estas 4 métricas definem performance de times:

1. **Deployment Frequency**: Quantos deploys/dia? (Elite = múltiplos/dia)
2. **Lead Time for Changes**: Commit → produção (Elite = < 1 hora)
3. **Time to Restore Service**: MTTR - Mean Time To Restore (Elite = < 1 hora)
4. **Change Failure Rate**: % deploys que causam incidente (Elite = 0-15%)

**Infrastructure as Code (IaC) - Conceito-chave:**

- Infraestrutura definida em código versionado
- Reprodutível e consistente
- **Ferramentas**: Terraform (multi-cloud), CloudFormation (AWS), Ansible (config management)
- ✅ Benefícios: Version control, code review, rollback, documentação viva

**CI/CD Pipeline - Estágios essenciais:**

1. **Source**: Commit dispara pipeline
2. **Build**: Compilar/empacotar
3. **Test**: Unit → Integration → E2E
4. **Security Scan**: Vulnerabilidades
5. **Deploy**: Staging → Produção
6. **Monitor**: Observar saúde

**Diferenças importantes:**

- **CI vs CD**: CI = build+test automático | CD = deploy automático
- **Continuous Delivery vs Deployment**: Delivery = botão manual para prod | Deployment = 100% automático
- **Configuration Management vs Orchestration**: CM = estado de servers (Ansible) | Orchestration = containers (K8s)

**Observabilidade - Três Pilares:**

1. **Logs**: Eventos discretos ("User 123 failed login")
2. **Metrics**: Agregações numéricas (requests/s, latency, CPU)
3. **Traces**: Rastreamento distribuído (requisição através de serviços)

**Container vs VM:**

- **Container**: Compartilha kernel, leve, segundos para iniciar
- **VM**: SO completo, pesado, minutos para iniciar
- Container NÃO é VM leve! Arquitetura diferente

**Quando aplicar DevOps:**

- ✅ Deploys frequentes necessários
- ✅ Múltiplos ambientes (dev, staging, prod)
- ✅ Times ágeis
- ✅ Necessidade de escala
- ❌ Time < 3 pessoas (overhead alto)
- ❌ Projeto muito simples (CRUD básico)
- ⚠️ Falta expertise inicial (mas vale aprender!)

**Ferramentas por categoria:**

**Version Control:**

- Git (essencial), GitHub, GitLab, Bitbucket

**CI/CD:**

- GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure DevOps

**Containers:**

- Docker (criação), Kubernetes (orquestração)

**IaC:**

- Terraform (multi-cloud), Ansible (config), CloudFormation (AWS)

**Monitoring:**

- Prometheus + Grafana (métricas)
- ELK/Loki (logs)
- Jaeger/Zipkin (traces)

**Cloud Providers:**

- AWS (líder), Azure (enterprise), GCP (data/ML)

**Anti-Patterns (coisas que destroem DevOps):**

- ❌ "DevOps team" separado (volta ao silo!)
- ❌ Automação sem testes (deploy rápido de bugs)
- ❌ Ferramentas sem processo
- ❌ Ignorar segurança (DevSecOps desde início)
- ❌ Métricas de vaidade (deploys/dia sem olhar qualidade)
- ❌ Blame culture (punir erros em vez de aprender)

**DevSecOps - Segurança integrada:**

- Security desde o início (shift-left)
- SAST (análise estática) + DAST (análise dinâmica)
- Dependency scanning (vulnerabilidades em libs)
- Container scanning
- Secrets management (Vault, AWS Secrets Manager)

**GitOps - Evolução do DevOps:**

- Git como single source of truth
- Declarative infrastructure
- Pull-based deployment (ArgoCD, Flux)
- Automatic sync entre Git e ambiente

**Jornada DevOps típica:**

1. **Manual**: Deploy manual, erros frequentes
2. **Scripts**: Alguns scripts de deploy
3. **CI**: Build e teste automáticos
4. **CD**: Deploy automático para staging
5. **Continuous Deployment**: Deploy automático para produção
6. **GitOps**: Git-driven, self-healing infrastructure

**Erros comuns em entrevistas:**

- ❌ Dizer que DevOps é um cargo
- ❌ Não saber métricas DORA
- ❌ Não entender diferença entre CI/CD/Continuous Deployment
- ❌ Não conhecer IaC
- ❌ Confundir container com VM
- ❌ Achar que DevOps é só automação

**Red flags técnicos:**

- Manual deployments em produção
- Sem rollback strategy
- Sem monitoring/alerting
- Ambientes diferentes (dev ≠ prod)
- Secrets no código
- Sem backup/disaster recovery

**Certificações relevantes:**

- **AWS**: Solutions Architect, DevOps Engineer
- **Azure**: Azure Administrator, DevOps Engineer
- **Google Cloud**: Cloud Engineer
- **Docker**: Docker Certified Associate (DCA)
- **Kubernetes**: CKA, CKAD, CKS
- **Terraform**: HashiCorp Certified Terraform Associate

**Boas práticas essenciais:**

- ✅ Automatize tudo que é repetitivo
- ✅ Version control para tudo (código, infra, configs)
- ✅ Immutable infrastructure (nunca modifique, recrie)
- ✅ Monitoring proativo (alerte antes do usuário reclamar)
- ✅ Rollback rápido (sempre tenha plano B)
- ✅ Documentation as code (README, ADRs)
- ✅ Blameless postmortems (aprenda com falhas)
- ✅ Small batch size (commits e deploys pequenos)
