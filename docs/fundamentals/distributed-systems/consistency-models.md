---
id: distributed-systems-consistency-models
title: Modelos de Consistência
sidebar_label: Modelos de Consistência
---

## O que são Modelos de Consistência?

**Modelos de consistência** definem as regras sobre quando e como as atualizações feitas em um sistema distribuído se tornam visíveis para todos os participantes. Eles representam o **contrato** entre o sistema e o desenvolvedor sobre o comportamento esperado das leituras e escritas.

**Analogia**: Como rede de bibliotecas sincroniza catálogos - Linearizability é todas verem EXATAMENTE o mesmo catálogo em tempo real (1 catálogo centralizado), Eventual Consistency é sincronizar eventualmente (à noite, pode ver diferenças temporariamente).

## Espectro de Consistência

```
Forte ←----------------------------------------→ Fraca
(Slow)                                        (Fast)

Linearizability
    ↓
Sequential Consistency
    ↓
Causal Consistency
    ↓
Eventual Consistency
    ↓
Weak Consistency
```

## Consistência Forte

### 1. Linearizability (Linearizável)

**O modelo mais forte de consistência.**

**Definição**:

- Todas as operações parecem ocorrer instantaneamente em algum ponto entre seu início e término
- Operações têm uma ordem global
- É como se houvesse apenas uma cópia dos dados

**Características**:

- Leituras sempre retornam o valor da escrita mais recente
- Preserva ordem temporal real
- Mais custoso em termos de performance

**Exemplo**:

```
Cliente A: WRITE(x, 1)  ---|✓|---
Cliente B:                    |--- READ(x) = 1 ✅
```

**Quando usar**:

- Sistemas financeiros
- Sistemas de coordenação (Zookeeper, etcd)
- Quando correção é mais importante que performance

**Sistemas**:

- Spanner (Google)
- CockroachDB
- etcd, Consul

### 2. Sequential Consistency (Consistência Sequencial)

**Relaxa o requisito de tempo real.**

**Definição**:

- Todas as operações de todos os processos são executadas em alguma ordem sequencial
- Ordem das operações de **cada processo individual** é preservada
- Não requer que a ordem reflita o tempo real

**Diferença de Linearizability**:

- Linearizability: ordem global + tempo real
- Sequential: ordem global, mas não necessariamente tempo real

**Exemplo**:

```
Cliente A: WRITE(x, 1) WRITE(x, 2)
Cliente B:                           READ(x) = 2  READ(x) = 1 ❌
(Violação: x não pode voltar de 2 para 1)

Cliente A: WRITE(x, 1) WRITE(x, 2)
Cliente B:                           READ(x) = 1  READ(x) = 2 ✅
(OK: ordem preservada)
```

## Consistência Intermediária

### 3. Causal Consistency (Consistência Causal)

**Preserva relações de causa e efeito.**

**Definição**:

- Se um evento A causalmente precede B, todos os processos veem A antes de B
- Eventos concorrentes (sem relação causal) podem ser vistos em ordens diferentes

**Relações Causais**:

```
A → B  (A causou B)
- A é uma escrita, B é uma leitura desse valor
- A é uma escrita, B é uma escrita subsequente pelo mesmo cliente
- A → B e B → C implica A → C (transitividade)
```

**Exemplo**:

```
Alice: POST("Estou grávida!")  →  Bob: COMMENT("Parabéns!")
                                         ↓
                                   Charlie vê: POST e depois COMMENT ✅

Charlie não pode ver COMMENT antes do POST (violaria causalidade)
```

**Vantagens**:

- Mais flexível que Sequential
- Operações concorrentes podem ser reordenadas
- Melhor performance

**Sistemas**:

- COPS (Clusters of Order-Preserving Servers)
- MongoDB com causal consistency
- Alguns sistemas de cache distribuído

### 4. Read-Your-Writes Consistency

**Garante que você vê suas próprias escritas.**

**Definição**:

- Se um processo escreve um valor, leituras subsequentes desse processo sempre verão esse valor ou mais recente
- Não garante nada sobre leituras de outros processos

**Exemplo**:

```
Cliente A: WRITE(profile, "Nova foto")
Cliente A: READ(profile) = "Nova foto" ✅

Cliente B: READ(profile) = "Foto antiga" ✅ (OK, pode estar desatualizado)
```

**Uso comum**:

- Aplicações web (usuário vê suas próprias alterações imediatamente)
- Sistemas de perfil de usuário

### 5. Monotonic Reads

**Uma vez que você leu um valor, não verá valores mais antigos.**

**Definição**:

- Se um processo lê um valor v1, leituras subsequentes nunca retornarão valores anteriores a v1

