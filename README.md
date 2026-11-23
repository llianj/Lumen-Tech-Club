# Lúmen Tech Club

Landing page  do **Lúmen Tech Club**, um projeto de extensão de clube de leitura. O site  apresenta o projeto, os ciclos de leitura, as perguntas frequentes e permite que visitantes entrem em contato com a comunidade.

## Sobre o projeto

O Lúmen Tech Club conecta leitura, tecnologia e conversa. Neste site, os visitantes podem conhecer o propósito do clube, explorar os livros dos ciclos atuais e anteriores, saber quem está por trás da iniciativa e enviar mensagens para participar ou tirar dúvidas.

O projeto foi desenvolvido nas linguagens de marcação HTML e CSS junto das linguagens de programação JavaScript e React

## Funcionalidades

- Página inicial com apresentação do clube e etapas para participar.
- Seção sobre propósito, pilares e equipe.
- Ciclos de leitura com status: concluído, lendo agora e em breve.
- Página de perguntas frequentes em formato de acordeão.
- Formulário de contato com opções de assunto e envio anônimo.
- Alternância persistente entre tema claro e escuro.

## Tecnologias

- React 19
- React Router DOM 7
- Vite 8
- JavaScript 
- CSS
- Formspree para envio do formulário

## Pré-requisitos

- Node.js
- npm

Não há versões fixadas de Node.js no projeto. Recomenda-se utilizar uma versão atual compatível com o Vite.

## Como executar

1. Clone o repositório:

```bash
git clone https://github.com/llianj/Lumen-Tech-Club.git
cd Lumen-Tech-Club
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o formulário de contato:

```bash
cp .env.example .env.local
```

No Windows, caso o comando `cp` não esteja disponível, crie o arquivo `.env.local` manualmente com base em `.env.example`.

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O endereço exibido pelo Vite será mostrado no terminal, normalmente em `http://localhost:5173`.

## Configuração do Formspree

Crie um formulário no [Formspree](https://formspree.io/) e informe o endpoint no arquivo `.env.local`:

```env
VITE_FORMSPREE_URL=https://formspree.io/f/endereço_de_endpoint
```

Sem essa variável, o formulário mostrará uma mensagem de erro no envio.

As mensagens são enviadas em JSON e incluem o nome, e-mail, assunto, mensagem e a opção de envio anônimo.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Visualiza localmente a build de produção |
| `npm run lint` | Executa a análise estática com Oxlint |

## Estrutura do projeto

```text
Lumen-Tech-Club/
├── public/                  # Logos, favicon e arquivos públicos
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── context/             # Contexto de tema claro/escuro
│   ├── data/                # Dados de livros, FAQ, equipe e contato
│   ├── pages/               # Páginas da aplicação
│   ├── styles/              # Estilos globais
│   ├── App.jsx              # Rotas e layout principal
│   ├── main.jsx             # Inicialização da aplicação
│   └── index.css            # Estilos adicionais
├── .env.example             # Modelo de variáveis de ambiente
├── package.json             # Dependências e scripts
└── vite.config.js           # Configuração do Vite
```

## Principais pastas

Os principais dados do site estão separados em arquivos simples:

- `src/data/books.js`: livros e status dos ciclos
- `src/data/faq.js`: perguntas e respostas frequentes
- `src/data/team.js`: nomes e funções da equipe
- `src/data/site.js`: e-mail e perfil

