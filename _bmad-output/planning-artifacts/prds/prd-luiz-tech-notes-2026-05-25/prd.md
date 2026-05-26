---
title: PRD - Luiz Tech Notes
status: final
created: 2026-05-25
updated: 2026-05-25 (FR-5 busca removido do escopo)
language: pt-BR
brief: ../briefs/brief-luiz-tech-notes-2026-05-25/brief.md
---

# PRD: Luiz Tech Notes

## 0. Propósito do Documento

Este PRD define os requisitos do próximo ciclo de evolução do Knowledge Notes — uma biblioteca pessoal de estudo publicada como site estático via GitHub Pages. O documento serve de guia de implementação para o próprio autor; o output esperado são epics e stories de implementação. Entrada: brief finalizada em 2026-05-25.

## 1. Visão

O Knowledge Notes precisa se tornar um site que o próprio autor queira abrir quando for estudar — não apenas um repositório que existe. Isso exige três mudanças simultâneas: um nome e uma identidade que valham ser compartilhados no LinkedIn, navegação que deixe claro onde cada domínio começa e termina, e um padrão editorial que torne cada novo documento consistente sem esforço extra.

O acervo cobre tecnologia de software e estatística. Finanças quantitativas é o próximo domínio planejado, fora do escopo deste ciclo. O fio condutor de longo prazo é a trajetória quant — e o site precisa estar bem-feito o suficiente para ser evidência pública dessa trajetória.

## 2. Usuário

### 2.1 Jobs To Be Done

- Revisar rapidamente um conceito já estudado sem perder tempo procurando.
- Criar um novo documento de estudo sabendo exatamente a estrutura a seguir.
- Compartilhar o site no LinkedIn com confiança de que a primeira impressão é boa.
- Estudar estatística de forma progressiva, com os documentos de cada subárea organizados e acessíveis.

### 2.2 Jornadas de Usuário

- **UJ-1.** Fluiz abre o site para revisar um conceito de estatística e o encontra pela sidebar em menos de 30 segundos.
- **UJ-2.** Fluiz decide criar um novo documento de tecnologia e sabe qual estrutura seguir sem consultar as instruções.
- **UJ-3.** Um visitante do LinkedIn acessa o site pela primeira vez e entende imediatamente o que é e para onde ir.

## 3. Glossário

- **Domínio** — Uma das grandes áreas de estudo do site. Domínios ativos neste ciclo: Tecnologia, Estatística. Finanças Quantitativas está planejado para ciclo futuro. Cada domínio tem seção própria na sidebar e uma página de entrada (índice).
- **Página de entrada (índice)** — Primeira página de cada domínio; lista os subtópicos disponíveis e orienta o visitante pelo acervo.
- **Padrão editorial** — Estrutura obrigatória de 7 seções que todo documento deve seguir: definição, casos de uso, funcionamento, analogia, exemplo prático, pontos de atenção, referências.
- **Template** — Arquivo de rascunho pré-preenchido com o padrão editorial, pronto para o autor começar a escrever.
- **Quiz** — Componente interativo de múltipla escolha embutido em documentos de probabilidade.

## 4. Funcionalidades

### 4.1 Identidade e Nome do Site

**Descrição:** O nome atual ("luiz-tech-notes") é inadequado para compartilhamento profissional. O site precisa de um nome mais elegante, aplicado de forma consistente em todas as configurações. Realiza UJ-3.

**Requisitos Funcionais:**

#### FR-1: Aplicação do novo nome — Knowledge Notes

O site passa a se chamar **Knowledge Notes**. O nome deve ser aplicado de forma consistente em todas as configurações e referências do projeto.

**Consequências testáveis:**

- O título exibido no browser e na barra de navegação do Docusaurus é "Knowledge Notes".
- O campo `title` em `website/siteConfig.js` está atualizado para "Knowledge Notes".
- README e demais referências internas ao nome antigo foram atualizadas.

---

### 4.2 Navegação e Organização Visual

**Descrição:** A sidebar atual mistura itens sem separação clara entre domínios. A home page não comunica o propósito do site nem orienta o visitante. Cada domínio precisa de uma página de entrada que funcione como índice. Realiza UJ-1, UJ-3.

**Requisitos Funcionais:**

#### FR-2: Sidebar organizada por domínio

A sidebar agrupa os documentos em seções nomeadas por domínio (Tecnologia, Estatística), com separação visual clara entre eles. Nenhum documento fica solto fora de uma seção de domínio.

**Consequências testáveis:**

- `website/sidebars.json` tem uma chave por domínio, sem itens fora de grupo.
- A sidebar renderiza os grupos com rótulos visíveis no site publicado.

#### FR-3: Página de entrada por domínio

Cada domínio tem uma página de índice que lista os subtópicos disponíveis e serve como ponto de entrada para visitantes que chegam pela primeira vez.

**Consequências testáveis:**

- Existe pelo menos uma página de índice para Tecnologia e uma para Estatística.
- Cada página de índice é o primeiro item do respectivo grupo na sidebar.

#### FR-4: Home page clara e consistente

A página inicial apresenta: o propósito do site, os domínios cobertos, e links diretos para a entrada de cada área.

