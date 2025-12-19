---
id: networking-https
title: HTTPS - HTTP Secure
sidebar_label: HTTPS
---

**HTTPS** (HTTP Secure) é HTTP sobre TLS/SSL, fornecendo comunicação criptografada e verificação de identidade do servidor.

**Analogia**: Como enviar carta em envelope lacrado com selo de autenticidade - HTTP é cartão postal (todos podem ler), HTTPS é envelope selado (só destinatário abre). Certificado SSL é o selo que prova autenticidade.

## HTTPS = HTTP + TLS

```
HTTP (porta 80)  + TLS/SSL = HTTPS (porta 443)
```

### O que TLS/SSL fornece:

✅ **Criptografia**: Dados não podem ser lidos em trânsito  
✅ **Integridade**: Dados não podem ser modificados sem detecção  
✅ **Autenticação**: Garantia de identidade do servidor  
❌ **Overhead**: ~5-10% mais latência  
❌ **Complexidade**: Gerenciamento de certificados

## Como Funciona

### 1. TLS Handshake

```
Cliente                           Servidor
   |                                  |
   |------ ClientHello -------------->|
   |  (versões TLS, cipher suites)    |
   |                                  |
   |<----- ServerHello --------------|
   |  (versão TLS, cipher escolhido)  |
   |  + Certificado                   |
   |                                  |
   | Valida certificado              |
   | Gera chave de sessão            |
   |                                  |
   |------ Key Exchange ------------->|
   |  (chave pré-master criptografada)|
   |                                  |
   |<----- Finished ------------------|
   |                                  |
   |------ Finished ----------------->|
   |                                  |
   |  ✅ Conexão segura estabelecida  |
```

### 2. Comunicação Criptografada

```http
Cliente → Servidor (criptografado):
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer sensitive-token

Servidor → Cliente (criptografado):
HTTP/1.1 200 OK
Content-Type: application/json

{"email": "user@example.com", "ssn": "123-45-6789"}
```

**Sem HTTPS**: Qualquer intermediário pode ler estes dados  
**Com HTTPS**: Apenas cliente e servidor conseguem descriptografar

## Certificados SSL/TLS

### Estrutura de um Certificado

```
Certificate:
    Version: 3
    Serial Number: 1234567890
    Issuer: Let's Encrypt Authority X3
    Validity:
        Not Before: Jan 1 00:00:00 2024 GMT
        Not After : Apr 1 00:00:00 2024 GMT
    Subject: CN=example.com
    Subject Public Key Info:
        Public Key Algorithm: RSA
        RSA Public Key: (2048 bit)
    X509v3 extensions:
        Subject Alternative Name:
            DNS:example.com
            DNS:www.example.com
```

### Tipos de Certificado

**Domain Validation (DV)**

```
Validação: Controle do domínio
Tempo: Minutos
Custo: Grátis (Let's Encrypt)
Uso: Sites pessoais, blogs
```

**Organization Validation (OV)**

```
Validação: Identidade da organização
Tempo: Dias
Custo: $$
Uso: Sites corporativos
```

**Extended Validation (EV)**

```
Validação: Validação estendida
Tempo: Semanas
Custo: $$$
Uso: Bancos, e-commerce
Indicador: Barra verde no browser (descontinuado)
```

**Wildcard**

```
Cobertura: *.example.com
Proteção: Todos os subdomínios
Exemplo: api.example.com, www.example.com
```

## Cadeia de Certificados

```
Navegador
    ↓ confia
Root CA (DigiCert, Let's Encrypt)
    ↓ assina
Intermediate CA
    ↓ assina
example.com (certificado do servidor)
```

### Validação da Cadeia

```bash
# Ver cadeia de certificados
openssl s_client -connect example.com:443 -showcerts

# Verificar certificado
openssl x509 -in cert.pem -text -noout

# Verificar validade
openssl x509 -in cert.pem -noout -dates
```

## Obtendo Certificado SSL

### Let's Encrypt (Gratuito)

