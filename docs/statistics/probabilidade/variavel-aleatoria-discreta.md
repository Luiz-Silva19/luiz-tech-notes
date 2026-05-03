---
id: variavel-aleatoria-discreta
title: Variável Aleatória Discreta
sidebar_label: Variável Aleatória Discreta
---

## O que é

Uma **variável aleatória discreta** é uma função que associa, a cada resultado de um experimento aleatório, um valor numérico de um conjunto **finito** ou **contável**.

Em termos formais, se $\Omega$ é o espaço amostral, uma variável aleatória $X$ é uma função:

$$
X: \Omega \rightarrow \mathbb{R}
$$

No caso discreto, os valores possíveis de $X$ podem ser listados, como $\{0,1,2,3\}$ ou $\{1,2,3,\ldots\}$.

## Para que serve

A variável aleatória discreta serve para:

- transformar eventos em números, facilitando cálculo e modelagem;
- resumir fenômenos aleatórios por métricas como média e variância;
- construir modelos probabilísticos usados em estatística, ciência de dados e engenharia;
- conectar problemas reais a distribuições clássicas (Bernoulli, Binomial, Poisson).

## Como funciona

1. Defina o experimento aleatório.
2. Defina os resultados possíveis em $\Omega$.
3. Crie uma regra numérica $X(\omega)$ para cada resultado $\omega \in \Omega$.
4. Liste os valores possíveis de $X$.
5. Para cada valor, calcule a probabilidade correspondente (tema da função discreta de probabilidade).

Exemplo estrutural:

- Experimento: lançar 3 moedas.
- Definição: $X =$ número de caras.
- Valores possíveis: $X \in \{0,1,2,3\}$.

## Analogia Intuitiva

Pense em uma caixa com três moedas sendo lançadas ao mesmo tempo. O resultado completo pode ser algo como cara-cara-coroa ou coroa-cara-coroa, mas você decide observar apenas **quantas caras apareceram**.

A variável aleatória discreta faz esse papel: ela pega um cenário cheio de detalhes e converte em um número objetivo para análise.

## Exemplo Prático

Considere o experimento de lançar 3 moedas.

Defina $X =$ número de caras obtidas. Os valores possíveis são:

| Valor de $X$ | Significado  |
| ------------ | ------------ |
| 0            | nenhuma cara |
| 1            | uma cara     |
| 2            | duas caras   |
| 3            | três caras   |

Código Python para representar os possíveis valores:

```python
# Valores possiveis para X = numero de caras em 3 lancamentos
valores_x = [0, 1, 2, 3]

# Exibe os valores discretos possiveis da variavel aleatoria
print("Valores possiveis de X:", valores_x)
```

## Pontos de Atenção

- ⚠️ Variável aleatória **não é** o resultado bruto do experimento; é uma função sobre esse resultado.
- ⚠️ Nem toda variável aleatória é discreta; quando assume valores em intervalo contínuo, ela é contínua.
- ⚠️ Em modelagem, garanta que os valores possíveis sejam coerentes com o problema (ex.: contagens não podem ser negativas).
- ✅ Definir bem o significado de $X$ evita ambiguidade nos cálculos seguintes.

## Referências para Aprofundamento

- Morettin, P. A.; Bussab, W. O. — _Estatística Básica_.
- DeGroot, M. H.; Schervish, M. J. — _Probability and Statistics_.
- Ross, S. — _A First Course in Probability_.
- MIT OpenCourseWare — Probability and Random Variables: <a href="https://ocw.mit.edu" target="_blank" rel="noopener noreferrer">ocw.mit.edu</a>
