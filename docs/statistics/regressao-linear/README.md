# 📚 Regressão Linear - Roadmap Completo

Série de 16 módulos cobrindo regressão linear desde conceitos fundamentais até aplicações avançadas.

## 📋 Estrutura

### Fundamentos (Módulos 0-2)

- **[Modulo 0: Fundamentos Conceituais](modulo-0-fundamentos-conceituais.md)** — Correlação vs regressão, causalidade, modelos determinísticos vs estocásticos
- **[Modulo 1: Regressão Linear Simples](modulo-1-regressao-linear-simples.md)** — Modelo básico Y = α + βX + ε, interpretação de parâmetros
- **[Modulo 2: Método dos Mínimos Quadrados](modulo-2-metodo-minimos-quadrados.md)** — Critério SQR, normal equations, derivação matemática

### Estimação (Módulos 3-6)

- **[Modulo 3: Estimadores dos Parâmetros](modulo-3-estimadores-parametros.md)** — Fórmulas de β̂ e α̂, interpretação econômica
- **[Modulo 4: Estatísticas Fundamentais](modulo-4-estatisticas-fundamentais.md)** — Sxy, Sxx, Syy e suas relações
- **[Modulo 5: Erro Padrão da Estimativa](modulo-5-erro-padrao-estimativa.md)** — Precision de predições (SE, SQR)
- **[Modulo 6: Notação Matricial](modulo-6-notacao-matricial.md)** — Generalização para regressão múltipla: Y = Xβ + ε

### Otimização & Teoria (Módulos 7-9)

- **[Modulo 7: Otimização](modulo-7-otimizacao.md)** — Função de custo, gradientes, convexidade
- **[Modulo 8: Gradiente Descendente](modulo-8-gradiente-descendente.md)** — Algoritmo iterativo, convergência
- **[Modulo 9: Construção Manual](modulo-9-construcao-manual.md)** — Passo-a-passo pedagógico com dados reais

### Inferência & Validação (Módulos 10-14)

- **[Modulo 10: Inferência Estatística](modulo-10-inferencia-estatistica.md)** — Testes de hipótese, p-valores, intervalos de confiança
- **[Modulo 11: Gauss-Markov](modulo-11-gauss-markov.md)** — Por que OLS é ótimo (BLUE properties)
- **[Modulo 12: Pressupostos do Modelo](modulo-12-pressupostos-modelo.md)** — 5 pressupostos e violações
- **[Modulo 13: Diagnóstico de Resíduos](modulo-13-diagnostico-residuos.md)** — Gráficos, QQ plot, outliers, distância de Cook
- **[Modulo 14: Qualidade do Ajuste](modulo-14-qualidade-ajuste.md)** — R², decomposição SST/SSR/SSE, interpretação

### Aplicações (Módulos 15-16)

- **[Modulo 15: Regressão em Finanças Quantitativas](modulo-15-regressao-financas.md)** — CAPM, beta, alfa, fatores de risco
- **[Modulo 16: Regressão Linear Múltipla](modulo-16-regressao-multipla.md)** — Múltiplas variáveis, multicolinearidade (VIF), seleção

---

## 🎯 Cada Módulo Inclui

1. **O que é** — Definição clara do conceito
2. **Para que serve** — Aplicações práticas
3. **Como funciona** — Explicação técnica detalhada
4. **Analogia Intuitiva** — Comparação com mundo real
5. **Exemplo Prático Real** — Código Python executável com dados reais
6. **Pontos de Atenção** — Erros comuns, limites, edge cases
7. **Referências para Aprofundamento** — Livros, artigos, documentação

---

## 💻 Tecnologia

- **Linguagem:** Python 3
- **Bibliotecas:** numpy, scipy, matplotlib, pandas, scikit-learn
- **Notação Matemática:** KaTeX (inline `$...$` e bloco `$$...$$`)
- **Documentação:** Markdown com Docusaurus v1

---

## 📝 Padrão de Qualidade

Todos os módulos seguem rigorosamente:

- **Instruções Base** (`docs/statistics/regressao-linear/` → `.github/instructions/base.instructions.md`)
- **Estatística Instruções** (`.github/instructions/estatistica.instructions.md`)
- **Padrão Luiz Tech Notes:** 7-seção obrigatória + exemplos reais + analogias

---

## 🚀 Próximos Passos Sugeridos

1. **Local Testing:** Rode exemplos Python localmente para validar
2. **Docusaurus Build:** `npm run build` em `/website` e teste rendering de math
3. **GitHub Deploy:** Publicar em GitHub Pages
4. **Cross-Reference:** Vincular módulos de correlação/regressão com este roadmap
5. **Enhancements Futuros:**
   - Módulo 17: Regressão Logística (classificação)
   - Módulo 18: Regularização (Ridge, Lasso, Elastic Net)
   - Módulo 19: Series Temporais (ARIMA, etc)

---

**Status:** ✅ Completo (16/16 módulos criados, sidebar atualizado)

**Última atualização:** 2024 (Gerado automaticamente)
