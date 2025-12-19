---
id: docker-intro
title: Docker
sidebar_label: Docker
---

## O que é Docker?

Plataforma para desenvolver, enviar e executar aplicações em containers. Containers empacotam código e dependências juntos, garantindo que a aplicação rode da mesma forma em qualquer ambiente.

**Analogia**: Container é como um contêiner de navio - padronizado, isolado e portável. Não importa o que tem dentro, sempre é transportado da mesma forma.

## Conceitos Fundamentais

### Container

Instância em execução de uma imagem.

- Isolado do host
- Leve e rápido
- Efêmero (descartável)

### Image (Imagem)

Template read-only para criar containers.

- Camadas imutáveis
- Compartilhamento de camadas
- Versionada (tags)

### Dockerfile

Arquivo de instruções para construir imagem.

### Registry

Repositório de imagens.

- **Docker Hub**: Público
- **Private registries**: AWS ECR, GCR, Harbor

## Quando usar?

✅ **Use quando**:

- Garantir consistência entre ambientes
- Microservices architecture
- CI/CD pipelines
- Desenvolvimento local que espelha produção
- Isolamento de dependências

❌ **Menos ideal para**:

- GUI applications (possível mas complexo)
- Alta performance I/O (overhead mínimo mas existe)
- Aplicações que precisam de acesso direto a hardware

## Vantagens

📦 **Portabilidade**: "Funciona na minha máquina" = funciona em produção  
⚡ **Leveza**: Mais leve que VMs  
🚀 **Startup rápido**: Segundos vs minutos  
🔄 **Isolamento**: Dependências não conflitam  
📈 **Escalabilidade**: Fácil replicar containers  
♻️ **Reprodutibilidade**: Ambiente sempre igual

## Container vs VM

| Aspecto       | Container         | VM               |
| ------------- | ----------------- | ---------------- |
| Startup       | Segundos          | Minutos          |
| Tamanho       | MB                | GB               |
| Performance   | Próximo do nativo | Overhead maior   |
| Isolamento    | Processo          | Sistema completo |
| Portabilidade | Alta              | Média            |

## Comandos Essenciais

```bash
# Executar container
docker run nginx

# Listar containers rodando
docker ps

# Parar container
docker stop <container-id>

# Remover container
docker rm <container-id>

# Listar imagens
docker images

# Remover imagem
docker rmi <image-name>

# Build imagem
docker build -t myapp:1.0 .

# Ver logs
docker logs <container-id>

# Entrar no container
docker exec -it <container-id> /bin/bash
```

## Exemplo: Dockerfile

```dockerfile
# Imagem base
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código
COPY . .

# Expor porta
EXPOSE 3000

# Comando de start
CMD ["npm", "start"]
```

## Docker Compose

Ferramenta para definir e rodar aplicações multi-container.

```yaml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

```bash
# Subir todos os serviços
docker-compose up

# Subir em background
docker-compose up -d

# Parar todos
docker-compose down
```

## Networking

### Bridge (padrão)

Containers na mesma rede bridge se comunicam.

### Host

Container usa rede do host diretamente.

### None

Sem rede.

```bash
# Criar rede
docker network create mynetwork

# Rodar container na rede
docker run --network mynetwork nginx
```

## Volumes

Persistência de dados.

```bash
# Volume nomeado
docker volume create mydata
docker run -v mydata:/app/data myapp

# Bind mount (mapear pasta local)
docker run -v /local/path:/container/path myapp
```

## Boas Práticas

✅ **Imagens leves**: Use alpine quando possível  
✅ **Multi-stage builds**: Separe build e runtime  
✅ **Único processo**: Container = um serviço  
✅ **.dockerignore**: Ignore arquivos desnecessários  
✅ **Não rode como root**: Use USER no Dockerfile  
✅ **Tags específicas**: Evite `latest` em produção  
✅ **Health checks**: Monitore saúde do container

## Multi-Stage Build

```dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["node", "dist/index.js"]
```

## Troubleshooting

```bash
# Ver logs em tempo real
docker logs -f <container-id>

# Inspecionar container
docker inspect <container-id>

# Ver processos no container
docker top <container-id>

# Estatísticas de uso
docker stats

