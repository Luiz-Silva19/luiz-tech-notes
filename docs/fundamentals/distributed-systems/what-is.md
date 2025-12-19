---
id: distributed-systems-what-is
title: O que são Sistemas Distribuídos?
sidebar_label: O que são?
---

## Definição

Um **sistema distribuído** é uma coleção de componentes independentes (computadores, processos, serviços) que aparecem para o usuário como um único sistema coerente. Esses componentes se comunicam através de uma rede e coordenam suas ações para alcançar um objetivo comum.

## Características Principais

### 1. Componentes Autônomos

- Cada nó opera de forma independente
- Possui seu próprio CPU, memória e armazenamento
- Pode falhar independentemente de outros componentes

### 2. Comunicação via Rede

- Troca de mensagens através de protocolos de rede
- Latência inerente à comunicação
- Possibilidade de perda ou atraso de mensagens

### 3. Ausência de Relógio Global

- Não há um relógio compartilhado perfeito
- Sincronização de tempo é um desafio
- Ordenação de eventos requer algoritmos especiais

### 4. Falhas Independentes

- Componentes podem falhar sem afetar todo o sistema
- Necessidade de tolerância a falhas
- Detecção de falhas é não-trivial

## Exemplos de Sistemas Distribuídos

### Aplicações Web Modernas

- **Frontend**: Executando no navegador do usuário
- **Backend**: Múltiplos servidores processando requisições
- **Banco de Dados**: Cluster de dados distribuído
- **Cache**: Redis, Memcached distribuídos

### Sistemas de Armazenamento

- **Amazon S3**: Armazenamento de objetos distribuído
- **HDFS**: Hadoop Distributed File System
- **Cassandra**: Banco de dados distribuído

### Plataformas de Mensageria

- **Kafka**: Streaming de eventos distribuído
- **RabbitMQ**: Message broker
- **Amazon SQS**: Filas de mensagens

## Por que usar Sistemas Distribuídos?

### ✅ Vantagens

**Escalabilidade**

- Escalar horizontalmente adicionando mais máquinas
- Lidar com crescimento de usuários e dados

**Disponibilidade**

- Redundância reduz pontos únicos de falha
- Sistema continua funcionando mesmo com falhas parciais

**Performance**

- Processamento paralelo de tarefas
- Proximidade geográfica aos usuários (CDNs)

**Economia**

- Hardware commodity em vez de mainframes
- Elasticidade: pagar apenas pelo que usar

### ❌ Desafios

**Complexidade**

- Mais difícil de desenvolver, testar e debugar
- Comportamentos emergentes difíceis de prever

**Comunicação**

- Latência de rede
- Possibilidade de perda de mensagens
- Ordenação de eventos

**Consistência**

- Manter dados sincronizados entre nós
- Trade-offs entre consistência e disponibilidade

**Falhas Parciais**

- Alguns componentes funcionam, outros não
- Difícil distinguir entre lentidão e falha

## Tipos de Sistemas Distribuídos

### Sistemas Cliente-Servidor

- Arquitetura tradicional
- Clientes fazem requisições, servidores respondem
- Exemplo: Aplicações web

### Peer-to-Peer (P2P)

- Todos os nós são iguais
- Cada nó pode ser cliente e servidor
- Exemplo: BitTorrent, Blockchain

### Microservices

- Aplicação dividida em serviços pequenos e independentes
- Cada serviço tem seu próprio banco de dados
- Comunicação via APIs

### Serverless/FaaS

- Funções executadas sob demanda
- Gerenciamento de infraestrutura abstraído
- Exemplo: AWS Lambda, Azure Functions

## Princípios Fundamentais

### 1. Não há relógio global preciso

```
Nó A: [Evento 1] -> [Evento 2]
Nó B:               [Evento 3] -> [Evento 4]

Qual evento ocorreu primeiro: Evento 2 ou Evento 3?
```

### 2. Falhas são normais, não exceções

- Sempre assuma que componentes podem falhar
- Projete para degradação graciosa
- Implemente retry logic e circuit breakers

### 3. Latência é inevitável

- A velocidade da luz é um limite físico
- Adicione caching onde apropriado
- Use comunicação assíncrona quando possível

### 4. A rede não é confiável

- Mensagens podem ser perdidas
- Mensagens podem chegar fora de ordem
- Mensagens podem ser duplicadas

## Conclusão

Sistemas distribuídos são complexos mas necessários para construir aplicações modernas escaláveis e resilientes. Entender seus desafios fundamentais é o primeiro passo para projetá-los corretamente.

## 📚 Referências e Recursos

### Artigos e Papers

- **<a href="https://scholar.harvard.edu/files/waldo/files/waldo-94.pdf" target="_blank" rel="noopener noreferrer">A Note on Distributed Computing</a>** - Jim Waldo et al. (1994)
- **<a href="https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing" target="_blank" rel="noopener noreferrer">Fallacies of Distributed Computing</a>** - Peter Deutsch

### Documentação de Sistemas

- **<a href="https://aws.amazon.com/architecture/" target="_blank" rel="noopener noreferrer">AWS Architecture Center</a>** - Padrões de arquitetura distribuída
- **<a href="https://cloud.google.com/architecture" target="_blank" rel="noopener noreferrer">Google Cloud Architecture</a>** - Guias de arquitetura
- **<a href="https://learn.microsoft.com/en-us/azure/architecture/" target="_blank" rel="noopener noreferrer">Microsoft Azure Architecture</a>** - Padrões e práticas

### Tutoriais Práticos

- **<a href="https://www.oreilly.com/library/view/distributed-services-with/9781680507607/" target="_blank" rel="noopener noreferrer">Distributed Systems in Go</a>** - Travis Jeffery
- **<a href="https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/" target="_blank" rel="noopener noreferrer">Building Microservices</a>** - Sam Newman

---

**Próximo**: [Teorema CAP](cap-theorem.md)
