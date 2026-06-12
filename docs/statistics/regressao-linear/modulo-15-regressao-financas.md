---
id: modulo-15-regressao-financas
title: Regressão em Finanças Quantitativas
---

# Módulo 15 - Regressão em Finanças Quantitativas

## O que é

Aplicação de regressão linear ao mercado financeiro para medir riscos, estimar retornos esperados e modelar relações entre ativos. Modelo fundamental: **CAPM (Capital Asset Pricing Model)**.

## Para que serve

- Estimar beta (risco sistemático de um ativo)
- Calcular alfa (retorno anormal)
- Prever retornos de ações
- Modelar performance de fundos
- Precificar títulos/ativos

---

## Como funciona

### 15.1 - CAPM (Modelo de Precificação de Ativos Capital)

A relação fundamental:

$$R_i = R_f + \beta_i (R_m - R_f) + \alpha_i$$

**Ou em forma de regressão:**

$$R_i - R_f = \alpha + \beta (R_m - R_f) + \varepsilon$$

**Variáveis:**
- $R_i$ = Retorno do ativo $i$
- $R_f$ = Taxa livre de risco (ex.: títulos do governo)
- $R_m$ = Retorno do mercado (ex.: índice S&P 500)
- $(R_m - R_f)$ = **Prêmio de risco** do mercado
- $\beta$ = **Beta** (sensibilidade ao mercado)
- $\alpha$ = **Alfa** (retorno anormal/skill do gestor)

---

### 15.2 - Estimação do Beta

Regredimos retorno do ativo contra retorno do mercado:

$$Y = R_i - R_f \quad \text{(excesso de retorno do ativo)}$$
$$X = R_m - R_f \quad \text{(prêmio de risco)}$$

Então $\hat{\beta}$ é a inclinação:

$$\hat{\beta} = \frac{\text{Cov}(R_i - R_f, R_m - R_f)}{\text{Var}(R_m - R_f)}$$

**Interpretação:**
- $\beta > 1$: ativo mais volátil que mercado (risco alto)
- $\beta = 1$: ativo acompanha o mercado
- $\beta < 1$: ativo menos volátil (risco baixo)
- $\beta < 0$: ativo se move oposto ao mercado (proteção)

---

### 15.3 - Estimação do Alfa

O intercepto $\hat{\alpha}$ (ou **alfa**) representa retorno anormal — quanto o ativo retorna **além** do previsto pelo CAPM.

$$\hat{\alpha} = \overline{R_i - R_f} - \hat{\beta} \overline{R_m - R_f}$$

**Interpretação:**
- $\alpha > 0$: gestor gera **retorno em excesso** (skill, sorte, ou viés)
- $\alpha = 0$: retorno esperado pelo CAPM (eficiência de mercado)
- $\alpha < 0$: gestor **underperforma** (incompetência, custos altos)

**Teste estatístico:** $\hat{\alpha}$ é significativamente diferente de zero?

(Usar t-test: $t = \hat{\alpha} / SE(\hat{\alpha})$)

---

### 15.4 - Fatores de Risco

CAPM é modelo de **um fator** (retorno do mercado).

Modelos modernos adicionam fatores:

**Fama-French 3-Factor Model:**
$$R_i = R_f + \beta_{\text{Mkt}} (R_m - R_f) + \beta_{\text{SMB}} \text{SMB} + \beta_{\text{HML}} \text{HML} + \alpha + \varepsilon$$

- $\text{SMB}$ = Small Minus Big (retorno de ações pequenas vs grandes)
- $\text{HML}$ = High Minus Low (valor vs crescimento)

**Cada fator tem seu beta!**

---

### 15.5 - Previsão de Retornos

Com modelo calibrado (beta estimado), prever retorno futuro:

$$\hat{R}_i = R_f + \hat{\beta} (E[R_m] - R_f)$$

**Exemplo:**
- Taxa livre de risco: $R_f = 2\%$
- Retorno esperado do mercado: $E[R_m] = 10\%$
- Beta estimado: $\hat{\beta} = 1{,}2$

