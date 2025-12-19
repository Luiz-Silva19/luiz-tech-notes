---
id: aws-nlb
title: Network Load Balancer - NLB
sidebar_label: NLB
---

## O que é Network Load Balancer (NLB)?

O **Network Load Balancer (NLB)** é um balanceador de carga de **Camada 4 (TCP/UDP)** da AWS que opera no nível de transporte do modelo OSI.

## Características Principais

### Performance Extrema

- **Latência ultra-baixa**: ~100 microssegundos
- **Milhões de requisições por segundo**
- **IP estático por Availability Zone**
- **Elastic IP support**

### Protocolos Suportados

- TCP (Transmission Control Protocol)
- UDP (User Datagram Protocol)
- TLS (Transport Layer Security)

## Quando Usar NLB?

| Cenário                            | Recomendação |
| ---------------------------------- | ------------ |
| **Aplicações de alta performance** | ✅ NLB       |
| **Tráfego TCP/UDP**                | ✅ NLB       |
| **IP estático obrigatório**        | ✅ NLB       |
| **Latência crítica**               | ✅ NLB       |
| **Aplicações HTTP/HTTPS**          | ❌ Use ALB   |
| **Roteamento baseado em path**     | ❌ Use ALB   |

## Arquitetura NLB

```
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │   NLB (Layer 4) │
              │  IP: 3.x.x.x    │
              └─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌────────┐    ┌────────┐    ┌────────┐
   │ EC2-1  │    │ EC2-2  │    │ EC2-3  │
   │ :8080  │    │ :8080  │    │ :8080  │
   └────────┘    └────────┘    └────────┘
     AZ-1a         AZ-1b         AZ-1c
```

## Diferenças: ALB vs NLB

| Característica          | ALB               | NLB           |
| ----------------------- | ----------------- | ------------- |
| **Camada OSI**          | 7 (Application)   | 4 (Transport) |
| **Protocolos**          | HTTP, HTTPS, gRPC | TCP, UDP, TLS |
| **Latência**            | Mais alta         | Ultra-baixa   |
| **Throughput**          | Moderado          | Muito alto    |
| **IP Estático**         | ❌ Não            | ✅ Sim        |
| **Roteamento avançado** | ✅ Sim            | ❌ Não        |
| **Preço**               | Mais caro         | Mais barato   |

## Criando um NLB via AWS CLI

```bash
# Criar Network Load Balancer
aws elbv2 create-load-balancer \
    --name my-nlb \
    --type network \
    --scheme internet-facing \
    --subnets subnet-12345 subnet-67890 \
    --tags Key=Environment,Value=Production

# Criar Target Group
aws elbv2 create-target-group \
    --name my-tcp-targets \
    --protocol TCP \
    --port 8080 \
    --vpc-id vpc-12345 \
    --health-check-protocol TCP \
    --health-check-port 8080

# Registrar targets
aws elbv2 register-targets \
    --target-group-arn arn:aws:elasticloadbalancing:... \
    --targets Id=i-1234567890abcdef0 Id=i-0987654321fedcba0

# Criar Listener
aws elbv2 create-listener \
    --load-balancer-arn arn:aws:elasticloadbalancing:... \
    --protocol TCP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn=arn:aws:...
```

## Health Checks

NLB suporta health checks em:

- **TCP**: Verifica se a porta está aberta
- **HTTP/HTTPS**: Verifica response code

```bash
# Health check TCP
aws elbv2 modify-target-group \
    --target-group-arn arn:aws:... \
    --health-check-protocol TCP \
    --health-check-port 8080 \
    --health-check-interval-seconds 30 \
    --healthy-threshold-count 3 \
    --unhealthy-threshold-count 3
```

## Casos de Uso Reais

### 1. Gaming Servers

```
Jogadores → NLB → Game Servers (UDP)
- Latência crítica
- Protocolo UDP
- IP estático para whitelist
```

### 2. Database Connection Pooling

```
Apps → NLB → Database Proxies (TCP:5432)
- Milhares de conexões simultâneas
- Performance crítica
- IP fixo para firewall rules
```

### 3. IoT Applications

```
Devices → NLB → MQTT Brokers (TCP:1883)
- Milhões de devices
- Conexões persistentes
- Baixa latência
```

## Boas Práticas

✅ **Use NLB quando precisar de:**

- Performance extrema
- IP estático
- Protocolos não-HTTP

✅ **Configure cross-zone load balancing**

```bash
aws elbv2 modify-load-balancer-attributes \
    --load-balancer-arn arn:aws:... \
    --attributes Key=load_balancing.cross_zone.enabled,Value=true
```

✅ **Use TLS termination no NLB quando possível**

❌ **Não use NLB se precisa:**

- Roteamento baseado em URL
- Sticky sessions
- Inspeção de conteúdo HTTP

## Custos

**Modelo de precificação:**

- **Hora de execução**: ~$0.0225/hora
- **LCU (Load Balancer Capacity Units)**: ~$0.006/hora
- **Sem cobrança por dados processados**

**Exemplo mensal:**

```
NLB rodando 24/7 = 730 horas
730 × $0.0225 = $16.43/mês (base)
+ LCU charges (variável)
Total estimado: ~$20-30/mês
```

## Monitoramento

**CloudWatch Metrics importantes:**

- `ActiveFlowCount`: Conexões ativas
- `HealthyHostCount`: Targets saudáveis
- `UnHealthyHostCount`: Targets com problema
- `ProcessedBytes`: Bytes processados
- `TCP_Target_Reset_Count`: Conexões resetadas

```bash
# Ver métricas
aws cloudwatch get-metric-statistics \
    --namespace AWS/NetworkELB \
    --metric-name ActiveFlowCount \
    --dimensions Name=LoadBalancer,Value=net/my-nlb/xxx \
    --start-time 2025-12-18T00:00:00Z \
    --end-time 2025-12-18T23:59:59Z \
    --period 3600 \
    --statistics Average
```

## Referências

- [Documentação oficial NLB](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/)
- [NLB Best Practices](https://aws.amazon.com/blogs/networking-and-content-delivery/)
- [Comparação ALB vs NLB](https://aws.amazon.com/elasticloadbalancing/features/)
