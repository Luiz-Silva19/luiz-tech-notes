---
id: teorema-de-bayes
title: Teorema de Bayes
sidebar_label: Teorema de Bayes
---

## O que é

Se a [Probabilidade Total](probabilidade-total) soma os caminhos para chegar em um evento, o Teorema de Bayes faz o caminho inverso:

> 👉 você observa o resultado e quer descobrir de onde ele veio.

O **Teorema de Bayes** inverte uma probabilidade condicional: dado que o evento $A$ ocorreu, qual é a probabilidade de ter sido o grupo $B_k$ o responsável?

$$
P(B_k \mid A) = \frac{P(A \mid B_k) \cdot P(B_k)}{P(A)}
$$

Onde $P(A)$ é calculado pela [Probabilidade Total](probabilidade-total):

$$
P(A) = \sum_{i=1}^{n} P(A \mid B_i) \cdot P(B_i)
$$

A fórmula completa ficando:

$$
P(B_k \mid A) = \frac{P(A \mid B_k) \cdot P(B_k)}{\displaystyle\sum_{i=1}^{n} P(A \mid B_i) \cdot P(B_i)}
$$

## Os termos têm nome

| Termo           | Nome                                       | Significado                                  |
| --------------- | ------------------------------------------ | -------------------------------------------- |
| $P(B_k)$        | **Prior** (probabilidade a priori)         | o que você sabe antes de ver a evidência     |
| $P(A \mid B_k)$ | **Verossimilhança**                        | quão provável é a evidência dado $B_k$       |
| $P(B_k \mid A)$ | **Posterior** (probabilidade a posteriori) | o que você conclui depois de ver a evidência |
| $P(A)$          | **Evidência**                              | probabilidade total da evidência observada   |

## Analogia

Imagine uma escola com três turmas. Você sabe o tamanho relativo de cada turma e também a proporção de alunos com óculos em cada uma. Depois de sortear um aluno e perceber que ele usa óculos, o Teorema de Bayes permite atualizar a chance de ele pertencer a cada turma.

Bayes é, em essência, **aprender com evidências**: você parte de uma crença inicial (prior), observa algo (evidência), e chega a uma crença atualizada (posterior).

## Exemplo concreto

Usando o mesmo exemplo da [Probabilidade Total](probabilidade-total):

| Turma | $P(B_i)$ | $P(\text{óculos} \mid B_i)$ |
| ----- | -------- | --------------------------- |
| $B_1$ | 0,50     | 0,02                        |
| $B_2$ | 0,30     | 0,05                        |
| $B_3$ | 0,20     | 0,10                        |

Já calculamos $P(\text{óculos}) = 0{,}045$.

**Pergunta:** um aluno sorteado usa óculos. Qual a probabilidade de ele ser da turma $B_3$?

$$
P(B_3 \mid \text{óculos}) = \frac{P(\text{óculos} \mid B_3) \cdot P(B_3)}{P(\text{óculos})}
$$

$$
P(B_3 \mid \text{óculos}) = \frac{0{,}10 \times 0{,}20}{0{,}045} = \frac{0{,}020}{0{,}045} \approx 0{,}444
$$

Embora a turma $B_3$ represente apenas 20 % dos alunos, ela responde por **44,4 % dos casos de alunos com óculos**.

## Verificação: a soma dos posteriors deve ser 1

$$
P(B_1 \mid A) = \frac{0{,}02 \times 0{,}50}{0{,}045} = \frac{0{,}010}{0{,}045} \approx 0{,}222
$$

$$
P(B_2 \mid A) = \frac{0{,}05 \times 0{,}30}{0{,}045} = \frac{0{,}015}{0{,}045} \approx 0{,}333
$$

$$
0{,}222 + 0{,}333 + 0{,}444 = 0{,}999 \approx 1 \checkmark
$$

## Código Python

```python
# Teorema de Bayes
p_b = [0.50, 0.30, 0.20]
p_a_dado_b = [0.02, 0.05, 0.10]

p_a = sum(pa * pb for pa, pb in zip(p_a_dado_b, p_b))

for i, (pa, pb) in enumerate(zip(p_a_dado_b, p_b), start=1):
    posterior = (pa * pb) / p_a
    print(f"P(B{i} | oculos) = {posterior:.4f}")
# P(B1 | oculos) = 0.2222
# P(B2 | oculos) = 0.3333
# P(B3 | oculos) = 0.4444
```

## Passo a passo

1. Defina a partição $B_1, \ldots, B_n$ e obtenha os priors $P(B_i)$
2. Obtenha as verossimilhanças $P(A \mid B_i)$
3. Calcule $P(A)$ pela Probabilidade Total
4. Aplique a fórmula de Bayes para o grupo de interesse $B_k$
5. Verifique: a soma de todos os posteriors deve ser 1

## Referências para Aprofundamento

- Morettin, P. A.; Bussab, W. O. — _Estatística Básica_, cap. 5
- DeGroot, M. H.; Schervish, M. J. — _Probability and Statistics_, cap. 2
- Sivia, D. S.; Skilling, J. — _Data Analysis: A Bayesian Tutorial_
- 3Blue1Brown — _The Bayesian Trap_ (YouTube): visualização intuitiva do teorema
