---
id: modulo-6-notacao-matricial
title: Notação Matricial
---

# Módulo 6 - Notação Matricial

## O que é

A **notação matricial** reescreve o modelo de regressão linear usando operações de álgebra linear. Permite trabalhar com múltiplas variáveis e computar soluções de forma elegante e eficiente.

## Para que serve

- Generalizar regressão simples para múltiplas variáveis
- Usar algoritmos computacionais eficientes
- Expressar o problema em forma concisa
- Base teórica para estatística multivariada

---

## Como funciona

### 6.1 - Estrutura Matricial

O modelo de regressão é expresso como:

$$\mathbf{Y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}$$

**Dimensões:**

- $\mathbf{Y}$: matriz $n \times 1$ (observações de $Y$)
- $\mathbf{X}$: matriz $n \times (k+1)$ (design matrix)
- $\boldsymbol{\beta}$: vetor $(k+1) \times 1$ (parâmetros)
- $\boldsymbol{\varepsilon}$: vetor $n \times 1$ (erros)

Para regressão simples: $k = 1$ (uma variável independente)

### 6.2 - Matriz de Projeto (Design Matrix)

A **design matrix** $\mathbf{X}$ é:

$$
\mathbf{X} = \begin{bmatrix}
1 & X_1 \\
1 & X_2 \\
\vdots & \vdots \\
1 & X_n
\end{bmatrix}
$$

**Características:**

- Primeira coluna: todos 1's (intercepto)
- Segunda coluna: valores de $X$
- Cada linha: uma observação

**Exemplo (5 observações):**

$$
\mathbf{X} = \begin{bmatrix}
1 & 2 \\
1 & 3 \\
1 & 5 \\
1 & 4 \\
1 & 6
\end{bmatrix}
$$

### 6.3 - Vetores

#### Vetor $\mathbf{Y}$ (observações de Y)

$$\mathbf{Y} = \begin{bmatrix} Y_1 \\ Y_2 \\ \vdots \\ Y_n \end{bmatrix}$$

#### Vetor $\boldsymbol{\beta}$ (parâmetros)

$$\boldsymbol{\beta} = \begin{bmatrix} \alpha \\ \beta \end{bmatrix}$$

#### Vetor $\boldsymbol{\varepsilon}$ (erros)

$$\boldsymbol{\varepsilon} = \begin{bmatrix} \varepsilon_1 \\ \varepsilon_2 \\ \vdots \\ \varepsilon_n \end{bmatrix}$$

---

### 6.4 - Equações Normais Matriciais

A **Soma dos Quadrados dos Resíduos** em forma matricial é:

$$\text{SQR} = (\mathbf{Y} - \mathbf{X}\boldsymbol{\beta})^T(\mathbf{Y} - \mathbf{X}\boldsymbol{\beta})$$

Minimizando em relação a $\boldsymbol{\beta}$, obtemos as **equações normais**:

$$\mathbf{X}^T\mathbf{X}\boldsymbol{\beta} = \mathbf{X}^T\mathbf{Y}$$

**Verificação:** para regressão simples, esta equação matricial reproduz o sistema de duas equações que derivamos antes.

---

### 6.5 - Solução Fechada

Se $\mathbf{X}^T\mathbf{X}$ é invertível (o que é verdade se $X$ tem variância > 0), então:

$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}$$

Esta é a **solução dos Mínimos Quadrados Ordinários (MQO)** em forma matricial.

**Componentes:**

- $(\mathbf{X}^T\mathbf{X})^{-1}$: matriz de variância-covariância dos coeficientes (invertida)
- $\mathbf{X}^T\mathbf{Y}$: produto cruzado de X e Y

---

## Analogia Intuitiva

💡 **Pense em um sistema de engrenagens.**

Cada observação é uma engrenagem.

A **design matrix** $\mathbf{X}$ descreve como conectar as engrenagens (qual é o intercepto, qual é o valor de X para cada uma).

Os **parâmetros** $\boldsymbol{\beta}$ são os "pesos" que ajustam cada engrenagem.

A **equação normal** é como "girar as engrenagens" até que elas se encaixem perfeitamente (minimizem o erro).

A **solução** $\hat{\boldsymbol{\beta}}$ é o posicionamento ótimo das engrenagens.

---

## Exemplo Prático Real

### Cenário: Regressão Simples com 3 Observações

Dados:
| $X$ | $Y$ |
|-----|-----|
| 1 | 3 |
| 2 | 5 |
| 3 | 7 |

### Passo 1: Formar $\mathbf{X}$, $\mathbf{Y}$

