---
id: aws-ebs
title: Amazon EBS (Elastic Block Store)
sidebar_label: EBS
---

O **Amazon EBS** (Elastic Block Store) é o serviço de armazenamento em bloco persistente e de alta performance projetado para uso com instâncias EC2.

## O que é EBS?

EBS fornece volumes de armazenamento que funcionam como discos rígidos virtuais anexados às instâncias EC2. Os dados persistem independentemente da vida útil da instância.

## Tipos de Volume EBS

### SSD de Propósito Geral (gp3, gp2)

#### gp3 (Última Geração)

- **IOPS base**: 3.000 IOPS
- **Throughput base**: 125 MB/s
- **Escalável**: Até 16.000 IOPS e 1.000 MB/s
- **Custo**: Menor que gp2
- 💡 **Recomendado** para a maioria das workloads

#### gp2 (Geração Anterior)

- **IOPS**: 3 IOPS por GB (min 100, max 16.000)
- **Burst**: Até 3.000 IOPS para volumes pequenos
- **Throughput**: Até 250 MB/s

**Casos de uso**: Boot volumes, dev/test, aplicações de baixa latência

### SSD de Alta Performance (io2, io1)

#### io2 Block Express

- **IOPS**: Até 256.000 IOPS
- **Throughput**: Até 4.000 MB/s
- **Durabilidade**: 99.999% (5 noves)
- **Latência**: Sub-milissegundo

#### io2 / io1

- **IOPS**: Até 64.000 IOPS
- **Throughput**: Até 1.000 MB/s
- **Ratio**: 50:1 ou 1000:1 IOPS por GB

**Casos de uso**: Bancos de dados críticos, SAP HANA, workloads I/O intensivas

### HDD Otimizado para Throughput (st1)

- **Throughput**: Até 500 MB/s
- **IOPS**: Até 500 IOPS
- **Custo**: Mais barato que SSD
- ❌ Não pode ser boot volume

**Casos de uso**: Big Data, data warehouses, log processing

### HDD Cold (sc1)

- **Throughput**: Até 250 MB/s
- **IOPS**: Até 250 IOPS
- **Custo**: Mais barato
- ❌ Não pode ser boot volume

**Casos de uso**: Dados acessados raramente, arquivamento

## Comparação Rápida

| Tipo   | IOPS Max | Throughput Max | Preço | Uso      |
| ------ | -------- | -------------- | ----- | -------- |
| gp3    | 16.000   | 1.000 MB/s     | $     | Geral    |
| io2 BE | 256.000  | 4.000 MB/s     | $$$$  | Crítico  |
| st1    | 500      | 500 MB/s       | $$    | Big Data |
| sc1    | 250      | 250 MB/s       | $     | Arquivo  |

## Características Importantes

### Snapshots

- **Backup incremental** armazenado no S3
- Pode ser copiado entre regiões
- Pode criar volumes a partir de snapshots
- **Custo**: Apenas pelos dados alterados

### Encryption

- Criptografia em repouso usando KMS
- Sem impacto de performance
- Transparent para aplicação

### Multi-Attach (apenas io2)

- Anexar um volume a múltiplas instâncias
- ⚠️ Apenas em cluster-aware file systems
- Disponível em mesma AZ

### Performance

#### IOPS (Input/Output Operations Per Second)

- Operações de leitura/escrita por segundo
- Importante para bancos de dados e transações

#### Throughput (MB/s)

- Volume de dados transferidos
- Importante para streaming e big data

#### Latência

- Tempo de resposta das operações
- SSD < 1ms, HDD ~ 1-3ms

## Dimensionamento

### Volume Size

- **gp3/gp2**: 1 GB - 16 TB
- **io2**: 4 GB - 64 TB
- **st1/sc1**: 125 GB - 16 TB

### Modificação de Volumes

✅ Aumentar tamanho  
✅ Alterar tipo de volume  
✅ Ajustar IOPS/throughput  
⏱️ Disponível em alguns minutos  
⚠️ Pode ser feito apenas uma vez a cada 6 horas

## EBS vs Instance Store

| EBS                            | Instance Store                    |
| ------------------------------ | --------------------------------- |
| ✅ Persistente                 | ❌ Efêmero                        |
| ✅ Pode ser anexado/desanexado | ❌ Fixo à instância               |
| ✅ Snapshots para backup       | ❌ Sem backup nativo              |
| ⚠️ Latência de rede            | ✅ Latência ultra-baixa           |
| $ Mais caro                    | ✅ Incluído no preço da instância |

## EBS vs EFS

| EBS                      | EFS                              |
| ------------------------ | -------------------------------- |
| Block storage            | File storage (NFS)               |
| 1 volume = 1 instância\* | Múltiplas instâncias simultâneas |
| Mesma AZ                 | Multi-AZ                         |
| Provisionado             | Elástico                         |
| gp3: $0.08/GB/mês        | $0.30/GB/mês                     |

\*Exceto io2 com Multi-Attach

## Boas Práticas

✅ **Use gp3** para a maioria das workloads (melhor custo-benefício)  
✅ **Faça snapshots regulares** para backup e DR  
✅ **Monitore IOPS e throughput** com CloudWatch  
✅ **Delete snapshots antigos** para economizar  
✅ **Ative encryption** para dados sensíveis  
✅ **Use io2** apenas para workloads que realmente precisam  
✅ **Dimensione corretamente** - IOPS e throughput independentes em gp3

## Cenários de Uso

### Banco de Dados Relacional

- **Produção crítica**: io2 Block Express
- **Produção normal**: io2 ou gp3 (alta IOPS)
- **Dev/Test**: gp3 padrão

### Aplicação Web

- **Boot volume**: gp3 (pequeno, 8-16 GB)
- **Application data**: gp3 ou st1 (se muitos logs)

### Big Data / Analytics

- **Hot data**: st1 (alto throughput)
- **Cold data**: sc1 (baixo custo)
- **Processamento**: Instance store (temporário, alto IOPS)

## Custos

### Componentes de Custo

1. **Storage**: Por GB provisionado/mês
2. **IOPS**: Provisionado acima do baseline (gp3, io2)
3. **Throughput**: Provisionado acima do baseline (gp3)
4. **Snapshots**: Por GB armazenado no S3

### Exemplo gp3 (us-east-1)

- Storage: $0.08/GB/mês
- IOPS: $0.005 por IOPS acima de 3.000
- Throughput: $0.04 por MB/s acima de 125

## Recursos

- [Documentação Oficial EBS](https://docs.aws.amazon.com/ebs/)
- [Tipos de Volume EBS](https://aws.amazon.com/ebs/volume-types/)
- [Preços EBS](https://aws.amazon.com/ebs/pricing/)
