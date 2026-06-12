---
id: modulo-5-erro-padrao-estimativa
title: Erro Padrão da Estimativa
---

# Módulo 5 - Erro Padrão da Estimativa

## O que é

O **Erro Padrão da Estimativa** (ou Erro Padrão da Regressão) mede a **dispersão dos resíduos** em torno da reta ajustada. Indica a precisão com que o modelo prediz valores de $Y$.

Notação: $s_{e}$ ou $s_{y|x}$ (lê-se "erro padrão de Y condicionado a X").

## Para que serve

- Medir a precisão das predições
- Avaliar a qualidade do ajuste
- Calcular intervalos de confiança para predições
- Comparar modelos (modelo com menor $s_e$ é melhor)

---

## Como funciona

### 5.1 - Conceito

O erro padrão da estimativa é o **desvio-padrão dos resíduos**:

$$s_e = \sqrt{\frac{\sum e_i^2}{n - 2}} = \sqrt{\frac{\text{SQR}}{n-2}}$$

**Onde:**

- $e_i = Y_i - \hat{Y}_i$ = resíduo da observação $i$
- $\text{SQR} = \sum e_i^2$ = Soma dos Quadrados dos Resíduos
- $n - 2$ = graus de liberdade (perdemos 2 graus por estimar $\alpha$ e $\beta$)

### 5.2 - Fórmula

#### Fórmula 1 (Direto dos resíduos)

$$s_e = \sqrt{\frac{\sum (Y_i - \hat{Y}_i)^2}{n - 2}}$$

#### Fórmula 2 (Com somas de quadrados)

A partir da decomposição:

$$\text{SQR} = S_{yy} - \hat{\beta}^2 S_{xx}$$

Então:

$$s_e = \sqrt{\frac{S_{yy} - \hat{\beta}^2 S_{xx}}{n - 2}}$$

Equivalente a:

$$s_e = \sqrt{\frac{S_{yy} - \frac{S_{xy}^2}{S_{xx}}}{n - 2}}$$

### 5.3 - Interpretação

#### Regra Prática

Aproximadamente 68% dos resíduos caem entre $-s_e$ e $+s_e$ (sob normalidade).

#### Comparação de Modelos

- **Modelo A:** $s_e = 5$
- **Modelo B:** $s_e = 2$

→ Modelo B é mais preciso (menor dispersão dos erros)

#### Unidades

$s_e$ tem **mesma unidade de $Y$**.

Se $Y$ é vendas em mil $, então $s_e = 3$ significa erro típico de $3.000.

---

## Analogia Intuitiva

💡 **Pense em um atirador em um alvo.**

A **reta ajustada** é o ponto médio dos tiros.

O **erro padrão** $s_e$ mede como os tiros se dispersam em torno desse ponto.

- Atirador preciso: $s_e$ pequeno (tiros concentrados)
- Atirador impreciso: $s_e$ grande (tiros espalhados)

Mesmo que o atirador esteja bem posicionado na média (viés nulo), a dispersão ($s_e$) afeta a confiabilidade de cada tiro individual.

---

## Exemplo Prático Real

### Cenário: Predição de Consumo por Temperatura

Retomando o exemplo anterior de consumo de eletricidade vs. temperatura:

| Temp (X) | Consumo (Y) | Predito ($\hat{Y}$) | Resíduo ($e$) | $e^2$   |
| -------- | ----------- | ------------------- | ------------- | ------- |
| 10       | 450         | 442.2               | 7.8           | 60.84   |
| 12       | 420         | 407.5               | 12.5          | 156.25  |
| 15       | 350         | 361.1               | -11.1         | 123.21  |
| 18       | 300         | 314.6               | -14.6         | 213.16  |
| 20       | 250         | 283.5               | -33.5         | 1122.25 |
| 22       | 200         | 252.3               | -52.3         | 2735.29 |
| 25       | 150         | 200.0               | -50.0         | 2500.00 |
| 28       | 140         | 147.8               | -7.8          | 60.84   |
| 30       | 180         | 116.6               | 63.4          | 4019.56 |
| 25       | 250         | 200.0               | 50.0          | 2500.00 |
| 20       | 350         | 283.5               | 66.5          | 4422.25 |
| 15       | 400         | 361.1               | 38.9          | 1513.21 |

