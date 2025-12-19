---
id: distributed-systems-consensus
title: Consenso
sidebar_label: Consenso
---

## O que é Consenso em Sistemas Distribuídos?

**Consenso** é o processo de fazer múltiplos nós em um sistema distribuído concordarem sobre um único valor ou estado, mesmo na presença de falhas.

**Analogia**: Como um júri toma decisões - advogados apresentam vereditos (propostas), jurados votam, precisa maioria (quorum), todos aceitam veredito que maioria escolheu. Se jurados se separam em salas (partição), apenas grupo com maioria pode decidir.

## Por que Consenso é Importante?

### Problemas que Consenso Resolve

#### 1. Replicação de Estado

```
Node A: balance = $100
Node B: balance = $100  ← Todos concordam sobre saldo
Node C: balance = $100
```

#### 2. Ordem de Operações

```
Cliente 1: SET x = 1
Cliente 2: SET x = 2

Todos os nós devem concordar: qual operação vem primeiro?
```

#### 3. Membership Changes

```
Cluster: [A, B, C]

Adicionar D
→ Todos devem concordar que cluster agora é [A, B, C, D]
```

#### 4. Leader Election

```
Múltiplos nós candidatos a líder
→ Consenso sobre quem é o líder
```

## Propriedades do Consenso

### 1. Agreement (Acordo)

Todos os nós corretos decidem o **mesmo valor**.

```
Node A decide: X
Node B decide: X  ← Mesmo valor
Node C decide: X
```

### 2. Validity (Validade)

Se todos os nós propõem o mesmo valor V, então a decisão é V.

```
Todos propõem: X
Decisão: X ✅

Todos propõem: X
Decisão: Y ❌ (violação)
```

### 3. Termination (Término)

Todo nó correto eventualmente decide algum valor.

```
Algoritmo não pode ficar bloqueado forever
```

### 4. Integrity (Integridade)

Cada nó decide no máximo uma vez.

```
Node A: decide X
Node A: decide Y  ❌ (violação - decidiu 2 vezes)
```

## O Problema: FLP Impossibility

**Teorema FLP** (Fischer, Lynch, Paterson, 1985):

> Em um sistema distribuído assíncrono, é **impossível** garantir consenso se **pelo menos um processo pode falhar**, mesmo que apenas por crash.

### O que isso significa?

```
Não podemos ter simultaneamente:
1. Safety (acordo correto)
2. Liveness (término garantido)
3. Tolerância a falhas

Em rede assíncrona, temos que escolher!
```

**Solução prática**: Usar suposições adicionais (timeouts, maioria dos nós funcionando, etc).

## Algoritmos de Consenso

### 1. Two-Phase Commit (2PC)

**Uso**: Transações distribuídas (ACID).

**Fases**:

#### Fase 1: Prepare (Votação)

```
Coordinator               Participant A        Participant B
    │                          │                     │
    ├────── PREPARE ──────────→│                     │
    ├────── PREPARE ─────────────────────────────────→│
    │                          │                     │
    │←────── VOTE_YES ─────────┤                     │
    │←────── VOTE_YES ────────────────────────────────┤
```

#### Fase 2: Commit/Abort

```
Coordinator               Participant A        Participant B
    │                          │                     │
    ├────── COMMIT ───────────→│                     │
    ├────── COMMIT ──────────────────────────────────→│
    │                          │                     │
    │←────── ACK ──────────────┤                     │
    │←────── ACK ─────────────────────────────────────┤
```

**Implementação**:

```python
class TwoPhaseCommit:
    def __init__(self, coordinator_id, participants):
        self.coordinator_id = coordinator_id
        self.participants = participants

    def execute_transaction(self, transaction):
        # Fase 1: PREPARE
        print("Phase 1: Prepare")
        votes = []

        for participant in self.participants:
            vote = participant.prepare(transaction)
            votes.append(vote)

            if vote == 'ABORT':
                # Se qualquer participante vota ABORT, abortar tudo
                self.abort_transaction()
                return False

        # Todos votaram YES
        print("Phase 2: Commit")

        # Fase 2: COMMIT
        for participant in self.participants:
            participant.commit(transaction)

        return True

    def abort_transaction(self):
        print("Aborting transaction")
        for participant in self.participants:
            participant.abort()

# Participante
class Participant:
    def __init__(self, participant_id):
        self.participant_id = participant_id
        self.prepared_transaction = None

    def prepare(self, transaction):
        # Verificar se pode executar transação
        if self.can_execute(transaction):
            # Salvar em log (para recovery)
            self.prepared_transaction = transaction
            return 'YES'
        else:
            return 'ABORT'

    def commit(self, transaction):
        # Executar transação
        self.execute(transaction)
        self.prepared_transaction = None

    def abort(self):
        # Desfazer preparação
        self.prepared_transaction = None
```

