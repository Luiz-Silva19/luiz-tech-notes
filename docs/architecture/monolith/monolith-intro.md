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

## Próximos Passos

- Se precisar escalar: veja [Microsserviços](../microservices/microservices-intro.md)
- Para melhor modularização: estude Clean Architecture
- Comunicação assíncrona: [Event-Driven](../event-driven/event-driven-intro.md)
