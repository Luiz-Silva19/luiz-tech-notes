---
id: distributed-systems-leader-election
title: Eleição de Líder
sidebar_label: Eleição de Líder
---

## O que é Leader Election?

**Leader Election** é o processo de escolher um nó em um sistema distribuído para coordenar atividades ou tomar decisões centralizadas, garantindo que apenas **um líder** exista por vez.

## Por que precisamos de um Líder?

### Casos de Uso

#### 1. Coordenação Centralizada

```
Múltiplos workers processando fila
→ Precisam de coordenador para distribuir trabalho
→ Eleger um worker como líder/coordenador
```

#### 2. Single Writer

```
Evitar writes conflitantes
→ Apenas líder pode escrever
→ Outros nós apenas leem
```

#### 3. Scheduled Jobs

```
Tarefa agendada (cron job) em cluster
→ Apenas um nó deve executar
→ Líder executa, outros ficam em standby
```

#### 4. Gerenciamento de Sharding

```
Decidir quais shards cada nó processa
→ Líder distribui shards entre workers
```

### Sem Leader Election

```
❌ Problema: Race condition

Node A: "Vou processar job 123"
Node B: "Vou processar job 123"  ← Processamento duplicado!

ou

Node A: "Alguém vai processar job 123?"
Node B: "Alguém vai processar job 123?"  ← Ninguém processa!
```

### Com Leader Election

```
✅ Solução

Node A (LEADER): "Vou processar job 123"
Node B (FOLLOWER): "Node A é líder, vou esperar"
Node C (FOLLOWER): "Node A é líder, vou esperar"
```

## Propriedades Desejadas

### 1. Safety (Segurança)

**Apenas um líder por vez** (no máximo um).

```
❌ Split brain: 2 líderes ao mesmo tempo
✅ Apenas 1 líder ou nenhum líder
```

### 2. Liveness (Vivacidade)

**Eventualmente um líder será eleito** (pelo menos um).

```
Se líder cai → Novo líder é eleito rapidamente
```

### 3. Fairness (Opcional)

Todos os nós têm chance igual de se tornar líder.

## Algoritmos de Leader Election

### 1. Bully Algorithm

**Conceito**: Nó com maior ID "intimida" outros e se torna líder.

**Processo**:

```
Nós: [A:1, B:2, C:3, D:4]
Líder atual: D (maior ID)

D cai ↓

C detecta que D caiu
C envia ELECTION para nós com ID maior que 3 → ninguém
C se declara líder e envia COORDINATOR para todos
```

**Implementação simplificada**:

```python
class BullyElection:
    def __init__(self, node_id, all_nodes):
        self.node_id = node_id
        self.all_nodes = all_nodes
        self.leader = None

    def start_election(self):
        # Enviar ELECTION para todos nós com ID maior
        higher_nodes = [n for n in self.all_nodes if n > self.node_id]

        if not higher_nodes:
            # Nenhum nó com ID maior, eu sou o líder!
            self.become_leader()
            return

        # Enviar mensagem ELECTION para nós maiores
        responses = self.send_election(higher_nodes)

        if not responses:
            # Ninguém respondeu, eu sou o líder
            self.become_leader()
        else:
            # Alguém respondeu, eles vão conduzir eleição
            self.wait_for_coordinator()

    def become_leader(self):
        self.leader = self.node_id
        # Anunciar para todos que sou o líder
        self.broadcast_coordinator()

    def receive_election(self, from_node):
        if from_node < self.node_id:
            # Responder e iniciar minha própria eleição
            self.send_ok(from_node)
            self.start_election()

    def receive_coordinator(self, new_leader):
        # Aceitar novo líder
        self.leader = new_leader
```

**Características**:

- ✅ Simples de entender
- ✅ Eventualmente converge
- ❌ Pode gerar muito tráfego de rede
- ❌ Nó com maior ID sempre vira líder (não é fair)

### 2. Ring Algorithm

**Conceito**: Nós organizados em anel lógico, mensagem ELECTION circula.

**Processo**:

```
Anel: A → B → C → D → A

Node B detecta que precisa de eleição:
1. B envia ELECTION[B] para C
2. C adiciona seu ID: ELECTION[B, C] → D
3. D adiciona seu ID: ELECTION[B, C, D] → A
4. A adiciona seu ID: ELECTION[B, C, D, A] → B
5. B recebe lista completa, escolhe maior ID (D)
6. B envia COORDINATOR[D] pelo anel
7. Todos reconhecem D como líder
```