**Consequências testáveis:**

- A home page (`docs/intro/welcome.md` ou equivalente) menciona explicitamente os domínios cobertos.
- Há links navegáveis para cada domínio a partir da home.

---

### 4.3 Padrão Editorial e Fluxo de Criação

**Descrição:** Documentos existentes têm inconsistências de estrutura. Criar um novo documento exige lembrar o padrão de 7 seções manualmente. O objetivo é que o padrão seja seguido sem esforço cognitivo extra. Realiza UJ-2.

**Requisitos Funcionais:**

#### FR-6: Template padrão disponível

Existe um arquivo de template com as 7 seções do padrão editorial pré-preenchidas, pronto para ser copiado ao criar um novo documento.

**Consequências testáveis:**

- O template existe em um local documentado e acessível.
- Um novo documento criado a partir do template já tem todas as 7 seções com instruções de preenchimento.

#### FR-7: Documentos existentes em conformidade

Os documentos publicados em Tecnologia e Estatística atendem ao padrão editorial de 7 seções.

**Consequências testáveis:**

- Nenhum documento publicado está faltando mais de uma das 7 seções obrigatórias.

**[ASSUMPTION: documentos de estatística ainda em construção são considerados incompletos e não entram na verificação de conformidade até serem publicados.]**

---

### 4.4 Expansão de Conteúdo — Estatística

**Descrição:** O domínio de estatística está incompleto. As subáreas de probabilidade, amostragem e inferência existem mas precisam de mais documentos para ter profundidade mínima de estudo. Realiza UJ-1.

**Requisitos Funcionais:**

#### FR-8: Cobertura mínima do domínio de Estatística

Cada subárea de Estatística (Probabilidade, Amostragem, Inferência) tem ao menos três documentos publicados e conformes ao padrão editorial.

**Consequências testáveis:**

- Contagem de documentos publicados por subárea ≥ 3.
- Cada documento passa na verificação do padrão editorial (FR-7).

---

### 4.5 Correção do Quiz de Probabilidade

**Descrição:** O componente de quiz na seção de probabilidade apresenta erros de funcionamento. Trata-se de uma correção de defeito, não de nova funcionalidade.

**Requisitos Funcionais:**

#### FR-9: Quiz de probabilidade funcional

O quiz na seção de probabilidade executa sem erros de runtime, carrega as questões e registra respostas corretamente.

**Consequências testáveis:**

- O quiz carrega sem erros no console do browser.
- O usuário consegue responder todas as questões e ver o resultado.

---

## 5. Não-Objetivos

- Conteúdo de finanças quantitativas (próximo ciclo, sem data).
- Busca integrada (removida do escopo — a sidebar organizada é suficiente para este ciclo).
- Funcionalidades de comunidade, login ou colaboração multiusuário.
- Monetização.
- Redesign visual completo ou troca de framework de publicação.
- SEO avançado ou estratégia de conteúdo para crescimento de audiência.

## 6. Escopo do MVP

### Dentro do escopo

- Renomear o site para **Knowledge Notes** e aplicar em todas as configurações (FR-1).
- Reorganizar a sidebar em grupos por domínio (FR-2).
- Criar páginas de entrada (índice) por domínio (FR-3).
- Melhorar a home page para comunicar propósito e domínios (FR-4).
- Criar template com o padrão editorial de 7 seções (FR-6).
- Revisar documentos existentes para conformidade com o padrão editorial (FR-7).
- Expandir o acervo de Estatística — mínimo 3 documentos por subárea (FR-8).
- Corrigir o quiz de probabilidade (FR-9).

### Fora do escopo do MVP

- Finanças quantitativas (qualquer conteúdo ou estrutura).
- Temas visuais customizados além do que o Docusaurus v1 oferece nativamente.

## 7. Métricas de Sucesso

**Primárias**

- **SM-1:** Qualquer tópico de Tecnologia ou Estatística é localizado pela sidebar em até 3 cliques a partir da home. Valida FR-2, FR-3, FR-4.
- **SM-2:** 100% dos documentos publicados atendem ao padrão editorial de 7 seções. Valida FR-6, FR-7.
- **SM-3:** Quiz de probabilidade executa sem erros em browser moderno. Valida FR-9.

**Contra-métrica (não otimizar)**

- **SM-C1:** Volume de documentos publicados não deve crescer em detrimento da qualidade editorial — novos documentos só são publicados quando conformes ao padrão.

## 8. Perguntas em Aberto

1. ~~Qual será o novo nome do site?~~ ✅ **Resolvida** — o nome escolhido é **Knowledge Notes**. (FR-1)
2. ~~Qual solução de busca usar no Docusaurus v1?~~ ✅ **Removida do escopo** — busca não será implementada neste ciclo. A sidebar organizada supre a necessidade de navegação.
3. Quais documentos específicos de Estatística devem ser criados para atingir a cobertura mínima de FR-8? _(em aberto — não bloqueia início da implementação)_

## 9. Índice de Assumptions

- **§4.4 FR-7** — Documentos em construção não entram na verificação de conformidade até serem publicados.
