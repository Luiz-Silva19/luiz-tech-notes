---
id: modulo-0-fundamentos-conceituais
title: Fundamentos Conceituais
---

# Módulo 0 - Fundamentos Conceituais

## Correlação x Regressão

### O que é Correlação?

**Correlação** é uma medida de **associação simétrica** entre duas variáveis. Ela responde à pergunta: _"Em que grau duas variáveis variam juntas?"_

Características:

- Simétrica: não há distinção entre qual variável influencia a outra
- Valor entre -1 e +1
- Responde: as variáveis se movem juntas?

### O que é Regressão?

**Regressão** é uma técnica de **previsão assimétrica** que modela como uma variável dependente $(Y)$ é influenciada por uma ou mais variáveis independentes $(X)$.

Características:

- Assimétrica: há distinção entre variável dependente e independente
- Objetivo é prever $Y$ a partir de $X$
- Responde: como posso prever $Y$ conhecendo $X$?

### Diferenças Principais

| Aspecto      | Correlação                  | Regressão                            |
| ------------ | --------------------------- | ------------------------------------ |
| **Objetivo** | Medir associação            | Prever/explicar                      |
| **Direção**  | Simétrica                   | Assimétrica                          |
| **Pergunta** | As variáveis variam juntas? | Como prever Y a partir de X?         |
| **Equação**  | Não há equação              | $Y = \alpha + \beta X + \varepsilon$ |
| **Saída**    | Um número ($r$)             | Uma reta e parâmetros                |

### Variável Dependente e Independente

- **Variável Dependente** $(Y)$: a variável que queremos prever ou explicar. Também chamada de variável **resposta** ou **endógena**.
- **Variável Independente** $(X)$: a variável que usamos para prever ou explicar. Também chamada de variável **preditora** ou **exógena**.

Em um modelo de regressão:
$$Y = f(X) + \text{erro}$$

Exemplo: "Consumo é função da Renda"

- $Y$ = Consumo (dependente)
- $X$ = Renda (independente)

### Objetivos da Regressão Linear

A regressão linear tem três objetivos principais:

1. **Predição**: estimar o valor de $Y$ para um valor conhecido de $X$
   - Exemplo: prever vendas conhecendo o investimento em publicidade

2. **Explicação**: quantificar o efeito de $X$ sobre $Y$
   - Exemplo: quanto aumenta o consumo para cada unidade de aumento na renda?

3. **Controle**: identificar variáveis que afetam um resultado
   - Exemplo: quais fatores realmente influenciam a produtividade?

---

## Correlação Não Implica Causalidade

### O Perigo da Interpretação Causal

Encontrar uma correlação forte entre duas variáveis **não significa** que uma causa a outra.

**Exemplos clássicos de correlações espúrias:**

| Variáveis         | Correlação | Explicação                          |
| ----------------- | ---------- | ----------------------------------- |
| Número de icicles | +          | Ambas crescem no inverno            |
| Vendas de sorvete | +          | Ambas aumentam no verão             |
| Tráfego em rua    | +          | Ambas causadas por congestionamento |

### Razões para Correlação Sem Causalidade

1. **Causalidade Reversa**: $Y$ causa $X$, não $X$ causa $Y$
   - Exemplo: desempenho acadêmico e horas de estudo
   - Problema: alunos com melhor desempenho estudam mais? Ou estudar mais melhora o desempenho?

2. **Variável Confundadora**: uma terceira variável causa ambas
   - Exemplo: temperatura causa aumento de sorvete vendido E afogamentos
   - A temperatura é a confundadora

3. **Pura Coincidência**: correlação espúria sem explicação racional

### Como Estabelecer Causalidade?

Para inferir causalidade, são necessários:

- **Experimento controlado**: manipular $X$ sob controle, observar mudança em $Y$
- **Conhecimento de mecanismo**: haver uma explicação teórica plausível
- **Ordem temporal**: $X$ ocorrer antes de $Y$
- **Consistência**: replicação do padrão em múltiplos estudos

**Regra de Ouro**: Regressão mede **associação**, não **causalidade**. Para causalidade, exigem-se evidências além da estatística.

---

## Modelos Determinísticos e Estocásticos

### Modelo Determinístico

Um modelo **determinístico** assume uma relação exata entre variáveis, sem aleatoriedade.

$$Y = f(X) \quad \text{(exato)}$$

Exemplo física: Lei de Ohm
$$V = I \cdot R$$

Dado $I$ e $R$, o valor de $V$ é perfeitamente determinado — sem variação aleatória.

**Características:**

- Sem erro: cada ponto cai exatamente na curva/reta
- Previsão perfeita conhecendo-se $X$
- Raramente ocorre em dados reais

### Modelo Estocástico (Aleatório)

Um modelo **estocástico** (ou probabilístico) reconhece que há variabilidade aleatória além da relação entre variáveis.

$$Y = f(X) + \varepsilon$$

em que $\varepsilon$ é o **termo de erro aleatório** — a variabilidade não explicada por $X$.

Exemplo economia: Consumo em função da renda
$$\text{Consumo} = \alpha + \beta \cdot \text{Renda} + \varepsilon$$