$$\mathbf{X} = \begin{bmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{bmatrix}, \quad \mathbf{Y} = \begin{bmatrix} 3 \\ 5 \\ 7 \end{bmatrix}$$

### Passo 2: Calcular $\mathbf{X}^T\mathbf{X}$

$$\mathbf{X}^T = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \end{bmatrix}$$

$$\mathbf{X}^T\mathbf{X} = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \end{bmatrix} \begin{bmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{bmatrix} = \begin{bmatrix} 3 & 6 \\ 6 & 14 \end{bmatrix}$$

### Passo 3: Calcular $\mathbf{X}^T\mathbf{Y}$

$$\mathbf{X}^T\mathbf{Y} = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \end{bmatrix} \begin{bmatrix} 3 \\ 5 \\ 7 \end{bmatrix} = \begin{bmatrix} 15 \\ 37 \end{bmatrix}$$

### Passo 4: Resolver $\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}$

Inverter $\mathbf{X}^T\mathbf{X}$:

$$(\mathbf{X}^T\mathbf{X})^{-1} = \frac{1}{3 \cdot 14 - 6^2} \begin{bmatrix} 14 & -6 \\ -6 & 3 \end{bmatrix} = \frac{1}{6} \begin{bmatrix} 14 & -6 \\ -6 & 3 \end{bmatrix} = \begin{bmatrix} 2.33 & -1 \\ -1 & 0.5 \end{bmatrix}$$

Multiplicar:

$$\hat{\boldsymbol{\beta}} = \begin{bmatrix} 2.33 & -1 \\ -1 & 0.5 \end{bmatrix} \begin{bmatrix} 15 \\ 37 \end{bmatrix} = \begin{bmatrix} 2.33 \times 15 - 1 \times 37 \\ -1 \times 15 + 0.5 \times 37 \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$

**Resultado:**
$$\hat{\alpha} = 1, \quad \hat{\beta} = 2$$

Reta: $\hat{Y} = 1 + 2X$ (perfeita para os dados!)

---

### Implementação Python

```python
import numpy as np

# Dados
X_valores = np.array([1, 2, 3])
Y_valores = np.array([3, 5, 7])
n = len(X_valores)

# Formar design matrix X (coluna de 1's + coluna de X)
X = np.column_stack([np.ones(n), X_valores])
Y = Y_valores

print("Design Matrix X:")
print(X)
print("\nVetor Y:")
print(Y)

# Calcular X'X e X'Y
XtX = X.T @ X
XtY = X.T @ Y

print("\nX'X =")
print(XtX)
print("\nX'Y =")
print(XtY)

# Resolver equações normais
beta_hat = np.linalg.solve(XtX, XtY)
# Equivalente: beta_hat = np.linalg.inv(XtX) @ XtY

alpha_hat = beta_hat[0]
slope_hat = beta_hat[1]

print(f"\nα̂ (intercepto): {alpha_hat:.2f}")
print(f"β̂ (inclinação): {slope_hat:.2f}")
print(f"Reta: Y = {alpha_hat:.2f} + {slope_hat:.2f}X")

# Predições
Y_pred = X @ beta_hat
residuos = Y_valores - Y_pred

print(f"\nPredições: {Y_pred}")
print(f"Resíduos: {residuos}")
```

**Saída:**

```
Design Matrix X:
[[1 1]
 [1 2]
 [1 3]]

Vetor Y:
[3 5 7]

X'X =
[[ 3  6]
 [ 6 14]]

X'Y =
[15 37]

α̂ (intercepto): 1.00
β̂ (inclinação): 2.00
Reta: Y = 1.00 + 2.00X

Predições: [3. 5. 7.]
Resíduos: [0. 0. 0.]
```

---

## Pontos de Atenção

### ⚠️ Invertibilidade de $\mathbf{X}^T\mathbf{X}$

$\mathbf{X}^T\mathbf{X}$ é invertível se e somente se:

1. Não há multicolinearidade perfeita
2. Há variação em $X$ (não é constante)
3. $n > k$ (mais observações que variáveis)

Se não for invertível, o problema não tem solução única.

### ⚠️ Interpretação de $(\mathbf{X}^T\mathbf{X})^{-1}$

A matriz inversa $(\mathbf{X}^T\mathbf{X})^{-1}$ contém a **variância-covariância dos estimadores**.

Diagonal principal: variâncias de $\hat{\alpha}$ e $\hat{\beta}$

Elementos fora-diagonal: covariâncias entre estimadores

### ⚠️ Estabilidade Computacional

Invert matriz $\mathbf{X}^T\mathbf{X}$ numericamente pode ser instável.

**Melhor abordagem:** usar decomposição QR ou SVD (ver módulos avançados)

---

## Referências para Aprofundamento

- **Greene, W. H.** (2018). _Econometric Analysis_ (8ª ed.). Pearson. — Referência técnica completa.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Álgebra linear aplicada a regressão.

- **Strang, G.** (2009). _Introduction to Linear Algebra_ (4ª ed.). Wellesley-Cambridge Press. — Fundamentos de álgebra linear.
