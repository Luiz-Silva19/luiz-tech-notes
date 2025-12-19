---
id: architecture-intro
title: Arquitetura de Software
sidebar_label: Visão Geral
---

## O que é Arquitetura de Software?

Arquitetura de Software é a organização fundamental de um sistema, seus componentes, relacionamentos e os princípios que guiam seu design e evolução.

**Analogia**: Se software fosse uma casa, a arquitetura define se será um apartamento, casa térrea ou prédio - cada um com suas vantagens e trade-offs.

## Estilos Arquiteturais Principais

### [Microsserviços](microservices/microservices-intro.md)

Aplicação dividida em serviços pequenos e independentes.

### [Monolítica](monolith/monolith-intro.md)

Aplicação única e coesa, toda deployada em conjunto.

### [Event-Driven](event-driven/event-driven-intro.md)

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
