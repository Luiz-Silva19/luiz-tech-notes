---
id: distribuicao-bernoulli
title: Distribuição de Bernoulli
sidebar_label: Distribuição de Bernoulli
---

## O que é

A **Distribuição de Bernoulli** modela experimentos com apenas dois resultados possíveis:

- sucesso, representado por $1$;
- fracasso, representado por $0$.

Seja $X$ uma variável aleatória tal que:

$$
X \in \{0, 1\}
$$

e seja $p = P(X=1)$ a probabilidade de sucesso. Então:

$$
P(X=1) = p
$$

$$
P(X=0) = 1 - p
$$

Uma forma compacta de escrever a função de probabilidade é:

$$
P(X=x) = p^x (1-p)^{1-x}, \quad x \in \{0,1\}
$$

## Para que serve

- Modelar eventos binários, como aprovar ou reprovar, clicar ou não clicar, falhar ou não falhar.
- Servir de base para distribuições mais ricas, como a [Distribuição Binomial](distribuicao-binomial).
- Representar variáveis indicadoras em estatística e ciência de dados.
- Calcular métricas como média esperada e variância em experimentos simples.

## Como funciona

A ideia é simples: cada observação do experimento gera apenas um entre dois estados.

Passos práticos:

1. Defina claramente o que é sucesso e o que é fracasso.
2. Associe valor $1$ ao sucesso e valor $0$ ao fracasso.
3. Defina a probabilidade de sucesso $p$.
4. Use $1-p$ como probabilidade de fracasso.

Exemplo de interpretação:

- $X = 1$: o pagamento foi aprovado.
- $X = 0$: o pagamento foi recusado.

Se a taxa histórica de aprovação é 92%, então:

$$
P(X=1) = 0{,}92
$$

$$
P(X=0) = 0{,}08
$$

## Analogia Intuitiva

Pense em uma catraca de metrô: a pessoa aproxima o cartão e o sistema só tem dois desfechos relevantes naquele instante, liberar ou bloquear a passagem. A distribuição de Bernoulli é esse retrato mínimo do processo: um único teste, com apenas dois resultados possíveis.

## Exemplo Prático Real

### Exemplo real

Em uma plataforma de e-commerce, cada tentativa de pagamento pode ser tratada como:

- sucesso: pagamento aprovado ($X=1$);
- fracasso: pagamento recusado ($X=0$).

Se a taxa histórica de aprovação é 0,92, então a variável $X$ segue uma Bernoulli com parâmetro $p=0{,}92$.

Código Python:

```python
# X representa o resultado de uma tentativa de pagamento
# 1 = aprovado, 0 = recusado
p = 0.92

prob_aprovado = p
prob_recusado = 1 - p

print(f"P(X=1) = {prob_aprovado:.2f}")
print(f"P(X=0) = {prob_recusado:.2f}")
```

### Exemplo simples

No lançamento de uma moeda, defina:

- $X=1$ se sair cara;
- $X=0$ se sair coroa.

Para uma moeda justa:

$$
P(X=1) = 0{,}5
$$

$$
P(X=0) = 0{,}5
$$

## Pontos de Atenção

- ⚠️ Bernoulli descreve **um único experimento** binário; quando há várias repetições independentes, normalmente entra a Binomial.
- ⚠️ O parâmetro $p$ precisa satisfazer $0 \le p \le 1$.
- ⚠️ Definir mal o que é sucesso pode gerar interpretação errada do modelo.
- ✅ Variáveis indicadoras em muitos modelos estatísticos são Bernoulli.

## Referências para Aprofundamento

- Ross, S. — _A First Course in Probability_.
- DeGroot, M. H.; Schervish, M. J. — _Probability and Statistics_.
- OpenIntro Statistics: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">material introdutório com exemplos de distribuições discretas</a>
- Stat Trek, Bernoulli Distribution: <a href="https://stattrek.com/probability-distributions/bernoulli" target="_blank" rel="noopener noreferrer">visão prática da distribuição e suas propriedades</a>