**Problema: Single Point of Failure**

```
Coordinator envia PREPARE
Todos respondem YES
Coordinator FALHA antes de enviar COMMIT ← Participantes bloqueados!

Participantes ficam esperando forever (ou até timeout)
```

**Vantagens**:

- ✅ Garante atomicidade
- ✅ Simples de entender

**Desvantagens**:

- ❌ Blocking protocol (participantes podem ficar bloqueados)
- ❌ Coordinator é single point of failure
- ❌ Não tolera partições de rede

### 2. Three-Phase Commit (3PC)

**Melhoria do 2PC**: Adiciona fase intermediária para evitar blocking.

**Fases**:

1. **CanCommit**: Perguntar se podem commitar
2. **PreCommit**: Preparar para commit
3. **DoCommit**: Executar commit

**Vantagem**: Permite participantes fazerem progresso mesmo se coordinator falhar.

**Desvantagem**: Mais complexo, mais latência (3 fases em vez de 2).

### 3. Paxos

**Algoritmo de consenso tolerante a falhas.**

**Roles**:

- **Proposer**: Propõe valores
- **Acceptor**: Aceita propostas
- **Learner**: Aprende valor decidido

**Fases**:

#### Fase 1: Prepare

```
Proposer                  Acceptor 1    Acceptor 2    Acceptor 3
   │                          │             │             │
   ├─ PREPARE(n=1) ──────────→│             │             │
   ├─ PREPARE(n=1) ───────────────────────→│             │
   ├─ PREPARE(n=1) ────────────────────────────────────→│
   │                          │             │             │
   │← PROMISE(n=1) ───────────┤             │             │
   │← PROMISE(n=1) ────────────────────────┤             │
   │← PROMISE(n=1) ─────────────────────────────────────┤
```

#### Fase 2: Accept

```
Proposer                  Acceptor 1    Acceptor 2    Acceptor 3
   │                          │             │             │
   ├─ ACCEPT(n=1, v=X) ──────→│             │             │
   ├─ ACCEPT(n=1, v=X) ───────────────────→│             │
   ├─ ACCEPT(n=1, v=X) ────────────────────────────────→│
   │                          │             │             │
   │← ACCEPTED(n=1, v=X) ─────┤             │             │
   │← ACCEPTED(n=1, v=X) ──────────────────┤             │
   │← ACCEPTED(n=1, v=X) ───────────────────────────────┤
```

**Características**:

- ✅ Tolerante a falhas (funciona com maioria)
- ✅ Não tem blocking (eventual progress)
- ❌ Complexo de entender
- ❌ Difícil de implementar corretamente
- ❌ Pode ter livelock (proposers competindo)

**Usado em**:

- Google Chubby
- Apache Zookeeper (variante: Zab)

### 4. Raft

**Consenso mais fácil de entender** (projetado para ser mais simples que Paxos).

**Componentes**:

- **Leader**: Recebe requisições e replica para followers
- **Follower**: Replica estado do leader
- **Candidate**: Candidato a líder durante eleição

**Estados**:

```
       start/timeout
           ↓
      [Follower] ────timeout────→ [Candidate]
           ↑                            │
           │                            │
           │                     votes from majority
           │                            ↓
           └──────────────────────  [Leader]
                 discovers leader
                 or new term
```

#### Leader Election

**Processo**:

```
1. Follower não recebe heartbeat → Vira Candidate
2. Candidate incrementa term, vota em si mesmo
3. Candidate pede votos a outros nós
4. Se recebe maioria → Vira Leader
5. Leader envia heartbeats periódicos
```

**Código simplificado**:

