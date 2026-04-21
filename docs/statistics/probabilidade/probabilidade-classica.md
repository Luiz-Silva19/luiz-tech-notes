---
id: probabilidade-classica
title: Probabilidade Clássica Equiprovável
sidebar_label: Clássica Equiprovável
---

## O que é

A probabilidade clássica equiprovável é o modelo usado quando todos os resultados possíveis de um experimento têm a mesma chance de ocorrer.

A fórmula base é:

$$
P(A) = \frac{\text{casos favoraveis}}{\text{casos possiveis}}
$$

## Para que serve

- Calcular probabilidades em jogos justos (dado, moeda, baralho)
- Resolver exercícios introdutórios de probabilidade
- Construir intuição para modelos mais avançados de estatística
- Validar raciocínio rápido em problemas de contagem e incerteza

## Como funciona

O processo e simples:

- Definir o espaço amostral (todos os resultados possíveis).

2. Identificar quais resultados atendem ao evento de interesse.
3. Aplicar a razão entre favoráveis e possíveis.

Exemplo com dado de 6 faces e evento "sair 4":

- Casos possíveis: 6
- Casos favoráveis: 1

$$
P(\text{sair 4}) = \frac{1}{6}
$$

Exemplo com moeda justa:

$$
P(\text{cara}) = \frac{1}{2}
$$

## Analogia Intuitiva

Pense em uma roleta de estacionamento com vagas idênticas e sorteadas de forma justa: cada vaga tem o mesmo peso no sorteio. Para saber a chance de pegar uma vaga específica, basta dividir 1 pelo total de vagas disponíveis.

## Exemplo Prático Real

Imagine um sistema de testes que escolhe aleatoriamente 1 entre 8 cenários de carga, todos com a mesma probabilidade.

Se você quer saber a chance de executar um cenário específico em uma rodada:

$$
P = \frac{1}{8}
$$

Em Python:

```python
# Probabilidade clássica equiprovável
casos_possiveis = 8
casos_favoraveis = 1

p = casos_favoraveis / casos_possiveis
print(f"Probabilidade: {p:.3f} ({p*100:.1f}%)")
```

## Pontos de Atenção

⚠️ A fórmula clássica só vale quando os resultados são equiprováveis.

- Se os resultados não tiverem a mesma chance, não use este modelo diretamente.
- Cuidado para não confundir "evento" com "espaço amostral" na contagem.

## Referências para Aprofundamento

- OpenStax, Introductory Statistics, capítulo de probabilidade: <a href="https://openstax.org/details/books/introductory-statistics-2e" target="_blank" rel="noopener noreferrer">base conceitual com exemplos</a>
- Khan Academy, Probability basics: <a href="https://www.khanacademy.org/math/statistics-probability/probability-library" target="_blank" rel="noopener noreferrer">explicações introdutórias e exercícios</a>
- MIT OpenCourseWare, Introduction to Probability: <a href="https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/" target="_blank" rel="noopener noreferrer">material acadêmico para aprofundar</a>
