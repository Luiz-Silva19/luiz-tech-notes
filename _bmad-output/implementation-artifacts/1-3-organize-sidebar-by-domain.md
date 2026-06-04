---
baseline_commit: 2fdd4f3e623936f69704d506ad97c1c469570e0c
---

# Story 1.3: Organize Sidebar by Domain

Status: in-progress

## Story

As a site visitor,
I want the sidebar to group documents under named domain labels,
So that I can navigate directly to my area of interest without scanning a flat list.

## Acceptance Criteria

1. **Given** `website/sidebars.json` is inspected **When** reviewing the `docs` key **Then** the former `"Introdução"` group key is renamed to `"Tecnologia"` **And** `"intro/tecnologia-intro"` is the first item in the `"Tecnologia"` group **And** all other document IDs remain in their existing groups with no items outside a named group

2. **Given** I open the published site and view the sidebar **When** I browse the Tecnologia area **Then** sections are labeled visibly (e.g., "Tecnologia", "DevOps", "Backend") **And** no document appears outside a named group

3. **Given** `website/sidebars.json` is inspected for the `statistics-sidebar` **When** reviewing the first item **Then** `statistics-intro` is the first item (já é — sem alteração necessária)

## Tasks / Subtasks

- [x] Task 1 — Atualizar `website/sidebars.json` (AC: #1, #2)
  - [x] 1.1 — Renomear `"Introdução"` → `"Tecnologia"` no sidebar `docs`
  - [x] 1.2 — Inserir `"intro/tecnologia-intro"` como primeiro item do grupo "Tecnologia"
  - [x] 1.3 — Confirmar que `statistics-sidebar` já tem `statistics-intro` como primeiro item (AC #3 já satisfeito)

## Dev Notes

- AD-3: os dois sidebars (`docs` e `statistics-sidebar`) permanecem separados
- `statistics-sidebar` já está correto — `statistics-intro` é o primeiro item do grupo "Visão Geral"
- Não remover `intro/welcome`, `intro/diagramas`, `intro/estrutura-docs` do grupo "Tecnologia"

### File List

- `website/sidebars.json` (modificado)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Completion Notes List

- ✅ `"Introdução"` renomeado para `"Tecnologia"` em `sidebars.json`
- ✅ `"intro/tecnologia-intro"` adicionado como primeiro item do grupo "Tecnologia"
- ✅ `statistics-sidebar` sem alteração — `statistics-intro` já era o primeiro item