```python
class RaftNode:
    def __init__(self, node_id, peers):
        self.node_id = node_id
        self.peers = peers
        self.state = 'FOLLOWER'
        self.current_term = 0
        self.voted_for = None
        self.log = []
        self.commit_index = 0

    def start_election(self):
        """Candidate inicia eleição"""
        self.state = 'CANDIDATE'
        self.current_term += 1
        self.voted_for = self.node_id

        votes = 1  # Voto em si mesmo

        # Pedir votos
        for peer in self.peers:
            if peer.request_vote(self.current_term, self.node_id):
                votes += 1

        # Maioria?
        if votes > len(self.peers) / 2:
            self.become_leader()

    def become_leader(self):
        """Tornar-se líder"""
        self.state = 'LEADER'
        print(f"Node {self.node_id} became leader for term {self.current_term}")

        # Enviar heartbeats
        self.send_heartbeats()

    def request_vote(self, term, candidate_id):
        """Receber pedido de voto"""
        if term > self.current_term:
            # Termo mais recente, resetar
            self.current_term = term
            self.voted_for = None
            self.state = 'FOLLOWER'

        if self.voted_for is None or self.voted_for == candidate_id:
            self.voted_for = candidate_id
            return True

        return False

    def append_entries(self, term, leader_id, entries):
        """Receber append entries (heartbeat ou log replication)"""
        if term < self.current_term:
            return False

        # Reconhecer líder
        self.current_term = term
        self.state = 'FOLLOWER'

        # Adicionar entradas ao log
        self.log.extend(entries)

        return True
```

#### Log Replication

**Processo**:

```
Cliente → Leader: SET x = 5

Leader:
1. Adiciona entry ao seu log [term=1, cmd="SET x=5"]
2. Envia AppendEntries para Followers

Followers:
1. Recebem entry
2. Adicionam ao log
3. Respondem OK

Leader:
1. Recebe maioria de OKs
2. Commita entry (aplica ao state machine)
3. Responde ao cliente
4. Notifica Followers para commitarem
```

**Código**:

```python
class RaftLeader(RaftNode):
    def replicate_log(self, command):
        """Replicar comando para followers"""
        # Adicionar ao log local
        entry = LogEntry(
            term=self.current_term,
            command=command
        )
        self.log.append(entry)

        # Replicar para followers
        acks = 1  # Leader já tem

        for follower in self.peers:
            success = follower.append_entries(
                term=self.current_term,
                leader_id=self.node_id,
                entries=[entry]
            )

            if success:
                acks += 1

        # Maioria confirmou?
        if acks > len(self.peers) / 2:
            # Commitar
            self.commit_index += 1
            self.apply_to_state_machine(entry)
            return True

        return False
```

**Características do Raft**:

- ✅ Mais fácil de entender que Paxos
- ✅ Separação clara entre leader election e log replication
- ✅ Strong leader (simplifica replicação)
- ✅ Bem documentado

**Usado em**:

- etcd
- Consul
- CockroachDB (variante)

### Comparação: Paxos vs Raft

| Aspecto        | Paxos            | Raft                             |
| -------------- | ---------------- | -------------------------------- |
| Complexidade   | Alta             | Média                            |
| Leader         | Não necessário   | Sempre há líder                  |
| Fases          | 2 fases          | 2 fases (election + replication) |
| Compreensão    | Difícil          | Mais fácil                       |
| Implementações | Muitas variantes | Mais consistente                 |

## Aplicações de Consenso

### 1. Distributed Databases

```
CockroachDB, TiDB
→ Usar Raft para replicação
→ Garantir consistência entre replicas
```

### 2. Configuration Management

```
etcd, Consul, ZooKeeper
→ Armazenar configurações
→ Garantir que todos veem mesma config
```

### 3. Distributed Locks

```
Usar consenso para decidir quem tem o lock
→ Apenas um nó pode ter lock por vez
```

### 4. Service Discovery

```
Registrar serviços no cluster
→ Todos concordam sobre quais serviços estão ativos
```

## Quorum

**Quorum**: Número mínimo de nós necessários para operação.

**Fórmula**:

```
Quorum = floor(N / 2) + 1

N = 3 → Quorum = 2
N = 5 → Quorum = 3
N = 7 → Quorum = 4
```

**Por que maioria?**

```
Cluster com 5 nós: [A, B, C, D, E]
Quorum = 3

Partição:
Partition 1: [A, B, C] → 3 nós ✅ Tem quorum
Partition 2: [D, E]    → 2 nós ❌ Não tem quorum

Apenas Partition 1 pode fazer progresso
→ Impossível ter 2 partições com quorum simultaneamente
→ Evita split brain!
```

## Write e Read Quorums

**Configurável em alguns sistemas** (Cassandra, DynamoDB):

```
N = número total de replicas
W = write quorum (quantos devem confirmar escrita)
R = read quorum (quantos devem responder leitura)

Se W + R > N → Leitura sempre vê escrita mais recente
```

**Exemplos**:

```
N = 3, W = 2, R = 2
→ W + R = 4 > 3 ✅ Strong consistency

N = 3, W = 1, R = 1
→ W + R = 2 < 3 ❌ Eventual consistency

N = 3, W = 3, R = 1
→ Alta consistência de escrita, leitura rápida

N = 3, W = 1, R = 3
→ Escrita rápida, alta consistência de leitura
```