**Implementação**:

```python
class RingElection:
    def __init__(self, node_id, next_node):
        self.node_id = node_id
        self.next_node = next_node
        self.leader = None
        self.election_in_progress = False
        self.participant_ids = []

    def start_election(self):
        if self.election_in_progress:
            return

        self.election_in_progress = True
        self.participant_ids = [self.node_id]

        # Enviar ELECTION para próximo nó
        self.send_election(self.next_node, self.participant_ids)

    def receive_election(self, participant_ids):
        if self.node_id in participant_ids:
            # Mensagem deu volta completa, eleger líder
            leader = max(participant_ids)
            self.broadcast_coordinator(leader)
        else:
            # Adicionar meu ID e passar adiante
            participant_ids.append(self.node_id)
            self.send_election(self.next_node, participant_ids)

    def receive_coordinator(self, new_leader):
        self.leader = new_leader
        self.election_in_progress = False

        if new_leader != self.node_id:
            # Passar mensagem adiante
            self.send_coordinator(self.next_node, new_leader)
```

**Características**:

- ✅ Apenas uma mensagem ELECTION circula (menos tráfego)
- ✅ Todos participam
- ❌ Pode ser lento se anel é grande
- ❌ Falha de um nó pode quebrar anel

### 3. Usando Serviços de Coordenação (Recomendado)

#### ZooKeeper

**Conceito**: Usar serviço externo de coordenação.

**Como funciona**:

```
1. Todos nós criam ephemeral sequential znode em /election
   /election/node-0000000001 (Node A)
   /election/node-0000000002 (Node B)
   /election/node-0000000003 (Node C)

2. Nó com menor número é o líder
   Leader: node-0000000001 (Node A)

3. Outros nós "watch" o nó imediatamente antes deles
   Node B watches node-0000000001
   Node C watches node-0000000002

4. Se líder cai (ephemeral node some):
   Node B detecta → Torna-se novo líder
```

**Implementação com ZooKeeper**:

```python
from kazoo.client import KazooClient
from kazoo.recipe.election import Election

class ZKLeaderElection:
    def __init__(self, hosts='localhost:2181'):
        self.zk = KazooClient(hosts=hosts)
        self.zk.start()

        self.election = Election(self.zk, "/election")

    def run_for_leadership(self):
        # Tentar se tornar líder
        self.election.run(self.leader_function)

    def leader_function(self):
        print("I am the leader!")

        # Fazer trabalho de líder
        while True:
            self.do_leader_work()
            time.sleep(1)

    def do_leader_work(self):
        # Lógica específica do líder
        pass

    def is_leader(self):
        # Verificar se este nó é o líder
        return self.election.contenders()[0] == self.election.create_path

# Uso
election = ZKLeaderElection()
election.run_for_leadership()  # Bloqueia até se tornar líder
```

**Vantagens**:

- ✅ Confiável (ZooKeeper usa Paxos/Zab)
- ✅ Rápida detecção de falhas
- ✅ Bem testado em produção

#### etcd (Kubernetes usa isso)

**Similar ao ZooKeeper mas usando leases**:

```python
import etcd3

class EtcdLeaderElection:
    def __init__(self, etcd_host='localhost', etcd_port=2379):
        self.etcd = etcd3.client(host=etcd_host, port=etcd_port)
        self.lease = None
        self.is_leader = False

    def campaign_for_leader(self, node_id, ttl=10):
        # Criar lease com TTL
        self.lease = self.etcd.lease(ttl)

        # Tentar colocar chave com lease
        success = self.etcd.transaction(
            compare=[
                self.etcd.transactions.version('/leader') == 0  # Não existe
            ],
            success=[
                self.etcd.transactions.put('/leader', node_id, lease=self.lease)
            ],
            failure=[]
        )

        if success:
            self.is_leader = True
            print(f"Node {node_id} is now the leader")

            # Manter lease renovando
            self.keep_alive()
        else:
            # Outro nó é líder, watch até ficar disponível
            self.watch_leader()

    def keep_alive(self):
        """Renovar lease enquanto líder"""
        for _ in self.lease.keepalive():
            if not self.is_leader:
                break
            time.sleep(1)

    def watch_leader(self):
        """Assistir chave /leader até ficar livre"""
        events_iterator, cancel = self.etcd.watch('/leader')

        for event in events_iterator:
            if isinstance(event, etcd3.events.DeleteEvent):
                # Líder morreu, tentar virar líder
                cancel()
                self.campaign_for_leader()
                break

    def resign(self):
        """Renunciar liderança"""
        if self.is_leader:
            self.etcd.delete('/leader')
            self.is_leader = False
```

