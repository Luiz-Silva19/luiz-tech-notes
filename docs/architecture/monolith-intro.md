---
id: monolith-intro
title: Arquitetura Monolítica
sidebar_label: Monolítica
---

## O que é um Monolito?

Aplicação construída como uma unidade única e coesa. Todo o código é deployado junto, roda no mesmo processo e compartilha os mesmos recursos (banco de dados, memória, etc.).

**Analogia**: Um restaurante tradicional com uma cozinha integrada onde tudo é preparado no mesmo espaço. Coordenação é mais fácil, mas todos dependem da mesma infraestrutura.

## Características Principais

### Unidade Única

- Código em um único repositório (geralmente)
- Deploy atômico de toda aplicação
- Compartilha banco de dados

### Simplicidade Inicial

- Desenvolvimento direto
- Debugging mais fácil
- Menos overhead operacional

### Acoplamento

- Componentes fortemente conectados
- Mudanças podem ter efeitos colaterais
- Requer coordenação entre áreas

## Quando usar?

✅ **Use quando**:

- **Início de projeto**: MVP, validação de ideia
- **Time pequeno**: < 10 desenvolvedores
- **Domínio simples**: Complexidade baixa/média
- **Baixa necessidade de escala diferenciada**
- **Startup/produto novo**: Velocidade importa mais que escala

❌ **Evite quando**:

- Times grandes precisam autonomia
- Partes da aplicação têm escalas muito diferentes
- Deploy frequente causa muito risco
- Domínio é extremamente complexo

## Vantagens

🚀 **Simples de desenvolver**: Tudo no mesmo lugar  
🐛 **Fácil de debugar**: Stack trace completo  
⚡ **Performance**: Chamadas locais, sem rede  
📦 **Deploy simples**: Uma unidade só  
💰 **Menor custo inicial**: Infraestrutura mais simples  
🧪 **Testes mais simples**: Tudo junto

## Desafios

📈 **Escalabilidade**: Só vertical ou replicação completa  
🔄 **Deploy arriscado**: Tudo muda junto  
👥 **Coordenação**: Times grandes se atrapalham  
🔧 **Tecnologia única**: Difícil mudar stack  
⏱️ **Startup lento**: Aplicação pode ficar pesada  
📊 **Complexidade crescente**: Tende a virar "big ball of mud"

## Tipos de Monolito

### Monolito Modular

Organizado em módulos bem definidos internamente.

- ✅ Melhor organização
- ✅ Preparado para eventual divisão
- ⚠️ Ainda deploya tudo junto

### Monolito Distribuído (Anti-pattern!)

Monolito dividido em serviços mas mantendo acoplamento.

- ❌ Pior dos dois mundos
- ❌ Complexidade distribuída sem benefícios
- ❌ Evite a todo custo!

## Estrutura Típica

```
monolith-app/
├── src/
│   ├── controllers/     # Camada de apresentação
│   ├── services/        # Lógica de negócio
│   ├── repositories/    # Acesso a dados
│   ├── models/          # Entidades
│   └── utils/           # Utilitários
├── tests/
└── config/
```

## Exemplo Conceitual

```
┌─────────────────────────────────┐
│         Aplicação Web           │
├─────────────────────────────────┤
│  Controllers │ Services │ ...   │
├─────────────────────────────────┤
│        Database Layer           │
└─────────────────────────────────┘
           │
           ▼
     [Banco de Dados]
```

## Boas Práticas

✅ **Modularização clara**: Separação por camadas/domínios  
✅ **Clean Architecture**: Independência de frameworks  
✅ **Testes automatizados**: Confiança para mudar  
✅ **Feature flags**: Deploy != Release  
✅ **Documentação**: Facilita onboarding

## Evolução

### Monolito → Microsserviços?

Não é sempre necessário! Considere:

1. **Monolito modular**: Melhor organização interna
2. **Vertical slicing**: Extrair serviços aos poucos
3. **Strangler pattern**: Migração gradual
4. **Mantenha monolito**: Se funciona, não quebre!

## Tecnologias Comuns

- **Backend**: Django, Ruby on Rails, Spring Boot, Laravel
- **Frontend**: Incluído ou separado (SPA)
- **Banco**: PostgreSQL, MySQL, SQL Server

## Mitos vs Realidade