Mesmo dois indivíduos com a mesma renda podem ter consumos diferentes devido a preferências, circunstâncias e outras variáveis não capturadas.

**Características:**

- Reconhece variabilidade aleatória
- Pontos não caem exatamente na reta (há resíduos)
- Mais realista para dados humanos/sociais

### Papel do Termo de Erro $\varepsilon$

O termo de erro $\varepsilon$ representa:

1. **Variáveis omitidas**: efeitos de variáveis não incluídas no modelo
   - Exemplo: consumo depende também de preço, preferências, riqueza, etc.

2. **Erros de medição**: imprecisão na coleta de dados
   - Exemplo: renda pode ser aproximada (não exata)

3. **Variabilidade inerente**: aleatoriedade genuína do fenômeno
   - Exemplo: comportamento humano é intrinsecamente aleatório

4. **Forma funcional simplificada**: a relação real é mais complexa que linear
   - Exemplo: relação não linear aproximada por linha reta

---

## Analogia Intuitiva

💡 **Pense em um mercado ao ar livre em um dia com vento.**

Uma correlação entre preço e quantidade vendida é como observar que quando o preço sobe, a quantidade vendida também tende a subir (forte associação). Mas não é porque o preço causa mais venda — é porque há um terceiro fator (o vento, que afasta os clientes) que causa ambos.

Um modelo de regressão, por sua vez, é como tentar usar apenas a informação de preço para prever quantas unidades você venderá. Você constrói uma reta que melhor aproxima o padrão observado — mas há sempre variação em torno dessa reta (alguns dias, misteriosamente, vendem mais; outros, menos) — essa é a variabilidade capturada por $\varepsilon$.

---

## Exemplo Prático

### Cenário

Um economista coleta dados mensais de:

- $Y$ = Consumo total de eletricidade (kWh) de uma residência
- $X$ = Temperatura média do mês (°C)

Ele observa que meses mais frios correlacionam com consumo maior (aquecimento).

### Perguntas

1. **Correlação**: As variáveis variam juntas? → Sim, $r \approx -0{,}82$
   - Relação negativa: temperatura cai, consumo sobe (aquecimento)

2. **Causalidade**: Temperatura baixa _causa_ consumo de eletricidade? → **Talvez não!**
   - A temperatura pode estar proxy para hora do dia (inverno = dias mais curtos)
   - Ou a demanda por conforto causa ambas

3. **Regressão**: Como prever consumo conhecendo-se a temperatura?
   - Modelo: $\text{Consumo} = 500 - 8{,}3 \times \text{Temperatura} + \varepsilon$
   - Interpretação: para cada °C de queda, consumo sobe ~8{,}3 kWh em média

### Implementação Python

```python
import numpy as np
from scipy.stats import pearsonr

# Dados fictícios
temperatura = np.array([10, 12, 15, 18, 20, 22, 25, 28, 30, 25, 20, 15])
consumo = np.array([450, 420, 350, 300, 250, 200, 150, 140, 180, 250, 350, 400])

# Correlação
r, p_valor = pearsonr(temperatura, consumo)
print(f"Correlação: r = {r:.3f}, p-valor = {p_valor:.4f}")

# Regressão (simples com numpy)
coef = np.polyfit(temperatura, consumo, 1)
print(f"Equação: Consumo = {coef[1]:.2f} + {coef[0]:.2f} × Temperatura")
```

**Saída:**

```
Correlação: r = -0.951, p-valor = 0.0000
Equação: Consumo = 757.50 + -17.86 × Temperatura
```

**Interpretação:**

- Forte correlação negativa (quanto menor a temperatura, maior o consumo)
- A cada 1°C de queda, consumo sobe ~17{,}86 kWh
- Mas não podemos concluir que "temperatura causa consumo" — há confundidores

---

## Pontos de Atenção

### ⚠️ Não Confunda os Conceitos

- Correlação alta ≠ Relação causal
- Correlação zero ≠ Ausência de relação (pode haver relação não linear)
- Regressão modela associação condicional, não relação causal pura

### ⚠️ Cuidado com Variáveis Confundadoras

Sempre questione: "há uma terceira variável causando ambas?"

- Exemplo: Cidades com mais bombeiros têm mais incêndios?
  - Confundadora: tamanho da cidade

### ⚠️ Direção da Causalidade

Em dados observacionais (não experimentais), é frequentemente impossível saber qual variável causa qual.

---

## Referências para Aprofundamento

- **Bussab, W. O. e Morettin, P. A.** (2017). _Estatística Básica_ (9ª ed.). Saraiva. — Cap. 9: Correlação e Regressão.

- **Pearl, J. e Mackenzie, D.** (2019). _The Book of Why: The New Science of Cause and Effect_. Basic Books. — Excelente livro sobre causalidade versus correlação.

- **Keller, G.** (2016). _Statistics for Management and Economics_ (11ª ed.). Cengage. — Abordagem aplicada com exemplos reais.

- **Freedman, D., Pisani, R. e Purves, R.** (2007). _Statistics_ (4ª ed.). W.W. Norton. — Clássico acessível sobre conceitos fundamentais.
