import Section from '../components/Section.jsx'
import Star from '../components/Star.jsx'
import Carousel from '../components/Carousel.jsx'
import MemberCard from '../components/MemberCard.jsx'
import { team as padrao } from '../data/team.js'
import { useContent } from '../services/content.js'

const pilares = [
  ['LEIA', 'purple', 'Explore livros, descubra ideias e olhe para a tecnologia por outros ângulos.'],
  ['DISCUTA', 'green', 'Compartilhe sua visão, escute outras vozes e transforme dúvidas em conversas.'],
  ['EVOLUA', 'pink', 'Leve novas perspectivas para a vida. Aprender junto é ir mais longe.'],
]

export default function Sobre() {
  const team = useContent('team', padrao, 'ordem')
  return (
    <>
      <Section tint="purple" eyebrow="01 / SOBRE O CLUBE" title="Um livro abre a conversa, você faz o resto.">
        <div className="card paper">
          <span className="tape" />
          <Star size={56} color="var(--green)" className="sobre-star"/>
          <h3>O que é o Lúmen?</h3>
          <p>O Lúmen Tech Club é uma comunidade para jovens leitores que amam tecnologia; para quem quer compartilhar experiências, ler, conversar e crescer juntos.</p>
          <p>Aqui, a leitura é ponto de partida para compartilhar experiências, fazer perguntas e descobrir novas perspectivas. Sem competição e sem precisar saber tudo: a gente aprende junto.</p>
          <div className="tags"><span className="tag c-purple">LIVROS</span><span className="tag c-green">TECNOLOGIA</span><span className="tag c-pink">COMUNIDADE</span></div>
        </div>
      </Section>

      <Section eyebrow="02 / NOSSO JEITO DE CRESCER" title="Três verbos. Infinitas possibilidades.">
        <div className="grid grid-3">
          {pilares.map(([t, c, d]) => (
            <article key={t} className={`card c-${c}`}><span className="tag">{t}</span><h3>Novas páginas. Novas ideias.</h3><p>{d}</p></article>
          ))}
        </div>
      </Section>

      <Section tint="green" eyebrow="03 / QUEM FAZ ACONTECER" title="Quem está por trás do Lúmen">
        <Carousel label="Membros do Lúmen" items={team} renderItem={(m) => <MemberCard membro={m} />} />
      </Section>
    </>
  )
}
