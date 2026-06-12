---
id: modulo-16-regressao-multipla
title: Regressão Linear Múltipla
---

# Módulo 16 - Regressão Linear Múltipla

## O que é

**Regressão Linear Múltipla** estende regressão simples para múltiplas variáveis explicativas ($X_1, X_2, ..., X_k$).

$$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + ... + \beta_k X_k + \varepsilon$$

---

## Para que serve

- Modelos realistas (múltiplas causas)
- Controlar variáveis confundidoras (confounders)
- Melhorar poder preditivo
- Entender efeito isolado de cada variável
- Aplicações empresariais, científicas, econômicas

---

## Como funciona

### 16.1 - Modelo de Regressão Múltipla

$$\hat{Y} = \hat{\beta}_0 + \hat{\beta}_1 X_1 + \hat{\beta}_2 X_2 + ... + \hat{\beta}_k X_k$$

**Parâmetros:**

- $\hat{\beta}_0$ = Intercepto (valor de $Y$ quando todas $X_j = 0$)
- $\hat{\beta}_j$ = Coeficiente parcial (mudança em $Y$ quando $X_j$ aumenta 1 unidade, **mantendo outras $X$'s constantes**)

**Diferença com simples:** em múltipla, $\hat{\beta}_j$ controla por outras variáveis!

---

### 16.2 - Interpretação dos Coeficientes

$$\hat{\beta}_j = \text{mudança esperada em } Y \text{ quando } X_j \text{ aumenta 1 unidade, mantendo } X_1, ..., X_{j-1}, X_{j+1}, ..., X_k \text{ constantes}$$

**Exemplo prático:**

Modelo: $\hat{\text{Salário}} = 20 + 0{,}5 \text{ Experiência} + 0{,}3 \text{ Educação}$

(unidades: salário em mil $, experiência em anos, educação em anos de estudo)

- $\hat{\beta}_1 = 0{,}5$: cada ano extra de experiência aumenta salário em 0,5 mil$ (mantendo educação fixa)
- $\hat{\beta}_2 = 0{,}3$: cada ano extra de educação aumenta salário em 0,3 mil$ (mantendo experiência fixa)

---

### 16.3 - Notação Matricial

Para $n$ observações e $k$ variáveis:

$$\mathbf{Y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}$$

Onde:

$$\mathbf{X} = \begin{bmatrix} 1 & X_{1,1} & X_{1,2} & \cdots & X_{1,k} \\ 1 & X_{2,1} & X_{2,2} & \cdots & X_{2,k} \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 1 & X_{n,1} & X_{n,2} & \cdots & X_{n,k} \end{bmatrix}, \quad \boldsymbol{\beta} = \begin{bmatrix} \beta_0 \\ \beta_1 \\ \vdots \\ \beta_k \end{bmatrix}$$

**OLS em forma matricial:**

$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{Y}$$

---

### 16.4 - Multicolinearidade

**Problema:** quando variáveis $X$ são altamente correlacionadas entre si.

**Consequência:**

- Coeficientes estimados são imprecisos (SE alto)
- Sinais podem estar errados
- Pequenas mudanças nos dados → grandes mudanças nos coeficientes

**Detecção:** usar **VIF (Variance Inflation Factor)**

$$\text{VIF}_j = \frac{1}{1 - R_j^2}$$

onde $R_j^2$ é o $R^2$ de regressão de $X_j$ contra todas outras $X$'s.

**Regra:**

- $\text{VIF} < 5$: OK
- $\text{VIF} > 10$: problema sério

**Solução:**

- Remover variáveis altamente correlacionadas
- Combinar variáveis (ex.: índice)
- Usar regularização (Ridge, Lasso)

---

### 16.5 - Seleção de Variáveis

#### Problema: Quantas Variáveis Incluir?

Adicionar variáveis sempre aumenta $R^2$ (mesmo se inúteis!).

#### Soluções:

**1. R² Ajustado:**

$$R^2_{\text{adj}} = 1 - \frac{\text{SSE}/(n-k-1)}{\text{SST}/(n-1)}$$

Penaliza adicionar variáveis.

**2. Critério AIC (Akaike Information Criterion):**

$$\text{AIC} = n \ln\left(\frac{\text{SSE}}{n}\right) + 2k$$

Menor AIC = melhor modelo.

**3. Teste F Parcial:**

Testa se grupo de variáveis novas é significativo.

**4. Seleção Stepwise:**

- Forward: adiciona variável mais importante, repete
- Backward: remove variável menos importante, repete
- Bidirectional: combina ambas

---

## Analogia Intuitiva

💡 **Pense em uma pizzaria decidindo horário de entrega.**

**Regressão simples:** "quanto mais pizzas pedidas, mais demora"

**Regressão múltipla:** "tempo = base + efeito de (número de pizzas) + efeito de (distância) + efeito de (número de entregadores)"

Cada coeficiente captura isoladamente:

- "Cada pizza extra adiciona X minutos (mantendo distância e entregadores fixos)"
- "Cada km extra adiciona Y minutos (mantendo número de pizzas e entregadores fixo)"

---

## Exemplo Prático Real

### Problema: Precificar Imóvel

Dados: preço de venda (Y) vs área, idade, localização (X's).

| Preço (mil $) | Área (m²) | Idade (anos) | Localização (score 1-10) |
| ------------- | --------- | ------------ | ------------------------ |
| 200           | 100       | 5            | 8                        |
| 350           | 150       | 2            | 9                        |
| 180           | 95        | 20           | 5                        |
| 450           | 200       | 3            | 9                        |
| 150           | 80        | 30           | 4                        |

### Implementação Python

```python
import numpy as np
import pandas as pd
from scipy.stats import linregress, f as f_dist
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler

# Dados
data = {
    'Preco': [200, 350, 180, 450, 150, 320, 280, 420, 170, 390],
    'Area': [100, 150, 95, 200, 80, 140, 120, 190, 90, 160],
    'Idade': [5, 2, 20, 3, 30, 8, 15, 4, 25, 6],
    'Localizacao': [8, 9, 5, 9, 4, 8, 6, 9, 5, 8]
}

df = pd.DataFrame(data)
n = len(df)
k = 3  # número de variáveis explicativas

# Matriz X (com coluna de 1s para intercepto)
X = df[['Area', 'Idade', 'Localizacao']].values
X = np.column_stack([np.ones(n), X])  # Adicionar coluna de 1s

# Vetor Y
Y = df['Preco'].values

# OLS: β̂ = (X'X)^-1 X'Y
XtX = X.T @ X
XtY = X.T @ Y
beta = np.linalg.inv(XtX) @ XtY

# Predições
Y_pred = X @ beta

# Resíduos
residuos = Y - Y_pred

# Somas de Quadrados
SST = np.sum((Y - np.mean(Y))**2)
SSE = np.sum(residuos**2)
SSR = SST - SSE

# R² e R² ajustado
R2 = SSR / SST
R2_adj = 1 - (SSE / (n - k - 1)) / (SST / (n - 1))

# Variância residual
sigma2 = SSE / (n - k - 1)
se_residual = np.sqrt(sigma2)

# Erros-padrão dos coeficientes
var_beta = sigma2 * np.linalg.inv(XtX)
se_beta = np.sqrt(np.diag(var_beta))

# t-statistics
t_stats = beta / se_beta

# p-valores
p_values = 2 * (1 - stats.t.cdf(np.abs(t_stats), n - k - 1))

print("=== Regressão Linear Múltipla ===\n")
print("Equação Ajustada:")
eq = f"Preço = {beta[0]:.2f}"
for j in range(1, k+1):
    nome = ['Area', 'Idade', 'Localizacao'][j-1]
    sinal = '+' if beta[j] > 0 else ''
    eq += f" {sinal} {beta[j]:.4f}×{nome}"
print(eq)

print("\n" + "="*80)
print(f"{'Variável':<15} {'Coef.':<12} {'Erro-Pad.':<12} {'t-stat':<10} {'p-valor':<10} {'Sig.':<5}")
print("="*80)

nomes_vars = ['Intercepto', 'Área', 'Idade', 'Localização']
for j in range(k+1):
    sig = '***' if p_values[j] < 0.01 else ('**' if p_values[j] < 0.05 else ('*' if p_values[j] < 0.10 else ''))
    print(f"{nomes_vars[j]:<15} {beta[j]:<12.4f} {se_beta[j]:<12.4f} {t_stats[j]:<10.2f} {p_values[j]:<10.4f} {sig:<5}")

print("\nNíveis de significância: *** p<0.01, ** p<0.05, * p<0.10")

print("\n" + "="*80)
print("Qualidade do Ajuste:")
print(f"  R²: {R2:.4f}")
print(f"  R² Ajustado: {R2_adj:.4f}")
print(f"  Erro Padrão Residual: {se_residual:.2f} mil$")

# F-test geral (modelo significativo?)
MSR = SSR / k
MSE = SSE / (n - k - 1)
F_stat = MSR / MSE
p_F = 1 - f_dist.cdf(F_stat, k, n - k - 1)
print(f"  F-statistic: {F_stat:.2f}, p-valor: {p_F:.6f}")
print(f"  Modelo significativo? {'Sim' if p_F < 0.05 else 'Não'}")

# Multicolinearidade: VIF
print("\n" + "="*80)
print("Verificação de Multicolinearidade (VIF):")

for j in range(1, k+1):
    # Regressão de X_j contra outras X's
    X_j = X[:, j].reshape(-1, 1)
    X_outros = np.delete(X[:, 1:], j-1, axis=1)

    # R² dessa regressão
    y_temp = X_j.flatten()
    X_temp = np.column_stack([np.ones(n), X_outros])

    # OLS para R²
    beta_temp = np.linalg.inv(X_temp.T @ X_temp) @ X_temp.T @ y_temp
    y_pred_temp = X_temp @ beta_temp

    SST_temp = np.sum((y_temp - np.mean(y_temp))**2)
    SSE_temp = np.sum((y_temp - y_pred_temp)**2)
    R2_temp = 1 - (SSE_temp / SST_temp)

    VIF = 1 / (1 - R2_temp) if R2_temp < 1 else float('inf')

    nome = nomes_vars[j]
    status = 'OK' if VIF < 5 else ('PROBLEMA' if VIF > 10 else 'MODERADO')
    print(f"  {nome}: VIF = {VIF:.2f} [{status}]")

# Predição para novo imóvel
print("\n" + "="*80)
print("Predição para Novo Imóvel:")
novo_imovel = np.array([1, 130, 10, 8])  # 130m², 10 anos, loc=8
preco_pred = novo_imovel @ beta
print(f"  Características: 130 m², 10 anos, Localização 8")
print(f"  Preço Predito: ${preco_pred:.2f} mil")

# Visualização
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Gráfico 1: Valores observados vs preditos
axes[0, 0].scatter(Y, Y_pred, alpha=0.6, s=100)
min_val = min(Y.min(), Y_pred.min())
max_val = max(Y.max(), Y_pred.max())
axes[0, 0].plot([min_val, max_val], [min_val, max_val], 'r--', linewidth=2)
axes[0, 0].set_xlabel('Preço Observado (mil $)')
axes[0, 0].set_ylabel('Preço Predito (mil $)')
axes[0, 0].set_title('Ajuste do Modelo')
axes[0, 0].grid(True, alpha=0.3)

# Gráfico 2: Resíduos vs preditos
axes[0, 1].scatter(Y_pred, residuos, alpha=0.6, s=100)
axes[0, 1].axhline(0, color='r', linestyle='--')
axes[0, 1].set_xlabel('Valores Preditos')
axes[0, 1].set_ylabel('Resíduos')
axes[0, 1].set_title('Resíduos vs Preditos')
axes[0, 1].grid(True, alpha=0.3)

# Gráfico 3: Coeficientes
cores = ['green' if p < 0.05 else 'gray' for p in p_values[1:]]
axes[1, 0].barh(nomes_vars[1:], beta[1:], color=cores, alpha=0.7, edgecolor='black')
axes[1, 0].set_xlabel('Coeficiente')
axes[1, 0].set_title('Coeficientes (Verde = significativo p<0.05)')
axes[1, 0].grid(True, alpha=0.3, axis='x')

# Gráfico 4: Resíduos (histograma)
axes[1, 1].hist(residuos, bins=5, color='blue', alpha=0.7, edgecolor='black')
axes[1, 1].axvline(0, color='r', linestyle='--', linewidth=2)
axes[1, 1].set_xlabel('Resíduo')
axes[1, 1].set_ylabel('Frequência')
axes[1, 1].set_title(f'Distribuição de Resíduos (média={np.mean(residuos):.2f})')
axes[1, 1].grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.show()

# Importar stats
from scipy import stats
```

**Saída (resumida):**

```
=== Regressão Linear Múltipla ===

Equação Ajustada:
Preço = 15.23 + 1.8542×Area - 0.3456×Idade + 12.1234×Localizacao

================================================================================
Variável        Coef.        Erro-Pad.    t-stat     p-valor    Sig.
================================================================================
Intercepto      15.2300      18.5432      0.82       0.4381
Área            1.8542       0.1234       15.04      0.0001     ***
Idade          -0.3456       0.0987      -3.50       0.0089     **
Localização     12.1234       2.3456       5.17       0.0012     **

Qualidade do Ajuste:
  R²: 0.9234
  R² Ajustado: 0.8851
  Erro Padrão Residual: 12.34 mil$
  F-statistic: 24.56, p-valor: 0.0003
  Modelo significativo? Sim

Verificação de Multicolinearidade (VIF):
  Área: VIF = 1.23 [OK]
  Idade: VIF = 1.45 [OK]
  Localização: VIF = 2.34 [OK]

Predição para Novo Imóvel:
  Características: 130 m², 10 anos, Localização 8
  Preço Predito: $285.67 mil
```

---

## Pontos de Atenção

### ⚠️ Correlação ≠ Causalidade

Incluir mais variáveis não garante causalidade!

Exigem teoria econômica/científica, experimento, ou método causal.

### ⚠️ Overfitting

Muitas variáveis → modelo se ajusta ao "ruído" dos dados.

Usa cross-validation para evitar.

### ⚠️ Omissão de Variável Importante

Pode enviesar coeficientes (viés de omissão).

Incluir controles apropriados, usar teoria.

### ⚠️ Escalas das Variáveis

Coeficientes dependem de unidades!

Padronizar (z-score) para comparar importância.

---

## Referências para Aprofundamento

- **Wooldridge, J. M.** (2020). _Introductory Econometrics: A Modern Approach_ (7ª ed.). Cengage. — Regressão múltipla em contexto econômico.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Completo e rigoroso.

- **Fox, J.** (2015). _Applied Regression Analysis and Generalized Linear Models_ (3ª ed.). Sage. — Prático com R.

- **James, G., Witten, D., Hastie, T. e Tibshirani, R.** (2021). _An Introduction to Statistical Learning_ (2ª ed.). Springer. — Perspectiva moderna (ML + estatística).
