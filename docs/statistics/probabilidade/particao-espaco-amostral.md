---
id: particao-espaco-amostral
title: Partição do Espaço Amostral
sidebar_label: Partição do Espaço Amostral
---

## O que é

Uma **partição do espaço amostral** é uma divisão do conjunto de todos os resultados possíveis em grupos que:

- **não se sobrepõem** — cada resultado pertence a exatamente um grupo
- **cobrem tudo** — a união de todos os grupos forma o espaço amostral completo

Formalmente, dado o espaço amostral $\Omega$, os eventos $B_1, B_2, \ldots, B_n$ formam uma partição se:

$$
B_i \cap B_j = \emptyset \quad \text{para } i \neq j
$$

$$
B_1 \cup B_2 \cup \cdots \cup B_n = \Omega
$$

$$
P(B_i) > 0 \quad \text{para todo } i
$$

## Analogia

Imagine um pizza inteira cortada em fatias. Cada fatia é uma parte da partição:

- as fatias **não se sobrepõem** (nenhum pedaço pertence a duas fatias ao mesmo tempo)
- juntas, **formam a pizza completa** (nenhuma parte fica de fora)

Isso é exatamente o que uma partição faz com o espaço amostral.

## Exemplo concreto

No lançamento de um dado justo, podemos dividir os resultados em três grupos mutuamente exclusivos e exaustivos:

| Categoria | Descrição   | P(categoria) |
| --------- | ----------- | ------------ |
| $B_1$     | sair 1 ou 2 | 2/6          |
| $B_2$     | sair 3 ou 4 | 2/6          |
| $B_3$     | sair 5 ou 6 | 2/6          |

$B_1$, $B_2$ e $B_3$ formam uma partição de $\Omega$ porque:

- são mutuamente exclusivos: um mesmo resultado do dado não pode pertencer a dois grupos ao mesmo tempo
- são exaustivos: $P(B_1) + P(B_2) + P(B_3) = 2/6 + 2/6 + 2/6 = 1$

## Por que isso importa

A partição é a base para a **Probabilidade Total** e o **Teorema de Bayes**. Sem definir corretamente os grupos que dividem o espaço amostral, os cálculos seguintes perdem sentido.

## Referências para Aprofundamento

- Morettin, P. A.; Bussab, W. O. — _Estatística Básica_, cap. 5
- DeGroot, M. H.; Schervish, M. J. — _Probability and Statistics_, cap. 2
- Khan Academy — Partição e probabilidade total (em inglês): [khanacademy.org](https://www.khanacademy.org)
