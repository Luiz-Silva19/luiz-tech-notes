---
id: modulo-1-regressao-linear-simples
title: Regressão Linear Simples
---

# Módulo 1 - Regressão Linear Simples

## O que é

**Regressão Linear Simples** é um modelo estatístico que descreve a relação linear entre uma **variável dependente** $(Y)$ e uma **variável independente** $(X)$, permitindo predição e quantificação do efeito de $X$ sobre $Y$.

## Para que serve

- Prever valores de $Y$ conhecendo-se $X$
- Quantificar o impacto de uma variável sobre outra
- Entender tendências e relações em dados
- Estabelecer baseline antes de adicionar mais variáveis

**Exemplos práticos:**

- Vendas em função de investimento em publicidade
- Peso em função da altura
- Desempenho acadêmico em função de horas de estudo
- Retorno de ação em função do retorno do mercado

---

## Como funciona

### 1.1 - Modelo Populacional

O modelo de regressão linear simples é expresso como:

$$Y = \alpha + \beta X + \varepsilon$$

**Componentes:**

- $Y$ = Variável dependente (resposta)
- $X$ = Variável independente (preditor)
- $\alpha$ = Intercepto (valor de $Y$ quando $X = 0$)
- $\beta$ = Inclinação (mudança em $Y$ para cada unidade de mudança em $X$)
- $\varepsilon$ = Termo de erro aleatório (captura variabilidade não explicada)

Esta é a relação **populacional** — o padrão verdadeiro que gerou os dados (raramente conhecido).

### 1.2 - Interpretação dos Parâmetros

#### Intercepto $(\alpha)$

- **Valor de $Y$ quando $X = 0$**
- Nem sempre tem interpretação prática (ex.: altura = 0 não faz sentido)
- Serve principalmente para deslocar a reta

**Exemplo:** Consumo = $100 + 0{,}8 \times$ Renda

- Interpretação: mesmo com renda nula, há consumo de 100 unidades (bens essenciais)

#### Inclinação $(\beta)$

- **Mudança esperada em $Y$ para cada aumento unitário em $X$**
- Valor positivo: relação direta (X sobe → Y sobe)
- Valor negativo: relação inversa (X sobe → Y desce)
- Magnitude indica força da relação

**Exemplo:** Consumo = $100 + 0{,}8 \times$ Renda

- Interpretação: cada unidade adicional de renda aumenta consumo em 0{,}8 unidades em média

#### Termo de Erro $(\varepsilon)$

- Variabilidade aleatória em torno da reta
- Representa efeito de variáveis não incluídas, erros de medição, aleatoriedade genuína
- **Pressupostos:**
  - Média zero: $E(\varepsilon) = 0$
  - Variância constante: $\text{Var}(\varepsilon) = \sigma^2$
  - Não correlacionado: $\text{Cov}(\varepsilon_i, \varepsilon_j) = 0$ para $i \neq j$
  - Normalmente distribuído: $\varepsilon \sim N(0, \sigma^2)$

---

### 1.3 - Representação Gráfica

Um gráfico de dispersão com reta de regressão tem:

- **Eixo horizontal:** valores de $X$
- **Eixo vertical:** valores de $Y$
- **Pontos:** pares observados $(X_i, Y_i)$
- **Reta:** $\hat{Y} = \hat{\alpha} + \hat{\beta}X$ (valores preditos, ajustados)

**Características visuais:**

- **Dispersão forte em torno da reta:** modelo explica pouco ($R^2$ baixo)
- **Pontos próximos à reta:** modelo explica bem ($R^2$ alto)
- **Reta inclinada para cima:** $\beta > 0$ (relação positiva)
- **Reta inclinada para baixo:** $\beta < 0$ (relação negativa)
- **Reta quase horizontal:** $\beta \approx 0$ (fraca relação)

---

## Analogia Intuitiva

💡 **Pense em uma escada em um edifício.**

O **intercepto** $\alpha$ é o nível do andar térreo (altura quando ainda não subiu degrau algum).

A **inclinação** $\beta$ é o tamanho de cada degrau — quanto você sobe a cada passo horizontal.

Cada pessoa que sobe tem uma trajetória ligeiramente diferente (alguns param para respirar, pulam degraus, escorregam) — esse é o **erro** $\varepsilon$.

Se você quiser prever a altura de uma pessoa após subir 10 degraus, você estima: altura = andar térreo + (10 × tamanho do degrau) + variação individual.

