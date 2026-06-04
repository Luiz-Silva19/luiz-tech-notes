---
id: modulo-8-intervalos-confianca-correlacao
title: Módulo 8 - Intervalos de Confiança para Correlação
sidebar_label: M8 - Intervalos de Confiança
---

## O que é

Este módulo explica como construir intervalo de confiança para a correlação populacional $\rho$ usando a escala transformada de Fisher e retorno à escala original de correlação.

## Para que serve

- Quantificar incerteza da estimativa de correlação.
- Reportar faixa plausível para $\rho$ em vez de ponto único.
- Comunicar risco estatístico com mais transparência.

## Como funciona

### 19. Intervalo de Confiança para $\rho$

1. Transformar $r$ em $z'$:

$$
z' = \frac{1}{2}\ln\left(\frac{1+r}{1-r}\right)
$$

2. Calcular erro padrão:

$$
EP(z') = \frac{1}{\sqrt{n-3}}
$$

3. Construir limites em $z'$:

$$
z'_{inf} = z' - z_{\alpha/2}EP(z'), \quad z'_{sup} = z' + z_{\alpha/2}EP(z')
$$

### 20. Transformação Inversa de Fisher

Converter cada limite para escala de correlação:

$$
r = \frac{e^{2z'} - 1}{e^{2z'} + 1}
$$

Interpretar intervalo final como faixa plausível para $\rho$.

## Analogia Intuitiva

Pense em previsão de tempo para aviões: não se dá apenas um valor de vento, mas uma faixa provável para planejamento seguro de decolagem. O intervalo de confiança faz isso para a correlação.

## Exemplo Prático Real

```python
import math

r = 0.58
n = 65
zcrit = 1.96  # 95%

z = 0.5 * math.log((1 + r) / (1 - r))
ep = 1 / math.sqrt(n - 3)

z_inf = z - zcrit * ep
z_sup = z + zcrit * ep

r_inf = (math.exp(2 * z_inf) - 1) / (math.exp(2 * z_inf) + 1)
r_sup = (math.exp(2 * z_sup) - 1) / (math.exp(2 * z_sup) + 1)

print(f"IC95% para rho: [{r_inf:.3f}, {r_sup:.3f}]")
```

## Pontos de Atenção

- Intervalo estreito não garante causalidade, apenas maior precisão da estimativa.
- Com $n$ pequeno, o intervalo tende a ser largo.
- Relatar nível de confiança (90%, 95%, 99%) é obrigatório.
- Não interpretar intervalo como probabilidade de um valor específico.

## Referências para Aprofundamento

- Altman, Practical Statistics for Medical Research: <a href="https://www.routledge.com/Practical-Statistics-for-Medical-Research/Altman/p/book/9780412276309" target="_blank" rel="noopener noreferrer">IC e interpretação aplicada</a>
- OpenIntro Statistics: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">inferência com linguagem didática</a>
- Penn State STAT, Confidence Intervals for Correlation: <a href="https://online.stat.psu.edu/" target="_blank" rel="noopener noreferrer">material formal de apoio</a>
