---
id: distributed-systems-retries-timeouts
title: Retries e Timeouts
sidebar_label: Retries e Timeouts
---

## Por que Retries e Timeouts são Necessários?

Em sistemas distribuídos, falhas transitórias são **inevitáveis**:

```
Cliente → Request → [Rede] → Servidor
                      ↓
                   Timeout?
                   Perda de pacote?
                   Servidor lento?
                   Servidor caiu?
```

**Problema**: Não sabemos se foi falha permanente ou temporária.

**Solução**:

- **Timeouts**: Decidir quando desistir de esperar
- **Retries**: Tentar novamente em caso de falha

## Timeouts

### O que é Timeout?

**Timeout** é o tempo máximo de espera por uma resposta antes de considerar a operação como falha.

### Tipos de Timeout

#### 1. Connection Timeout

Tempo para **estabelecer** conexão.

```python
import requests

try:
    response = requests.get(
        'https://api.example.com',
        timeout=5  # 5 segundos para conectar + receber resposta
    )
except requests.exceptions.Timeout:
    print("Timeout!")
```

**Mais específico**:

```python
response = requests.get(
    url,
    timeout=(3, 10)  # (connection_timeout, read_timeout)
)
```

#### 2. Request Timeout

Tempo para **receber resposta completa**.

```python
# Node.js
const axios = require('axios');

axios.get('https://api.example.com', {
    timeout: 5000  // 5 segundos
})
.catch(error => {
    if (error.code === 'ECONNABORTED') {
        console.log('Request timeout!');
    }
});
```

#### 3. Idle Timeout

Tempo de **inatividade** permitido.

```python
# WebSocket com idle timeout
websocket.settimeout(30)  # Desconecta após 30s sem mensagens
```

### Escolhendo Timeout Adequado

#### Muito Curto ⚠️

```
Timeout = 100ms
Latência p99 = 150ms

Resultado: 1% das requests falham desnecessariamente
```

#### Muito Longo ⚠️

```
Timeout = 60s
Serviço realmente caiu

Resultado: Cliente fica esperando 60s inutilmente
```

#### Estratégia Adequada ✅

**Use percentis de latência**:

```
p50 latência: 50ms
p99 latência: 200ms
p99.9 latência: 500ms

Timeout recomendado: p99 + margem
Timeout = 200ms + 100ms = 300ms
```

**Ajuste dinamicamente**:

```python
class AdaptiveTimeout:
    def __init__(self, initial_timeout=1.0):
        self.timeout = initial_timeout
        self.latencies = []

    def update(self, latency):
        self.latencies.append(latency)

        # Manter últimas 100 medições
        if len(self.latencies) > 100:
            self.latencies.pop(0)

        # Timeout = p95 + 2 * desvio padrão
        p95 = percentile(self.latencies, 95)
        std = standard_deviation(self.latencies)

        self.timeout = p95 + (2 * std)

    def get_timeout(self):
        return max(0.1, min(self.timeout, 10.0))  # Entre 100ms e 10s
```

### Timeout Cascade (Efeito Cascata)

**Problema**:

```
Cliente (5s timeout)
  ↓
API Gateway (5s timeout)
  ↓
Serviço A (5s timeout)
  ↓
Serviço B (5s timeout)
  ↓
Database

Se DB demorar 5s, todos os timeouts expiram ao mesmo tempo!
```

**Solução**: Timeouts decrescentes

```
Cliente:     5s
Gateway:     4s  ← Responde mais cedo ao cliente
Serviço A:   3s
Serviço B:   2s
Database:    1s
```

### Deadline Propagation

**Passar deadline pela cadeia de chamadas**:

```python
import time

def call_service_a(deadline):
    remaining = deadline - time.time()
    if remaining <= 0:
        raise TimeoutError("Deadline exceeded")

    response = requests.get(
        service_a_url,
        timeout=remaining,
        headers={'X-Deadline': str(deadline)}
    )
    return response

# Uso
deadline = time.time() + 5  # 5s a partir de agora
result = call_service_a(deadline)
```

## Retries

### Quando Fazer Retry?

#### ✅ Retry em:

- **Erros de rede**: Connection refused, timeout
- **Erros transitórios**: 429 (Too Many Requests), 503 (Service Unavailable)
- **Timeouts**: Request pode ter sido perdido
- **Erros de disponibilidade temporária**

#### ❌ NÃO Retry em:

- **Erros de cliente**: 400 (Bad Request), 401 (Unauthorized), 404 (Not Found)
- **Erros de validação**: Dados inválidos
- **Erros de lógica de negócio**: Saldo insuficiente
- **Erros permanentes**: Serviço não existe

