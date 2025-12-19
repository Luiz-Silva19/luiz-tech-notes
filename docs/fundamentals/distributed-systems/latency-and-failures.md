---
id: distributed-systems-latency-failures
title: Latência e Falhas
sidebar_label: Latência e Falhas
---

### O que é Latência?

**Latência** é o tempo que leva para uma mensagem viajar de um ponto a outro na rede. Em sistemas distribuídos, latência é **inevitável** e tem impacto direto na performance.

### Componentes da Latência

```
Latência Total = Propagação + Transmissão + Processamento + Fila
```

1. **Propagação**: Tempo para sinal viajar pelo meio físico

   - Limitado pela velocidade da luz (~300.000 km/s)
   - Distância geográfica importa!

2. **Transmissão**: Tempo para colocar bits na rede

   - Depende da largura de banda
   - `Tempo = Tamanho dos dados / Bandwidth`

3. **Processamento**: Tempo de processamento em roteadores/switches

   - Geralmente negligível (<1ms)

4. **Fila**: Tempo esperando em buffers
   - Aumenta com congestionamento

### Latências Típicas

```
Memória L1:              0.5 ns
Memória L2:              7 ns
Memória RAM:             100 ns
SSD:                     150 μs (150.000 ns)
HDD:                     10 ms (10.000.000 ns)

Same datacenter:         0.5 ms
Same region:             5-10 ms
Cross-continent:         100-300 ms
Intercontinental:        200-500 ms

Round-trip to Moon:      2.5 seconds
Round-trip to Mars:      3-22 minutes (depende da órbita)
```

### Impacto da Latência

#### Exemplo: Request HTTP

```
Cliente (São Paulo) → Servidor (Virginia)

DNS lookup:              20ms
TCP handshake:           150ms (3-way handshake, RTT = 150ms)
TLS handshake:           300ms (2 RTTs)
HTTP request/response:   150ms

Total:                   ~620ms (apenas para 1 request!)
```

#### Cascata de Latências

```
Cliente → API Gateway → Serviço A → Banco de Dados
        (10ms)        (20ms)      (30ms)

Total: 60ms (se sequencial)
```

### Estratégias para Lidar com Latência

#### 1. Paralelização

```
Sequential:  A(50ms) → B(50ms) → C(50ms) = 150ms

Paralelo:    A(50ms)
             B(50ms)  = 50ms (máximo dos três)
             C(50ms)
```

#### 2. Caching

```python
# Sem cache
def get_user(user_id):
    return database.query(user_id)  # 30ms toda vez

# Com cache
def get_user(user_id):
    cached = cache.get(user_id)  # 1ms
    if cached:
        return cached

    user = database.query(user_id)  # 30ms (raramente)
    cache.set(user_id, user)
    return user
```

#### 3. CDN (Content Delivery Network)

```
Sem CDN:
Cliente (Brasil) → Servidor (EUA) = 200ms

Com CDN:
Cliente (Brasil) → Edge (São Paulo) = 10ms
```

#### 4. Prevenção de Round-trips Desnecessários

```
❌ Múltiplas queries sequenciais
SELECT * FROM users WHERE id = 1;
SELECT * FROM orders WHERE user_id = 1;
SELECT * FROM payments WHERE user_id = 1;
= 3 × latência

✅ Batch ou JOIN
SELECT u.*, o.*, p.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN payments p ON u.id = p.user_id
WHERE u.id = 1;
= 1 × latência
```

#### 5. Comunicação Assíncrona

```
Síncrona:   Request → Wait → Response
            (cliente bloqueado)

Assíncrona: Request → Continue working
                    ↓ (callback quando pronto)
                    Response
```

## Falhas em Sistemas Distribuídos

### Tipos de Falhas

#### 1. Crash Failures (Falha por Parada)

**Definição**: Componente para de funcionar completamente.

**Características**:

- Mais fácil de detectar e lidar
- Não envia mensagens incorretas
- Node simplesmente para de responder

**Exemplos**:

- Servidor desliga
- Processo é morto
- Queda de energia

**Detecção**:

```
Heartbeat não recebido → Node considerado morto
```

#### 2. Omission Failures (Falha de Omissão)

**Definição**: Mensagens são perdidas.

**Tipos**:

- **Send omission**: Falha ao enviar
- **Receive omission**: Falha ao receber

**Exemplos**:

- Pacotes descartados por congestionamento
- Buffer overflow
- Firewall bloqueia pacotes

**Problema**:

```
Node A envia: [msg1, msg2, msg3]
Node B recebe: [msg1, msg3]  ← msg2 foi perdida
```

#### 3. Timing Failures (Falha de Tempo)

**Definição**: Componente responde, mas fora do tempo esperado.

**Exemplos**:

- Resposta muito lenta (timeout)
- Clock drift (relógios dessincronizados)
- Processamento demorado

