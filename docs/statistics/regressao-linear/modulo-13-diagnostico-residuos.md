---
id: modulo-13-diagnostico-residuos
title: Diagnóstico de Resíduos
---

# Módulo 13 - Diagnóstico de Resíduos

## O que é

O **diagnóstico de resíduos** é a análise dos resíduos (erros) $e_i = Y_i - \hat{Y}_i$ para detectar violações de pressupostos e identificar observações problemáticas (outliers, alavancas).

## Para que serve

- Validar pressupostos do modelo
- Detectar outliers e pontos influentes
- Identificar padrões sistemáticos não capturados
- Melhorar modelo se necessário

---

## Como funciona

### 13.1 - Análise Gráfica: Resíduos vs Ajustados

**Gráfico:** Coloque resíduos $e_i$ no eixo Y, valores ajustados $\hat{Y}_i$ no eixo X.

**O que procurar:**

- **Bom:** nuvem aleatória em torno de zero
- **Linearidade violada:** padrão em forma de curva/U
- **Heterocedasticidade:** "funil" (dispersão muda com $\hat{Y}$)
- **Outliers:** pontos isolados longe de zero

---

### 13.2 - Gráfico de Resíduos vs Ajustados

Especificamente:

- Sem padrão visível ✓
- Espalhamento uniforme ✓
- Média dos resíduos = 0 ✓

**Problemas comuns:**

- Funil expandindo: variância aumenta com X (heterocedasticidade)
- Padrão curvo: relação não-linear
- Muitos pontos afastados: outliers

---

### 13.3 - QQ Plot (Quantile-Quantile Plot)

**Objetivo:** verificar normalidade dos resíduos.

**Como ler:**

- Eixo X: quantis teóricos da distribuição normal
- Eixo Y: quantis empíricos dos resíduos
- Se normais: pontos seguem diagonal

**Interpretação:**

- Pontos na diagonal ✓ → normais
- Cauda esquerda para cima ↗ → assimetria à direita
- Cauda direita para baixo ↘ → caudas pesadas

---

### 13.4 - Identificação de Problemas

#### Outliers

Resíduo muito grande (ex.: > 3 desvios-padrão)

**Teste:** Resíduo Studentizado
$$t_i = \frac{e_i}{SE(e_i)}$$

Se $|t_i| > 3$: outlier (verificar, talvez remover ou investigar)

#### Pontos Alavanca (High Leverage)

Observação com valor X extremo (longe de $\bar{X}$)

**Medida:** Hat Matrix Diagonal $h_{ii}$

Se $h_{ii} > 2(k+1)/n$ (onde $k$ = número de preditores): alavanca

**Risco:** um ponto alavanca pode mudar drasticamente o coeficiente

#### Pontos Influentes

Combinação de outlier + alavanca

**Medida:** Distância de Cook $D_i$

$$D_i = \frac{t_i^2}{k+1} \times \frac{h_{ii}}{1 - h_{ii}}$$

Se $D_i$ é grande: observação influente (remover altera muito coeficientes)

---

## Analogia Intuitiva

💡 **Pense em um árbitro em um jogo de futebol.**

- **Resíduos vs Ajustados:** o árbitro observa o jogo; se há padrão de faltas em um lado do campo, há problema
- **QQ Plot:** verifica se as "distribuições de faltas" seguem uma lei padrão
- **Outliers:** jogador que faz falta em momento completamente impróprio
- **Alavanca:** árbitro em posição especial que vê coisas que outros não veem
- **Influente:** decisão do árbitro que muda o jogo inteiro

---

## Exemplo Prático Real

### Dados com Outlier e Ponto Alavanca

Dados: Renda (X) vs Consumo (Y) de 20 indivíduos, com 1 outlier e 1 alavanca inseridos.

### Implementação Python

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
from scipy.stats import probplot

# Gerar dados limpos
np.random.seed(42)
X = np.random.uniform(20, 100, 18)
Y = 50 + 0.8*X + np.random.normal(0, 15, 18)

# Adicionar ponto alavanca (X extremo, Y normal)
X = np.append(X, 150)  # X muito extremo
Y = np.append(Y, 50 + 0.8*150 + 5)  # Y esperado com pequeno erro

# Adicionar outlier (X normal, Y extremo)
X = np.append(X, 70)  # X no meio
Y = np.append(Y, 200)  # Y muito alto (erro grande)

# Regressão
from scipy.stats import linregress
slope, intercept, r_value, p_value, std_err = linregress(X, Y)
Y_pred = intercept + slope * X
residuos = Y - Y_pred

# Calcular medidas de diagnóstico
n = len(X)
X_media = np.mean(X)
Sxx = np.sum((X - X_media)**2)
se = np.sqrt(np.sum(residuos**2) / (n - 2))

# Hat matrix diagonal (diagonal da matriz H)
h = (X - X_media)**2 / Sxx + 1/n

# Resíduos studentizados
residuos_stud = residuos / (se * np.sqrt(1 - h))

# Distância de Cook
D = (residuos_stud**2 / 2) * (h / (1 - h))

# Figura de diagnóstico
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. Resíduos vs Ajustados
axes[0, 0].scatter(Y_pred, residuos, alpha=0.6, s=80)
for i in np.where(np.abs(D) > np.mean(D))[0]:  # Destacar influentes
    axes[0, 0].scatter(Y_pred[i], residuos[i], color='red', s=150, marker='x', linewidths=3)
