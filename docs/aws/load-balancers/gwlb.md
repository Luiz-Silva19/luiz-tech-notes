---
id: aws-glb
title: Gateway Load Balancer - GLB
sidebar_label: GLB
---

## O que é Gateway Load Balancer (GLB)?

O **Gateway Load Balancer (GLB)** é um balanceador de carga de **Camada 3 (Network Layer)** projetado para deploy, escala e gerenciamento de **appliances virtuais** como firewalls, IDS/IPS, e deep packet inspection.

## Características Principais

### Para que serve?

- **Appliances de terceiros**: Firewalls, IDS/IPS, DPI
- **Inspeção de tráfego**: Todo tráfego passa pelos appliances
- **Transparência**: Aplicação não sabe que existe intermediário
- **Escalabilidade**: Escala os appliances automaticamente

### Protocolo

- **GENEVE protocol** (porta 6081)
- Opera na **Camada 3** (IP packets)

## Arquitetura GLB

```
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │  Internet GW    │
              └─────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   Gateway LB    │
              │   (Layer 3)     │
              └─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌─────────┐    ┌─────────┐    ┌─────────┐
   │Firewall │    │Firewall │    │Firewall │
   │  VM-1   │    │  VM-2   │    │  VM-3   │
   └─────────┘    └─────────┘    └─────────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Application    │
              │   EC2/Fargate   │
              └─────────────────┘
```

## Quando Usar GLB?

| Cenário                          | Usar GLB?  |
| -------------------------------- | ---------- |
| **Firewall centralizado**        | ✅ Sim     |
| **IDS/IPS inspection**           | ✅ Sim     |
| **DPI (Deep Packet Inspection)** | ✅ Sim     |
| **Third-party appliances**       | ✅ Sim     |
| **HTTP load balancing**          | ❌ Use ALB |
| **TCP load balancing**           | ❌ Use NLB |

## Casos de Uso Reais

### 1. Firewall Centralizado

```
Internet → GLB → Palo Alto Firewalls → App
- Inspeção de todo tráfego
- Regras centralizadas
- Compliance requirements
```

### 2. IDS/IPS (Intrusion Detection/Prevention)

```
Users → GLB → Suricata/Snort → Applications
- Detecta ataques
- Bloqueia tráfego malicioso
- Logging centralizado
```

### 3. DPI (Deep Packet Inspection)

```
Traffic → GLB → DPI Appliance → Data Processing
- Análise profunda de pacotes
- QoS (Quality of Service)
- Traffic shaping
```

## Comparação: ALB vs NLB vs GLB

| Característica   | ALB             | NLB         | GLB              |
| ---------------- | --------------- | ----------- | ---------------- |
| **Camada OSI**   | 7               | 4           | 3                |
| **Caso de uso**  | HTTP/HTTPS      | TCP/UDP     | Appliances       |
| **Targets**      | EC2, IP, Lambda | EC2, IP     | EC2 (appliances) |
| **Protocolo**    | HTTP/HTTPS      | TCP/UDP/TLS | GENEVE           |
| **IP Estático**  | ❌              | ✅          | N/A              |
| **Transparente** | ❌              | ❌          | ✅               |

## Configurando GLB via Console

**Passo 1:** Criar Gateway Load Balancer

```
1. EC2 Console > Load Balancers > Create
2. Selecionar "Gateway Load Balancer"
3. Escolher VPC e subnets
4. Criar
```

**Passo 2:** Criar Target Group

```
1. Target type: Instances
2. Protocol: GENEVE
3. Registrar appliances (firewalls/IDS)
```

**Passo 3:** Criar VPC Endpoint Service

```
1. VPC Console > Endpoint Services
2. Associar GLB
3. Aceitar conexões
```

**Passo 4:** Criar VPC Endpoint

```
1. VPC Consumer
2. Criar Gateway Load Balancer Endpoint
3. Associar subnet
```

