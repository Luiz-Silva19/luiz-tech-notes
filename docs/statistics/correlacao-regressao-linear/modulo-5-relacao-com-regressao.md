---
id: modulo-5-relacao-com-regressao
title: Módulo 5 - Relação entre Correlação e Regressão
sidebar_label: M5 - Relação com Regressão
---

## O que é

Este módulo conecta correlação com regressão linear simples por meio da decomposição da variabilidade e do coeficiente de determinação $R^2$.

## Para que serve

- Entender quanto da variabilidade de $Y$ é explicada pelo modelo.
- Relacionar força de associação ($r$) com poder explicativo ($R^2$).
- Melhorar interpretação de modelos lineares.

## Como funciona

### 12. Decomposição da Variabilidade

Na regressão linear simples:

$$
SQ_{Total} = SQ_{Reg} + SQ_{Res}
$$

onde:

- $SQ_{Total}$: variabilidade total de $Y$ em torno de $\bar{Y}$.
- $SQ_{Reg}$: parte explicada pela reta de regressão.
- $SQ_{Res}$: parte não explicada (resíduos).

### 13. Coeficiente de Determinação ($R^2$)

$$
R^2 = \frac{SQ_{Reg}}{SQ_{Total}} = 1 - \frac{SQ_{Res}}{SQ_{Total}}
$$

- Interpretação: proporção da variabilidade de $Y$ explicada pelo modelo.
- Em regressão linear simples com intercepto: $R^2 = r^2$.
- Poder explicativo maior implica menor erro residual relativo.

## Analogia Intuitiva

Pense em orçamento de uma cidade: o gasto total é dividido em parte planejada e parte de imprevistos. A regressão tenta explicar o "gasto total" por fatores observados, e $R^2$ indica quanto do total foi realmente coberto pelo plano.

## Exemplo Prático Real

Em marketing, modele conversões ($Y$) a partir de investimento em anúncios ($X$).

Se $R^2 = 0{,}64$, significa que 64% da variabilidade de conversões é explicada pelo investimento no modelo linear adotado.

```python
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([10, 12, 15, 18, 20]).reshape(-1, 1)  # investimento
Y = np.array([30, 34, 39, 45, 48])                 # conversões

modelo = LinearRegression().fit(X, Y)
print(f"R²: {modelo.score(X, Y):.3f}")
```

## Pontos de Atenção

- $R^2$ alto não garante causalidade nem ausência de viés.
- $R^2$ baixo não invalida modelo em fenômenos naturalmente ruidosos.
- Sempre verificar resíduos e pressupostos da regressão.
- Em modelos múltiplos, considerar também $R^2$ ajustado.

## Referências para Aprofundamento

- ISLR (Introduction to Statistical Learning): <a href="https://www.statlearning.com/" target="_blank" rel="noopener noreferrer">capítulos de regressão e interpretação de $R^2$</a>
- Penn State STAT 501: <a href="https://online.stat.psu.edu/stat501/" target="_blank" rel="noopener noreferrer">decomposição de variância e ANOVA da regressão</a>
- NIST e-Handbook, Regression: <a href="https://www.itl.nist.gov/div898/handbook/" target="_blank" rel="noopener noreferrer">referência técnica em regressão linear</a>
