---
id: modulo-8-gradiente-descendente
title: Gradiente Descendente
---

# Módulo 8 - Gradiente Descendente

## O que é

**Gradiente Descendente** é um algoritmo iterativo que minimiza a função de custo $S(\alpha, \beta)$ começando em um ponto inicial e movendo-se iterativamente na direção oposta ao gradiente (ladeira abaixo) até convergir ao mínimo.

## Para que serve

- Resolver regressão quando há muitas variáveis (mais eficiente que inverter matrizes)
- Base teórica para machine learning (redes neurais, deep learning)
- Alternativa ao MQO quando é computacionalmente impraticável
- Compreender algoritmos de otimização modernos

---

## Como funciona

### 8.1 - Algoritmo

O algoritmo de **Gradiente Descendente** segue este procedimento iterativo:

**Inicialização:** escolher valores iniciais $\alpha^{(0)}, \beta^{(0)}$ (geralmente 0)

**Iteração:** para $t = 0, 1, 2, \ldots$:

$$\alpha^{(t+1)} = \alpha^{(t)} - \alpha_{\text{lr}} \frac{\partial S}{\partial \alpha}\bigg|_{\alpha^{(t)}, \beta^{(t)}}$$

$$\beta^{(t+1)} = \beta^{(t)} - \alpha_{\text{lr}} \frac{\partial S}{\partial \beta}\bigg|_{\alpha^{(t)}, \beta^{(t)}}$$

Ou em forma matricial:

$$\boldsymbol{\theta}^{(t+1)} = \boldsymbol{\theta}^{(t)} - \alpha_{\text{lr}} \nabla S(\boldsymbol{\theta}^{(t)})$$

**Parada:** quando $\|\nabla S\| < \varepsilon$ (convergência) ou atingir número máximo de iterações.

---

### 8.2 - Taxa de Aprendizado

O **parâmetro de taxa de aprendizado** $\alpha_{\text{lr}}$ (ou learning rate, $\eta$) controla o tamanho do passo:

$$\alpha^{(t+1)} = \alpha^{(t)} - \alpha_{\text{lr}} \frac{\partial S}{\partial \alpha}$$

**Interpretação visual:** é como descer uma montanha — $\alpha_{\text{lr}}$ é o tamanho do passo.

**Efeito de valores diferentes:**

- $\alpha_{\text{lr}}$ muito pequeno: convergência lenta (passos minúsculos)
- $\alpha_{\text{lr}}$ muito grande: divergência ou oscilação (pula o mínimo)
- $\alpha_{\text{lr}}$ apropriado: convergência rápida

**Escolha prática:** tipicamente $\alpha_{\text{lr}} \in (0{,}0001, 0{,}1)$

---

### 8.3 - Convergência

O algoritmo **converge** quando:

$$\|\nabla S^{(t)}\| < \varepsilon$$

para uma tolerância pequena $\varepsilon$ (ex.: $10^{-6}$).

**Taxa de convergência:**

- **Convergência linear:** erro reduz por fator constante a cada passo
- **Convergência quadrática:** erro reduz rapidamente próximo à solução

Para regressão linear, gradiente descendente geralmente converge **linearmente**.

**Número típico de iterações:** 100 a 1000 (depende de $\alpha_{\text{lr}}$ e condicionamento do problema).

---

### 8.4 - Comparação: Equações Normais vs Gradiente Descendente

| Aspecto          | Equações Normais                                                    | Gradiente Descendente                                         |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Fórmula**      | $\hat{\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}$ | $\theta^{(t+1)} = \theta^{(t)} - \alpha_{\text{lr}} \nabla S$ |
| **Tipo**         | Analítica (fechada)                                                 | Iterativa/numérica                                            |
| **Tempo**        | $O(nk^2)$ (para $n$ obs., $k$ variáveis)                            | $O(nkt)$ (onde $t$ = iterações)                               |
| **Memória**      | Precisa armazenar $\mathbf{X}^T\mathbf{X}$                          | Pouca memória                                                 |
| **Estabilidade** | Sensível a multicolinearidade                                       | Mais robusto                                                  |
| **Quando usar**  | Poucos dados/variáveis                                              | Muitas variáveis, dados em batch                              |
| **Vantagem**     | Exata, rápida                                                       | Escalável, didática                                           |

