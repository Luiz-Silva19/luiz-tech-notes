---
description: Requisitos minimos para criacao e revisao de conteudos de Estatistica
applyTo: "docs/statistics/**/*.md"
---

# Instrucoes de Estatistica - Luiz Tech Notes

Estas instrucoes devem ser seguidas sempre que o assunto for Estatistica e Probabilidade, especialmente ao criar, revisar ou expandir materiais de estudo.

## Objetivo

Garantir que cada conteudo de Estatistica seja:

- tecnicamente correto;
- didatico e facil de entender;
- visualmente consistente nas formulas;
- util para estudo real (nao superficial e nao genérico).

## Requisitos minimos obrigatorios

Cada novo item de estudo de Estatistica deve conter, no minimo:

1. Definicao clara do conceito.
2. Exemplo real de aplicacao (contexto de negocio, saude, industria, tecnologia, etc.).
3. Exemplo simples e curto para entendimento rapido.
4. Analogia intuitiva (mundo real) para facilitar memorizacao.
5. Pontos de atencao (erros comuns, limites, interpretacoes equivocadas).
6. Referencias especificas e relevantes ao tema.

## Padrao de explicacao

- Comecar com linguagem objetiva e progressiva (do simples ao tecnico).
- Evitar pular etapas logicas.
- Explicar o "por que" da formula, nao apenas apresentar a formula pronta.
- Evitar explicacoes vagas, abstratas ou excessivamente generalistas.

## Simbolos e notacao matematica

- Sempre que um novo simbolo aparecer, explicar explicitamente o que ele representa.
- Nao assumir que o leitor ja conhece a notacao.
- Nao depender de associacoes com Python para explicar simbolos matematicos.
- Priorizar significado estatistico dos simbolos (evento, espaco amostral, probabilidade, media, variavel, etc.).

Exemplo de boa pratica:

- "Seja $X$ uma variavel aleatoria discreta, onde $X$ representa o numero de falhas por dia."

## Formulas e visual (Docusaurus v1)

- Inline: usar `$...$`.
- Bloco: usar `$$...$$`.
- Evitar `\(...\)` em texto corrido neste projeto.
- Manter formulas legiveis, com quebra em bloco quando ficarem longas.
- Quando util, explicar cada termo da formula logo abaixo.

## Exemplos

- Sempre incluir dois niveis quando aplicavel:
  - exemplo real (situacao profissional ou cotidiana);
  - exemplo simples (numerico e direto, para fixacao).
- Evitar exemplos artificiais que nao ajudam na intuicao.

## Referencias para aprofundamento

- Referencias devem ser especificas ao assunto tratado na pagina.
- Priorizar:
  - livros-texto reconhecidos em Estatistica/Probabilidade;
  - documentacao ou material tecnico focado no tema;
  - links que aprofundam exatamente o conceito discutido.
- Evitar referencias generalistas que nao dialogam com o conteudo da pagina.

## Consulta em caso de ambiguidade

Se houver duvida sobre:

- nivel de profundidade,
- notacao preferida,
- escopo do topico,

consultar o autor antes de finalizar.

## Checklist rapido antes de concluir

- [ ] Definiu o conceito de forma clara.
- [ ] Incluiu exemplo real.
- [ ] Incluiu exemplo simples.
- [ ] Incluiu analogia intuitiva.
- [ ] Explicou todos os simbolos novos.
- [ ] Formulas estao no padrao visual correto (`$...$` e `$$...$$`).
- [ ] Referencias sao especificas do tema.
- [ ] Nao usou Python como base para explicar simbolos matematicos.