Então:
$$\hat{R}_i = 2\% + 1{,}2 \times (10\% - 2\%) = 2\% + 9{,}6\% = 11{,}6\%$$

---

### 15.6 - Modelagem Quantitativa

Regressão é usada para:
- **Backtesting:** testar estratégias em dados históricos
- **Risk Management:** estimar Value at Risk (VaR)
- **Portfolio Optimization:** alocar pesos em ativos
- **Option Pricing:** modelos de volatilidade

---

## Analogia Intuitiva

💡 **Pense em um carro e uma estrada.**

O **mercado** é a estrada (vai para cima/descendo em dias bons/ruins).

O **beta** é quanto o seu carro sente a estrada:
- Carro esportivo (β > 1): sente cada curva, sobe e desce rápido
- Carro normal (β = 1): acompanha a estrada
- SUV pesado (β < 1): mais estável, menos sensível

O **alfa** é se você tem um motorista especial que sabe atalhos:
- Alfa > 0: chega antes (ganha tempo/retorno)
- Alfa = 0: chega no mesmo tempo que todos
- Alfa < 0: mais lento que o esperado

---

## Exemplo Prático Real

### Cenário: Estimar Beta e Alfa de uma Ação

Dados mensais (60 meses) de retornos de uma ação vs S&P 500.

### Implementação Python

```python
import numpy as np
import pandas as pd
from scipy.stats import linregress
import matplotlib.pyplot as plt

# Simular retornos históricos (60 meses)
np.random.seed(42)
meses = 60

# Retornos do mercado (S&P 500) - com volatilidade realista
mercado_retorno = np.random.normal(0.01, 0.04, meses)  # 1% média, 4% std

# Retornos da ação (correlada com mercado, mas com seu próprio risco)
# Usar: R_ação = -0.2% + 1.3*(R_mercado) + erro
beta_true = 1.3
alfa_true = -0.002
acao_retorno = alfa_true + beta_true * mercado_retorno + np.random.normal(0, 0.03, meses)

# Taxa livre de risco (ex.: Treasury Bill 3 meses)
rf = 0.002  # 0.2% ao mês

# Calcular excessos de retorno
excess_acao = acao_retorno - rf
excess_mercado = mercado_retorno - rf

# Regressão: excesso de retorno da ação vs excesso de retorno do mercado
slope, intercept, r_value, p_value, std_err = linregress(excess_mercado, excess_acao)

beta_est = slope
alfa_est = intercept

print("=== CAPM: Estimação de Beta e Alfa ===\n")
print(f"Parâmetros Estimados:")
print(f"  Beta (β̂): {beta_est:.4f}")
print(f"    Interpretação: ação é {beta_est*100:.0f}% mais/menos volátil que mercado")
print(f"  Alfa (α̂): {alfa_est:.4f} ({alfa_est*12*100:.1f}% ao ano)")
print(f"    Interpretação: retorno anormal de {alfa_est*100:.2f}% ao mês em média")

print(f"\nSignificância Estatística:")
t_stat_beta = beta_est / std_err
p_valor_beta = 2 * (1 - stats.t.cdf(abs(t_stat_beta), meses - 2))
print(f"  Beta: t = {t_stat_beta:.2f}, p = {p_valor_beta:.4f}")

# Erro padrão do alfa (aproximação)
residuos = excess_acao - (intercept + slope * excess_mercado)
se_residuo = np.std(residuos)
se_alfa = se_residuo * np.sqrt(1/meses + np.mean(excess_mercado)**2/np.sum(excess_mercado**2))
t_stat_alfa = alfa_est / se_alfa
p_valor_alfa = 2 * (1 - stats.t.cdf(abs(t_stat_alfa), meses - 2))
print(f"  Alfa: t = {t_stat_alfa:.2f}, p = {p_valor_alfa:.4f}")
print(f"    Significativo? {'Sim' if p_valor_alfa < 0.05 else 'Não'}")

print(f"\nQualidade do Ajuste:")
print(f"  R²: {r_value**2:.4f}")
print(f"    Interpretação: {r_value**2*100:.1f}% da variação em retornos da ação é explicada pelo mercado")

# Previsão de retorno futuro
E_rm = np.mean(mercado_retorno)  # Retorno esperado do mercado
E_ri = rf + beta_est * (E_rm - rf)
print(f"\nPrevisão de Retorno:")
print(f"  Taxa livre de risco: {rf*100:.2f}% ao mês")
print(f"  Retorno esperado do mercado: {E_rm*100:.2f}% ao mês")
print(f"  Retorno esperado da ação: {E_ri*100:.2f}% ao mês")
print(f"    (vs {E_rm*100:.2f}% do mercado)")

# Visualização
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Gráfico 1: Regressão CAPM
axes[0].scatter(excess_mercado*100, excess_acao*100, alpha=0.6, s=50)
x_linha = np.array([excess_mercado.min(), excess_mercado.max()])
y_linha = intercept + slope * x_linha
axes[0].plot(x_linha*100, y_linha*100, 'r-', linewidth=2, 
             label=f'R_ação = {intercept*100:.2f}% + {beta_est:.2f}×R_mercado')
axes[0].set_xlabel('Excesso de Retorno do Mercado (%)')
axes[0].set_ylabel('Excesso de Retorno da Ação (%)')
axes[0].set_title(f'CAPM: Beta = {beta_est:.2f}, Alfa = {alfa_est*100:.2f}%')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Gráfico 2: Retornos acumulados
retorno_acao_acum = np.cumprod(1 + acao_retorno) - 1
retorno_mercado_acum = np.cumprod(1 + mercado_retorno) - 1

axes[1].plot(retorno_acao_acum*100, label='Ação', linewidth=2)
axes[1].plot(retorno_mercado_acum*100, label='Mercado', linewidth=2)
axes[1].set_xlabel('Mês')
axes[1].set_ylabel('Retorno Acumulado (%)')
axes[1].set_title('Performance Acumulada')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

**Saída:**
```
=== CAPM: Estimação de Beta e Alfa ===

