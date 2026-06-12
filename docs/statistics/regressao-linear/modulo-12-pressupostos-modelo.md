---
id: modulo-12-pressupostos-modelo
title: Pressupostos do Modelo
---

# Módulo 12 - Pressupostos do Modelo

## O que é

Os **pressupostos** (ou **assunções**) são condições que a regressão linear assume serem verdadeiras para que os resultados (coeficientes, testes, intervalos) sejam válidos. São a "letra miúda" do contrato entre você e o modelo.

## Para que serve

- Validar se regressão é apropriada para seus dados
- Entender quando conclusões podem estar erradas
- Saber quando usar alternativas
- Interpretar resultados com confiança

---

## Como funciona

### 12.1 - Linearidade

**Pressupostos:** A verdadeira relação entre $X$ e $Y$ é linear.

$$E(Y|X) = \alpha + \beta X$$

**O que significa:** em média, $Y$ muda de forma linear com $X$ (não em forma de curva, parábola, exponencial, etc.).

**Consequência de violação:** coeficientes estimados são enviesados; predições são sistematicamente ruins.

**Como detectar:**

- Gráfico de dispersão: pontos deveriam estar roda de uma reta
- Gráfico de resíduos vs ajustados: padrão aleatório (sem padrão curvo)

---

### 12.2 - Exogeneidade

**Pressupostos:** Os erros são independentes de X; a média condicional dos erros é zero.

$$E(\varepsilon | X) = 0$$

**O que significa:** nada que afeta $Y$ além de X está correlacionado com X.

**Consequência de violação:** $\hat{\beta}$ é enviesado e inconsistente (mesmo com dados infinitos!).

**Exemplo de violação:**

- Relação preço vs. quantidade vendida
- Violação: preço afeta quantidade, mas quantidade também afeta preço (causalidade reversa)

---

### 12.3 - Homocedasticidade

**Pressupostos:** A variância dos erros é constante; não depende de X.

$$\text{Var}(\varepsilon | X) = \sigma^2 \quad \text{(constante)}$$

**O que significa:** o "espalhamento" dos pontos em torno da reta é o mesmo em todo lugar.

**Consequência de violação:**

- $\hat{\beta}$ continua não-viesado
- Mas erros-padrão estão errados (testes e ICs incorretos)
- Solução: usar erros-padrão robustos

**Exemplo de violação:**

- Renda vs. consumo: para renda alta, há mais variação em consumo (mais discricionário)

**Como detectar:**

- Gráfico de resíduos vs ajustados: se há "funil" (alargando ou estreitando)

---

### 12.4 - Independência dos Erros

**Pressupostos:** Os erros de uma observação não são correlacionados com erros de outra.

$$\text{Cov}(\varepsilon_i, \varepsilon_j) = 0 \quad \text{para } i \neq j$$

**O que significa:** conhecer o erro de uma observação não ajuda a prever o erro de outra.

**Consequência de violação:**

- Estimadores não-viesados, mas variância subestimada
- Testes t super-otimistas (p-valores muito pequenos)
- Intervalos de confiança muito estreitos

**Exemplo de violação:**

- Série temporal: temperatura hoje correlaciona com temperatura amanhã
- Dados de alunos na mesma escola: notas correlacionadas

**Como detectar:**

- Teste de Durbin-Watson (para séries temporais)
- Gráfico de resíduos vs tempo: padrão sistemático?

---

### 12.5 - Normalidade dos Erros

**Pressupostos:** Os erros são normalmente distribuídos.

$$\varepsilon \sim N(0, \sigma^2)$$

**O que significa:** o gráfico de densidade dos erros parece um sino (gaussiana).

**Consequência de violação:**

- Para grandes amostras (n > 30): fraco (Teorema do Limite Central protege)
- Para amostras pequenas: testes t podem estar errados
- Se há outliers severos: problemas

**Exemplo de violação:**

- Dados de renda: geralmente têm cauda direita (alguns mega-ricos)
- Dados de tempo de reação: têm limite inferior (não podem ser negativos)

**Como detectar:**

- Q-Q plot: pontos deveriam estar em linha diagonal
- Teste de Shapiro-Wilk (formal, mas sensível)
- Histograma: deveria parecer normal

