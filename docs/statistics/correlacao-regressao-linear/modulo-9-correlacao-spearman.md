---
id: modulo-9-correlacao-spearman
title: Módulo 9 - Correlação de Spearman
sidebar_label: M9 - Spearman
---

## O que é

Este módulo apresenta a correlação de Spearman ($r_s$), medida não paramétrica baseada em postos para avaliar associação monotônica.

## Para que serve

- Medir associação quando relação não é linear, mas monotônica.
- Trabalhar com dados ordinais.
- Reduzir sensibilidade a violações de normalidade.

## Como funciona

### 21. Introdução à Correlação de Spearman

- Conceito: calcula correlação entre postos, não entre valores brutos.
- Mede monotonicidade (cresce/decresce), não necessariamente linearidade.
- Método não paramétrico.

### 22. Postos (Ranks)

- Ordenar valores de cada variável.
- Converter valores em postos.
- Interpretar relação entre posições relativas.

### 23. Empates (Ties)

- Quando há empate, atribuir média dos postos correspondentes.
- Esse ajuste evita distorção na ordenação.

### 24. Fórmula Simplificada de Spearman

Sem empates:

$$
r_s = 1 - \frac{6\sum d_i^2}{n(n^2-1)}
$$

onde $d_i$ é a diferença entre postos de cada par.

### 25. Fórmula Geral de Spearman

Com empates, aplica-se Pearson sobre os postos:

$$
r_s = corr(R_X, R_Y)
$$

### 26. Interpretação de $r_s$

- $r_s = +1$: associação monotônica crescente perfeita.
- $r_s = -1$: associação monotônica decrescente perfeita.
- $r_s \approx 0$: ausência de monotonicidade relevante.

## Analogia Intuitiva

Imagine ranking de restaurantes por dois críticos. Spearman não compara notas exatas, mas a ordem de preferência. Se os rankings forem parecidos, a correlação é alta, mesmo que as notas numéricas sejam diferentes.

## Exemplo Prático Real

Em RH, você compara ranking de desempenho técnico e ranking de colaboração.

```python
from scipy.stats import spearmanr

desempenho_tecnico = [1, 2, 3, 4, 5, 6]
colaboracao = [2, 1, 3, 5, 4, 6]

rs, p = spearmanr(desempenho_tecnico, colaboracao)
print(f"rs={rs:.3f}, p-valor={p:.4f}")
```

## Pontos de Atenção

- Spearman não mede linearidade, mede monotonicidade.
- Muitos empates podem reduzir precisão da medida.
- Mesmo sendo robusto, outliers extremos podem afetar ranks em amostras pequenas.
- Sempre explicar se o dado é ordinal ou contínuo não normal.

## Referências para Aprofundamento

- SciPy docs, `spearmanr`: <a href="https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.spearmanr.html" target="_blank" rel="noopener noreferrer">implementação e hipóteses</a>
- Conover, Practical Nonparametric Statistics: <a href="https://onlinelibrary.wiley.com/" target="_blank" rel="noopener noreferrer">fundamentos de métodos não paramétricos</a>
- OpenIntro, Nonparametric Correlation: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">introdução aplicada</a>
