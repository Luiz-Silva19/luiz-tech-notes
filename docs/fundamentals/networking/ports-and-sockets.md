---
id: networking-ports-sockets
title: Portas e Sockets
sidebar_label: Portas e Sockets
---

**Portas** e **Sockets** são conceitos fundamentais para comunicação em rede, permitindo que múltiplas aplicações compartilhem uma única interface de rede.

## Portas

### O que são Portas?

Portas são identificadores numéricos de 16 bits (0-65535) que distinguem diferentes processos/aplicações em um mesmo host:

```
IP Address + Port = Endpoint único

192.168.1.10:80   ← Web Server
192.168.1.10:22   ← SSH Server
192.168.1.10:3306 ← MySQL Server

Mesmo IP, serviços diferentes!
```

### Faixas de Portas

**Well-Known Ports (0-1023)**

```
Reservadas para serviços padrão
Requerem privilégios root/admin

Exemplos:
20/21  - FTP
22     - SSH
23     - Telnet
25     - SMTP
53     - DNS
80     - HTTP
110    - POP3
143    - IMAP
443    - HTTPS
```

**Registered Ports (1024-49151)**

```
Registradas pela IANA
Aplicações conhecidas

Exemplos:
1433   - Microsoft SQL Server
3306   - MySQL
5432   - PostgreSQL
6379   - Redis
8080   - HTTP Alternativo
8443   - HTTPS Alternativo
27017  - MongoDB
```

**Dynamic/Private Ports (49152-65535)**

```
Portas efêmeras
Usadas por clientes

Exemplo de conexão:
Cliente: 192.168.1.100:54321 → Servidor: 93.184.216.34:443
         └─ porta efêmera           └─ porta conhecida
```

## Portas Comuns

### Web e HTTP

| Porta | Protocolo | Uso                      |
| ----- | --------- | ------------------------ |
| 80    | HTTP      | Web não criptografado    |
| 443   | HTTPS     | Web criptografado        |
| 8080  | HTTP-Alt  | Desenvolvimento, proxies |
| 8443  | HTTPS-Alt | HTTPS alternativo        |
| 3000  | -         | Node.js/React dev        |
| 4200  | -         | Angular dev              |
| 5000  | -         | Flask dev                |
| 8000  | -         | Django dev               |

### Email

| Porta | Protocolo  | Uso                         |
| ----- | ---------- | --------------------------- |
| 25    | SMTP       | Envio de email (MTA↔MTA)    |
| 465   | SMTPS      | SMTP sobre SSL/TLS          |
| 587   | Submission | SMTP para clientes          |
| 110   | POP3       | Receber email (download)    |
| 995   | POP3S      | POP3 sobre SSL/TLS          |
| 143   | IMAP       | Receber email (sincronizar) |
| 993   | IMAPS      | IMAP sobre SSL/TLS          |

### Bancos de Dados

| Porta | Banco               | Protocolo |
| ----- | ------------------- | --------- |
| 3306  | MySQL/MariaDB       | TCP       |
| 5432  | PostgreSQL          | TCP       |
| 27017 | MongoDB             | TCP       |
| 6379  | Redis               | TCP       |
| 1433  | MS SQL Server       | TCP       |
| 1521  | Oracle              | TCP       |
| 9042  | Cassandra           | TCP       |
| 7000  | Cassandra (cluster) | TCP       |

### Outros Serviços

| Porta   | Serviço       | Protocolo |
| ------- | ------------- | --------- |
| 20/21   | FTP           | TCP       |
| 22      | SSH/SFTP      | TCP       |
| 23      | Telnet        | TCP       |
| 53      | DNS           | UDP/TCP   |
| 67/68   | DHCP          | UDP       |
| 69      | TFTP          | UDP       |
| 123     | NTP           | UDP       |
| 161/162 | SNMP          | UDP       |
| 389     | LDAP          | TCP       |
| 636     | LDAPS         | TCP       |
| 3389    | RDP (Windows) | TCP       |
| 5900    | VNC           | TCP       |

## Sockets

### O que são Sockets?

Um **socket** é um endpoint de comunicação que combina:

```
Socket = IP Address + Port + Protocol

Exemplo TCP Socket:
192.168.1.10:80 usando TCP

Exemplo UDP Socket:
192.168.1.10:53 usando UDP
```

### Tipos de Socket

**Stream Socket (SOCK_STREAM)**

```
Protocolo: TCP
Características:
- Orientado a conexão
- Confiável
- Ordenado
- Bidirecional

Uso: HTTP, FTP, SSH
```

**Datagram Socket (SOCK_DGRAM)**

