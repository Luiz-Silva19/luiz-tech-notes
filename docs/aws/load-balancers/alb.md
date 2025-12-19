---
id: aws-alb
title: Application Load Balancer - ALB
sidebar_label: ALB
---

## O que é Application Load Balancer (ALB)?

O **Application Load Balancer (ALB)** é um balanceador de carga de **Camada 7 (HTTP/HTTPS)** da AWS que distribui tráfego de aplicações web entre múltiplos destinos com base em conteúdo da requisição.

**Analogia**: Como um recepcionista inteligente de prédio comercial - lê o crachá (headers), pergunta o destino (path /vendas, /suporte), verifica quem está disponível (health checks) e direciona ao elevador certo. Entende o **conteúdo** da solicitação, não apenas distribui aleatoriamente.

## Para que serve

### Casos de Uso Práticos

✅ **Aplicações Web**: Sites, portais, e-commerce  
✅ **APIs REST/GraphQL**: Roteamento inteligente de APIs  
✅ **Microservices**: Roteamento baseado em path/host  
✅ **Containers**: ECS, EKS, Fargate  
✅ **Aplicações modernas**: WebSockets, HTTP/2, gRPC  
✅ **Multi-tenant apps**: Roteamento por subdomínio

### Problemas que Resolve

| Problema                                              | Solução com ALB        |
| ----------------------------------------------------- | ---------------------- |
| Rotear /api/_ para um serviço e /admin/_ para outro   | Path-based routing     |
| Servir app.example.com e api.example.com no mesmo ALB | Host-based routing     |
| Direcionar usuários autenticados vs não autenticados  | Rules com condições    |
| Implementar blue-green deployment                     | Weighted target groups |
| Terminação SSL centralizada                           | HTTPS listeners no ALB |

## Como funciona

### Arquitetura Básica

```
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │   ALB (Layer 7) │
              │  HTTPS Listener │
              └─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   /api/*          /admin/*       / (default)
        │              │              │
   ┌────────┐    ┌────────┐    ┌────────┐
   │ API    │    │ Admin  │    │ Web    │
   │ Service│    │ Panel  │    │ Frontend│
   └────────┘    └────────┘    └────────┘
```

### Componentes Principais

#### 1. Listeners

Definem protocolo e porta que o ALB escuta:

```
Listener: HTTPS:443
├── Certificate: *.example.com (ACM)
└── Default Action: Forward to target-group-web
```

#### 2. Rules (Regras de Roteamento)

Condições que determinam para onde direcionar tráfego:

**Path-based Routing:**

```
IF path = /api/*      THEN forward to api-target-group
IF path = /admin/*    THEN forward to admin-target-group
IF path = /images/*   THEN forward to cdn-target-group
```

**Host-based Routing:**

```
IF host = api.example.com    THEN forward to api-tg
IF host = admin.example.com  THEN forward to admin-tg
```

**Header-based Routing:**

```
IF header "X-User-Type" = "premium"  THEN forward to premium-tg
```

**Query String Routing:**

```
IF query string "version=v2"  THEN forward to v2-target-group
```

#### 3. Target Groups

Conjunto de destinos que recebem tráfego:

- **Target Types**: EC2 instances, IP addresses, Lambda functions, outro ALB
- **Health Checks**: Verifica saúde dos targets
- **Stickiness**: Sessão persistente (cookie-based)

### Fluxo de Requisição

```
1. Cliente → HTTPS request → ALB
2. ALB → Termina SSL/TLS
3. ALB → Avalia regras de roteamento (path, host, headers)
4. ALB → Seleciona target group apropriado
5. ALB → Escolhe target saudável (round-robin ou least connections)
6. ALB → Encaminha requisição HTTP para target
7. Target → Processa e responde
8. ALB → Retorna resposta ao cliente (re-encripta se HTTPS)
```

## Exemplo Prático

### Cenário: E-commerce com ALB

#### Configuração via AWS CLI

