---
id: modulo-3-correlacao-pearson
title: Módulo 3 - Correlação Linear de Pearson
sidebar_label: M3 - Pearson
---

## O que é

Este módulo apresenta a base matemática da correlação linear de Pearson, começando pela covariância e avançando para o coeficiente $r$ e suas propriedades.

## Para que serve

- Medir intensidade e direção de associação linear.
- Comparar relações entre pares de variáveis.
- Entender limites e sensibilidades do coeficiente.

## Como funciona

### 5. Covariância

A covariância amostral pode ser escrita como:

$$
s_{xy} = \frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})
$$

- Interpretação: positiva quando variam no mesmo sentido, negativa no sentido oposto.
- Limitação: depende de escala e unidade de medida.

### 6. Coeficiente de Correlação Linear de Pearson ($r$)

$$
r = \frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum_{i=1}^{n}(x_i-\bar{x})^2\sum_{i=1}^{n}(y_i-\bar{y})^2}}
$$

- Correlação positiva: $r > 0$.
- Correlação negativa: $r < 0$.
- Correlação nula (linear): $r \approx 0$.

### 7. Propriedades do Coeficiente de Pearson

- Intervalo: $-1 \le r \le +1$.
- Simetria: $r_{xy} = r_{yx}$.
- Invariância a mudança linear de escala e deslocamento.
- Sensível a outliers.

## Analogia Intuitiva

Pense em dois elevadores de um prédio inteligente monitorados ao longo do dia. Se os dois sobem e descem com ritmos parecidos, a associação é forte e positiva. Se um sobe quando o outro desce, a associação é negativa. O coeficiente $r$ resume esse sincronismo em um único número.

## Exemplo Prático Real

Você mede horas de estudo e nota de prova de 8 alunos:

```python
import numpy as np

horas = np.array([2, 3, 4, 4, 5, 6, 7, 8])
nota = np.array([4, 5, 6, 6, 7, 8, 9, 9])

r = np.corrcoef(horas, nota)[0, 1]
print(f"r de Pearson: {r:.3f}")
```

Se $r$ for alto e positivo, há evidência de associação linear positiva entre horas e nota.

## Pontos de Atenção

- $r$ mede linearidade, não qualquer tipo de relação.
- Relação curvilínea pode gerar $r$ baixo mesmo com associação forte.
- Outlier único pode mudar bastante o valor de $r$.
- Interprete sempre junto com gráfico de dispersão.

## Referências para Aprofundamento

- OpenIntro, Correlation: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">conceito e interpretação de $r$</a>
- Penn State STAT 200/501: <a href="https://online.stat.psu.edu/" target="_blank" rel="noopener noreferrer">fundamentos e propriedades</a>
- NIST e-Handbook, Measures of Association: <a href="https://www.itl.nist.gov/div898/handbook/" target="_blank" rel="noopener noreferrer">referência técnica complementar</a>
