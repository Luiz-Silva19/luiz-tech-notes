---
baseline_commit: 2fdd4f3e623936f69704d506ad97c1c469570e0c
---

# Story 1.1: Apply "Knowledge Notes" Name

Status: done

## Story

As a LinkedIn visitor / site visitor,
I want the site to display the name "Knowledge Notes" consistently everywhere,
so that the brand is professional and recognizable when I share or access the link.

## Acceptance Criteria

1. **Given** I visit the site in a browser **When** the page loads **Then** the browser tab title shows "Knowledge Notes" AND the Docusaurus navigation bar displays "Knowledge Notes"
2. **Given** `website/siteConfig.js` is inspected **When** reviewing each configuration field **Then** `title` equals `"Knowledge Notes"` AND `tagline` is updated to reflect the domains covered (Tecnologia e Estatística) AND `projectName` remains `"luiz-tech-notes"` (unchanged) AND `baseUrl` remains `"/luiz-tech-notes/"` (unchanged) AND all entries in the `scripts` array (MathJax) are preserved exactly as before
3. **Given** `README.md` is inspected **When** reviewing all text content **Then** no occurrence of the old display name remains AND all references show "Knowledge Notes"

## Tasks / Subtasks

- [x] Task 1 — Atualizar `website/siteConfig.js` (AC: #1, #2)
  - [x] 1.1 — Alterar `title` de `"Luiz Tech Notes"` para `"Knowledge Notes"`
  - [x] 1.2 — Atualizar `tagline` para refletir os domínios Tecnologia e Estatística
  - [x] 1.3 — Confirmar que `projectName`, `baseUrl` e o array `scripts` (MathJax) estão intocados
- [x] Task 2 — Verificar/atualizar referências ao nome antigo (AC: #3)
  - [x] 2.1 — Procurar ocorrências de "Luiz Tech Notes" em `website/README.md`, `website/core/Footer.js` e qualquer outro arquivo de configuração/conteúdo
  - [x] 2.2 — Substituir cada ocorrência encontrada por "Knowledge Notes"
  - [x] 2.3 — Verificar se existe um `README.md` na raiz do projeto; se não existir, o AC #3 aplica-se apenas aos arquivos encontrados (nenhum arquivo a criar)

## Dev Notes

### Contexto Arquitetural Crítico (AD-1)

Esta story cobre **exclusivamente** o requisito FR-1. A regra central é:

> **Somente `title` e `tagline` mudam em `website/siteConfig.js`.** Os campos `projectName` e `baseUrl` são determinados pelo nome do repositório GitHub (`luiz-tech-notes`) e **NÃO DEVEM SER ALTERADOS** — mudar esses campos quebraria a publicação no GitHub Pages.

### Estado Atual do `website/siteConfig.js`

```javascript
// ESTADO ATUAL — o que existe hoje
title: "Luiz Tech Notes",         // ← ALTERAR para "Knowledge Notes"
tagline: "Documentação técnica sobre Cloud, Arquitetura, DevOps e Backend",  // ← ATUALIZAR
projectName: "luiz-tech-notes",   // ← NÃO ALTERAR
baseUrl: "/luiz-tech-notes/",     // ← NÃO ALTERAR (gerenciado via env NODE_ENV)
```

O `baseUrl` é resolvido dinamicamente:

```javascript
const baseUrl =
  process.env.NODE_ENV === "development" ? "/" : "/luiz-tech-notes/";
```

Essa lógica **deve ser preservada exatamente como está**.

### Array `scripts` — Risco de Regressão Alto ⚠️

O array `scripts` contém as entradas do MathJax e **DEVE ser preservado integralmente**:

```javascript
scripts: [
  `${baseUrl}js/mathjax-config.js`,
  "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js?config=TeX-AMS_CHTML",
  `${baseUrl}js/mathjax-rerender.js`,
  "https://buttons.github.io/buttons.js",
],
```

> ⚠️ Se qualquer entrada for removida ou reordenada, as fórmulas matemáticas nos documentos de Estatística deixam de renderizar. Este é o risco de regressão mais alto desta story.

### Valor Sugerido para `tagline`

O novo `tagline` deve refletir os dois domínios cobertos (Tecnologia e Estatística):

```javascript
tagline: "Base de conhecimento técnico sobre Tecnologia e Estatística",
```

_(Fluiz pode ajustar o texto final conforme preferência, desde que ambos os domínios sejam mencionados.)_

### Sobre o `README.md` da Raiz

Após investigação, **não existe um `README.md` na raiz do projeto** (`c:\Users\fluiz\projetos\luiz-tech-notes\`). Os READMEs encontrados são:

- `website/README.md` — README padrão do Docusaurus, sem referência ao nome "Luiz Tech Notes"
- `_bmad/wds/scripts/README.md` — README de scripts internos, irrelevante para este AC

**Ação:** Verificar `website/core/Footer.js` e qualquer outra referência textual. Se encontrar ocorrências de "Luiz Tech Notes" em qualquer arquivo do repositório (exceto nos artefatos de planejamento `_bmad-output/`), substituir por "Knowledge Notes".

### Abrangência do Rename

Esta story é **intencional e deliberadamente pequena** — cobre apenas o rebranding do nome. As outras partes do Epic 1 (sidebar, páginas de entrada, home page) estão nas Stories 1.2, 1.3 e 1.4.

**Não incluir nesta story:**

- Alterações em `headerLinks`
- Alterações em `website/sidebars.json`
- Criação de `docs/intro/tecnologia-intro.md`
- Alterações em `docs/intro/welcome.md`

### Referências Técnicas

- [Source: `_bmad-output/planning-artifacts/architecture.md` — AD-1: Escopo do Renaming]
- [Source: `_bmad-output/planning-artifacts/architecture.md` — Fronteira de MathJax]
- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 1.1 Acceptance Criteria]
- [Source: `_bmad-output/planning-artifacts/architecture.md` — AR-2 / AR-6]
- [Source: `website/siteConfig.js` — estado atual dos campos]

### Project Structure Notes

| Arquivo                  | Ação          | Observação                                     |
| ------------------------ | ------------- | ---------------------------------------------- |
| `website/siteConfig.js`  | **UPDATE**    | Apenas `title` e `tagline`                     |
| `website/README.md`      | **VERIFICAR** | Pode não ter referência ao nome antigo         |
| `website/core/Footer.js` | **VERIFICAR** | Verificar se exibe o nome do site textualmente |
| `README.md` (raiz)       | **N/A**       | Arquivo não existe                             |

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

- Build validado: `npm run build` em `website/` → exit code 0, "Site built successfully"
- Aviso pré-existente ignorado: unresolved link em `backend/messaging/messaging-intro.md` (não introduzido por esta story)

### Completion Notes List

- ✅ `website/siteConfig.js`: `title` alterado de `"Luiz Tech Notes"` para `"Knowledge Notes"`
- ✅ `website/siteConfig.js`: `tagline` atualizado para `"Base de conhecimento técnico sobre Tecnologia e Estatística"`
- ✅ `projectName`, `baseUrl` (dinâmico via NODE_ENV) e array `scripts` (4 entradas MathJax + GitHub buttons) preservados integralmente
- ✅ `website/core/Footer.js`: usa `this.props.config.title` dinamicamente — nenhuma alteração necessária
- ✅ `website/README.md`: nenhuma ocorrência de "Luiz Tech Notes" encontrada
- ✅ Root `README.md`: arquivo inexistente — AC #3 satisfeito por N/A
- ℹ️ Ocorrências fora de escopo (não alteradas): `website/i18n/en.json` linha 173 (`"Bem-vindo ao Luiz Tech Notes"`) — title override da welcome page; pertence ao escopo da Story 1.4. Arquivos `_bmad-output/` e `.github/` explicitamente excluídos.
- ✅ Build Docusaurus concluído com sucesso após as alterações

### File List

- `website/siteConfig.js` (modificado)

### Review Findings

- [x] [Review][Defer] i18n/en.json line 173: welcome page title still references "Luiz Tech Notes" [website/i18n/en.json:173] — deferred, pre-existing; explicitly scoped to Story 1.4 (home page rewrite)
