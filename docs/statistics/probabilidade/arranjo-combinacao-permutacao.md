---
id: arranjo-combinacao-permutacao
title: Arranjo, Combinação e Permutação
sidebar_label: Arranjo, Combinação e Permutação
---

## O que é

Arranjo, combinação e permutação são técnicas de análise combinatória usadas para contar quantas formas diferentes existem de organizar ou selecionar elementos.

A diferença principal entre elas é:

- **Permutação**: usa todos os elementos e a ordem importa.
- **Arranjo**: usa apenas parte dos elementos e a ordem importa.
- **Combinação**: usa apenas parte dos elementos e a ordem não importa.

## Para que serve

- Contar possibilidades antes de calcular probabilidades
- Resolver problemas de seleção, ordenação e distribuição
- Modelar senhas, sorteios, escalas, rankings e times
- Evitar contagem errada em problemas de probabilidade clássica

## Como funciona

A pergunta central é sempre esta: **a ordem importa ou não?** E estamos usando **todos** os elementos ou apenas **alguns**?

### Permutação

Usada quando todos os elementos participam e posições diferentes geram resultados diferentes.

Fórmula:

$$
P_n = n!
$$

Exemplo: quantas formas diferentes existem de organizar 4 livros em uma prateleira?

$$
P_4 = 4! = 24
$$

### Arranjo

Usado quando escolhemos apenas parte dos elementos e a ordem faz diferença.

Fórmula:

$$
A_{p}^{n} = \frac{n!}{(n-p)!}
$$

Alguns materiais escrevem a mesma ideia como $A_{n,p}$. As duas notações representam o mesmo cálculo: escolher $p$ elementos dentre $n$, considerando a ordem.

Exemplo: quantas maneiras existem de definir ouro, prata e bronze entre 10 atletas?

$$
A_{3}^{10} = \frac{10!}{7!} = 10 \cdot 9 \cdot 8 = 720
$$

### Combinação

Usada quando escolhemos apenas parte dos elementos e a ordem não faz diferença.

Fórmula:

$$
C_{p}^{n} = \frac{n!}{p!(n-p)!}
$$

Alguns materiais escrevem a mesma ideia como $C_{n,p}$. As duas notações representam o mesmo cálculo: escolher $p$ elementos dentre $n$, sem considerar a ordem.

Exemplo: quantas maneiras existem de formar uma equipe de 3 pessoas a partir de 10 candidatos?

$$
C_{3}^{10} = \frac{10!}{3!7!} = 120
$$

Resumo prático:

| Situação                             | Usa todos? | Ordem importa? | Técnica    |
| ------------------------------------ | ---------- | -------------- | ---------- |
| Organizar 5 livros                   | Sim        | Sim            | Permutação |
| Pódio com 3 lugares entre 10 pessoas | Não        | Sim            | Arranjo    |
| Escolher 3 pessoas para um grupo     | Não        | Não            | Combinação |

## Analogia Intuitiva

Pense em vagas de garagem numeradas em um prédio:

- **Permutação**: todos os carros do condomínio vão ocupar todas as vagas, e trocar os carros de vaga muda o resultado.
- **Arranjo**: apenas algumas vagas especiais serão ocupadas, e qual carro fica em qual vaga importa.
- **Combinação**: você só quer saber quais carros foram selecionados para entrar em uma área VIP, sem se importar com a posição exata.

## Exemplo Prático Real

Imagine um processo seletivo com 8 candidatos.

### Caso 1: eleger presidente, vice e secretário

Aqui a ordem importa, porque cada cargo é diferente.

$$
A_{3}^{8} = \frac{8!}{5!} = 8 \cdot 7 \cdot 6 = 336
$$

### Caso 2: escolher 3 pessoas para um comitê

Aqui a ordem não importa, porque o grupo final é o que interessa.

$$
C_{3}^{8} = \frac{8!}{3!5!} = 56
$$

Em Python:

```python
import math

n = 8
p = 3

arranjo = math.factorial(n) // math.factorial(n - p)
combinacao = math.factorial(n) // (math.factorial(p) * math.factorial(n - p))
permutacao = math.factorial(4)

print(f"Arranjo A^8_3: {arranjo}")
print(f"Combinação C^8_3: {combinacao}")
print(f"Permutação P(4): {permutacao}")
```

## Pontos de Atenção

- O erro mais comum é usar combinação quando a ordem importa.
- Sempre pergunte: trocar a posição dos elementos muda o resultado?
- Fatorial cresce muito rápido; em problemas grandes, os valores podem explodir.
- Em probabilidade, essas técnicas costumam aparecer na contagem do espaço amostral e dos casos favoráveis.

## Referências para Aprofundamento

- Khan Academy, Counting, permutations and combinations: <a href="https://www.khanacademy.org/math/statistics-probability/counting-permutations-and-combinations" target="_blank" rel="noopener noreferrer">introdução com exemplos visuais</a>
- OpenStax, Introductory Statistics: <a href="https://openstax.org/details/books/introductory-statistics-2e" target="_blank" rel="noopener noreferrer">base didática para combinatória e probabilidade</a>
- MIT OpenCourseWare, Introduction to Probability: <a href="https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/" target="_blank" rel="noopener noreferrer">aprofundamento formal em contagem e probabilidade</a>
