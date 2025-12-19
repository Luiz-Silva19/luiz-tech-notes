---
id: networking-http
title: HTTP - Hypertext Transfer Protocol
sidebar_label: HTTP
---

**HTTP** (Hypertext Transfer Protocol) é o protocolo de aplicação fundamental da World Wide Web, usado para transferir documentos hipermídia.

## Características Principais

✅ **Stateless**: Cada requisição é independente  
✅ **Text-based**: Headers são legíveis por humanos  
✅ **Request-Response**: Modelo cliente-servidor  
✅ **Extensível**: Headers customizados  
✅ **Porta padrão**: 80  
❌ **Não criptografado**: Dados trafegam em texto plano

## Versões do HTTP

### HTTP/0.9 (1991)

```http
GET /index.html
```

- Apenas GET
- Sem headers
- Apenas HTML

### HTTP/1.0 (1996)

```http
GET /index.html HTTP/1.0
Host: www.example.com
```

- Headers
- POST, HEAD
- Status codes
- Uma conexão por requisição

### HTTP/1.1 (1997)

```http
GET /index.html HTTP/1.1
Host: www.example.com
Connection: keep-alive
```

- **Persistent connections**
- **Pipelining**
- Chunked transfer
- Cache control

### HTTP/2 (2015)

- **Multiplexação**: Múltiplas requisições na mesma conexão
- **Server Push**: Servidor envia recursos proativamente
- **Compressão de headers**: HPACK
- **Binário**: Não mais texto plano

### HTTP/3 (2022)

- **QUIC sobre UDP**: Mais rápido que TCP
- **0-RTT**: Conexão sem latência
- **Multiplexação sem head-of-line blocking**

## Estrutura de uma Requisição HTTP

```http
GET /api/users/123 HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer eyJ0eXAi...
Content-Type: application/json
Content-Length: 45

{"name": "João", "email": "joao@example.com"}
```

### Componentes

**Linha de Requisição**:

```
MÉTODO /caminho/recurso HTTP/VERSÃO
```

**Headers**:

```
Nome-Header: valor
```

**Linha em branco**

**Body** (opcional):

```json
{ dados }
```

## Métodos HTTP

### GET

Obter recurso:

```http
GET /api/users/123 HTTP/1.1
Host: api.example.com
```

**Características**:

- ✅ Idempotente
- ✅ Cacheable
- ✅ Safe (não modifica)
- ❌ Sem body

### POST

Criar recurso:

```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Maria",
  "email": "maria@example.com"
}
```

**Características**:

- ❌ Não idempotente
- ❌ Não cacheable
- ✅ Com body

### PUT

Atualizar/substituir recurso completo:

```http
PUT /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "age": 30
}
```

**Características**:

- ✅ Idempotente
- ✅ Substitui completamente

### PATCH

Atualização parcial:

```http
PATCH /api/users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "email": "novo@example.com"
}
```

**Características**:

- ❌ Não necessariamente idempotente
- ✅ Atualiza parcialmente

### DELETE

Remover recurso:

```http
DELETE /api/users/123 HTTP/1.1
Host: api.example.com
```

**Características**:

- ✅ Idempotente
- ❌ Não safe

### HEAD

Igual GET, mas sem body:

```http
HEAD /api/users/123 HTTP/1.1
Host: api.example.com
```

**Uso**: Verificar existência, tamanho, última modificação

### OPTIONS

Descobrir métodos permitidos:

```http
OPTIONS /api/users HTTP/1.1
Host: api.example.com
```

**Resposta**:

```http
HTTP/1.1 200 OK
Allow: GET, POST, PUT, DELETE
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

## Status Codes

### 1xx - Informational

```
100 Continue
101 Switching Protocols
```

### 2xx - Success

```
200 OK                  - Sucesso geral
201 Created            - Recurso criado
202 Accepted           - Aceito, processando
204 No Content         - Sucesso sem body
206 Partial Content    - Range request
```

### 3xx - Redirection

```
301 Moved Permanently  - Redirecionamento permanente
302 Found              - Redirecionamento temporário
304 Not Modified       - Cache ainda válido
307 Temporary Redirect - Mantém método original
308 Permanent Redirect - Mantém método original
```

### 4xx - Client Error

```
400 Bad Request        - Requisição inválida
401 Unauthorized       - Não autenticado
403 Forbidden          - Não autorizado
404 Not Found          - Recurso não existe
405 Method Not Allowed - Método não suportado
408 Request Timeout    - Timeout
409 Conflict           - Conflito de estado
422 Unprocessable      - Validação falhou
429 Too Many Requests  - Rate limit
```

### 5xx - Server Error

```
500 Internal Server Error - Erro genérico
501 Not Implemented       - Não suportado
502 Bad Gateway           - Gateway inválido
503 Service Unavailable   - Servidor indisponível
504 Gateway Timeout       - Timeout do gateway
```

## Headers Importantes

### Request Headers

**Host** (obrigatório):

```http
Host: api.example.com
```

**User-Agent**:

```http
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
```

**Accept**:

```http
Accept: application/json
Accept: text/html, application/xml;q=0.9, */*;q=0.8
```

**Authorization**:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Authorization: Basic dXNlcjpwYXNz
```

**Content-Type**:

```http
Content-Type: application/json
Content-Type: application/x-www-form-urlencoded
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
```

**Cookie**:

```http
Cookie: sessionId=abc123; userId=456
```

### Response Headers

**Content-Type**:

```http
Content-Type: application/json; charset=utf-8
```

**Content-Length**:

```http
Content-Length: 1234
```

**Set-Cookie**:

```http
Set-Cookie: sessionId=xyz789; Path=/; HttpOnly; Secure; SameSite=Strict
```

**Cache-Control**:

```http
Cache-Control: max-age=3600, public
Cache-Control: no-cache, no-store, must-revalidate
```

**Location** (redirecionamentos):

```http
Location: https://www.example.com/new-location
```

**ETag**:

```http
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

## Content Negotiation

### Accept

Cliente especifica formato preferido:

```http
GET /api/users/123 HTTP/1.1
Accept: application/json

GET /api/users/123 HTTP/1.1
Accept: application/xml
```

### Content-Type

Servidor responde no formato solicitado:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id": 123, "name": "João"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/xml

<user><id>123</id><name>João</name></user>
```

## Cookies e Sessões

### Set-Cookie (Servidor → Cliente)

```http
HTTP/1.1 200 OK
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure
Set-Cookie: userId=456; Max-Age=3600; SameSite=Lax
```

### Cookie (Cliente → Servidor)

```http
GET /api/profile HTTP/1.1
Host: api.example.com
Cookie: sessionId=abc123; userId=456
```

### Atributos de Cookie

**HttpOnly**: Não acessível via JavaScript

```
Set-Cookie: token=xyz; HttpOnly
```

**Secure**: Apenas HTTPS

```
Set-Cookie: token=xyz; Secure
```

**SameSite**: Proteção contra CSRF

```
Set-Cookie: token=xyz; SameSite=Strict
```

**Max-Age**: Tempo de vida em segundos

```
Set-Cookie: token=xyz; Max-Age=86400
```

**Domain e Path**:

```
Set-Cookie: token=xyz; Domain=.example.com; Path=/api
```

## Caching

### Cache-Control

**Público (pode ser cacheado por qualquer cache)**:

```http
Cache-Control: public, max-age=31536000
```

**Privado (apenas browser)**:

```http
Cache-Control: private, max-age=3600
```

**Sem cache**:

```http
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

### ETag e If-None-Match

**Primeira requisição**:

```http
GET /api/users/123 HTTP/1.1

HTTP/1.1 200 OK
ETag: "abc123"

{"id": 123, "name": "João"}
```

**Requisição subsequente**:

```http
GET /api/users/123 HTTP/1.1
If-None-Match: "abc123"

HTTP/1.1 304 Not Modified
```

## Autenticação

### Basic Auth

```http
GET /api/users HTTP/1.1
Authorization: Basic dXNlcjpwYXNz

# Base64 encode de "user:pass"
```

### Bearer Token (JWT)

```http
GET /api/users HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### API Key

```http
GET /api/users HTTP/1.1
X-API-Key: your-api-key-here
```

## CORS (Cross-Origin Resource Sharing)

### Preflight Request (OPTIONS)

```http
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://www.frontend.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
```

### Preflight Response

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://www.frontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### Actual Request

```http
POST /api/users HTTP/1.1
Host: api.example.com
Origin: https://www.frontend.com
Content-Type: application/json

{"name": "João"}
```

### Response with CORS

```http
HTTP/1.1 201 Created
Access-Control-Allow-Origin: https://www.frontend.com
Content-Type: application/json

{"id": 123, "name": "João"}
```

## Exemplos Práticos

### cURL

```bash
# GET simples
curl https://api.example.com/users

# GET com headers
curl -H "Authorization: Bearer token123" \
     https://api.example.com/users

# POST com JSON
curl -X POST https://api.example.com/users \
     -H "Content-Type: application/json" \
     -d '{"name":"João","email":"joao@example.com"}'

# PUT
curl -X PUT https://api.example.com/users/123 \
     -H "Content-Type: application/json" \
     -d '{"name":"João Silva"}'

# DELETE
curl -X DELETE https://api.example.com/users/123

# Ver headers da resposta
curl -I https://api.example.com/users

# Verbose (debug)
curl -v https://api.example.com/users
```

### Python (requests)

```python
import requests

# GET
response = requests.get('https://api.example.com/users/123')
print(response.json())

# POST
data = {'name': 'João', 'email': 'joao@example.com'}
response = requests.post('https://api.example.com/users', json=data)

# Com headers
headers = {'Authorization': 'Bearer token123'}
response = requests.get('https://api.example.com/users', headers=headers)

# PUT
response = requests.put('https://api.example.com/users/123', json=data)

# DELETE
response = requests.delete('https://api.example.com/users/123')

# Status code
if response.status_code == 200:
    print("Sucesso!")
```

### JavaScript (fetch)

```javascript
// GET
fetch("https://api.example.com/users/123")
  .then((res) => res.json())
  .then((data) => console.log(data));

// POST
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token123",
  },
  body: JSON.stringify({
    name: "João",
    email: "joao@example.com",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

// Async/await
async function getUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  const data = await response.json();
  return data;
}
```

## HTTP/2 vs HTTP/1.1

### HTTP/1.1

```
Conexão 1: GET /style.css
Aguarda resposta...
Conexão 2: GET /script.js
Aguarda resposta...
Conexão 3: GET /image.png
```

### HTTP/2

```
Conexão única:
Stream 1: GET /style.css
Stream 3: GET /script.js
Stream 5: GET /image.png
(todas simultaneamente)
```

## Boas Práticas

✅ **Use HTTPS** sempre que possível  
✅ **Implemente cache** apropriado  
✅ **Use ETags** para validação de cache  
✅ **Comprima respostas** (gzip, brotli)  
✅ **Use HTTP/2 ou HTTP/3** para melhor performance  
✅ **Implemente rate limiting** para proteção  
✅ **Use status codes corretos** para clareza  
✅ **Valide Content-Type** antes de processar  
✅ **Configure CORS** adequadamente  
✅ **Use keep-alive** para conexões persistentes

## Recursos

- [MDN - HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP)
- [RFC 7230-7235 - HTTP/1.1](https://tools.ietf.org/html/rfc7230)
- [RFC 7540 - HTTP/2](https://tools.ietf.org/html/rfc7540)
- [HTTP/3 Explained](https://http3-explained.haxx.se/)
