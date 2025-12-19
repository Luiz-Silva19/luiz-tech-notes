---
id: distributed-systems-idempotency
title: Idempotência
sidebar_label: Idempotência
---

## O que é Idempotência em Sistemas Distribuídos?

**Idempotência** é a propriedade de que executar uma operação **múltiplas vezes** produz o **mesmo resultado** que executá-la **uma única vez**.

```
f(x) = f(f(x)) = f(f(f(x))) = ...
```

## Por que Idempotência é Importante?

Em sistemas distribuídos, mensagens podem ser:

- **Duplicadas** (retry após timeout)
- **Reordenadas** (diferentes caminhos na rede)
- **Atrasadas** (chegam após retry)

### Exemplo do Problema

```
Cliente → [Transferir $100] → Servidor

Timeout! (mas servidor processou)
     ↓
Cliente → [Transferir $100 NOVAMENTE] → Servidor

Resultado: $200 transferidos! ❌
```

## Operações Naturalmente Idempotentes

### HTTP Methods

**Idempotentes** (por especificação):

```http
GET /users/123        ← Seguro executar múltiplas vezes
PUT /users/123        ← Substitui completamente
DELETE /users/123     ← Deletar várias vezes = mesmo resultado
```

**NÃO Idempotentes**:

```http
POST /users           ← Cria novo usuário a cada vez
PATCH /counter/increment ← Incrementa a cada vez
```

### Operações de Banco de Dados

**Idempotentes**:

```sql
-- SET é idempotente
UPDATE users SET email = 'new@example.com' WHERE id = 123;

-- DELETE é idempotente
DELETE FROM users WHERE id = 123;

-- SELECT é idempotente (read-only)
SELECT * FROM users WHERE id = 123;
```

**NÃO Idempotentes**:

```sql
-- INCREMENT não é idempotente
UPDATE counters SET count = count + 1 WHERE id = 'page_views';

-- INSERT não é idempotente (sem constraints)
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
```

## Tornando Operações Idempotentes

### 1. Idempotency Keys

**Estratégia**: Cliente gera ID único para cada operação.

```python
# Cliente
idempotency_key = str(uuid.uuid4())

response = requests.post('/transfer',
    headers={'Idempotency-Key': idempotency_key},
    json={'from': '123', 'to': '456', 'amount': 100}
)
```

**Servidor**:

```python
@app.post('/transfer')
def transfer(request):
    idempotency_key = request.headers.get('Idempotency-Key')

    # Verificar se já processamos esta operação
    cached_result = cache.get(idempotency_key)
    if cached_result:
        return cached_result  # Retorna resultado anterior

    # Processar transferência
    result = process_transfer(request.json)

    # Armazenar resultado com TTL
    cache.set(idempotency_key, result, ttl=86400)  # 24h

    return result
```

**Stripe API** usa essa estratégia:

```python
import stripe

stripe.Charge.create(
    amount=2000,
    currency="usd",
    source="tok_visa",
    idempotency_key="unique_key_123"  # Chave única
)
```

### 2. Natural Keys

**Estratégia**: Usar identificadores naturais da operação.

```python
# Em vez de gerar novo pedido sempre
def create_order(user_id, items):
    # Use combinação única como chave
    order_key = f"{user_id}:{hash(frozenset(items))}"

    existing_order = db.get_order_by_key(order_key)
    if existing_order:
        return existing_order

    order = db.create_order(...)
    db.save_order_key(order_key, order.id)
    return order
```

### 3. Versioning

**Estratégia**: Incluir versão esperada na operação.

```python
# Cliente lê versão atual
user = get_user(123)  # {id: 123, name: "Alice", version: 5}

# Atualização condicional
update_user(
    id=123,
    expected_version=5,  # Só atualiza se versão ainda é 5
    new_data={'name': 'Alice Smith'},
    new_version=6
)
```

**Implementação**:

```sql
-- Atualiza apenas se versão corresponde
UPDATE users
SET name = 'Alice Smith', version = version + 1
WHERE id = 123 AND version = 5;

-- Se version mudou, UPDATE afeta 0 linhas → retry
```

### 4. Status Tracking

**Estratégia**: Rastrear estado da operação.

```python
class Transfer:
    def __init__(self):
        self.status = 'PENDING'  # PENDING, PROCESSING, COMPLETED, FAILED

    def execute(self, transfer_id, from_account, to_account, amount):
        transfer = db.get_transfer(transfer_id)

        if transfer.status == 'COMPLETED':
            return transfer  # Já processado

        if transfer.status == 'PROCESSING':
            # Outro processo está processando
            # Opção 1: Esperar
            # Opção 2: Assumir que vai completar
            return transfer

        # Marcar como em processamento
        db.update_transfer(transfer_id, status='PROCESSING')

        try:
            # Executar transferência
            debit(from_account, amount)
            credit(to_account, amount)

            db.update_transfer(transfer_id, status='COMPLETED')
        except Exception as e:
            db.update_transfer(transfer_id, status='FAILED', error=str(e))
            raise
```

### 5. Check-Then-Act (com Locks)

**Estratégia**: Verificar antes de executar (com proteção contra condições de corrida).

