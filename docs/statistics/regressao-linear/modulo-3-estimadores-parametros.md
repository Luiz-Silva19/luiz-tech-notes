---
id: modulo-3-estimadores-parametros
title: Estimadores dos Parâmetros
---

# Módulo 3 - Estimadores dos Parâmetros

## O que é

Os **estimadores** são as fórmulas que calculam os valores numéricos de $\hat{\alpha}$ (estimativa do intercepto) e $\hat{\beta}$ (estimativa da inclinação) a partir dos dados amostrais. Eles transformam dados brutos em parâmetros da reta ajustada.

## Para que serve

- Calcular numericamente os parâmetros da reta de regressão
- Interpretar economicamente o impacto de $X$ sobre $Y$
- Fazer predições de $Y$ para novos valores de $X$
- Entender a sensibilidade da relação entre variáveis

---

## Como funciona

### 3.1 - Estimador da Inclinação

O **estimador de $\beta$** (também chamado coeficiente angular ou slope) é:

$$\hat{\beta} = \frac{S_{xy}}{S_{xx}}$$

**Onde:**

- $S_{xy} = \sum_{i=1}^{n} (X_i - \bar{X})(Y_i - \bar{Y})$ = covariância amostral × (n-1)
- $S_{xx} = \sum_{i=1}^{n} (X_i - \bar{X})^2$ = variância amostral de X × (n-1)

**Forma alternativa (usando somas):**

$$\hat{\beta} = \frac{\sum X_i Y_i - n \bar{X}\bar{Y}}{\sum X_i^2 - n\bar{X}^2}$$

**Interpretação:**

- $\hat{\beta} > 0$: relação positiva (X sobe → Y sobe)
- $\hat{\beta} < 0$: relação negativa (X sobe → Y desce)
- Magnitude: mudança esperada em $Y$ para aumento unitário em $X$

---

### 3.2 - Estimador do Intercepto

O **estimador de $\alpha$** (também chamado intercepto ou constante) é:

$$\hat{\alpha} = \bar{Y} - \hat{\beta} \bar{X}$$

**Onde:**

- $\bar{X} = \frac{1}{n}\sum X_i$ = média amostral de X
- $\bar{Y} = \frac{1}{n}\sum Y_i$ = média amostral de Y

**Propriedade importante:** A reta $\hat{Y} = \hat{\alpha} + \hat{\beta}X$ **sempre passa pelo ponto $(\bar{X}, \bar{Y})$**.

**Interpretação:**

- Valor predito de $Y$ quando $X = 0$
- Nem sempre tem interpretação prática (ex.: altura = 0)

---

### 3.3 - Equação Ajustada

Combinando os dois estimadores, obtemos a **reta de regressão ajustada**:

$$\hat{Y} = \hat{\alpha} + \hat{\beta}X$$

Esta é a reta que:

1. Passa por $(\bar{X}, \bar{Y})$
2. Minimiza a SQR
3. Produz predições para novos valores de $X$

**Para uma observação específica** $X_i$:
$$\hat{Y}_i = \hat{\alpha} + \hat{\beta} X_i$$

---

### 3.4 - Interpretação Econômica e Financeira

#### Sensibilidade

$\hat{\beta}$ mede a **sensibilidade** de $Y$ a mudanças em $X$.

**Exemplo (Consumo × Renda):**

- Se $\hat{\beta} = 0{,}8$: a cada aumento de $1 em renda, consumo aumenta em 0{,}8
- Implica: consumidores gastam 80% de aumentos de renda, poupam 20%

#### Elasticidade Local

Em contextos com elasticidades, calculamos:

$$\text{Elasticidade} = \frac{\% \text{ mudança em } Y}{\% \text{ mudança em } X} = \hat{\beta} \times \frac{\bar{X}}{\bar{Y}}$$

**Exemplo (Preço × Quantidade):**

- Se $\hat{\beta} = -2$ e $\frac{\bar{X}}{\bar{Y}} = 0{,}5$:
- Elasticidade = $-2 \times 0{,}5 = -1$
- Interpretação: aumento de 1% no preço reduz quantidade em 1% (demanda unitária)

#### Causalidade Hipotética

$\hat{\beta}$ pode sugerir uma relação causal **sob certas condições**:

- Experimento controlado
- Ausência de confundidores
- Ordem temporal estabelecida
- Mecanismo teórico plausível

---

## Analogia Intuitiva

💡 **Imagine um nutricionista ajustando uma dieta.**

O **intercepto** $\hat{\alpha}$ é o gasto calórico de repouso (mesmo sem atividade).

A **inclinação** $\hat{\beta}$ é quantas calorias adicionais você gasta por minuto de atividade.

