---
id: networking-tls
title: TLS/SSL - Transport Layer Security
sidebar_label: TLS
---

**TLS** (Transport Layer Security) e seu predecessor **SSL** (Secure Sockets Layer) são protocolos criptográficos que fornecem comunicação segura sobre redes.

## TLS vs SSL

| Protocolo | Versão | Status               | Ano  |
| --------- | ------ | -------------------- | ---- |
| SSL 1.0   | -      | Nunca lançado        | 1994 |
| SSL 2.0   | -      | ❌ Inseguro          | 1995 |
| SSL 3.0   | -      | ❌ Inseguro (POODLE) | 1996 |
| TLS 1.0   | -      | ❌ Deprecated        | 1999 |
| TLS 1.1   | -      | ❌ Deprecated        | 2006 |
| TLS 1.2   | -      | ✅ Seguro            | 2008 |
| TLS 1.3   | -      | ✅ Recomendado       | 2018 |

**⚠️ Use apenas TLS 1.2 ou 1.3!**

## O que TLS Fornece

### 1. Criptografia

Dados são criptografados end-to-end:

```
Texto plano: "senha123"
   ↓ criptografia
Ciphertext: "xK8#mP2@qW..."
   ↓ transmissão
Destinatário: "senha123"
```

### 2. Integridade

Detecção de modificação de dados:

```
Mensagem + MAC (Message Authentication Code)
Se mensagem modificada → MAC não corresponde
```

### 3. Autenticação

Verificação de identidade:

```
Servidor apresenta certificado
Cliente valida com CA raiz
```

## Handshake TLS 1.2

```
Cliente                                 Servidor
   |                                       |
   |------ ClientHello ------------------>|
   | - Versão TLS: 1.2                    |
   | - Random                             |
   | - Cipher Suites suportados           |
   |                                      |
   |<----- ServerHello -------------------|
   | - Versão TLS escolhida: 1.2          |
   | - Random                             |
   | - Cipher Suite escolhido             |
   |                                      |
   |<----- Certificate -------------------|
   | - Certificado do servidor            |
   |                                      |
   |<----- ServerHelloDone ---------------|
   |                                      |
   | Valida certificado                  |
   | Gera Pre-Master Secret              |
   |                                      |
   |------ ClientKeyExchange ------------>|
   | - Pre-Master criptografado          |
   |   (com chave pública do servidor)    |
   |                                      |
   |------ ChangeCipherSpec ------------->|
   |------ Finished --------------------->|
   | - Hash de todas mensagens            |
   |   (criptografado)                    |
   |                                      |
   |<----- ChangeCipherSpec --------------|
   |<----- Finished ----------------------|
   |                                      |
   | ✅ Handshake completo                |
   | Comunicação criptografada inicia    |
```

## Handshake TLS 1.3 (Simplificado)

```
Cliente                                 Servidor
   |                                       |
   |------ ClientHello ------------------>|
   | - Versão TLS: 1.3                    |
   | - Key Share (já envia chaves!)       |
   | - Cipher Suites                      |
   |                                      |
   |<----- ServerHello + Handshake -------|
   | - Key Share                          |
   | - Certificado                        |
   | - Finished                           |
   | (tudo criptografado após ServerHello)|
   |                                      |
   |------ Finished --------------------->|
   |                                      |
   | ✅ Handshake completo em 1-RTT       |
   | (vs 2-RTT no TLS 1.2)                |
```

### 0-RTT em TLS 1.3

```
Primeira conexão: 1-RTT
Conexões subsequentes: 0-RTT

Cliente envia dados com ClientHello!
```

**⚠️ 0-RTT não é idempotente** - cuidado com replay attacks

## Cipher Suites

### Estrutura

```
TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
 │    │     │   │    │   │   │   └─ Hash (SHA256)
 │    │     │   │    │   │   └───── Modo (GCM)
 │    │     │   │    │   └───────── Algoritmo simétrico (AES)
 │    │     │   │    └───────────── Tamanho da chave (128 bits)
 │    │     │   └────────────────── Criptografia simétrica
 │    │     └────────────────────── Autenticação (RSA)
 │    └──────────────────────────── Key Exchange (ECDHE)
 └───────────────────────────────── Protocolo
```

