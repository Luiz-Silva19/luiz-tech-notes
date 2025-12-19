---
id: networking-udp
title: UDP - User Datagram Protocol
sidebar_label: UDP
---

**UDP** (User Datagram Protocol) é um protocolo de transporte sem conexão que prioriza velocidade e baixo overhead sobre confiabilidade.

## Características Principais

✅ **Rápido**: Sem overhead de confiabilidade  
✅ **Baixa latência**: Sem handshakes ou acknowledgments  
✅ **Simples**: Header pequeno (8 bytes)  
✅ **Broadcast/Multicast**: Suporta envio para múltiplos destinos  
❌ **Não confiável**: Sem garantia de entrega  
❌ **Sem ordenação**: Pacotes podem chegar fora de ordem  
❌ **Sem controle de fluxo**: Pode sobrecarregar receptor

## Estrutura do Header UDP

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                          Data ...                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### Campos do Header

**Source Port** (16 bits)

- Porta da aplicação que está enviando
- Opcional (pode ser 0)

**Destination Port** (16 bits)

- Porta da aplicação destino
- Obrigatório

**Length** (16 bits)

- Tamanho total do datagrama (header + dados)
- Mínimo: 8 bytes

**Checksum** (16 bits)

- Verificação de integridade
- Opcional em IPv4, obrigatório em IPv6

## Como Funciona UDP

### Comunicação Simples

```
Cliente                          Servidor
   |                                |
   |------ Datagrama 1 ----------->|
   |------ Datagrama 2 ----------->|
   |------ Datagrama 3 ----------->|
   |                                |
   | Sem confirmação               |
   | Sem ordenação garantida       |
```

### Com Perda de Pacotes

```
Cliente                          Servidor
   |                                |
   |------ Pacote 1 --------------->|
   |------ Pacote 2 -------X        | (perdido)
   |------ Pacote 3 --------------->|
   |                                |
   | Pacote 2 perdido              |
   | Aplicação precisa lidar       |
```

## UDP vs TCP

| Característica    | UDP              | TCP                    |
| ----------------- | ---------------- | ---------------------- |
| Conexão           | ❌ Sem conexão   | ✅ Orientado a conexão |
| Confiabilidade    | ❌ Não garantida | ✅ Garantida           |
| Ordenação         | ❌ Não           | ✅ Sim                 |
| Controle de fluxo | ❌ Não           | ✅ Sim                 |
| Retransmissão     | ❌ Não           | ✅ Automática          |
| Header            | 8 bytes          | 20-60 bytes            |
| Velocidade        | ⚡ Muito rápido  | 🐢 Mais lento          |
| Latência          | 🎯 Baixa         | ⏱️ Maior               |
| Broadcast         | ✅ Suporta       | ❌ Não suporta         |

## Casos de Uso Ideais

### 🎮 Gaming Online

```
Por que UDP?
- Latência baixa é crítica
- Posições antigas são inúteis
- Melhor perder um frame que atrasar
```

**Exemplo:**

```
FPS Game:
Player position updates: 60/segundo
Perder 1-2 updates: OK
Atraso de 100ms: RUIM
```

### 📺 Streaming de Vídeo/Áudio

```
Por que UDP?
- Tempo real é essencial
- Frames perdidos são interpolados
- Atraso causa dessincronização
```

**Protocolos:**

- **RTP** (Real-time Transport Protocol)
- **RTSP** (Real-time Streaming Protocol)

### 🌐 DNS (Domain Name System)

```
Por que UDP?
- Requisições pequenas (< 512 bytes)
- Resposta rápida necessária
- Retry é simples
```

**Exemplo:**

```bash
# Query DNS usa UDP porta 53
dig google.com

# Se resposta for grande, usa TCP
dig google.com +tcp
```

### 📞 VoIP (Voice over IP)

```
Por que UDP?
- Voz em tempo real
- Latência > 150ms = perceptível
- Retransmissão não faz sentido
```

**Codec comum:**

```
G.711: 64 kbps
Pacotes: 20ms de áudio
Perda aceitável: < 5%
```

### 📡 IoT e Sensores

```
Por que UDP?
- Dispositivos com recursos limitados
- Envios frequentes de dados
- Dados antigos sem valor
```

**Exemplo:**

```
Sensor de temperatura:
Envia a cada 5 segundos
Dado: { "temp": 22.5, "timestamp": 1234567890 }
```

### 🔍 DHCP (Dynamic Host Configuration Protocol)

```
Por que UDP?
- Cliente ainda não tem IP
- Broadcast necessário
- Requisição/resposta simples
```

**Fluxo DHCP:**

```
DISCOVER (broadcast) → UDP
OFFER               → UDP
REQUEST             → UDP
ACK                 → UDP
```

## Implementação UDP

### Python - Servidor UDP

```python
import socket

# Criar socket UDP
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Bind na porta 9999
sock.bind(('0.0.0.0', 9999))

print("Servidor UDP escutando na porta 9999...")

while True:
    # Receber dados
    data, addr = sock.recvfrom(1024)
    print(f"Recebido de {addr}: {data.decode()}")

    # Enviar resposta
    response = f"Echo: {data.decode()}"
    sock.sendto(response.encode(), addr)
```

### Python - Cliente UDP

```python
import socket

# Criar socket UDP
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Enviar mensagem
message = "Hello, UDP!"
sock.sendto(message.encode(), ('localhost', 9999))

# Receber resposta (com timeout)
sock.settimeout(2.0)
try:
    data, addr = sock.recvfrom(1024)
    print(f"Resposta: {data.decode()}")
except socket.timeout:
    print("Timeout - sem resposta")

sock.close()
```

### Node.js - Servidor UDP

