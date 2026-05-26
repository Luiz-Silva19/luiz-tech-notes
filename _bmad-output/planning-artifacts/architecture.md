---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: "complete"
completedAt: "2026-05-25"
inputDocuments:
  - _bmad-output/planning-artifacts/briefs/brief-luiz-tech-notes-2026-05-25/brief.md
  - _bmad-output/planning-artifacts/prds/prd-luiz-tech-notes-2026-05-25/prd.md
workflowType: "architecture"
project_name: "Knowledge Notes"
user_name: "Fluiz"
date: "2026-05-25"
---

# Architecture Decision Document — Knowledge Notes

_Este documento é construído colaborativamente passo a passo. As seções são adicionadas à medida que cada decisão arquitetural é tomada._

## Análise de Contexto do Projeto

### Visão Geral dos Requisitos

**Requisitos Funcionais (8 no total):**

| Cat.       | FRs              | Descrição                                          |
| ---------- | ---------------- | -------------------------------------------------- |
| Identidade | FR-1             | Renomear site para Knowledge Notes                 |
| Navegação  | FR-2, FR-3, FR-4 | Sidebar por domínio, páginas de entrada, home page |
| Editorial  | FR-6, FR-7       | Template e conformidade ao padrão de 7 seções      |
| Conteúdo   | FR-8             | Expansão de Estatística (≥3 docs/subárea)          |
| Correção   | FR-9             | Bug fix no quiz de probabilidade                   |

**Requisitos Não-Funcionais:**

- Compatibilidade obrigatória com Docusaurus v1
- Publicação exclusivamente via GitHub Pages (arquivos estáticos)
- Nenhum documento publicado faltando mais de uma das 7 seções editoriais
- Navegação até qualquer tópico em ≤3 cliques a partir da home

### Escala e Complexidade

- **Complexidade geral:** Baixa — site estático puro, sem backend, sem auth, sem real-time
- **Domínio técnico:** Publicação de conteúdo / site estático
- **Dependências externas:** Nenhuma (FR-5/Algolia removido do escopo)
- **Componentes com risco:** FR-9 (bug a investigar)

### Restrições Técnicas e Dependências

- **Docusaurus v1** — framework fixo; não há upgrade de framework neste ciclo
- **GitHub Pages** — hosting estático; sem server-side rendering, sem API routes
- **Algolia DocSearch** — exige repositório público e aprovação do programa open source
- **MathJax** — já configurado para renderização de fórmulas em Estatística; qualquer mudança de estrutura deve preservar os scripts existentes

### Preocupações Transversais

- Docusaurus v1 afeta: FR-1 (`siteConfig.js`), FR-2 (`sidebars.json`)
- GitHub Pages (estático): sem impacto em FR — nenhuma dependência externa de busca
- Padrão editorial: atravessa FR-6 (template), FR-7 (conformidade), FR-8 (novos docs)

## Stack Tecnológico

**Projeto brownfield — stack fixo, sem escolha de starter template.**

| Camada                  | Tecnologia                     | Status                                      |
| ----------------------- | ------------------------------ | ------------------------------------------- |
| Framework de publicação | Docusaurus v1                  | Existente, fixo                             |
| Hosting                 | GitHub Pages                   | Existente, fixo                             |
| Renderização            | HTML estático (build-time)     | Existente, fixo                             |
| Math rendering          | MathJax (scripts estáticos)    | Existente, preservar                        |
| Busca                   | Algolia DocSearch              | **Removido do escopo** — sidebar suficiente |
| Quiz                    | JS/HTML estático em `/static/` | Existente, corrigir (FR-9)                  |

**Implicações fixas:**

- Toda mudança deve ser compatível com a API do Docusaurus v1.
- GitHub Pages: somente arquivos estáticos; sem server-side rendering.
- Algolia indexa os arquivos HTML gerados após deploy no GitHub Pages.
- A estrutura de rotas é ditada pela hierarquia de pastas em `docs/`.

## Decisões Arquiteturais Centrais

### Prioridade

**Críticas (bloqueiam implementação):**

