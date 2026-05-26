---
stepsCompleted: [1, 2, 3, 4]
status: complete
completedAt: "2026-05-25"
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-luiz-tech-notes-2026-05-25/prd.md
  - _bmad-output/planning-artifacts/architecture.md
---

# Knowledge Notes - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Knowledge Notes, decomposing the requirements from the PRD and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR-1: O site passa a se chamar "Knowledge Notes". O título exibido no browser e na barra de navegação do Docusaurus deve ser "Knowledge Notes"; o campo `title` em `website/siteConfig.js` deve estar atualizado; README e demais referências internas ao nome antigo devem ser atualizadas.

FR-2: A sidebar agrupa os documentos em seções nomeadas por domínio (Tecnologia, Estatística), com separação visual clara entre eles. Nenhum documento fica solto fora de uma seção de domínio. `website/sidebars.json` deve ter uma chave por domínio, sem itens fora de grupo.

FR-3: Cada domínio tem uma página de índice que lista os subtópicos disponíveis e serve como ponto de entrada para visitantes. Deve existir pelo menos uma página de índice para Tecnologia e uma para Estatística, e cada uma deve ser o primeiro item do respectivo grupo na sidebar.

FR-4: A página inicial apresenta o propósito do site, os domínios cobertos e links diretos para a entrada de cada área. `docs/intro/welcome.md` deve mencionar explicitamente os domínios cobertos e ter links navegáveis para cada domínio.

FR-6: Existe um arquivo de template com as 7 seções do padrão editorial pré-preenchidas, pronto para ser copiado ao criar um novo documento. O template deve existir em local documentado e acessível.

FR-7: Os documentos publicados em Tecnologia e Estatística atendem ao padrão editorial de 7 seções. Nenhum documento publicado deve estar faltando mais de uma das 7 seções obrigatórias. (Assumption: documentos em construção não entram na verificação até serem publicados.)

FR-8: Cada subárea de Estatística (Probabilidade, Amostragem, Inferência) tem ao menos três documentos publicados e conformes ao padrão editorial. Contagem de documentos publicados por subárea ≥ 3, cada um passando na verificação do padrão editorial.

FR-9: O quiz na seção de probabilidade executa sem erros de runtime, carrega as questões e registra respostas corretamente. O quiz deve carregar sem erros no console do browser e o usuário deve conseguir responder todas as questões e ver o resultado.

### NonFunctional Requirements

NFR-1: Compatibilidade obrigatória com Docusaurus v1 — toda mudança deve ser compatível com a API do Docusaurus v1; sem upgrade de framework neste ciclo.

NFR-2: Publicação exclusivamente via GitHub Pages (arquivos estáticos) — sem server-side rendering, sem API routes, apenas arquivos estáticos.

NFR-3: Nenhum documento publicado deve estar faltando mais de uma das 7 seções editoriais obrigatórias.

NFR-4: Navegação até qualquer tópico em ≤3 cliques a partir da home (valida FR-2, FR-3, FR-4).

### Additional Requirements

- AR-1: Projeto brownfield — stack fixo (Docusaurus v1 + GitHub Pages), sem escolha de starter template.
- AR-2 (AD-1): Apenas os campos `title` e `tagline` em `siteConfig.js` mudam. Os campos `projectName` (`luiz-tech-notes`) e `baseUrl` (`/luiz-tech-notes/`) não devem ser alterados.
- AR-3 (AD-2): Fix do quiz com valores exatos definidos: link em `teste-fixacao-probabilidade.md` de `../../../../quiz-probabilidade/` para `../../../quiz-probabilidade/`; campo `backLink` em `questions.json` de `/luiz-tech-notes/docs/en/probabilidade-classica` para `/luiz-tech-notes/docs/statistics/probabilidade/probabilidade-classica`.
- AR-4 (AD-3): Os dois sidebars existentes (`docs` e `statistics-sidebar`) permanecem separados — mesclá-los exigiria mudança de roteamento fora do escopo deste ciclo. Ajuste concreto: renomear grupo `"Introdução"` → `"Tecnologia"` no sidebar `docs`.
- AR-5 (AD-4): O template editorial fica em `docs/_template.md`. Prefixo `_` é convenção para arquivos não publicados — não deve entrar no `sidebars.json`.
- AR-6: Os scripts MathJax em `website/static/js/` (mathjax-config.js e mathjax-rerender.js) carregados via `siteConfig.js > scripts` devem ser preservados em qualquer alteração do `siteConfig.js` — risco de regressão alto se omitidos.
- AR-7: Frontmatter obrigatório em todo documento: `id` (kebab-case, único no domínio), `title` (exibido na tab do browser), `sidebar_label` (omitir se igual ao title).
- AR-8: Links internos sempre relativos entre documentos; nunca absolutos sem o `baseUrl` (quebra em ambiente de desenvolvimento).
- AR-9: Novos documentos só são adicionados ao `sidebars.json` quando todas as 7 seções do padrão editorial estão presentes.

