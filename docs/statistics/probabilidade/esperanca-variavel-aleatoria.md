---
id: esperanca-variavel-aleatoria
title: Esperança da Variável Aleatória
sidebar_label: Esperança da Variável Aleatória
---

## O que é

A **esperança da variável aleatória**, também chamada de **valor esperado** ou **média teórica**, é o valor médio que se espera observar no longo prazo ao repetir o experimento muitas vezes.

Para uma variável aleatória discreta $X$, com função de probabilidade $P(X=x)$, a esperança é:

$$
E(X) = \sum_x x \cdot P(X=x)
$$

Onde:

- $x$ representa cada valor possível da variável;
- $P(X=x)$ representa a probabilidade associada a esse valor.

## Para que serve

- Resumir, em um único número, o comportamento médio de um processo aleatório.
- Apoiar decisões de negócio, risco, custo e retorno esperado.
- Comparar cenários probabilísticos diferentes.
- Servir de base para outros conceitos, como variância e desvio padrão.

## Como funciona

A esperança é uma **média ponderada**: valores mais prováveis pesam mais no resultado final.

Passos:

1. Liste os valores possíveis da variável aleatória.
2. Associe a probabilidade de cada valor.
3. Multiplique cada valor por sua probabilidade.
4. Some todos os produtos.

Exemplo curto:

Se $X$ pode assumir os valores 0, 1 e 2 com probabilidades 0,2; 0,5 e 0,3, então:

$$
E(X) = 0 \cdot 0{,}2 + 1 \cdot 0{,}5 + 2 \cdot 0{,}3 = 1{,}1
$$

Isso não significa que $X$ sempre assumirá 1,1. Significa que, em média, esse é o valor central esperado ao longo de muitas repetições.

## Analogia Intuitiva

Pense em um pedágio com várias faixas e tempos diferentes de atendimento. Algumas faixas são rápidas, outras lentas, e cada uma é usada com certa frequência. A esperança funciona como o tempo médio ponderado de atendimento: não precisa ser exatamente o tempo de uma faixa específica, mas resume o comportamento esperado do sistema no longo prazo.

## Exemplo Prático Real

### Exemplo real

Ao lançar 3 moedas, seja $X$ o número de caras obtidas. A distribuição de $X$ é:

| $x$ | $P(X=x)$ |
| --- | -------- |
| 0   | 0,125    |
| 1   | 0,375    |
| 2   | 0,375    |
| 3   | 0,125    |

A esperança é:

$$
E(X) = 0 \cdot 0{,}125 + 1 \cdot 0{,}375 + 2 \cdot 0{,}375 + 3 \cdot 0{,}125 = 1{,}5
$$

Interpretação: no longo prazo, espera-se em média 1,5 cara a cada conjunto de 3 lançamentos.

Código Python:

```python
# PMF de X = numero de caras em 3 lancamentos de moeda
pmf = {0: 0.125, 1: 0.375, 2: 0.375, 3: 0.125}

# Calcula E(X) como media ponderada
esperanca = sum(valor * probabilidade for valor, probabilidade in pmf.items())
print(f"E(X) = {esperanca:.2f}")
```

### Exemplo simples

Considere um jogo em que:

- você ganha R$ 10 com probabilidade 0,2;
- ganha R$ 2 com probabilidade 0,5;
- não ganha nada com probabilidade 0,3.

Se $X$ representa o ganho, então:

$$
E(X) = 10 \cdot 0{,}2 + 2 \cdot 0{,}5 + 0 \cdot 0{,}3 = 3
$$

O ganho esperado por rodada é R$ 3.

## Pontos de Atenção

- ⚠️ A esperança não precisa ser um valor que a variável realmente assume.
- ⚠️ Valor esperado não significa garantia de resultado individual.
- ⚠️ Para variáveis contínuas, a fórmula muda de soma para integral.
- ✅ Em distribuições conhecidas, a esperança costuma ter forma fechada; por exemplo, na Bernoulli é $E(X)=p$ e na Binomial é $E(X)=np$.

## Referências para Aprofundamento

- Morettin, P. A.; Bussab, W. O. — _Estatística Básica_.
- DeGroot, M. H.; Schervish, M. J. — _Probability and Statistics_.
- Ross, S. — _Introduction to Probability Models_.
- Khan Academy, Expected value: <a href="https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library/expected-value-basic" target="_blank" rel="noopener noreferrer">introdução com exemplos curtos</a>
