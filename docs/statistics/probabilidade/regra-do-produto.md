---
id: regra-do-produto
title: Regra do Produto
sidebar_label: Regra do Produto
---

## O que e

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
- Modelar cenarios com dependencia ou independencia
- Base para arvores de probabilidade e cadeias de eventos

## Como funciona

Voce multiplica:

1. Probabilidade do primeiro evento.
2. Probabilidade do segundo considerando o primeiro.

Exemplo com urna sem reposicao (3 bolas azuis, 2 vermelhas):

- Probabilidade de tirar azul na 1a: $P(A) = 3/5$
- Probabilidade de tirar azul na 2a, sabendo que ja saiu azul: $P(B \mid A) = 2/4$

Entao:

$$
P(\text{azul e azul}) = \frac{3}{5} \cdot \frac{2}{4} = \frac{3}{10}
$$

## Analogia Intuitiva (OBRIGATORIA)

Pense em dois postos de fiscalizacao em uma estrada. Para um carro passar pelos dois, ele precisa passar no primeiro posto e, depois disso, passar no segundo. A chance final e o produto dessas etapas.

## Exemplo Pratico Real

Em um pipeline de deploy:

- Chance de build passar: $P(B) = 0{,}9$
- Chance de testes passarem dado que o build passou: $P(T \mid B) = 0{,}8$

Chance de build e testes passarem no mesmo ciclo:

$$
P(B \cap T) = 0{,}9 \cdot 0{,}8 = 0{,}72
$$

Ou seja, 72% de chance de sucesso conjunto.

## Ponto de Atencao / Pegadinha de Prova

- Nao multiplique probabilidades "soltas" sem verificar dependencia.
- Sem reposicao normalmente gera dependencia.
- Em prova, frases com "e" (evento conjunto) costumam pedir $P(A \cap B)$.
- Se a questao afirmar independencia, pode usar diretamente $P(A) \cdot P(B)$.