### TLS 1.2 - Cipher Suites Recomendados

```
TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256
TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
```

### TLS 1.3 - Cipher Suites

```
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
TLS_AES_128_GCM_SHA256
```

**Note:** TLS 1.3 remove algoritmos fracos e simplifica

## Criptografia Simétrica vs Assimétrica

### Assimétrica (Handshake)

```
Chave Pública + Chave Privada

Usada para:
- Autenticação do servidor
- Troca de chaves
- Assinatura digital

Algoritmos:
- RSA (2048/4096 bits)
- ECDSA (curvas elípticas)
- EdDSA
```

### Simétrica (Dados)

```
Uma chave compartilhada

Usada para:
- Criptografar dados da aplicação
- Muito mais rápida que assimétrica

Algoritmos:
- AES (Advanced Encryption Standard)
- ChaCha20
```

### Processo Completo

```
1. Handshake usa criptografia assimétrica
   → Troca/gera chave simétrica de sessão

2. Dados usam criptografia simétrica
   → Mais rápido e eficiente

3. Nova sessão = nova chave simétrica
```

## Perfect Forward Secrecy (PFS)

### Sem PFS (RSA Key Exchange)

```
Se chave privada do servidor for comprometida:
  → Todo tráfego histórico pode ser descriptografado
```

### Com PFS (ECDHE/DHE)

```
Chaves de sessão são efêmeras (temporárias)
Se chave privada comprometida:
  → Apenas futuras conexões afetadas
  → Tráfego passado permanece seguro
```

**Cipher suites com PFS:**

```
TLS_ECDHE_*  ← Recomendado
TLS_DHE_*    ← Mais lento
```

## Certificados Digitais

### Componentes

```
Certificado = {
  - Subject (quem é)
  - Issuer (quem assinou)
  - Public Key (chave pública)
  - Validity (período de validade)
  - Signature (assinatura da CA)
  - Extensions (SANs, key usage, etc)
}
```

### Validação

```
1. Verificar validade temporal
2. Verificar hostname (CN ou SAN)
3. Validar cadeia de certificados
4. Verificar assinatura da CA
5. Verificar revogação (OCSP/CRL)
```

### Self-Signed vs CA-Signed

**Self-Signed**:

```bash
openssl req -x509 -newkey rsa:4096 \
  -keyout key.pem -out cert.pem \
  -days 365 -nodes

# ✅ Gratuito
# ✅ Rápido
# ❌ Browsers não confiam
# Uso: Desenvolvimento, testes internos
```

