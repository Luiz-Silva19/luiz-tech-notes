---
id: aws-ebs
title: Amazon EBS (Elastic Block Store)
sidebar_label: EBS
---

O **Amazon EBS** (Elastic Block Store) é o serviço de armazenamento em bloco persistente e de alta performance projetado para uso com instâncias EC2.

## O que é EBS?

EBS fornece volumes de armazenamento que funcionam como discos rígidos virtuais anexados às instâncias EC2. Os dados persistem independentemente da vida útil da instância.

**Analogia**: Como diferentes HDs/SSDs externos - gp3 é o SSD padrão rápido e confiável, io2 é SSD enterprise super rápido para bancos críticos, st1 é HD grande para big data, e sc1 é HD barato para arquivo. Você pode trocar de tipo sem perder dados.

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

## Pontos de Atenção

### 🎯 Dicas para Certificação AWS

💡 **Em provas, palavras-chave para identificar tipo de volume:**

- **"Banco de dados de produção crítico"** → io2 ou io2 Block Express
- **"Boot volume"** ou **"aplicação web típica"** → gp3
- **"Big data"** ou **"data warehouse"** → st1 (HDD throughput)
- **"Arquivamento"** ou **"acesso infrequente"** → sc1 (HDD cold)
- **"IOPS consistente e previsível"** → io2 (não gp3, que tem burst)

💡 **gp2 vs gp3 (pergunta comum):**

- **gp2**: IOPS cresce com o tamanho (3 IOPS/GB). Para ter 10.000 IOPS precisa de volume de ~3.333 GB
- **gp3**: IOPS e tamanho são **independentes**. Você pode ter volume de 100 GB com 10.000 IOPS configurados
- **Resultado**: gp3 é quase sempre mais barato e melhor custo-benefício

💡 **Snapshots:**

- São **incrementais** - apenas blocos alterados são salvos
- Podem ser copiados entre **regiões** (útil para DR)
- Podem criar AMI diretamente do snapshot do root volume
- Deletar snapshot intermediário não afeta outros snapshots (AWS reorganiza)

💡 **Multi-Attach (io2 apenas):**

- Permite anexar um volume a múltiplas instâncias **na mesma AZ**
- ⚠️ Requer file system cluster-aware (GFS2, OCFS2) - não funciona com ext4/xfs normais
- Questões de prova podem tentar confundir com EFS

### ⚠️ Pegadinhas Comuns

❌ **HDD (st1/sc1) NÃO pode ser boot volume** - apenas SSD (gp2/gp3/io1/io2)  
❌ **EBS está na mesma AZ da instância** - não pode anexar volume us-east-1a em instância us-east-1b  
❌ **Modificação de volume tem cooldown** - só pode modificar a cada 6 horas  
❌ **gp2 pequeno tem burst limitado** - volume de 10 GB tem apenas 100 IOPS base, usa créditos para burst  
❌ **Snapshot custam** - não esqueça de deletar snapshots antigos de testes  
❌ **Encryption não pode ser desabilitada** - uma vez encrypted, sempre encrypted (pode copiar para não-encrypted)  
❌ **Volume desanexado continua cobrando** - se criou volume de 1 TB para teste e esqueceu anexado, paga $80/mês à toa

## Recursos

- [Documentação Oficial EBS](https://docs.aws.amazon.com/ebs/)
- [Tipos de Volume EBS](https://aws.amazon.com/ebs/volume-types/)
- [Preços EBS](https://aws.amazon.com/ebs/pricing/)