## Desafios do Consenso

### 1. Performance

**Consenso adiciona latência**:

```
Sem consenso: 1 RTT (cliente → servidor)
Com consenso: 2-3 RTTs (prepare + accept + commit)
```

**Mitigação**:

- Pipelining de requests
- Batching múltiplas operações
- Read from followers (relaxar consistência)

### 2. Número de Nós

**Mais nós = mais latência**:

```
3 nós: Precisa 2 ACKs (rápido)
7 nós: Precisa 4 ACKs (mais lento)
```

**Trade-off**:

```
Mais nós → Mais tolerância a falhas
Mais nós → Mais latência

Sweet spot: 3, 5, ou 7 nós
```

### 3. Network Partitions

**Durante partição**:

```
Apenas partição com maioria faz progresso
Partição minoritária fica bloqueada

Se nenhuma partição tem maioria → Sistema para (safety over liveness)
```

## Implementações Práticas

### etcd (usando Raft)

```go
package main

import (
    "context"
    "go.etcd.io/etcd/client/v3"
)

func main() {
    // Conectar ao cluster etcd
    cli, _ := clientv3.New(clientv3.Config{
        Endpoints: []string{"localhost:2379"},
    })
    defer cli.Close()

    // Write (replicado via Raft)
    cli.Put(context.Background(), "key", "value")

    // Read
    resp, _ := cli.Get(context.Background(), "key")

    // Consenso garante que todos veem mesmo valor
}
```

### Consul (usando Raft)

```python
import consul

c = consul.Consul()

# Write (replicado via Raft)
c.kv.put('config/db/host', 'localhost')

# Read
index, data = c.kv.get('config/db/host')

# Consenso garante consistência
```

## Best Practices

### ✅ Do:

1. **Use implementações existentes** (etcd, Consul, ZooKeeper)
2. **Use número ímpar de nós** (3, 5, 7)
3. **Considere latência** entre nós (coloque no mesmo datacenter)
4. **Monitore health** do cluster
5. **Teste partições de rede**

### ❌ Don't:

1. **Não implemente consenso do zero** (muito difícil acertar)
2. **Não use número par de nós** (não ajuda tolerância a falhas)
3. **Não espalhe nós geograficamente demais** (latência alta)
4. **Não ignore degradação de performance**

## Exemplo Prático: Distributed Counter

```python
import etcd3

class DistributedCounter:
    def __init__(self, key='counter'):
        self.etcd = etcd3.client()
        self.key = key

    def increment(self):
        """Incrementar contador (linearizable)"""
        while True:
            # Read current value
            value, metadata = self.etcd.get(self.key)
            current = int(value) if value else 0

            # Tentar update com compare-and-swap
            success = self.etcd.transaction(
                compare=[
                    self.etcd.transactions.value(self.key) == value
                ],
                success=[
                    self.etcd.transactions.put(self.key, str(current + 1))
                ],
                failure=[]
            )

            if success:
                return current + 1

            # CAS falhou, retry

    def get(self):
        """Ler contador"""
        value, _ = self.etcd.get(self.key)
        return int(value) if value else 0

# Uso: Múltiplos processos podem incrementar concorrentemente
# etcd (usando Raft) garante que increments não são perdidos

counter = DistributedCounter()
new_value = counter.increment()  # Linearizable!
```

## Conclusão

**Consenso** é fundamental para sistemas distribuídos que exigem forte consistência:

- **Use quando**: Necessário concordância sobre estado (databases, config)
- **Evite quando**: Performance é mais importante que consistência

**Key Takeaway**: Não implemente consenso do zero. Use sistemas maduros (etcd, Consul, ZooKeeper) que já resolveram esses problemas complexos.

## 📚 Referências e Recursos

### Papers Fundamentais

- **<a href="https://lamport.azurewebsites.net/pubs/paxos-simple.pdf" target="_blank" rel="noopener noreferrer">Paxos Made Simple</a>** - Leslie Lamport (2001)
- **<a href="https://raft.github.io/raft.pdf" target="_blank" rel="noopener noreferrer">In Search of an Understandable Consensus Algorithm (Raft)</a>** - Ongaro & Ousterhout (2014)
- **<a href="https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf" target="_blank" rel="noopener noreferrer">Impossibility of Distributed Consensus with One Faulty Process (FLP)</a>** - Fischer, Lynch, Paterson (1985)
- **<a href="https://pmg.csail.mit.edu/papers/vr.pdf" target="_blank" rel="noopener noreferrer">Viewstamped Replication</a>** - Oki & Liskov (1988)

### Implementações

