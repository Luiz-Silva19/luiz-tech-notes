---
id: modulo-7-transformacao-fisher
title: Módulo 7 - Transformação de Fisher
sidebar_label: M7 - Transformação de Fisher
---

## O que é

Este módulo apresenta a transformação $Z$ de Fisher, usada para aproximar a distribuição da correlação e facilitar testes e inferências sobre $\rho$.

## Para que serve

- Melhorar a inferência quando trabalhamos com correlação populacional.
- Comparar correlações entre grupos.
- Construir base para intervalos de confiança mais estáveis.

## Como funciona

### 17. Teste de Hipótese para $\rho \ne 0$

A transformação de Fisher para uma correlação amostral $r$ é:

$$
z' = \frac{1}{2}\ln\left(\frac{1+r}{1-r}\right)
$$

Sob condições usuais, $z'$ é aproximadamente normal, com erro padrão aproximado:

$$
EP(z') = \frac{1}{\sqrt{n-3}}
$$

Isso permite construir estatística de teste em escala normal.

### 18. Aplicações da Transformação de Fisher

- Comparar correlações de duas populações independentes.
- Fazer inferência sobre $\rho$ quando a distribuição de $r$ é assimétrica.
- Apoiar construção de intervalos de confiança para correlação.

## Analogia Intuitiva

Imagine converter diferentes moedas para uma moeda comum antes de comparar preços de aeroportos internacionais. A transformação de Fisher faz algo parecido: leva correlações para uma escala mais adequada à comparação estatística.

## Exemplo Prático Real

Comparar correlação entre satisfação e retenção em dois segmentos de clientes.

```python
import math

r1, n1 = 0.62, 80
r2, n2 = 0.41, 75

z1 = 0.5 * math.log((1 + r1) / (1 - r1))
z2 = 0.5 * math.log((1 + r2) / (1 - r2))
ep = math.sqrt(1/(n1 - 3) + 1/(n2 - 3))
z_teste = (z1 - z2) / ep

print(f"Estatística Z: {z_teste:.3f}")
```

## Pontos de Atenção

- A aproximação normal melhora com amostras moderadas/grandes.
- Correlações extremas (próximas de -1 ou +1) exigem cuidado interpretativo.
- A comparação entre grupos requer independência entre amostras.
- Sempre explicar em linguagem de negócio o que uma diferença de correlação implica.

## Referências para Aprofundamento

- Fisher, R. A. (1915), fundamentos da transformação (contexto histórico): <a href="https://royalsocietypublishing.org/" target="_blank" rel="noopener noreferrer">origem teórica da abordagem</a>
- Howell, Statistical Methods for Psychology: <a href="https://www.cengage.com/c/statistical-methods-for-psychology-8e-howell/" target="_blank" rel="noopener noreferrer">aplicações práticas da transformação</a>
- SciPy/Statsmodels docs: <a href="https://www.statsmodels.org/" target="_blank" rel="noopener noreferrer">ferramentas para inferência estatística</a>
