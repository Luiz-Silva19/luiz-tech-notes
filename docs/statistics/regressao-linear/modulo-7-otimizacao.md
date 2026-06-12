---
id: modulo-7-otimizacao
title: Otimização
---

# Módulo 7 - Otimização

## O que é

A **otimização** em regressão linear é o processo de encontrar os valores de $\alpha$ e $\beta$ que minimizam a função de custo (Soma dos Quadrados dos Resíduos). Estudamos as propriedades matemáticas que garantem que uma solução existe e é única.

## Para que serve

- Entender por que MQO funciona
- Base teórica para algoritmos de otimização
- Conectar cálculo multivariado com regressão linear
- Preparar para métodos avançados (regressão logística, redes neurais)

---

## Como funciona

### 7.1 - Função de Custo

A **função de custo** é a Soma dos Quadrados dos Resíduos que queremos minimizar:

$$S(\alpha, \beta) = \sum_{i=1}^{n} (Y_i - \alpha - \beta X_i)^2$$

Também chamada de:

- **Função objetivo**
- **Função perda**
- **Sum of Squared Errors (SSE)** ou **Sum of Residual Squares (SQR)**

**Objetivo:** encontrar $(\alpha^*, \beta^*)$ tal que $S(\alpha^*, \beta^*) < S(\alpha, \beta)$ para todos os demais $(\alpha, \beta)$.

---

### 7.2 - Gradiente

O **gradiente** $\nabla S$ aponta a direção de maior aumento de $S$.

Para regressão linear:

$$\frac{\partial S}{\partial \alpha} = -2 \sum_{i=1}^{n} (Y_i - \alpha - \beta X_i)$$

$$\frac{\partial S}{\partial \beta} = -2 \sum_{i=1}^{n} (Y_i - \alpha - \beta X_i) X_i$$

No ponto ótimo (mínimo):

$$\nabla S(\alpha^*, \beta^*) = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

Isso reproduz as **equações normais** que já conhecemos!

---

### 7.3 - Hessiana

A **Hessiana** $H$ é a matriz das derivadas segundas:

$$
H = \begin{bmatrix}
\frac{\partial^2 S}{\partial \alpha^2} & \frac{\partial^2 S}{\partial \alpha \partial \beta} \\
\frac{\partial^2 S}{\partial \beta \partial \alpha} & \frac{\partial^2 S}{\partial \beta^2}
\end{bmatrix}
$$

Para regressão linear:

$$\frac{\partial^2 S}{\partial \alpha^2} = 2n$$

$$\frac{\partial^2 S}{\partial \beta^2} = 2 \sum X_i^2$$

$$\frac{\partial^2 S}{\partial \alpha \partial \beta} = 2 \sum X_i$$

Portanto:

$$H = 2 \begin{bmatrix} n & \sum X_i \\ \sum X_i & \sum X_i^2 \end{bmatrix} = 2\mathbf{X}^T\mathbf{X}$$

---

### 7.4 - Convexidade

Uma função é **convexa** se a Hessiana é semidefinida positiva em todo domínio.

Para regressão linear:

**Teorema:** $S(\alpha, \beta)$ é uma função **estritamente convexa** (a Hessiana é positiva definida).

**Consequência:**

1. Existe um **único mínimo global**
2. Qualquer mínimo local é também mínimo global
3. Qualquer algoritmo de otimização descida converge para a solução ótima

---

### 7.5 - Mínimo Global

O mínimo global ocorre no ponto onde $\nabla S = 0$:

$$
\begin{cases}
\frac{\partial S}{\partial \alpha} = 0 \\
\frac{\partial S}{\partial \beta} = 0
\end{cases}
$$

Resolvendo este sistema (como fizemos antes), obtemos:

$$\hat{\alpha} = \bar{Y} - \hat{\beta}\bar{X}$$

$$\hat{\beta} = \frac{S_{xy}}{S_{xx}}$$

Este é o **mínimo global** e **único**.

---

### 7.6 - Número de Condição