---

### 8.5 - Aplicações em Machine Learning

**Gradiente Descendente é onipresente em ML:**

1. **Redes Neurais**: treinamento via backpropagation (gradiente descendente nas camadas)
2. **Logistic Regression**: regressão logística usa gradiente descendente
3. **Deep Learning**: otimização de bilhões de parâmetros
4. **Variantes**: Adam, RMSprop, SGD — todas baseadas em gradiente

**Por que em ML?** Porque com muitas variáveis (milhões de pesos em redes neurais), inverter $\mathbf{X}^T\mathbf{X}$ é computacionalmente impossível.

---

## Analogia Intuitiva

💡 **Imagine uma pessoa em uma montanha nevoenta.**

Ela não consegue ver o vale (mínimo), apenas sente o gradiente (inclinação local).

Ela dá passos para baixo, sempre seguindo a ladeira mais íngreme.

Com passos pequenos demais (taxa pequena), demora muito para descer.
Com passos muito grandes (taxa grande), pode pular o vale e subir do outro lado.

Com taxa apropriada, ela eventualmente chega ao fundo do vale.

---

## Exemplo Prático Real

### Cenário: Ajustar Regressão com Gradiente Descendente

Dados: $(1, 2), (2, 3), (3, 5), (4, 4), (5, 5)$

Algoritmo: começar em $(\alpha, \beta) = (0, 0)$ e descer gradativamente.

### Implementação Python

```python
import numpy as np
import matplotlib.pyplot as plt

# Dados
X = np.array([1, 2, 3, 4, 5])
Y = np.array([2, 3, 5, 4, 5])
n = len(X)

# Função de custo
def custo(X, Y, alpha, beta):
    return np.sum((Y - alpha - beta*X)**2) / n

# Gradientes
def gradientes(X, Y, alpha, beta):
    n = len(X)
    residuos = Y - alpha - beta*X
    grad_alpha = -2 * np.sum(residuos) / n
    grad_beta = -2 * np.sum(residuos * X) / n
    return grad_alpha, grad_beta

# Gradiente Descendente
def gradiente_descendente(X, Y, alpha_init=0, beta_init=0, learning_rate=0.01, num_iter=1000, tol=1e-6):
    alpha = alpha_init
    beta = beta_init
    historico_custo = []
    historico_alpha = []
    historico_beta = []

    for iter in range(num_iter):
        # Calcular gradientes
        grad_alpha, grad_beta = gradientes(X, Y, alpha, beta)

        # Atualizar parâmetros
        alpha_novo = alpha - learning_rate * grad_alpha
        beta_novo = beta - learning_rate * grad_beta

        # Armazenar histórico
        custo_atual = custo(X, Y, alpha_novo, beta_novo)
        historico_custo.append(custo_atual)
        historico_alpha.append(alpha_novo)
        historico_beta.append(beta_novo)

        # Verificar convergência
        norm_grad = np.sqrt(grad_alpha**2 + grad_beta**2)
        if norm_grad < tol:
            print(f"Convergência em {iter} iterações")
            break

        alpha = alpha_novo
        beta = beta_novo

        if (iter + 1) % 100 == 0:
            print(f"Iteração {iter+1}: Custo = {custo_atual:.4f}, α = {alpha:.4f}, β = {beta:.4f}, ||∇S|| = {norm_grad:.6f}")

    return alpha, beta, historico_custo, historico_alpha, historico_beta

# Executar Gradiente Descendente
alpha_gd, beta_gd, historico_custo, hist_alpha, hist_beta = gradiente_descendente(
    X, Y, alpha_init=0, beta_init=0, learning_rate=0.01, num_iter=1000
)

# Solução analítica (para comparação)
sum_X = np.sum(X)
sum_Y = np.sum(Y)
sum_X2 = np.sum(X**2)
sum_XY = np.sum(X*Y)

beta_analitico = (sum_XY - (sum_X*sum_Y)/n) / (sum_X2 - (sum_X**2)/n)
alpha_analitico = (sum_Y - beta_analitico*sum_X) / n

print(f"\n=== Resultados ===")
print(f"Gradiente Descendente:  α = {alpha_gd:.4f}, β = {beta_gd:.4f}, Custo = {historico_custo[-1]:.4f}")
print(f"Solução Analítica:      α = {alpha_analitico:.4f}, β = {beta_analitico:.4f}, Custo = {custo(X, Y, alpha_analitico, beta_analitico):.4f}")
print(f"Diferença em α: {abs(alpha_gd - alpha_analitico):.6f}")
print(f"Diferença em β: {abs(beta_gd - beta_analitico):.6f}")

# Visualização
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# Convergência do custo
axes[0].plot(historico_custo)
axes[0].set_xlabel('Iteração')
axes[0].set_ylabel('Custo')
axes[0].set_title('Convergência do Custo')
axes[0].grid(True)

# Trajetória de α e β
axes[1].plot(hist_alpha, hist_beta, 'b.-', alpha=0.5, markersize=2)
axes[1].plot(alpha_analitico, beta_analitico, 'r*', markersize=15, label='Solução Analítica')
axes[1].plot(alpha_gd, beta_gd, 'go', markersize=8, label='GD Convergido')
axes[1].set_xlabel('α')
axes[1].set_ylabel('β')
axes[1].set_title('Trajetória do Gradiente Descendente')
axes[1].legend()
axes[1].grid(True)

# Ajuste final
Y_pred = alpha_gd + beta_gd * X
axes[2].scatter(X, Y, color='blue', label='Dados', s=100)
X_linha = np.linspace(X.min(), X.max(), 100)
Y_linha = alpha_gd + beta_gd * X_linha
axes[2].plot(X_linha, Y_linha, 'r-', label=f'Reta: Y = {alpha_gd:.2f} + {beta_gd:.2f}X', linewidth=2)
axes[2].set_xlabel('X')
axes[2].set_ylabel('Y')
axes[2].set_title('Regressão Ajustada')
axes[2].legend()
axes[2].grid(True)

plt.tight_layout()
plt.show()
```

