---
id: cicd-intro
title: CI/CD - Integração e Entrega Contínuas
sidebar_label: CI/CD
---

## O que é CI/CD?

**CI (Continuous Integration)**: Prática de integrar código ao repositório principal frequentemente, com testes automáticos.

**CD (Continuous Delivery)**: Código sempre pronto para deploy, mas deploy é manual.

**CD (Continuous Deployment)**: Deploy automático para produção após passar nos testes.

**Analogia**: Como uma linha de montagem automatizada - cada commit passa por estações (build, test, deploy) e só produto aprovado chega ao cliente. Automação garante qualidade.

## Por que CI/CD?

### Problemas que resolve:

- ❌ "Funciona na minha máquina"
- ❌ Integrações dolorosas e raras
- ❌ Deploy manual sujeito a erros
- ❌ Bugs descobertos tarde demais
- ❌ Feedback lento

### Benefícios:

- ✅ **Feedback rápido**: Bugs detectados em minutos
- ✅ **Deploy confiável**: Automação reduz erros
- ✅ **Entregas frequentes**: Valor ao cliente mais rápido
- ✅ **Qualidade**: Testes em cada mudança
- ✅ **Menos stress**: Deploy deixa de ser evento

## Continuous Integration (CI)

### Pipeline CI Típico

```
[Commit] → [Build] → [Test] → [Report]
```

### Práticas Essenciais

1. **Repositório único**: Código versionado em um lugar
2. **Commits frequentes**: Várias vezes ao dia
3. **Build automatizado**: Script que qualquer um pode rodar
4. **Testes automatizados**: Unit, integration, e2e
5. **Build rápido**: < 10 minutos idealmente
6. **Ambiente de teste**: Próximo de produção
7. **Visibilidade**: Status do build para todos
8. **Fix imediato**: Build quebrado tem prioridade máxima

## Continuous Delivery (CD)

### Pipeline CD Típico

```
[CI] → [Deploy Staging] → [Testes Staging] → [Aprovação Manual] → [Deploy Prod]
```

### Características

- Código sempre deployável
- Deploy para staging automático
- Deploy para produção via botão
- Rollback fácil e rápido

## Continuous Deployment

### Pipeline Completo

```
[Commit] → [Build] → [Test] → [Deploy Staging] → [Test Staging] → [Deploy Prod]
```

### Características

- Tudo automático até produção
- Requer confiança alta em testes
- Feature flags para controle
- Monitoring robusto

## Quando usar cada abordagem?

| Abordagem                 | Quando usar                                  |
| ------------------------- | -------------------------------------------- |
| **CI apenas**             | Projetos iniciantes, aprendizado             |
| **Continuous Delivery**   | Regulação exige aprovação, deploy controlado |
| **Continuous Deployment** | Startup, SaaS, alta maturidade               |

## Ferramentas Populares

### CI/CD Platforms

- **GitHub Actions**: Integrado ao GitHub
- **GitLab CI/CD**: Integrado ao GitLab
- **Jenkins**: Open-source, flexível
- **CircleCI**: SaaS, rápido
- **Travis CI**: Open-source friendly
- **Azure DevOps**: Ecossistema Microsoft

### Cloud Native

- **AWS CodePipeline**: AWS nativo
- **Google Cloud Build**: GCP nativo
- **Azure Pipelines**: Azure nativo

## Exemplo: GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to staging
        if: github.ref == 'refs/heads/main'
        run: |
          echo "Deploying to staging..."
          # deploy script aqui
```

## Exemplo: GitLab CI

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

test:
  stage: test
  script:
    - npm test
  coverage: '/Coverage: \d+\.\d+/'

deploy_staging:
  stage: deploy
  script:
    - echo "Deploy to staging"
  environment:
    name: staging
  only:
    - main

deploy_prod:
  stage: deploy
  script:
    - echo "Deploy to production"
  environment:
    name: production
  when: manual
  only:
    - main
```

## Pipeline Stages Comuns

### 1. Source

Trigger no commit/push.

### 2. Build

Compilar código, gerar artefatos.

### 3. Test

- **Unit tests**: Teste de unidades isoladas
- **Integration tests**: Teste de integrações
- **E2E tests**: Teste end-to-end

### 4. Security Scan

- Scan de vulnerabilidades
- SAST (Static Application Security Testing)
- DAST (Dynamic Application Security Testing)

### 5. Artifact Storage

Armazenar builds (Docker images, JARs, etc).

### 6. Deploy

Provisionar em ambiente alvo.

### 7. Smoke Tests

Testes básicos em produção.

### 8. Monitor

