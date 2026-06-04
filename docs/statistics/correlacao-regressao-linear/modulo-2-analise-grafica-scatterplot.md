---
id: modulo-2-analise-grafica-scatterplot
title: Módulo 2 - Análise Gráfica (Scatterplot)
sidebar_label: M2 - Scatterplot
---

## O que é

Este módulo cobre o diagrama de dispersão (scatterplot), principal ferramenta visual para investigar a relação entre duas variáveis quantitativas.

## Para que serve

- Visualizar padrões antes de aplicar fórmulas.
- Identificar tendência positiva, negativa ou ausência de relação.
- Detectar outliers e possíveis quebras de padrão.

## Como funciona

### 4. Diagrama de Dispersão (Scatterplot)

- Construção: cada observação vira um ponto $(x_i, y_i)$ no plano.
- Identificação de padrões:
  - Relação positiva: pontos sobem da esquerda para a direita.
  - Relação negativa: pontos descem da esquerda para a direita.
  - Ausência de relação: nuvem sem direção definida.
- Outliers: pontos distantes que podem influenciar fortemente medidas como $r$.

Um fluxo prático:

1. Plotar os dados brutos.
2. Observar forma (linear, curvilínea, clusters).
3. Marcar possíveis outliers.
4. Só então calcular coeficientes.

## Analogia Intuitiva

É como olhar um mapa de voos em tempo real no aeroporto: cada ponto mostra um avião em uma posição. Antes de tirar conclusões numéricas, você enxerga o padrão geral de fluxo e identifica voos fora da rota.

## Exemplo Prático Real

Em operação de atendimento, relacione volume de tickets por hora ($x$) e tempo médio de resposta ($y$).

- Se os pontos subirem, há indicação de associação positiva (mais demanda, maior tempo).
- Se surgir um ponto muito fora da nuvem, pode ser incidente específico.

```python
import matplotlib.pyplot as plt

tickets = [80, 95, 110, 130, 140, 155]
tempo_resposta = [12, 14, 16, 20, 21, 25]

plt.scatter(tickets, tempo_resposta)
plt.xlabel("Tickets por hora")
plt.ylabel("Tempo médio de resposta (min)")
plt.title("Scatterplot: demanda x tempo de resposta")
plt.show()
```

## Pontos de Atenção

- Um padrão visual pode esconder subgrupos distintos.
- Escalas mal escolhidas distorcem percepção.
- Outliers devem ser investigados, não removidos automaticamente.
- Relações não lineares podem ser fortes mesmo sem alinhamento em reta.

## Referências para Aprofundamento

- Seeing Theory, Regression: <a href="https://seeing-theory.brown.edu/regression-analysis/index.html" target="_blank" rel="noopener noreferrer">visualização interativa de dispersão e ajuste</a>
- STAT 501, Data Displays and Scatterplots: <a href="https://online.stat.psu.edu/stat501/" target="_blank" rel="noopener noreferrer">guidelines de leitura gráfica</a>
- NIST e-Handbook, Exploratory Data Analysis: <a href="https://www.itl.nist.gov/div898/handbook/" target="_blank" rel="noopener noreferrer">boas práticas de análise exploratória</a>