```javascript
const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`Recebido de ${rinfo.address}:${rinfo.port}: ${msg}`);

  // Enviar resposta
  const response = Buffer.from(`Echo: ${msg}`);
  server.send(response, rinfo.port, rinfo.address);
});

server.on("listening", () => {
  const addr = server.address();
  console.log(`Servidor UDP escutando em ${addr.address}:${addr.port}`);
});

server.bind(9999);
```

### Node.js - Cliente UDP

```javascript
const dgram = require("dgram");
const client = dgram.createSocket("udp4");

const message = Buffer.from("Hello, UDP!");

client.send(message, 9999, "localhost", (err) => {
  if (err) {
    console.error(err);
    client.close();
  }
});

client.on("message", (msg, rinfo) => {
  console.log(`Resposta: ${msg}`);
  client.close();
});

// Timeout após 2 segundos
setTimeout(() => {
  console.log("Timeout");
  client.close();
}, 2000);
```

## Broadcast e Multicast

### Broadcast

Enviar para todos na rede local:

```python
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

# Enviar para todos na rede 192.168.1.0/24
sock.sendto(b"Hello everyone!", ('192.168.1.255', 9999))
```

### Multicast

Enviar para grupo específico:

```python
import socket
import struct

MULTICAST_GROUP = '224.1.1.1'
PORT = 9999

# Criar socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Join multicast group
group = socket.inet_aton(MULTICAST_GROUP)
mreq = struct.pack('4sL', group, socket.INADDR_ANY)
sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)

sock.bind(('', PORT))

# Receber mensagens do grupo
while True:
    data, addr = sock.recvfrom(1024)
    print(f"Recebido: {data.decode()}")
```

## Confiabilidade sobre UDP

Às vezes precisamos de velocidade do UDP com alguma confiabilidade:

### QUIC (Quick UDP Internet Connections)

```
HTTP/3 usa QUIC sobre UDP
- Multiplexação de streams
- Criptografia nativa (TLS 1.3)
- Conexão 0-RTT
- Controle de congestionamento

Usado por: Google, Facebook, Cloudflare
```

### RUDP (Reliable UDP)

```
Adiciona camada de confiabilidade:
- Sequence numbers
- ACKs
- Retransmissões
- Mantém baixa latência do UDP
```

### Implementação Custom

```python
class ReliableUDP:
    def __init__(self):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sequence = 0
        self.pending = {}  # sequence -> data

    def send_reliable(self, data, addr):
        # Adicionar sequence number
        packet = f"{self.sequence}:{data}".encode()

        # Enviar e aguardar ACK
        while True:
            self.sock.sendto(packet, addr)

            # Timeout de 1 segundo
            self.sock.settimeout(1.0)
            try:
                ack, _ = self.sock.recvfrom(1024)
                if ack.decode() == f"ACK:{self.sequence}":
                    break
            except socket.timeout:
                print(f"Retransmitindo {self.sequence}")

        self.sequence += 1
```

## Troubleshooting UDP

### Verificar Portas UDP Abertas

```bash
# Linux/Mac
netstat -uln
ss -uln

# Verificar porta específica
lsof -i UDP:53

# Windows
netstat -an | findstr UDP
```

### Capturar Tráfego UDP

```bash
# tcpdump
tcpdump -i eth0 udp port 53

# Wireshark filter
udp.port == 1234
udp.length > 100
```

### Testar Conectividade UDP

```bash
# nc (netcat)
# Servidor
nc -u -l 9999

# Cliente
nc -u localhost 9999

# Enviar mensagem única
echo "test" | nc -u -w1 localhost 9999
```

### Ver Estatísticas UDP

```bash
netstat -su | grep -i udp

# Exemplo de saída:
# 12345 packets received
# 23 packets to unknown port received
# 5 packet receive errors
```

## Boas Práticas

✅ **Implemente timeouts** para detectar pacotes perdidos  
✅ **Limite tamanho do datagrama** a ~1400 bytes para evitar fragmentação  
✅ **Use checksums** sempre (obrigatório em IPv6)  
✅ **Implemente retry logic** na aplicação se necessário  
✅ **Monitore taxa de perda** - deve ser < 1% em rede saudável  
✅ **Considere ordenação** se importante para aplicação  
✅ **Use multicast** para comunicação 1-para-muitos  
❌ **Não use UDP** para transferência de arquivos ou dados críticos

## Portas UDP Comuns

| Porta   | Serviço | Descrição                  |
| ------- | ------- | -------------------------- |
| 53      | DNS     | Domain Name System         |
| 67/68   | DHCP    | Dynamic Host Configuration |
| 69      | TFTP    | Trivial File Transfer      |
| 123     | NTP     | Network Time Protocol      |
| 161/162 | SNMP    | Simple Network Management  |
| 514     | Syslog  | System Logging             |
| 1900    | SSDP    | Simple Service Discovery   |
| 5353    | mDNS    | Multicast DNS              |

## Quando Usar UDP vs TCP

### Use UDP quando:

- ⏱️ Latência baixa é crítica
- 📊 Dados antigos não têm valor
- 🎮 Tempo real é essencial
- 📡 Broadcast/multicast necessário
- 💾 Overhead deve ser mínimo

### Use TCP quando:

- ✅ Dados não podem ser perdidos
- 📝 Ordem é importante
- 🔐 Transferência de arquivos
- 🌐 APIs e serviços web
- 💼 Transações financeiras

## Recursos

- [RFC 768 - UDP](https://www.rfc-editor.org/rfc/rfc768)
- [RFC 9000 - QUIC](https://www.rfc-editor.org/rfc/rfc9000)
- [UDP vs TCP - Cloudflare](https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/)
