---
id: statistics-intro
title: Estatística para Tecnologia
sidebar_label: Visão Geral
---

## O que é

Estatística é a área que transforma dados em informação confiável para apoiar decisões, medindo tendência, variabilidade e incerteza.

## Para que serve

- Entender comportamento de sistemas e usuários
- Medir performance e qualidade (SLA, erro, latência)
- Validar hipóteses em experimentos e A/B tests
- Evitar decisões baseadas apenas em intuição

## Como funciona

A prática de estatística segue um fluxo: coleta de dados, limpeza, exploração, definição de métricas, aplicação de técnicas (média, mediana, desvio padrão, distribuições, intervalos de confiança, testes de hipótese) e interpretação dos resultados no contexto do negócio.

## Analogia Intuitiva

Pense em estatística como uma central de controle de tráfego de uma cidade: os sensores coletam dados de ruas, a central consolida os sinais, detecta padrões de congestionamento e decide ajustes de semáforo para melhorar o fluxo geral com base em evidência, não em achismo.

## Exemplo Prático Real

```python
# Exemplo simples de análise de latência em ms
latencias = [120, 132, 128, 145, 119, 138, 121]

media = sum(latencias) / len(latencias)
ordenadas = sorted(latencias)
mediana = ordenadas[len(ordenadas) // 2]

print(f"Média: {media:.2f} ms")
print(f"Mediana: {mediana} ms")
```

Nesse cenário, média e mediana ajudam a entender a experiência real do usuário e a definir metas de performance mais consistentes.

## Pontos de Atenção

- Média não conta toda a história: outliers podem distorcer a leitura.
- Correlação não implica causalidade.
- Sempre valide a qualidade dos dados antes de tirar conclusões.

## Referências para Aprofundamento

- OpenIntro Statistics: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">texto introdutório aberto e bem estruturado</a>
- Khan Academy, Statistics and Probability: <a href="https://www.khanacademy.org/math/statistics-probability" target="_blank" rel="noopener noreferrer">trilha didática com exercícios</a>
- NIST/SEMATECH e-Handbook of Statistical Methods: <a href="https://www.itl.nist.gov/div898/handbook/" target="_blank" rel="noopener noreferrer">referência técnica para conceitos e aplicações</a>
