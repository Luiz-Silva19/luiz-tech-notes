---
id: amostragem-intro
title: Amostragem em Estatistica
sidebar_label: Introducao a Amostragem
---

## O que e

Amostragem e a tecnica de selecionar uma parte representativa de uma populacao para analisar dados sem precisar medir todos os elementos.

## Para que serve

- Reduzir custo e tempo de coleta de dados
- Tornar analises viaveis em populacoes grandes
- Apoiar pesquisas, experimentos e monitoramento de sistemas
- Permitir inferencias sobre a populacao com base na amostra

## Como funciona

A ideia central e escolher uma amostra que represente bem a populacao.

Passos comuns:

1. Definir a populacao-alvo.
2. Escolher o metodo de amostragem (aleatoria simples, estratificada, sistematica etc.).
3. Coletar os dados da amostra.
4. Analisar e inferir resultados para a populacao.

Quanto mais representativa for a amostra, menor o vies e melhor a qualidade das conclusoes.

## Analogia Intuitiva

Imagine um fiscal de qualidade em um grande deposito: ele nao abre todas as caixas do estoque para verificar a qualidade, mas seleciona caixas de forma planejada para estimar se o lote inteiro esta bom. Se ele escolher caixas de um unico canto, pode ter uma visao distorcida.

## Exemplo Pratico Real

Em um sistema com 1.000.000 de requisicoes por dia, voce pode analisar uma amostra aleatoria de 10.000 requisicoes para estimar latencia media e taxa de erro sem processar tudo de uma vez.

```python
# Exemplo simplificado: taxa de erro em uma amostra
requisicoes_amostra = 10000
erros_amostra = 137

taxa_erro = erros_amostra / requisicoes_amostra
print(f"Taxa de erro estimada: {taxa_erro:.2%}")
```

## Pontos de Atencao

- Amostra grande nao garante qualidade se for enviesada.
- Amostragem aleatoria reduz vies, mas nao elimina erro amostral.
- Populacao, amostra e parametro precisam estar claramente definidos antes de interpretar resultados.
- Quando ha grupos muito diferentes, uma estrategia de amostragem estratificada tende a representar melhor a realidade.

## Referencias para Aprofundamento

- NIST/SEMATECH e-Handbook, Sampling: <a href="https://www.itl.nist.gov/div898/handbook/" target="_blank" rel="noopener noreferrer">referencia tecnica sobre amostragem e inferencia</a>
- OpenStax, Introductory Statistics, capitulo de amostragem: <a href="https://openstax.org/details/books/introductory-statistics-2e" target="_blank" rel="noopener noreferrer">explicacao introdutoria organizada</a>
- Khan Academy, Sampling distributions: <a href="https://www.khanacademy.org/math/statistics-probability/sampling-distributions-library" target="_blank" rel="noopener noreferrer">trilha de aprofundamento gradual</a>