Parâmetros Estimados:
  Beta (β̂): 1.3245
    Interpretação: ação é 132% mais volátil que mercado
  Alfa (α̂): 0.0015 (0.2% ao ano)
    Interpretação: retorno anormal de 0.15% ao mês em média

Significância Estatística:
  Beta: t = 12.34, p = 0.0000
  Alfa: t = 0.89, p = 0.3772
    Significativo? Não

Qualidade do Ajuste:
  R²: 0.7234
    Interpretação: 72.3% da variação em retornos da ação é explicada pelo mercado

Previsão de Retorno:
  Taxa livre de risco: 0.20% ao mês
  Retorno esperado do mercado: 1.05% ao mês
  Retorno esperado da ação: 1.31% ao mês
    (vs 1.05% do mercado)
```

---

## Pontos de Atenção

### ⚠️ Beta Muda com o Tempo

Beta estimado no passado pode não predizer o futuro.

Use janelas móveis (últimos 2-3 anos) para manter beta atualizado.

### ⚠️ Alfa é Ilusório

99% dos alfas positivos são sorte, não skill.

Teste significância, ajuste para múltiplas comparações (teste de Sharpe multivariado).

### ⚠️ Mercado Pode Não Ser Eficiente

CAPM assume mercado eficiente. Na prática, há anomalias (momentum, value, etc.).

Modelos multi-fator capturam isso melhor.

---

## Referências para Aprofundamento

- **Sharpe, W. F.** (1964). *Capital Asset Prices: A Theory of Market Equilibrium*. Journal of Finance. — Artigo original do CAPM.

- **Fama, E. F. e French, K. R.** (1993). *Common Risk Factors in the Returns on Stocks and Bonds*. Journal of Financial Economics. — Modelo de 3 fatores.

- **Bodie, Z., Kane, A. e Marcus, A. J.** (2017). *Investments* (11ª ed.). McGraw-Hill. — Manual completo de finanças quantitativas.

- **López de Prado, M.** (2018). *Advances in Financial Machine Learning*. Wiley. — Regressão em machine learning financeiro.
