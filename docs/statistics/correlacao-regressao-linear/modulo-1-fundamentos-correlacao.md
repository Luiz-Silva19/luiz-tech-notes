---
id: modulo-1-fundamentos-correlacao
title: Módulo 1 - Fundamentos de Correlação
sidebar_label: M1 - Fundamentos
---

## O que é

Este módulo introduz os conceitos-base de correlação: o que significa associação entre variáveis, por que correlação não é causalidade e como distinguir correlação de regressão.

## Para que serve

- Construir base conceitual antes de calcular coeficientes.
- Evitar interpretações erradas em análises de dados.
- Entender quando usar correlação e quando usar regressão.

## Como funciona

### 1. Introdução à Correlação

- Correlação mede a intensidade e a direção da associação entre duas variáveis.
- O objetivo é responder se elas variam juntas de forma sistemática.
- Medidas de associação comuns: covariância, coeficiente de Pearson ($r$) e coeficiente de Spearman ($r_s$).

### 2. Correlação x Causalidade

- Associação não implica causalidade.
- Variáveis confundidoras podem explicar uma associação aparente.
- Exemplo: vendas de sorvete e afogamentos crescem juntas no verão, mas uma não causa a outra; a temperatura é confundidora.

### 3. Correlação x Regressão

- Correlação quantifica associação, sem definir variável resposta e preditora.
- Regressão modela relação funcional e permite previsão de uma variável a partir de outra.
- Relação entre ambas: em regressão linear simples, o sinal da inclinação acompanha o sinal de $r$.

## Analogia Intuitiva

Pense em dois relógios de fluxo no trânsito de uma cidade: um mede carros entrando em uma avenida e outro mede carros chegando ao centro. Se ambos sobem e descem juntos, existe associação. Isso não significa que um relógio "cause" o outro, e sim que ambos podem responder a um mesmo fenômeno urbano.

## Exemplo Prático Real

Em produto digital, você observa taxa de engajamento e tempo médio no app.

- Correlação: verifica se usuários com maior tempo no app tendem a maior engajamento.
- Causalidade: exigiria desenho experimental (por exemplo, experimento A/B).
- Regressão: modela quanto o engajamento esperado muda quando o tempo no app aumenta.

Exemplo simples:

```python
# Interpretação conceitual, sem inferir causalidade
tempo_app = [8, 10, 11, 13, 15]          # minutos
engajamento = [22, 25, 27, 31, 34]       # pontos

# Os vetores parecem crescer juntos: possível associação positiva.
```

## Pontos de Atenção

- Correlação alta não prova causa e efeito.
- Associação pode ser não linear, mesmo com $r$ próximo de 0.
- Sempre investigar contexto, coleta e possíveis confundidores.
- Em comunicação executiva, explicitar limitações evita decisões ruins.

## Referências para Aprofundamento

- OpenIntro Statistics, Correlation and Regression: <a href="https://www.openintro.org/book/os/" target="_blank" rel="noopener noreferrer">capítulos introdutórios com exemplos</a>
- NIST e-Handbook, Correlation: <a href="https://www.itl.nist.gov/div898/handbook/" target="_blank" rel="noopener noreferrer">base técnica para interpretação</a>
- Penn State STAT 501, Correlation and Simple Linear Regression: <a href="https://online.stat.psu.edu/stat501/" target="_blank" rel="noopener noreferrer">material aplicado e formal</a>
