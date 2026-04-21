---
id: amostragem-intro
title: Amostragem em Estatística
sidebar_label: Introdução à Amostragem
---

## O que é

Amostragem é a técnica de selecionar uma parte representativa de uma população para analisar dados sem precisar medir todos os elementos.

## Para que serve

- Reduzir custo e tempo de coleta de dados
- Tornar análises viáveis em populações grandes
- Apoiar pesquisas, experimentos e monitoramento de sistemas
- Permitir inferências sobre a população com base na amostra

## Como funciona

A ideia central é escolher uma amostra que represente bem a população.

Passos comuns:

1. Definir a população-alvo.
2. Escolher o método de amostragem (aleatória simples, estratificada, sistemática etc.).
3. Coletar os dados da amostra.
4. Analisar e inferir resultados para a população.

Quanto mais representativa for a amostra, menor o viés e melhor a qualidade das conclusões.

## Analogia Intuitiva

Imagine um fiscal de qualidade em um grande depósito: ele não abre todas as caixas do estoque para verificar a qualidade, mas seleciona caixas de forma planejada para estimar se o lote inteiro está bom. Se ele escolher caixas de um único canto, pode ter uma visão distorcida.

## Exemplo Prático Real

Em um sistema com 1.000.000 de requisições por dia, você pode analisar uma amostra aleatória de 10.000 requisições para estimar latência média e taxa de erro sem processar tudo de uma vez.

```python
# Exemplo simplificado: taxa de erro em uma amostra
requisicoes_amostra = 10000
erros_amostra = 137

taxa_erro = erros_amostra / requisicoes_amostra
print(f"Taxa de erro estimada: {taxa_erro:.2%}")
```

## Pontos de Atenção

- Amostra grande não garante qualidade se for enviesada.
- Amostragem aleatória reduz viés, mas não elimina erro amostral.
- População, amostra e parâmetro precisam estar claramente definidos antes de interpretar resultados.
- Quando há grupos muito diferentes, uma estratégia de amostragem estratificada tende a representar melhor a realidade.

## Referências para Aprofundamento

- NIST/SEMATECH e-Handbook, Sampling: <a href="https://www.itl.nist.gov/div898/handbook/" target="_blank" rel="noopener noreferrer">referência técnica sobre amostragem e inferência</a>
- OpenStax, Introductory Statistics, capítulo de amostragem: <a href="https://openstax.org/details/books/introductory-statistics-2e" target="_blank" rel="noopener noreferrer">explicação introdutória organizada</a>
- Khan Academy, Sampling distributions: <a href="https://www.khanacademy.org/math/statistics-probability/sampling-distributions-library" target="_blank" rel="noopener noreferrer">trilha de aprofundamento gradual</a>