| Mito                       | Realidade                          |
| -------------------------- | ---------------------------------- |
| Monolitos são legado       | Monolitos podem ser modernos       |
| Sempre vire microsserviços | Muitos casos monolito é melhor     |
| Monolito = mal estruturado | Pode ter excelente arquitetura     |
| Não escala                 | Escala sim, mas de forma diferente |

## Casos de Sucesso

Empresas que ainda usam monolitos com sucesso:

- Shopify (Ruby on Rails monolito modular)
- Stack Overflow
- Basecamp

**Mensagem**: Monolito bem feito > Microsserviços mal feitos!

## Pontos de Atenção

### 💡 Dicas para Certificação

**Palavras-chave que indicam Monolito:**

- ✅ "MVP", "startup"
- ✅ "Time pequeno"
- ✅ "Simplicidade", "time-to-market"
- ✅ "Baixo custo inicial"
- ✅ "Aplicação simples"
- ✅ "Tudo em um lugar"

**Comparação comum em provas:**

| Cenário                                 | Arquitetura Ideal |
| --------------------------------------- | ----------------- |
| 5 desenvolvedores, MVP em 3 meses       | Monolito          |
| 50 desenvolvedores, escala diferenciada | Microsserviços    |
| Aplicação CRUD simples                  | Monolito          |
| Sistema complexo, múltiplos domínios    | Microsserviços    |

### ⚠️ Pegadinhas Comuns

**1. Monolito ≠ Big Ball of Mud**

❌ **Erro**: "Monolito é sempre código desorganizado"  
✅ **Correto**: "Monolito pode ser bem estruturado em camadas/módulos"

**Monolito Modular:**

```
monolito-app/
├── modules/
│   ├── orders/        # Módulo de pedidos
│   ├── payments/      # Módulo de pagamentos
│   ├── inventory/     # Módulo de estoque
│   └── users/         # Módulo de usuários
├── shared/            # Código compartilhado
└── infrastructure/    # DB, cache, etc.
```

Cada módulo:

- Tem responsabilidade clara
- Depende apenas de interfaces
- Pode virar microsserviço no futuro

**2. Monolito Distribuído - O PIOR Anti-Pattern**

**Características:**

- Serviços separados mas fortemente acoplados
- Precisa deployar tudo junto
- Compartilha banco de dados
- Falha em cascata

**Por que é ruim?**

- ❌ Complexidade de microsserviços
- ❌ Sem benefícios de microsserviços
- ❌ Debugging difícil
- ❌ Custo alto de infraestrutura

**Como evitar:**

- Se tem acoplamento forte → mantenha no monolito
- Se precisa separar → desacople de verdade

**Em prova:**

- "Serviços que precisam deployar juntos" = ❌ Monolito Distribuído

**3. Escalabilidade: Vertical vs Horizontal**

**Escalabilidade Vertical (Scale Up):**

```
Servidor único cada vez mais potente
1 CPU, 2GB RAM → 16 CPU, 64GB RAM
```

- ✅ Simples
- ❌ Limite físico
- ❌ Custo exponencial
- ❌ Single point of failure

**Escalabilidade Horizontal (Scale Out):**

```
Múltiplas instâncias do monolito
1 servidor → 3 servidores (load balanced)
```

- ✅ Sem limite teórico
- ✅ Alta disponibilidade
- ⚠️ Requer stateless ou sessão externa (Redis)

**Monolito pode escalar horizontalmente!**

```
          Load Balancer
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
Monolito 1  Monolito 2  Monolito 3
    │           │           │
    └───────────┴───────────┘
              │
      Banco de Dados
      Redis (sessões)
```

**Em prova:**

- "Monolito não escala" = ❌ FALSO
- "Monolito escala verticalmente" = ✅ Verdade (mas também horizontal!)

**4. Quando Migrar para Microsserviços?**

**Sinais que está na hora:**

✅ **Crescimento de time:**

- Times se atrapalhando no mesmo código
- Merge conflicts frequentes
- Deploy coordenado é gargalo

✅ **Escalabilidade diferenciada:**

- Login tem 10x mais tráfego que Admin
- Impossível escalar partes específicas

✅ **Ciclos de deploy:**

- Deploy de tudo é muito arriscado
- Rollback afeta funções não relacionadas

