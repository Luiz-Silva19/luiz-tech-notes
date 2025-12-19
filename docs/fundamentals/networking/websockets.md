---
id: networking-websockets
title: WebSockets - Comunicação Bidirecional em Tempo Real
sidebar_label: WebSockets
---

**WebSockets** é um protocolo de comunicação que fornece canais de comunicação full-duplex (bidirecional) sobre uma única conexão TCP, permitindo comunicação em tempo real entre cliente e servidor.

**Analogia**: HTTP é como correio (envia carta, aguarda resposta), WebSocket é ligação telefônica (linha aberta, ambos falam a qualquer momento, servidor pode avisar cliente proativamente). Chat via HTTP = enviar carta por mensagem; via WebSocket = ligação aberta.

## WebSockets vs HTTP

### HTTP (Request-Response)

```
Cliente                          Servidor
   |                                |
   |------ Request ---------------->|
   |<----- Response ----------------|
   |                                |
   |------ Request ---------------->|
   |<----- Response ----------------|
   |                                |

❌ Cliente sempre inicia
❌ Overhead de headers a cada request
❌ Não é tempo real
```

### WebSockets (Full-Duplex)

```
Cliente                          Servidor
   |                                |
   |------ Handshake -------------->|
   |<----- Upgrade -----------------|
   |                                |
   |====== Conexão Persistente =====|
   |                                |
   |<------ Mensagem ---------------|
   |------ Mensagem --------------->|
   |<------ Mensagem ---------------|
   |------ Mensagem --------------->|
   |                                |

✅ Comunicação bidirecional
✅ Baixo overhead
✅ Tempo real
✅ Servidor pode enviar dados proativamente
```

## Como Funciona

### 1. WebSocket Handshake (HTTP Upgrade)

**Cliente envia requisição HTTP:**

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: http://example.com
```

**Servidor responde:**

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### 2. Conexão WebSocket Estabelecida

Após handshake bem-sucedido:

```
✅ Protocolo mudou de HTTP para WebSocket
✅ Conexão TCP mantida aberta
✅ Dados podem fluir em ambas direções
✅ Frames WebSocket ao invés de HTTP
```

## Estrutura do Frame WebSocket

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```

### Campos Importantes

**FIN (1 bit)**: Indica se é o frame final  
**Opcode (4 bits)**: Tipo de frame

- `0x0`: Continuation
- `0x1`: Text
- `0x2`: Binary
- `0x8`: Close
- `0x9`: Ping
- `0xA`: Pong

**MASK (1 bit)**: Dados mascarados (cliente → servidor)  
**Payload Length**: Tamanho dos dados

## Implementação - Cliente

### JavaScript (Browser)

```javascript
// Criar conexão WebSocket
const ws = new WebSocket("ws://localhost:8080/chat");

// Evento: Conexão aberta
ws.onopen = (event) => {
  console.log("Conectado ao servidor");
  ws.send("Olá, servidor!");
};

// Evento: Mensagem recebida
ws.onmessage = (event) => {
  console.log("Mensagem do servidor:", event.data);

  // Se for JSON
  try {
    const data = JSON.parse(event.data);
    console.log("Dados:", data);
  } catch (e) {
    console.log("Texto:", event.data);
  }
};

// Evento: Erro
ws.onerror = (error) => {
  console.error("Erro WebSocket:", error);
};

// Evento: Conexão fechada
ws.onclose = (event) => {
  console.log("Conexão fechada:", event.code, event.reason);

  if (event.wasClean) {
    console.log("Fechamento limpo");
  } else {
    console.log("Conexão morta");
  }
};

// Enviar mensagem
function sendMessage(message) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  } else {
    console.error("WebSocket não está aberto");
  }
}

// Enviar JSON
function sendJSON(obj) {
  ws.send(JSON.stringify(obj));
}

// Fechar conexão
function closeConnection() {
  ws.close(1000, "Fechamento normal");
}
```

### Estados do WebSocket

```javascript
// Verificar estado
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    console.log("Conectando...");
    break;
  case WebSocket.OPEN:
    console.log("Aberto");
    break;
  case WebSocket.CLOSING:
    console.log("Fechando...");
    break;
  case WebSocket.CLOSED:
    console.log("Fechado");
    break;
}
```

