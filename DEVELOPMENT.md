# 📝 Guia de Desenvolvimento - Luiz Tech Notes

Bem-vindo ao guia de desenvolvimento do projeto Luiz Tech Notes! Este documento explica como editar, adicionar novas documentações e manter o projeto.

## 📋 Índice

- [Configuração do Ambiente](#configuração-do-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Adicionar Novas Documentações](#como-adicionar-novas-documentações)
- [Como Editar Documentações Existentes](#como-editar-documentações-existentes)
- [Como Adicionar Posts no Blog](#como-adicionar-posts-no-blog)
- [Como Adicionar Novas Categorias](#como-adicionar-novas-categorias)
- [Comandos Úteis](#comandos-úteis)
- [Deployment](#deployment)

---

## 🔧 Configuração do Ambiente

### Pré-requisitos

- **Node.js 18+** (versão recomendada: LTS)
- **npm** ou **yarn**
- **Git** instalado

### Instalação Inicial

```bash
# 1. Clone o repositório (se ainda não tiver)
git clone https://github.com/Luiz-Silva19/luiz-tech-notes.git
cd luiz-tech-notes

# 2. Instale as dependências
npm install

# 3. Inicie o servidor local
npm start
```

O site abrirá em `http://localhost:3000/luiz-tech-notes/`

---

## 📁 Estrutura do Projeto

```
luiz-tech-notes/
├── docs/                          # Documentação principal
│   ├── index.md                   # Página de introdução
│   ├── aws/                       # Tópicos AWS
│   │   ├── index.md              # Visão geral AWS
│   │   ├── ec2.md                # EC2 documentation
│   │   ├── s3.md                 # S3 documentation
│   │   └── load-balancers/       # Subcategoria Load Balancers
│   │       ├── alb.md            # Application Load Balancer
│   │       ├── nlb.md            # Network Load Balancer
│   │       └── gwlb.md           # Gateway Load Balancer
│   ├── backend/                   # Tópicos Backend
│   │   ├── index.md
│   │   ├── node.md               # Node.js
│   │   └── dotnet.md             # .NET
│   └── infra/                     # Tópicos Infraestrutura
│       ├── index.md
│       ├── docker.md             # Docker
│       └── kubernetes.md         # Kubernetes
├── blog/                          # Posts do blog
│   ├── authors.yml                # Configuração de autores
│   └── 2024-12-16-bem-vindo.md   # Exemplo de post
├── src/
│   ├── pages/
│   │   └── index.tsx             # Página inicial customizada
│   └── css/
│       └── custom.css            # Estilos customizados
├── static/
│   └── img/                       # Imagens estáticas
├── docusaurus.config.ts          # Configuração principal
├── sidebars.ts                    # Estrutura da sidebar
└── package.json                   # Dependências do projeto
```

---

## 📚 Como Adicionar Novas Documentações

### Passo 1: Criar o Arquivo Markdown

Crie um novo arquivo `.md` na pasta apropriada sob `docs/`. Por exemplo, para adicionar uma documentação sobre RDS no AWS:

```bash
# Criar arquivo
docs/aws/rds.md
```

### Passo 2: Adicionar Front Matter

Sempre comece o arquivo com YAML front matter:

```yaml
---
id: rds
title: RDS - Relational Database Service
sidebar_position: 4
tags: [AWS, Banco de Dados, RDS]
---
# RDS - Relational Database Service

Conteúdo da documentação aqui...
```

**Explicação do Front Matter:**

- `id`: Identificador único da página
- `title`: Título que aparece na sidebar
- `sidebar_position`: Ordem de exibição (números menores aparecem primeiro)
- `tags`: Tags para busca e categorização (opcional)
- `description`: Descrição para SEO (opcional)

### Passo 3: Registrar na Sidebar

Edite `sidebars.ts` para adicionar a nova página:

```typescript
// Em docs/sidebars.ts
const sidebars = {
  docs: [
    'index',
    {
      label: 'AWS',
      items: [
        'aws/index',
        'aws/ec2',
        'aws/s3',
        'aws/rds', // ← Nova página
        {
          label: 'Load Balancers',
          items: [
            'aws/load-balancers/alb',
            'aws/load-balancers/nlb',
            'aws/load-balancers/gwlb',
          ],
        },
      ],
    },
    // ... outras categorias
  ],
};
```

### Passo 4: Verificar Localmente

```bash
npm start
```

Acesse `http://localhost:3000/luiz-tech-notes/` e verifique se a página aparece corretamente.

---

## ✏️ Como Editar Documentações Existentes

### Editar um Arquivo Existente

Simplesmente abra o arquivo `.md` e faça suas edições:

```bash
# Exemplo: editar documentação de EC2
docs/aws/ec2.md
```

### Formato de Markdown Suportado

O projeto suporta **MDX** (Markdown + JSX). Você pode usar:

#### Texto simples

```markdown
# Título 1

## Título 2

### Título 3

Texto em **negrito** e _itálico_.

- Lista com bullet
- Item 2

1. Lista numerada
2. Item 2
```

#### Código

```markdown
# Inline code: `npm install`

# Bloco de código com sintaxe highlight:

\`\`\`bash
npm start
npm run build
\`\`\`

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`
```

#### Links

```markdown
# Link externo

[Google](https://google.com)

# Link interno

[Introdução](/docs/intro)

# Link relativo

[EC2](./ec2)
```

#### Imagens

```markdown
![Alt text](../../../static/img/exemplo.png)
```

#### Tabelas

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Célula 1 | Célula 2 |
| Célula 3 | Célula 4 |
```

#### Admonitions (caixas destacadas)

```markdown
:::note
Nota importante aqui
:::

:::info
Informação útil
:::

:::warning
Aviso importante
:::

:::danger
Erro crítico
:::

:::tip
Dica útil
:::
```

---

## 📝 Como Adicionar Posts no Blog

### Passo 1: Criar Arquivo de Post

Crie um arquivo em `blog/` com formato: `YYYY-MM-DD-nome-do-post.md`

```bash
blog/2024-12-17-novo-post.md
```

### Passo 2: Adicionar Front Matter

```yaml
---
title: Título do Post
description: Descrição breve do conteúdo
slug: nome-do-post
authors: luiz_silva
tags: [tag1, tag2, tag3]
---
# Título do Post

Conteúdo aqui...
```

### Passo 3: Configurar Autor

Edite `blog/authors.yml`:

```yaml
luiz_silva:
  name: Luiz Silva
  title: Developer & Tech Writer
  url: https://github.com/Luiz-Silva19
  image_url: https://avatars.githubusercontent.com/u/seu-id?v=4
```

### Passo 4: Publicar

O post aparecerá automaticamente no blog assim que você fazer push para `main`.

---

## 🏷️ Como Adicionar Novas Categorias

Suponha que queira adicionar uma categoria sobre "DevOps":

### Passo 1: Criar Pasta

```bash
mkdir docs/devops
```

### Passo 2: Criar Arquivo Index

```bash
# docs/devops/index.md
---
id: index
title: DevOps
sidebar_position: 4
---

# DevOps

Visão geral sobre DevOps...
```

### Passo 3: Adicionar Subcategorias

```bash
# docs/devops/cicd.md
# docs/devops/monitoring.md
# docs/devops/logging.md
```

### Passo 4: Registrar em sidebars.ts

```typescript
const sidebars = {
  docs: [
    'index',
    // ... categorias existentes
    {
      label: 'DevOps',
      items: [
        'devops/index',
        'devops/cicd',
        'devops/monitoring',
        'devops/logging',
      ],
    },
  ],
};
```

### Passo 5: Adicionar ao Menu de Navegação (opcional)

Edite `docusaurus.config.ts` para adicionar link no navbar:

```typescript
navbar: {
  items: [
    // ... itens existentes
    {
      type: 'docSidebar',
      sidebarId: 'docs',
      position: 'left',
      label: 'Docs',
    },
    // Novo item para DevOps aparecerá automaticamente na sidebar
  ],
},
```

---

## 🚀 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento (hot reload)
npm start

# Build para produção
npm run build

# Servir o build localmente
npm run serve

# Limpar cache e build
npm run clear && npm run build

# Verificar erros
npm run lint

# Atualizar dependências
npm update
```

---

## 🌐 Deployment

### Fluxo de Deployment Automático

O projeto está configurado com **GitHub Actions**. Sempre que você fizer push para a branch `main`:

1. ✅ Código é verificado
2. ✅ Dependências são instaladas
3. ✅ Site é construído
4. ✅ Artefato é enviado
5. ✅ Deploy automático para GitHub Pages

### Deploy Manual (se necessário)

```bash
# 1. Certifique-se de que tudo está commitado
git status

# 2. Faça build
npm run build

# 3. Push para main
git add .
git commit -m "docs: adicionar nova documentação sobre [tema]"
git push origin main
```

O site será atualizado automaticamente em `https://luiz-silva19.github.io/luiz-tech-notes/` em alguns minutos.

---

## ✨ Boas Práticas

### 1. Commits Claros

```bash
git commit -m "docs: adicionar guia de RDS"
git commit -m "fix: corrigir typo em documentação de EC2"
git commit -m "feat: adicionar nova categoria DevOps"
```

### Prefixos Recomendados:

- `docs:` - Adições/mudanças em documentação
- `fix:` - Correções de typos ou erros
- `feat:` - Novas features ou categorias
- `style:` - Mudanças visuais/CSS
- `refactor:` - Reorganização de conteúdo

### 2. Revisar Localmente Antes de Push

```bash
npm start
# Verificar se tudo aparece correto em http://localhost:3000/luiz-tech-notes/
```

### 3. Manter Estrutura Consistente

- Use títulos em português
- Mantenha o padrão de front matter
- Use admonitions para destacar informações importantes
- Adicione exemplos práticos de código

### 4. Imagens e Recursos

- Coloque imagens em `static/img/`
- Use caminhos relativos: `../../../static/img/minha-imagem.png`
- Use formatos: PNG, JPG, SVG
- Comprima imagens antes de adicionar

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
# Solução: Reinstale dependências
rm -r node_modules package-lock.json
npm install
```

### Erro: "Port 3000 is already in use"

```bash
# Solução: Mude para outra porta
npm start -- --port 3001
```

### Build falha localmente

```bash
# Solução: Limpe cache e reconstrua
npm run clear
npm run build
```

### Mudanças não aparecem

```bash
# Solução: Aguarde reload automático ou refresh manual
# No terminal, pressione 'R' ou Ctrl+R no navegador
```

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique o [Docusaurus Documentation](https://docusaurus.io/)
2. Abra uma issue no GitHub
3. Consulte os arquivos existentes para ver padrões

---

## 📜 Licença

Este projeto é aberto para contribuições. Qualquer pessoa pode adicionar documentações e melhorias!

---

**Última atualização:** Dezembro 2024

Bom desenvolvimento! 🚀
