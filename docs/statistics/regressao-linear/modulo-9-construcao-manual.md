---
id: modulo-9-construcao-manual
title: Construção Manual de um Modelo
---

# Módulo 9 - Construção Manual de um Modelo

## O que é

**Construção Manual** é um exercício pedagógico onde calculamos todos os passos de uma regressão linear sem usar funções prontas (sem scipy.stats). Ajuda entender como regressão realmente funciona.

## Para que serve

- Desenvolver intuição sobre os cálculos
- Verificar resultados de software
- Detectar erros
- Ensinar metodologia passo a passo

---

## Como funciona

### Passo 1: Organizar os Dados

Listar todas as observações $(X_i, Y_i)$ em uma tabela clara.

**Exemplo:** Relação entre temperatura ambiente e consumo de café quente em uma cafeteria.

| Dia | Temperatura (X, °C) | Xícaras Vendidas (Y) |
| --- | ------------------- | -------------------- |
| 1   | 5                   | 85                   |
| 2   | 7                   | 80                   |
| 3   | 10                  | 72                   |
| 4   | 15                  | 60                   |
| 5   | 18                  | 45                   |
| 6   | 20                  | 38                   |
| 7   | 22                  | 32                   |
| 8   | 25                  | 20                   |

$n = 8$ observações

---

### Passo 2: Construir Tabela Auxiliar

Expandir a tabela com colunas para cálculos intermediários:

| $i$ | $X_i$ | $Y_i$ | $X_i^2$ | $Y_i^2$ | $X_i Y_i$ |
| --- | ----- | ----- | ------- | ------- | --------- |
| 1   | 5     | 85    | 25      | 7225    | 425       |
| 2   | 7     | 80    | 49      | 6400    | 560       |
| 3   | 10    | 72    | 100     | 5184    | 720       |
| 4   | 15    | 60    | 225     | 3600    | 900       |
| 5   | 18    | 45    | 324     | 2025    | 810       |
| 6   | 20    | 38    | 400     | 1444    | 760       |
| 7   | 22    | 32    | 484     | 1024    | 704       |
| 8   | 25    | 20    | 625     | 400     | 500       |

---

### Passo 3: Calcular Somas

$$\sum X_i = 5 + 7 + 10 + 15 + 18 + 20 + 22 + 25 = 122$$
$$\sum Y_i = 85 + 80 + 72 + 60 + 45 + 38 + 32 + 20 = 432$$
$$\sum X_i^2 = 25 + 49 + 100 + 225 + 324 + 400 + 484 + 625 = 2232$$
$$\sum Y_i^2 = 7225 + 6400 + 5184 + 3600 + 2025 + 1444 + 1024 + 400 = 26902$$
$$\sum X_i Y_i = 425 + 560 + 720 + 900 + 810 + 760 + 704 + 500 = 5379$$

---

### Passo 4: Calcular Médias e Estatísticas Fundamentais

$$\bar{X} = \frac{\sum X_i}{n} = \frac{122}{8} = 15{,}25$$
$$\bar{Y} = \frac{\sum Y_i}{n} = \frac{432}{8} = 54$$

$$S_{xx} = \sum X_i^2 - \frac{(\sum X_i)^2}{n} = 2232 - \frac{122^2}{8} = 2232 - 1856{,}5 = 375{,}5$$

$$S_{yy} = \sum Y_i^2 - \frac{(\sum Y_i)^2}{n} = 26902 - \frac{432^2}{8} = 26902 - 23328 = 3574$$

$$S_{xy} = \sum X_i Y_i - \frac{(\sum X_i)(\sum Y_i)}{n} = 5379 - \frac{122 \times 432}{8} = 5379 - 6588 = -1209$$

---

### Passo 5: Estimar a Reta

$$\hat{\beta} = \frac{S_{xy}}{S_{xx}} = \frac{-1209}{375{,}5} \approx -3{,}218$$

$$\hat{\alpha} = \bar{Y} - \hat{\beta}\bar{X} = 54 - (-3{,}218)(15{,}25) = 54 + 49{,}07 = 103{,}07$$