- AD-1: Escopo de renaming do site
- AD-2: Root cause e fix do quiz de probabilidade

**Importantes (moldam a implementação):**

- AD-3: Estrutura da sidebar por domínio
- AD-4: Localização do template editorial

---

### AD-1: Escopo do Renaming (FR-1)

**Decisão:** O `baseUrl` e o `projectName` não mudam — são determinados pelo nome do repositório no GitHub (`luiz-tech-notes`). Apenas o título visível é alterado.

| Campo                            | Antes               | Depois                                       |
| -------------------------------- | ------------------- | -------------------------------------------- |
| `title` em `siteConfig.js`       | `"Luiz Tech Notes"` | `"Knowledge Notes"`                          |
| `tagline` em `siteConfig.js`     | atual               | atualizar para refletir os domínios cobertos |
| `projectName` em `siteConfig.js` | `"luiz-tech-notes"` | mantém (nome do repositório)                 |
| `baseUrl`                        | `/luiz-tech-notes/` | mantém (URL GitHub Pages)                    |
| README                           | "Luiz Tech Notes"   | "Knowledge Notes"                            |

---

### AD-2: Root Cause e Fix do Quiz (FR-9)

**Root cause identificado:** O link no documento `teste-fixacao-probabilidade.md` usa `../../../../quiz-probabilidade/` — 4 níveis acima. Partindo de `/luiz-tech-notes/docs/statistics/probabilidade/`, 4 níveis chegam em `/` (raiz), ignorando o `baseUrl`. O quiz não carrega.

**Fix 1 — link no documento:**

```
Antes:  ../../../../quiz-probabilidade/
Depois: ../../../quiz-probabilidade/
```

**Fix 2 — `backLink` em `questions.json`:**

```
Antes:  /luiz-tech-notes/docs/en/probabilidade-classica
Depois: /luiz-tech-notes/docs/statistics/probabilidade/probabilidade-classica
```

O segmento `/en/` é inválido — não existe sub-rota de idioma nesta configuração.

---

### AD-3: Estrutura da Sidebar por Domínio (FR-2)

**Decisão:** Os dois sidebars existentes (`docs` e `statistics-sidebar`) **permanecem separados** — Docusaurus v1 vincula cada sidebar a um conjunto de páginas via configuração de rotas. Mesclá-los exigiria mudança de roteamento fora do escopo deste ciclo.

Ajuste concreto no sidebar `docs`:

```json
{
  "docs": {
    "Tecnologia": [
      "intro/tecnologia-intro",
      "architecture/architecture-intro",
      "..."
    ],
    "DevOps": ["devops/devops-intro", "..."],
    "Backend": ["backend/backend-intro", "..."]
  }
}
```

- Renomear grupo `"Introdução"` → `"Tecnologia"`
- Inserir `intro/tecnologia-intro` como primeiro item do grupo
- `statistics-sidebar` permanece inalterado (exceto adição dos 5 novos docs do FR-8)

O `statistics-sidebar` já tem seções por tópico e serve como sidebar de domínio independente. Primeiro item de cada sidebar = página de entrada do domínio (cobre FR-3 simultaneamente).

---

### AD-4: Localização do Template Editorial (FR-6)

**Decisão:** O template fica em `docs/_template.md`. Não é incluído no `sidebars.json` (arquivo prefixado com `_` é convenção para arquivos não publicados). Referência ao template documentada na home page.

---

## Padrões de Implementação

Regras que garantem consistência entre diferentes agentes de IA implementando o mesmo projeto.

### Nomenclatura de Arquivos e Pastas

| Âmbito                   | Padrão                                    | Exemplo                     |
| ------------------------ | ----------------------------------------- | --------------------------- |
| Arquivos de doc          | `kebab-case.md`                           | `probabilidade-classica.md` |
| Pastas de domínio        | `kebab-case/`                             | `statistics/`, `backend/`   |
| Arquivos de rascunho/aux | prefixo `_`                               | `_template.md`              |
| Arquivos de quiz         | `questions.json` + `index.html` por pasta | `quiz-probabilidade/`       |