```
Protocolo: UDP
Características:
- Sem conexão
- Não confiável
- Sem ordenação
- Baixa latência

Uso: DNS, DHCP, streaming
```

**Raw Socket (SOCK_RAW)**

```
Acesso direto a IP
Usado para: ping, traceroute
Requer: privilégios de admin
```

### Socket Pair (5-Tuple)

Uma conexão TCP é uniquely identificada por:

```
(Source IP, Source Port, Dest IP, Dest Port, Protocol)

Exemplo:
(192.168.1.10, 54321, 93.184.216.34, 443, TCP)

Múltiplas conexões simultâneas:
(192.168.1.10, 54321, 93.184.216.34, 443, TCP) ← Conexão 1
(192.168.1.10, 54322, 93.184.216.34, 443, TCP) ← Conexão 2
(192.168.1.10, 54323, 93.184.216.34, 443, TCP) ← Conexão 3
```

## Estados de Socket

### TCP Socket States

```
LISTEN      - Aguardando conexões
SYN_SENT    - SYN enviado
SYN_RCVD    - SYN recebido
ESTABLISHED - Conexão estabelecida
FIN_WAIT_1  - Iniciando fechamento
FIN_WAIT_2  - Aguardando FIN
CLOSE_WAIT  - Aguardando fechamento da aplicação
CLOSING     - Fechamento simultâneo
LAST_ACK    - Aguardando ACK final
TIME_WAIT   - Aguardando 2MSL
CLOSED      - Conexão fechada
```

### Verificar Estados

```bash
# Linux/Mac
netstat -tan
ss -tan

# Ver apenas ESTABLISHED
netstat -tan | grep ESTABLISHED

# Ver TIME_WAIT
netstat -tan | grep TIME_WAIT

# Windows
netstat -an | findstr ESTABLISHED
```

## Implementação de Sockets

### Python - TCP Server

```python
import socket

# Criar socket TCP
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Permitir reutilização de endereço
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# Bind em IP e porta
server_socket.bind(('0.0.0.0', 8080))

# Listen (máximo 5 conexões pendentes)
server_socket.listen(5)

print("Servidor escutando na porta 8080...")

while True:
    # Aceitar conexão
    client_socket, client_address = server_socket.accept()
    print(f"Conexão de {client_address}")

    # Receber dados
    data = client_socket.recv(1024)
    print(f"Recebido: {data.decode()}")

    # Enviar resposta
    client_socket.send(b"HTTP/1.1 200 OK\r\n\r\nHello!")

    # Fechar conexão
    client_socket.close()
```

### Python - TCP Client

```python
import socket

# Criar socket TCP
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Conectar ao servidor
client_socket.connect(('localhost', 8080))

# Enviar dados
client_socket.send(b"GET / HTTP/1.1\r\n\r\n")

# Receber resposta
response = client_socket.recv(4096)
print(response.decode())

# Fechar socket
client_socket.close()
```

### Node.js - TCP Server

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Cliente conectado:", socket.remoteAddress);

  socket.on("data", (data) => {
    console.log("Recebido:", data.toString());
    socket.write("Echo: " + data);
  });

  socket.on("end", () => {
    console.log("Cliente desconectou");
  });
});

server.listen(8080, () => {
  console.log("Servidor escutando na porta 8080");
});
```

### Node.js - TCP Client

```javascript
const net = require("net");

const client = net.connect({ port: 8080 }, () => {
  console.log("Conectado ao servidor");
  client.write("Hello, Server!");
});

client.on("data", (data) => {
  console.log("Resposta:", data.toString());
  client.end();
});

client.on("end", () => {
  console.log("Desconectado do servidor");
});
```

## Binding e Listening

### Bind a porta específica

```python
# Bind em todas interfaces (0.0.0.0)
socket.bind(('0.0.0.0', 8080))

# Bind em interface específica
socket.bind(('192.168.1.10', 8080))

# Bind em localhost apenas
socket.bind(('127.0.0.1', 8080))
```

### Listen backlog

```python
# Aceitar até 128 conexões pendentes
socket.listen(128)

# Conexão 129 será recusada (connection refused)
```

## Port Forwarding

### SSH Tunnel (Local Forward)

```bash
# Encaminhar porta local 8080 para servidor:3000
ssh -L 8080:localhost:3000 user@servidor.com

# Acessar localhost:8080 → servidor:3000
```

### SSH Tunnel (Remote Forward)

```bash
# Servidor encaminha porta 8080 para local:3000
ssh -R 8080:localhost:3000 user@servidor.com

