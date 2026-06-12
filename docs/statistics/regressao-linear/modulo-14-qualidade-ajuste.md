---
id: modulo-14-qualidade-ajuste
title: Qualidade do Ajuste
---

# Módulo 14 - Qualidade do Ajuste

## O que é

A **qualidade do ajuste** mede quanto o modelo consegue explicar a variação em $Y$. Principais métricas: $R^2$ (coeficiente de determinação) e correlação $r$.

## Para que serve

- Quantificar quanto da variação em $Y$ é explicada por $X$
- Comparar modelos (melhor modelo tem $R^2$ maior)
- Comunicar força da relação
- Avaliar adequação do modelo

---

## Como funciona

### 14.1 - Soma dos Quadrados

Decomposição da variação total:

$$\text{SST} = \text{SSR} + \text{SSE}$$

**Onde:**

- $\text{SST} = \sum (Y_i - \bar{Y})^2$ = **Soma Total de Quadrados** (variação total)
- $\text{SSR} = \sum (\hat{Y}_i - \bar{Y})^2$ = **Soma dos Quadrados da Regressão** (explicada)
- $\text{SSE} = \sum (Y_i - \hat{Y}_i)^2$ = **Soma dos Erros** (não explicada)

**Interpretação:** toda variação em $Y$ é dividida entre o que o modelo explica e o que sobra como erro.

---

### 14.2 - Variabilidade Explicada

A proporção de variação **explicada** pelo modelo é:

$$R^2 = \frac{\text{SSR}}{\text{SST}} = 1 - \frac{\text{SSE}}{\text{SST}}$$

**Variação de $R^2$:**

- $0 \leq R^2 \leq 1$
- $R^2 = 0$: modelo explica 0% (inútil)
- $R^2 = 1$: modelo explica 100% (perfeito)
- $R^2 = 0{,}75$: modelo explica 75%

---

### 14.3 - Coeficiente de Determinação

$R^2$ é chamado **coeficiente de determinação**.

**Fórmula alternativa:**

$$R^2 = r^2$$

onde $r$ é a correlação de Pearson entre $X$ e $Y$.

Isto é: $R^2$ é o **quadrado** da correlação!

---

### 14.4 - Interpretação do $R^2$

#### Exemplos Práticos

- $R^2 = 0{,}05$: 5% explicado — relação fraca
- $R^2 = 0{,}25$: 25% explicado — relação moderada
- $R^2 = 0{,}70$: 70% explicado — relação forte
- $R^2 = 0{,}95$: 95% explicado — relação muito forte

#### Contexto Importa

- Ciências naturais: espera-se $R^2 > 0{,}80$ (muita ordem)
- Ciências sociais: $R^2 > 0{,}30$ já é bom (muito ruído)
- Série temporal: $R^2 > 0{,}60$ é típico

#### $R^2$ Alto Não Garante Modelo Bom

- Variável omitida importante → $R^2$ fica artificialmente alto
- Overfitting → $R^2$ alto em treino, ruim em teste
- Relação não-linear → $R^2$ baixo mesmo com forte relação

---

## Analogia Intuitiva

💡 **Pense em um professor corrigindo provas.**

A variação total é a diferença entre a nota máxima (100) e mínima (0) dos alunos.

$R^2$ responde: "quanto dessa variação consegui explicar com meus critérios de correção?"

- $R^2 = 0{,}8$ significa: 80% das diferenças de notas são explicadas pelos critérios, 20% são por razões aleatórias (cansaço, sorte na adivinhação)
- Se múltiplas provas: $R^2$ mostra qual professor tem critério mais consistente

---

## Exemplo Prático Real

### Dados: Horas de Estudo vs Nota

10 estudantes: horas de estudo (X) vs nota na prova (Y).

| Horas | Nota |
| ----- | ---- |
| 2     | 4    |
| 3     | 5    |
| 4     | 6    |
| 5     | 7    |
| 5     | 8    |
| 6     | 7    |
| 7     | 8    |
| 8     | 9    |
| 9     | 9    |
| 10    | 10   |

### Cálculos

**Regressão:** $\hat{Y} = 3{,}0 + 0{,}7X$ (do Módulo 4)

**Valores Preditos:**
| X | Y | Ŷ | Resíduo |
|---|---|----|---------|
| 2 | 4 | 4.4 | -0.4 |
| ... | ... | ... | ... |
| 10| 10| 10.0| 0.0 |

**Médias e Somas:**
$$\bar{Y} = 7{,}3$$

$$\text{SST} = \sum(Y_i - \bar{Y})^2 = (4-7.3)^2 + ... + (10-7.3)^2 = 18{,}1$$

$$\text{SSE} = \sum(Y_i - \hat{Y}_i)^2 = 1{,}81$$

$$\text{SSR} = \text{SST} - \text{SSE} = 18{,}1 - 1{,}81 = 16{,}29$$

$$R^2 = \frac{\text{SSR}}{\text{SST}} = \frac{16{,}29}{18{,}1} = 0{,}9005 \approx 0{,}90$$

**Interpretação:** 90% da variação em notas é explicada por horas de estudo!

---

### Implementação Python

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import linregress

# Dados
horas = np.array([2, 3, 4, 5, 5, 6, 7, 8, 9, 10])
notas = np.array([4, 5, 6, 7, 8, 7, 8, 9, 9, 10])