### UX Design Requirements

N/A — nenhum documento de UX Design foi fornecido como entrada.

### FR Coverage Map

```
FR-1 → Epic 1 — Renaming: title e tagline em siteConfig.js + README
FR-2 → Epic 1 — Sidebar: reorganização em grupos por domínio
FR-3 → Epic 1 — Entry pages: tecnologia-intro.md + statistics-intro.md
FR-4 → Epic 1 — Home page: propósito + domínios + links
FR-6 → Epic 2 — Template: docs/_template.md com 7 seções
FR-7 → Epic 2 — Compliance audit: todos docs publicados
FR-8 → Epic 3 — Novos docs de Estatística (≥3 por subárea)
FR-9 → Epic 3 — Bug fix quiz: link relativo + backLink

NFR-1/2/3/4 → Transversais a todos os épicos
```

## Epic List

### Epic 1: Site Identity & Navigation

Um visitante que chega ao site pela primeira vez entende imediatamente o que é, encontra qualquer domínio em até 3 cliques, e a identidade profissional "Knowledge Notes" está aplicada de forma consistente em todas as configurações.
**FRs covered:** FR-1, FR-2, FR-3, FR-4

### Epic 2: Editorial Standard & Compliance

Fluiz pode criar qualquer novo documento usando um template pronto em segundos, e todos os documentos publicados respeitam o padrão de 7 seções sem exceção.
**FRs covered:** FR-6, FR-7

### Epic 3: Estatística Expansion & Quiz Fix

Visitantes podem estudar Estatística com profundidade mínima nas três subáreas (Probabilidade, Amostragem, Inferência) e o quiz de fixação funciona corretamente sem erros de runtime.
**FRs covered:** FR-8, FR-9

---

## Epic 1: Site Identity & Navigation

Um visitante que chega ao site pela primeira vez entende imediatamente o que é, encontra qualquer domínio em até 3 cliques, e a identidade profissional "Knowledge Notes" está aplicada de forma consistente em todas as configurações.

### Story 1.1: Apply "Knowledge Notes" Name

As a LinkedIn visitor / site visitor,
I want the site to display the name "Knowledge Notes" consistently everywhere,
So that the brand is professional and recognizable when I share or access the link.

**Acceptance Criteria:**

**Given** I visit the site in a browser
**When** the page loads
**Then** the browser tab title shows "Knowledge Notes"
**And** the Docusaurus navigation bar displays "Knowledge Notes"

**Given** `website/siteConfig.js` is inspected
**When** reviewing each configuration field
**Then** `title` equals `"Knowledge Notes"`
**And** `tagline` is updated to reflect the domains covered (Tecnologia e Estatística)
**And** `projectName` remains `"luiz-tech-notes"` (unchanged)
**And** `baseUrl` remains `"/luiz-tech-notes/"` (unchanged)
**And** all entries in the `scripts` array (MathJax) are preserved exactly as before

**Given** `README.md` is inspected
**When** reviewing all text content
**Then** no occurrence of the old display name remains
**And** all references show "Knowledge Notes"

---

### Story 1.2: Create Domain Entry Pages

As a first-time visitor,
I want a clear entry page for each study domain,
So that I know what each domain covers before exploring its documents.

**Acceptance Criteria:**

**Given** `docs/intro/tecnologia-intro.md` is created
**When** I view the file
**Then** its frontmatter contains `id: tecnologia-intro`, `title`, and `sidebar_label`
**And** the page body lists and links to the available subtopics (Architecture, DevOps, Backend)
**And** the document follows the Docusaurus v1 markdown format

**Given** `docs/statistics/statistics-intro.md` is updated
**When** I view the file
**Then** its frontmatter contains `id: statistics-intro`, `title`, and `sidebar_label`
**And** the page body lists the three subáreas: Probabilidade, Amostragem, Inferência
**And** each subárea item links to its respective entry document

---