**Como funciona**:

1. Nó tenta escrever em chave `/leader` com lease
2. Se chave não existe, escreve e vira líder
3. Lease expira se líder não renovar (heartbeat)
4. Outros nós assistem chave `/leader`
5. Quando chave expira/é deletada, nós competem novamente

#### Consul

```python
import consul

class ConsulLeaderElection:
    def __init__(self):
        self.consul = consul.Consul()
        self.session_id = None

    def try_become_leader(self, node_id):
        # Criar sessão
        self.session_id = self.consul.session.create(
            name=f'leader-{node_id}',
            ttl=10  # Expira em 10s sem renovação
        )

        # Tentar adquirir lock
        acquired = self.consul.kv.put(
            'service/leader',
            node_id,
            acquire=self.session_id
        )

        if acquired:
            print(f"{node_id} is the leader")
            # Manter sessão viva
            self.renew_session()
        else:
            # Outro nó é líder
            print(f"{node_id} is a follower")
            self.watch_leader_key()

    def renew_session(self):
        """Renovar sessão periodicamente"""
        while True:
            self.consul.session.renew(self.session_id)
            time.sleep(5)  # Renovar a cada 5s (TTL é 10s)
```

### 4. Database-Based Leader Election

**Usar banco de dados como coordenador**.

**PostgreSQL com Advisory Locks**:

```python
import psycopg2

class PGLeaderElection:
    def __init__(self, connection_string):
        self.conn = psycopg2.connect(connection_string)
        self.cursor = self.conn.cursor()
        self.lock_id = 123456  # ID único do lock

    def try_become_leader(self):
        # Tentar adquirir advisory lock (não-bloqueante)
        self.cursor.execute(
            "SELECT pg_try_advisory_lock(%s)",
            (self.lock_id,)
        )
        acquired = self.cursor.fetchone()[0]

        if acquired:
            print("I am the leader!")
            return True
        else:
            print("Someone else is the leader")
            return False

    def release_leadership(self):
        self.cursor.execute(
            "SELECT pg_advisory_unlock(%s)",
            (self.lock_id,)
        )
```

**Redis com SETNX**:

```python
import redis
import time
import uuid

class RedisLeaderElection:
    def __init__(self, redis_client):
        self.redis = redis_client
        self.node_id = str(uuid.uuid4())
        self.leader_key = 'service:leader'
        self.ttl = 10  # 10 segundos

    def try_become_leader(self):
        # SETNX: Set if Not eXists
        acquired = self.redis.set(
            self.leader_key,
            self.node_id,
            nx=True,  # Apenas se não existe
            ex=self.ttl  # Expira em 10s
        )

        if acquired:
            print(f"{self.node_id} is the leader")
            # Renovar lock periodicamente
            self.renew_leadership()
            return True
        else:
            current_leader = self.redis.get(self.leader_key)
            print(f"{current_leader} is the leader")
            return False

    def renew_leadership(self):
        """Renovar liderança antes de expirar"""
        while True:
            time.sleep(self.ttl / 2)  # Renovar na metade do TTL

            # Renovar apenas se ainda somos o líder
            script = """
            if redis.call("get", KEYS[1]) == ARGV[1] then
                return redis.call("expire", KEYS[1], ARGV[2])
            else
                return 0
            end
            """

            renewed = self.redis.eval(
                script,
                1,
                self.leader_key,
                self.node_id,
                self.ttl
            )

            if not renewed:
                print("Lost leadership")
                break
```

## Problema: Split Brain

**Split Brain**: Múltiplos líderes ao mesmo tempo.

### Causa: Partição de Rede

```
Cluster: [A, B, C]

Partição de rede:
Partition 1: [A, B]    ← Maioria
Partition 2: [C]       ← Minoria

A pensa: "C está morto, eu sou líder"
C pensa: "A e B estão mortos, eu sou líder"

→ 2 líderes! ❌
```

### Solução: Quorum

**Apenas partição com maioria pode ter líder**.

```
Total de nós: 3
Quorum: floor(3/2) + 1 = 2

Partition 1: [A, B] → 2 nós ✅ Pode eleger líder
Partition 2: [C]    → 1 nó  ❌ Não pode eleger líder

Apenas um líder possível!
```

**Implementação**:

