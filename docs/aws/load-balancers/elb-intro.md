---
id: elb-intro
title: Elastic Load Balancing (ELB)
sidebar_label: Visão Geral
---

## O que é Elastic Load Balancing?

**Elastic Load Balancing (ELB)** é o serviço gerenciado da AWS que distribui automaticamente o tráfego de entrada de aplicações entre múltiplos destinos, como instâncias EC2, containers, endereços IP e funções Lambda.

## Por que usar Load Balancers?

### Benefícios Principais

✅ **Alta Disponibilidade** - Distribui tráfego entre múltiplas Availability Zones  
✅ **Escalabilidade** - Ajusta automaticamente a capacidade conforme demanda  
✅ **Health Checks** - Detecta e roteia tráfego apenas para recursos saudáveis  
✅ **Segurança** - Integração com SSL/TLS, Security Groups e WAF  
✅ **Gerenciado** - AWS cuida da manutenção e atualizações

### Problemas que Resolve

| Problema                              | Solução com ELB                               |
| ------------------------------------- | --------------------------------------------- |
| Servidor único sobrecarregado         | Distribui carga entre múltiplos servidores    |
| Servidor cai e aplicação fica offline | Redireciona tráfego para servidores saudáveis |
| Tráfego varia muito (picos e vales)   | Escala automaticamente conforme demanda       |
| SSL/TLS em cada servidor              | Termina SSL/TLS no load balancer              |
| Difícil adicionar/remover servidores  | Auto Scaling integration                      |

## Tipos de Load Balancers na AWS

A AWS oferece **4 tipos** de load balancers, cada um otimizado para casos de uso específicos:

### Comparação Rápida

| Tipo           | Camada OSI      | Protocolo       | Quando Usar                                     |
| -------------- | --------------- | --------------- | ----------------------------------------------- |
| **[ALB](alb)** | 7 (Application) | HTTP/HTTPS/gRPC | Aplicações web, APIs REST, microservices        |
| **[NLB](nlb)** | 4 (Transport)   | TCP/UDP/TLS     | Performance crítica, IP estático, gaming        |
| **[GLB](glb)** | 3 (Network)     | GENEVE          | Appliances de segurança (firewalls, IDS/IPS)    |
| **CLB**        | 4 e 7           | HTTP/HTTPS/TCP  | ⚠️ Legado (não recomendado para novos projetos) |

> 💡 **Recomendação**: Para novos projetos, escolha entre ALB, NLB ou GLB. O CLB (Classic Load Balancer) está em modo de manutenção.

## Como Funciona?

### Arquitetura Básica

```
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │  Load Balancer  │ ← Endpoint único (DNS)
              │   (Multi-AZ)    │
              └─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌────────┐    ┌────────┐    ┌────────┐
   │Server 1│    │Server 2│    │Server 3│
   │  AZ-a  │    │  AZ-b  │    │  AZ-c  │
   └────────┘    └────────┘    └────────┘
```

### Fluxo de Tráfego

1. **Cliente acessa** o DNS do load balancer (ex: `my-app-lb-123456.us-east-1.elb.amazonaws.com`)
2. **ELB recebe** a requisição em múltiplas Availability Zones
3. **Health Check** verifica quais targets estão saudáveis
4. **Algoritmo de distribuição** escolhe o target ideal
5. **Encaminha** a requisição para o target selecionado
6. **Target processa** e retorna resposta
7. **ELB retorna** resposta ao cliente

## Componentes Principais

### 1. Load Balancer

O próprio balanceador, configurado com:

- Tipo (ALB/NLB/GLB)
- Scheme (internet-facing ou internal)
- Subnets (multi-AZ)
- Security Groups (apenas ALB)

### 2. Listeners

Definem como o load balancer escuta requisições:

- **Protocolo e porta** (HTTP:80, HTTPS:443, TCP:3306)
- **Regras de roteamento** (ALB)
- **Ações padrão** (forward, redirect, fixed-response)

### 3. Target Groups

Conjunto de recursos que recebem tráfego:

- **Targets**: EC2, IP, Lambda, ALB
- **Health checks**: Verificação de saúde
- **Port**: Porta de destino
- **Protocol**: Protocolo de comunicação

### 4. Health Checks

Monitoramento de saúde dos targets:

```
Health Check Settings:
├── Protocol: HTTP/HTTPS/TCP
├── Path: /health (para HTTP/HTTPS)
├── Interval: 30 segundos
├── Timeout: 5 segundos
├── Healthy threshold: 3 sucessos consecutivos
└── Unhealthy threshold: 2 falhas consecutivas
```

## Escolhendo o Load Balancer Certo

### Decision Tree

```
Precisa de appliance de segurança (firewall/IDS)?
│
├─ Sim → GLB (Gateway Load Balancer)
│
└─ Não → É aplicação HTTP/HTTPS?
         │
         ├─ Sim → ALB (Application Load Balancer)
         │        ✓ Roteamento por path/host
         │        ✓ WebSockets
         │        ✓ HTTP/2 e gRPC
         │
         └─ Não → É TCP/UDP com performance crítica?
                  │
                  ├─ Sim → NLB (Network Load Balancer)
                  │        ✓ Latência ultra-baixa
                  │        ✓ IP estático
                  │        ✓ Milhões de req/s
                  │
                  └─ Não → Revise os requisitos
```

### Casos de Uso por Tipo

**ALB - Application Load Balancer**