# Ver eventos
docker events
```

## Security

🔒 **Scan de vulnerabilidades**:

```bash
docker scan myimage:latest
```

🔒 **Não exponha portas desnecessárias**  
🔒 **Use secrets para dados sensíveis**  
🔒 **Mantenha imagens atualizadas**  
🔒 **Limite recursos (CPU, memória)**

## Ecossistema

- **Docker Swarm**: Orquestração nativa Docker
- **Kubernetes**: Orquestração enterprise (veja [K8s](../kubernetes/k8s-intro.md))
- **Registry**: Harbor, Nexus, AWS ECR
- **Monitoring**: Prometheus + cAdvisor

## Anti-Patterns

❌ **Dados no container**: Use volumes  
❌ **Imagens gigantes**: Otimize camadas  
❌ **Tudo em um container**: Separe serviços  
❌ **Senhas hardcoded**: Use secrets/env vars  
❌ **Running como root**: Vulnerabilidade

## Casos de Uso

- **Dev environment**: Consistência entre devs
- **CI/CD**: Build e test em containers
- **Microservices**: Um container por serviço
- **Teste de integrações**: Banco em container

## Analogia

**Container** é como um contêiner de navio padronizado:

- Não importa o que tem dentro (roupas, eletrônicos, móveis), o contêiner é sempre do mesmo tamanho
- Pode ser transportado por navio, trem ou caminhão sem reempacotar
- Isola o conteúdo (não mistura cargas diferentes)
- Empilhável (containers em um servidor)

**Dockerfile** é como a receita de bolo:

- Lista ingredientes (FROM, RUN, COPY)
- Passo a passo de preparação
- Sempre produz o mesmo resultado se seguir a receita

**Docker Image** é o bolo pronto congelado (template):

- Você pode fazer várias fatias dele (criar múltiplos containers)
- Não muda quando você come uma fatia (imutável)
- Pode guardar no freezer (registry) e compartilhar

**Docker vs VM** é como:

- **VM** = Cada hóspede tem apartamento completo com cozinha própria (sistema operacional inteiro)
- **Container** = Hóspedes compartilham cozinha comum (compartilham kernel do host), mas cada um tem quarto privado (isolamento)

## Pontos de Atenção

💡 **Em provas e entrevistas:**

**Diferenças fundamentais:**

- **Container vs VM**: Container compartilha kernel do host, VM tem SO completo
- **Image vs Container**: Image é template (classe), Container é instância (objeto)
- **Dockerfile vs docker-compose**: Dockerfile constrói 1 imagem, docker-compose orquestra múltiplos containers

**Pegadinhas comuns:**

- ❌ "Container é uma VM leve" - FALSO! Arquitetura completamente diferente
- ❌ "Docker e Kubernetes fazem a mesma coisa" - FALSO! Docker cria containers, K8s orquestra
- ❌ "Containers são totalmente isolados" - FALSO! Compartilham kernel (menos isolamento que VM)
- ❌ "Dados em container são permanentes" - FALSO! Container é efêmero, use volumes

**Comandos essenciais (muito cobrados!):**

```bash
docker run         # Cria E inicia container
docker start       # Inicia container existente
docker stop        # Para container (graceful)
docker kill        # Mata container (force)
docker rm          # Remove container
docker rmi         # Remove image
docker ps          # Lista containers rodando
docker ps -a       # Lista TODOS containers
docker images      # Lista imagens
docker logs        # Ver logs
docker exec -it    # Entrar no container
```

**Dockerfile - Boas práticas:**

- ✅ Use imagens base oficiais e específicas (node:18-alpine)
- ✅ Multi-stage builds para imagens menores
- ✅ .dockerignore para não copiar node_modules, .git
- ✅ COPY apenas o necessário
- ✅ Minimize camadas (agrupe comandos RUN)
- ❌ Não use :latest em produção (sem versionamento)
- ❌ Não rode como root (use USER)

**Volumes - Persistência:**

- **Named volumes**: `docker volume create mydata` - Gerenciado pelo Docker
- **Bind mounts**: `-v /local/path:/container/path` - Mapeia pasta local
- **tmpfs**: Memória, não persiste

**Networking - Tipos:**

- **Bridge** (padrão): Containers na mesma rede se comunicam
- **Host**: Container usa rede do host diretamente
- **None**: Sem rede
- **Custom**: `docker network create mynet`

**docker-compose - Essencial:**

```yaml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on: # ← Ordem de inicialização
      - db
  db:
    image: postgres:15
    volumes: # ← Persistência
      - db-data:/var/lib/postgresql/data
volumes:
  db-data: # ← Volume nomeado
```

**Quando usar Docker:**

- ✅ Garantir "funciona na minha máquina = funciona em prod"
- ✅ Microservices
- ✅ CI/CD (build once, deploy everywhere)
- ✅ Desenvolvimento local igual a produção
- ❌ GUI applications (possível mas complexo)
- ❌ Quando precisa performance máxima de I/O

**Segurança - Pontos críticos:**

- ✅ Não rode containers como root
- ✅ Scan de vulnerabilidades (docker scan)
- ✅ Use imagens oficiais verificadas
- ✅ Não coloque secrets em imagens
- ✅ Minimize imagem (menos superfície de ataque)
- ✅ Network isolation

**Erros comuns:**

- ❌ Expor porta errada (conflito)
- ❌ Esquecer volume (perde dados ao recriar container)
- ❌ Não limpar containers/imagens antigos (espaço em disco)
- ❌ Usar :latest em produção
- ❌ Copiar secrets para imagem
- ❌ Não usar .dockerignore

**Otimização de build:**

- Ordene comandos do menos para mais mutável (cache de camadas)
- Use multi-stage builds
- Minimize camadas
- Use .dockerignore

**Red flags em entrevistas:**

- Não saber diferença entre container e VM
- Não saber diferença entre image e container
- Não entender volumes
- Confundir Docker com Kubernetes
- Não saber comandos básicos (run, build, ps)

**Dicas para certificações:**

- Docker Certified Associate (DCA): Foca em swarm, security, networking
- AWS: ECS (Elastic Container Service), ECR (registry), Fargate (serverless)
- Kubernetes: CKA, CKAD - Docker é base

## Recursos

- [Docker Official Docs](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Play with Docker](https://labs.play-with-docker.com/)
- [Docker Deep Dive (livro)](https://www.amazon.com/Docker-Deep-Dive-Nigel-Poulton/dp/1521822808)

## Próximos Passos

- Pratique com Docker Compose para multi-container
- Aprenda [Kubernetes](../kubernetes/k8s-intro.md) para orquestração
- Integre em [CI/CD](../ci-cd/cicd-intro.md)
