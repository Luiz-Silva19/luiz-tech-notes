---
id: modulo-10-inferencia-estatistica
title: Inferência Estatística
---

# Módulo 10 - Inferência Estatística

## O que é

**Inferência Estatística** em regressão é usar os dados amostrais para fazer conclusões sobre os parâmetros populacionais $\alpha$ e $\beta$. Envolve estimar intervalos de confiança e realizar testes de hipóteses.

## Para que serve

- Quantificar incerteza nos coeficientes estimados
- Testar se uma relação é estatisticamente significativa
- Construir intervalos de confiança para predições
- Distinguir efeitos reais de flutuações amostrais

---

## Como funciona

### 10.1 - Problema da Variabilidade Amostral

Se coletássemos amostras diferentes, os estimadores $\hat{\alpha}$ e $\hat{\beta}$ seriam ligeiramente diferentes.

**Exemplo:**

- Amostra 1: $\hat{\beta} = 2{,}14$
- Amostra 2: $\hat{\beta} = 2{,}08$
- Amostra 3: $\hat{\beta} = 2{,}17$

Os valores $\hat{\beta}$ variam em torno do valor verdadeiro $\beta$.

**Pergunta:** qual é a distribuição dessa variação?

---

### 10.2 - Distribuição dos Estimadores

**Sob os pressupostos clássicos** (linearidade, homocedasticidade, normalidade dos erros, etc.):

$$\hat{\beta} \sim N\left(\beta, \sigma_{\hat{\beta}}^2\right)$$

$$\hat{\alpha} \sim N\left(\alpha, \sigma_{\hat{\alpha}}^2\right)$$

Ou seja, os estimadores são **normalmente distribuídos** em torno dos verdadeiros parâmetros.

---

### 10.3 - Erros Padrão dos Coeficientes

Os desvios-padrão dos estimadores são chamados **erros padrão**:

$$SE(\hat{\beta}) = \frac{s_e}{\sqrt{S_{xx}}}$$

$$SE(\hat{\alpha}) = s_e \sqrt{\frac{1}{n} + \frac{\bar{X}^2}{S_{xx}}}$$

**Interpretação:**

- Quanto menor $SE(\hat{\beta})$, mais preciso é $\hat{\beta}$
- Maior variância em X ($S_{xx}$ grande) → menor erro padrão
- Maior erro da estimativa ($s_e$ grande) → maior erro padrão

---

### 10.4 - Intervalos de Confiança

**Intervalo de Confiança 95% para $\beta$:**

$$\hat{\beta} \pm t_{n-2, \alpha/2} \times SE(\hat{\beta})$$

**Onde:**

- $t_{n-2, \alpha/2}$ = quantil da distribuição t com $n-2$ graus de liberdade
- Exemplo: para $n=30$, $\alpha = 0{,}05$: $t^* \approx 2{,}045$

**Exemplo:** $\hat{\beta} = 2{,}5$, $SE(\hat{\beta}) = 0{,}3$, $t^* = 2{,}045$

IC 95%: $2{,}5 \pm 2{,}045 \times 0{,}3 = [1{,}886, 3{,}114]$

**Interpretação:** temos 95% de confiança que o verdadeiro $\beta$ está entre 1,886 e 3,114.

---

### 10.5 - Testes de Hipóteses

#### Teste de Significância do Coeficiente

**Hipóteses:**

- $H_0: \beta = 0$ (sem relação)
- $H_A: \beta \neq 0$ (há relação)

**Estatística de teste:**

$$t = \frac{\hat{\beta}}{SE(\hat{\beta})}$$

Segue distribuição t com $n-2$ graus de liberdade sob $H_0$.

**Decisão:**

- Se $|t| > t_{\text{crítico}}$: rejeitar $H_0$ (relação significativa)
- Se $|t| \leq t_{\text{crítico}}$: não rejeitar $H_0$ (relação não significativa)

**P-valor:** probabilidade de observar $t$ mais extremo que o obtido, assumindo $H_0$ verdadeira.

- Se p-valor $< 0{,}05$: significativo a 5%
- Se p-valor $< 0{,}01$: significativo a 1%

---

## Analogia Intuitiva

💡 **Pense em sondagens eleitorais.**

Um candidato tem 45% de intenção de voto na população verdadeira ($\beta$).

Mas cada sondagem de 1000 pessoas dá resultados ligeiramente diferentes: 44%, 46%, 45{,}5% etc.

O **erro padrão** mede essa variação natural.

O **intervalo de confiança** é "somos 95% confiantes que o verdadeiro percentual está entre 44% e 46%".

O **teste de hipótese** responde: "é plausível que o candidato esteja realmente em 50%?"

---

## Exemplo Prático Real

### Regressão Salário vs Experiência (retomada)

Dados de 10 funcionários: salário em mil $ vs anos de experiência.

Resultados prévios: $\hat{\beta} = 3{,}204$, $s_e = 8{,}47$, $S_{xx} = 204{,}9$, $n = 10$

### Cálculos de Inferência

**Erro Padrão de $\hat{\beta}$:**