Observar comportamento pós-deploy.

## Estratégias de Deploy

### Blue-Green Deployment

Dois ambientes idênticos, troca instantânea.

```
Blue (prod atual) → Deploy Green → Troca → Blue vira staging
```

### Canary Deployment

Nova versão para % pequeno de usuários.

```
5% → 25% → 50% → 100%
```

### Rolling Deployment

Atualiza gradualmente instâncias.

```
Instance 1 → Instance 2 → Instance 3 → ...
```

### Feature Flags

Deploy código desabilitado, ativa feature depois.

```python
if feature_flag.is_enabled('new_checkout'):
    new_checkout()
else:
    old_checkout()
```

## Testes em Pipeline

### Pirâmide de Testes

```
        ┌────┐
        │ E2E│  ← Poucos, lentos, caros
        └────┘
      ┌────────┐
      │ Integration │  ← Médio
      └────────┘
   ┌──────────────┐
   │   Unit Tests  │  ← Muitos, rápidos, baratos
   └──────────────┘
```

### Testes Essenciais

```yaml
# Exemplo conceitual
tests:
  - unit: 70% # Rápidos, muitos
  - integration: 20% # Médio, moderado
  - e2e: 10% # Lentos, poucos mas críticos
```

## Boas Práticas

✅ **Commit pequenos**: Facilita identificar problemas  
✅ **Build rápido**: Feedback rápido  
✅ **Testes confiáveis**: Sem flaky tests  
✅ **Rollback automático**: Se falhar, volta versão anterior  
✅ **Immutable artifacts**: Build uma vez, deploy várias  
✅ **Environment parity**: Dev, staging e prod similares  
✅ **Secrets management**: Nunca commitar senhas  
✅ **Monitoring**: Observe cada deploy

## Secrets Management

```yaml
# GitHub Actions
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
  run: deploy.sh

# Ferramentas
- HashiCorp Vault
- AWS Secrets Manager
- Azure Key Vault
- Docker Secrets
```

## Métricas Importantes

### Build Metrics

- **Build success rate**: % de builds com sucesso
- **Build time**: Tempo médio de build
- **Test coverage**: % código coberto por testes

### Deployment Metrics

- **Deployment frequency**: Quantos deploys/dia
- **Lead time**: Commit → produção
- **MTTR**: Mean Time To Recovery
- **Change failure rate**: % deploys com falha

## Troubleshooting

### Build falhou?

1. Ver logs do step que falhou
2. Reproduzir localmente
3. Fix e commit
4. Pipeline roda novamente

### Deploy falhou?

1. Rollback automático
2. Investigar logs
3. Fix
4. Deploy novamente

### Testes flaky?

- Isole testes
- Melhore setup/teardown
- Evite dependências externas
- Use mocks/stubs

## Anti-Patterns

❌ **Manual steps**: Derrota propósito  
❌ **Build quebrado ignorado**: Fix primeiro!  
❌ **Testes lentos**: Ninguém vai rodar  
❌ **Falta de rollback**: Receita para desastre  
❌ **Pipeline complexo demais**: Mantenha simples  
❌ **Secrets no código**: Vazamento de dados

## Evolução do CI/CD

### Nível 1: Manual

Deploy manual, poucos testes.

### Nível 2: CI Básico

Build e testes automáticos.

### Nível 3: CD

Deploy automático para staging.

### Nível 4: Continuous Deployment

Deploy automático para produção.

### Nível 5: GitOps

Git como source of truth, automação completa.

## Integração com Containers

```yaml
# Build e push Docker image
- name: Build Docker image
  run: |
    docker build -t myapp:${{ github.sha }} .
    docker push myapp:${{ github.sha }}

- name: Deploy to Kubernetes
  run: |
    kubectl set image deployment/myapp \
      myapp=myapp:${{ github.sha }}
```

## Analogia

**CI/CD** é como uma linha de montagem automatizada de fábrica:

- **Commit** = Matéria-prima chega na esteira
- **Build** = Máquinas montam o produto
- **Testes** = Controle de qualidade verifica cada peça
- **Deploy Staging** = Produto vai para showroom interno (teste)
- **Deploy Produção** = Produto é enviado para loja (cliente)

Se qualquer etapa falha (teste quebra), a linha para automaticamente. Ninguém quer produto defeituoso chegando ao cliente!

**Continuous Integration** = Todos os operários entregam peças várias vezes ao dia para montagem, em vez de guardar por semanas

**Continuous Delivery** = Produto sempre pronto na área de expedição, mas gerente aperta botão para enviar