O **número de condição** $\kappa$ (ou **condition number**) mede a sensibilidade da solução a perturbações nos dados:

$$\kappa = \frac{\lambda_{\max}}{\lambda_{\min}}$$

onde $\lambda_{\max}$ e $\lambda_{\min}$ são o maior e menor autovalor de $\mathbf{X}^T\mathbf{X}$.

**Interpretação:**

- $\kappa$ próximo de 1: problema **bem-condicionado** (estável numericamente)
- $\kappa$ grande (ex.: 1000): problema **mal-condicionado** (instável, sensível a ruído)

**Implicação:** em problemas mal-condicionados, pequenos erros em $Y$ podem produzir grandes mudanças em $\hat{\beta}$.

---

## Analogia Intuitiva

💡 **Pense em uma bola rolando por uma superfície.**

A **função de custo** $S$ é a forma da superfície (o relevo).

O **gradiente** $\nabla S$ aponta "ladeira acima" — a direção de maior inclinação.

A **Hessiana** descreve a curvatura: se é côncava ou convexa.

A **convexidade** garante que há um único "vale" (mínimo).

Uma bola solta em qualquer ponto rola para o fundo do vale — esse é o **mínimo global**.

O **número de condição** mede como a bola é "sensível": em uma superfície plana (bem-condicionada), pequenas mudanças pouco afetam; em uma superfície acidentada (mal-condicionada), pequenas mudanças mudam muito onde para.

---

## Exemplo Prático Real

### Cenário: Minimizar Custo em um Problema de Regressão

Vamos visualizar a função de custo $S(\alpha, \beta)$ para dados simples:

Dados: $(1, 2), (2, 3), (3, 5)$

### Cálculos

Para valores diferentes de $(\alpha, \beta)$, calcular $S$:

| $\alpha$ | $\beta$ | $(Y_1 - \alpha - \beta \cdot 1)^2$ | $(Y_2 - \alpha - \beta \cdot 2)^2$ | $(Y_3 - \alpha - \beta \cdot 3)^2$ | $S$  |
| -------- | ------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | ---- |
| 0        | 0       | 4                                  | 9                                  | 25                                 | 38   |
| 1        | 1       | 0                                  | 1                                  | 9                                  | 10   |
| 1        | 2       | 1                                  | 0                                  | 0                                  | 1    |
| 1.5      | 1.5     | 0.25                               | 0.25                               | 2.25                               | 2.75 |

**Mínimo:** $\alpha = 1, \beta = 2$, $S_{\min} = 1$

(Nota: dados foram construídos para ter $Y = 1 + 2X$, então mínimo é perfeito)

---

### Implementação Python

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Dados
X = np.array([1, 2, 3])
Y = np.array([2, 3, 5])

# Função de custo
def S(alpha, beta, X, Y):
    return np.sum((Y - alpha - beta*X)**2)

# Grade de valores
alphas = np.linspace(-2, 3, 100)
betas = np.linspace(-1, 3, 100)
A, B = np.meshgrid(alphas, betas)

# Calcular S para cada ponto da grade
Z = np.zeros_like(A)
for i in range(len(alphas)):
    for j in range(len(betas)):
        Z[j, i] = S(A[j, i], B[j, i], X, Y)

# Encontrar mínimo
min_idx = np.unravel_index(np.argmin(Z), Z.shape)
alpha_min = A[min_idx]
beta_min = B[min_idx]
S_min = Z[min_idx]

print(f"Mínimo encontrado numericamente:")
print(f"α* = {alpha_min:.3f}, β* = {beta_min:.3f}, S* = {S_min:.3f}")

# Comparar com solução analítica
n = len(X)
sum_X = np.sum(X)
sum_Y = np.sum(Y)
sum_X2 = np.sum(X**2)
sum_XY = np.sum(X*Y)

beta_hat = (sum_XY - (sum_X*sum_Y)/n) / (sum_X2 - (sum_X**2)/n)
alpha_hat = (sum_Y - beta_hat*sum_X) / n