✅ **Tecnologias diferentes:**

- ML precisa Python, API Node.js
- Processamento batch precisa Go

**Sinais que NÃO é hora:**

❌ "Está na moda"
❌ "Outras empresas usam"
❌ Time ainda é pequeno (< 15 pessoas)
❌ Domínio ainda não está claro

**5. Deployment Strategies para Monolito**

**Blue-Green:**

```
Produção (Blue)     Novo (Green)
    │                   │
    └─── Switch ────────┘
```

- Deploy completo do monolito novo
- Switch instantâneo
- Rollback fácil

**Canary:**

```
Load Balancer
    │
    ├── 90% → Versão Antiga
    └── 10% → Versão Nova
```

- Testa nova versão com poucos usuários
- Aumenta % gradualmente

**Rolling:**

```
Servidor 1: v1 → v2
Servidor 2: v1 → v2  (depois que 1 OK)
Servidor 3: v1 → v2  (depois que 2 OK)
```

- Atualiza um servidor por vez
- Zero downtime

### 🎯 Casos de Uso Clássicos

**✅ Monolito é IDEAL para:**

1. **Aplicações CRUD simples**

   - Blog, CMS, admin panels
   - Poucos usuários (< 10k)

2. **Startups/MVP**

   - Validar ideia rapidamente
   - Pivots frequentes

3. **Aplicações internas**

   - Ferramentas de back-office
   - Poucos usuários simultâneos

4. **Times pequenos**
   - < 10 desenvolvedores
   - Foco em entregar valor

**✅ Exemplos reais:**

- **Shopify**: Ruby on Rails monolito (800+ devs!)
- **GitHub**: Rails monolito por muitos anos
- **Basecamp**: Ainda é monolito
- **Stack Overflow**: Monolito .NET

**Lição:** Tamanho da empresa ≠ arquitetura necessária

### 🔧 Performance e Otimização

**Vantagens de performance do monolito:**

✅ **Chamadas locais:**

```
Microsserviço:  ServiceA → HTTP → ServiceB (ms)
Monolito:       ModuleA → function call → ModuleB (μs)
```

✅ **Transações ACID simples:**

```sql
BEGIN TRANSACTION;
  UPDATE orders SET status = 'paid';
  INSERT INTO inventory_log;
  UPDATE users SET balance = balance - 100;
COMMIT;
```

Em microsserviços: Saga pattern complexo!

✅ **Sem latência de rede**
✅ **Sem serialização/desserialização**
✅ **Cache local eficiente**

### 📊 Monitoramento

**Monolito é MAIS FÁCIL de monitorar:**

✅ **Stack trace completo:**

```
Error at line 42
  → called from OrderService.create()
  → called from OrderController.post()
```

✅ **Logs centralizados naturalmente**
✅ **Profiling simples** (não precisa distributed tracing)
✅ **Debugging com breakpoints**

Em microsserviços:

- Precisa correlacionar logs de N serviços
- Distributed tracing (Jaeger, Zipkin)
- Debugging é investigação (não debug interativo)

### 🔒 Segurança

**Superfície de ataque menor:**

**Monolito:**

```
Internet → Load Balancer → App → DB
(2 endpoints expostos)
```

**Microsserviços:**

```
Internet → API Gateway → Service A → DB
                       → Service B → DB
                       → Service C → Queue
                       → Service D → Cache
(5+ endpoints, comunicação inter-service)
```

**Menos pontos de falha de segurança!**

### 🏗️ Evolução do Monolito

**Estratégia recomendada:**

```
Fase 1: Monolito simples (MVP)
├── Deploy rápido
└── Validar negócio

Fase 2: Monolito modular (crescimento)
├── Organizar em módulos
├── Definir bounded contexts
└── Preparar para possível separação

Fase 3: Híbrido (opcional)
├── Extrair serviços críticos
├── Manter core no monolito
└── Best of both worlds

Fase 4: Microsserviços (se necessário)
└── Apenas se justificar complexidade
```

**Muitas empresas param na Fase 2 ou 3!**

## Próximos Passos

- Se precisar escalar: veja [Microsserviços](microservices-intro.md)
- Para melhor modularização: estude Clean Architecture
- Comunicação assíncrona: [Event-Driven](event-driven-intro.md)