# servidor:8080 → localhost:3000
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Problemas Comuns

### Port Already in Use

```bash
# Erro
bind: address already in use

# Encontrar processo usando porta
lsof -i :8080
netstat -tulpn | grep 8080

# Matar processo
kill -9 <PID>

# Ou usar SO_REUSEADDR
socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
```

### Connection Refused

```
Causas:
1. Nenhum processo escutando na porta
2. Firewall bloqueando
3. Bind em IP errado (ex: 127.0.0.1 vs 0.0.0.0)

Verificar:
netstat -tuln | grep <porta>
```

### Too Many Open Files

```
# Limite de file descriptors
ulimit -n

# Aumentar limite
ulimit -n 65536

# /etc/security/limits.conf
* soft nofile 65536
* hard nofile 65536
```

### TIME_WAIT Accumulation

```
Muitos sockets em TIME_WAIT podem esgotar portas efêmeras

Mitigações:
1. net.ipv4.tcp_tw_reuse = 1
2. net.ipv4.tcp_fin_timeout = 30
3. Connection pooling
```

## Firewalls e Portas

### iptables (Linux)

```bash
# Permitir porta 80
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Bloquear porta 23 (Telnet)
iptables -A INPUT -p tcp --dport 23 -j DROP

# Permitir range de portas
iptables -A INPUT -p tcp --dport 8000:9000 -j ACCEPT

# Ver regras
iptables -L -n
```

### firewalld (RHEL/CentOS)

```bash
# Permitir HTTP
firewall-cmd --permanent --add-service=http

# Permitir porta específica
firewall-cmd --permanent --add-port=8080/tcp

# Recarregar
firewall-cmd --reload
```

### ufw (Ubuntu)

```bash
# Permitir SSH
ufw allow 22

# Permitir HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Bloquear porta
ufw deny 23

# Habilitar firewall
ufw enable
```

### Windows Firewall

```powershell
# Permitir porta
New-NetFirewallRule -DisplayName "Allow 8080" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow

# Bloquear porta
New-NetFirewallRule -DisplayName "Block 23" -Direction Inbound -Protocol TCP -LocalPort 23 -Action Block
```

## Port Scanning

### nmap

```bash
# Scan portas comuns
nmap example.com

# Scan range de portas
nmap -p 1-65535 example.com

# Scan portas específicas
nmap -p 80,443,8080 example.com

# Scan UDP
nmap -sU -p 53,161 example.com

# Service detection
nmap -sV example.com

# OS detection
nmap -O example.com
```

### netcat

```bash
# Testar conectividade em porta
nc -zv example.com 80

# Scan range de portas
nc -zv example.com 1-1000

# Banner grabbing
nc example.com 80
GET / HTTP/1.1
Host: example.com
```

## Boas Práticas

✅ **Feche portas não utilizadas** - Superfície de ataque menor  
✅ **Use firewall** para filtrar portas  
✅ **Evite portas well-known** para apps custom (use 1024+)  
✅ **Implemente rate limiting** por porta  
✅ **Monitore portas abertas** regularmente  
✅ **Use SO_REUSEADDR** para desenvolvimento  
✅ **Configure timeouts** apropriados  
✅ **Faça bind específico** (não 0.0.0.0 se desnecessário)  
✅ **Documente portas** usadas pela aplicação  
❌ **Nunca exponha** bancos de dados diretamente

## Port Ranges por Uso

### Desenvolvimento Local

```
3000  - Node.js/React
4200  - Angular
5000  - Flask
8000  - Django
8080  - HTTP genérico
8443  - HTTPS genérico
9000  - Go/misc
```

### Databases (interno)

```
3306  - MySQL
5432  - PostgreSQL
6379  - Redis
27017 - MongoDB
```

### Message Queues

```
5672  - RabbitMQ (AMQP)
9092  - Kafka
4369  - RabbitMQ (clustering)
```

### Monitoring

```
9090  - Prometheus
3000  - Grafana
9200  - Elasticsearch
```

## Troubleshooting Commands

```bash
# Ver todas conexões e portas
netstat -tuln

# Ver processos em portas
lsof -i -P -n

# Testar conectividade
telnet example.com 80
nc -zv example.com 443

# Ver portas em uso
ss -tuln

# Scan local
nmap localhost

# Capturar tráfego em porta
tcpdump -i any port 80
```

## Recursos

- [IANA Port Numbers](https://www.iana.org/assignments/service-names-port-numbers/)
- [Wikipedia - List of TCP and UDP port numbers](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)
- [SpeedGuide Port Database](https://www.speedguide.net/ports.php)