```bash
# 1. Criar ALB
aws elbv2 create-load-balancer \
  --name my-ecommerce-alb \
  --subnets subnet-12345 subnet-67890 \
  --security-groups sg-web \
  --scheme internet-facing \
  --type application \
  --ip-address-type ipv4

# 2. Criar Target Groups
# Target Group: Frontend Web
aws elbv2 create-target-group \
  --name frontend-tg \
  --protocol HTTP \
  --port 3000 \
  --vpc-id vpc-12345 \
  --health-check-path /health \
  --health-check-interval-seconds 30

# Target Group: API Backend
aws elbv2 create-target-group \
  --name api-tg \
  --protocol HTTP \
  --port 8080 \
  --vpc-id vpc-12345 \
  --health-check-path /api/health

# Target Group: Admin Panel
aws elbv2 create-target-group \
  --name admin-tg \
  --protocol HTTP \
  --port 8081 \
  --vpc-id vpc-12345 \
  --health-check-path /admin/health

# 3. Criar HTTPS Listener
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:... \
  --protocol HTTPS \
  --port 443 \
  --certificates CertificateArn=arn:aws:acm:... \
  --default-actions Type=forward,TargetGroupArn=arn:aws:...frontend-tg

# 4. Adicionar Regras de Roteamento
# Regra: /api/* → API Backend
aws elbv2 create-rule \
  --listener-arn arn:aws:elasticloadbalancing:... \
  --priority 10 \
  --conditions Field=path-pattern,Values='/api/*' \
  --actions Type=forward,TargetGroupArn=arn:aws:...api-tg

# Regra: /admin/* → Admin Panel
aws elbv2 create-rule \
  --listener-arn arn:aws:elasticloadbalancing:... \
  --priority 20 \
  --conditions Field=path-pattern,Values='/admin/*' \
  --actions Type=forward,TargetGroupArn=arn:aws:...admin-tg

# Regra: Host-based (api.example.com)
aws elbv2 create-rule \
  --listener-arn arn:aws:elasticloadbalancing:... \
  --priority 5 \
  --conditions Field=host-header,Values='api.example.com' \
  --actions Type=forward,TargetGroupArn=arn:aws:...api-tg
```

#### Terraform Configuration

```hcl
# ALB
resource "aws_lb" "ecommerce" {
  name               = "ecommerce-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = true
  enable_http2              = true
  enable_cross_zone_load_balancing = true

  tags = {
    Environment = "production"
  }
}

# Target Group - Frontend
resource "aws_lb_target_group" "frontend" {
  name     = "frontend-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    enabled             = true
    path                = "/health"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 86400  # 1 dia
    enabled         = true
  }
}

# HTTPS Listener
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.ecommerce.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate.main.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}

# Regra: /api/* → API
resource "aws_lb_listener_rule" "api" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 10

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
}

# Regra: Header-based routing
resource "aws_lb_listener_rule" "mobile_app" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 15

  condition {
    http_header {
      http_header_name = "User-Agent"
      values           = ["MobileApp/*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.mobile_backend.arn
  }
}
```

### Exemplo de Roteamento Avançado

#### Blue-Green Deployment

```hcl
# Weighted Target Groups para canary deployment
resource "aws_lb_listener_rule" "canary" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 5

  condition {
    path_pattern {
      values = ["/api/v2/*"]
    }
  }

  action {
    type = "forward"

    forward {
      target_group {
        arn    = aws_lb_target_group.api_v2.arn
        weight = 10  # 10% do tráfego
      }

      target_group {
        arn    = aws_lb_target_group.api_v1.arn
        weight = 90  # 90% do tráfego
      }

      stickiness {
        enabled  = true
        duration = 3600
      }
    }
  }
}
```

## Pontos de Atenção

### 💡 Dicas para Certificação AWS

**Palavras-chave em provas que indicam ALB:**

