---
id: networking-osi-model
title: Modelo OSI - Open Systems Interconnection
sidebar_label: Modelo OSI
---

O **Modelo OSI** é um modelo de referência conceitual que padroniza as funções de comunicação em 7 camadas distintas. Embora a internet use o modelo TCP/IP na prática, o OSI é fundamental para entender networking.

## As 7 Camadas

```
7. Application   ← Dados do usuário (HTTP, FTP, DNS)
6. Presentation  ← Tradução, criptografia, compressão
5. Session       ← Gerenciamento de sessão
4. Transport     ← TCP/UDP, controle de fluxo
3. Network       ← IP, roteamento
2. Data Link     ← MAC, switches, frames
1. Physical      ← Cabos, sinais elétricos
```

## Camada 1 - Physical (Física)

**Função**: Transmissão de bits brutos através do meio físico

### Responsabilidades

- Transmissão de sinais elétricos, ópticos ou de rádio
- Especificação de voltagem, frequência
- Tipo de cabo (coaxial, fibra óptica, par trançado)

### Dispositivos

- Hubs
- Cabos Ethernet
- Repetidores
- Placas de rede (NIC)

### Exemplo

```
Bit "1" → +5V por 100ms
Bit "0" → 0V por 100ms
```

## Camada 2 - Data Link (Enlace)

**Função**: Comunicação entre dispositivos na mesma rede local

### Responsabilidades

- Endereçamento MAC
- Detecção de erros (CRC)
- Controle de acesso ao meio (CSMA/CD)

### Dispositivos

- Switches
- Bridges
- Access Points Wi-Fi

### Exemplo - Frame Ethernet

```
| Preâmbulo | MAC Dest | MAC Origem | Tipo | Dados | CRC |
| 8 bytes   | 6 bytes  | 6 bytes    | 2 B  | ...   | 4 B |
```

### Endereço MAC

```
00:1A:2B:3C:4D:5E
```

- 48 bits (6 bytes)
- Único por placa de rede
- Formato hexadecimal

## Camada 3 - Network (Rede)

**Função**: Roteamento de pacotes entre diferentes redes

### Responsabilidades

- Endereçamento lógico (IP)
- Roteamento entre redes
- Fragmentação de pacotes

### Dispositivos

- Roteadores
- Layer 3 Switches

### Protocolo Principal: IP

**IPv4 Header**:

```
| Versão | IHL | TOS | Tamanho Total |
| ID            | Flags | Offset      |
| TTL | Proto | Checksum          |
| IP Origem                         |
| IP Destino                        |
| Opções            | Padding       |
```

### Exemplo de Roteamento

```
PC (192.168.1.10)
    ↓
Gateway (192.168.1.1)
    ↓
Internet
    ↓
Servidor (93.184.216.34)
```

## Camada 4 - Transport (Transporte)

**Função**: Comunicação fim-a-fim entre aplicações

### Responsabilidades

- Segmentação e remontagem
- Controle de fluxo
- Controle de erro
- Multiplexação (portas)

### Protocolos

- **TCP**: Confiável, orientado a conexão
- **UDP**: Rápido, sem garantias

### Exemplo - TCP Header

```
| Porta Origem  | Porta Destino |
| Sequence Number               |
| Acknowledgment Number         |
| Flags (SYN, ACK, FIN, etc)    |
| Window Size   | Checksum      |
```

### Diferença TCP vs UDP

```
TCP: SYN → SYN-ACK → ACK → Dados → FIN
UDP: Dados → Dados → Dados (sem handshake)
```

## Camada 5 - Session (Sessão)

**Função**: Estabelecer, gerenciar e encerrar sessões

### Responsabilidades

- Controle de diálogo (half/full duplex)
- Sincronização
- Checkpointing de sessão

### Protocolos

- NetBIOS
- RPC (Remote Procedure Call)
- PPTP (Point-to-Point Tunneling Protocol)

### Exemplo

```
Cliente → ABRIR SESSÃO → Servidor
Cliente ← SESSION ID: 12345 ← Servidor
Cliente → DADOS (session=12345) → Servidor
Cliente → FECHAR SESSÃO → Servidor
```