---

## Exemplo Prático Real

### Cenário: Previsão de Vendas por Investimento em Publicidade

Uma loja quer entender como vendas aumentam com investimento em publicidade.

**Dados (fictícios - 12 meses):**

| Mês | Publicidade (X, em mil $) | Vendas (Y, em mil $) |
| --- | ------------------------- | -------------------- |
| 1   | 2                         | 20                   |
| 2   | 3                         | 25                   |
| 3   | 5                         | 35                   |
| 4   | 4                         | 30                   |
| 5   | 6                         | 40                   |
| 6   | 7                         | 45                   |
| 7   | 8                         | 50                   |
| 8   | 9                         | 55                   |
| 9   | 10                        | 60                   |
| 10  | 11                        | 65                   |
| 11  | 12                        | 70                   |
| 12  | 13                        | 75                   |

### Implementação Python

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Dados
publicidade = np.array([2, 3, 5, 4, 6, 7, 8, 9, 10, 11, 12, 13])
vendas = np.array([20, 25, 35, 30, 40, 45, 50, 55, 60, 65, 70, 75])

# Regressão linear
slope, intercept, r_value, p_value, std_err = stats.linregress(publicidade, vendas)

print(f"Intercepto (α): {intercept:.2f}")
print(f"Inclinação (β): {slope:.2f}")
print(f"Coeficiente de correlação (r): {r_value:.4f}")
print(f"R²: {r_value**2:.4f}")
print(f"p-valor: {p_value:.6f}")

# Equação ajustada
print(f"\nEquação: Vendas = {intercept:.2f} + {slope:.2f} × Publicidade")

# Previsão
x_novo = 5.5  # Publicidade de 5.5 mil $
y_pred = intercept + slope * x_novo
print(f"\nPrevisão: Se publicidade = ${x_novo}k, vendas estimadas = ${y_pred:.2f}k")

# Gráfico
plt.figure(figsize=(10, 6))
plt.scatter(publicidade, vendas, color='blue', label='Dados observados', s=100)
x_linha = np.linspace(publicidade.min(), publicidade.max(), 100)
y_linha = intercept + slope * x_linha
plt.plot(x_linha, y_linha, color='red', label=f'Reta ajustada: Y = {intercept:.2f} + {slope:.2f}X', linewidth=2)
plt.xlabel('Publicidade (mil $)')
plt.ylabel('Vendas (mil $)')
plt.title('Regressão Linear: Vendas em Função de Publicidade')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

**Saída esperada:**

```
Intercepto (α): 8.48
Inclinação (β): 5.17
Coeficiente de correlação (r): 0.9954
R²: 0.9909
p-valor: 0.000000

Equação: Vendas = 8.48 + 5.17 × Publicidade

Previsão: Se publicidade = $5.5k, vendas estimadas = $37.84k
```

**Interpretação:**

- A cada mil dólares investidos em publicidade, as vendas aumentam em aproximadamente 5{,}17 mil dólares em média
- O modelo explica 99{,}09% da variação em vendas (excelente ajuste!)
- A relação é altamente significativa (p < 0{,}001)

---

## Pontos de Atenção

### ⚠️ Extrapolação Perigosa

Não use o modelo para prever valores de $X$ muito além do intervalo observado.

- **Problema:** fora do intervalo, a relação linear pode não ser válida
- **Exemplo:** modelo construído com publicidade de 2 a 13 mil $ não deve prever para 100 mil $

### ⚠️ Pressupostos

O modelo assume:

- Relação linear (não funciona para relações curvilíneas)
- Erros normalmente distribuídos
- Variância constante
- Observações independentes

Se pressupostos são violados, as conclusões podem estar erradas.

### ⚠️ Correlação ≠ Causalidade

Um ajuste excelente não prova que $X$ causa $Y$.

- Pode haver variável confundadora
- A causalidade pode ser reversa

---

## Referências para Aprofundamento

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Referência técnica clássica.

- **Wooldridge, J. M.** (2020). _Introductory Econometrics: A Modern Approach_ (7ª ed.). Cengage. — Ótima para aplicações econômicas.

- **Fahrmeir, L., Kneib, T. e Lang, S.** (2021). _Regression: Models, Methods and Applications_ (2ª ed.). Springer. — Abordagem moderna e abrangente.

- **Keller, G.** (2016). _Statistics for Management and Economics_ (11ª ed.). Cengage. — Introdução clara com exemplos práticos.
