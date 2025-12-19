---
id: aws-nlb
title: Network Load Balancer - NLB
sidebar_label: NLB
---

## O que é Network Load Balancer (NLB)?

O **Network Load Balancer (NLB)** é um balanceador de carga de **Camada 4 (TCP/UDP)** da AWS que opera no nível de transporte do modelo OSI.

**Analogia**: Como um distribuidor de pacotes express ultra-rápido - não abre os pacotes para ver conteúdo (Layer 4), apenas lê endereço e porta e distribui instantaneamente. Latência mínima, milhões de pacotes/segundo.

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

## Analogia

**NLB como portão automático de pedágio eletrônico (Sem Parar/Via Fácil):**

Imagine uma rodovia com múltiplas cabines de pedágio:

- **ALB seria o pedágio tradicional** onde o funcionário analisa seu veículo, lê documentos, verifica destino e decide qual guichê você vai. Mais lento, mas pode fazer decisões complexas.

- **NLB é o pedágio eletrônico** - você passa em alta velocidade, o sistema só verifica se sua tag está ativa (health check TCP) e te direciona para uma pista livre. Não lê placa, não verifica destino, não abre janela. **Ultra-rápido, mínima latência.**

Além disso, o NLB te dá um **endereço fixo** (IP estático) - é como se seu GPS sempre mostrasse a mesma coordenada do pedágio, mesmo que eles reconstruam a pista internamente.

**Por que isso importa?**

- Gaming servers precisam de IP fixo para jogadores adicionarem aos favoritos
- Firewalls corporativos fazem whitelist de IPs - não dá pra usar DNS que muda
- Aplicações legadas que só aceitam IP, não DNS

## Pontos de Atenção

### 🎯 Dicas para Certificação AWS

💡 **Quando a prova menciona NLB, procure por estas palavras-chave:**

- **"Static IP"** ou **"Elastic IP"** → NLB é a única opção
- **"Extreme performance"** ou **"millions of requests per second"** → NLB
- **"Ultra-low latency"** ou **"microsecond latency"** → NLB
- **"Preserve source IP"** → NLB (ALB modifica para o IP do balanceador)
- **"PrivateLink"** ou **"VPC Endpoint Service"** → NLB apenas
- **"WhitelistIP em firewall"** → NLB (IP não muda)

💡 **NLB vs ALB - Decision Tree para Prova:**

```
Requisito menciona HTTP/HTTPS?
├─ Sim → Path-based routing ou host-based?
│         ├─ Sim → ALB
│         └─ Não → Precisa IP fixo?
│                  ├─ Sim → NLB com TLS listener
│                  └─ Não → ALB (mais barato e mais features)
│
└─ Não → É TCP/UDP?
          ├─ Sim → NLB
          └─ Não → Revisar requisitos
```

💡 **Protocolos suportados:**

- **TCP**: Qualquer aplicação TCP (HTTP, MySQL, PostgreSQL, Redis, etc.)
- **UDP**: Gaming, IoT, DNS, streaming
- **TLS**: SSL/TLS termination com certificados ACM
- ⚠️ **Não suporta**: HTTP/2, gRPC, WebSockets nativamente (precisa TCP mode)

💡 **Cross-Zone Load Balancing (pegadinha de custo):**

- **Desabilitado por padrão** no NLB (no ALB vem habilitado)
- Quando habilitado, **cobra por dados transferidos entre AZs**
- Sem cross-zone + distribuição desigual de targets = carga desbalanceada

**Exemplo:** Se AZ-A tem 2 targets e AZ-B tem 8 targets:

- Sem cross-zone: cada AZ recebe 50% → targets em AZ-A recebem 4x mais carga
- Com cross-zone: distribuição uniforme → custo extra de rede

### ⚠️ Pegadinhas Comuns

❌ **NLB não suporta Security Groups** - ele opera em Layer 4, não entende aplicação. Configure SG nos targets  
❌ **Health check TCP vs HTTP** - TCP apenas verifica se porta está aberta, não se aplicação está saudável. Use HTTP health check quando possível  
❌ **Sticky sessions são por source IP** - se cliente trocar de rede (mobile 4G→WiFi), vai para target diferente  
❌ **TLS termination tem custo de LCU maior** - use só se necessário  
❌ **Connection draining não existe no NLB** - é chamado "deregistration delay" e funciona diferente do ALB  
❌ **Target pode ser ALB** - sim, você pode colocar NLB na frente de ALB (IP estático + path routing)  
❌ **Preserve source IP é automático** - no ALB precisa de X-Forwarded-For header, no NLB vem nativo  
❌ **Não suporta Lambda como target** - apenas ALB suporta Lambda  
❌ **Custo de LCU varia** - TCP connections, bytes processed, new connections/s afetam custo

💡 **Comparação rápida ALB vs NLB para prova:**

| Característica     | ALB    | NLB    |
| ------------------ | ------ | ------ |
| Camada OSI         | 7      | 4      |
| Latência           | ~ms    | ~100μs |
| IP Estático        | ❌     | ✅     |
| Path-based routing | ✅     | ❌     |
| Lambda target      | ✅     | ❌     |
| Preserve source IP | Header | Nativo |
| Security Groups    | ✅     | ❌     |
| PrivateLink        | ❌     | ✅     |

## Referências

- [Documentação oficial NLB](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/)
- [NLB Best Practices](https://aws.amazon.com/blogs/networking-and-content-delivery/)
- [Comparação ALB vs NLB](https://aws.amazon.com/elasticloadbalancing/features/)
