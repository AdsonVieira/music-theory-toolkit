# Music Theory Toolkit

Aplicação web para consultar e praticar teoria musical no navegador. Não há backend: intervalos, acordes, escalas, campo harmônico e os ciclos de quartas e quintas são calculados no cliente.

Este repositório é o material de uma aula sobre **desenvolvimento assistido por IA**. O GitHub é o gestor do trabalho. A turma lê o que está aberto nas issues, pede ajuda a uma ferramenta de IA e devolve a correção em um pull request.

## O que a aplicação faz

Na página inicial há sete módulos:

1. Intervalos
2. Acordes
3. Escalas
4. Campo harmônico
5. Ciclo das quartas
6. Ciclo das quintas
7. Desafio musical

A interface está em português do Brasil. As notas usam letras (`C`, `F#`, `Bb`).

## Como rodar

Requisitos: Node.js e npm.

```bash
git clone https://github.com/AdsonVieira/music-theory-toolkit.git
cd music-theory-toolkit
npm install
npm run dev
```

Outros comandos:

```bash
npm test          # testes do domínio musical
npm run build     # TypeScript e build de produção
```

Abra o endereço que o Vite mostrar, em geral `http://localhost:5173/`.

## Como a aula usa o GitHub

O backlog da aula está nas [issues](https://github.com/AdsonVieira/music-theory-toolkit/issues). Há correções (`bug`) e ideias novas (`enhancement`). Cada issue descreve o contexto, como reproduzir ou o que construir, os arquivos principais e os critérios de aceitação.

O fluxo esperado:

1. Escolher uma issue que ninguém esteja fazendo.
2. Ler a issue inteira com o GitHub CLI ou com um cliente MCP do GitHub.
3. Criar um branch, implementar só o que a issue pede e cobrir a regra musical com teste quando ela mudar o domínio.
4. Abrir um pull request ligado à issue (`Fixes #número`).
5. Esperar a revisão. Não misture duas issues no mesmo pull request.

A lógica musical fica em `src/domain/music-theory` e não importa React. Os testes em `*.test.ts`, ao lado dessas funções, são o lugar certo para provar um cálculo. A interface em `src/features` só escolhe entradas e mostra o resultado.

### Pelo GitHub CLI

Com a [GitHub CLI](https://cli.github.com/) autenticada:

```bash
gh issue list --repo AdsonVieira/music-theory-toolkit
gh issue view 1 --repo AdsonVieira/music-theory-toolkit
gh issue list --repo AdsonVieira/music-theory-toolkit --label bug
gh issue list --repo AdsonVieira/music-theory-toolkit --label enhancement
```

Para publicar a correção:

```bash
git checkout -b corrige-issue-1
git push -u origin HEAD
gh pr create --repo AdsonVieira/music-theory-toolkit --title "Informa a direção na pergunta de semitons" --body "Fixes #1"
```

### Por um cliente MCP

Um servidor MCP do GitHub expõe as mesmas informações para o agente: listar issues, ler uma issue, ler arquivos e abrir o pull request. Peça o número da issue ou a URL. A issue é a especificação. O código do repositório é a fonte da verdade para o comportamento atual.

Antes de alterar código, confira se a issue ainda está aberta:

```bash
gh issue view NUMERO --repo AdsonVieira/music-theory-toolkit --json state,title,body
```

## Estrutura

```text
src/
├── components/          interface reutilizável
├── features/            um módulo por ferramenta
├── domain/music-theory/ regras musicais e testes
├── data/                fórmulas, nomes e armaduras
├── utils/               rota por hash e localStorage
└── styles/global.css
```

A navegação usa a hash da URL (`#/intervalos`, `#/desafio`), sem React Router. O `localStorage` guarda só a última classe de altura escolhida e o recorde do desafio.

## Issues abertas para a aula

Correções:

- [#1](https://github.com/AdsonVieira/music-theory-toolkit/issues/1) Desafio: a pergunta de semitons não diz que o intervalo é ascendente
- [#2](https://github.com/AdsonVieira/music-theory-toolkit/issues/2) Ciclo: o botão F#/Gb cobre as tonalidades vizinhas
- [#3](https://github.com/AdsonVieira/music-theory-toolkit/issues/3) Intervalos grava a nota de origem como tonalidade dos outros módulos
- [#4](https://github.com/AdsonVieira/music-theory-toolkit/issues/4) Desafio pode repetir a mesma pergunta em seguida

Ideias:

- [#5](https://github.com/AdsonVieira/music-theory-toolkit/issues/5) Campo harmônico das tonalidades menores
- [#6](https://github.com/AdsonVieira/music-theory-toolkit/issues/6) Ouvir notas, intervalos e acordes no navegador
- [#7](https://github.com/AdsonVieira/music-theory-toolkit/issues/7) Mostrar os modos gregos a partir da escala maior