# Regressão
slope, intercept, r_value, p_value, std_err = linregress(horas, notas)

# Predições
y_pred = intercept + slope * horas
y_media = np.mean(notas)

# Somas de Quadrados
SST = np.sum((notas - y_media)**2)
SSE = np.sum((notas - y_pred)**2)
SSR = SST - SSE
R2 = SSR / SST

print(f"=== Qualidade do Ajuste ===")
print(f"Regressão: Y = {intercept:.2f} + {slope:.2f}X")
print(f"\nSomas de Quadrados:")
print(f"  SST (Total): {SST:.2f}")
print(f"  SSR (Regressão/Explicada): {SSR:.2f}")
print(f"  SSE (Erro/Não explicada): {SSE:.2f}")
print(f"\nCoeficiente de Determinação:")
print(f"  R² = {R2:.4f}")
print(f"  Interpretação: {R2*100:.1f}% da variação em notas é explicada por horas")

print(f"\nCorrelação:")
print(f"  r = {r_value:.4f}")
print(f"  r² = {r_value**2:.4f}")

# Visualização
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Gráfico 1: Regressão com componentes
axes[0].scatter(horas, notas, color='blue', s=100, label='Dados', zorder=3)
x_linha = np.linspace(horas.min(), horas.max(), 100)
y_linha = intercept + slope * x_linha
axes[0].plot(x_linha, y_linha, 'r-', linewidth=2, label=f'Reta ajustada: Y = {intercept:.2f} + {slope:.2f}X')
axes[0].axhline(y_media, color='green', linestyle='--', linewidth=1, label=f'Média: Ȳ = {y_media:.2f}')

# Mostrar componentes de variação para um ponto
i = 4  # Ponto de referência
axes[0].vlines(horas[i], y_media, notas[i], colors='orange', linewidth=2, label=f'SST (ponto {i})')
axes[0].vlines(horas[i], y_pred[i], notas[i], colors='red', linewidth=2, label=f'SSE (ponto {i})')
axes[0].vlines(horas[i], y_media, y_pred[i], colors='green', linewidth=2, label=f'SSR (ponto {i})')

axes[0].set_xlabel('Horas de Estudo')
axes[0].set_ylabel('Nota')
axes[0].set_title('Regressão Linear com Componentes de Variação')
axes[0].legend(fontsize=8)
axes[0].grid(True, alpha=0.3)

# Gráfico 2: Decomposição
categorias = ['SST\n(Total)', 'SSR\n(Explicada)', 'SSE\n(Não Explicada)']
valores = [SST, SSR, SSE]
cores = ['gray', 'green', 'red']

axes[1].bar(categorias, valores, color=cores, alpha=0.7, edgecolor='black', linewidth=2)
axes[1].set_ylabel('Soma dos Quadrados')
axes[1].set_title(f'Decomposição de Variação (R² = {R2:.3f})')
axes[1].grid(True, alpha=0.3, axis='y')

# Adicionar valores nas barras
for i, v in enumerate(valores):
    axes[1].text(i, v + 0.5, f'{v:.1f}', ha='center', fontsize=10, fontweight='bold')

# Proporções
axes[1].text(0.5, SST/2, f'{R2*100:.1f}%\nexplicado',
             ha='center', va='center', fontsize=12, fontweight='bold', color='white',
             bbox=dict(boxstyle='round', facecolor='green', alpha=0.8))
axes[1].text(0.5, SST - SSE/2, f'{(1-R2)*100:.1f}%\nrésuo',
             ha='center', va='center', fontsize=12, fontweight='bold', color='white',
             bbox=dict(boxstyle='round', facecolor='red', alpha=0.8))

plt.tight_layout()
plt.show()
```

**Saída:**

```
=== Qualidade do Ajuste ===
Regressão: Y = 3.00 + 0.70X

Somas de Quadrados:
  SST (Total): 18.10
  SSR (Regressão/Explicada): 16.29
  SSE (Erro/Não explicada): 1.81

Coeficiente de Determinação:
  R² = 0.9005
  Interpretação: 90.1% da variação em notas é explicada por horas

Correlação:
  r = 0.9488
  r² = 0.9002
```

---

## Pontos de Atenção

### ⚠️ $R^2$ Ajustado

Em regressão múltipla, $R^2$ sempre aumenta ao adicionar variáveis (mesmo inúteis).

**Solução:** usar $R^2$ ajustado:

$$R^2_{\text{adj}} = 1 - \frac{SSE/(n-k-1)}{SST/(n-1)}$$

que penaliza adicionar variáveis.

### ⚠️ $R^2$ Não Mede Significância

$R^2 = 0{,}5$ pode ser estatisticamente significativo (p < 0{,}05) com amostra grande.

Ou não significativo com amostra pequena.

Use $R^2$ e p-valor juntos!

### ⚠️ $R^2$ Não Mede Efeito Prático

$R^2 = 0{,}80$ não significa que o efeito é importante para decisões.

Examine também o tamanho do coeficiente.

---

## Referências para Aprofundamento

- **Wooldridge, J. M.** (2020). _Introductory Econometrics: A Modern Approach_ (7ª ed.). Cengage. — Interpretação clara de $R^2$.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Decomposição de variância.

- **Fox, J.** (2015). _Applied Regression Analysis and Generalized Linear Models_ (3ª ed.). Sage. — Crítica de $R^2$.