### Frontmatter Obrigatório (todo documento)

```yaml
---
id: slug-do-documento # kebab-case, único dentro do domínio
title: Título Completo # exibido na tab do browser
sidebar_label: Título Curto # exibido na sidebar (omitir se igual ao title)
---
```

### Estrutura Editorial (7 seções, em ordem)

1. **O que é** — definição clara
2. **Para que serve** — casos de uso
3. **Como funciona** — explicação técnica
4. **Analogia Intuitiva** — obrigatória, mundo real
5. **Exemplo Prático Real** — código ou configuração concreta
6. **Pontos de Atenção** — erros comuns, limites
7. **Referências para Aprofundamento** — fontes confiáveis

Documentos só são publicados (adicionados ao `sidebars.json`) quando todas as 7 seções estão presentes.

### Links Internos

- **Preferência:** links relativos entre documentos (`../outro-doc`)
- **Para static assets** (quiz, imagens): usar caminho relativo calibrado para o nível de profundidade da página (ver AD-2 para o cálculo)
- **Nunca** usar caminhos absolutos sem o `baseUrl` — quebra em ambiente de desenvolvimento

### Adição de Novos Documentos (checklist)

1. Criar arquivo em `docs/{dominio}/{topico}/nome-do-doc.md`
2. Preencher frontmatter (`id`, `title`, `sidebar_label`)
3. Preencher as 7 seções do padrão editorial
4. Adicionar o `id` ao grupo correto em `website/sidebars.json`
5. Não publicar se alguma seção obrigatória estiver ausente

## Estrutura do Projeto

### Árvore Atual (relevante)

```
luiz-tech-notes/
├── website/
│   ├── siteConfig.js          ← FR-1: alterar title e tagline
│   ├── sidebars.json          ← FR-2: reorganizar grupos
│   └── static/
│       ├── js/
│       │   ├── mathjax-config.js    (preservar)
│       │   └── mathjax-rerender.js  (preservar)
│       └── quiz-probabilidade/
│           ├── index.html           (preservar — lógica OK)
│           └── questions.json       ← FR-9: fix backLink
├── docs/
│   ├── _template.md           ← FR-6: CRIAR
│   ├── intro/
│   │   ├── welcome.md         ← FR-4: reescrever home page
│   │   ├── tecnologia-intro.md← FR-3: CRIAR (entry page Tecnologia)
│   │   ├── diagramas.md
│   │   └── estrutura-docs.md
│   ├── architecture/          (existente, auditoria FR-7)
│   ├── devops/                (existente, auditoria FR-7)
│   ├── backend/               (existente, auditoria FR-7)
│   └── statistics/
│       ├── statistics-intro.md← FR-3: atualizar (entry page Estatística)
│       ├── probabilidade/     (existente, 13 docs — OK para FR-8)
│       │   └── teste-fixacao-probabilidade.md ← FR-9: fix link
│       ├── amostragem/
│       │   ├── amostragem-intro.md  (existente)
│       │   ├── amostragem-simples.md  ← FR-8: CRIAR
│       │   └── amostragem-estratificada.md ← FR-8: CRIAR
│       └── inferencia/        (VAZIA — criar tudo)
│           ├── inferencia-intro.md  ← FR-8: CRIAR
│           ├── intervalo-confianca.md ← FR-8: CRIAR
│           └── teste-hipotese.md     ← FR-8: CRIAR
└── README.md                  ← FR-1: atualizar nome
```

### Mapeamento FR → Fronteiras de Implementação

