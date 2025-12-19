---
id: distributed-systems-time-clocks
title: Tempo e Relógios
sidebar_label: Tempo e Relógios
---

## O Problema do Tempo

Em sistemas distribuídos, **não existe um relógio global perfeito**. Esta é uma das diferenças fundamentais entre sistemas centralizados e distribuídos.

### Por que isso importa?

```
Node A: [Event 1] --------- [Event 2]
Node B:           [Event 3] ----------- [Event 4]

Qual evento aconteceu primeiro: Event 2 ou Event 3?
```

Sem sincronização perfeita, é impossível determinar a ordem absoluta de eventos em diferentes nós.

## Tipos de Relógios

### 1. Physical Clocks (Relógios Físicos)

**Definição**: Medem tempo real (wall-clock time).

**Implementações**:

- **System Clock**: Relógio do sistema operacional
- **NTP (Network Time Protocol)**: Sincroniza com servidores de tempo
- **GPS**: Sinal de satélites
- **Atomic Clocks**: Relógios atômicos (mais precisos)

#### Clock Drift (Deriva de Relógio)

Relógios físicos **derivam** (drift) em taxas diferentes:

```
Relógio perfeito:    [====|====|====|====]
Relógio A (rápido):  [===|===|===|===|===]  (+10ms/s)
Relógio B (lento):   [=====|=====|=====]    (-5ms/s)
```

**Causas**:

- Variação de temperatura
- Qualidade do oscilador de quartzo
- Idade do hardware

**Taxa típica**: 1-50 ms de drift por segundo

#### Network Time Protocol (NTP)

**Como funciona**:

```
Cliente                    Servidor NTP
  │                             │
  ├──── Request (t0) ──────────→│
  │                             │ (processa em t1)
  │                             │ (responde em t2)
  │←──── Response (t3) ─────────┤
  │                             │

Offset = ((t1 - t0) + (t2 - t3)) / 2
Round-trip time = (t3 - t0) - (t2 - t1)
```

**Precisão**:

- LAN: 1-10 ms
- WAN: 10-100 ms
- Com GPS: <1 μs

**Problemas**:

```python
# Salto para trás no tempo!
time_before = time.now()  # 10:30:00.500
# NTP ajusta relógio para trás
time_after = time.now()   # 10:30:00.200  ← Antes de time_before!

# Quebra suposição: tempo sempre avança
```

### 2. Logical Clocks (Relógios Lógicos)

**Objetivo**: Capturar **ordem causal** de eventos, não tempo absoluto.

#### Lamport Timestamps

**Regras**:

1. Cada processo mantém um contador local
2. Incrementa contador antes de cada evento
3. Quando envia mensagem, inclui timestamp
4. Ao receber mensagem: `local_counter = max(local_counter, msg_counter) + 1`

**Exemplo**:

```
Process A:  [1] ----send(msg,1)---→ [2]
                                      ↓
Process B:  [1] [2] ←--receive(1)-- [max(2,1)+1=3] [4]
```

**Propriedade**:

```
Se evento A → evento B (A causou B)
Então timestamp(A) < timestamp(B)

MAS:
timestamp(A) < timestamp(B) NÃO implica A → B
(pode haver eventos concorrentes)
```

**Limitação**: Não detecta concorrência.

#### Vector Clocks

**Resolução**: Cada processo mantém vetor de timestamps de todos os processos.

**Estrutura**:

```
Vector Clock = [T1, T2, T3, ..., Tn]
              (um contador por processo)
```

**Regras**:

```python
# Processo i
vector_clock[i] += 1  # incrementa próprio contador

# Enviar mensagem
send(message, vector_clock)

# Receber mensagem
for j in range(n):
    vector_clock[j] = max(vector_clock[j], received_clock[j])
vector_clock[i] += 1
```

**Exemplo**:

```
Process A: [1,0,0] --send([1,0,0])-→ [2,0,0]
                                        ↓
Process B: [0,1,0] [0,2,0] ←-receive- [max(0,1), max(2,0), 0]+[0,1,0] = [1,3,0]

Process C: [0,0,1] [0,0,2]
```

**Comparação de Vector Clocks**:

```python
def happens_before(vc1, vc2):
    """vc1 → vc2 (vc1 causou vc2)?"""
    return all(vc1[i] <= vc2[i] for i in range(n)) and vc1 != vc2

def concurrent(vc1, vc2):
    """vc1 || vc2 (concorrentes)?"""
    return not happens_before(vc1, vc2) and not happens_before(vc2, vc1)
```

**Exemplo de Detecção de Conflito**:

```
VC1 = [3, 1, 0]
VC2 = [2, 2, 0]

happens_before(VC1, VC2)?
  3 <= 2? Não!
  Então VC1 não → VC2

happens_before(VC2, VC1)?
  2 <= 3? Sim
  2 <= 1? Não!
  Então VC2 não → VC1

Logo: VC1 || VC2 (concorrentes!)
```

**Uso**:

- Detecção de conflitos em databases distribuídos
- Sistemas de versionamento (Git usa conceito similar)
- Riak, Voldemort

**Trade-off**: Vector clocks crescem com número de processos (O(n) espaço).

#### Hybrid Logical Clocks (HLC)

**Combina vantagens de relógios físicos e lógicos.**

**Estrutura**:

```
HLC = (physical_time, logical_counter)
```

**Vantagens**:

- Tamanho fixo (não cresce com número de nós)
- Preserva ordem causal
- Proximidade com tempo físico (útil para debugging)

**Sistemas**:

- CockroachDB
- MongoDB
- Cassandra (usa conceito similar)

