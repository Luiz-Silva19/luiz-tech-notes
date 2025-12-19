---
id: networking-intro
title: Fundamentos de Redes
sidebar_label: Visão Geral
---

Compreender os fundamentos de redes é essencial para qualquer profissional de tecnologia, especialmente em áreas como DevOps, Arquitetura de Software e Cloud Computing.

**Analogia**: Networking é como o sistema de correios global - IP é o CEP, porta é o número do apartamento, DNS é o catálogo telefônico, TCP é carta registrada (garante entrega) e UDP é panfleto comum (rápido mas pode se perder).

## O que você vai aprender

Esta seção cobre os conceitos fundamentais de networking que todo desenvolvedor e engenheiro de software deve conhecer:

### 📚 Conteúdo

- **[Modelo OSI](osi-model.md)** - As 7 camadas do modelo de referência
- **[TCP](tcp.md)** - Transmission Control Protocol - confiabilidade e controle
- **[UDP](udp.md)** - User Datagram Protocol - velocidade e simplicidade
- **[HTTP](http.md)** - Hypertext Transfer Protocol - a base da web
- **[HTTPS](https.md)** - HTTP seguro com criptografia
- **[TLS/SSL](tls.md)** - Transport Layer Security - criptografia em trânsito
- **[Portas e Sockets](ports-and-sockets.md)** - Endpoints de comunicação

## Por que networking é importante?

### Para Desenvolvedores

- Debugar problemas de conectividade
- Otimizar performance de aplicações
- Entender APIs e comunicação entre serviços
- Implementar segurança adequada

### Para DevOps/SRE

- Configurar infraestrutura de rede
- Troubleshooting de problemas de produção
- Implementar load balancers e proxies
- Monitorar e otimizar latência

### Para Arquitetos

- Projetar comunicação entre microsserviços
- Escolher protocolos adequados
- Implementar segurança em camadas
- Planejar escalabilidade de rede

## Conceitos Fundamentais

### Cliente-Servidor

O modelo mais comum de comunicação em rede:

- **Cliente**: Inicia a conexão e faz requisições
- **Servidor**: Aguarda conexões e responde requisições

### IP Address

Identificador único de um dispositivo na rede:

- **IPv4**: 192.168.1.1 (32 bits, ~4 bilhões de endereços)
- **IPv6**: 2001:0db8::1 (128 bits, quantidade praticamente ilimitada)

### DNS (Domain Name System)

Traduz nomes legíveis em endereços IP:

```
www.example.com → 93.184.216.34
```

### Latência vs Throughput

- **Latência**: Tempo de viagem (quanto tempo leva)
- **Throughput**: Quantidade de dados (quanto cabe)

### Proxy vs Reverse Proxy

- **Proxy**: Cliente → Proxy → Servidor (protege cliente)
- **Reverse Proxy**: Cliente → Reverse Proxy → Servidores (protege servidor)

## Ferramentas Essenciais

### Diagnóstico

```bash
# Testar conectividade
ping google.com

# Traçar rota até destino
traceroute google.com

# Verificar portas abertas
netstat -tuln

# DNS lookup
nslookup google.com
dig google.com
```

### Captura de Pacotes

```bash
# Wireshark (GUI)
# tcpdump (CLI)
tcpdump -i eth0 port 80
```

### Teste de Performance

```bash
# Velocidade de download/upload
speedtest-cli

# Teste de largura de banda
iperf3 -c servidor.com
```

## Pontos de Atenção

💡 **Certificações e Provas:**

- **OSI vs TCP/IP**: Saiba que OSI tem 7 camadas (conceitual), TCP/IP tem 4 (prático)
- **Portas conhecidas**: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS) - decorar as principais
- **TCP vs UDP**: TCP = confiável/lento, UDP = rápido/não-confiável
- **Latência vs Throughput**: Latência = tempo de viagem, Throughput = quantidade
- **IPv4 vs IPv6**: IPv4 = 32 bits (~4 bilhões), IPv6 = 128 bits (praticamente infinito)

⚠️ **Pegadinhas Comuns:**

- Confundir proxy (protege cliente) com reverse proxy (protege servidor)
- Esquecer que DNS pode usar TCP E UDP (porta 53)
- Achar que HTTPS é um protocolo separado (é HTTP + TLS)

## Próximos Passos

Comece pelo **[Modelo OSI](osi-model.md)** para entender a estrutura em camadas das redes, depois explore cada protocolo individualmente.

## Recursos Externos

- [MDN Web Docs - HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP)
- [Cloudflare Learning - Networking](https://www.cloudflare.com/learning/network-layer/)
- [High Performance Browser Networking](https://hpbn.co/)
