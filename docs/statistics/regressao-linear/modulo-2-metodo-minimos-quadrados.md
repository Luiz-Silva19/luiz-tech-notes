---
id: modulo-2-metodo-minimos-quadrados
title: Método dos Mínimos Quadrados
---

# Módulo 2 - Método dos Mínimos Quadrados (MQO)

## O que é

O **Método dos Mínimos Quadrados (MQO)** é um critério de estimação que encontra os parâmetros $\alpha$ e $\beta$ da reta que **minimiza a soma dos quadrados dos resíduos**. É o procedimento mais utilizado para ajustar regressões lineares.

## Para que serve

- Encontrar a "melhor" reta que descreve os dados
- Estimar os parâmetros da regressão de forma analítica
- Minimizar erros de predição (no sentido de quadrados)

---

## Como funciona

### 2.1 - Conceito de Resíduo

O **resíduo** $e_i$ é a diferença entre o valor observado e o valor predito:

$$e_i = Y_i - \hat{Y}_i = Y_i - (\hat{\alpha} + \hat{\beta} X_i)$$

**Interpretação:** quanto o ponto observado se desvia da reta ajustada.

**Exemplo:**

- Valor observado: $Y_i = 35$
- Valor predito: $\hat{Y}_i = 32$
- Resíduo: $e_i = 35 - 32 = 3$ (ponto está 3 unidades acima da reta)

---

### 2.2 - Soma dos Quadrados dos Resíduos (SQR)

A **Soma dos Quadrados dos Resíduos** é:

$$\text{SQR} = \sum_{i=1}^{n} e_i^2 = \sum_{i=1}^{n} (Y_i - \hat{\alpha} - \hat{\beta} X_i)^2$$

**Por que quadrados?**

- Resíduos positivos e negativos "se cancelariam" se usássemos apenas $\sum e_i$
- Elevar ao quadrado (1) torna todos positivos e (2) penaliza mais os erros grandes

**Analogia:** é como medir a distância total de todos os pontos até a reta.

---

### 2.3 - Critério de Minimização

O MQO escolhe $\hat{\alpha}$ e $\hat{\beta}$ que **minimizam a SQR**:

$$\min_{\alpha, \beta} \sum_{i=1}^{n} (Y_i - \alpha - \beta X_i)^2$$

Geometricamente: a reta que melhor "passa pelo meio" dos pontos, minimizando desvios verticais.

---

### 2.4 - Derivação das Equações Normais

Para encontrar o mínimo, derivamos a SQR em relação a cada parâmetro e igualamos a zero.

**Derivada com relação a $\beta$:**

$$\frac{\partial \text{SQR}}{\partial \beta} = -2 \sum_{i=1}^{n} (Y_i - \alpha - \beta X_i) X_i = 0$$

**Derivada com relação a $\alpha$:**

$$\frac{\partial \text{SQR}}{\partial \alpha} = -2 \sum_{i=1}^{n} (Y_i - \alpha - \beta X_i) = 0$$

**Simplificando, obtemos o sistema de equações normais:**

$$
\begin{cases}
n\alpha + \beta \sum X_i = \sum Y_i \\
\alpha \sum X_i + \beta \sum X_i^2 = \sum X_i Y_i
\end{cases}
$$

Este é um sistema linear simples que pode ser resolvido analiticamente.

---

## Analogia Intuitiva

💡 **Imagine um pastor tentando posicionar uma corda reta entre várias ovelhas dispersas em um pasto.**

O **resíduo** é a distância (vertical) de cada ovelha até a corda.

A **Soma dos Quadrados dos Resíduos** é a soma das distâncias ao quadrado (punindo mais as ovelhas muito longe).

O **Método dos Mínimos Quadrados** é o procedimento do pastor para ajustar a corda de forma a minimizar o incômodo total — ou seja, posicionar a corda no lugar onde a soma das distâncias (ao quadrado) é menor.

---

## Exemplo Prático Real

### Cenário

Vamos ajustar uma reta aos 5 pontos abaixo usando MQO manualmente:

| $X$ | $Y$ |
| --- | --- |
| 1   | 2   |
| 2   | 3   |
| 3   | 5   |
| 4   | 4   |
| 5   | 5   |

### Cálculos Manuais

**Passo 1: Calcular somas necessárias**

$$\sum X_i = 1 + 2 + 3 + 4 + 5 = 15$$
$$\sum Y_i = 2 + 3 + 5 + 4 + 5 = 19$$
$$\sum X_i^2 = 1 + 4 + 9 + 16 + 25 = 55$$
$$\sum X_i Y_i = (1)(2) + (2)(3) + (3)(5) + (4)(4) + (5)(5) = 2 + 6 + 15 + 16 + 25 = 64$$
$$n = 5$$