### Estratégias de Retry

#### 1. Immediate Retry (Imediato)

**Mais simples**: Retry imediatamente.

```python
def immediate_retry(func, max_attempts=3):
    for attempt in range(max_attempts):
        try:
            return func()
        except RetryableError as e:
            if attempt == max_attempts - 1:
                raise
            print(f"Attempt {attempt + 1} failed, retrying...")
```

**Problema**:

- Sobrecarrega servidor que pode estar lutando
- Pode causar "retry storm"

#### 2. Fixed Delay

**Espera fixa entre retries**.

```python
import time

def fixed_delay_retry(func, max_attempts=3, delay=1):
    for attempt in range(max_attempts):
        try:
            return func()
        except RetryableError as e:
            if attempt == max_attempts - 1:
                raise
            time.sleep(delay)
```

**Problema**:

- Delay muito curto → pode ainda não ter recuperado
- Delay muito longo → usuário espera demais

#### 3. Exponential Backoff ⭐ (Recomendado)

**Delay dobra a cada tentativa**.

```python
def exponential_backoff(func, max_attempts=5, base_delay=1):
    for attempt in range(max_attempts):
        try:
            return func()
        except RetryableError as e:
            if attempt == max_attempts - 1:
                raise

            delay = base_delay * (2 ** attempt)
            print(f"Retry {attempt + 1} after {delay}s")
            time.sleep(delay)

# Delays: 1s, 2s, 4s, 8s, 16s
```

**Vantagens**:

- Dá tempo para sistema se recuperar
- Reduz carga em servidor com problemas

**Com limite (capped)**:

```python
delay = min(base_delay * (2 ** attempt), max_delay)
```

#### 4. Exponential Backoff com Jitter ⭐⭐ (Mais Recomendado)

**Adiciona aleatoriedade para evitar thundering herd**.

```python
import random

def exponential_backoff_with_jitter(func, max_attempts=5, base_delay=1):
    for attempt in range(max_attempts):
        try:
            return func()
        except RetryableError as e:
            if attempt == max_attempts - 1:
                raise

            # Exponential backoff
            delay = base_delay * (2 ** attempt)

            # Full jitter: random entre 0 e delay
            delay = random.uniform(0, delay)

            print(f"Retry {attempt + 1} after {delay:.2f}s")
            time.sleep(delay)
```

**Tipos de Jitter**:

```python
# Full Jitter (recomendado)
delay = random.uniform(0, base_delay * (2 ** attempt))

# Equal Jitter
temp = base_delay * (2 ** attempt)
delay = temp / 2 + random.uniform(0, temp / 2)

# Decorrelated Jitter (usado por AWS SDK)
delay = random.uniform(base_delay, previous_delay * 3)
```

**Por que Jitter?**

```
Sem Jitter:
Cliente 1: Retry em t=1s, t=2s, t=4s
Cliente 2: Retry em t=1s, t=2s, t=4s ← mesmos tempos!
Cliente 3: Retry em t=1s, t=2s, t=4s
→ Thundering herd! Todos batem no servidor junto

Com Jitter:
Cliente 1: Retry em t=0.7s, t=1.8s, t=3.2s
Cliente 2: Retry em t=0.3s, t=2.1s, t=4.5s ← tempos distribuídos
Cliente 3: Retry em t=0.9s, t=1.2s, t=3.9s
→ Carga distribuída!
```

#### 5. Retry com Circuit Breaker

**Combina retry com circuit breaker para proteção**.

```python
from enum import Enum
import time

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED

    def call(self, func, max_retries=3):
        if self.state == CircuitState.OPEN:
            # Verificar se deve tentar recuperar
            if time.time() - self.last_failure_time > self.timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise CircuitBreakerOpen("Circuit breaker is OPEN")

        # Tentar executar com retries
        for attempt in range(max_retries):
            try:
                result = func()

                # Sucesso! Reset se estava em HALF_OPEN
                if self.state == CircuitState.HALF_OPEN:
                    self.state = CircuitState.CLOSED
                    self.failure_count = 0

                return result

            except Exception as e:
                self.failure_count += 1
                self.last_failure_time = time.time()

                # Abrir circuit breaker se muitas falhas
                if self.failure_count >= self.failure_threshold:
                    self.state = CircuitState.OPEN

                if attempt == max_retries - 1:
                    raise

                # Backoff
                time.sleep(2 ** attempt)
```

### Retry Libraries