## Implementação - Servidor

### Node.js (ws library)

```javascript
const WebSocket = require("ws");

// Criar servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

console.log("Servidor WebSocket rodando na porta 8080");

// Evento: Nova conexão
wss.on("connection", (ws, req) => {
  console.log("Novo cliente conectado");
  console.log("IP:", req.socket.remoteAddress);

  // Enviar mensagem de boas-vindas
  ws.send("Bem-vindo ao servidor WebSocket!");

  // Evento: Mensagem recebida
  ws.on("message", (message) => {
    console.log("Recebido:", message.toString());

    // Echo de volta
    ws.send(`Echo: ${message}`);

    // Broadcast para todos (exceto remetente)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // Evento: Ping/Pong (heartbeat)
  ws.on("pong", () => {
    console.log("Pong recebido");
  });

  // Evento: Erro
  ws.on("error", (error) => {
    console.error("Erro:", error);
  });

  // Evento: Conexão fechada
  ws.on("close", (code, reason) => {
    console.log("Cliente desconectado:", code, reason.toString());
  });
});

// Broadcast para todos os clientes
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Heartbeat (detectar conexões mortas)
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();
  });
}, 30000); // A cada 30 segundos

wss.on("close", () => {
  clearInterval(interval);
});
```

### Python (websockets library)

```python
import asyncio
import websockets
import json

# Clientes conectados
clients = set()

async def handler(websocket, path):
    # Registrar cliente
    clients.add(websocket)
    print(f"Cliente conectado. Total: {len(clients)}")

    try:
        # Enviar mensagem de boas-vindas
        await websocket.send("Bem-vindo ao servidor!")

        # Loop de mensagens
        async for message in websocket:
            print(f"Recebido: {message}")

            # Parse JSON se possível
            try:
                data = json.loads(message)
                response = {"type": "echo", "data": data}
                await websocket.send(json.dumps(response))
            except json.JSONDecodeError:
                await websocket.send(f"Echo: {message}")

            # Broadcast para todos
            websockets.broadcast(clients, message)

    except websockets.exceptions.ConnectionClosed:
        print("Conexão fechada")
    finally:
        # Remover cliente
        clients.remove(websocket)
        print(f"Cliente desconectado. Total: {len(clients)}")

# Iniciar servidor
async def main():
    async with websockets.serve(handler, "localhost", 8080):
        print("Servidor WebSocket rodando na porta 8080")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
```

## Casos de Uso

### 💬 Chat em Tempo Real

```javascript
// Cliente
const chat = new WebSocket("ws://chat.example.com");

chat.onmessage = (event) => {
  const message = JSON.parse(event.data);
  displayMessage(message.user, message.text);
};

function sendChatMessage(text) {
  chat.send(
    JSON.stringify({
      type: "message",
      user: "João",
      text: text,
      timestamp: Date.now(),
    })
  );
}
```

### 📊 Dashboard em Tempo Real

```javascript
// Servidor envia atualizações de métricas
setInterval(() => {
  const metrics = {
    cpu: getCPUUsage(),
    memory: getMemoryUsage(),
    requests: getRequestCount(),
  };

  broadcast(JSON.stringify(metrics));
}, 1000);

// Cliente atualiza dashboard
ws.onmessage = (event) => {
  const metrics = JSON.parse(event.data);
  updateDashboard(metrics);
};
```

### 🎮 Jogos Multiplayer

```javascript
// Servidor gerencia estado do jogo
const gameState = {
  players: {},
  items: [],
};

wss.on("connection", (ws) => {
  const playerId = generateId();
  gameState.players[playerId] = { x: 0, y: 0 };

  ws.on("message", (data) => {
    const action = JSON.parse(data);

    if (action.type === "move") {
      gameState.players[playerId].x = action.x;
      gameState.players[playerId].y = action.y;

      // Broadcast estado para todos
      broadcast(JSON.stringify(gameState));
    }
  });
});
```

### 📈 Trading/Financial Data

```javascript
// Servidor envia atualizações de preços
priceStream.on("update", (symbol, price) => {
  const update = {
    symbol,
    price,
    timestamp: Date.now(),
  };

  broadcast(JSON.stringify(update));
});

// Cliente atualiza ticker
ws.onmessage = (event) => {
  const { symbol, price } = JSON.parse(event.data);
  updatePriceTicker(symbol, price);
};
```