### Story 1.3: Organize Sidebar by Domain

As a site visitor,
I want the sidebar to group documents under named domain labels,
So that I can navigate directly to my area of interest without scanning a flat list.

**Acceptance Criteria:**

**Given** `website/sidebars.json` is inspected
**When** reviewing the `docs` key
**Then** the former `"Introdução"` group key is renamed to `"Tecnologia"`
**And** `"intro/tecnologia-intro"` is the first item in the `"Tecnologia"` group
**And** all other document IDs remain in their existing groups with no items outside a named group

**Given** I open the published site and view the sidebar
**When** I browse the Tecnologia area
**Then** sections are labeled visibly (e.g., "Tecnologia", "DevOps", "Backend")
**And** no document appears outside a named group

**Given** `website/sidebars.json` is inspected for the `statistics-sidebar`
**When** reviewing the first item of the sidebar
**Then** `statistics-intro` is the first item of the statistics sidebar

---

### Story 1.4: Rewrite Home Page

As a first-time visitor,
I want the home page to clearly present the site's purpose, the domains covered, and how to navigate to each one,
So that I understand what Knowledge Notes is and immediately know where to go.

**Acceptance Criteria:**

**Given** I visit the home page (`docs/intro/welcome.md`)
**When** I read the page
**Then** the page explicitly names both active domains: Tecnologia and Estatística
**And** the page communicates the purpose of the site (personal study knowledge base)
**And** the page contains at least one navigable link to the Tecnologia entry page
**And** the page contains at least one navigable link to the Estatística entry page

**Given** the home page is rendered on the published site
**When** navigating from the home page to any domain entry page
**Then** the navigation is completed in one click (≤1 of the 3-click budget used)

---

## Epic 2: Editorial Standard & Compliance

Fluiz pode criar qualquer novo documento usando um template pronto em segundos, e todos os documentos publicados respeitam o padrão de 7 seções sem exceção.

### Story 2.1: Create Editorial Template

As a content author (Fluiz),
I want a ready-to-use template file with all 7 editorial sections pre-filled,
So that I can start writing any new document without having to recall or look up the structure.

**Acceptance Criteria:**

**Given** `docs/_template.md` is created
**When** I open the file
**Then** it contains all 7 sections in the mandatory order: "O que é", "Para que serve", "Como funciona", "Analogia Intuitiva", "Exemplo Prático Real", "Pontos de Atenção", "Referências para Aprofundamento"
**And** each section contains placeholder text explaining what to fill in
**And** the file includes frontmatter with placeholder values for `id`, `title`, and `sidebar_label`

**Given** `website/sidebars.json` is inspected
**When** searching for the template reference
**Then** `_template` does not appear in any sidebar group (prefix `_` marks it as unpublished)

**Given** `docs/intro/welcome.md` is viewed
**When** reading the page
**Then** it contains a reference or direct link to `docs/_template.md` for new document creation

---

### Story 2.2: Audit & Fix Technology Domain Documents

As a site visitor,
I want all published Technology documents (Architecture, DevOps, Backend) to follow the 7-section editorial standard,
So that every document I read has a consistent, predictable structure.

**Acceptance Criteria:**

**Given** all published documents in `docs/architecture/`, `docs/devops/`, and `docs/backend/`
**When** each document is inspected for the 7 mandatory sections
**Then** any document missing more than one section is marked with `draft: true` in its frontmatter and removed from `sidebars.json`
**And** any document missing exactly one section has that section added with appropriate content
**And** documents already compliant are left unchanged

**Given** the audit is complete
**When** reviewing all Technology documents remaining in `sidebars.json`
**Then** every listed document contains all 7 sections: "O que é", "Para que serve", "Como funciona", "Analogia Intuitiva", "Exemplo Prático Real", "Pontos de Atenção", "Referências para Aprofundamento"

---

### Story 2.3: Audit & Fix Statistics Domain Published Documents

As a site visitor,
I want all currently published Statistics documents to follow the 7-section editorial standard,
So that the Estatística domain is as consistent as the Technology domain.

**Acceptance Criteria:**

**Given** all published documents in `docs/statistics/probabilidade/` and `docs/statistics/amostragem/` (excluding documents flagged as in-construction)
**When** each document is inspected for the 7 mandatory sections
**Then** any document missing more than one section is marked with `draft: true` in its frontmatter and removed from `statistics-sidebar`
**And** any document missing exactly one section has that section added with appropriate content
**And** documents already compliant are left unchanged

