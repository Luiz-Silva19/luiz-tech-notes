---
id: distributed-systems-cap
title: Teorema CAP
sidebar_label: Teorema CAP
---

## O que é o Teorema CAP?

O **Teorema CAP** (também conhecido como Teorema de Brewer) afirma que é **impossível** para um sistema distribuído garantir simultaneamente as três propriedades:

- **C**onsistency (Consistência)
- **A**vailability (Disponibilidade)
- **P**artition Tolerance (Tolerância a Partições)

Em caso de **partição de rede**, você deve escolher entre **Consistência** ou **Disponibilidade**.

## As Três Propriedades

### 🔄 Consistency (Consistência)

**Definição**: Todos os nós veem os mesmos dados ao mesmo tempo.

- Após uma escrita bem-sucedida, todas as leituras subsequentes retornam o valor atualizado
- Não há dados "desatualizados" no sistema
- Equivalente a ter uma única cópia atualizada dos dados

**Exemplo**:

```
Cliente 1 escreve: X = 10
Cliente 2 lê X = 10  ✅ (não lê valor antigo)
Cliente 3 lê X = 10  ✅ (não lê valor antigo)
```

### ✅ Availability (Disponibilidade)

**Definição**: Todo request recebe uma resposta (sucesso ou falha), sem garantia de que contém a versão mais recente dos dados.

- O sistema sempre responde às requisições
- Não há timeouts ou erros por indisponibilidade
- Mesmo que alguns nós estejam offline

**Exemplo**:

```
3 nós no cluster
1 nó cai
Sistema continua respondendo com os 2 nós restantes ✅
```

### 🔌 Partition Tolerance (Tolerância a Partições)

**Definição**: O sistema continua operando mesmo quando há falha de comunicação entre nós.

- Partição de rede: alguns nós não conseguem se comunicar com outros
- O sistema deve continuar funcionando mesmo com a partição
- Em sistemas distribuídos reais, partições **vão acontecer**

**Exemplo**:

```
Datacenter A  <--X-->  Datacenter B
(rede particionada)

Sistema continua operando em ambos os datacenters
```

## Por que só é possível escolher 2?

### Cenário: Partição de Rede

Imagine um sistema com 2 nós: **A** e **B**

```
Cliente 1 ---> [Nó A]  <--X-->  [Nó B] <--- Cliente 2
                (não conseguem se comunicar)
```

**Cliente 1** escreve `X = 10` no Nó A

Agora temos duas opções:

#### Opção 1: CP (Consistency + Partition Tolerance)

- Nó B **não responde** ao Cliente 2 (sacrifica Disponibilidade)
- Espera reconectar com Nó A para garantir dados consistentes
- **Resultado**: Sistema **indisponível** mas **consistente**

#### Opção 2: AP (Availability + Partition Tolerance)

- Nó B **responde** ao Cliente 2 com valor antigo de X
- **Resultado**: Sistema **disponível** mas **inconsistente**

#### Opção 3: CA (Consistency + Availability)

- **Impossível** na presença de partição de rede
- Só funciona em sistemas não-distribuídos (single node)

## Combinações CAP

### CP - Consistency + Partition Tolerance

**Sacrifica**: Disponibilidade

**Comportamento**:

- Sistema pode rejeitar requests durante partição
- Garante que dados são sempre consistentes
- Pode retornar erros ou timeouts

**Exemplos**:

- **MongoDB**: Em modo de replica set padrão
- **HBase**: Prioriza consistência
- **Redis** (com replicação síncrona)
- **Zookeeper**: Consensus-based

**Quando usar**:

- Operações financeiras (não pode haver inconsistência)
- Sistemas que exigem dados corretos acima de tudo
- Quando é aceitável que o sistema fique indisponível temporariamente

### AP - Availability + Partition Tolerance

**Sacrifica**: Consistência (forte)

**Comportamento**:

- Sistema sempre responde, mesmo durante partição
- Pode retornar dados desatualizados
- Usa eventual consistency

**Exemplos**:

- **Cassandra**: Disponibilidade prioritária
- **DynamoDB**: Eventual consistency por padrão
- **CouchDB**: Multi-master replication
- **Riak**: Disponibilidade alta

**Quando usar**:

