---
id: regra-do-produto
title: Regra do Produto
sidebar_label: Regra do Produto
---

## O que é

A Regra do Produto calcula a probabilidade de dois eventos acontecerem juntos.

Forma geral:

$$
P(A \cap B) = P(A) \cdot P(B \mid A)
$$

Se os eventos forem independentes:

$$
P(A \cap B) = P(A) \cdot P(B)
$$

## Para que serve

- Calcular chances de eventos conjuntos
- Resolver problemas em etapas (primeiro acontece A, depois B)
- Modelar cenários com dependência ou independência
- Base para árvores de probabilidade e cadeias de eventos

## Como funciona

Você multiplica:

1. Probabilidade do primeiro evento.
2. Probabilidade do segundo considerando o primeiro.

Exemplo com urna sem reposição (3 bolas azuis, 2 vermelhas):

- Probabilidade de tirar azul na 1a: $P(A) = 3/5$
- Probabilidade de tirar azul na 2a, sabendo que já saiu azul: $P(B \mid A) = 2/4$

Entao:

$$
P(\text{azul e azul}) = \frac{3}{5} \cdot \frac{2}{4} = \frac{3}{10}
$$

## Analogia Intuitiva

Pense em dois postos de fiscalização em uma estrada. Para um carro passar pelos dois, ele precisa passar no primeiro posto e, depois disso, passar no segundo. A chance final é o produto dessas etapas.

## Exemplo Prático

Em uma turma com 9 alunos, sendo 5 meninas e 4 meninos, dois alunos são sorteados em sequência, sem reposição.

Seja:

- $M_1$: a primeira pessoa sorteada é menina
- $M_2$: a segunda pessoa sorteada é menina, dado que a primeira também foi menina

Então:

$$
P(M_1 \cap M_2) = \frac{5}{9} \cdot \frac{4}{8} = \frac{20}{72} = \frac{5}{18}
$$

Ou seja, a chance de as duas pessoas sorteadas serem meninas é $\frac{5}{18}$.

## Pontos de Atenção

- Não multiplique probabilidades "soltas" sem verificar dependência.
- Sem reposição normalmente gera dependência.
- Se a questão afirmar independência, pode usar diretamente $P(A) \cdot P(B)$.

## Referências para Aprofundamento

- OpenIntro Statistics, seção de eventos conjuntos: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">introdução acessível e progressiva</a>
- ProbabilityCourse.com: <a href="https://www.probabilitycourse.com/" target="_blank" rel="noopener noreferrer">curso textual com foco em fundamentos</a>
- MIT OpenCourseWare, Probability: <a href="https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/" target="_blank" rel="noopener noreferrer">aprofundamento acadêmico</a>