```python
class QuorumBasedElection:
    def __init__(self, node_id, all_nodes):
        self.node_id = node_id
        self.all_nodes = all_nodes
        self.quorum_size = len(all_nodes) // 2 + 1

    def can_become_leader(self):
        # Contar nós visíveis
        visible_nodes = self.count_visible_nodes()

        if visible_nodes >= self.quorum_size:
            # Temos quorum, podemos eleger líder
            return self.start_election()
        else:
            # Sem quorum, não podemos eleger
            print("No quorum, cannot elect leader")
            return False
```

### Fencing Token

**Garantir que líder antigo não cause problemas**.

```python
class FencedLeaderElection:
    def __init__(self):
        self.fencing_token = 0

    def become_leader(self):
        # Incrementar fencing token ao se tornar líder
        self.fencing_token += 1
        return self.fencing_token

    def write_with_token(self, data, token):
        # Servidor aceita apenas write com token maior
        if token > self.last_seen_token:
            self.last_seen_token = token
            self.write(data)
        else:
            raise StaleLeaderError("Stale fencing token")

# Uso
leader1 = elect_leader()  # token = 1
leader1.write("data1", token=1)  # ✅

# Network partition, new leader elected
leader2 = elect_leader()  # token = 2
leader2.write("data2", token=2)  # ✅

# Old leader recovers (split brain)
leader1.write("data3", token=1)  # ❌ Rejeitado (token antigo)
```

## Exemplo Prático: Scheduled Job Runner

```python
import time
import etcd3
from datetime import datetime

class DistributedJobRunner:
    def __init__(self, node_id, jobs):
        self.node_id = node_id
        self.jobs = jobs
        self.etcd = etcd3.client()
        self.is_leader = False
        self.lease = None

    def run(self):
        while True:
            if not self.is_leader:
                self.try_become_leader()

            if self.is_leader:
                self.run_jobs()

            time.sleep(1)

    def try_become_leader(self):
        # Criar lease
        self.lease = self.etcd.lease(ttl=10)

        # Tentar se tornar líder
        success = self.etcd.transaction(
            compare=[
                self.etcd.transactions.version('/job-runner/leader') == 0
            ],
            success=[
                self.etcd.transactions.put(
                    '/job-runner/leader',
                    self.node_id,
                    lease=self.lease
                )
            ],
            failure=[]
        )

        if success:
            self.is_leader = True
            print(f"[{self.node_id}] Became leader at {datetime.now()}")

            # Manter lease viva
            threading.Thread(target=self.keep_alive, daemon=True).start()
        else:
            print(f"[{self.node_id}] Follower, waiting...")
            time.sleep(5)

    def keep_alive(self):
        """Renovar lease enquanto líder"""
        for _ in self.lease.refresh():
            if not self.is_leader:
                break
            time.sleep(5)

    def run_jobs(self):
        """Executar jobs agendados (apenas líder)"""
        for job in self.jobs:
            if job.should_run():
                print(f"[{self.node_id}] Running job: {job.name}")
                job.execute()

    def stop(self):
        """Parar e renunciar liderança"""
        if self.is_leader:
            self.etcd.delete('/job-runner/leader')
            self.is_leader = False

# Uso: Múltiplas instâncias do serviço
# Apenas uma executará jobs, outras ficam em standby

jobs = [
    ScheduledJob("backup", cron="0 2 * * *"),
    ScheduledJob("cleanup", cron="0 3 * * *"),
]

runner = DistributedJobRunner(node_id="worker-1", jobs=jobs)
runner.run()
```

## Best Practices

### ✅ Do:

1. **Use serviços de coordenação** (ZooKeeper, etcd, Consul) em vez de implementar próprio algoritmo
2. **Implemente quorum** para evitar split brain
3. **Use fencing tokens** para invalidar líder antigo
4. **Renove lease/heartbeat** regularmente
5. **Fail fast**: Se perdeu liderança, pare imediatamente

### ❌ Don't:

1. **Não assuma** que líder nunca muda
2. **Não esqueça** de lidar com split brain
3. **Não implemente** algoritmo de consenso do zero (use biblioteca)
4. **Não use** apenas timestamps para determinar líder (clock skew!)

## Conclusão

Leader Election é fundamental para coordenação em sistemas distribuídos, mas é complexo de implementar corretamente.

**Recomendação**: Use ferramentas maduras (ZooKeeper, etcd, Consul) em vez de implementar do zero.

---

**Próximo**: [Consenso](consensus.md)
