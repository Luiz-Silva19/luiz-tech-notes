---
id: modulo-10-inferencia-spearman
title: Módulo 10 - Inferência para Spearman
sidebar_label: M10 - Inferência Spearman
---

## O que é

Este módulo aborda como testar hipóteses e tomar decisão estatística para a correlação de Spearman ($r_s$), em diferentes tamanhos amostrais.

## Para que serve

- Avaliar se a associação monotônica observada pode ser generalizada.
- Tomar decisão formal sobre evidência estatística.
- Fechar análise de correlação não paramétrica com rigor inferencial.

## Como funciona

### 27. Teste de Hipótese para $r_s$

Hipóteses usuais:

$$
H_0: \rho_s = 0 \quad \text{vs} \quad H_1: \rho_s \ne 0
$$

- Para $n \le 30$: pode-se usar tabelas exatas/permutação.
- Para $n > 30$: costuma-se usar aproximação assintótica.

Uma aproximação frequente usa:

$$
t \approx r_s\sqrt{\frac{n-2}{1-r_s^2}}
$$

com $gl = n-2$.

### 28. Decisão Estatística

- Obter valor crítico (ou p-valor) conforme abordagem escolhida.
- Comparar com nível de significância $\alpha$.
- Concluir: rejeitar ou não rejeitar $H_0$.
- Interpretar resultado em termos de associação monotônica, não causalidade.

## Analogia Intuitiva

Pense em auditoria de ranking de fornecedores em várias filiais. Você observa semelhança entre rankings locais e precisa decidir se isso é padrão real da rede ou apenas acaso em uma amostra de filiais.

## Exemplo Prático Real

```python
from scipy.stats import spearmanr

ranking_qualidade = [1, 2, 3, 4, 5, 6, 7, 8]
ranking_satisfacao = [2, 1, 4, 3, 5, 7, 6, 8]

rs, p_valor = spearmanr(ranking_qualidade, ranking_satisfacao)
print(f"rs={rs:.3f}, p-valor={p_valor:.4f}")
```

Com $\alpha = 0{,}05$, se $p < 0{,}05$, há evidência de associação monotônica estatisticamente significativa.

## Pontos de Atenção

- Em amostras pequenas, prefira métodos exatos/permutação quando possível.
- Significância não mede magnitude prática do efeito.
- Teste bicaudal ou unicaudal deve ser definido antes da análise.
- Reporte método de inferência usado, não apenas o p-valor.

## Referências para Aprofundamento

- SciPy docs, Spearman correlation: <a href="https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.spearmanr.html" target="_blank" rel="noopener noreferrer">detalhes do teste e limitações</a>
- Hollander, Wolfe & Chicken, Nonparametric Statistical Methods: <a href="https://www.wiley.com/en-us/Nonparametric+Statistical+Methods%2C+3rd+Edition-p-9781118553299" target="_blank" rel="noopener noreferrer">base teórica de inferência não paramétrica</a>
- Penn State online notes (Nonparametric): <a href="https://online.stat.psu.edu/" target="_blank" rel="noopener noreferrer">apoio em decisão estatística</a>