**Exemplo**:

```
READ(x) = 5
READ(x) = 7  ✅
READ(x) = 3  ❌ (violação: não pode voltar no tempo)
```

### 6. Monotonic Writes

**Escritas de um processo são aplicadas na ordem.**

**Definição**:

- Se um processo escreve w1 e depois w2, todos os processos veem w1 antes de w2

**Exemplo**:

```
WRITE(x, 1)
WRITE(x, 2)

Outro nó não pode ver x=2 antes de ver x=1
```

## Consistência Fraca

### 7. Eventual Consistency (Consistência Eventual)

**O modelo mais usado em sistemas distribuídos de larga escala.**

**Definição**:

- Se não houver novas escritas, eventualmente todas as leituras retornarão o último valor escrito
- Não há garantia de **quando** isso acontecerá

**Características**:

- Alta disponibilidade
- Baixa latência
- Pode haver conflitos de escrita

**Exemplo**:

```
Tempo 0: WRITE(x, 1) no Nó A
Tempo 1: READ(x) no Nó B = valor antigo (ainda não replicou)
Tempo 5: READ(x) no Nó B = 1 (replicação completa)
```

**Desafios**:

```
Nó A: WRITE(x, 1) → WRITE(x, 2)
Nó B: WRITE(x, 3)

Qual o valor final de x?
Precisa de estratégia de resolução de conflitos!
```

**Estratégias de Resolução**:

1. **Last-Write-Wins (LWW)**: Timestamp mais recente vence
2. **Vector Clocks**: Detecta conflitos causais
3. **CRDTs**: Estruturas de dados que convergem automaticamente
4. **Aplicação decide**: Sistema retorna ambos valores

**Sistemas**:

- Cassandra
- DynamoDB
- Riak
- DNS

### 8. Weak Consistency

**Modelo mais fraco.**

**Definição**:

- Após uma escrita, leituras podem ou não ver o novo valor
- Sem garantias de quando as atualizações serão propagadas

**Uso**:

- Sistemas de cache
- Aplicações de streaming
- Contadores aproximados

## Comparação dos Modelos

| Modelo           | Garantias             | Performance | Complexidade      |
| ---------------- | --------------------- | ----------- | ----------------- |
| Linearizability  | Mais forte            | Mais lenta  | Simples para usar |
| Sequential       | Ordem global          | Lenta       | Simples           |
| Causal           | Causa → efeito        | Média       | Moderada          |
| Read-Your-Writes | Vê próprias escritas  | Rápida      | Baixa             |
| Eventual         | Convergência eventual | Mais rápida | Alta (conflitos)  |

## Escolhendo um Modelo

### Use Consistência Forte quando:

- ✅ Correção absoluta é crítica (finanças, inventário)
- ✅ Pode tolerar maior latência
- ✅ Volume de dados é gerenciável

### Use Consistência Eventual quando:

- ✅ Disponibilidade é crítica
- ✅ Pode tolerar dados temporariamente desatualizados
- ✅ Grande escala e distribuição geográfica
- ✅ Leituras >> Escritas

### Use Consistência Causal quando:

- ✅ Precisa preservar ordem de eventos relacionados
- ✅ Pode sacrificar consistência forte para performance
- ✅ Aplicações sociais, colaborativas

## Configuração por Operação

Muitos sistemas modernos permitem escolher o nível de consistência por operação:

### DynamoDB

```python
# Leitura eventual (padrão)
response = table.get_item(Key={'id': '123'})

# Leitura fortemente consistente
response = table.get_item(
    Key={'id': '123'},
    ConsistentRead=True
)
```

### Cassandra

```cql
-- Escrita com quorum
INSERT INTO users (id, name) VALUES (1, 'Alice')
USING CONSISTENCY QUORUM;

-- Leitura com consistência eventual
SELECT * FROM users WHERE id = 1
USING CONSISTENCY ONE;
```

## Conclusão

Não existe "melhor" modelo de consistência - existe o modelo **mais apropriado** para seu caso de uso. Entender os trade-offs permite fazer escolhas conscientes entre:

- **Consistência** vs **Disponibilidade**
- **Latência** vs **Correção**
- **Simplicidade** vs **Escalabilidade**

## 📚 Referências e Recursos

### Papers Acadêmicos

- **<a href="https://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf" target="_blank" rel="noopener noreferrer">Linearizability: A Correctness Condition</a>** - Herlihy & Wing (1990)
- **<a href="https://www.cs.utexas.edu/~lorenzo/corsi/cs380d/papers/SessionGuaranteesPDIS.pdf" target="_blank" rel="noopener noreferrer">Session Guarantees for Weakly Consistent Replicated Data</a>** - Terry et al. (1994)
- **<a href="https://www.allthingsdistributed.com/2008/12/eventually_consistent.html" target="_blank" rel="noopener noreferrer">Eventually Consistent</a>** - Werner Vogels (Amazon)

