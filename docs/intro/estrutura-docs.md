---
id: estrutura-docs
title: Como Estruturar Documentos
sidebar_label: Estruturar Docs
---

## Guia Completo: Como Adicionar Documentos Aninhados

### Estrutura de Pastas

Quando você criar pastas e arquivos, a estrutura deve ser:

```
docs/
├── cloud/
│   ├── aws/
│   │   ├── aws-intro.md          ← Documento principal
│   │   ├── load-balancers/       ← Pasta (vira subcategoria)
│   │   │   ├── alb.md
│   │   │   ├── nlb.md
│   │   │   └── glb.md
│   │   ├── ec2/                  ← Outra subcategoria
│   │   │   ├── instances.md
│   │   │   └── auto-scaling.md
│   │   └── s3/
│   │       ├── buckets.md
│   │       └── lifecycle.md
```

### Passo a Passo

#### 1️⃣ Criar a Pasta e os Arquivos

```powershell
# Criar a estrutura
mkdir docs/cloud/aws/load-balancers
cd docs/cloud/aws/load-balancers

# Criar os arquivos
New-Item alb.md
New-Item nlb.md
New-Item glb.md
```

#### 2️⃣ Configurar Front Matter nos Arquivos

Cada arquivo `.md` deve ter cabeçalho com metadados:

**Formato obrigatório:**

```markdown
---
id: identificador-unico
title: Título Completo que Aparece na Página
sidebar_label: Nome Curto no Menu
---

Conteúdo do documento...
```

**Exemplo real (alb.md):**

```markdown
---
id: aws-alb
title: Application Load Balancer - ALB
sidebar_label: ALB
---

## O que é ALB?

...
```

**Campos importantes:**

- `id`: Identificador único (usado no sidebars.json)
- `title`: Título da página (aparece no topo)
- `sidebar_label`: Nome curto no menu lateral

#### 3️⃣ Atualizar sidebars.json

O arquivo `website/sidebars.json` controla a navegação.

**Antes (estrutura plana):**

```json
{
  "docs": {
    "Cloud": [
      "cloud/cloud-intro",
      "cloud/aws/aws-intro",
      "cloud/azure/azure-intro"
    ]
  }
}
```

**Depois (com subcategorias):**

```json
{
  "docs": {
    "Cloud": [
      "cloud/cloud-intro",
      {
        "type": "subcategory",
        "label": "AWS",
        "ids": [
          "cloud/aws/aws-intro",
          {
            "type": "subcategory",
            "label": "Load Balancers",
            "ids": [
              "cloud/aws/load-balancers/alb",
              "cloud/aws/load-balancers/nlb",
              "cloud/aws/load-balancers/glb"
            ]
          }
        ]
      },
      "cloud/azure/azure-intro"
    ]
  }
}
```

### Estrutura da Navegação

Com a configuração acima, o menu lateral ficará:

```
📁 Cloud
  📄 Introdução ao Cloud
  📁 AWS                          ← subcategory
    📄 Introdução AWS
    📁 Load Balancers             ← subcategory aninhada
      📄 ALB
      📄 NLB
      📄 GLB
  📄 Azure
  📄 GCP
```

### Sintaxe do sidebars.json

#### Documento Simples

```json
"cloud/aws/aws-intro"
```

#### Subcategoria (com documentos dentro)

```json
{
  "type": "subcategory",
  "label": "Nome que aparece no menu",
  "ids": ["caminho/do/documento1", "caminho/do/documento2"]
}
```

#### Subcategorias Aninhadas

```json
{
  "type": "subcategory",
  "label": "Categoria Principal",
  "ids": [
    "documento-intro",
    {
      "type": "subcategory",
      "label": "Subcategoria Aninhada",
      "ids": ["documento1", "documento2"]
    }
  ]
}
```

### Exemplo Completo: Estrutura AWS

```json
{
  "docs": {
    "Cloud": [
      "cloud/cloud-intro",
      {
        "type": "subcategory",
        "label": "AWS",
        "ids": [
          "cloud/aws/aws-intro",

          {
            "type": "subcategory",
            "label": "Compute",
            "ids": [
              "cloud/aws/ec2/instances",
              "cloud/aws/ec2/auto-scaling",
              "cloud/aws/lambda/functions"
            ]
          },

          {
            "type": "subcategory",
            "label": "Storage",
            "ids": [
              "cloud/aws/s3/buckets",
              "cloud/aws/s3/lifecycle",
              "cloud/aws/ebs/volumes"
            ]
          },

          {
            "type": "subcategory",
            "label": "Load Balancers",
            "ids": [
              "cloud/aws/load-balancers/alb",
              "cloud/aws/load-balancers/nlb",
              "cloud/aws/load-balancers/glb"
            ]
          }
        ]
      }
    ]
  }
}
```

### Checklist de Verificação

Antes de commitar, verifique:

- [ ] ✅ Pasta criada na estrutura correta
- [ ] ✅ Arquivos `.md` criados
- [ ] ✅ Front matter configurado em cada arquivo (id, title, sidebar_label)
- [ ] ✅ `sidebars.json` atualizado com os IDs corretos
- [ ] ✅ Teste local funcionando: `npm start`
- [ ] ✅ Navegação aparecendo corretamente

### Testando Localmente

```powershell
# Na pasta website/
cd website
npm start
```

Navegue para verificar:

1. Menu lateral mostra as categorias
2. Clique expande/contrai subcategorias
3. Links funcionam
4. Títulos aparecem corretamente

### Erros Comuns

#### ❌ Erro: "Document not found"

**Causa:** ID no `sidebars.json` não corresponde ao `id` do front matter

**Solução:**

```json
// sidebars.json
"cloud/aws/load-balancers/alb"  ← deve ser só o ID

// alb.md
---
id: aws-alb                     ← deve corresponder sem path
```

**Correto:**

```json
// sidebars.json
"cloud/aws/load-balancers/alb"

// alb.md (arquivo em docs/cloud/aws/load-balancers/alb.md)
---
id: alb                          ← só o nome
---
```

#### ❌ Erro: Título duplicado

**Causa:** H1 no markdown + title no front matter

**Solução:** Use APENAS o front matter

```markdown
---
id: alb
title: Application Load Balancer
---

## O que é ALB? ← Comece com H2
```

#### ❌ Erro: Categoria não expande

**Causa:** Sintaxe incorreta no sidebars.json

**Solução:** Verifique vírgulas e chaves

```json
{
  "type": "subcategory",
  "label": "AWS",
  "ids": [              ← array precisa de []
    "doc1",
    "doc2"              ← sem vírgula no último
  ]
}
```

### Convenções de Nomenclatura

#### IDs de Documentos

```markdown
# Bom

id: aws-alb
id: k8s-pods
id: docker-compose

# Ruim

id: Application Load Balancer
id: Kubernetes Pods
```

#### Paths de Pastas

```
# Bom
docs/cloud/aws/load-balancers/
docs/devops/kubernetes/workloads/

# Ruim
docs/cloud/AWS/Load Balancers/
docs/DevOps/Kubernetes/Workloads/
```

#### Labels no Menu

```json
# Bom
"label": "Load Balancers"
"label": "CI/CD"

# Ruim (muito longo)
"label": "Load Balancers e Balanceamento de Carga"
```

### Template para Novo Documento

Copie e adapte:

````markdown
---
id: nome-do-doc
title: Título Completo do Documento
sidebar_label: Nome Curto
---

## Introdução

Breve descrição do que este documento cobre.

## Tópico Principal

### Subtópico

Conteúdo...

## Exemplos

```bash
# Código de exemplo
comando --flag valor
```
````

## Referências

- [Link 1](https://...)
- [Link 2](https://...)

````

### Workflow Recomendado

```powershell
# 1. Criar estrutura
mkdir docs/categoria/subcategoria/nova-pasta

# 2. Criar arquivo
New-Item docs/categoria/subcategoria/nova-pasta/doc.md

# 3. Adicionar front matter e conteúdo
code docs/categoria/subcategoria/nova-pasta/doc.md

# 4. Atualizar sidebars.json
code website/sidebars.json

# 5. Testar localmente
cd website
npm start

# 6. Se OK, commitar
git add .
git commit -m "docs: adiciona documentação sobre X"
git push
````

### Estrutura Atual do Seu Projeto

```
📁 Introdução
  📄 Bem-vindo
  📄 Guia de Diagramas
  📄 Como Estruturar Docs     ← Este guia

📁 Cloud
  📄 Introdução ao Cloud
  📁 AWS
    📄 Introdução AWS
    📁 Load Balancers
      📄 ALB
      📄 NLB
      📄 GLB
  📄 Azure
  📄 GCP

📁 Arquitetura
  📄 Introdução
  📄 Microservices
  📄 Monolith
  📄 Event-Driven

📁 DevOps
  📄 Introdução
  📄 Docker
  📄 Kubernetes
  📄 CI/CD

📁 Backend
  📄 Introdução
  📄 REST APIs
  📄 Messaging
  📄 Databases
```

### Próximos Passos Sugeridos

Para expandir sua documentação AWS, você pode criar:

```
docs/cloud/aws/
├── compute/
│   ├── ec2.md
│   ├── lambda.md
│   └── ecs.md
├── storage/
│   ├── s3.md
│   ├── ebs.md
│   └── efs.md
├── database/
│   ├── rds.md
│   ├── dynamodb.md
│   └── aurora.md
├── networking/
│   ├── vpc.md
│   ├── route53.md
│   └── cloudfront.md
```

Cada pasta vira uma subcategoria no menu! 🎯