### 🔔 Notificações Push

```javascript
// Servidor envia notificação
function sendNotification(userId, notification) {
  const ws = getUserWebSocket(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "notification",
        title: notification.title,
        body: notification.body,
        timestamp: Date.now(),
      })
    );
  }
}

// Cliente exibe notificação
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === "notification") {
    showNotification(msg.title, msg.body);
  }
};
```

## WebSocket Seguro (WSS)

### WSS = WebSocket + TLS/SSL

```javascript
// Cliente (HTTPS requer WSS)
const ws = new WebSocket("wss://secure.example.com/chat");

// Servidor Node.js com HTTPS
const https = require("https");
const fs = require("fs");
const WebSocket = require("ws");

const server = https.createServer({
  cert: fs.readFileSync("/path/to/cert.pem"),
  key: fs.readFileSync("/path/to/key.pem"),
});

const wss = new WebSocket.Server({ server });

server.listen(8080);
```

### Nginx como Proxy WSS

```nginx
server {
    listen 443 ssl http2;
    server_name ws.example.com;

    ssl_certificate /etc/letsencrypt/live/ws.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ws.example.com/privkey.pem;

    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}
```

## Heartbeat / Keep-Alive

### Cliente

```javascript
let heartbeatInterval;

ws.onopen = () => {
  // Enviar ping a cada 30 segundos
  heartbeatInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "ping" }));
    }
  }, 30000);
};

ws.onclose = () => {
  clearInterval(heartbeatInterval);
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === "pong") {
    console.log("Servidor está vivo");
  }
};
```

### Servidor

```javascript
wss.on("connection", (ws) => {
  ws.isAlive = true;

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("message", (data) => {
    const msg = JSON.parse(data);
    if (msg.type === "ping") {
      ws.send(JSON.stringify({ type: "pong" }));
    }
  });
});

// Verificar conexões a cada 30s
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);
```

## Reconexão Automática

```javascript
class ReconnectingWebSocket {
  constructor(url, options = {}) {
    this.url = url;
    this.reconnectDelay = options.reconnectDelay || 1000;
    this.maxReconnectDelay = options.maxReconnectDelay || 30000;
    this.reconnectAttempts = 0;
    this.shouldReconnect = true;

    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = (event) => {
      console.log("Conectado");
      this.reconnectAttempts = 0;
      this.onopen && this.onopen(event);
    };

    this.ws.onmessage = (event) => {
      this.onmessage && this.onmessage(event);
    };

    this.ws.onerror = (error) => {
      console.error("Erro WebSocket:", error);
      this.onerror && this.onerror(error);
    };

    this.ws.onclose = (event) => {
      console.log("Desconectado");
      this.onclose && this.onclose(event);

      if (this.shouldReconnect) {
        this.reconnect();
      }
    };
  }

  reconnect() {
    this.reconnectAttempts++;
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts),
      this.maxReconnectDelay
    );

    console.log(`Reconectando em ${delay}ms...`);

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.error("WebSocket não está aberto");
    }
  }

  close() {
    this.shouldReconnect = false;
    this.ws.close();
  }
}

// Uso
const rws = new ReconnectingWebSocket("ws://localhost:8080");
rws.onmessage = (event) => console.log(event.data);
rws.send("Hello!");
```

## Alternativas ao WebSocket

### Server-Sent Events (SSE)

```javascript
// Apenas servidor → cliente
const eventSource = new EventSource("/events");

eventSource.onmessage = (event) => {
  console.log(event.data);
};

// ✅ Mais simples
// ✅ Reconexão automática
// ❌ Apenas unidirecional
// ❌ Apenas texto
```

### Long Polling

```javascript
// HTTP tradicional com polling longo
async function longPoll() {
  const response = await fetch("/poll");
  const data = await response.json();

  handleData(data);
  longPoll(); // Próximo poll
}

// ❌ Overhead de HTTP
// ❌ Mais latência
// ✅ Funciona em qualquer lugar
```

### Socket.IO