```bash
# Instalar certbot
sudo apt-get install certbot

# Obter certificado (nginx)
sudo certbot --nginx -d example.com -d www.example.com

# Obter certificado (standalone)
sudo certbot certonly --standalone -d example.com

# Renovar automaticamente
sudo certbot renew --dry-run
```

### Certbot Nginx Config

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Redirecionar para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    # Certificados Let's Encrypt
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### Auto-assinado (Desenvolvimento)

```bash
# Gerar certificado auto-assinado
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Node.js com HTTPS
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello HTTPS!');
}).listen(443);
```

## HTTP vs HTTPS - Diferenças

### HTTP (Não Seguro)

```
Cliente: GET /api/users
   ↓ (texto plano)
Intermediário pode ler/modificar
   ↓
Servidor: 200 OK, {"users": [...]}
```

**Vulnerabilidades:**

- 🔓 Man-in-the-middle (MITM)
- 🔓 Packet sniffing
- 🔓 Session hijacking
- 🔓 Dados sensíveis expostos

### HTTPS (Seguro)

```
Cliente: TLS Handshake
   ↓
Conexão criptografada estabelecida
   ↓
Cliente: GET /api/users (criptografado)
   ↓ (gibberish para intermediários)
Servidor: 200 OK (criptografado)
```

**Proteções:**

- ✅ Dados criptografados
- ✅ Integridade verificada
- ✅ Servidor autenticado
- ✅ Proteção contra MITM

## Mixed Content

### Problema

Página HTTPS carregando recursos HTTP:

```html
<!-- ❌ INSEGURO -->
<html>
  <head>
    <link rel="stylesheet" href="http://example.com/style.css" />
  </head>
  <body>
    <img src="http://example.com/image.jpg" />
    <script src="http://example.com/script.js"></script>
  </body>
</html>
```

**Browsers modernos bloqueiam mixed content!**

### Solução

```html
<!-- ✅ SEGURO -->
<html>
  <head>
    <link rel="stylesheet" href="https://example.com/style.css" />
  </head>
  <body>
    <img src="https://example.com/image.jpg" />
    <script src="https://example.com/script.js"></script>
  </body>
</html>
```

**Ou use protocol-relative URLs:**

```html
<script src="//example.com/script.js"></script>
```

## HSTS (HTTP Strict Transport Security)

Força browsers a usar apenas HTTPS:

```http
HTTP/1.1 200 OK
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Diretivas

**max-age**: Tempo em segundos

```
max-age=31536000  # 1 ano
```

**includeSubDomains**: Aplicar a todos subdomínios

```
includeSubDomains
```

**preload**: Incluir em lista hardcoded de browsers

```
preload
```

### Nginx Config

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

## Certificate Pinning

### Conceito

Fixar certificado/chave pública específica:

```http
Public-Key-Pins:
    pin-sha256="base64==";
    pin-sha256="backup-base64==";
    max-age=5184000;
    includeSubDomains
```

**⚠️ Atenção**: Deprecated em favor de Certificate Transparency

## Performance do HTTPS

### TLS 1.2 Handshake

```
Round Trip Times (RTT):

1 RTT: TCP handshake
1 RTT: TLS handshake
1 RTT: Request/Response

Total: 3 RTT antes de transferir dados
```

### TLS 1.3 Handshake

```
1 RTT: TCP + TLS handshake
1 RTT: Request/Response

Total: 2 RTT (33% mais rápido)
```

### Session Resumption

```
Cliente guarda session ID/ticket
Próxima conexão:
  0 RTT para TLS (com TLS 1.3)
  1 RTT total
```

### Otimizações

**OCSP Stapling**

```nginx
ssl_stapling on;
ssl_stapling_verify on;
```

Servidor anexa resposta de validação do certificado

**Session Cache**

```nginx
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
```

**HTTP/2**

```nginx
listen 443 ssl http2;
```

Multiplexação reduz overhead de múltiplas conexões

## Testando HTTPS

### SSL Labs

```
https://www.ssllabs.com/ssltest/analyze.html?d=example.com
```

Grade A+ indica configuração ideal

### Verificar Certificado

```bash
# Informações do certificado
curl -vI https://example.com 2>&1 | grep -i "SSL\|TLS"