- ✅ "HTTP/HTTPS"
- ✅ "Roteamento baseado em path ou host"
- ✅ "Layer 7"
- ✅ "Microservices"
- ✅ "Container-based applications"
- ✅ "WebSockets"
- ✅ "gRPC"
- ✅ "Autenticação via Cognito/OIDC"

**Quando NÃO usar ALB (use NLB):**

- ❌ "Latência extremamente baixa"
- ❌ "IP estático"
- ❌ "Milhões de requisições por segundo"
- ❌ "TCP/UDP (não HTTP)"
- ❌ "Layer 4"

### ⚠️ Pegadinhas Comuns

#### 1. ALB vs NLB - Diferenças Críticas

| Característica          | ALB                    | NLB                 |
| ----------------------- | ---------------------- | ------------------- |
| **Camada OSI**          | 7 (Application)        | 4 (Transport)       |
| **Protocolo**           | HTTP, HTTPS, gRPC      | TCP, UDP, TLS       |
| **IP Estático**         | ❌ Não (apenas DNS)    | ✅ Sim (Elastic IP) |
| **Roteamento avançado** | ✅ Path, host, headers | ❌ Não              |
| **Latência**            | Mais alta (~ms)        | Ultra-baixa (~µs)   |
| **WebSockets**          | ✅ Sim                 | ✅ Sim              |
| **Preço**               | Mais caro              | Mais barato         |
| **WAF**                 | ✅ Suporta             | ❌ Não              |

**Em prova:**

```
Pergunta: "Aplicação precisa rotear /api para backend e /web para frontend"
Resposta: ALB (roteamento baseado em path)

Pergunta: "Gaming server precisa de IP fixo e latência ultra-baixa"
Resposta: NLB (IP estático + performance)
```

#### 2. Path-based vs Host-based Routing

❌ **Erro comum**: Confundir os dois

**Path-based** (mesmo host, paths diferentes):

```
https://example.com/api     → API target group
https://example.com/admin   → Admin target group
```

**Host-based** (hosts diferentes, mesmo ALB):

```
https://api.example.com     → API target group
https://admin.example.com   → Admin target group
```

#### 3. Sticky Sessions (Session Affinity)

**Como funciona:**

- ALB usa cookie `AWSALB` ou `AWSALBAPP`
- Garante que cliente sempre vai para o mesmo target
- Duração: 1 segundo a 7 dias

**Quando usar:**

- ✅ Aplicação stateful (sessão em memória)
- ✅ Upload de arquivos grandes
- ✅ WebSockets

**Quando NÃO usar:**

- ❌ Aplicação stateless (melhor distribuição)
- ❌ Sessão em cache externo (Redis/DynamoDB)

#### 4. Health Checks

**Configuração importante para prova:**

```
Health Check:
├── Protocol: HTTP/HTTPS
├── Path: /health ou /api/health
├── Interval: 30s (padrão)
├── Timeout: 5s
├── Healthy threshold: 2 sucessos consecutivos
├── Unhealthy threshold: 2 falhas consecutivas
└── Success codes: 200, 200-299, 200,302
```

**Pegadinha:**

- Target é marcado como **unhealthy** → ALB para de enviar tráfego
- Demora 2 × interval para marcar como unhealthy (2 × 30s = 60s)

#### 5. SSL/TLS Termination

**ALB pode:**

- ✅ Terminar SSL no ALB (mais comum)
- ✅ End-to-end encryption (HTTPS → ALB → HTTPS backend)
- ✅ Múltiplos certificados (SNI - Server Name Indication)

**Em prova:**

```
Pergunta: "Reduzir carga de SSL nos servidores"
Resposta: Terminar SSL no ALB

Pergunta: "Compliance exige criptografia end-to-end"
Resposta: HTTPS listener + HTTPS target group
```

#### 6. Pricing - Como é cobrado

