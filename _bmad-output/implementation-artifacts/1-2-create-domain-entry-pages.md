---
baseline_commit: 2fdd4f3e623936f69704d506ad97c1c469570e0c
---

# Story 1.2: Create Domain Entry Pages

Status: in-progress

## Story

As a first-time visitor,
I want a clear entry page for each study domain,
So that I know what each domain covers before exploring its documents.

## Acceptance Criteria

1. **Given** `docs/intro/tecnologia-intro.md` is created **When** I view the file **Then** its frontmatter contains `id: tecnologia-intro`, `title`, and `sidebar_label` **And** the page body lists and links to the available subtopics (Architecture, DevOps, Backend) **And** the document follows the Docusaurus v1 markdown format

2. **Given** `docs/statistics/statistics-intro.md` is updated **When** I view the file **Then** its frontmatter contains `id: statistics-intro`, `title`, and `sidebar_label` **And** the page body lists the three subáreas: Probabilidade, Amostragem, Inferência **And** each subárea item that has an existing entry document links to it

## Tasks / Subtasks

- [x] Task 1 — Criar `docs/intro/tecnologia-intro.md` (AC: #1)
  - [x] 1.1 — Frontmatter com `id: tecnologia-intro`, `title` e `sidebar_label`
  - [x] 1.2 — Corpo com lista das subáreas de Tecnologia e links relativos
- [x] Task 2 — Atualizar `docs/statistics/statistics-intro.md` (AC: #2)
  - [x] 2.1 — Adicionar seção de navegação por subáreas com links

## Dev Notes

- Links internos sempre relativos (AR-8)
- `tecnologia-intro.md` é uma página de índice/navegação, não precisa das 7 seções editoriais (Story 2.2 auditará docs de conteúdo)
- `inferencia/` folder existe mas está vazia — listar a subárea sem link até Story 3.3
- Link de `docs/intro/` para subáreas de estatística: não aplicável aqui (domínios separados)

### File List

- `docs/intro/tecnologia-intro.md` (criado)
- `docs/statistics/statistics-intro.md` (modificado)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Completion Notes List

- ✅ `docs/intro/tecnologia-intro.md` criado com frontmatter correto e links relativos para Architecture, DevOps e Backend
- ✅ `docs/statistics/statistics-intro.md` atualizado com seção de navegação pelas 3 subáreas
- ℹ️ Inferência listada sem link (pasta vazia — será preenchida na Story 3.2/3.3)
