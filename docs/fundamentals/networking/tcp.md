---
id: networking-tcp
title: TCP - Transmission Control Protocol
sidebar_label: TCP
---

**TCP** (Transmission Control Protocol) é um protocolo de transporte orientado a conexão que garante entrega confiável e ordenada de dados entre aplicações.

**Analogia**: Como uma ligação telefônica - "Alô?" (SYN), "Alô! Estou ouvindo" (SYN-ACK), "Ótimo, vamos conversar" (ACK). Confirma cada frase (ACK), repete se não ouviu (retransmissão), e ambos dizem "tchau" antes de desligar.

## Características Principais

✅ **Confiável**: Garante entrega sem perdas  
✅ **Ordenado**: Dados chegam na ordem correta  
✅ **Orientado a conexão**: Estabelece conexão antes de enviar dados  
✅ **Controle de fluxo**: Evita sobrecarga do receptor  
✅ **Controle de congestionamento**: Adapta-se às condições da rede  
❌ **Mais lento**: Overhead de confiabilidade

## Three-Way Handshake (Estabelecimento de Conexão)

```
Cliente                        Servidor
   |                              |
   |------ SYN (seq=100) -------->|
   |                              |
   |<-- SYN-ACK (seq=300, ------  |
   |         ack=101)             |
   |                              |
   |------ ACK (ack=301) -------->|
   |                              |
   |    Conexão Estabelecida      |
```

### Detalhes do Handshake

**Passo 1 - SYN (Synchronize)**

```
Cliente → Servidor
Flags: SYN=1
Seq: 1000 (número aleatório inicial)
"Olá, quero iniciar uma conexão"
```

**Passo 2 - SYN-ACK**

```
Servidor → Cliente
Flags: SYN=1, ACK=1
Seq: 5000 (número do servidor)
Ack: 1001 (seq do cliente + 1)
"OK, aceito. Meu número é 5000"
```

**Passo 3 - ACK**

```
Cliente → Servidor
Flags: ACK=1
Seq: 1001
Ack: 5001
"Confirmado, vamos começar"
```

## Estrutura do Header TCP

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |       |C|E|U|A|P|R|S|F|                               |
| Offset| Rsrvd |W|C|R|C|S|S|Y|I|            Window             |
|       |       |R|E|G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### Campos Importantes

**Source/Destination Port** (16 bits cada)

- Identifica aplicações (ex: 80=HTTP, 443=HTTPS)

**Sequence Number** (32 bits)

- Número do primeiro byte neste segmento
- Usado para ordenação

**Acknowledgment Number** (32 bits)

- Próximo byte esperado
- "Recebi tudo até aqui"

**Flags** (9 bits)

- **SYN**: Sincronizar números de sequência
- **ACK**: Acknowledgment válido
- **FIN**: Finalizar conexão
- **RST**: Reset da conexão
- **PSH**: Push dos dados
- **URG**: Dados urgentes

**Window** (16 bits)

- Controle de fluxo
- Quantos bytes o receptor pode aceitar

## Transferência de Dados

### Exemplo: Enviar "Hello"

```
Cliente                          Servidor
   |                                |
   |--- seq=1001, "Hel" (3 bytes) ->|
   |                                |
   |<-------- ack=1004 -------------|
   |                                |
   |--- seq=1004, "lo" (2 bytes) -->|
   |                                |
   |<-------- ack=1006 -------------|
```

### Com Perda de Pacote

```
Cliente                          Servidor
   |                                |
   |--- seq=1000, dados ------X     | (perdido)
   |                                |
   |--- seq=1100, dados ----------->|
   |                                |
   |<--- ack=1000 (duplicado) ------|
   |<--- ack=1000 (duplicado) ------|
   |<--- ack=1000 (duplicado) ------|
   |                                |
   |--- RETRANSMITE seq=1000 ------>|
   |                                |
   |<---------- ack=1200 -----------|
```

## Encerramento de Conexão (Four-Way Handshake)

```
Cliente                        Servidor
   |                              |
   |------ FIN (seq=500) -------->|
   |                              |
   |<----- ACK (ack=501) ---------|
   |                              |
   |<----- FIN (seq=800) ---------|
   |                              |
   |------ ACK (ack=801) -------->|
   |                              |
   |      Conexão Fechada         |
```

### Estados do TCP

```
LISTEN → SYN_RCVD → ESTABLISHED → FIN_WAIT_1 →
FIN_WAIT_2 → TIME_WAIT → CLOSED
```

**Principais Estados:**

- **LISTEN**: Aguardando conexão
- **SYN_SENT**: SYN enviado
- **ESTABLISHED**: Conexão estabelecida
- **FIN_WAIT**: Aguardando finalização
- **TIME_WAIT**: Esperando antes de fechar (2MSL)
- **CLOSED**: Conexão fechada

## Controle de Fluxo (Flow Control)

### Sliding Window

```
Receptor anuncia: Window = 5000 bytes

Transmissor pode enviar até 5000 bytes sem ACK

Cliente                          Servidor
   |                                |
   |--- 1000 bytes ---------------->|
   |--- 1000 bytes ---------------->|
   |--- 1000 bytes ---------------->|
   |--- 1000 bytes ---------------->|
   |--- 1000 bytes ---------------->|
   |                                |
   | Precisa esperar ACK antes     |
   | de enviar mais dados          |
   |                                |
   |<------- ack, window=3000 ------|
   |                                |
   | Pode enviar mais 3000 bytes   |
```

## Controle de Congestionamento

### Slow Start

