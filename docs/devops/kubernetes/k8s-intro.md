---
id: k8s-intro
title: Kubernetes (K8s)
sidebar_label: Kubernetes
---

## O que é Kubernetes?

Sistema open-source para automatizar deploy, escala e gerenciamento de aplicações containerizadas. Orquestra containers em múltiplas máquinas.

**Analogia**: Se Docker é como um container de navio, Kubernetes é o porto automatizado que decide onde colocar cada container, quantos precisa, e garante que tudo funcione 24/7.

## Por que Kubernetes?

### Problemas que resolve:

- **Onde rodar** os containers?
- **Como escalar** automaticamente?
- **Como lidar com falhas**?
- **Como atualizar** sem downtime?
- **Como distribuir** tráfego entre containers?

## Conceitos Fundamentais

### Cluster

Conjunto de máquinas (nodes) rodando Kubernetes.

### Node

Máquina (física ou virtual) no cluster.

- **Master Node**: Controla o cluster
- **Worker Node**: Roda as aplicações

### Pod

Menor unidade deployável. Grupo de um ou mais containers.

- Compartilham rede e storage
- Geralmente 1 container por Pod

### Deployment

Descreve estado desejado para Pods.

- Quantas réplicas
- Qual imagem usar
- Como atualizar

### Service

Expõe Pods na rede.

- Load balancing automático
- Service discovery
- IP estável

### Namespace

Isolamento virtual dentro do cluster.

## Quando usar?

✅ **Use quando**:

- Microservices em produção
- Necessidade de auto-scaling
- High availability é crítica
- Múltiplos ambientes (dev, staging, prod)
- Orquestração complexa de containers

❌ **Evite quando**:

- Aplicação simples (Docker Compose suficiente)
- Time pequeno sem expertise
- Overhead não se justifica
- Começando com containers

## Arquitetura

```
┌─────────────────────────────────────┐
│         Master Node                 │
│  ┌──────────┬──────────┬─────────┐ │
│  │API Server│Scheduler │Controller│ │
│  └──────────┴──────────┴─────────┘ │
└─────────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌────────┐┌────────┐┌────────┐
│Worker  ││Worker  ││Worker  │
│ Node 1 ││ Node 2 ││ Node 3 │
│┌──────┐││┌──────┐││┌──────┐│
││ Pod  │││ Pod  │││ Pod  ││
│└──────┘││└──────┘││└──────┘│
└────────┘└────────┘└────────┘
```

## Componentes Principais

### Control Plane (Master)

- **API Server**: Interface do cluster
- **Scheduler**: Decide onde rodar Pods
- **Controller Manager**: Mantém estado desejado
- **etcd**: Armazena configuração do cluster

### Worker Nodes

- **Kubelet**: Agente que gerencia Pods
- **Container Runtime**: Docker, containerd
- **Kube-proxy**: Gerencia networking

## Exemplo: Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.21
          ports:
            - containerPort: 80
```

## Exemplo: Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

## Comandos Essenciais

```bash
# Ver Pods
kubectl get pods

# Ver Deployments
kubectl get deployments

# Ver Services
kubectl get services

# Aplicar configuração
kubectl apply -f deployment.yaml

# Deletar recurso
kubectl delete -f deployment.yaml

# Ver logs
kubectl logs <pod-name>

# Escalar deployment
kubectl scale deployment nginx-deployment --replicas=5

# Entrar no Pod
kubectl exec -it <pod-name> -- /bin/bash

# Ver detalhes
kubectl describe pod <pod-name>

# Ver namespaces
kubectl get namespaces

# Usar namespace específico
kubectl get pods -n production
```

## Recursos Importantes

### ConfigMap

Configurações separadas do código.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgres://db:5432"
  api_key: "abc123"
```

### Secret

Dados sensíveis (senhas, tokens).

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  password: cGFzc3dvcmQxMjM= # base64
```

### Ingress

Roteamento HTTP/HTTPS.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
spec:
  rules:
    - host: myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nginx-service
                port:
                  number: 80
```

## Auto Scaling

### Horizontal Pod Autoscaler (HPA)

Escala pods baseado em métricas.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

## Health Checks

### Liveness Probe

Verifica se container está vivo.

### Readiness Probe

Verifica se container está pronto para tráfego.

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Estratégias de Deploy

### Rolling Update (padrão)

Atualiza gradualmente.

### Recreate

Para todos, depois sobe novos.

### Blue-Green

Dois ambientes, troca de uma vez.

### Canary

Nova versão para % pequeno do tráfego.

## Gerenciamento de Recursos

```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "250m"
  limits:
    memory: "256Mi"
    cpu: "500m"
```

## Ferramentas do Ecossistema

### Helm

Gerenciador de pacotes K8s.

```bash
helm install my-app ./chart
```

### kubectl

CLI oficial.

### k9s

Interface TUI para gerenciar clusters.

### Lens

IDE para Kubernetes.

### Rancher

Gerenciamento multi-cluster.

## Distribuições Kubernetes

- **Minikube**: Local, desenvolvimento
- **Kind**: Kubernetes in Docker
- **k3s**: Leve, edge/IoT
- **EKS**: AWS managed
- **GKE**: Google managed
- **AKS**: Azure managed

## Boas Práticas

✅ **Resource limits**: Sempre defina requests/limits  
✅ **Health checks**: Liveness e readiness  
✅ **Namespaces**: Separe ambientes  
✅ **Labels**: Organize recursos  
✅ **Secrets**: Nunca hardcode senhas  
✅ **RBAC**: Controle de acesso  
✅ **Monitoring**: Prometheus + Grafana  
✅ **Logging**: Centralize logs (ELK, Loki)

## Monitoramento

```bash
# Instalar metrics-server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Ver métricas
kubectl top nodes
kubectl top pods
```

## Troubleshooting

```bash
# Ver eventos
kubectl get events

# Ver logs de todos containers do pod
kubectl logs <pod-name> --all-containers

# Describe para detalhes
kubectl describe pod <pod-name>

# Ver status do cluster
kubectl cluster-info

# Ver configuração
kubectl config view
```

## Anti-Patterns

❌ **Rodar stateful apps sem StatefulSets**  
❌ **Não definir resource limits**  
❌ **Ignorar namespaces**  
❌ **Expor tudo como LoadBalancer**  
❌ **Não versionar manifestos**  
❌ **Falta de monitoring**

## Curva de Aprendizado

1. **Básico**: Pods, Deployments, Services
2. **Intermediário**: ConfigMaps, Secrets, Ingress
3. **Avançado**: HPA, StatefulSets, Operators
4. **Expert**: Service Mesh, GitOps, Multi-cluster

## Recursos

- [Kubernetes Docs](https://kubernetes.io/docs/)
- [Play with Kubernetes](https://labs.play-with-k8s.com/)
- [Kubernetes Patterns (livro)](https://www.oreilly.com/library/view/kubernetes-patterns/9781492050278/)

## Próximos Passos

- Comece com Minikube localmente
- Aprenda Helm para gerenciar charts
- Explore [CI/CD](../ci-cd/cicd-intro.md) com K8s
- Estude Service Mesh (Istio, Linkerd)