**CA-Signed** (Let's Encrypt):

```bash
certbot certonly --standalone -d example.com

# ✅ Browsers confiam
# ✅ Gratuito (Let's Encrypt)
# ❌ Requer validação de domínio
# Uso: Produção
```

## OCSP e Revogação

### CRL (Certificate Revocation List)

```
Lista de certificados revogados
Cliente baixa lista completa
❌ Lento e ineficiente
```

### OCSP (Online Certificate Status Protocol)

```
Cliente consulta status individual
Servidor OCSP responde: good/revoked/unknown
✅ Mais eficiente que CRL
```

### OCSP Stapling

```
Servidor consulta OCSP periodicamente
Anexa resposta ao handshake TLS
✅ Mais rápido (cliente não consulta)
✅ Mais privado (CA não vê quem acessa site)
```

**Nginx Config**:

```nginx
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /path/to/chain.pem;
```

## SNI (Server Name Indication)

Permite múltiplos certificados em um IP:

### Sem SNI

```
1 IP = 1 Certificado
Desperdício de IPs
```

### Com SNI

```
Cliente envia hostname no ClientHello
Servidor escolhe certificado apropriado
1 IP = Múltiplos domínios

ClientHello:
  SNI: api.example.com → Certificado A
  SNI: www.example.com → Certificado B
```

**Suportado**: Todos browsers modernos

## Session Resumption

### Session IDs (TLS 1.2)

```
1ª Conexão:
  Handshake completo
  Servidor gera Session ID
  Cliente armazena

2ª Conexão:
  Cliente envia Session ID
  Servidor reconhece
  Handshake abreviado (1 RTT)
```

### Session Tickets (TLS 1.2)

```
Servidor criptografa estado da sessão
Envia ticket ao cliente
Cliente retorna ticket em nova conexão
Servidor descriptografa e restaura sessão

✅ Servidor não precisa armazenar estado
❌ Requer rotação de chaves de ticket
```

### Resumption em TLS 1.3

```
PSK (Pre-Shared Key) mode
0-RTT possível com PSK
```

## Análise de Tráfego TLS

### Wireshark

```bash
# Capturar tráfego TLS
wireshark

# Filtros úteis:
ssl.handshake.type == 1    # ClientHello
ssl.handshake.type == 2    # ServerHello
ssl.handshake.type == 11   # Certificate
tls                        # Todo tráfego TLS
```

### Descriptografar TLS no Wireshark

```bash
# Exportar chaves de sessão (Chrome/Firefox)
export SSLKEYLOGFILE=/tmp/ssl-keys.log

# Wireshark: Edit → Preferences → Protocols → TLS
# (Pre)-Master-Secret log filename: /tmp/ssl-keys.log
```

### OpenSSL s_client

```bash
# Conectar e ver handshake
openssl s_client -connect example.com:443 -showcerts

# Testar TLS 1.2
openssl s_client -connect example.com:443 -tls1_2

# Testar TLS 1.3
openssl s_client -connect example.com:443 -tls1_3

# Ver cipher suites aceitos
nmap --script ssl-enum-ciphers -p 443 example.com
```

## Configuração Segura

### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    # Certificados
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Protocolos
    ssl_protocols TLSv1.2 TLSv1.3;

    # Cipher Suites (Mozilla Intermediate)
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';

    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

    # Session Cache
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_session_tickets off;

    # DH Parameters
    ssl_dhparam /etc/nginx/dhparam.pem;
}
```

### Apache

```apache
SSLProtocol -all +TLSv1.2 +TLSv1.3
SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256
SSLHonorCipherOrder off
SSLSessionTickets off

Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
```

## Ataques Conhecidos e Mitigações

### POODLE (SSL 3.0)

```
Ataque: Padding Oracle
Mitigação: Desabilitar SSL 3.0
```

### BEAST (TLS 1.0)

```
Ataque: CBC cipher exploitation
Mitigação: Usar TLS 1.2+ ou GCM ciphers
```

### CRIME/BREACH

```
Ataque: Compressão
Mitigação: Desabilitar compressão TLS
```

### Heartbleed (OpenSSL)

```
Ataque: Buffer overflow no heartbeat
Mitigação: Atualizar OpenSSL
```

### Downgrade Attacks

```
Ataque: Forçar protocolo antigo
Mitigação: TLS_FALLBACK_SCSV
```

## Boas Práticas

✅ **Use TLS 1.2 ou 1.3** apenas  
✅ **Desabilite SSL e TLS 1.0/1.1**  
✅ **Prefira ECDHE** para Perfect Forward Secrecy  
✅ **Use cipher suites fortes** (AES-GCM, ChaCha20)  
✅ **Implemente HSTS**  
✅ **Ative OCSP Stapling**  
✅ **Rotacione certificados** antes de expirar  
✅ **Monitore vulnerabilidades** de TLS  
✅ **Teste configuração** regularmente  
✅ **Use HTTP/2** com TLS 1.2+

## Ferramentas de Teste

### SSL Labs

```
https://www.ssllabs.com/ssltest/
Grade A+ = configuração ideal
```

### testssl.sh

```bash
./testssl.sh example.com
# Testa: Protocolos, ciphers, vulnerabilidades
```

### nmap

```bash
nmap --script ssl-enum-ciphers -p 443 example.com
```

## Recursos

- [RFC 8446 - TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [SSL Labs](https://www.ssllabs.com/)
- [OWASP TLS Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)
