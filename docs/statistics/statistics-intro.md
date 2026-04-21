---
id: statistics-intro
title: Estatistica para Tecnologia
sidebar_label: Visao Geral
---

## O que e

Estatistica e a area que transforma dados em informacao confiavel para apoiar decisoes, medindo tendencia, variabilidade e incerteza.

## Para que serve

- Entender comportamento de sistemas e usuarios
- Medir performance e qualidade (SLA, erro, latencia)
- Validar hipoteses em experimentos e A/B tests
- Evitar decisoes baseadas apenas em intuicao

## Como funciona

A pratica de estatistica segue um fluxo: coleta de dados, limpeza, exploracao, definicao de metricas, aplicacao de tecnicas (media, mediana, desvio padrao, distribuicoes, intervalos de confianca, testes de hipotese) e interpretacao dos resultados no contexto do negocio.

## Analogia Intuitiva (OBRIGATORIA)

Pense em estatistica como uma central de controle de trafego de uma cidade: os sensores coletam dados de ruas, a central consolida os sinais, detecta padroes de congestionamento e decide ajustes de semaforo para melhorar o fluxo geral com base em evidencia, nao em achismo.

## Exemplo Pratico Real

```python
# Exemplo simples de analise de latencia em ms
latencias = [120, 132, 128, 145, 119, 138, 121]

media = sum(latencias) / len(latencias)
ordenadas = sorted(latencias)
mediana = ordenadas[len(ordenadas) // 2]

print(f"Media: {media:.2f} ms")
print(f"Mediana: {mediana} ms")
```

Nesse cenario, media e mediana ajudam a entender a experiencia real do usuario e a definir metas de performance mais consistentes.

## Ponto de Atencao / Pegadinha de Prova

- Media nao conta toda a historia: outliers podem distorcer a leitura.
- Correlacao nao implica causalidade.
- Em prova, termos como "nivel de confianca" e "margem de erro" costumam indicar inferencia estatistica.
- Sempre valide qualidade dos dados antes de tirar conclusoes.
