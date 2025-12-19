---
id: architecture-intro
title: Arquitetura de Software
sidebar_label: Visão Geral
---

## O que é Arquitetura de Software?

Arquitetura de Software é a organização fundamental de um sistema, seus componentes, relacionamentos e os princípios que guiam seu design e evolução.

**Analogia**: Se software fosse uma casa, a arquitetura define se será um apartamento, casa térrea ou prédio - cada um com suas vantagens e trade-offs.

## Estilos Arquiteturais Principais

### [Microsserviços](microservices-intro.md)

Aplicação dividida em serviços pequenos e independentes.

### [Monolítica](monolith-intro.md)

Aplicação única e coesa, toda deployada em conjunto.

### [Event-Driven](event-driven-intro.md)

Comunicação baseada em eventos assíncronos.

## Trade-offs Importantes

Não existe arquitetura perfeita - apenas a mais adequada para seu contexto:

| Aspecto              | Monolito    | Microsserviços      |
| -------------------- | ----------- | ------------------- |
| Complexidade inicial | Baixa       | Alta                |
| Escalabilidade       | Vertical    | Horizontal granular |
| Deploy               | Tudo junto  | Independente        |
| Debugging            | Mais fácil  | Mais difícil        |
| Time pequeno         | ✅ Ideal    | ❌ Overhead         |
| Time grande          | ❌ Gargalos | ✅ Autonomia        |

## Princípios Fundamentais

### Separation of Concerns

Dividir o sistema em partes com responsabilidades distintas.

### Single Responsibility

Cada componente deve ter uma única razão para mudar.

### Loose Coupling

Componentes devem ser independentes e com poucas dependências.

### High Cohesion

Elementos relacionados devem estar juntos.

## Como escolher?

✅ **Comece simples**: Monolito bem estruturado
📈 **Escale quando necessário**: Microsserviços quando complexidade justificar
🎯 **Foque no problema**: Arquitetura é meio, não fim

## Padrões Complementares

- **Clean Architecture**: Independência de frameworks
- **Hexagonal Architecture**: Portas e adaptadores
- **CQRS**: Separação de leitura e escrita
- **Domain-Driven Design**: Modelagem baseada no domínio

## Quando arquitetura importa?

- Sistema vai crescer e evoluir por anos
- Múltiplos times trabalhando juntos
- Requisitos de escalabilidade e disponibilidade
- Necessidade de isolar mudanças

**Lembre-se**: Arquitetura prematura é tão perigosa quanto falta de arquitetura.

## Pontos de Atenção

### 💡 Dicas para Certificação

**Palavras-chave em provas:**

- **"Escalabilidade"** → Pense em arquitetura que permite escalar (micro ou modular)
- **"Times independentes"** → Microsserviços
- **"Simplicidade inicial"** → Monolito
- **"Alta disponibilidade"** → Arquitetura distribuída
- **"Baixo acoplamento"** → Microsserviços ou event-driven

**Comparações comuns:**

| Quando a questão menciona...                 | Provável resposta |
| -------------------------------------------- | ----------------- |
| "MVP", "startup", "time pequeno"             | Monolito          |
| "Escalar independentemente", "times grandes" | Microsserviços    |
| "Processamento assíncrono", "desacoplamento" | Event-Driven      |
| "Aplicação web tradicional"                  | Three-Tier        |

### ⚠️ Pegadinhas Comuns

**1. Arquitetura ≠ Padrão de Código**

❌ **Erro**: "MVC é uma arquitetura de software"  
✅ **Correto**: "MVC é um padrão de design. Arquitetura define a estrutura geral do sistema (monolito, microserviços, etc.)"

**2. Mais complexo ≠ Melhor**

❌ **Erro**: "Sempre usar microsserviços para produção"  
✅ **Correto**: "Escolher arquitetura baseada em contexto e necessidade real"

**Regra de ouro:**

- Time < 10 pessoas → Monolito (provavelmente)
- Time > 50 pessoas → Microsserviços (provavelmente)
- Entre 10-50 → Depende da complexidade do domínio

**3. Confusão: Monolito vs Monolito Distribuído**

**Monolito** (bom):

- Tudo em um processo
- Deploy atômico
- Simples de entender

**Monolito Distribuído** (anti-pattern):

- Serviços separados mas fortemente acoplados
- Precisa deployar tudo junto mesmo estando separado
- ❌ **Pior dos dois mundos!**

**4. Quando NÃO migrar de Monolito para Microserviços**

❌ **Motivos ruins:**

- "Está na moda"
- "Grandes empresas usam"
- "Parece legal no currículo"

✅ **Motivos bons:**

- Times não conseguem trabalhar de forma independente
- Partes do sistema precisam escalar diferentemente
- Deploy de tudo junto causa muito risco
- Domínio é complexo o suficiente para justificar

### 🎯 Decisões Arquiteturais - Framework

Use este checklist ao escolher arquitetura:

**1. Complexidade do Domínio**

- Simples → Monolito
- Complexo → Considere decomposição

**2. Tamanho do Time**

- Pequeno (< 10) → Monolito
- Grande (> 30) → Microsserviços

**3. Requisitos de Escala**

- Uniforme → Monolito
- Diferenciada → Microsserviços

**4. Velocidade de Deploy**

- Pouco frequente → Monolito OK
- Múltiplos por dia → Microsserviços

**5. Maturidade DevOps**

- Baixa → Monolito
- Alta → Microsserviços

**6. Budget**

- Limitado → Monolito (menos infraestrutura)
- Flexível → Considere opções

### 📊 Evolução Típica

```
Fase 1: MVP/Startup
└─ Monolito bem estruturado

Fase 2: Crescimento
├─ Monolito modular
└─ Identificar bounded contexts

Fase 3: Escala
├─ Extrair serviços críticos
└─ Híbrido (monolito + alguns microserviços)

Fase 4: Maturidade
└─ Microsserviços completos (se necessário)
```

**Importante**: Muitas empresas de sucesso **nunca** saem da Fase 2 ou 3, e está tudo bem!

### 🔍 Em Prova: Como Identificar a Resposta Certa

**Cenário 1:**

> "Startup com 5 desenvolvedores precisa lançar MVP em 3 meses"

**Análise:**

- Time pequeno ✓
- Prazo curto ✓
- MVP (simplicidade) ✓

**Resposta:** Monolito

---

**Cenário 2:**

> "E-commerce com 100 desenvolvedores em 15 times. Checkout precisa escalar 10x mais que catálogo"

**Análise:**

- Time grande ✓
- Escalabilidade diferenciada ✓
- Times independentes ✓

**Resposta:** Microsserviços

---

**Cenário 3:**

> "Sistema de notificações precisa processar milhões de eventos sem bloquear"

**Análise:**

- Processamento assíncrono ✓
- Desacoplamento ✓
- Alto volume ✓

**Resposta:** Event-Driven Architecture
