---
id: funcao-discreta-probabilidade
title: Função Discreta de Probabilidade
sidebar_label: Função Discreta de Probabilidade
---

## O que é

A **função discreta de probabilidade** (também chamada de função massa de probabilidade, PMF) descreve a probabilidade de cada valor possível de uma variável aleatória discreta.

Para uma variável $X$, a função é:

$$
p(x) = P(X = x)
$$

Ela precisa obedecer:

$$
0 \le p(x) \le 1
$$

$$
\sum_x p(x) = 1
$$

## Para que serve

A função discreta de probabilidade serve para:

- calcular probabilidades pontuais, como $P(X=2)$;
- calcular probabilidades de intervalos, somando valores da função;
- derivar métricas como valor esperado e variância;
- comparar comportamentos de processos discretos no mundo real.

## Como funciona

1. Defina a variável aleatória discreta $X$.
2. Liste os valores possíveis de $X$.
3. Associe uma probabilidade para cada valor.
4. Verifique se todas as probabilidades são não negativas.
5. Verifique se a soma total é 1.

Exemplo de cálculo de intervalo:

$$
P(1 \le X \le 2) = P(X=1) + P(X=2)
$$

## Analogia Intuitiva (OBRIGATÓRIA)

Imagine uma portaria que registra quantos visitantes chegam por hora e mantém um painel com as chances históricas:

- 0 visitantes: 10%
- 1 visitante: 35%
- 2 visitantes: 40%
- 3 visitantes: 15%

Esse painel é exatamente a função discreta de probabilidade: um mapa de probabilidade para cada contagem possível.

## Exemplo Prático Real

Considere $X =$ número de falhas críticas por dia em um serviço.

| $x$ | $p(x)=P(X=x)$ |
| --- | ------------- |
| 0   | 0,50          |
| 1   | 0,30          |
| 2   | 0,15          |
| 3   | 0,05          |

Validação:

$$
0{,}50 + 0{,}30 + 0{,}15 + 0{,}05 = 1
$$

Probabilidade de ocorrer pelo menos uma falha:

$$
P(X \ge 1) = 1 - P(X=0) = 1 - 0{,}50 = 0{,}50
$$

Código Python:

```python
# PMF de X = numero de falhas criticas por dia
pmf = {0: 0.50, 1: 0.30, 2: 0.15, 3: 0.05}

# Verifica se a soma das probabilidades eh 1
soma = sum(pmf.values())
print(f"Soma das probabilidades: {soma:.2f}")

# Calcula P(X >= 1)
p_x_maior_igual_1 = sum(prob for x, prob in pmf.items() if x >= 1)
print(f"P(X >= 1) = {p_x_maior_igual_1:.2f}")
```

## Pontos de Atenção

- ⚠️ Não confundir PMF com função densidade (esta é para variáveis contínuas).
- ⚠️ Se a soma das probabilidades não for 1, a função está inválida.
- ⚠️ Probabilidades negativas ou maiores que 1 invalidam o modelo.
- ✅ Sempre valide a tabela antes de calcular média, variância ou probabilidades acumuladas.

## Referências para Aprofundamento

- Morettin, P. A.; Bussab, W. O. — _Estatística Básica_.
- Ross, S. — _A First Course in Probability_.
- DeGroot, M. H.; Schervish, M. J. — _Probability and Statistics_.
- Khan Academy — Discrete random variables and PMF: <a href="https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library" target="_blank" rel="noopener noreferrer">khanacademy.org</a>