## Camada 6 - Presentation (Apresentação)

**Função**: Tradução, formatação e criptografia de dados

### Responsabilidades

- Codificação/decodificação de dados
- Compressão/descompressão
- Criptografia/descriptografia

### Formatos

- **Encoding**: ASCII, UTF-8, EBCDIC
- **Imagens**: JPEG, PNG, GIF
- **Áudio/Vídeo**: MP3, MP4, AVI
- **Criptografia**: SSL/TLS

### Exemplo - Conversão

```
Aplicação (String "Hello")
    ↓
UTF-8 Encoding: 48 65 6C 6C 6F
    ↓
Compressão GZIP
    ↓
Criptografia TLS
    ↓
Rede
```

## Camada 7 - Application (Aplicação)

**Função**: Interface com aplicações do usuário

### Responsabilidades

- Serviços de rede para aplicações
- Protocolos de alto nível

### Protocolos Comuns

- **HTTP/HTTPS**: Web
- **FTP/SFTP**: Transferência de arquivos
- **SMTP**: Email (envio)
- **POP3/IMAP**: Email (recebimento)
- **DNS**: Resolução de nomes
- **SSH**: Acesso remoto seguro
- **Telnet**: Acesso remoto (inseguro)

### Exemplo HTTP

```http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>...</html>
```

## Encapsulamento de Dados

À medida que os dados descem pelas camadas, são encapsulados:

```
Camada 7: [Dados]
Camada 6: [Dados formatados]
Camada 5: [Dados de sessão]
Camada 4: [TCP Header | Dados] ← Segmento
Camada 3: [IP Header | TCP Header | Dados] ← Pacote
Camada 2: [Eth Header | IP | TCP | Dados | CRC] ← Frame
Camada 1: 01010101... ← Bits
```

## Fluxo de Comunicação Completo

### Cliente enviando requisição HTTP

```
7. App:    GET /api/users
6. Pres:   UTF-8, GZIP
5. Sess:   Session ID
4. Trans:  TCP porta 443
3. Net:    IP 192.168.1.10 → 93.184.216.34
2. Link:   MAC AA:BB:CC → DD:EE:FF
1. Phys:   Sinais elétricos no cabo
```

## Modelo OSI vs TCP/IP

| OSI          | TCP/IP         | Descrição          |
| ------------ | -------------- | ------------------ |
| Application  | Application    | HTTP, FTP, DNS     |
| Presentation | Application    | TLS, encoding      |
| Session      | Application    | Session management |
| Transport    | Transport      | TCP, UDP           |
| Network      | Internet       | IP, ICMP           |
| Data Link    | Network Access | Ethernet, Wi-Fi    |
| Physical     | Network Access | Cabos, hardware    |

## Troubleshooting por Camada

### Camada 1 (Física)

```bash
# Verificar se o cabo está conectado
ethtool eth0 | grep "Link detected"
```

### Camada 2 (Data Link)

```bash
# Verificar tabela ARP
arp -a
```

### Camada 3 (Rede)

```bash
# Testar roteamento
ping 8.8.8.8
traceroute google.com
```

### Camada 4 (Transporte)

```bash
# Verificar portas abertas
netstat -tuln | grep :80
```

### Camada 7 (Aplicação)

```bash
# Testar HTTP
curl -I https://www.example.com
```

## Importância do Modelo OSI

### Para Debugging

Permite isolar problemas por camada:

- "Não consigo acessar o site" → Em qual camada está o problema?
- Física? Rede? Aplicação?

### Para Design

Ajuda a separar responsabilidades:

- Load Balancer → Camada 4 ou 7?
- Firewall → Camada 3, 4 ou 7?

### Para Comunicação

Linguagem comum entre profissionais:

- "Problema na camada 3" → Todos entendem que é roteamento/IP

## Recursos

- [ISO/IEC 7498-1 - OSI Model](https://www.iso.org/)
- [Cloudflare - What is the OSI Model?](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)