#### Python: tenacity

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1, min=1, max=10)
)
def call_api():
    response = requests.get('https://api.example.com')
    response.raise_for_status()
    return response.json()
```

#### JavaScript: axios-retry

```javascript
const axios = require("axios");
const axiosRetry = require("axios-retry");

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response.status === 503
    );
  },
});

axios.get("https://api.example.com");
```

## Idempotência e Retries

**CRÍTICO**: Retries só são seguros se operações forem **idempotentes**!

### Problema sem Idempotência

```python
# NÃO idempotente
def increment_counter():
    counter = db.get_counter()
    db.set_counter(counter + 1)

# Com retry
retry_with_backoff(increment_counter)  # ❌ Pode incrementar múltiplas vezes!
```

### Solução com Idempotência

```python
# Idempotente com idempotency key
def increment_counter(event_id):
    if db.event_processed(event_id):
        return  # Já processado

    counter = db.get_counter()
    db.set_counter(counter + 1)
    db.mark_event_processed(event_id)

# Seguro fazer retry
retry_with_backoff(lambda: increment_counter("event_123"))  # ✅
```

## Best Practices

### 1. Sempre Configure Timeouts

```python
# ❌ Sem timeout (pode esperar forever)
response = requests.get(url)

# ✅ Com timeout
response = requests.get(url, timeout=5)
```

### 2. Use Exponential Backoff com Jitter

```python
# ❌ Fixed delay
time.sleep(1)

# ✅ Exponential backoff com jitter
delay = random.uniform(0, min(2 ** attempt, 60))
time.sleep(delay)
```

### 3. Limite Número de Retries

```python
# ❌ Retry infinito
while True:
    try:
        return func()
    except:
        continue

# ✅ Máximo de retries
max_attempts = 5
```

### 4. Classifique Erros

```python
class RetryableError(Exception):
    pass

class NonRetryableError(Exception):
    pass

try:
    response = requests.get(url)
    if response.status_code == 503:
        raise RetryableError()
    elif response.status_code == 400:
        raise NonRetryableError()
except RetryableError:
    # Retry
    pass
except NonRetryableError:
    # Não retry, logar e retornar erro
    pass
```

### 5. Log Retries

```python
logger.warning(f"Retry attempt {attempt + 1}/{max_attempts}", extra={
    'function': func.__name__,
    'error': str(e),
    'delay': delay
})
```

### 6. Monitore Taxa de Retry

```
Métrica importante:
retry_rate = (total_retries / total_requests) * 100

Se retry_rate > 10%, investigar!
```

## Retry Storm Protection

### O que é Retry Storm?

```
100 clientes fazem request
Servidor fica lento/cai
100 clientes fazem retry
    → 200 requests agora! (100 originais + 100 retries)
Servidor fica mais sobrecarregado
100 clientes fazem segundo retry
    → 300 requests!
...
CASCATA DE FALHAS
```

### Proteções

#### 1. Rate Limiting do Cliente

```python
from threading import Semaphore

class RateLimiter:
    def __init__(self, max_concurrent=10):
        self.semaphore = Semaphore(max_concurrent)

    def call(self, func):
        with self.semaphore:  # Limita concorrência
            return func()
```

#### 2. Adaptive Retry

```python
# Reduzir max_attempts se taxa de erro está alta
if error_rate > 0.5:  # 50% de erro
    max_attempts = 2  # Menos retries
else:
    max_attempts = 5
```

#### 3. Server-Side: Retry-After Header

```python
# Servidor retorna quando cliente pode tentar novamente
return Response(
    "Service Unavailable",
    status=503,
    headers={'Retry-After': '60'}  # Tentar após 60 segundos
)

# Cliente respeita header
if response.status_code == 503:
    retry_after = int(response.headers.get('Retry-After', 60))
    time.sleep(retry_after)
```

## Exemplo Completo: Resilient HTTP Client

```python
import requests
import time
import random
import logging
from enum import Enum
from typing import Callable, Any

logger = logging.getLogger(__name__)

class ErrorType(Enum):
    RETRYABLE = "retryable"
    NON_RETRYABLE = "non_retryable"