### Implementações Práticas

- **<a href="https://jepsen.io/consistency" target="_blank" rel="noopener noreferrer">Jepsen: Consistency Models</a>** - Visualização interativa de modelos
- **<a href="https://research.google/pubs/pub39966/" target="_blank" rel="noopener noreferrer">Spanner: Google's Globally-Distributed Database</a>** - Linearizability em escala
- **<a href="https://hal.inria.fr/inria-00609399v1/document" target="_blank" rel="noopener noreferrer">CRDTs: Consistency without concurrency control</a>** - Shapiro et al.

### Guias e Tutoriais

- **<a href="https://aphyr.com/posts/313-strong-consistency-models" target="_blank" rel="noopener noreferrer">Strong consistency models</a>** - Kyle Kingsbury (Jepsen)
- **<a href="https://www.microsoft.com/en-us/research/publication/replicated-data-consistency-explained-through-baseball/" target="_blank" rel="noopener noreferrer">Consistency Models in Distributed Systems</a>** - Doug Terry (Microsoft)

---

- Se bibliotecário A avisa bibliotecário B que livro foi emprestado, B vê isso
- Mas bibliotecário C (que não foi avisado) pode ainda ver como disponível
- Preserva ordem de eventos relacionados

## Pontos de Atenção

### 💡 Dicas para Entrevistas

**Pergunta clássica**: "Diferença entre consistência forte e eventual?"

✅ **Resposta certa**:

- **Forte (Linearizability)**: Todas as leituras veem última escrita, sempre
- **Eventual**: Leituras podem ver dados antigos, mas eventualmente convergem
- **Tradeoff**: Forte = latência alta, Eventual = disponível sempre

**Pergunta**: "DynamoDB usa qual consistência?"

✅ **Resposta**:

- **Padrão**: Eventual consistency
- **Opcional**: Strong consistency (via `ConsistentRead=True`)
- **Tradeoff**: Eventual é 2x mais rápido e metade do custo

### ⚠️ Pegadinhas Comuns

**1. Linearizability ≠ Serializable**

- **Linearizability**: Ordem global em OPERAÇÕES INDIVIDUAIS
- **Serializability**: Ordem global em TRANSAÇÕES (múltiplas operações)

Banco pode ter serializability sem linearizability!

**2. Read-Your-Writes ≠ Strong Consistency**

```
Usuário A escreve X=1
Usuário A lê X → vê 1 ✅ (read-your-writes)

Usuário B lê X → pode ver 0 ainda ❌

Não é strong consistency!
```

**3. Eventual Consistency tem limites**

"Eventual" pode ser:

- Milissegundos (Redis)
- Segundos (DynamoDB)
- Minutos (DNS)

Pergunte: "Eventual em quanto tempo?"

**4. Cassandra Tunable Consistency**

```
W + R > N → Strong consistency

N=3, W=2, R=2 → 2+2=4 > 3 ✅ Strong
N=3, W=1, R=1 → 1+1=2 < 3 ❌ Eventual
```

### 🎯 Por Sistema

**Strong Consistency:**

- Spanner (Google)
- CockroachDB
- etcd, ZooKeeper
- PostgreSQL, MySQL

**Eventual Consistency:**

- DynamoDB (padrão)
- Cassandra (padrão)
- Riak
- DNS

**Configurável:**

- DynamoDB: eventual vs strong
- Cassandra: quorum tunável
- Cosmos DB: 5 níveis de consistência

### 📊 Escolhendo Modelo

**Use Strong quando:**

- ✅ Finanças (transferências)
- ✅ Estoque de produtos
- ✅ Reservas (assentos, quartos)
- ✅ Dados críticos

**Use Eventual quando:**

- ✅ Feeds de redes sociais
- ✅ Likes/visualizações
- ✅ Recomendações
- ✅ Analytics
- ✅ Cache

### 🛠️ CRDTs (Conflict-free Replicated Data Types)

**Estruturas que convergem automaticamente**:

```python
# Counter CRDT
Node A: increment() → {A: 1}
Node B: increment() → {B: 1}

Merge: {A: 1, B: 1} → Total = 2 ✅ Sem conflito!
```

Usado em:

- Redis (tipos CRDT)
- Riak
- Conflict resolution automático

**Próximo**: [Latência e Falhas](latency-and-failures.md)
