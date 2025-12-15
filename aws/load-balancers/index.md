---
title: Load Balancers
parent: AWS - Amazon Web Services
nav_order: 1
has_children: true
description: "Conceitos e tipos de Load Balancers na AWS com exemplos práticos"
---

# 🔄 Load Balancers na AWS

Nesta seção, você aprenderá sobre os diferentes tipos de **Load Balancers** oferecidos pela AWS e como usá-los para distribuir tráfego entre suas instâncias.

## 📊 O que é um Load Balancer?

Um Load Balancer é um dispositivo ou software que distribui o tráfego de rede de entrada entre múltiplos servidores, garantindo:

- ✅ **Alta disponibilidade**
- ✅ **Escalabilidade**
- ✅ **Tolerância a falhas**
- ✅ **Melhor desempenho**

---

## 🏗️ Tipos de Load Balancers na AWS

### [1. Application Load Balancer (ALB)](./alb.md)

**Ideal para:** Aplicações web, microserviços, contêineres

- Funciona na **Camada 7 (Aplicação)**
- Roteamento baseado em URL, hostname, header
- Suporte a HTTP/2 e WebSocket

### [2. Network Load Balancer (NLB)](./nlb.md)

**Ideal para:** Tráfego ultra-alta performance, IoT, jogos online

- Funciona na **Camada 4 (Transporte)**
- Latência ultra-baixa
- Suporta milhões de requisições por segundo

### [3. Gateway Load Balancer (GWLB)](./gwlb.md)

**Ideal para:** Appliances de rede, firewalls, IDS/IPS

- Funciona na **Camada 3 (Rede)**
- Distribui tráfego para appliances de rede
- Transparente para origem e destino

### [4. Classic Load Balancer (CLB)](./clb.md) ⚠️

**Status:** Legado - não é recomendado para novos projetos

---

## 📈 Comparação Rápida

| Característica   | ALB           | NLB            | GWLB           |
| ---------------- | ------------- | -------------- | -------------- |
| **Camada**       | 7 (Aplicação) | 4 (Transporte) | 3 (Rede)       |
| **Latência**     | Baixa         | Ultra-baixa    | Muito baixa    |
| **Throughput**   | Alto          | Muito alto     | Muito alto     |
| **Roteamento**   | Path/Host     | IP Protocol    | Encapsulamento |
| **Casos de Uso** | Web apps      | Gaming, IoT    | Appliances     |

---

## 🚀 Primeiros Passos

1. **Escolha** o tipo de load balancer adequado ao seu caso
2. **Crie** o load balancer no console AWS
3. **Configure** target groups
4. **Registre** suas instâncias/containers
5. **Monitore** com CloudWatch

---

## 💡 Dicas Importantes

- Sempre use **health checks** para monitorar suas instâncias
- Configure **auto-scaling** para escalabilidade automática
- Use **SSL/TLS** para segurança
- Aproveite os **access logs** para auditoria

---

## 🔗 Recursos Adicionais

- [AWS Load Balancers Documentation](https://docs.aws.amazon.com/elasticloadbalancing/)
- [Choosing a Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)
- [Load Balancer Pricing](https://aws.amazon.com/pt/elasticloadbalancing/pricing/)

---

_Próximo passo: Escolha um tipo de Load Balancer e explore os detalhes específicos!_
