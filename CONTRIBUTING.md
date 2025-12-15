# 🤝 Contribuindo para Luiz Tech Notes

Muito obrigado por considerar contribuir para este repositório de estudos!

## 📋 Antes de Começar

1. Verifique se a sugestão/correção já não foi mencionada em [Issues](https://github.com/Luiz-Silva19/luiz-tech-notes/issues)
2. Leia o conteúdo relacionado para não duplicar informação
3. Verifique a estrutura de documentação existente

---

## 🚀 Como Contribuir

### 1. Reportar Erros

Abra uma **Issue** com:

- 📝 Descrição clara do erro
- 🔗 Link para a página
- 💡 Sugestão de correção (opcional)

### 2. Sugerir Melhorias

Abra uma **Issue** com label `enhancement`:

- 📚 Novo tópico a ser coberto
- 🎯 Melhorias em artigos existentes
- 🔗 Recursos adicionais relevantes

### 3. Criar Novo Artigo

Siga o **Template Padrão**:

```markdown
---
title: Seu Tópico
parent: Categoria Pai
nav_order: [número sequencial]
description: "Descrição curta para SEO"
---

# Seu Tópico

## Conceito

[Explicação clara]

## Exemplo Prático

\`\`\`bash

# Código

\`\`\`

## Diagrama

[ASCII art ou imagem]

## Pontos-chave

- Ponto 1
- Ponto 2

## Recursos para Aprofundar

- [Link 1](url)
- [Link 2](url)
```

### 4. Fazer Pull Request

1. **Fork** o repositório
2. **Clone** localmente
   ```bash
   git clone https://github.com/seu-usuario/luiz-tech-notes.git
   cd luiz-tech-notes
   ```
3. **Crie uma branch** descritiva
   ```bash
   git checkout -b feature/adicionar-kubernetes-docs
   ```
4. **Faça suas mudanças**
5. **Commit** com mensagens claras
   ```bash
   git commit -m "Add: Kubernetes overview documentation"
   ```
6. **Push** sua branch
   ```bash
   git push origin feature/adicionar-kubernetes-docs
   ```
7. **Abra um Pull Request** com descrição detalhada

---

## ✅ Checklist antes de Submeter

- [ ] Conteúdo está gramaticalmente correto
- [ ] Segue o template padrão
- [ ] Inclui exemplos práticos
- [ ] Tem links para recursos
- [ ] YAML frontmatter está correto
- [ ] Nenhum link quebrado
- [ ] Formatação Markdown está limpa

---

## 🎨 Padrões de Estilo

### Nomes de Arquivos

- Use **lowercase** com hífens: `cloud-computing.md`
- Use nomes **descritivos**

### Frontmatter YAML

```yaml
---
title: Seu Título
parent: Categoria Pai # Obrigatório para sub-páginas
nav_order: 1 # Número sequencial
description: "Descrição curta (para SEO)"
---
```

### Estrutura de Conteúdo

1. **Conceito** - Teoria
2. **Exemplo Prático** - Código/casos
3. **Diagrama** - Visualização
4. **Pontos-chave** - Resumo
5. **Recursos** - Links

### Emojis para Seções

```
📌 - Conceitos principais
💻 - Código/Exemplos
🏗️  - Arquitetura/Diagrama
📊 - Dados/Comparações
✅ - Vantagens
❌ - Limitações
🔗 - Links externos
```

---

## 📖 Documentação Local

### Setup

```bash
# Instalar dependências
bundle install

# Rodar localmente
bundle exec jekyll serve

# Acessar em http://localhost:4000
```

### Testes

```bash
# Verificar links quebrados
# (use uma ferramenta como htmlproofer)
bundle exec htmlproofer ./_site
```

---

## ❓ Dúvidas?

- Abra uma **Issue** com a tag `question`
- Deixe um comentário no PR
- Me contacte diretamente

---

## 📜 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (MIT).

---

**Obrigado por contribuir! 🎉**