```python
from contextlib import contextmanager

@contextmanager
def distributed_lock(lock_key, timeout=10):
    """Distributed lock usando Redis"""
    lock_id = str(uuid.uuid4())

    # Tentar adquirir lock
    acquired = redis.set(lock_key, lock_id, nx=True, ex=timeout)
    if not acquired:
        raise LockError("Could not acquire lock")

    try:
        yield
    finally:
        # Liberar lock apenas se ainda somos donos
        script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
        """
        redis.eval(script, 1, lock_key, lock_id)

def idempotent_operation(operation_id):
    with distributed_lock(f"lock:operation:{operation_id}"):
        # Verificar se já foi executado
        if db.operation_exists(operation_id):
            return db.get_operation_result(operation_id)

        # Executar
        result = execute_operation()

        # Salvar resultado
        db.save_operation(operation_id, result)
        return result
```

## Patterns de Idempotência

### Pattern 1: Write-Once

**Conceito**: Escrever dados uma vez, nunca modificar.

```python
# Event Sourcing
events = [
    {'id': 1, 'type': 'UserCreated', 'data': {...}},
    {'id': 2, 'type': 'EmailUpdated', 'data': {...}},
]

# Adicionar evento é idempotente (se checar ID)
def add_event(event):
    if not db.event_exists(event['id']):
        db.append_event(event)
```

### Pattern 2: Last-Write-Wins

**Conceito**: Sempre sobrescrever com último valor.

```python
# Atualizar perfil (idempotente porque SET sobrescreve)
def update_profile(user_id, profile_data):
    db.users.update_one(
        {'id': user_id},
        {'$set': profile_data}  # SET é idempotente
    )
```

### Pattern 3: Delta + Deduplication

**Conceito**: Enviar delta (incremento), mas deduplique.

```python
# Sistema de pontuação
def add_points(user_id, event_id, points):
    # Deduplique por event_id
    if db.event_processed(event_id):
        return  # Já processado

    # Aplicar delta
    db.users.update_one(
        {'id': user_id},
        {'$inc': {'points': points}}
    )

    # Marcar evento como processado
    db.mark_event_processed(event_id)
```

### Pattern 4: Compensating Transactions

**Conceito**: Operação inversa para desfazer.

```python
# Saga pattern
def book_trip(trip_id):
    try:
        # Step 1: Reservar voo
        flight_id = book_flight()

        # Step 2: Reservar hotel
        hotel_id = book_hotel()

        # Step 3: Confirmar viagem
        confirm_trip(trip_id)

    except Exception as e:
        # Compensating transactions
        if hotel_id:
            cancel_hotel(hotel_id)  # Idempotente
        if flight_id:
            cancel_flight(flight_id)  # Idempotente
        raise
```

## Idempotência em Messaging

### At-Least-Once Delivery

**Problema**: Mensagem pode ser entregue múltiplas vezes.

```
Producer → [msg_id: 123, content: "Process payment"] → Consumer

Consumer processa ↓
Consumer ACK falha ↓
         ↓
Producer → [msg_id: 123, content: "Process payment"] → Consumer (novamente)
```

**Solução**:

```python
def handle_message(message):
    msg_id = message['id']

    # Deduplicação por ID da mensagem
    if processed_message_ids.contains(msg_id):
        return  # Já processado

    # Processar (idempotente ou com lock)
    process(message)

    # Marcar como processado
    processed_message_ids.add(msg_id)
```

### Kafka com Idempotency

```python
# Kafka Producer com idempotência
producer = KafkaProducer(
    enable_idempotence=True  # Garante exactly-once semântica
)

# Consumer com manual offset commit
for message in consumer:
    msg_id = message.value['id']

    if not db.message_processed(msg_id):
        process(message.value)
        db.mark_processed(msg_id)

    # Commit offset apenas após processar
    consumer.commit()
```

## Desafios

### 1. State Management

**Problema**: Onde armazenar estado de deduplicação?

**Opções**:

- **Database**: Durável, mas adiciona latência
- **Redis/Memcached**: Rápido, mas pode perder dados
- **In-memory**: Muito rápido, mas não sobrevive a restart

**Trade-off**:

```python
# Opção 1: Cache + DB (best of both worlds)
def is_processed(operation_id):
    # Tentar cache primeiro
    if cache.exists(operation_id):
        return True

    # Fallback para DB
    if db.operation_exists(operation_id):
        cache.set(operation_id, True, ttl=3600)
        return True

    return False
```

### 2. TTL (Time To Live)

**Problema**: Por quanto tempo manter registro de deduplicação?

```python
# Muito curto: pode reprocessar
cache.set(idempotency_key, result, ttl=60)  # 1 minuto

# Muito longo: usa muita memória
cache.set(idempotency_key, result, ttl=2592000)  # 30 dias
```

**Estratégia**:

- **Requests curtos**: 24-72 horas
- **Operações críticas**: 7-30 dias
- **Event sourcing**: Sempre (parte do log)

### 3. Distributed Transactions

**Problema**: Garantir atomicidade entre deduplicação e processamento.