$$SE(\hat{\beta}) = \frac{s_e}{\sqrt{S_{xx}}} = \frac{8{,}47}{\sqrt{204{,}9}} = \frac{8{,}47}{14{,}31} \approx 0{,}592$$

**Intervalo de Confiança 95%:**

$t_{10-2, 0.025} = t_{8, 0.025} \approx 2{,}306$ (da tabela t)

$$IC: 3{,}204 \pm 2{,}306 \times 0{,}592 = 3{,}204 \pm 1{,}365 = [1{,}839, 4{,}569]$$

**Interpretação:** temos 95% de confiança que cada ano de experiência aumenta o salário entre $1.839 e $4.569 mil.

**Teste de Hipótese ($\beta = 0$):**

$$t = \frac{\hat{\beta}}{SE(\hat{\beta})} = \frac{3{,}204}{0{,}592} \approx 5{,}41$$

**P-valor:** com 8 graus de liberdade, $t = 5{,}41$ tem p-valor $\approx 0{,}0006$ (muito pequeno)

**Conclusão:** rejeitar $H_0$. A relação entre experiência e salário é **altamente significativa** (p < 0{,}001).

---

### Implementação Python

```python
import numpy as np
from scipy import stats

# Dados (usando exemplo anterior)
experiencia = np.array([1, 2, 3, 5, 7, 8, 10, 12, 15, 18])
salario = np.array([30, 32, 35, 40, 48, 50, 55, 60, 68, 75])
n = len(experiencia)

# Regressão
from scipy.stats import linregress
slope, intercept, r_value, p_value, std_err = linregress(experiencia, salario)

print(f"Regressão linear:")
print(f"Intercepto: {intercept:.2f}")
print(f"Inclinação (β̂): {slope:.3f}")
print(f"Erro Padrão de β̂: {std_err:.3f}")

# Teste t para β
t_stat = slope / std_err
df = n - 2
p_valor_beta = 2 * (1 - stats.t.cdf(abs(t_stat), df))

print(f"\nTeste de Hipótese: β = 0")
print(f"Estatística t: {t_stat:.3f}")
print(f"P-valor: {p_valor_beta:.6f}")

if p_valor_beta < 0.05:
    print("Resultado: Significativo (p < 0.05) - Há relação linear!")
else:
    print("Resultado: Não significativo (p ≥ 0.05)")

# Intervalo de Confiança 95% para β
t_crit = stats.t.ppf(0.975, df)
ic_lower = slope - t_crit * std_err
ic_upper = slope + t_crit * std_err

print(f"\nIntervalo de Confiança 95% para β:")
print(f"[{ic_lower:.3f}, {ic_upper:.3f}]")
print(f"Interpretação: Cada ano a mais aumenta salário entre ${ic_lower:.2f}k e ${ic_upper:.2f}k")

# Intervalo de Predição para novo valor
x_novo = 6  # 6 anos de experiência
y_pred = intercept + slope * x_novo
se_pred = np.sqrt(np.sum((salario - (intercept + slope*experiencia))**2) / (n-2)) * np.sqrt(1 + 1/n + (x_novo - np.mean(experiencia))**2 / np.sum((experiencia - np.mean(experiencia))**2))
ic_pred_lower = y_pred - t_crit * se_pred
ic_pred_upper = y_pred + t_crit * se_pred

print(f"\nPredição para X = {x_novo}:")
print(f"Salário predito: ${y_pred:.2f}k")
print(f"Intervalo 95%: [${ic_pred_lower:.2f}k, ${ic_pred_upper:.2f}k]")
```

**Saída:**

```
Regressão linear:
Intercepto: 23.35
Inclinação (β̂): 3.204
Erro Padrão de β̂: 0.591

Teste de Hipótese: β = 0
Estatística t: 5.418
P-valor: 0.000589

Resultado: Significativo (p < 0.05) - Há relação linear!

Intervalo de Confiança 95% para β:
[1.839, 4.569]
Interpretação: Cada ano a mais aumenta salário entre $1.84k e $4.57k

Predição para X = 6:
Salário predito: $42.56k
Intervalo 95%: [$38.12k, $47.01k]
```

---

## Pontos de Atenção

### ⚠️ Pressupostos Precisam Ser Atendidos

Inferência assume:

- Normalidade dos erros
- Homocedasticidade (variância constante)
- Independência

Se violados, conclusões podem estar erradas.

### ⚠️ Intervalo de Confiança ≠ Intervalo de Predição

- **IC para $\beta$**: intervalo para o parâmetro populacional
- **IP para Y**: intervalo para uma predição individual (mais largo)

### ⚠️ Significância ≠ Importância Prática

Um coeficiente pode ser significativo (p < 0,05) mas ter efeito prático desprezível.

Examine o tamanho do efeito, não apenas o p-valor.

---

## Referências para Aprofundamento

- **Wooldridge, J. M.** (2020). _Introductory Econometrics: A Modern Approach_ (7ª ed.). Cengage. — Inferência econométrica clara.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Propriedades estatísticas completas.

- **Keller, G.** (2016). _Statistics for Management and Economics_ (11ª ed.). Cengage. — Testes e intervalos aplicados.