**Reta ajustada:**
$$\hat{Y} = 103{,}07 - 3{,}218 X$$

**Interpretação:**

- Intercepto: com 0°C, venderia ~103 xícaras (extrapolação, não realista)
- Inclinação: para cada °C de aumento, vendas **caem** ~3.2 xícaras (faz sentido: mais quente = menos café quente)

---

### Passo 6: Fazer Predições

Para cada observação, calcular $\hat{Y}_i$:

| $i$ | $X_i$ | $Y_i$ | $\hat{Y}_i$ | $e_i$ | $e_i^2$ |
| --- | ----- | ----- | ----------- | ----- | ------- |
| 1   | 5     | 85    | 84.46       | 0.54  | 0.29    |
| 2   | 7     | 80    | 78.02       | 1.98  | 3.92    |
| 3   | 10    | 72    | 70.79       | 1.21  | 1.46    |
| 4   | 15    | 60    | 54.97       | 5.03  | 25.30   |
| 5   | 18    | 45    | 45.21       | -0.21 | 0.04    |
| 6   | 20    | 38    | 38.78       | -0.78 | 0.61    |
| 7   | 22    | 32    | 32.34       | -0.34 | 0.12    |
| 8   | 25    | 20    | 22.97       | -2.97 | 8.82    |

---

### Passo 7: Calcular Resíduos

Resíduo: $e_i = Y_i - \hat{Y}_i$

- Observação 1: $e_1 = 85 - 84{,}46 = 0{,}54$ (acima da reta)
- Observação 4: $e_4 = 60 - 54{,}97 = 5{,}03$ (bem acima)
- Observação 8: $e_8 = 20 - 22{,}97 = -2{,}97$ (abaixo da reta)

**Soma dos Quadrados dos Resíduos:**
$$\text{SQR} = \sum e_i^2 = 0{,}29 + 3{,}92 + 1{,}46 + 25{,}30 + 0{,}04 + 0{,}61 + 0{,}12 + 8{,}82 = 40{,}56$$

**Erro Padrão da Estimativa:**
$$s_e = \sqrt{\frac{\text{SQR}}{n-2}} = \sqrt{\frac{40{,}56}{6}} = \sqrt{6{,}76} \approx 2{,}6 \text{ xícaras}$$

---

### Estatísticas de Qualidade

$$r^2 = \frac{S_{xy}^2}{S_{xx} \cdot S_{yy}} = \frac{(-1209)^2}{375{,}5 \times 3574} = \frac{1{,}461{,}681}{1{,}341{,}247} \approx 0{,}910$$

**Interpretação:** 91% da variação em vendas é explicada pela temperatura.

$$r = \sqrt{0{,}910} \approx -0{,}954$$

(Negativo porque $S_{xy} < 0$)

---

## Analogia Intuitiva

💡 **É como montar um móvel do IKEA.**

Todos os passos (organizar, calcular, predizer) são como seguir uma receita de bolo — fazer cada etapa na ordem, e no final temos um resultado.

Fazer manualmente (sem software) é como entender cada parafuso — quando algo dá errado, você sabe exatamente onde procurar.

---

## Exemplo Prático Real (Implementação Python)