```
Inicialmente: cwnd = 1 MSS
Após cada ACK: cwnd = cwnd * 2

Round 1: 1 segmento
Round 2: 2 segmentos
Round 3: 4 segmentos
Round 4: 8 segmentos
...crescimento exponencial...
```

### Congestion Avoidance

```
Ao atingir threshold:
Crescimento linear

cwnd = cwnd + 1 MSS por RTT
```

### Fast Retransmit

```
Após 3 ACKs duplicados:
Retransmitir imediatamente
(não esperar timeout)
```

## TCP vs UDP - Comparação

| Característica | TCP             | UDP                    |
| -------------- | --------------- | ---------------------- |
| Conexão        | Orientado       | Sem conexão            |
| Confiabilidade | Sim             | Não                    |
| Ordenação      | Sim             | Não                    |
| Overhead       | Alto            | Baixo                  |
| Velocidade     | Menor           | Maior                  |
| Header Size    | 20-60 bytes     | 8 bytes                |
| Use Case       | Web, Email, FTP | Streaming, DNS, Gaming |

## Exemplos de Uso

### HTTP/HTTPS (Web)

```python
import socket

# Criar socket TCP
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Conectar ao servidor web
sock.connect(('www.example.com', 80))

# Enviar requisição HTTP
request = b"GET / HTTP/1.1\r\nHost: www.example.com\r\n\r\n"
sock.send(request)

# Receber resposta
response = sock.recv(4096)
print(response.decode())

# Fechar conexão
sock.close()
```

### SSH (Acesso Remoto)

```bash
# SSH usa TCP porta 22
ssh usuario@servidor.com

# Internamente:
# 1. Three-way handshake
# 2. Negociação TLS
# 3. Autenticação
# 4. Transferência de dados criptografados
# 5. Four-way handshake ao sair
```

### Transferência de Arquivo

```bash
# FTP usa TCP (porta 21 controle, 20 dados)
ftp ftp.example.com

# SCP usa TCP sobre SSH (porta 22)
scp arquivo.txt usuario@servidor:/caminho/
```

## TCP Options (Opções)

### MSS (Maximum Segment Size)

```
Maior segmento que pode ser enviado
Típico: 1460 bytes (1500 MTU - 40 headers)
```

### Window Scale

```
Permite janelas maiores que 64KB
window_size = advertised_window << scale
```

### Timestamps

```
Melhora cálculo de RTT
Proteção contra sequências antigas
```

### SACK (Selective Acknowledgment)

```
Informa quais segmentos foram recebidos
Permite retransmissão seletiva
```

## Troubleshooting TCP

### Verificar Conexões TCP

```bash
# Linux/Mac
netstat -tan | grep ESTABLISHED
ss -tan

# Windows
netstat -an | findstr ESTABLISHED

# Ver conexões por aplicação
lsof -i TCP
```

### Capturar Tráfego TCP

```bash
# tcpdump
tcpdump -i eth0 tcp port 80

# Wireshark filter
tcp.port == 443
tcp.flags.syn == 1
tcp.analysis.retransmission
```

### Testar Conectividade TCP

```bash
# telnet
telnet google.com 80

# nc (netcat)
nc -zv google.com 443

# curl com verbose
curl -v https://www.example.com
```

### Análise de Performance

```bash
# Ver estatísticas TCP
netstat -s | grep -i tcp

# Ver retransmissões
ss -ti

# Latência (RTT)
ping servidor.com
```

## Pontos de Atenção

💡 **Certificações e Provas:**

- **Three-Way Handshake**: SYN → SYN-ACK → ACK (3 passos para abrir)
- **Four-Way Handshake**: FIN → ACK → FIN → ACK (4 passos para fechar)
- **Flags TCP importantes**: SYN, ACK, FIN, RST, PSH
- **TCP vs UDP**: TCP = confiável, ordenado, orientado a conexão; UDP = rápido, sem garantias
- **MSS (Maximum Segment Size)**: Tipicamente 1460 bytes (1500 MTU - 40 headers)
- **Sliding Window**: Controle de fluxo - receptor diz quanto pode receber
- **Congestion Control**: Slow Start → Congestion Avoidance

⚠️ **Pegadinhas Comuns:**

- **ACK número**: É o PRÓXIMO byte esperado, não o último recebido
- **Handshake assimétrico**: 3-way para abrir, 4-way para fechar
- **RST vs FIN**: RST = abortar imediatamente, FIN = fechar gracefully
- **TIME_WAIT**: Após FIN, socket fica em TIME_WAIT por 2MSL (~2 minutos)
  - Previne que pacotes antigos afetem nova conexão na mesma porta
- **TCP não garante tempo**: Garante entrega, mas pode demorar (retransmissões)
- **Retransmissão**: Após timeout OU 3 ACKs duplicados (Fast Retransmit)
- **Keep-alive**: Não faz parte do TCP padrão, é extensão opcional

## Boas Práticas

✅ **Use TCP para dados críticos** onde perda não é aceitável  
✅ **Configure timeouts apropriados** para evitar conexões penduradas  
✅ **Implemente keep-alive** para detectar conexões mortas  
✅ **Monitore retransmissões** - indica problemas de rede  
✅ **Ajuste buffer sizes** para otimizar throughput  
✅ **Use connection pooling** para evitar overhead de handshakes

## Recursos

- [RFC 793 - TCP](https://www.rfc-editor.org/rfc/rfc793)
- [RFC 7323 - TCP Extensions](https://www.rfc-editor.org/rfc/rfc7323)
- [TCP/IP Illustrated - Stevens](https://www.amazon.com/TCP-Illustrated-Volume-Implementation/dp/0201633469)