- ✅ Sites e aplicações web
- ✅ APIs RESTful
- ✅ Microservices com roteamento complexo
- ✅ Aplicações containerizadas (ECS/EKS)

**NLB - Network Load Balancer**

- ✅ Gaming servers (UDP)
- ✅ Aplicações de IoT
- ✅ Streaming de vídeo/áudio
- ✅ Conexões de banco de dados

**GLB - Gateway Load Balancer**

- ✅ Firewalls centralizados
- ✅ IDS/IPS (Intrusion Detection/Prevention)
- ✅ DPI (Deep Packet Inspection)
- ✅ Appliances de rede de terceiros

## Conceitos Importantes

### Cross-Zone Load Balancing

Distribui tráfego uniformemente entre todas as AZs:

```
SEM Cross-Zone:                 COM Cross-Zone:

AZ-1: 50% │ 2 targets           AZ-1: 33% │ 2 targets
          │ 25% cada                      │ 16.5% cada

AZ-2: 50% │ 4 targets           AZ-2: 33% │ 4 targets
          │ 12.5% cada                    │ 8.25% cada

AZ-3: 0%  │ 0 targets           AZ-3: 33% │ 0 targets
          │ N/A                           │ N/A (redistribui)
```

### Sticky Sessions (Session Affinity)

Garante que cliente sempre vá para o mesmo target:

- **ALB**: Cookie-based (AWSALB)
- **NLB**: Source IP-based
- **Duração**: 1 segundo a 7 dias

### Connection Draining / Deregistration Delay

Tempo para completar requisições em andamento antes de remover target:

- Padrão: 300 segundos
- Range: 0-3600 segundos
- Evita perda de conexões durante deploys

## Integração com Outros Serviços

### Auto Scaling

```
ELB ──── registra/remove ───▶ Auto Scaling Group
                              │
                              ├─ EC2 Instance 1
                              ├─ EC2 Instance 2
                              └─ EC2 Instance 3
```

### ACM (AWS Certificate Manager)

- Certificados SSL/TLS gerenciados
- Renovação automática
- Gratuito para uso com ELB

### WAF (Web Application Firewall)

- Proteção contra ataques web (SQL injection, XSS)
- Regras customizáveis
- Disponível apenas para ALB

### CloudWatch

- Métricas de performance
- Logs de acesso
- Alarmes customizados

## Monitoramento e Métricas

### Métricas CloudWatch Principais

**ALB:**

- `TargetResponseTime`: Tempo de resposta dos targets
- `RequestCount`: Número de requisições
- `HTTPCode_Target_2XX_Count`: Respostas bem-sucedidas
- `UnHealthyHostCount`: Targets com problemas

**NLB:**

- `ActiveFlowCount`: Conexões TCP ativas
- `ProcessedBytes`: Dados processados
- `HealthyHostCount`: Targets saudáveis
- `TCP_Target_Reset_Count`: Conexões resetadas

### Access Logs

Habilite para auditoria e análise:

```bash
# Exemplo de log ALB
http 2025-12-18T10:30:00.123456Z app/my-lb/xxx
192.0.2.1:12345 10.0.1.5:80 0.001 0.002 0.000
200 200 154 345 "GET https://example.com:443/ HTTP/1.1"
"Mozilla/5.0..." ECDHE-RSA-AES128-GCM-SHA256
```

## Boas Práticas

✅ **Use Multi-AZ** - Deploy em pelo menos 2 AZs para alta disponibilidade  
✅ **Configure health checks apropriados** - Path específico, não apenas "/"  
✅ **Habilite access logs** - Para troubleshooting e auditoria  
✅ **Use HTTPS** - Sempre que possível, com certificados do ACM  
✅ **Monitore métricas** - Configure alarmes no CloudWatch  
✅ **Connection draining** - Configure tempo adequado para deploys  
✅ **Tags organizadas** - Facilita billing e gestão

❌ **Evite CLB** - Use ALB ou NLB para novos projetos  
❌ **Não exponha targets diretamente** - Sempre via load balancer  
❌ **Não ignore unhealthy targets** - Investigue e corrija

## Custos

### Modelo de Precificação

Todos os ELBs cobram por:

1. **Hora de execução** (~$0.0225/hora para ALB)
2. **Unidades de capacidade** (LCU para ALB/NLB, GLCU para GLB)

**Exemplo mensal (ALB):**

```
Execução: 730 horas × $0.0225 = $16.43
LCU: variável conforme uso = $10-50
Total estimado: $25-70/mês
```

### Otimização de Custos

- Use Reserved Capacity para workloads previsíveis
- Consolide múltiplos listeners em um load balancer
- Delete load balancers não utilizados
- Use internal load balancers quando não precisa de acesso público

## Próximos Passos

Explore cada tipo de load balancer em detalhes:

- **[Application Load Balancer (ALB)](alb)** - Para aplicações HTTP/HTTPS
- **[Network Load Balancer (NLB)](nlb)** - Para performance extrema TCP/UDP
- **[Gateway Load Balancer (GLB)](glb)** - Para appliances de segurança

## Referências

- [Documentação ELB](https://docs.aws.amazon.com/elasticloadbalancing/)
- [Comparação de Load Balancers](https://aws.amazon.com/elasticloadbalancing/features/)
- [Best Practices](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/best-practices.html)
- [Pricing](https://aws.amazon.com/elasticloadbalancing/pricing/)
