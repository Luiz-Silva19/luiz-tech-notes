---
id: probabilidade-total
title: Probabilidade Total
sidebar_label: Probabilidade Total
---

## O que é

A **Lei da Probabilidade Total** permite calcular a probabilidade de um evento $A$ quando você não consegue medi-la diretamente — mas sabe como $A$ se comporta dentro de cada parte de uma [partição do espaço amostral](particao-espaco-amostral).

Se $B_1, B_2, \ldots, B_n$ formam uma partição de $\Omega$, então:

$$
P(A) = \sum_{i=1}^{n} P(A \mid B_i) \cdot P(B_i)
$$

Cada parcela $P(A \mid B_i) \cdot P(B_i)$ representa a contribuição que o grupo $B_i$ dá para a ocorrência de $A$.

## Analogia

Imagine que você quer saber a probabilidade de um produto chegar com defeito na loja. Existem três fornecedores (A, B, C), cada um com uma taxa de defeito diferente. Você não vê qual fornecedor enviou — mas conhece a fatia de mercado de cada um e a taxa de defeito de cada um.

A probabilidade total de defeito é a **média ponderada** das taxas, usando as fatias de mercado como peso.

## Exemplo concreto

Uma fábrica tem três linhas de produção que formam uma partição:

| Linha | Participação na produção | Taxa de defeito |
| ----- | ------------------------ | --------------- |
| $B_1$ | 50 %                     | 2 %             |
| $B_2$ | 30 %                     | 5 %             |
| $B_3$ | 20 %                     | 10 %            |

Qual a probabilidade de um produto sorteado aleatoriamente ter defeito?

$$
P(A) = P(A \mid B_1) \cdot P(B_1) + P(A \mid B_2) \cdot P(B_2) + P(A \mid B_3) \cdot P(B_3)
$$

$$
P(A) = 0{,}02 \cdot 0{,}50 + 0{,}05 \cdot 0{,}30 + 0{,}10 \cdot 0{,}20
$$

$$
P(A) = 0{,}010 + 0{,}015 + 0{,}020 = 0{,}045
$$

Há **4,5 % de chance** de o produto ter defeito.

## Passo a passo

1. Identifique os eventos $B_i$ que formam a partição (mutuamente exclusivos e exaustivos)
2. Obtenha $P(B_i)$ para cada grupo
3. Obtenha $P(A \mid B_i)$ — a probabilidade de $A$ dentro de cada grupo
4. Some os produtos: $\sum P(A \mid B_i) \cdot P(B_i)$

## Código Python

```python
# Probabilidade Total
p_b = [0.50, 0.30, 0.20]          # participação de cada linha
p_a_dado_b = [0.02, 0.05, 0.10]   # taxa de defeito em cada linha

p_a = sum(pa * pb for pa, pb in zip(p_a_dado_b, p_b))
print(f"P(A) = {p_a:.4f}")  # 0.0450
```

## Referências para Aprofundamento

- Morettin, P. A.; Bussab, W. O. — _Estatística Básica_, cap. 5
- DeGroot, M. H.; Schervish, M. J. — _Probability and Statistics_, cap. 2
- Walpole, R. E. et al. — _Probability & Statistics for Engineers and Scientists_, cap. 2
