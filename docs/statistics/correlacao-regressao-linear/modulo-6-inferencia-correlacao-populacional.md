---
id: modulo-6-inferencia-correlacao-populacional
title: Módulo 6 - Inferência sobre a Correlação Populacional
sidebar_label: M6 - Inferência de Pearson
---

## O que é

Este módulo trata da inferência estatística sobre a correlação populacional $\rho$, distinguindo-a da correlação amostral $r$ e formalizando o teste de hipótese para $\rho = 0$.

## Para que serve

- Generalizar conclusões da amostra para a população.
- Testar se há evidência de associação linear populacional.
- Quantificar incerteza estatística com p-valor e regra de decisão.

## Como funciona

### 14. Correlação Populacional ($\rho$)

- $r$: estatística calculada na amostra.
- $\rho$: parâmetro verdadeiro (desconhecido) da população.
- Diferenças entre amostras geram variabilidade amostral de $r$.

### 15. Teste de Hipótese para $\rho = 0$

Hipóteses típicas:

$$
H_0: \rho = 0 \quad \text{vs} \quad H_1: \rho \ne 0
$$

Estatística de teste:

$$
t = r\sqrt{\frac{n-2}{1-r^2}}
$$

com graus de liberdade $gl = n-2$.

Passos:

1. Calcular $r$ na amostra.
2. Calcular $t$ e p-valor.
3. Comparar com nível de significância $\alpha$.
4. Rejeitar ou não rejeitar $H_0$.

### 16. Pressupostos do Teste

- Normalidade bivariada (ideal teórico).
- Independência entre observações.
- Robustez maior para amostras grandes, mas não ilimitada.
- Limitações: outliers e não linearidade podem invalidar interpretação.

## Analogia Intuitiva

É como fazer auditoria em uma rede de lojas com base em amostragem: o resultado local (amostra) dá pista sobre a rede inteira (população), mas existe margem de incerteza e regras formais para decidir se a evidência é suficiente.

## Exemplo Prático Real

Você quer testar se existe correlação linear entre horas de treino e desempenho de atletas.

```python
from scipy.stats import pearsonr

horas = [4, 5, 6, 7, 7, 8, 9, 10]
desempenho = [55, 57, 60, 62, 63, 66, 68, 70]

r, p_valor = pearsonr(horas, desempenho)
print(f"r={r:.3f}, p-valor={p_valor:.4f}")
```

Se $p$ for menor que $\alpha$ (por exemplo 0,05), há evidência contra $H_0$.

## Pontos de Atenção

- Significância estatística não implica relevância prática.
- Amostra pequena pode reduzir poder do teste.
- Violação de pressupostos pede alternativas robustas ou não paramétricas.
- Sempre reportar $r$, p-valor e contexto.

## Referências para Aprofundamento

- SciPy docs, `pearsonr`: <a href="https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.pearsonr.html" target="_blank" rel="noopener noreferrer">implementação e hipóteses</a>
- OpenIntro, Inferência para correlação: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">abordagem didática com exemplos</a>
- Casella & Berger, Statistical Inference: <a href="https://www.cengage.com/c/statistical-inference-2e-casella/" target="_blank" rel="noopener noreferrer">fundamentos formais de testes de hipótese</a>