# Detalhes completos
openssl s_client -connect example.com:443 -servername example.com

# Data de expiração
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Testar Cipher Suites

```bash
nmap --script ssl-enum-ciphers -p 443 example.com
```

## Implementação em Diferentes Stacks

### Node.js (Express)

```javascript
const https = require("https");
const express = require("express");
const fs = require("fs");

const app = express();

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/example.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/example.com/fullchain.pem"),
};

app.get("/", (req, res) => {
  res.send("Hello HTTPS!");
});

https.createServer(options, app).listen(443);

// Redirect HTTP to HTTPS
const http = require("http");
http
  .createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  })
  .listen(80);
```

### Python (Flask)

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello HTTPS!'

if __name__ == '__main__':
    app.run(
        ssl_context=('/path/to/cert.pem', '/path/to/key.pem'),
        host='0.0.0.0',
        port=443
    )
```

### Apache

```apache
<VirtualHost *:443>
    ServerName example.com

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/example.com/cert.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/example.com/chain.pem

    SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite HIGH:!aNULL:!MD5

    DocumentRoot /var/www/html
</VirtualHost>
```

## Troubleshooting Comum

### Certificado Expirado

```
Error: certificate has expired
```

**Solução**: Renovar certificado

```bash
sudo certbot renew
```

### Nome Não Corresponde

```
Error: certificate subject name does not match
```

**Solução**: Certificado deve incluir domínio em SAN

### Cadeia Incompleta

```
Error: unable to get local issuer certificate
```

**Solução**: Incluir intermediate certificates

```nginx
ssl_certificate /path/to/fullchain.pem;
```

### Mixed Content

```
Mixed Content: The page was loaded over HTTPS, but requested an insecure resource
```

**Solução**: Usar HTTPS para todos recursos

## Pontos de Atenção

💡 **Certificações e Provas:**

- **HTTPS = HTTP + TLS/SSL**: Não é protocolo separado, é HTTP sobre camada de segurança
- **Porta**: HTTP = 80, HTTPS = 443
- **TLS vs SSL**: SSL está deprecated, use apenas TLS 1.2+ em produção
- **Tipos de certificado**:
  - DV (Domain Validation) = valida domínio apenas (rápido, grátis)
  - OV (Organization) = valida empresa
  - EV (Extended) = validação estendida (mais lento, mais caro)
- **Let's Encrypt**: CA gratuita e automatizada (certificados DV)

⚠️ **Pegadinhas Comuns:**

- **Mixed Content**: Página HTTPS não pode carregar recursos HTTP - browsers bloqueiam
- **HSTS**: Força HTTPS mesmo que usuário digite http:// - máximo 1 ano
- **Certificado expirado**: Renovar ANTES de expirar - Let's Encrypt dura 90 dias
- **SNI (Server Name Indication)**: Permite múltiplos certificados em 1 IP
- **Self-signed**: Funciona mas browsers mostram warning - só para dev/teste
- **TLS Handshake**: TLS 1.2 = 2 RTT, TLS 1.3 = 1 RTT (mais rápido)

## Boas Práticas

✅ **Use HTTPS em produção** sempre  
✅ **Redirecione HTTP → HTTPS** (301)  
✅ **Implemente HSTS** para segurança adicional  
✅ **Use TLS 1.2 ou 1.3** apenas  
✅ **Desabilite protocolos antigos** (SSL, TLS 1.0/1.1)  
✅ **Renovação automática** de certificados  
✅ **Monitore expiração** de certificados  
✅ **Use cipher suites fortes** apenas  
✅ **Ative OCSP Stapling** para performance  
✅ **Teste regularmente** com SSL Labs

## Recursos

- [Let's Encrypt](https://letsencrypt.org/)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [OWASP TLS Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)