class ResilientClient:
    def __init__(
        self,
        max_attempts=5,
        base_delay=1,
        max_delay=60,
        timeout=10
    ):
        self.max_attempts = max_attempts
        self.base_delay = base_delay
        self.max_delay = max_delay
        self.timeout = timeout

    def _classify_error(self, error) -> ErrorType:
        """Classifica se erro é retryable"""
        if isinstance(error, requests.exceptions.Timeout):
            return ErrorType.RETRYABLE

        if isinstance(error, requests.exceptions.ConnectionError):
            return ErrorType.RETRYABLE

        if isinstance(error, requests.exceptions.HTTPError):
            status = error.response.status_code
            if status in [429, 503, 504]:  # Too Many Requests, Service Unavailable, Gateway Timeout
                return ErrorType.RETRYABLE
            elif status >= 500:
                return ErrorType.RETRYABLE

        return ErrorType.NON_RETRYABLE

    def _calculate_delay(self, attempt: int) -> float:
        """Exponential backoff com full jitter"""
        max_delay_for_attempt = min(
            self.base_delay * (2 ** attempt),
            self.max_delay
        )
        return random.uniform(0, max_delay_for_attempt)

    def get(self, url: str, **kwargs) -> requests.Response:
        """GET com retry automático"""
        last_exception = None

        for attempt in range(self.max_attempts):
            try:
                logger.info(f"Attempt {attempt + 1}/{self.max_attempts}: GET {url}")

                response = requests.get(
                    url,
                    timeout=self.timeout,
                    **kwargs
                )

                # Raise para status 4xx/5xx
                response.raise_for_status()

                logger.info(f"Success: GET {url}")
                return response

            except requests.exceptions.RequestException as e:
                last_exception = e
                error_type = self._classify_error(e)

                logger.warning(
                    f"Attempt {attempt + 1} failed: {str(e)}",
                    extra={'error_type': error_type.value}
                )

                # Não retry se não é retryable
                if error_type == ErrorType.NON_RETRYABLE:
                    logger.error(f"Non-retryable error, giving up")
                    raise

                # Última tentativa
                if attempt == self.max_attempts - 1:
                    logger.error(f"Max attempts reached, giving up")
                    raise

                # Calcular delay e esperar
                delay = self._calculate_delay(attempt)
                logger.info(f"Retrying after {delay:.2f}s...")
                time.sleep(delay)

        # Nunca deve chegar aqui, mas por segurança
        raise last_exception

# Uso
client = ResilientClient(
    max_attempts=5,
    base_delay=1,
    max_delay=60,
    timeout=10
)

try:
    response = client.get('https://api.example.com/data')
    data = response.json()
except requests.exceptions.RequestException as e:
    logger.error(f"Request failed after all retries: {e}")
```

## Conclusão

**Retries** e **Timeouts** são essenciais para resiliência, mas devem ser usados com cuidado:

✅ **Do**:

- Configure timeouts sempre
- Use exponential backoff com jitter
- Implemente idempotência
- Classifique erros (retryable vs não)
- Monitore taxa de retry

❌ **Don't**:

- Retry infinito
- Fixed delay sem jitter
- Retry em erros de cliente (4xx)
- Esquecer de timeouts
- Retry sem idempotência

## 📚 Referências e Recursos

### Papers e Artigos

- **<a href="https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/" target="_blank" rel="noopener noreferrer">Exponential Backoff And Jitter</a>** - AWS Architecture Blog
- **<a href="https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/" target="_blank" rel="noopener noreferrer">Timeouts, Retries and Backoff with Jitter</a>** - AWS Builders Library
- **<a href="https://brooker.co.za/blog/2022/02/28/retries.html" target="_blank" rel="noopener noreferrer">The Problem with Retries</a>** - Marc Brooker (AWS)

### Bibliotecas

- **<a href="https://tenacity.readthedocs.io/" target="_blank" rel="noopener noreferrer">Tenacity (Python)</a>** - Retry library com múltiplas estratégias
- **<a href="https://github.com/App-vNext/Polly" target="_blank" rel="noopener noreferrer">Polly (.NET)</a>** - Resilience and transient-fault-handling
- **<a href="https://resilience4j.readme.io/" target="_blank" rel="noopener noreferrer">resilience4j (Java)</a>** - Fault tolerance library
- **<a href="https://github.com/softonic/axios-retry" target="_blank" rel="noopener noreferrer">axios-retry (JavaScript)</a>** - HTTP client retry plugin

### Guias Práticos

- **<a href="https://cloud.google.com/apis/design/errors#error_retries" target="_blank" rel="noopener noreferrer">Google Cloud Retry Strategy</a>** - API Design Guide
- **<a href="https://learn.microsoft.com/en-us/azure/architecture/best-practices/retry-service-specific" target="_blank" rel="noopener noreferrer">Microsoft Azure Retry Guidance</a>** - Service-specific guidance

---

**Próximo**: [Eleição de Líder](leader-election.md)