**Given** the audit is complete
**When** reviewing all Statistics documents remaining in `statistics-sidebar`
**Then** every listed document contains all 7 mandatory sections
**And** `docs/statistics/statistics-intro.md` is not subject to the 7-section audit (it is a domain index page, not an editorial document)

---

## Epic 3: Estatística Expansion & Quiz Fix

Visitantes podem estudar Estatística com profundidade mínima nas três subáreas (Probabilidade, Amostragem, Inferência) e o quiz de fixação funciona corretamente sem erros de runtime.

### Story 3.1: Fix Probability Quiz Bug

As a student studying probability,
I want the quiz to load and run correctly,
So that I can test my knowledge and see my results without errors.

**Acceptance Criteria:**

**Given** I am reading `docs/statistics/probabilidade/teste-fixacao-probabilidade.md`
**When** I click the quiz link
**Then** the quiz page loads without errors in the browser console
**And** the quiz page displays all questions correctly

**Given** the quiz is loaded at `website/static/quiz-probabilidade/index.html`
**When** I answer all questions and submit
**Then** my results are displayed correctly
**And** the "Voltar" / back link navigates to the correct statistics document URL: `/luiz-tech-notes/docs/statistics/probabilidade/probabilidade-classica`

**Given** `docs/statistics/probabilidade/teste-fixacao-probabilidade.md` is inspected
**When** reviewing the relative link to the quiz
**Then** the link is `../../../quiz-probabilidade/` (3 levels up from the document's depth)

**Given** `website/static/quiz-probabilidade/questions.json` is inspected
**When** reviewing the `backLink` field
**Then** its value is `/luiz-tech-notes/docs/statistics/probabilidade/probabilidade-classica`

---

### Story 3.2: Create Amostragem Sub-area Documents

As a student studying statistics,
I want at least three documents in the Amostragem sub-area,
So that I can study sampling concepts with enough depth and variety.

**Acceptance Criteria:**

**Given** `docs/statistics/amostragem/amostragem-simples.md` is created
**When** I view the file
**Then** it contains all 7 editorial sections in the mandatory order
**And** its frontmatter contains `id: amostragem-simples`, `title`, and `sidebar_label`
**And** its content covers simple random sampling with at least one analogy and a practical example

**Given** `docs/statistics/amostragem/amostragem-estratificada.md` is created
**When** I view the file
**Then** it contains all 7 editorial sections in the mandatory order
**And** its frontmatter contains `id: amostragem-estratificada`, `title`, and `sidebar_label`
**And** its content covers stratified sampling with at least one analogy and a practical example

**Given** both new documents are complete with all 7 sections
**When** `website/sidebars.json` (statistics-sidebar) is inspected
**Then** `amostragem/amostragem-simples` and `amostragem/amostragem-estratificada` are added to the `amostragem` group
**And** the `amostragem` group has at least 3 items (amostragem-intro + 2 new docs)

---

### Story 3.3: Create Inferência Sub-area Documents

As a student studying statistics,
I want at least three documents in the Inferência sub-area,
So that I can study statistical inference starting from the foundations.

**Acceptance Criteria:**

**Given** `docs/statistics/inferencia/inferencia-intro.md` is created
**When** I view the file
**Then** it contains all 7 editorial sections in the mandatory order
**And** its frontmatter contains `id: inferencia-intro`, `title`, and `sidebar_label`
**And** it serves as an entry/overview page for the Inferência sub-area

**Given** `docs/statistics/inferencia/intervalo-confianca.md` is created
**When** I view the file
**Then** it contains all 7 editorial sections in the mandatory order
**And** its frontmatter contains `id: intervalo-confianca`, `title`, and `sidebar_label`
**And** its content covers confidence intervals with at least one analogy and a practical example

**Given** `docs/statistics/inferencia/teste-hipotese.md` is created
**When** I view the file
**Then** it contains all 7 editorial sections in the mandatory order
**And** its frontmatter contains `id: teste-hipotese`, `title`, and `sidebar_label`
**And** its content covers hypothesis testing with at least one analogy and a practical example

**Given** all 3 new Inferência documents are complete with all 7 sections
**When** `website/sidebars.json` (statistics-sidebar) is inspected
**Then** `inferencia/inferencia-intro`, `inferencia/intervalo-confianca`, and `inferencia/teste-hipotese` are added to an `Inferência` group
**And** the `Inferência` group has exactly 3 items