```python
# Problema: race condition
def process(operation_id):
    if db.is_processed(operation_id):  # Check
        return

    # ← Outro processo pode executar aqui!

    execute()  # Act
    db.mark_processed(operation_id)

# Solução: transação atômica
def process(operation_id):
    with db.transaction():
        # Lock row
        status = db.get_operation_status(operation_id, for_update=True)

        if status == 'PROCESSED':
            return

        execute()
        db.update_status(operation_id, 'PROCESSED')
```

## Best Practices

### ✅ Do:

1. **Design for idempotency from start**
2. **Use idempotency keys for mutations**
3. **Make retry logic idempotent**
4. **Document which operations are idempotent**
5. **Test retry scenarios**

### ❌ Don't:

1. **Assume network is reliable**
2. **Increment counters without deduplication**
3. **Forget to handle partial failures**
4. **Use timestamps as idempotency keys** (clock drift!)

## Exemplo Completo

```python
from dataclasses import dataclass
from typing import Optional
import uuid

@dataclass
class PaymentRequest:
    idempotency_key: str
    from_account: str
    to_account: str
    amount: float

class PaymentService:
    def __init__(self, db, cache):
        self.db = db
        self.cache = cache

    def process_payment(self, request: PaymentRequest) -> dict:
        # 1. Validação
        if request.amount <= 0:
            raise ValueError("Amount must be positive")

        # 2. Verificar cache (rápido)
        cached_result = self.cache.get(request.idempotency_key)
        if cached_result:
            return cached_result

        # 3. Verificar DB (se cache miss)
        db_result = self.db.get_payment(request.idempotency_key)
        if db_result:
            # Atualizar cache para próxima vez
            self.cache.set(request.idempotency_key, db_result, ttl=86400)
            return db_result

        # 4. Processar pagamento (com distributed lock)
        with self.distributed_lock(request.idempotency_key):
            # Double-check após adquirir lock
            db_result = self.db.get_payment(request.idempotency_key)
            if db_result:
                return db_result

            # Executar transação
            try:
                result = self._execute_payment(request)

                # Salvar resultado
                self.db.save_payment(request.idempotency_key, result)
                self.cache.set(request.idempotency_key, result, ttl=86400)

                return result

            except Exception as e:
                # Log erro mas não salvar (permite retry)
                self.log_error(request.idempotency_key, str(e))
                raise

    def _execute_payment(self, request: PaymentRequest) -> dict:
        # Lógica de pagamento (assumido idempotente via DB constraints)
        self.db.debit(request.from_account, request.amount)
        self.db.credit(request.to_account, request.amount)

        return {
            'status': 'SUCCESS',
            'transaction_id': str(uuid.uuid4()),
            'amount': request.amount
        }

# Uso
payment_service = PaymentService(db, cache)

# Cliente pode retry sem medo
for attempt in range(3):
    try:
        result = payment_service.process_payment(PaymentRequest(
            idempotency_key='payment_xyz_123',
            from_account='account_a',
            to_account='account_b',
            amount=100.00
        ))
        print(f"Payment successful: {result}")
        break
    except Exception as e:
        print(f"Attempt {attempt + 1} failed: {e}")
        time.sleep(2 ** attempt)  # Exponential backoff
```

## Conclusão

**Idempotência** é fundamental para sistemas distribuídos confiáveis:

- ✅ Permite retries seguros
- ✅ Simplifica raciocínio sobre falhas
- ✅ Melhora resiliência do sistema

**Key Takeaway**: Sempre que projetar operações mutáveis em sistemas distribuídos, pergunte: "O que acontece se esta operação for executada duas vezes?"

## 📚 Referências e Recursos

### Documentação de APIs

- **<a href="https://stripe.com/docs/api/idempotent_requests" target="_blank" rel="noopener noreferrer">Stripe API - Idempotent Requests</a>** - Implementação de referência
- **<a href="https://developer.paypal.com/api/rest/reference/idempotency/" target="_blank" rel="noopener noreferrer">PayPal API - Idempotency</a>** - Best practices
- **<a href="https://www.twilio.com/docs/usage/api/idempotency" target="_blank" rel="noopener noreferrer">Twilio API - Idempotency</a>** - Exemplos práticos

### Artigos e Guias

- **<a href="https://www.restapitutorial.com/lessons/idempotency.html" target="_blank" rel="noopener noreferrer">Idempotence Is Not a Medical Condition</a>** - REST API Tutorial
- **<a href="https://brandur.org/idempotency-keys" target="_blank" rel="noopener noreferrer">Implementing Stripe-like Idempotency Keys</a>** - Brandur Leach
- **<a href="https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/" target="_blank" rel="noopener noreferrer">Idempotent Operations in Distributed Systems</a>** - AWS Builders Library

### Padrões

- **<a href="https://martinfowler.com/eaaDev/EventSourcing.html" target="_blank" rel="noopener noreferrer">Event Sourcing Pattern</a>** - Martin Fowler
- **<a href="https://microservices.io/patterns/data/saga.html" target="_blank" rel="noopener noreferrer">Saga Pattern</a>** - Microservices.io

---

**Próximo**: [Retries e Timeouts](retries-and-timeouts.md)
