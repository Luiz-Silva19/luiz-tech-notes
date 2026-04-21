---
id: probabilidade-condicional
title: Probabilidade Condicional
sidebar_label: Probabilidade Condicional
---

## O que é

Probabilidade condicional é a probabilidade de um evento acontecer sabendo que outro evento já aconteceu.

Fórmula principal:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

com a condição $P(B) > 0$.

## Para que serve

- Atualizar chances quando temos nova informação
- Resolver problemas de diagnóstico, risco e classificação
- Interpretar corretamente eventos dependentes
- Basear modelos de inferência (incluindo Bayes)

## Como funciona

A ideia é reduzir o universo de análise para apenas os casos onde $B$ ocorreu.

Passos:

1. Identificar o evento base $B$ (informação conhecida).
2. Encontrar quantos casos satisfazem $A$ e $B$ ao mesmo tempo.
3. Dividir pela probabilidade de $B$.

Exemplo rápido com baralho (52 cartas):

- $A$: carta e As
- $B$: carta é de Copas

Como existe apenas 1 Ás de Copas:

$$
P(A \cap B) = \frac{1}{52}, \quad P(B) = \frac{13}{52}
$$

Logo:

$$
P(A \mid B) = \frac{1/52}{13/52} = \frac{1}{13}
$$

## Analogia Intuitiva

Imagine uma portaria de prédio: no total entram moradores e visitantes. Se o recepcionista diz "considerando apenas visitantes", você mudou o universo de contagem. A probabilidade condicional faz exatamente isso: calcula chances dentro de um subconjunto já filtrado.

## Exemplo Prático Real

Em uma turma com 30 alunos:

- 18 estudam Python ($B$)
- 12 estudam Python e Estatística ($A \cap B$)

Qual a chance de um aluno estudar Estatística sabendo que ele estuda Python?

$$
P(A \mid B) = \frac{12/30}{18/30} = \frac{12}{18} = \frac{2}{3}
$$

Interpretação: entre quem estuda Python, 66,7% também estuda Estatística.

## Pontos de Atenção

- Não confunda $P(A \mid B)$ com $P(B \mid A)$: geralmente são diferentes.
- Sempre verifique se $P(B) > 0$.
- Se os eventos forem independentes, então $P(A \mid B) = P(A)$.

## Referências para Aprofundamento

- Seeing Theory, Conditional Probability: <a href="https://seeing-theory.brown.edu/basic-probability/index.html#section3" target="_blank" rel="noopener noreferrer">visualização intuitiva do conceito</a>
- StatQuest, Conditional Probability: <a href="https://www.youtube.com/watch?v=ibINrxJLvlM" target="_blank" rel="noopener noreferrer">explicação direta com exemplos</a>
- Harvard Stat 110 notes: <a href="https://projects.iq.harvard.edu/stat110/home" target="_blank" rel="noopener noreferrer">material de curso para aprofundamento formal</a>