**Passo 2: Montar o sistema de equações normais**

$$
\begin{cases}
5\alpha + 15\beta = 19 \\
15\alpha + 55\beta = 64
\end{cases}
$$

**Passo 3: Resolver (por eliminação)**

Multiplicar primeira por 3:
$$15\alpha + 45\beta = 57$$

Subtrair da segunda:
$$55\beta - 45\beta = 64 - 57$$
$$10\beta = 7$$
$$\beta = 0{,}7$$

Substituir na primeira:
$$5\alpha + 15(0{,}7) = 19$$
$$5\alpha + 10{,}5 = 19$$
$$\alpha = 1{,}7$$

**Reta ajustada:** $\hat{Y} = 1{,}7 + 0{,}7 X$

**Passo 4: Calcular resíduos e SQR**

| $X_i$ | $Y_i$ | $\hat{Y}_i$ | $e_i$ | $e_i^2$ |
| ----- | ----- | ----------- | ----- | ------- |
| 1     | 2     | 2.4         | -0.4  | 0.16    |
| 2     | 3     | 3.1         | -0.1  | 0.01    |
| 3     | 5     | 3.8         | 1.2   | 1.44    |
| 4     | 4     | 4.5         | -0.5  | 0.25    |
| 5     | 5     | 5.2         | -0.2  | 0.04    |

$$\text{SQR} = 0{,}16 + 0{,}01 + 1{,}44 + 0{,}25 + 0{,}04 = 1{,}9$$

---

### Implementação Python

```python
import numpy as np
from scipy import stats

# Dados
X = np.array([1, 2, 3, 4, 5])
Y = np.array([2, 3, 5, 4, 5])

# Cálculos manuais (como derivado acima)
n = len(X)
sum_X = np.sum(X)
sum_Y = np.sum(Y)
sum_X2 = np.sum(X**2)
sum_XY = np.sum(X * Y)

# Sistema de equações normais
A = np.array([[n, sum_X], [sum_X, sum_X2]])
b = np.array([sum_Y, sum_XY])

# Resolver
params = np.linalg.solve(A, b)
alpha_est = params[0]
beta_est = params[1]

print(f"α (intercepto): {alpha_est:.2f}")
print(f"β (inclinação): {beta_est:.2f}")
print(f"Reta ajustada: Y = {alpha_est:.2f} + {beta_est:.2f}X")

# Calcular resíduos e SQR
Y_pred = alpha_est + beta_est * X
residuos = Y - Y_pred
SQR = np.sum(residuos**2)

print(f"SQR: {SQR:.4f}")

# Comparação com método scipy
slope, intercept, r_value, p_value, std_err = stats.linregress(X, Y)
print(f"\nVerificação scipy:")
print(f"α: {intercept:.2f}, β: {slope:.2f}")
```

**Saída:**

```
α (intercepto): 1.70
β (inclinação): 0.70
Reta ajustada: Y = 1.70 + 0.70X
SQR: 1.9000

Verificação scipy:
α: 1.70, β: 0.70
```

---

## Pontos de Atenção

### ⚠️ Por Que MQO?

O MQO não é o único critério possível. Alternativas:

- **MAD (Mean Absolute Deviation):** minimiza desvios absolutos — menos sensível a outliers
- **Least Absolute Deviations (LAD):** similar ao MAD
- **Máxima Verossimilhança:** em contextos probabilísticos

**MQO é padrão porque:**

1. Tem solução analítica fechada
2. Produz estimadores não-viesados sob pressupostos clássicos
3. Computacionalmente eficiente
4. Tem propriedades estatísticas desejáveis (Gauss-Markov)

### ⚠️ MQO é Sensível a Outliers

Um ponto aberrante pode distorcer a reta significativamente (porque resíduos são quadráticos).

- **Solução:** identificar e remover outliers, ou usar métodos robustos

### ⚠️ MQO Assume Linearidade

Se a verdadeira relação é não-linear, MQO ajusta uma reta aos dados curvos — obtendo predições enviesadas.

---

## Referências para Aprofundamento

- **Greene, W. H.** (2018). _Econometric Analysis_ (8ª ed.). Pearson. — Tratamento aprofundado de MQO e suas propriedades.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Derivações matemáticas claras.

- **Keller, G.** (2016). _Statistics for Management and Economics_ (11ª ed.). Cengage. — Introdução com muitos exemplos.

- **Neter, J., Wasserman, W. e Kutner, M. H.** (1996). _Applied Linear Statistical Models_ (4ª ed.). Irwin. — Clássico completo sobre modelos lineares.