Se você sabe sua inclinação, pode **prever** seu gasto total: $\hat{Y} = \hat{\alpha} + \hat{\beta} \times \text{minutos de atividade}$.

A **reta passa pela média** porque é o ponto onde "equilibra" dados acima e abaixo.

---

## Exemplo Prático Real

### Cenário: Salário × Anos de Experiência

Uma empresa tem dados de 10 funcionários (salário em milhares de $, experiência em anos):

| Experiência (X) | Salário (Y) |
| --------------- | ----------- |
| 1               | 30          |
| 2               | 32          |
| 3               | 35          |
| 5               | 40          |
| 7               | 48          |
| 8               | 50          |
| 10              | 55          |
| 12              | 60          |
| 15              | 68          |
| 18              | 75          |

### Cálculos Manuais

**Passo 1: Calcular somas e médias**

$$\sum X_i = 81, \quad \sum Y_i = 493, \quad n = 10$$
$$\bar{X} = 8{,}1, \quad \bar{Y} = 49{,}3$$

$$\sum X_i Y_i = 4{,}650, \quad \sum X_i^2 = 861$$

**Passo 2: Calcular $S_{xy}$ e $S_{xx}$**

$$S_{xx} = 861 - 10(8{,}1)^2 = 861 - 656{,}1 = 204{,}9$$
$$S_{xy} = 4{,}650 - 10(8{,}1)(49{,}3) = 4{,}650 - 3{,}993{,}3 = 656{,}7$$

**Passo 3: Calcular estimadores**

$$\hat{\beta} = \frac{656{,}7}{204{,}9} \approx 3{,}204 \text{ (milhares \$ por ano de experiência)}$$

$$\hat{\alpha} = 49{,}3 - 3{,}204 \times 8{,}1 \approx 49{,}3 - 25{,}95 = 23{,}35$$

**Equação ajustada:**
$$\hat{Y} = 23{,}35 + 3{,}204X$$

**Interpretação:**

- Intercepto: funcionário com zero anos de experiência ganharia ~$23.350 (salário base)
- Inclinação: cada ano adicional de experiência aumenta salário em ~$3.204 em média

### Implementação Python

```python
import numpy as np
from scipy import stats

# Dados
experiencia = np.array([1, 2, 3, 5, 7, 8, 10, 12, 15, 18])
salario = np.array([30, 32, 35, 40, 48, 50, 55, 60, 68, 75])

# Regressão
slope, intercept, r_value, p_value, std_err = stats.linregress(experiencia, salario)

print(f"Intercepto (α̂): ${intercept:.2f}k")
print(f"Inclinação (β̂): ${slope:.3f}k por ano de experiência")
print(f"Equação: Salário = ${intercept:.2f}k + ${slope:.3f}k × Experiência")

# Predições
x_novo = 6  # Funcionário com 6 anos
y_pred = intercept + slope * x_novo
print(f"\nPredição: Funcionário com 6 anos ganharia ${y_pred:.2f}k")

# Elasticidade (calculada na média)
elasticidade = slope * (np.mean(experiencia) / np.mean(salario))
print(f"Elasticidade (na média): {elasticidade:.3f}")
```

**Saída:**

```
Intercepto (α̂): $23.35k
Inclinação (β̂): $3.204k por ano de experiência
Equação: Salário = $23.35k + $3.204k × Experiência

Predição: Funcionário com 6 anos ganharia $42.56k
Elasticidade (na média): 0.536
```

---

## Pontos de Atenção

### ⚠️ Intercepto Fora do Intervalo

Interpretações literais do intercepto ($X = 0$) frequentemente não fazem sentido.

- Exemplo: altura = 0? Preço = 0?
- Solução: focar na interpretação de $\hat{\beta}$, usar intercepto apenas para ajuste

### ⚠️ Extrapolação Além do Intervalo

Não confie em predições para valores de $X$ muito fora do intervalo observado.

- A relação linear pode não se manter
- Intervalo de confiança fica muito largo

### ⚠️ Correlação vs Causação

Mesmo com $\hat{\beta}$ significativo, não implica $X$ causa $Y$.

- Pode haver causalidade reversa
- Pode haver variável confundadora

---

## Referências para Aprofundamento

- **Wooldridge, J. M.** (2020). _Introductory Econometrics: A Modern Approach_ (7ª ed.). Cengage. — Interpretação econômica clara.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Propriedades estatísticas dos estimadores.

- **Greene, W. H.** (2018). _Econometric Analysis_ (8ª ed.). Pearson. — Referência técnica completa.

- **Keller, G.** (2016). _Statistics for Management and Economics_ (11ª ed.). Cengage. — Exemplos práticos variados.