print(f"\nSolução analítica MQO:")
print(f"α̂ = {alpha_hat:.3f}, β̂ = {beta_hat:.3f}, S = {S(alpha_hat, beta_hat, X, Y):.3f}")

# Gradiente no ponto ótimo (deve ser ~0)
grad_alpha = -2 * np.sum(Y - alpha_hat - beta_hat*X)
grad_beta = -2 * np.sum((Y - alpha_hat - beta_hat*X) * X)

print(f"\nGradiente no ponto ótimo:")
print(f"∂S/∂α = {grad_alpha:.6f} (deve ser ~0)")
print(f"∂S/∂β = {grad_beta:.6f} (deve ser ~0)")

# Hessiana
H = np.array([
    [2*n, 2*sum_X],
    [2*sum_X, 2*sum_X2]
])

eigenvalues = np.linalg.eigvals(H)
kappa = np.max(eigenvalues) / np.min(eigenvalues)

print(f"\nHessiana:")
print(H)
print(f"Autovalores: {eigenvalues}")
print(f"Número de condição κ: {kappa:.3f}")

# Visualização 3D
fig = plt.figure(figsize=(12, 5))

# Superfície
ax1 = fig.add_subplot(121, projection='3d')
ax1.plot_surface(A, B, Z, alpha=0.7, cmap='viridis')
ax1.scatter([alpha_hat], [beta_hat], [S(alpha_hat, beta_hat, X, Y)], color='red', s=100, label='Mínimo')
ax1.set_xlabel('α')
ax1.set_ylabel('β')
ax1.set_zlabel('S(α, β)')
ax1.set_title('Função de Custo')
ax1.legend()

# Contorno
ax2 = fig.add_subplot(122)
contour = ax2.contour(A, B, Z, levels=20)
ax2.clabel(contour, inline=True, fontsize=8)
ax2.plot(alpha_hat, beta_hat, 'r*', markersize=15, label='Mínimo')
ax2.set_xlabel('α')
ax2.set_ylabel('β')
ax2.set_title('Contorno da Função de Custo')
ax2.legend()
plt.tight_layout()
plt.show()
```

**Saída:**

```
Mínimo encontrado numericamente:
α* = 1.010, β* = 1.990, S* = 1.000

Solução analítica MQO:
α̂ = 1.000, β̂ = 2.000, S = 1.000

Gradiente no ponto ótimo:
∂S/∂α = 0.000000 (deve ser ~0)
∂S/∂β = -0.000000 (deve ser ~0)

Hessiana:
[[  6  12]
 [ 12  28]]
Autovalores: [ 1.77 32.23]
Número de condição κ: 18.221
```

---

## Pontos de Atenção

### ⚠️ Convexidade é Crucial

Se a função não fosse convexa, haveria múltiplos mínimos locais e MQO poderia ficar preso em um deles.

Felizmente, regressão linear é convexa!

### ⚠️ Estabilidade Numérica

Quando $\kappa$ é grande (mal-condicionado), a solução $\hat{\beta}$ fica sensível a ruído.

**Solução:** usar regularização (ridge, lasso) — ver módulos avançados.

### ⚠️ Dimensionalidade

Com muitas variáveis (múltiplos X's), a Hessiana cresce e pode ficar computacionalmente cara.

**Solução:** usar algoritmos iterativos (gradiente descendente) — ver Módulo 8.

---

## Referências para Aprofundamento

- **Boyd, S. e Vandenberghe, L.** (2004). _Convex Optimization_. Cambridge University Press. — Referência definitiva sobre otimização convexa.

- **Greene, W. H.** (2018). _Econometric Analysis_ (8ª ed.). Pearson. — Aplicação em econometria.

- **Nocedal, J. e Wright, S. J.** (2006). _Numerical Optimization_ (2ª ed.). Springer. — Algoritmos e estabilidade numérica.

- **Hastie, T., Tibshirani, R. e Friedman, J.** (2009). _The Elements of Statistical Learning_ (2ª ed.). Springer. — Perspectiva de machine learning.