## Configurando GLB via CloudFormation

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Resources:
  GatewayLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: my-gateway-lb
      Type: gateway
      Subnets:
        - !Ref SubnetA
        - !Ref SubnetB

  TargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: firewall-targets
      Port: 6081
      Protocol: GENEVE
      VpcId: !Ref VPC
      HealthCheckEnabled: true
      HealthCheckProtocol: TCP
      HealthCheckPort: 80

  Listener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      LoadBalancerArn: !Ref GatewayLoadBalancer
      DefaultActions:
        - Type: forward
          TargetGroupArn: !Ref TargetGroup

  VPCEndpointService:
    Type: AWS::EC2::VPCEndpointService
    Properties:
      GatewayLoadBalancerArns:
        - !Ref GatewayLoadBalancer
      AcceptanceRequired: false
```

## Exemplo: Firewall Inspection

### Arquitetura Completa

```
┌──────────────────────────────────────────────────────┐
│                   Security VPC                        │
│  ┌────────────────────────────────────────────────┐  │
│  │           Gateway Load Balancer                │  │
│  └────────────────────────────────────────────────┘  │
│           │              │              │            │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐      │
│     │Firewall │    │Firewall │    │Firewall │      │
│     │  AZ-a   │    │  AZ-b   │    │  AZ-c   │      │
│     └─────────┘    └─────────┘    └─────────┘      │
└──────────────────────────────────────────────────────┘
                       │
                       │ VPC Endpoint
                       │
┌──────────────────────────────────────────────────────┐
│                 Application VPC                       │
│  ┌────────┐   ┌────────┐   ┌────────┐               │
│  │ App-1  │   │ App-2  │   │ App-3  │               │
│  └────────┘   └────────┘   └────────┘               │
└──────────────────────────────────────────────────────┘
```

### Route Tables

**Security VPC:**

```
Destination         Target
10.0.0.0/16        local
0.0.0.0/0          igw-xxx
```

**Application VPC:**

```
Destination         Target
10.1.0.0/16        local
0.0.0.0/0          vpce-xxx (GLB Endpoint)
```

## Boas Práticas

✅ **Use GLB para:**

- Inspeção de tráfego centralizada
- Compliance requirements
- Third-party security appliances

✅ **Configure health checks nos appliances**

✅ **Use Auto Scaling para os appliances**

✅ **Monitore métricas de performance**

❌ **Não use GLB para:**

- Load balancing de aplicações web
- Simples balanceamento TCP/UDP
- Aplicações que não precisam inspeção

## Custos

**Modelo de precificação:**

- **Hora de execução**: ~$0.0125/hora
- **GLCU (Gateway Load Balancer Capacity Units)**: ~$0.004/hora
- **Data processing**: ~$0.004/GB

**Exemplo mensal:**

```
GLB rodando 24/7 = 730 horas
730 × $0.0125 = $9.13/mês (base)
+ GLCU charges
+ Appliances costs (EC2)
Total estimado: ~$500-2000/mês (com appliances)
```

## Monitoramento

**CloudWatch Metrics:**

- `ActiveFlowCount`: Fluxos ativos
- `ConsumedGLCUs`: Capacidade consumida
- `HealthyHostCount`: Appliances saudáveis
- `ProcessedBytes`: Dados processados

```bash
# Ver métricas
aws cloudwatch get-metric-statistics \
    --namespace AWS/GatewayELB \
    --metric-name HealthyHostCount \
    --dimensions Name=LoadBalancer,Value=gwy/my-glb/xxx \
    --start-time 2025-12-18T00:00:00Z \
    --end-time 2025-12-18T23:59:59Z \
    --period 300 \
    --statistics Average
```

## Referências

- [Documentação oficial GLB](https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/)
- [GLB Architecture Patterns](https://aws.amazon.com/blogs/networking-and-content-delivery/)
- [GENEVE Protocol](https://datatracker.ietf.org/doc/html/rfc8926)