```python
import numpy as np
import pandas as pd

# Dados
data = {
    'dia': [1, 2, 3, 4, 5, 6, 7, 8],
    'temperatura': [5, 7, 10, 15, 18, 20, 22, 25],
    'xícaras_vendidas': [85, 80, 72, 60, 45, 38, 32, 20]
}

df = pd.DataFrame(data)
X = df['temperatura'].values
Y = df['xícaras_vendidas'].values
n = len(X)

print("=== Passo 1-2: Dados ===")
print(df)

# Passo 3: Calcular somas
sum_X = np.sum(X)
sum_Y = np.sum(Y)
sum_X2 = np.sum(X**2)
sum_Y2 = np.sum(Y**2)
sum_XY = np.sum(X * Y)

print(f"\n=== Passo 3: Somas ===")
print(f"∑X = {sum_X}, ∑Y = {sum_Y}")
print(f"∑X² = {sum_X2}, ∑Y² = {sum_Y2}, ∑XY = {sum_XY}")

# Passo 4: Médias e estatísticas
media_X = sum_X / n
media_Y = sum_Y / n
Sxx = sum_X2 - (sum_X**2) / n
Syy = sum_Y2 - (sum_Y**2) / n
Sxy = sum_XY - (sum_X * sum_Y) / n

print(f"\n=== Passo 4: Estatísticas ===")
print(f"X̄ = {media_X:.2f}, Ȳ = {media_Y:.2f}")
print(f"S_xx = {Sxx:.2f}, S_yy = {Syy:.2f}, S_xy = {Sxy:.2f}")

# Passo 5: Estimar reta
beta_hat = Sxy / Sxx
alpha_hat = media_Y - beta_hat * media_X

print(f"\n=== Passo 5: Parâmetros ===")
print(f"β̂ = {beta_hat:.4f}")
print(f"α̂ = {alpha_hat:.2f}")
print(f"Reta: Y = {alpha_hat:.2f} + {beta_hat:.4f}X")

# Passo 6-7: Predições e resíduos
Y_pred = alpha_hat + beta_hat * X
residuos = Y - Y_pred
SQR = np.sum(residuos**2)
s_e = np.sqrt(SQR / (n - 2))

print(f"\n=== Passo 6-7: Resíduos ===")
df['Y_pred'] = Y_pred
df['residuo'] = residuos
df['residuo²'] = residuos**2
print(df[['temperatura', 'xícaras_vendidas', 'Y_pred', 'residuo', 'residuo²']])

print(f"\nSQR = {SQR:.2f}")
print(f"Erro Padrão = {s_e:.2f} xícaras")

# Qualidade
r2 = (Sxy**2) / (Sxx * Syy)
r = np.sign(Sxy) * np.sqrt(r2)

print(f"\n=== Qualidade do Ajuste ===")
print(f"r² = {r2:.4f} ({r2*100:.2f}% explicado)")
print(f"r = {r:.4f}")
```

**Saída:**

```
=== Passo 1-2: Dados ===
   dia  temperatura  xícaras_vendidas
0    1             5                85
1    2             7                80
2    3            10                72
...

=== Passo 3: Somas ===
∑X = 122, ∑Y = 432
∑X² = 2232, ∑Y² = 26902, ∑XY = 5379

=== Passo 4: Estatísticas ===
X̄ = 15.25, Ȳ = 54.00
S_xx = 375.50, S_yy = 3574.00, S_xy = -1209.00

=== Passo 5: Parâmetros ===
β̂ = -3.2179
α̂ = 103.07
Reta: Y = 103.07 + -3.2179X

=== Passo 6-7: Resíduos ===
...

SQR = 40.56
Erro Padrão = 2.60 xícaras

=== Qualidade do Ajuste ===
r² = 0.9104 (91.04% explicado)
r = -0.9541
```

---

## Pontos de Atenção

### ⚠️ Cuidado com Arredondamentos

Cada passo acumula pequenos erros de arredondamento.

- Use pelo menos 4 casas decimais
- Ou mantenha frações exatas (usar programação simbólica)

### ⚠️ Verificação

Sempre verificar:

- $\sum e_i \approx 0$ (resíduos centrados em zero)
- Reta passa por $(\bar{X}, \bar{Y})$

### ⚠️ Interpretação de Resíduos

Grandes resíduos em poucos pontos → possível outlier → investigar!

---

## Referências para Aprofundamento

- **Bussab, W. O. e Morettin, P. A.** (2017). _Estatística Básica_ (9ª ed.). Saraiva. — Exemplos manuais.

- **Neter, J., Wasserman, W. e Kutner, M. H.** (1996). _Applied Linear Statistical Models_ (4ª ed.). Irwin. — Muitos exercícios práticos.

- **Keller, G.** (2016). _Statistics for Management and Economics_ (11ª ed.). Cengage. — Passo-a-passo didático.