### 3. Causality Tracking

#### Version Vectors

Similar a vector clocks, mas usado para detectar versões conflitantes de dados.

**Exemplo em Sistema de Arquivo Distribuído**:

```
Arquivo v1: [A:1, B:0]
  ↓
Node A escreve → v2: [A:2, B:0]
Node B escreve → v3: [A:1, B:1]

v2 || v3 → Conflito!

Merge → v4: [A:2, B:1]
```

## Ordenação de Eventos

### Happens-Before Relation (→)

**Definição (Lamport)**:

```
a → b se:
1. a e b estão no mesmo processo e a ocorre antes de b, OU
2. a é envio de mensagem e b é recebimento dessa mensagem, OU
3. Existe c tal que a → c e c → b (transitividade)
```

**Eventos Concorrentes**:

```
a || b  ←→  a ↛ b  E  b ↛ a
```

### Causal Order

**Garantia**: Se mensagem m1 → m2, então todos os processos entregam m1 antes de m2.

**Implementação** (Simplified):

```python
class CausalOrderBroadcast:
    def __init__(self):
        self.vector_clock = [0] * n
        self.buffer = []

    def broadcast(self, message):
        self.vector_clock[self.id] += 1
        send_to_all(message, self.vector_clock.copy())

    def receive(self, message, sender_vc):
        # Buffering até que dependências sejam satisfeitas
        while not self.can_deliver(message, sender_vc):
            self.buffer.append((message, sender_vc))

        self.deliver(message)
        self.vector_clock[sender] = sender_vc[sender]

    def can_deliver(self, message, sender_vc):
        # Pode entregar se todas mensagens anteriores já foram entregues
        sender_id = message.sender

        # VC do sender está exatamente 1 à frente
        if sender_vc[sender_id] != self.vector_clock[sender_id] + 1:
            return False

        # Todos outros processos estão atualizados
        for i in range(n):
            if i != sender_id and sender_vc[i] > self.vector_clock[i]:
                return False

        return True
```

## Sincronização de Relógios

### Cristian's Algorithm

**Simples cliente-servidor**:

```
Cliente                     Servidor
  │                             │
  ├──── Request (T0) ──────────→│
  │                             │ (retorna Ts)
  │←──── Response(Ts) ──────────┤
  │ (recebe em T1)              │

Ajusta relógio para: Ts + (T1 - T0)/2
```

**Precisão**: ±(T1 - T0)/2

### Berkeley Algorithm

**Servidor coordena sincronização**:

```
1. Servidor pergunta tempo de cada cliente
2. Calcula média
3. Envia ajuste para cada cliente (não tempo absoluto)

Servidor: 10:00
ClienteA: 10:02  → Ajuste: -2 min
ClienteB: 9:58   → Ajuste: +2 min

Média: 10:00
```

**Vantagem**: Não precisa de fonte externa de tempo.

## True Time (Google Spanner)

**Inovação**: API que retorna intervalo de confiança.

```python
# API TrueTime
interval = TrueTime.now()
# interval = [earliest, latest]

# Garantia: tempo real está em [earliest, latest]
```

**Implementação**:

- GPS em cada datacenter
- Atomic clocks
- Intervalo típico: 1-7 ms

**Uso**:

```python
# Espera até ter certeza que timestamp é no passado
def wait_until_certain(timestamp):
    while TrueTime.now().earliest < timestamp:
        sleep(0.001)

# Isso permite serialização externa sem coordenação!
```

## Ordenação Total vs Causal

### Total Order

**Todos os processos veem eventos na mesma ordem.**

```
Process A: [e1, e2, e3]
Process B: [e1, e2, e3]  ← mesma ordem
Process C: [e1, e2, e3]
```

**Como alcançar**:

- Coordenador central (single point of failure)
- Algoritmos de consenso (Paxos, Raft)

### Causal Order

**Preserva relações causais, permite reordenação de eventos concorrentes.**

```
e1 → e2  ← Todos veem e1 antes de e2
e3 || e4 ← Podem ser vistos em ordens diferentes
```

**Mais eficiente** que total order!

## Aplicações Práticas

### Detecção de Conflitos (DynamoDB, Riak)

```python
# Cliente 1 lê versão com vector clock [1,0]
# Cliente 1 escreve → [2,0]

# Cliente 2 lê versão com vector clock [1,0] (antes da escrita de Cliente 1)
# Cliente 2 escreve → [1,1]

# Sistema detecta: [2,0] || [1,1] → Conflito!
# Retorna ambas versões para aplicação resolver
```

### Debugging Distribuído

```python
# Com timestamps lógicos
log("[1,0,0] User login")
log("[2,0,0] Fetch user data")
log("[3,1,2] Process payment")  ← Depende de eventos de outros processos

# Pode reconstruir ordem causal de eventos!
```

### Snapshots Consistentes

```
Como tirar snapshot de sistema distribuído em execução?
→ Algoritmo de Chandy-Lamport usa markers e vector clocks
```

## Conclusão

**Relógios Físicos**:

- ✅ Úteis para timestamps de debugging
- ❌ Não confiáveis para ordenação em sistemas distribuídos

**Relógios Lógicos**:

- ✅ Capturam causalidade
- ✅ Não dependem de sincronização de rede
- ❌ Não refletem tempo real

**Escolha**:

- **Lamport clocks**: Simple, mas não detecta concorrência
- **Vector clocks**: Detecta concorrência, mas cresce com número de nós
- **HLC**: Melhor dos dois mundos (tempo real + causalidade)

---

**Próximo**: [Idempotência](idempotency.md)