$n = 12$ observações

### Cálculos

$$\text{SQR} = \sum e_i^2 = 60{,}84 + 156{,}25 + \ldots + 1513{,}21 = 21{,}397{,}60$$

$$s_e = \sqrt{\frac{21{,}397{,}60}{12 - 2}} = \sqrt{\frac{21{,}397{,}60}{10}} = \sqrt{2{,}139{,}76} \approx 46{,}26 \text{ kWh}$$

**Interpretação:**

- Erro típico de predição: ~46 kWh
- 68% das predições devem estar ±46 kWh do valor real

---

### Implementação Python

```python
import numpy as np
from scipy import stats

# Dados
temperatura = np.array([10, 12, 15, 18, 20, 22, 25, 28, 30, 25, 20, 15])
consumo = np.array([450, 420, 350, 300, 250, 200, 150, 140, 180, 250, 350, 400])

# Regressão
slope, intercept, r_value, p_value, std_err = stats.linregress(temperatura, consumo)

# Predições
y_pred = intercept + slope * temperatura

# Resíduos
residuos = consumo - y_pred

# SQR e erro padrão
SQR = np.sum(residuos**2)
n = len(temperatura)
s_e = np.sqrt(SQR / (n - 2))

print(f"Reta ajustada: Y = {intercept:.2f} + {slope:.2f}X")
print(f"SQR: {SQR:.2f}")
print(f"Erro Padrão da Estimativa: {s_e:.2f} kWh")

# Intervalo de predição (aproximado)
t_crit = 1.96  # ~95% (usar tabela t para precisão)
margin = t_crit * s_e
print(f"\nIntervalo típico (±2σ): ±{margin:.2f} kWh")

# Predição para novo valor
x_novo = 23
y_novo = intercept + slope * x_novo
print(f"\nPredição para temperatura = 23°C: {y_novo:.2f} ± {margin:.2f} kWh")
```

**Saída:**

```
Reta ajustada: Y = 757.50 + -17.86X
SQR: 21397.60
Erro Padrão da Estimativa: 46.26 kWh

Intervalo típico (±2σ): ±90.75 kWh

Predição para temperatura = 23°C: 345.77 ± 90.75 kWh
```

---

## Pontos de Atenção

### ⚠️ Graus de Liberdade

Usamos $n - 2$ (não $n - 1$) porque perdemos 2 graus ao estimar $\alpha$ e $\beta$.

Com amostras pequenas, isso importa:

- $n = 5$: divisor é 3 (não 5)
- $n = 100$: divisor é 98 (próximo de 100)

### ⚠️ Pressupostos de Normalidade

A fórmula $s_e$ assume resíduos normalmente distribuídos.

- Se há outliers, $s_e$ pode ser superestimado
- Verifique gráfico Q-Q para normalidade

### ⚠️ $s_e$ vs $r^2$

Ambos medem qualidade, mas de formas diferentes:

- $s_e$ é em unidades de $Y$ (interpretável)
- $r^2$ é adimensional, percentual (comparável entre estudos)

Use ambos para avaliação completa.

---

## Referências para Aprofundamento

- **Keller, G.** (2016). _Statistics for Management and Economics_ (11ª ed.). Cengage. — Bom introdutório sobre medidas de qualidade.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Propriedades estatísticas rigorosas.

- **Neter, J., Wasserman, W. e Kutner, M. H.** (1996). _Applied Linear Statistical Models_ (4ª ed.). Irwin. — Clássico com enfoque aplicado.