- **<a href="https://etcd.io/docs/" target="_blank" rel="noopener noreferrer">etcd Documentation</a>** - Raft-based distributed key-value store
- **<a href="https://www.consul.io/docs" target="_blank" rel="noopener noreferrer">Consul by HashiCorp</a>** - Service mesh com consenso
- **<a href="https://zookeeper.apache.org/doc/current/" target="_blank" rel="noopener noreferrer">Apache ZooKeeper</a>** - Coordination service (Zab protocol)
- **<a href="https://www.cockroachlabs.com/docs/" target="_blank" rel="noopener noreferrer">CockroachDB</a>** - Distributed SQL com Raft

### Visualizações e Tutoriais

- **<a href="https://raft.github.io/" target="_blank" rel="noopener noreferrer">Raft Visualization</a>** - Visualização interativa do Raft
- **<a href="http://thesecretlivesofdata.com/raft/" target="_blank" rel="noopener noreferrer">The Secret Lives of Data</a>** - Animação do Raft
- **<a href="https://research.google/pubs/pub33002/" target="_blank" rel="noopener noreferrer">Paxos Made Live</a>** - Google Chubby experience

### Artigos Técnicos

- **<a href="https://www.the-paper-trail.org/post/2008-11-27-consensus-protocols-two-phase-commit/" target="_blank" rel="noopener noreferrer">Consensus Protocols: Two-Phase Commit</a>** - The Paper Trail
- **<a href="https://www.the-paper-trail.org/post/2008-11-29-consensus-protocols-three-phase-commit/" target="_blank" rel="noopener noreferrer">Consensus Protocols: Three-phase Commit</a>** - The Paper Trail
- **<a href="https://www.the-paper-trail.org/post/2009-02-03-consensus-protocols-paxos/" target="_blank" rel="noopener noreferrer">Consensus Protocols: Paxos</a>** - The Paper Trail
- **<a href="https://understandingpaxos.wordpress.com/" target="_blank" rel="noopener noreferrer">Understanding Paxos</a>** - Tutorial completo

### Cursos e Palestras

- **<a href="https://pdos.csail.mit.edu/6.824/" target="_blank" rel="noopener noreferrer">MIT 6.824 Distributed Systems</a>** - Labs implementando Raft
- **<a href="https://www.youtube.com/watch?v=YbZ3zDzDnrw" target="_blank" rel="noopener noreferrer">Raft Lecture by Diego Ongaro</a>** - Criador do Raft

---

## Pontos de Atenção

### 💡 Dicas para Entrevistas

**Pergunta clássica**: "Diferença entre Paxos e Raft?"

✅ **Resposta certa**:

- "Raft foi criado para ser mais fácil de entender que Paxos"
- "Raft tem líder forte, Paxos não necessariamente"
- "Ambos garantem consenso com maioria de nós"
- "Raft divide em: leader election + log replication"

**Pergunta**: "O que é quorum?"

✅ **Resposta**:

- "Maioria dos nós: floor(N/2) + 1"
- "Com 5 nós, quorum é 3"
- "Garante que não há dois grupos com maioria simultânea"

### ⚠️ Pegadinhas Comuns

**1. Two-Phase Commit ≠ Consenso**

- 2PC: Coordenador único (single point of failure)
- Consenso: Sem ponto único de falha, usa quorum

**2. Número par de nós não ajuda**

```
4 nós: Quorum = 3 (tolera 1 falha)
5 nós: Quorum = 3 (tolera 2 falhas) ✅ Melhor!

6 nós: Quorum = 4 (tolera 2 falhas)
7 nós: Quorum = 4 (tolera 3 falhas) ✅ Melhor!
```

Use sempre número ímpar!

**3. Consenso adiciona latência**

Sem consenso: 1 RTT  
Com consenso: 2-3 RTTs (prepare + accept)

**4. FLP Impossibility**

"É impossível garantir consenso em sistema distribuído assíncrono com 1 nó falhado"

Na prática: Sistemas relaxam "assíncrono" usando timeouts.

### 🎯 Para Certificações

**etcd/Consul (Raft):**

- Usado em Kubernetes, service discovery
- Leader election + log replication
- Strong consistency

**ZooKeeper (Zab):**

- Similar ao Raft
- Coordination service
- Configuration management

**Quando NÃO usar consenso:**

- Latência é crítica (adiciona 2-3x latência)
- Eventual consistency é aceitável
- Pode usar banco de dados centralizado simples

🎉 **Parabéns!** Você completou a seção de **Sistemas Distribuídos**!

Continue explorando outros tópicos de fundamentos e arquitetura.
