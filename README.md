# Lúmen Tech Club

Landing page  do **Lúmen Tech Club**, um projeto de extensão de clube de leitura. O site  apresenta o projeto, os ciclos de leitura, as perguntas frequentes e permite que visitantes entrem em contato com a comunidade.

## Sobre o projeto

O Lúmen Tech Club conecta leitura, tecnologia e conversa. Neste site, os visitantes podem conhecer o propósito do clube, explorar os livros dos ciclos atuais e anteriores, saber quem está por trás da iniciativa e enviar mensagens para participar ou tirar dúvidas.

O projeto foi desenvolvido nas linguagens de marcação HTML e CSS junto das linguagens de programação JavaScript e React

## Funcionalidades

- Página inicial com apresentação do clube e etapas para participar.
- Seção sobre propósito, pilares e equipe.
- Ciclos de leitura com status: concluído, lendo agora e em breve.
- Carrossel dos ciclos iniciado no livro com status "lendo agora".
- Página de perguntas frequentes em formato de acordeão.
- Formulário de contato com opções de assunto.
- Link do Instagram com ícone no rodapé e na página de contato.
- Alternância persistente entre tema claro e escuro.
- Conteúdo dinâmico carregado do Firestore com dados padrão de fallback.
- Painel administrativo protegido por autenticação Firebase.

## Tecnologias

- React 19
- React Router DOM 7
- Vite 8
- JavaScript
- CSS
- Firebase Authentication e Cloud Firestore
- Cloudinary
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

3. Configure as integrações externas:

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

As mensagens são enviadas em JSON e incluem o nome, o e-mail, o assunto e a mensagem.

## Configuração do Firebase

O Firebase habilita o conteúdo dinâmico e o painel administrativo em `/admin`.

Crie um projeto no Firebase e informe as configurações públicas no `.env.local`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

No Firebase Console:

1. Ative o **Authentication** com o provedor de e-mail/senha.
2. Crie o banco **Cloud Firestore**.
3. Publique as regras de `firestore.rules`.
4. Cadastre o UID do primeiro administrador no documento `admins/{uid}` ou use o valor autorizado já definido nas regras.
5. Crie a conta desse administrador no Firebase Authentication.

As coleções públicas são `cycles`, `team` e `faq`. Visitantes podem apenas ler esses dados. Um usuário autenticado precisa estar autorizado pelas regras do Firestore para editar, adicionar ou remover itens.

Quando o Firebase não está configurado ou a coleção está vazia, o site usa automaticamente os dados de `src/data/`.

## Painel administrativo

Após configurar o Firebase, acesse `/admin` para entrar no painel.

O painel permite:

- Editar os ciclos de leitura e destacar o livro atual.
- Editar os membros da equipe.
- Editar as perguntas frequentes.
- Adicionar, editar, excluir e importar dados.
- Gerenciar os administradores cadastrados.
- Fazer upload e recorte de imagens.
- Solicitar redefinição de senha.
- Encerrar a sessão automaticamente após 30 minutos sem atividade.
- Mostrar ou ocultar a senha na tela de login.

## Configuração do Cloudinary

As imagens enviadas pelo painel são processadas no navegador e enviadas ao Cloudinary.

```env
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

Configure um upload preset unsigned no Cloudinary. GIF e SVG são enviados sem recorte. PNG, JPEG e outros formatos suportados podem ser redimensionados e convertidos para WebP antes do envio.

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
│   ├── components/          # Componentes públicos e administrativos
│   ├── context/             # Tema e autenticação
│   ├── data/                # Dados padrão de livros, FAQ, equipe e contato
│   ├── lib/                 # Integrações Firebase e Cloudinary
│   ├── pages/               # Páginas públicas e área administrativa
│   ├── services/            # Leitura e manutenção do conteúdo
│   ├── styles/              # Estilos globais
│   ├── App.jsx              # Rotas e layout principal
│   ├── main.jsx             # Inicialização da aplicação
│   └── index.css            # Estilos adicionais
├── .env.example             # Modelo de variáveis de ambiente
├── firestore.rules          # Regras de leitura pública e acesso administrativo
├── package.json             # Dependências e scripts
└── vite.config.js           # Configuração do Vite
```

## Principais pastas

Os principais dados do site estão separados em arquivos simples:

- `src/data/books.js`: livros e status dos ciclos
- `src/data/faq.js`: perguntas e respostas frequentes
- `src/data/team.js`: nomes e funções da equipe
- `src/data/site.js`: nome, e-mail e perfil do Instagram
- `src/services/content.js`: leitura do Firestore com cache local e dados padrão
- `src/services/adminService.js`: operações administrativas no Firestore
- `src/lib/firebase.js`: inicialização do Firebase
- `src/lib/cloudinary.js`: processamento e upload de imagens