- Redes sociais (ok mostrar dados ligeiramente desatualizados)
- Sistemas de cache
- DNS
- Quando disponibilidade é crítica

### CA - Consistency + Availability

**Sacrifica**: Partition Tolerance

**Comportamento**:

- Funciona apenas sem partições de rede
- Na prática, só funciona em sistemas não-distribuídos

**Exemplos**:

- **Bancos de dados tradicionais** (PostgreSQL, MySQL) em single node
- Sistemas monolíticos

**Realidade**:

- Em sistemas distribuídos reais, partições **vão acontecer**
- Logo, **CA não é uma opção viável** para sistemas distribuídos verdadeiros

## PACELC - Extensão do CAP

O teorema **PACELC** estende o CAP considerando latência:

**P**artition: Em caso de partição, escolha entre **A** (Availability) ou **C** (Consistency)

**E**lse: Caso contrário (sem partição), escolha entre **L** (Latency) ou **C** (Consistency)

### Exemplos PACELC:

**PA/EL** (Cassandra):

- Durante partição: Availability
- Sem partição: Lower Latency
- Trade-off: Eventual consistency

**PC/EC** (HBase, BigTable):

- Durante partição: Consistency
- Sem partição: Consistency (maior latência)
- Trade-off: Maior latência para garantir consistência

## Configurabilidade

Muitos sistemas modernos permitem **configurar** o trade-off:

### Cassandra

```cql
-- Write com consistência forte
INSERT INTO users VALUES (...)
USING CONSISTENCY QUORUM;

-- Read com eventual consistency
SELECT * FROM users
USING CONSISTENCY ONE;
```

### DynamoDB

- **Strong Consistent Reads**: Garante leitura mais recente
- **Eventually Consistent Reads**: Menor latência, pode ler valor antigo

## Conceitos Importantes

### 🔄 Eventual Consistency

- Após cessarem as escritas, eventualmente todos os nós convergem
- Não há garantia de **quando** isso acontecerá
- Usado em sistemas AP

### 🔒 Strong Consistency

- Toda leitura retorna a escrita mais recente
- Requer coordenação entre nós
- Usado em sistemas CP

### ⚖️ Quorum

- Maioria dos nós deve confirmar operação
- Balanceia consistência e disponibilidade
- `W + R > N` garante consistência
  - W: write replicas
  - R: read replicas
  - N: total replicas

## Conclusão

O Teorema CAP não é sobre escolher 2 de 3 propriedades para sempre, mas sim entender os **trade-offs** que você faz **durante uma partição de rede**.

Na prática:

- ✅ **Sempre** tenha Partition Tolerance (P) em sistemas distribuídos
- ⚖️ **Escolha** entre Consistency (C) e Availability (A) durante partições
- 🔧 Muitos sistemas modernos permitem **configurar** esse trade-off por operação

## 📚 Referências e Recursos

### Paper Original

- **<a href="https://users.ece.cmu.edu/~adrian/731-sp04/readings/GL-cap.pdf" target="_blank" rel="noopener noreferrer">Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services</a>** - Gilbert & Lynch (2002)
- **<a href="https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/" target="_blank" rel="noopener noreferrer">CAP Twelve Years Later: How the "Rules" Have Changed</a>** - Eric Brewer (2012)

### Artigos Explicativos

- **<a href="https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html" target="_blank" rel="noopener noreferrer">Please stop calling databases CP or AP</a>** - Martin Kleppmann
- **<a href="https://codahale.com/you-cant-sacrifice-partition-tolerance/" target="_blank" rel="noopener noreferrer">You Can't Sacrifice Partition Tolerance</a>** - Coda Hale
- **<a href="http://robertgreiner.com/cap-theorem-revisited/" target="_blank" rel="noopener noreferrer">CAP Theorem Revisited</a>** - Robert Greiner

### Documentação de Sistemas

- **<a href="https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html" target="_blank" rel="noopener noreferrer">Cassandra Architecture</a>** - AP system
- **<a href="https://www.mongodb.com/docs/manual/core/read-preference/" target="_blank" rel="noopener noreferrer">MongoDB Consistency</a>** - CP system
- **<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html" target="_blank" rel="noopener noreferrer">DynamoDB Consistency</a>** - Configurable

---

**Próximo**: [Modelos de Consistência](consistency-models.md)