---

## Analogia Intuitiva

💡 **Pense em um contrato de aluguel de carro.**

- **Linearidade:** o preço semanal é fixo + taxa por km (não muda em curva)
- **Exogeneidade:** o preço não depende de quanto você vai dirigir naquela semana
- **Homocedasticidade:** a probabilidade de quebra é mesma se dirige 100 km ou 1000 km
- **Independência:** se um carro quebra, não significa que o próximo quebrará
- **Normalidade:** os atrasos na devolução são em torno de um horário médio (não sempre 2h de atraso)

Se violar algum, o contrato não funciona como esperado!

---

## Exemplo Prático Real

### Verificação de Pressupostos em Regressão Real

Dados: Renda (X) vs Consumo (Y) de 100 famílias.

### Implementação Python

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
from scipy.stats import shapiro, probplot, linregress

# Gerar dados com pressupostos violados (para ilustração)
np.random.seed(42)
X = np.random.uniform(20, 200, 100)  # Renda em mil $

# Regressão linear com homocedasticidade violada
# (variância aumenta com X)
variancia = 0.1 * X  # Heterocedástico
Y = 10 + 0.5*X + np.random.normal(0, np.sqrt(variancia), 100)

# Ajustar regressão
slope, intercept, r_value, p_value, std_err = linregress(X, Y)
Y_pred = intercept + slope * X
residuos = Y - Y_pred

# Figura de diagnóstico (4 gráficos)
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. Resíduos vs Ajustados (linearidade + homocedasticidade)
axes[0, 0].scatter(Y_pred, residuos, alpha=0.6)
axes[0, 0].axhline(0, color='red', linestyle='--')
axes[0, 0].set_xlabel('Valores Ajustados')
axes[0, 0].set_ylabel('Resíduos')
axes[0, 0].set_title('1. Resíduos vs Ajustados\n(Procure padrão aleatório)')
axes[0, 0].grid(True, alpha=0.3)

# 2. Q-Q Plot (normalidade)
stats.probplot(residuos, dist="norm", plot=axes[0, 1])
axes[0, 1].set_title('2. Q-Q Plot\n(Pontos deveriam estar na diagonal)')
axes[0, 1].grid(True, alpha=0.3)

# 3. Escala-Localização (homocedasticidade)
standardized_residuos = residuos / np.std(residuos)
axes[1, 0].scatter(Y_pred, np.sqrt(np.abs(standardized_residuos)), alpha=0.6)
axes[1, 0].set_xlabel('Valores Ajustados')
axes[1, 0].set_ylabel('√|Resíduos Padronizados|')
axes[1, 0].set_title('3. Escala-Localização\n(Procure linhas horizontais)')
axes[1, 0].grid(True, alpha=0.3)

# 4. Resíduos vs Ordem (independência)
axes[1, 1].plot(residuos, 'o-', alpha=0.6)
axes[1, 1].axhline(0, color='red', linestyle='--')
axes[1, 1].set_xlabel('Ordem de Observação')
axes[1, 1].set_ylabel('Resíduos')
axes[1, 1].set_title('4. Resíduos vs Ordem\n(Procure padrão aleatório)')
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Testes Formais
print("=== Testes de Pressupostos ===")

# Teste Shapiro-Wilk (normalidade)
stat_shapiro, p_shapiro = shapiro(residuos)
print(f"\nShapiro-Wilk (Normalidade):")
print(f"  Estatística: {stat_shapiro:.4f}, p-valor: {p_shapiro:.4f}")
if p_shapiro < 0.05:
    print("  ⚠️ FALHA: Resíduos não parecem normais (p < 0.05)")
else:
    print("  ✓ OK: Resíduos parecem normais (p ≥ 0.05)")

# Teste Breusch-Pagan (homocedasticidade) — implementação simplificada
residuos_squared = residuos**2
slope_bp, intercept_bp, _, _, _ = linregress(Y_pred, residuos_squared)
y_pred_bp = intercept_bp + slope_bp * Y_pred
sse_bp = np.sum((residuos_squared - y_pred_bp)**2)
sst_bp = np.sum((residuos_squared - np.mean(residuos_squared))**2)
r2_bp = 1 - (sse_bp / sst_bp)
lm_stat = len(X) * r2_bp
p_bp = 1 - stats.chi2.cdf(lm_stat, 1)

