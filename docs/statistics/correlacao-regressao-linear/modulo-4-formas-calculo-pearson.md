---
id: modulo-4-formas-calculo-pearson
title: Módulo 4 - Formas de Cálculo da Correlação de Pearson
sidebar_label: M4 - Cálculo do Pearson
---

## O que é

Este módulo apresenta quatro formas equivalentes de calcular a correlação de Pearson: por escores padronizados, por desvios da média, por somas brutas e pela equivalência entre métodos.

## Para que serve

- Entender diferentes caminhos matemáticos para o mesmo resultado.
- Escolher forma mais adequada para cálculo manual ou computacional.
- Ganhar segurança em provas, validação e implementação de código.

## Como funciona

### 8. Forma dos Escores Padronizados (Z-Scores)

Padronize cada observação:

$$
z_{x_i} = \frac{x_i-\bar{x}}{s_x}, \quad z_{y_i} = \frac{y_i-\bar{y}}{s_y}
$$

Depois:

$$
r = \frac{1}{n-1}\sum_{i=1}^{n} z_{x_i} z_{y_i}
$$

### 9. Forma dos Desvios das Médias

Usa diretamente os desvios em torno das médias:

$$
r = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum (x_i-\bar{x})^2\sum (y_i-\bar{y})^2}}
$$

Interpretação geométrica: compara o alinhamento conjunto dos desvios em ambos os eixos.

### 10. Forma das Somas Brutas

Defina:

$$
S_{xx}=\sum x_i^2-\frac{(\sum x_i)^2}{n},\quad
S_{yy}=\sum y_i^2-\frac{(\sum y_i)^2}{n},\quad
S_{xy}=\sum x_i y_i-\frac{(\sum x_i)(\sum y_i)}{n}
$$

Então:

$$
r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}
$$

Essa forma é muito útil em implementação computacional.

### 11. Equivalência entre as Formas

- Todas as formas produzem o mesmo $r$ quando aplicadas corretamente.
- A diferença está em conveniência algébrica e custo de cálculo.
- Em software estatístico, a forma com somas brutas costuma ser eficiente.

## Analogia Intuitiva

É como calcular a distância entre duas cidades por três rotas diferentes no mapa: estrada principal, rodovia de contorno ou via expressa. O caminho muda, mas o destino final é o mesmo valor de correlação.

## Exemplo Prático Real

```python
import numpy as np

x = np.array([10, 12, 15, 18, 20], dtype=float)
y = np.array([8, 11, 14, 17, 21], dtype=float)

# Forma das somas brutas
n = len(x)
Sxx = np.sum(x**2) - (np.sum(x)**2)/n
Syy = np.sum(y**2) - (np.sum(y)**2)/n
Sxy = np.sum(x*y) - (np.sum(x)*np.sum(y))/n
r_bruta = Sxy / np.sqrt(Sxx * Syy)

print(f"r (somas brutas): {r_bruta:.4f}")
```

## Pontos de Atenção

- Erros de arredondamento podem acumular em cálculo manual.
- Misturar convenção de $n$ e $n-1$ gera inconsistência.
- Em dados muito grandes, prefira implementação numericamente estável.
- Sempre valide com uma função estatística conhecida.

## Referências para Aprofundamento

- Montgomery & Runger, Applied Statistics and Probability for Engineers: <a href="https://www.wiley.com/en-us/Applied+Statistics+and+Probability+for+Engineers%2C+7th+Edition-p-9781119400363" target="_blank" rel="noopener noreferrer">formas algébricas e aplicações</a>
- OpenIntro Statistics: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">explicação acessível de cálculo e interpretação</a>
- NIST e-Handbook: <a href="https://www.itl.nist.gov/div898/handbook/" target="_blank" rel="noopener noreferrer">base técnica para checagem de fórmulas</a>