**Continuous Deployment** = Assim que produto passa no controle de qualidade, é automaticamente enviado ao cliente

## Pontos de Atenção

💡 **Em provas e entrevistas:**

**Diferenças críticas:**

- **CI** = Integração contínua (build + test automático)
- **Continuous Delivery** = Deploy automático para staging, MANUAL para produção
- **Continuous Deployment** = Deploy AUTOMÁTICO até produção

**Pegadinhas comuns:**

- ❌ "CI/CD é só uma ferramenta" - FALSO! É prática cultural + ferramentas
- ❌ "Continuous Deployment = Continuous Delivery" - FALSO! Deployment é 100% automático
- ❌ "CI garante código sem bugs" - FALSO! Só detecta se tiver testes
- ❌ "Pipeline lento não tem problema" - FALSO! Feedback rápido é essencial

**Quando usar cada abordagem:**

- **CI apenas**: Projetos iniciantes, aprendizado
- **Continuous Delivery**: Regulação exige aprovação manual, deploys controlados
- **Continuous Deployment**: Startups, SaaS, alta maturidade, feature flags

**Estratégias de deploy - Quando usar:**

- **Blue-Green**: Rollback instantâneo, zero downtime, requer 2x recursos
- **Canary**: Reduz risco, testa com % de usuários, mais complexo
- **Rolling**: Gradual, economiza recursos, rollback mais lento
- **Feature Flags**: Deploy código desligado, controle fino, adiciona complexidade

**Pipeline stages essenciais:**

1. Source (trigger)
2. Build (compilar)
3. Test (unit, integration, e2e)
4. Security Scan (vulnerabilidades)
5. Deploy (staging/prod)
6. Smoke Tests (validação básica)
7. Monitor (observar)

**Pirâmide de testes (muito importante!):**

```
     E2E (10%)     ← Poucos, lentos, caros
   Integration (20%) ← Médio
   Unit Tests (70%)  ← Muitos, rápidos
```

**Métricas DORA (DevOps Research):**

- **Deployment Frequency**: Elite = múltiplos deploys/dia
- **Lead Time**: Elite = < 1 hora (commit → produção)
- **MTTR**: Elite = < 1 hora (tempo para recuperar)
- **Change Failure Rate**: Elite = 0-15%

**Erros comuns:**

- ❌ Build quebrado ignorado (corrige IMEDIATAMENTE!)
- ❌ Testes flaky (instáveis)
- ❌ Pipeline muito lento (> 10min para feedback)
- ❌ Falta de rollback automático
- ❌ Secrets no código (use secrets manager)
- ❌ Ambientes diferentes (dev ≠ staging ≠ prod)

**Boas práticas essenciais:**

- ✅ Commits pequenos e frequentes
- ✅ Build < 10 minutos
- ✅ Testes confiáveis (sem flaky tests)
- ✅ Rollback automático se falhar
- ✅ Immutable artifacts (build 1x, deploy várias)
- ✅ Environment parity (dev = staging = prod)
- ✅ Secrets em vault/manager

**Ferramentas - Quando usar:**

- **GitHub Actions**: Já usa GitHub, projetos pequenos/médios
- **GitLab CI/CD**: GitLab, integração total
- **Jenkins**: Flexibilidade máxima, on-premise
- **AWS CodePipeline**: Full AWS, integração nativa
- **CircleCI**: SaaS, rápido, open-source friendly

**Red flags em entrevistas:**

- Não saber diferença entre Delivery e Deployment
- Não entender estratégias de deploy (blue-green, canary)
- Não conhecer métricas DORA
- Achar que CI/CD é só ferramenta
- Não saber o que é rollback

**Dicas para certificações:**

- AWS: CodePipeline + CodeBuild + CodeDeploy
- Azure: Azure DevOps Pipelines
- Google Cloud: Cloud Build
- Kubernetes: GitOps com ArgoCD/Flux

## Recursos

- [GitHub Actions Docs](https://docs.github.com/actions)
- [GitLab CI/CD Docs](https://docs.gitlab.com/ee/ci/)
- [Jenkins User Handbook](https://www.jenkins.io/doc/book/)
- [The Phoenix Project (livro)](https://itrevolution.com/the-phoenix-project/)

## Próximos Passos

1. Configure CI básico (build + tests)
2. Adicione deploy automático para staging
3. Implemente estratégias de deploy (blue-green, canary)
4. Integre com [Docker](../docker/docker-intro.md) e [Kubernetes](../kubernetes/k8s-intro.md)
5. Evolua para GitOps

**Lembre-se**: Comece simples e evolua gradualmente!