**Desafio**: Distinguir entre:

- Node lento vs node morto
- Network lenta vs network particionada

#### 4. Byzantine Failures (Falha Bizantina)

**Definição**: Componente se comporta arbitrariamente ou maliciosamente.

**Características**:

- Mais difícil de lidar
- Node envia mensagens inconsistentes
- Pode ser malicioso ou bugado

**Exemplos**:

- Hardware defeituoso enviando dados corrompidos
- Software com bugs graves
- Ataques maliciosos

**Problema dos Generais Bizantinos**:

```
General A → General B: "Atacar"
General A → General C: "Recuar"  (comportamento bizantino)

Como B e C chegam a consenso?
```

### Detecção de Falhas

#### Heartbeats

```python
# Servidor envia heartbeat periodicamente
while True:
    send_heartbeat()
    sleep(5)  # cada 5 segundos

# Monitor detecta falha
last_heartbeat = time.now()
timeout = 15  # 3 × heartbeat interval

if time.now() - last_heartbeat > timeout:
    mark_as_failed()
```

**Trade-offs**:

- Intervalo curto: Detecção rápida, mais overhead de rede
- Intervalo longo: Menos overhead, detecção lenta

#### Failure Detectors

```
Perfect Failure Detector:
- Nunca suspeita de nodes corretos (no false positives)
- Eventualmente detecta todos nodes falhados
- IMPOSSÍVEL em sistemas assíncronos!

Eventually Perfect Failure Detector:
- Pode ter suspeitas temporárias
- Eventualmente para de suspeitar de nodes corretos
- POSSÍVEL implementar
```

### Padrões de Resiliência

#### 1. Timeout

```python
try:
    response = requests.get(url, timeout=5)  # 5 segundos
except TimeoutError:
    # Lidar com timeout
    return fallback_value()
```

**Escolhendo timeout**:

- Muito curto: Falsos positivos
- Muito longo: Cliente espera demais
- Regra: p99 latency + margem de segurança

#### 2. Retry (com backoff exponencial)

```python
def retry_with_backoff(func, max_retries=3):
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise

            wait_time = (2 ** attempt) + random.uniform(0, 1)
            time.sleep(wait_time)
```

**Cuidados**:

- Só retry em erros transitórios (network, timeout)
- Não retry em erros permanentes (404, validação)
- Implemente idempotência!

#### 3. Circuit Breaker

```python
class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.state = 'CLOSED'  # CLOSED, OPEN, HALF_OPEN
        self.last_failure_time = None

    def call(self, func):
        if self.state == 'OPEN':
            if time.now() - self.last_failure_time > self.timeout:
                self.state = 'HALF_OPEN'
            else:
                raise CircuitOpenError()

        try:
            result = func()
            if self.state == 'HALF_OPEN':
                self.state = 'CLOSED'
                self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.now()

            if self.failure_count >= self.failure_threshold:
                self.state = 'OPEN'

            raise
```

**Estados**:

- **CLOSED**: Normal, requisições passam
- **OPEN**: Muitas falhas, rejeita requisições imediatamente
- **HALF_OPEN**: Testando se serviço se recuperou

#### 4. Bulkhead

**Isola recursos para evitar falha em cascata.**

```python
# Pool separados para diferentes serviços
user_service_pool = ThreadPool(10)
payment_service_pool = ThreadPool(5)
notification_service_pool = ThreadPool(3)

# Se payment service falhar, user service continua funcionando
```

#### 5. Fallback

```python
def get_recommendations(user_id):
    try:
        return ml_service.get_personalized(user_id, timeout=2)
    except:
        # Fallback: recomendações genéricas
        return cache.get_popular_items()
```

## Estratégias de Recovery

### 1. Checkpointing

```
Estado salvo periodicamente
┌─────┬─────┬─────┬─────┐
│ Op1 │ Op2 │ Op3 │ Op4 │
└─────┴─────┴─────┴─────┘
    ↓           ↓
  [Checkpoint] [Checkpoint]

Falha → Restaurar do último checkpoint
```

### 2. Logging (Write-Ahead Log)

```
1. Log operação antes de executar
2. Executar operação
3. Em caso de falha, replay log

[Log]: INSERT user_id=123
[Execute]: INSERT no banco
```

### 3. Replication

```
Primário → Replica 1
        → Replica 2
        → Replica 3

Primário falha → Promove replica a primário
```

## Conclusão

Em sistemas distribuídos:

- **Latência** é inevitável (física) → Minimize com caching, CDN, paralelização
- **Falhas** vão acontecer → Projete para resiliência desde o início
- **Não há solução perfeita** → Entenda trade-offs e escolha apropriadamente

---

**Próximo**: [Tempo e Relógios](time-and-clocks.md)
