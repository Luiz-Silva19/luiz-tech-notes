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

## Recursos

- [Docker Docs](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Play with Docker](https://labs.play-with-docker.com/)

## Próximos Passos

- Pratique com Docker Compose para multi-container
- Aprenda [Kubernetes](../kubernetes/k8s-intro.md) para orquestração
- Integre em [CI/CD](../ci-cd/cicd-intro.md)
