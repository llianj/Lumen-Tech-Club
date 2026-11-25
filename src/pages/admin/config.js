// Define os campos de cada tipo de conteúdo editável no painel.
import { cycles } from '../../data/books.js'
import { team } from '../../data/team.js'
import { faq } from '../../data/faq.js'

const cores = [{ v: 'purple', l: 'Roxo' }, { v: 'green', l: 'Verde' }, { v: 'pink', l: 'Coral' }]

export const abas = [
  {
    chave: 'cycles', rotulo: 'Livros / Ciclos', titulo: 'Livros dos ciclos', ordenarPor: 'ciclo', padrao: cycles,
    novo: { status: 'proximo', cor: 'purple', capa: '' },
    resumo: (i) => `Ciclo ${i.ciclo}: ${i.titulo}`,
    campos: [
      { nome: 'ciclo', rotulo: 'Nº do ciclo', tipo: 'numero', obrigatorio: true },
      { nome: 'titulo', rotulo: 'Título do livro', obrigatorio: true },
      { nome: 'autor', rotulo: 'Autor(es)', obrigatorio: true },
      { nome: 'status', rotulo: 'Situação', tipo: 'select', opcoes: [
        { v: 'concluido', l: 'Concluído' }, { v: 'atual', l: 'Lendo agora' }, { v: 'proximo', l: 'Em breve' }] },
      { nome: 'cor', rotulo: 'Cor do card', tipo: 'select', opcoes: cores },
      { nome: 'capa', rotulo: 'Capa do livro', tipo: 'imagem' },
      { nome: 'descricao', rotulo: 'Descrição curta', tipo: 'textarea' },
    ],
  },
  {
    chave: 'team', rotulo: 'Membros', titulo: 'Membros do Lúmen', ordenarPor: 'ordem', padrao: team,
    novo: { vinculo: 'Discente', cor: 'purple', foto: '' },
    resumo: (i) => `${i.nome} (${i.funcao})`,
    campos: [
      { nome: 'ordem', rotulo: 'Posição no carrossel', tipo: 'numero' },
      { nome: 'nome', rotulo: 'Nome', obrigatorio: true },
      { nome: 'funcao', rotulo: 'Função no Lúmen', obrigatorio: true },
      { nome: 'vinculo', rotulo: 'Vínculo', tipo: 'select', opcoes: [
        { v: 'Docente', l: 'Docente' }, { v: 'Discente', l: 'Discente' }, { v: 'Egresso', l: 'Egresso' }, { v: 'Convidado', l: 'Convidado' }] },
      { nome: 'cor', rotulo: 'Cor do card', tipo: 'select', opcoes: cores },
      { nome: 'foto', rotulo: 'Foto', tipo: 'imagem' },
      { nome: 'bio', rotulo: 'Breve descrição', tipo: 'textarea' },
    ],
  },
  {
    chave: 'faq', rotulo: 'FAQ', titulo: 'Perguntas frequentes', ordenarPor: 'ordem', padrao: faq,
    novo: {},
    resumo: (i) => i.q,
    campos: [
      { nome: 'ordem', rotulo: 'Posição na lista', tipo: 'numero' },
      { nome: 'q', rotulo: 'Pergunta', obrigatorio: true },
      { nome: 'a', rotulo: 'Resposta', tipo: 'textarea', obrigatorio: true },
    ],
  },
]
