---
applyTo: "**"
---

# Instruções Base - Luiz Tech Notes

## 📋 Padrão de Estrutura Obrigatório

Cada documento técnico deve seguir EXATAMENTE esta estrutura:

### 1. O que é

Definição clara e concisa do conceito/tecnologia.

### 2. Para que serve

Casos de uso práticos e reais.

### 3. Como funciona

Explicação técnica do funcionamento interno.

### 4. Analogia Intuitiva (OBRIGATÓRIA)

Comparação com situações do mundo real para facilitar memorização.

### 5. Exemplo Prático Real

Código, configuração ou cenário concreto de aplicação.

### 6. Ponto de Atenção / Pegadinha de Prova

Erros comuns, confusões típicas e dicas para certificações.

---

## 🎭 Tom e Estilo do Conteúdo

### Linguagem

- **Técnica + Didática**: Precisão técnica sem perder clareza
- **Profissional mas acessível**: Não infantilizar, mas tornar compreensível
- **Objetiva**: Direto ao ponto, sem enrolação

### Analogias (MUITO IMPORTANTE)

**Use exemplos do mundo real:**

- 🚗 Estradas e trânsito
- ✈️ Aeroportos e controle de tráfego aéreo
- 🏢 Prédios e condomínios
- 🚪 Portarias e recepcionistas
- 🏛️ Postos de fiscalização
- 🏙️ Cidades e infraestrutura urbana

**Exemplos de boas analogias:**

```
✅ "Funciona como um desvio obrigatório na estrada, onde todo carro passa por um posto de fiscalização."
✅ "Age como um recepcionista que lê o pedido e direciona a pessoa para o andar correto."
✅ "É como um portão fixo de um condomínio: o endereço não muda, mesmo que tudo lá dentro mude."
```

**Características das analogias:**

- ✅ Ajudam a memorizar
- ✅ Complementam a explicação técnica (não substituem)
- ✅ Relacionam com experiências cotidianas
- ❌ Não infantilizam o conteúdo
- ❌ Não comprometem a precisão técnica

---

## 🧪 Foco em Certificação

Quando aplicável, sempre incluir:

### Dicas de Prova

- Palavras-chave que aparecem em questões
- Diferenças sutis entre serviços similares
- "Pegadinhas" comuns em exames

### Quando Usar vs Quando NÃO Usar

- Cenários ideais de aplicação
- Situações onde NÃO é a melhor escolha
- Comparação com alternativas

**Exemplo de observação para prova:**

```
💡 Em prova: Se o requisito mencionar "IP fixo", a resposta tende a envolver Network Load Balancer.
```

---

## 📝 Formatação e Convenções

### Títulos

- H2 (##) para seções principais
- H3 (###) para subseções
- H4 (####) apenas quando necessário para organização

### Código

```python
# Sempre incluir comentários explicativos
# Usar exemplos reais, não abstratos
def exemplo_pratico():
    """Função que demonstra conceito real"""
    pass
```

### Destaque de Informações

- 💡 Dicas importantes
- ⚠️ Avisos e cuidados
- ✅ Boas práticas
- ❌ O que evitar
- 🎯 Foco em prova/certificação

### Links Externos

Sempre abrir em nova aba:

```html
<a href="url" target="_blank" rel="noopener noreferrer">Texto</a>
```

### Comparações

Use tabelas para comparar tecnologias/abordagens:

| Característica | Opção A | Opção B |
| -------------- | ------- | ------- |
| Performance    | Alta    | Média   |

---

## 🎯 Checklist de Qualidade

Antes de finalizar qualquer documento, verificar:

- [ ] Segue a estrutura obrigatória (6 seções)
- [ ] Contém pelo menos UMA analogia do mundo real
- [ ] Inclui exemplo prático com código/configuração
- [ ] Tem seção de "Pontos de Atenção" ou "Pegadinhas"
- [ ] Linguagem técnica mas didática
- [ ] Links externos abrem em nova aba
- [ ] Comparações em formato de tabela quando aplicável
- [ ] Emojis usados de forma consistente e profissional

---

## 📚 Exemplos de Aplicação

### Bom Exemplo - Load Balancer

```markdown
## O que é

Load Balancer distribui requisições entre múltiplos servidores.

## Para que serve

- Distribuir carga de trabalho
- Aumentar disponibilidade
- Permitir escalabilidade horizontal

## Como funciona

Recebe requisições e usa algoritmos (round-robin, least connections) para distribuir.

## Analogia

**Como um porteiro de prédio comercial**: quando visitantes chegam, ele direciona
cada um para diferentes elevadores, evitando sobrecarga em um único elevador e
mantendo o fluxo organizado.

## Exemplo Prático

[código de configuração AWS ALB]

## Ponto de Atenção

💡 **Em prova**:

- ALB = Layer 7 (HTTP/HTTPS)
- NLB = Layer 4 (TCP) + IP fixo
- Se questão mencionar "WebSockets", considere NLB
```

---

## 🔄 Manutenção e Evolução

- Revisar analogias periodicamente
- Atualizar exemplos práticos com tecnologias atuais
- Adicionar novos pontos de atenção conforme descobertos
- Manter consistência entre todos os documentos
