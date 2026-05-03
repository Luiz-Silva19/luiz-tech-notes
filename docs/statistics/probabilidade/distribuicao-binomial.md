---
id: distribuicao-binomial
title: Distribuição Binomial
sidebar_label: Distribuição Binomial
---

## O que é

A **Distribuição Binomial** modela o número de sucessos em $n$ tentativas independentes de um experimento de Bernoulli, todas com a mesma probabilidade de sucesso $p$.

Seja $X$ o número de sucessos em $n$ tentativas. Então:

$$
X \sim Bin(n, p)
$$

e a probabilidade de observar exatamente $k$ sucessos é:

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}
$$

onde:

- $n$ é o número total de tentativas;
- $k$ é o número de sucessos desejado;
- $p$ é a probabilidade de sucesso em cada tentativa;
- $\binom{n}{k}$ conta quantas formas existem de distribuir $k$ sucessos entre $n$ posições.

## Para que serve

- Estimar quantos eventos de sucesso devem ocorrer em vários testes repetidos.
- Modelar conversões, aprovações, defeitos, cliques e acertos em questões.
- Calcular probabilidades de exatamente, no máximo ou pelo menos certa quantidade de sucessos.
- Relacionar repetição de experimentos Bernoulli com medidas como média esperada $np$.

## Como funciona

A distribuição binomial combina duas ideias:

1. Cada tentativa individual é um experimento de Bernoulli.
2. O que interessa é a contagem total de sucessos ao final de $n$ repetições.

Para usar corretamente a Binomial, o cenário precisa respeitar estas condições:

1. Há um número fixo de tentativas $n$.
2. Cada tentativa tem apenas dois resultados relevantes.
3. As tentativas são independentes.
4. A probabilidade de sucesso $p$ é a mesma em todas as tentativas.

Exemplo rápido:

- lançar uma moeda justa 4 vezes;
- contar quantas vezes sai cara.

A probabilidade de sair exatamente 2 caras é:

$$
P(X=2) = \binom{4}{2}(0{,}5)^2(0{,}5)^2 = 6 \times 0{,}0625 = 0{,}375
$$

## Analogia Intuitiva

Imagine 10 arremessos de uma moeda. Cada lançamento individual é um caso de Bernoulli: cara ou coroa. A distribuição binomial entra quando você quer saber quantas caras apareceram ao final dos 10 lançamentos.

## Exemplo Prático Real

### Exemplo real

Um aluno chuta 5 questões de verdadeiro ou falso. Como cada questão tem 50% de chance de acerto, qual a probabilidade de ele acertar exatamente 3 questões?

Defina:

- $n = 5$;
- $k = 3$;
- $p = 0{,}5$.

Aplicando a fórmula:

$$
P(X = 3) = \binom{5}{3}(0{,}5)^3(0{,}5)^2
$$

Valor aproximado:

$$
P(X = 3) = 10 \cdot 0{,}03125 = 0{,}3125
$$

Código Python:

```python
from math import comb

# X representa o numero de acertos em 5 questoes
n = 5
k = 3
p = 0.5

probabilidade = comb(n, k) * (p ** k) * ((1 - p) ** (n - k))
print(f"P(X=3) = {probabilidade:.4f}")
```

### Exemplo simples

Ao lançar uma moeda justa 3 vezes, qual a probabilidade de obter exatamente 2 caras?

$$
P(X=2) = \binom{3}{2}(0{,}5)^2(0{,}5)^1 = 3 \times 0{,}125 = 0{,}375
$$

## Pontos de Atenção

- ⚠️ A Binomial exige independência entre as tentativas; sem isso, o modelo pode ficar inadequado.
- ⚠️ A probabilidade de sucesso precisa permanecer constante em todas as repetições.
- ⚠️ Não confunda $k$ com probabilidade; $k$ é contagem de sucessos.
- ✅ Quando $n=1$, a distribuição binomial vira uma [Distribuição de Bernoulli](distribuicao-bernoulli).

## Referências para Aprofundamento

- Morettin, P. A.; Bussab, W. O. — _Estatística Básica_.
- Ross, S. — _A First Course in Probability_.
- OpenStax, Introductory Statistics: <a href="https://openstax.org/details/books/introductory-statistics" target="_blank" rel="noopener noreferrer">capítulos introdutórios sobre distribuições discretas</a>
- NIST/SEMATECH e-Handbook, Binomial Distribution: <a href="https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm" target="_blank" rel="noopener noreferrer">referência técnica sobre propriedades e uso</a>
