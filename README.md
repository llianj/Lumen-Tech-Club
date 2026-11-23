# Lúmen Tech Club

Site institucional e comunitário do **Lúmen Tech Club**, um clube de leitura voltado para jovens que gostam de tecnologia. A plataforma apresenta o projeto, os ciclos de leitura, as perguntas frequentes e permite que visitantes entrem em contato com a comunidade.

**Leia. Discuta. Evolua.**

## Sobre o projeto

O Lúmen Tech Club conecta leitura, tecnologia e conversa. Neste site, os visitantes podem conhecer o propósito do clube, explorar os livros dos ciclos atuais e anteriores, saber quem está por trás da iniciativa e enviar mensagens para participar ou tirar dúvidas.

O projeto foi desenvolvido como uma aplicação web responsiva, com navegação por páginas e suporte aos temas claro e escuro.

## Funcionalidades

- Página inicial com apresentação do clube e etapas para participar.
- Seção sobre propósito, pilares e equipe.
- Ciclos de leitura com status: concluído, lendo agora e em breve.
- Página de perguntas frequentes em formato de acordeão.
- Formulário de contato com opções de assunto e envio anônimo.
- Informações de contato por e-mail e Instagram.
- Navegação responsiva para diferentes tamanhos de tela.
- Alternância persistente entre tema claro e escuro.
- Rota de fallback para páginas não reconhecidas.

## Páginas

| Rota | Página |
| --- | --- |
| `/` | Início |
| `/sobre` | Sobre o clube |
| `/leituras` | Ciclos de leitura |
| `/faq` | Perguntas frequentes |
| `/contato` | Contato e participação |

## Tecnologias

- React 19
- React Router DOM 7
- Vite 8
- JavaScript moderno
- CSS
- Formspree para envio do formulário
- Oxlint para análise estática

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
VITE_FORMSPREE_URL=https://formspree.io/f/SEU_ID_AQUI
```

Sem essa variável, o formulário mostrará uma mensagem de erro no envio.

As mensagens são enviadas em JSON e incluem o nome, e-mail, assunto, mensagem e a opção de envio anônimo. O campo `_gotcha` funciona como proteção contra spam.

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

## Personalização

Os principais dados do site estão separados em arquivos simples:

- `src/data/books.js`: livros e status dos ciclos.
- `src/data/faq.js`: perguntas e respostas frequentes.
- `src/data/team.js`: nomes e funções da equipe.
- `src/data/site.js`: e-mail e perfil do Instagram.

Os dados da equipe contém valores de exemplo e devem ser substituídos pelos integrantes reais antes da publicação.

O tema escolhido pelo usuário é salvo no `localStorage` e restaurado na próxima visita.

## Build de produção

```bash
npm run build
```

Os arquivos finais serão gerados na pasta `dist/`. Para testar o resultado localmente:

```bash
npm run preview
```

## Contribuição

Contribuições são bem-vindas. Para contribuir:

1. Crie uma branch a partir da `main`.
2. Faça alterações pequenas e relacionadas ao tema.
3. Execute `npm run lint` e `npm run build`.
4. Abra um Pull Request com uma descrição clara das mudanças.
