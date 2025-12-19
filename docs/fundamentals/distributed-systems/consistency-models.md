---
id: distributed-systems-consistency-models
title: Modelos de Consistência
sidebar_label: Modelos de Consistência
---

## O que são Modelos de Consistência?

**Modelos de consistência** definem as regras sobre quando e como as atualizações feitas em um sistema distribuído se tornam visíveis para todos os participantes. Eles representam o **contrato** entre o sistema e o desenvolvedor sobre o comportamento esperado das leituras e escritas.

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

---

**Próximo**: [Latência e Falhas](latency-and-failures.md)