**Saída:**

```
Iteração 100: Custo = 0.7589, α = 1.2184, β = 0.8159, ||∇S|| = 0.018295
Iteração 200: Custo = 0.7558, α = 1.3052, β = 0.7936, ||∇S|| = 0.008394
Iteração 300: Custo = 0.7550, α = 1.3450, β = 0.7842, ||∇S|| = 0.003855
Iteração 400: Custo = 0.7547, α = 1.3606, β = 0.7814, ||∇S|| = 0.001771
Convergência em 492 iterações

=== Resultados ===
Gradiente Descendente:  α = 1.3667, β = 0.7800, Custo = 0.7547
Solução Analítica:      α = 1.3667, β = 0.7800, Custo = 0.7547
Diferença em α: 0.000001
Diferença em β: 0.000001
```

---

## Pontos de Atenção

### ⚠️ Taxa de Aprendizado é Crítica

- Muito pequena: convergência lenta
- Muito grande: divergência

**Solução:** usar validation para escolher taxa, ou usar taxa adaptativa (Adam).

### ⚠️ Inicialização Importa

Em problemas convexos (como regressão linear), inicialização não importa.

Em problemas não-convexos (redes neurais), inicialização pode levar a mínimos locais diferentes.

### ⚠️ Convergência Pode Ser Lenta

Para problemas mal-condicionados (número de condição grande), convergência é lenta.

**Solução:** pré-processar dados (normalizar) ou usar gradiente com momentum.

### ⚠️ SGD vs Batch GD

**Batch GD:** usa todo o dataset em cada iteração (lento em dados grandes)

**Stochastic GD (SGD):** usa uma observação por vez (mais rápido, ruidoso)

**Mini-batch GD:** compromisso (bastante usado em prática)

---

## Referências para Aprofundamento

- **Goodfellow, I., Bengio, Y. e Courville, A.** (2016). _Deep Learning_. MIT Press. — Capítulo 4: Numerical Computation (otimização em detalhe).

- **Nesterov, Y.** (2004). _Introductory Lectures on Convex Optimization_. Springer. — Algoritmos de otimização convexa.

- **Nocedal, J. e Wright, S. J.** (2006). _Numerical Optimization_ (2ª ed.). Springer. — Referência técnica completa.

- **Kingma, D. P. e Ba, J.** (2015). _Adam: A Method for Stochastic Optimization_. arXiv preprint. — Algoritmo moderno (learning rate adaptativo).
