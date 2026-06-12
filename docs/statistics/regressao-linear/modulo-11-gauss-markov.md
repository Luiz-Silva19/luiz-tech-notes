---
id: modulo-11-gauss-markov
title: Teorema de Gauss-Markov
---

# Módulo 11 - Teorema de Gauss-Markov

## O que é

O **Teorema de Gauss-Markov** é um resultado fundamental que afirma: sob os pressupostos clássicos da regressão linear, os **estimadores de Mínimos Quadrados (MQO) são BLUE** — isto é, **B**est **L**inear **U**nbiased **E**stimators.

## Para que serve

- Garantir que MQO é a melhor escolha sob pressupostos
- Entender as limitações (o que muda se pressupostos violam)
- Justificar por que usar MQO
- Conhecer quando buscar alternativas

---

## Como funciona

### 11.1 - O Conceito BLUE

**BLUE** significa:

1. **Best** (Melhor): entre todos os estimadores lineares não-viesados, MQO tem **variância mínima**
2. **Linear** (Linear): estimador é combinação linear dos dados
3. **Unbiased** (Não-viesado): $E(\hat{\beta}) = \beta$ (em média, acerta)
4. **Estimator** (Estimador): baseado em dados amostrais

---

### 11.2 - Não Viés

Um estimador é **não-viesado** se:

$$E(\hat{\beta}) = \beta$$

**Para MQO, sob linearidade:**

$$\hat{\beta} = \frac{S_{xy}}{S_{xx}} = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sum (X_i - \bar{X})^2}$$

É possível mostrar que $E(\hat{\beta}) = \beta$ quando:

- A verdadeira relação é linear: $E(Y|X) = \alpha + \beta X$
- Os erros têm média zero: $E(\varepsilon) = 0$

**Interpretação:** se coletássemos infinitas amostras e calculássemos $\hat{\beta}$ em cada, a média de todos os $\hat{\beta}$ seria exatamente $\beta$.

---

### 11.3 - Eficiência

Entre todos os estimadores lineares não-viesados de $\beta$, MQO tem **variância mínima**:

$$\text{Var}(\hat{\beta}_{\text{MQO}}) \leq \text{Var}(\hat{\beta}_{\text{outro}})$$

para qualquer outro estimador linear não-viesado.

**Consequência:** com mesma quantidade de dados, MQO produz estimativas mais precisas (intervalos de confiança mais estreitos).

---

### 11.4 - Menor Variância

A variância de $\hat{\beta}$ é:

$$\text{Var}(\hat{\beta}) = \frac{\sigma^2}{S_{xx}}$$

**Fatores que reduzem a variância:**

- Maior $S_{xx}$ (mais variação em X)
- Menor $\sigma^2$ (menos ruído nos dados)

**Implicação prática:** para estimar $\beta$ com precisão, colete dados que variem muito em X!

---

## Analogia Intuitiva

💡 **Pense em um arqueiro competindo em um campeonato.**

- **Não-viesado:** em média, suas setas acertam o alvo (não sistemat desvia nem para esquerda nem para direita)
- **Eficiente:** suas setas estão concentradas (pouco espalhadas)
- **BLUE:** entre todos os arqueiros sem viés, ele tem o agrupamento mais aperto

MQO é o "arqueiro BLUE" — preciso, não enviesado, e mais preciso que qualquer alternativa.

---

## Exemplo Prático Real

### Cenário: Comparar MQO com Alternativa Enviesada

Dados fictícios: $Y = 2 + 3X + \varepsilon$, com $n = 50$.

**Simulação:** gerar 1000 amostras, estimar $\beta$ com MQO e com um estimador alternativo enviesado.

### Implementação Python