| FR   | Tipo      | Arquivos                                                                                                           | Regra-chave                                                                                 |
| ---- | --------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| FR-1 | Edição    | `website/siteConfig.js`, `README.md`                                                                               | Só `title` e `tagline`; `projectName` e `baseUrl` **não mudam**                             |
| FR-2 | Edição    | `website/sidebars.json`                                                                                            | Renomear grupo `"Introdução"` → `"Tecnologia"`; mover `tecnologia-intro` para primeiro item |
| FR-3 | Criação   | `docs/intro/tecnologia-intro.md`, `docs/statistics/statistics-intro.md`                                            | Frontmatter `id` deve ser `tecnologia-intro` e `statistics-intro` respectivamente           |
| FR-4 | Edição    | `docs/intro/welcome.md`                                                                                            | Comunicar propósito + domínios + links de entrada                                           |
| FR-6 | Criação   | `docs/_template.md`                                                                                                | Prefixo `_` = não entra no sidebars.json                                                    |
| FR-7 | Auditoria | Todos os docs existentes em `architecture/`, `devops/`, `backend/`, `statistics/`                                  | Verificar 7 seções; seções faltantes = doc marcado como `draft` no frontmatter              |
| FR-8 | Criação   | 5 novos docs em `amostragem/` e `inferencia/`                                                                      | Todos devem ter 7 seções completas antes de entrar no `statistics-sidebar`                  |
| FR-9 | Edição    | `docs/statistics/probabilidade/teste-fixacao-probabilidade.md`, `website/static/quiz-probabilidade/questions.json` | Ver AD-2 para os valores exatos                                                             |

### Fronteiras de Componentes

**Sem fronteira de API** — projeto é 100% estático. Toda comunicação é via sistema de arquivos (docs → sidebars.json) e links relativos.

**Fronteira de build:** `website/` é o root do Docusaurus. Arquivos em `docs/` são consumidos pelo build; `website/static/` é copiado diretamente para o output sem processamento de markdown.

**Fronteira de MathJax:** Scripts em `website/static/js/` carregados via `siteConfig.js > scripts`. Qualquer alteração no `siteConfig.js` deve preservar as entradas de `scripts` — risco de regressão alto se omitido.

**Fronteira de quiz:** O quiz em `website/static/quiz-probabilidade/` é uma SPA independente (HTML/JS). Só se conecta ao ecossistema via dois pontos: (1) o link de entrada no doc de Estatística, (2) o `backLink` em `questions.json`. Ambos são os pontos de fix do FR-9.

## Validação da Arquitetura

### Cobertura de Requisitos

| FR   | Coberto por                                                           | Status |
| ---- | --------------------------------------------------------------------- | ------ |
| FR-1 | AD-1                                                                  | ✅     |
| FR-2 | AD-3 (corrigido) + Estrutura                                          | ✅     |
| FR-3 | Estrutura (`tecnologia-intro.md` criar; `statistics-intro.md` editar) | ✅     |
| FR-4 | Estrutura (`welcome.md` editar)                                       | ✅     |
| FR-6 | AD-4                                                                  | ✅     |
| FR-7 | Padrões (7 seções + checklist de publicação)                          | ✅     |
| FR-8 | Estrutura (5 novos docs com tópicos definidos)                        | ✅     |
| FR-9 | AD-2 (valores exatos prontos)                                         | ✅     |

**OQ-3 resolvido:** Tópicos específicos para FR-8 definidos na estrutura do projeto.

### Coerência das Decisões

| Verificação                                                       | Resultado |
| ----------------------------------------------------------------- | --------- |
| Decisões compatíveis com Docusaurus v1                            | ✅        |
| MathJax preservado (nenhuma decisão altera `siteConfig.scripts`)  | ✅        |
| `baseUrl` e `projectName` intocados                               | ✅        |
| Nomenclatura kebab-case consistente com arquivos existentes       | ✅        |
| Frontmatter compatível com campos reconhecidos pelo Docusaurus v1 | ✅        |
| AD-3 corrigido: sidebars permanecem separados                     | ✅        |

### Prontidão para Implementação

| Critério                                                    | Status |
| ----------------------------------------------------------- | ------ |
| AD-2: valores exatos (antes/depois) prontos para copy-paste | ✅     |
| AD-1: campo por campo mapeado                               | ✅     |
| Checklist de novo documento definido (5 passos)             | ✅     |
| Todos os arquivos novos nomeados com IDs específicos        | ✅     |
| Fronteiras de MathJax e quiz documentadas                   | ✅     |
| Nenhum FR sem arquivo concreto associado                    | ✅     |