```
ALB Pricing (us-east-1):
├── $0.0225/hora (ALB running)
└── $0.008/LCU-hora (Load Balancer Capacity Unit)

LCU = MAX de:
├── 25 novas conexões/segundo
├── 3.000 conexões ativas/minuto
├── 1 GB/hora de tráfego (EC2/IP/containers)
└── 1.000 rule evaluations/segundo
```

**Dica de custo:**

- Mais regras = mais LCUs = mais caro
- Otimize regras (combine quando possível)

#### 7. Integração com Outros Serviços AWS

**ALB integra nativamente com:**

✅ **AWS WAF** - Web Application Firewall  
✅ **AWS Shield** - DDoS protection  
✅ **AWS Cognito** - Autenticação de usuários  
✅ **Amazon ECS/EKS** - Service discovery automático  
✅ **AWS Lambda** - ALB pode invocar Lambda diretamente  
✅ **AWS Certificate Manager (ACM)** - SSL/TLS gratuito  
✅ **AWS CloudWatch** - Métricas e alarmes  
✅ **AWS X-Ray** - Tracing distribuído

**Em prova:**

```
Pergunta: "Implementar autenticação sem código no backend"
Resposta: ALB + Cognito User Pool integration

Pergunta: "Proteger contra SQL injection e XSS"
Resposta: ALB + AWS WAF
```

#### 8. Cross-Zone Load Balancing

**Importante para prova:**

- ALB: Cross-zone **SEMPRE ATIVO** (não pode desativar)
- NLB: Cross-zone **OPCIONAL** (pode ativar/desativar)

```
COM Cross-Zone (ALB padrão):
AZ-1 (2 targets): Recebe 33% do tráfego cada = 16.5% × 2
AZ-2 (4 targets): Recebe 33% do tráfego cada = 8.25% × 4
→ Distribuição uniforme entre TODOS os targets

SEM Cross-Zone:
AZ-1 (2 targets): Recebe 50% do tráfego = 25% cada
AZ-2 (4 targets): Recebe 50% do tráfego = 12.5% cada
→ Distribuição por AZ, depois por target
```

### 🎯 Casos de Uso Específicos para Prova

| Cenário                            | Solução                      |
| ---------------------------------- | ---------------------------- |
| Microservices com paths diferentes | ALB + Path-based routing     |
| Multi-tenant (subdomínios)         | ALB + Host-based routing     |
| A/B Testing                        | ALB + Weighted target groups |
| Blue-Green Deployment              | ALB + Trocar target groups   |
| Autenticar usuários                | ALB + Cognito integration    |
| Proteger contra ataques            | ALB + WAF                    |
| WebSockets                         | ALB (HTTP/1.1 Upgrade)       |
| gRPC                               | ALB (HTTP/2 support)         |
| Lambda sem API Gateway             | ALB → Lambda target          |
| IP fixo necessário                 | ❌ Use NLB instead           |

### 🔒 Segurança - Pontos para Prova

**Security Groups:**

```
ALB Security Group:
├── Inbound: 443 (HTTPS) from 0.0.0.0/0
├── Inbound: 80 (HTTP) from 0.0.0.0/0 (redirect to 443)
└── Outbound: Target port (8080) to target SG

Target Security Group:
├── Inbound: 8080 from ALB Security Group ONLY
└── Sem acesso direto da internet
```

**Boas práticas:**

- ✅ HTTP → HTTPS redirect
- ✅ Security Group em vez de CIDR
- ✅ Least privilege
- ✅ ACM para certificados (renovação automática)

---

**Recursos Externos:**

- <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/" target="_blank" rel="noopener noreferrer">AWS ALB Documentation</a>
- <a href="https://aws.amazon.com/elasticloadbalancing/application-load-balancer/" target="_blank" rel="noopener noreferrer">ALB Features</a>
- <a href="https://aws.amazon.com/elasticloadbalancing/pricing/" target="_blank" rel="noopener noreferrer">ALB Pricing</a>
- <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html" target="_blank" rel="noopener noreferrer">ALB Troubleshooting</a>
