---
id: probabilidade-classica
title: Probabilidade Classica Equiprovavel
sidebar_label: Classica Equiprovavel
---

## O que e

A probabilidade classica equiprovavel e o modelo usado quando todos os resultados possiveis de um experimento tem a mesma chance de ocorrer.

A formula base e:

$$
P(A) = \frac{\text{casos favoraveis}}{\text{casos possiveis}}
$$

## Para que serve

- Calcular probabilidades em jogos justos (dado, moeda, baralho)
- Resolver exercicios introdutorios de probabilidade
- Construir intuicao para modelos mais avancados de estatistica
- Validar raciocinio rapido em questoes de prova e entrevistas

## Como funciona

O processo e simples:

1. Definir o espaco amostral (todos os resultados possiveis).
2. Identificar quais resultados atendem ao evento de interesse.
3. Aplicar a razao entre favoraveis e possiveis.

Exemplo com dado de 6 faces e evento "sair 4":

- Casos possiveis: 6
- Casos favoraveis: 1

$$
P(\text{sair 4}) = \frac{1}{6}
$$

Exemplo com moeda justa:

$$
P(\text{cara}) = \frac{1}{2}
$$

## Analogia Intuitiva (OBRIGATORIA)

Pense em uma roleta de estacionamento com vagas identicas e sorteadas de forma justa: cada vaga tem o mesmo peso no sorteio. Para saber a chance de pegar uma vaga especifica, basta dividir 1 pelo total de vagas disponiveis.

## Exemplo Pratico Real

Imagine um sistema de testes que escolhe aleatoriamente 1 entre 8 cenarios de carga, todos com mesma probabilidade.

Se voce quer saber a chance de executar um cenario especifico em uma rodada:

$$
P = \frac{1}{8}
$$

Em Python:

```python
# Probabilidade classica equiprovavel
casos_possiveis = 8
casos_favoraveis = 1

p = casos_favoraveis / casos_possiveis
print(f"Probabilidade: {p:.3f} ({p*100:.1f}%)")
```

## Ponto de Atencao / Pegadinha de Prova

⚠️ A formula classica so vale quando os resultados sao equiprovaveis.

- Se os resultados nao tiverem a mesma chance, nao use este modelo diretamente.
- Em prova, palavras como "justo", "aleatorio uniforme" e "equiprovavel" indicam fortemente esse tipo de calculo.
- Cuidado para nao confundir "evento" com "espaco amostral" na contagem.
