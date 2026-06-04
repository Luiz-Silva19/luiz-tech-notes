---
baseline_commit: 2fdd4f3e623936f69704d506ad97c1c469570e0c
---

# Story 1.4: Rewrite Home Page

Status: in-progress

## Story

As a first-time visitor,
I want the home page to clearly present the site's purpose, the domains covered, and how to navigate to each one,
So that I understand what Knowledge Notes is and immediately know where to go.

## Acceptance Criteria

1. **Given** I visit the home page (`docs/intro/welcome.md`) **When** I read the page **Then** the page explicitly names both active domains: Tecnologia and Estatística **And** the page communicates the purpose of the site (personal study knowledge base) **And** the page contains at least one navigable link to the Tecnologia entry page **And** the page contains at least one navigable link to the Estatística entry page

2. **Given** the home page is rendered on the published site **When** navigating from the home page to any domain entry page **Then** the navigation is completed in one click (≤1 of the 3-click budget used)

## Tasks / Subtasks

- [x] Task 1 — Reescrever `docs/intro/welcome.md` (AC: #1, #2)
  - [x] 1.1 — Atualizar frontmatter `title` e `sidebar_label`
  - [x] 1.2 — Reescrever corpo com propósito do site e links para ambos os domínios
- [x] Task 2 — Atualizar `website/i18n/en.json` linha 173 (AC: #1)
  - [x] 2.1 — Substituir `"Bem-vindo ao Luiz Tech Notes"` pelo novo título da página

## Dev Notes

- O `title` no frontmatter e no i18n/en.json devem ser consistentes
- Links relativos: de `docs/intro/welcome.md` para `tecnologia-intro.md` → `./tecnologia-intro.md`; para estatística → usar URL completa ou verificar roteamento entre sidebars
- Em Docusaurus v1, links entre sidebars distintos (`docs` e `statistics-sidebar`) devem usar a URL publicada com `baseUrl`, pois são roteamentos separados
- A URL de statistics-intro no GitHub Pages: `/luiz-tech-notes/docs/statistics/statistics-intro`

### File List

- `docs/intro/welcome.md` (modificado)
- `website/i18n/en.json` (modificado)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Completion Notes List

- ✅ `docs/intro/welcome.md` reescrito com propósito, domínios e links de navegação
- ✅ Frontmatter `title` atualizado para "Knowledge Notes — Base de Conhecimento"
- ✅ `website/i18n/en.json` linha 173 atualizada para o novo título
- ✅ Links para ambos os domínios adicionados (Tecnologia e Estatística)