```javascript
// Biblioteca sobre WebSocket com fallbacks
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado");
});

socket.on("message", (data) => {
  console.log(data);
});

socket.emit("message", "Hello!");

// ✅ Reconexão automática
// ✅ Fallback para polling
// ✅ Rooms e namespaces
// ❌ Overhead adicional
```

## Boas Práticas

✅ **Use WSS em produção** (WebSocket Seguro)  
✅ **Implemente heartbeat** para detectar conexões mortas  
✅ **Reconexão automática** com backoff exponencial  
✅ **Valide e sanitize** mensagens do cliente  
✅ **Implemente autenticação** (token no handshake ou primeira mensagem)  
✅ **Rate limiting** para prevenir abuse  
✅ **Comprima mensagens** grandes (JSON)  
✅ **Use binário** para dados que não são texto  
✅ **Monitore conexões** abertas  
✅ **Feche conexões idle** após timeout  
✅ **Use load balancer** com sticky sessions  
✅ **Implemente graceful shutdown**

## Troubleshooting

### Conexão não abre

```javascript
ws.onerror = (error) => {
  console.error("Erro:", error);
  // Verificar:
  // - URL correto (ws:// ou wss://)
  // - Servidor rodando
  // - Firewall/proxy
  // - CORS (se cross-origin)
};
```

### Mensagens não chegam

```javascript
// Verificar readyState
if (ws.readyState !== WebSocket.OPEN) {
  console.error("WebSocket não está aberto");
}

// Buffering
const messageQueue = [];

function sendMessage(msg) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(msg);
  } else {
    messageQueue.push(msg);
  }
}

ws.onopen = () => {
  messageQueue.forEach((msg) => ws.send(msg));
  messageQueue.length = 0;
};
```

### Conexão cai frequentemente

```javascript
// Implemente reconexão automática
// Verifique heartbeat
// Aumente timeouts no proxy/load balancer
```

## Limitações

❌ **Sem HTTP/2 multiplexing** - Uma conexão TCP por WebSocket  
❌ **Sem caching** - Cada mensagem é única  
❌ **Stateful** - Servidor precisa manter conexões  
❌ **Scaling complexo** - Precisa sticky sessions ou Redis pub/sub  
❌ **Firewall/proxy** podem bloquear

## Pontos de Atenção

💡 **Certificações e Provas:**

- **WebSocket = HTTP Upgrade**: Começa como HTTP, depois "upgrade" para WebSocket
- **Protocolo**: `ws://` (inseguro) ou `wss://` (seguro - obrigatório se site é HTTPS)
- **Porta**: Mesmas do HTTP - 80 (ws) ou 443 (wss)
- **Full-Duplex**: Comunicação bidirecional simultânea
- **Handshake**: Cliente envia `Upgrade: websocket`, servidor responde `101 Switching Protocols`
- **Estados**: CONNECTING → OPEN → CLOSING → CLOSED
- **Frames**: Após handshake, usa frames WebSocket (não mais HTTP)

⚠️ **Pegadinhas Comuns:**

- **WebSocket ≠ Socket.IO**: Socket.IO é biblioteca sobre WebSocket com fallbacks
- **Stateful**: Servidor precisa manter conexões abertas (escalabilidade complexa)
- **Load Balancer**: Precisa sticky sessions (mesma conexão = mesmo servidor)
- **Proxy/Firewall**: Podem bloquear ou timeout conexões longas
  - Nginx: aumentar `proxy_read_timeout` e `proxy_send_timeout`
- **Heartbeat obrigatório**: Implementar ping/pong para detectar conexões mortas
- **Reconexão**: Implementar retry com backoff exponencial
- **HTTPS → WSS obrigatório**: Página HTTPS não aceita ws:// (mixed content)
- **Alternativas**: SSE (Server-Sent Events) = apenas servidor→cliente, mais simples

**Quando usar WebSocket**:

- ✅ Chat, gaming, dashboards real-time, trading
- ✅ Dados que mudam frequentemente
- ❌ Request-response simples (use HTTP)
- ❌ Apenas servidor→cliente (use SSE)

## Recursos

- [RFC 6455 - WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)
- [MDN - WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [ws - Node.js WebSocket library](https://github.com/websockets/ws)
- [Socket.IO](https://socket.io/)
- [Can I Use - WebSocket](https://caniuse.com/websockets)
