---
id: aws-glb
title: Gateway Load Balancer - GLB
sidebar_label: GLB
---

## O que é Gateway Load Balancer (GLB)?

O **Gateway Load Balancer (GLB)** é um balanceador de carga de **Camada 3 (Network Layer)** projetado para deploy, escala e gerenciamento de **appliances virtuais** como firewalls, IDS/IPS, e deep packet inspection.

**Analogia**: Como um posto de inspeção transparente na entrada da cidade - todo tráfego passa por segurança (firewalls) antes de chegar ao destino. O tráfego nem percebe que foi inspecionado, tudo é transparente.

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

## Analogia

**GLB como ponto de fiscalização obrigatório em rodovia:**

Imagine uma rodovia onde **todos os carros** precisam passar obrigatoriamente por uma estação de fiscalização antes de chegar ao destino:

```
Cidades (Internet)
      ↓
┌─────────────────┐
│   Pedágio/      │  ← GLB: direciona cada carro
│   Fiscalização  │     para um posto de inspeção
└─────────────────┘
      ↓
┌──────┬──────┬──────┐
│Posto │Posto │Posto │  ← Appliances (Firewalls, IDS/IPS)
│  1   │  2   │  3   │     Cada posto inspeciona o carro
└──────┴──────┴──────┘
      ↓
┌─────────────────┐
│   Destino       │  ← Suas aplicações (EC2, ECS)
│   (Apps)        │     Só chegam carros aprovados
└─────────────────┘
```

**Características importantes:**

- **Transparente**: Os motoristas (clientes) nem sabem que passaram pela inspeção - tudo parece direto
- **Obrigatório**: Não tem como desviar da fiscalização - 100% do tráfego é inspecionado
- **Escalável**: Se aumenta o fluxo, abre mais postos de inspeção automaticamente
- **Centralizado**: Todas as rodovias da região usam a mesma estação (multi-VPC)

**Diferença dos outros balanceadores:**

- **ALB/NLB**: São como guardas que direcionam tráfego entre destinos
- **GLB**: É inspeção de segurança ANTES de deixar passar

## Pontos de Atenção

### 🎯 Dicas para Certificação AWS

💡 **Palavras-chave que indicam GLB na prova:**

- **"Third-party security appliance"** (Palo Alto, Fortinet, Check Point) → GLB
- **"IDS/IPS"** (Intrusion Detection/Prevention System) → GLB
- **"Deep Packet Inspection (DPI)"** → GLB
- **"Centralized firewall inspection"** → GLB
- **"Transparent bump-in-the-wire"** → GLB
- **"GENEVE protocol"** → GLB
- **"All traffic must pass through security appliance"** → GLB

💡 **GLB vs Security Group vs WAF (confusão comum):**

| Recurso            | Camada | Quando usar                                               |
| ------------------ | ------ | --------------------------------------------------------- |
| **Security Group** | 4-5    | Firewall stateful básico (IP/porta)                       |
| **WAF**            | 7      | Proteção web (SQL injection, XSS) - apenas ALB/CloudFront |
| **GLB**            | 3      | Inspeção profunda com appliances de terceiros             |

- **SG**: "Bloquear porta 22 de internet" - regras simples
- **WAF**: "Bloquear requisições com SQL injection" - padrões HTTP
- **GLB**: "Inspecionar todo pacote com Palo Alto Firewall" - análise profunda

💡 **Arquitetura típica em prova:**

```
Cenário: "Empresa precisa inspecionar TODO tráfego com firewall Palo Alto
antes de chegar nas aplicações em múltiplas VPCs"

Solução:
1. Security VPC com GLB + Palo Alto appliances
2. Application VPCs com suas apps
3. VPC Endpoint conectando tudo
4. Route tables direcionando tráfego para GLB endpoint
```

💡 **GLB usa GENEVE (porta 6081):**

- Protocolo de encapsulamento de rede
- Preserva informações originais do pacote (source IP, etc.)
- Appliances precisam suportar GENEVE - nem todos suportam

### ⚠️ Pegadinhas Comuns

❌ **Não use GLB para balanceamento simples** - ALB/NLB são mais baratos e simples para isso  
❌ **GLB não faz SSL/TLS termination** - ele passa pacotes transparentemente para appliances  
❌ **Appliance precisa suportar GENEVE** - não funciona com qualquer firewall legacy  
❌ **Custo alto comparado a ALB/NLB** - só use se realmente precisar de inspeção profunda  
❌ **Health check nos appliances é crítico** - se appliance cair e GLB não detectar, todo tráfego cai  
❌ **Não confundir com NAT Gateway** - NAT é para saída de internet privada, GLB é para inspeção  
❌ **Multi-VPC setup é complexo** - requer VPC Endpoint Service + VPC Endpoints + route tables corretos  
❌ **Latência adicional** - cada pacote precisa passar pelo appliance antes de chegar ao destino

💡 **Casos que NÃO precisam de GLB:**

- Firewall básico de porta/IP → Use Security Groups
- Proteção contra SQL injection/XSS → Use WAF no ALB
- Balancear tráfego HTTP → Use ALB
- Balancear tráfego TCP com IP fixo → Use NLB

💡 **Casos que precisam de GLB:**

- ✅ Compliance exige DPI (Deep Packet Inspection)
- ✅ Já usa Palo Alto/Fortinet on-premises e quer na AWS
- ✅ IDS/IPS avançado (Suricata, Snort)
- ✅ Inspeção centralizada para múltiplas VPCs/accounts
- ✅ Traffic mirroring para análise forense

### 💰 Custo (importante para decisão)

**GLB é mais caro que ALB/NLB porque:**

- Custo do GLB itself (~$0.0125/hora)
- Custo dos appliances (EC2 instances - pode ser caríssimo)
- GLCU (Gateway Load Balancer Capacity Units)
- Data processing charges

**Estimativa:** $500-2000+/mês (incluindo appliances)  
**Comparação:** ALB ~$25-70/mês, NLB ~$20-30/mês

**Só justifica se:**

- Compliance mandatório
- Segurança crítica (financeiro, saúde)
- Já tem contrato enterprise com vendor (Palo Alto, etc.)

## Referências

- [Documentação oficial GLB](https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/)
- [GLB Architecture Patterns](https://aws.amazon.com/blogs/networking-and-content-delivery/)
- [GENEVE Protocol](https://datatracker.ietf.org/doc/html/rfc8926)