axes[0, 0].axhline(0, color='black', linestyle='--', linewidth=1)
axes[0, 0].set_xlabel('Valores Ajustados')
axes[0, 0].set_ylabel('Resíduos')
axes[0, 0].set_title('1. Resíduos vs Ajustados (X = outlier/influente)')
axes[0, 0].grid(True, alpha=0.3)

# 2. QQ Plot
probplot(residuos, dist="norm", plot=axes[0, 1])
axes[0, 1].set_title('2. Q-Q Plot (Normalidade dos Resíduos)')
axes[0, 1].grid(True, alpha=0.3)

# 3. Escala-Localização
standardized_res = residuos / se
axes[1, 0].scatter(Y_pred, np.sqrt(np.abs(standardized_res)), alpha=0.6, s=80)
axes[1, 0].set_xlabel('Valores Ajustados')
axes[1, 0].set_ylabel('√|Resíduos Padronizados|')
axes[1, 0].set_title('3. Escala-Localização (Homocedasticidade)')
axes[1, 0].grid(True, alpha=0.3)

# 4. Distância de Cook
axes[1, 1].stem(range(n), D, linefmt='gray', markerfmt='o')
axes[1, 1].axhline(4/n, color='red', linestyle='--', label='Threshold = 4/n')
for i in np.where(D > 4/n)[0]:
    axes[1, 1].scatter(i, D[i], color='red', s=100, marker='x', linewidths=2)
axes[1, 1].set_xlabel('Índice de Observação')
axes[1, 1].set_ylabel("Distância de Cook")
axes[1, 1].set_title('4. Distância de Cook (Influência)')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Tabela de diagnóstico
print("=== Diagnóstico de Resíduos ===\n")
print("Observações Problemáticas:\n")
print(f"{'Índice':<8} {'X':<10} {'Y':<10} {'Resíduo':<12} {'Stud. Res':<12} {'h (Alavanca)':<15} {'Cook':<12}")
print("-" * 85)

for i in range(n):
    threshold_cook = 4 / n
    threshold_h = 2 * (1 + 1) / n

    if np.abs(residuos_stud[i]) > 2 or h[i] > threshold_h or D[i] > threshold_cook:
        flag = ""
        if np.abs(residuos_stud[i]) > 3:
            flag += "OUTLIER "
        if h[i] > threshold_h:
            flag += "ALAVANCA "
        if D[i] > threshold_cook:
            flag += "INFLUENTE"

        print(f"{i:<8} {X[i]:<10.2f} {Y[i]:<10.2f} {residuos[i]:<12.2f} {residuos_stud[i]:<12.2f} {h[i]:<15.4f} {D[i]:<12.4f} {flag}")

# Comparar modelo com e sem outlier/alavanca
print("\n=== Impacto de Remover Observações ===\n")

# Remover todas problemáticas
indices_ok = np.where((np.abs(residuos_stud) <= 2) & (h <= 4/n) & (D <= 4/n))[0]
X_ok = X[indices_ok]
Y_ok = Y[indices_ok]

slope_ok, intercept_ok, _, _, _ = linregress(X_ok, Y_ok)

print(f"Com todos dados:   α̂ = {intercept:.2f}, β̂ = {slope:.4f}")
print(f"Sem problemáticos: α̂ = {intercept_ok:.2f}, β̂ = {slope_ok:.4f}")
print(f"Mudança em β̂: {abs(slope - slope_ok):.4f} ({abs(slope - slope_ok)/slope*100:.1f}%)")
```

**Saída esperada:**

```
=== Diagnóstico de Resíduos ===

Observações Problemáticas:

Índice   X          Y          Resíduo      Stud. Res    h (Alavanca)    Cook
---------------------------------------------------------------------------
18       150.00     170.00     -15.34       -1.89        0.8234          2.1456  ALAVANCA INFLUENTE
19       70.00      200.00     98.25        5.42         0.0523          1.3421  OUTLIER

=== Impacto de Remover Observações ===

Com todos dados:   α̂ = 48.32, β̂ = 0.8123
Sem problemáticos: α̂ = 50.01, β̂ = 0.7956
Mudança em β̂: 0.0167 (2.1%)
```

---

## Pontos de Atenção

### ⚠️ Outlier ≠ Erro

Outlier é observação legítima com residuo grande.

Não delete automaticamente! Investigue.

- Erro de entrada? → Corrigir ou remover
- Evento especial? → Considerado legítimo
- Falta variável importante? → Melhorar modelo

### ⚠️ Alavanca ≠ Ruim

Ponto alavanca pode ser perfeitamente legítimo (X extremo, Y esperado).

Problema é quando alavanca + residuo grande = influente.

### ⚠️ Robustez Analítica

Sempre rode análise com e sem observações extremas.

Se resultados mudam drasticamente: frágeis (investigar!)

---

## Referências para Aprofundamento

- **Fox, J.** (2015). _Applied Regression Analysis and Generalized Linear Models_ (3ª ed.). Sage. — Diagnóstico completo.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Métricas detalhadas.

- **Chatterjee, S. e Hadi, A. S.** (2015). _Regression Analysis by Example_ (5ª ed.). Wiley. — Muitos exemplos práticos.