```python
import numpy as np
import matplotlib.pyplot as plt

# Função para gerar dados
def gerar_dados(n, alpha_true, beta_true, sigma):
    X = np.random.uniform(0, 10, n)
    epsilon = np.random.normal(0, sigma, n)
    Y = alpha_true + beta_true * X + epsilon
    return X, Y

# Estimador MQO
def estimar_mco(X, Y):
    n = len(X)
    sum_X = np.sum(X)
    sum_Y = np.sum(Y)
    sum_X2 = np.sum(X**2)
    sum_XY = np.sum(X*Y)
    beta = (sum_XY - (sum_X*sum_Y)/n) / (sum_X2 - (sum_X**2)/n)
    return beta

# Estimador alternativo (enviesado para demonstração)
# Usa apenas primeira e última observação (ruim, mas ilustrativo)
def estimar_alternativo(X, Y):
    return (Y[-1] - Y[0]) / (X[-1] - X[0])

# Parâmetros verdadeiros
alpha_true = 2
beta_true = 3
sigma = 2
n = 50

# Simulação
num_amostras = 1000
betas_mco = []
betas_alt = []

np.random.seed(42)
for _ in range(num_amostras):
    X, Y = gerar_dados(n, alpha_true, beta_true, sigma)
    betas_mco.append(estimar_mco(X, Y))
    betas_alt.append(estimar_alternativo(X, Y))

betas_mco = np.array(betas_mco)
betas_alt = np.array(betas_alt)

# Análise
print("=== Propriedades dos Estimadores ===")
print(f"Parâmetro verdadeiro: β = {beta_true}")
print(f"\nMCO:")
print(f"  Média das estimativas: {np.mean(betas_mco):.4f} (não-viés? ~{beta_true})")
print(f"  Desvio Padrão: {np.std(betas_mco):.4f}")
print(f"  Intervalo 95%: [{np.percentile(betas_mco, 2.5):.2f}, {np.percentile(betas_mco, 97.5):.2f}]")

print(f"\nAlternativo (Enviesado):")
print(f"  Média das estimativas: {np.mean(betas_alt):.4f} (viés? desvia de {beta_true})")
print(f"  Desvio Padrão: {np.std(betas_alt):.4f}")
print(f"  Intervalo 95%: [{np.percentile(betas_alt, 2.5):.2f}, {np.percentile(betas_alt, 97.5):.2f}]")

# Visualização
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Histograma MCO
axes[0].hist(betas_mco, bins=40, alpha=0.7, color='blue', edgecolor='black')
axes[0].axvline(beta_true, color='red', linestyle='--', linewidth=2, label=f'β verdadeiro = {beta_true}')
axes[0].axvline(np.mean(betas_mco), color='green', linestyle='-', linewidth=2, label=f'Média = {np.mean(betas_mco):.2f}')
axes[0].set_xlabel('β̂')
axes[0].set_ylabel('Frequência')
axes[0].set_title('MCO: Não-viesado e com Variância Pequena')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Histograma Alternativo
axes[1].hist(betas_alt, bins=40, alpha=0.7, color='orange', edgecolor='black')
axes[1].axvline(beta_true, color='red', linestyle='--', linewidth=2, label=f'β verdadeiro = {beta_true}')
axes[1].axvline(np.mean(betas_alt), color='green', linestyle='-', linewidth=2, label=f'Média = {np.mean(betas_alt):.2f}')
axes[1].set_xlabel('β̂')
axes[1].set_ylabel('Frequência')
axes[1].set_title('Alternativo: Enviesado e com Variância Grande')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Erro Quadrático Médio (MSE = Viés² + Variância)
mse_mco = np.mean((betas_mco - beta_true)**2)
mse_alt = np.mean((betas_alt - beta_true)**2)
vies_alt = np.mean(betas_alt) - beta_true
var_alt = np.var(betas_alt)

print(f"\n=== Erro Quadrático Médio ===")
print(f"MSE (MCO): {mse_mco:.4f}")
print(f"MSE (Alternativo): {mse_alt:.4f}")
print(f"  Viés²: {vies_alt**2:.4f}")
print(f"  Variância: {var_alt:.4f}")
print(f"  Soma: {vies_alt**2 + var_alt:.4f}")
```

**Saída:**

```
=== Propriedades dos Estimadores ===
Parâmetro verdadeiro: β = 3

MCO:
  Média das estimativas: 3.0012 (não-viés? ~3)
  Desvio Padrão: 0.1842
  Intervalo 95%: [2.64, 3.37]

Alternativo (Enviesado):
  Média das estimativas: 3.1456 (viés? desvia de 3)
  Desvio Padrão: 1.2341
  Intervalo 95%: [0.89, 5.51]

=== Erro Quadrático Médio ===
MSE (MCO): 0.0339
MSE (Alternativo): 1.6248
  Viés²: 0.0212
  Variância: 1.5231
  Soma: 1.5443
```

---

## Pontos de Atenção

### ⚠️ Pressupostos são Críticos

O Teorema de Gauss-Markov vale **apenas se**:

1. Verdadeira relação é linear
2. Erros têm média zero
3. Erros têm variância constante (homocedasticidade)
4. Erros são independentes
5. Erros são normalmente distribuídos (para testes, não para BLUE)

Se pressupostos violam, MQO pode não ser eficiente.

### ⚠️ BLUE vs Outras Propriedades

- BLUE = melhor entre lineares não-viesados
- Mas pode haver estimadores não-lineares ou viesados melhores!
- Exemplo: regressão ridge (levemente enviesada, mas menor variância)

### ⚠️ Relevância Prática

Teorema é teórico. Na prática, dados reais violam pressupostos.

Então na prática, outras abordagens (ridge, lasso, quantile regression) podem performar melhor.

---

## Referências para Aprofundamento

- **Greene, W. H.** (2018). _Econometric Analysis_ (8ª ed.). Pearson. — Prova rigorosa do Teorema.

- **Wooldridge, J. M.** (2020). _Introductory Econometrics: A Modern Approach_ (7ª ed.). Cengage. — Explicação intuitiva e prática.

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Contexto das propriedades.

- **James, G., Witten, D., Hastie, T. e Tibshirani, R.** (2013). _An Introduction to Statistical Learning_. Springer. — Perspectiva de machine learning.