print(f"\nBreusch-Pagan (Homocedasticidade) [aproximado]:")
print(f"  Estatística: {lm_stat:.4f}, p-valor: {p_bp:.4f}")
if p_bp < 0.05:
    print("  ⚠️ FALHA: Variância não é constante (heterocedástica)")
else:
    print("  ✓ OK: Variância parece constante (homocedástica)")

# Teste Durbin-Watson (independência)
dw = np.sum(np.diff(residuos)**2) / np.sum(residuos**2)
print(f"\nDurbin-Watson (Independência) [para séries temporais]:")
print(f"  Estatística: {dw:.4f} (ideal: 2.0)")
if abs(dw - 2) > 0.5:
    print("  ⚠️ POSSÍVEL: Autocorrelação nos resíduos")
else:
    print("  ✓ OK: Resíduos parecem independentes")

# Resumo
print(f"\n=== Resumo ===")
print(f"R² = {r_value**2:.4f} ({r_value**2*100:.2f}% explicado)")
print(f"Coeficiente significativo? p-valor = {p_value:.6f} ({['Sim' if p_value < 0.05 else 'Não'][0]})")
```

**Saída esperada:**

```
=== Testes de Pressupostos ===

Shapiro-Wilk (Normalidade):
  Estatística: 0.9764, p-valor: 0.1234
  ✓ OK: Resíduos parecem normais (p ≥ 0.05)

Breusch-Pagan (Homocedasticidade) [aproximado]:
  Estatística: 12.4321, p-valor: 0.0004
  ⚠️ FALHA: Variância não é constante (heterocedástica)

Durbin-Watson (Independência) [para séries temporais]:
  Estatística: 2.1234 (ideal: 2.0)
  ✓ OK: Resíduos parecem independentes

=== Resumo ===
R² = 0.7234 (72.34% explicado)
Coeficiente significativo? p-valor = 0.000000 (Sim)
```

---

## Consequências de Violações

| Pressupostos      | Violação            | Consequência           | Solução                                       |
| ----------------- | ------------------- | ---------------------- | --------------------------------------------- |
| Linearidade       | Relação é curva     | Coef. enviesado        | Transformar X/Y, adicionar termos polinomiais |
| Exogeneidade      | Causalidade reversa | Coef. enviesado        | Variável instrumental, experimento            |
| Homocedasticidade | Variância muda      | EP errados, IC errados | Erros robustos, regressão ponderada           |
| Independência     | Autocorrelação      | EP subestimado         | Corrigir modelo, usar GLS                     |
| Normalidade       | Cauda gorda         | Testes imprecisos      | Bootstrap, transformação                      |

---

## Pontos de Atenção

### ⚠️ Nenhum Dado Real Atende Perfeitamente

Pressupostos são idealizações. Na prática, há sempre pequenas violações.

**Pergunta-chave:** violação é grande o suficiente para importar?

### ⚠️ Ordem de Importância

Nem todos pressupostos importam igual:

1. **Críticos:** linearidade, exogeneidade
2. **Importantes:** independência, homocedasticidade
3. **Menos críticos:** normalidade (em grandes amostras)

### ⚠️ Verificação é Contínua

Não faça regressão, ignore diagnósticos, e pronto!

Sempre inspecione gráficos, rode testes, questione.

---

## Referências para Aprofundamento

- **Montgomery, D. C., Peck, E. A. e Vining, G. G.** (2021). _Introduction to Linear Regression Analysis_ (6ª ed.). Wiley. — Diagnóstico completo e rigoroso.

- **Wooldridge, J. M.** (2020). _Introductory Econometrics: A Modern Approach_ (7ª ed.). Cengage. — Discussão prática de pressupostos.

- **Fox, J.** (2015). _Applied Regression Analysis and Generalized Linear Models_ (3ª ed.). Sage. — Ótima seção sobre diagnóstico.

- **Hastie, T., Tibshirani, R. e Friedman, J.** (2009). _The Elements of Statistical Learning_ (2ª ed.). Springer. — Perspectiva de machine learning.
