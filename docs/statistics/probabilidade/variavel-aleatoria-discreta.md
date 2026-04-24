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

## Analogia Intuitiva (OBRIGATÓRIA)

Pense em um aeroporto com vários voos chegando. O evento completo é complexo (horário, companhia, portão, origem), mas você decide observar apenas **quantos voos atrasaram** no período.

A variável aleatória discreta faz esse papel: ela pega um cenário cheio de detalhes e converte em um número objetivo para análise.

## Exemplo Prático Real

Uma central de suporte mede a quantidade de chamados críticos por dia.

Defina $X =$ número de chamados críticos em um dia. Em uma amostra histórica, foi observado:

| Valor de $X$ | Significado                      |
| ------------ | -------------------------------- |
| 0            | nenhum chamado crítico no dia    |
| 1            | um chamado crítico               |
| 2            | dois chamados críticos           |
| 3            | três chamados críticos ou mais   |

Código Python para representar os possíveis valores:

```python
# Valores possíveis para X = numero de chamados criticos por dia
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

- Morettin, P. A.; Bussab, W. O. — *Estatística Básica*.
- DeGroot, M. H.; Schervish, M. J. — *Probability and Statistics*.
- Ross, S. — *A First Course in Probability*.
- MIT OpenCourseWare — Probability and Random Variables: <a href="https://ocw.mit.edu" target="_blank" rel="noopener noreferrer">ocw.mit.edu</a>
