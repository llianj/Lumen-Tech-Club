import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import Star from '../components/Star.jsx'
import Logo from '../components/Logo.jsx'
import BookCard from '../components/BookCard.jsx'
import { cycles } from '../data/books.js'

const passos = [
  ['01', 'Dê um oi.', 'Fale com a gente por e-mail ou Instagram e conte que quer participar.'],
  ['02', 'Encontre sua turma.', 'Receba as informações sobre vagas, leituras e próximos encontros.'],
  ['03', 'Leia e venha trocar.', 'Traga suas ideias, suas perguntas e seu jeito de ver o mundo.'],
]

export default function Home() {
  const atual = cycles.find((c) => c.status === 'atual')
  return (
    <>
      <section className="hero grid-bg">
        <div className="container hero-inner">
          <div>
            <p className="tag">CLUBE DE LEITURA · TECNOLOGIA</p>
            <h1>
              <span className="word c-purple">Leia.</span>
              <span className="word c-green">Discuta.</span>
              <span className="word c-pink">Evolua.</span>
            </h1>
            <p className="lead">Para quem ama tecnologia e acredita que as melhores ideias nascem de uma boa conversa.</p>
            <Link to="/contato" className="btn btn-purple">Quero participar ↗</Link>
            <p className="mono small">Sem pré-requisitos. Com muita curiosidade.</p>
          </div>
          <div className="card hero-card c-lilac">
            <span className="tag">ABERTO A NOVAS IDEIAS</span>
            <h2>Seu próximo capítulo é com a gente.</h2>
            <div className="hero-logo"><Logo size={90} texto={false} /><Star size={64} /></div>
          </div>
        </div>
      </section>
      <div className="strip"><div className="container">MENOS SCROLL. MAIS TROCA. ✦ CONHECIMENTO SE MULTIPLICA.</div></div>

      <Section tint="green" eyebrow="01 / PODE CHEGAR" title="Preciso programar?">
        <p className="answer card c-green">Não! Só precisa ter curiosidade.</p>
        <p>Nem saber código. Nem ler rápido. Nem já conhecer todos os assuntos. Seu ponto de vista já tem lugar aqui.</p>
        <Link to="/faq" className="btn">Dúvidas são bem-vindas :)</Link>
      </Section>

      <Section eyebrow="02 / NA NOSSA ESTANTE" title="Estamos lendo agora">
        {atual && <BookCard book={atual} />}
        <p style={{ marginTop: 24 }}><Link to="/leituras" className="btn btn-green">Ver todos os ciclos →</Link></p>
      </Section>

      <Section tint="purple" eyebrow="03 / BORA FAZER PARTE?" title="Sua próxima boa troca começa aqui.">
        <div className="grid grid-3">
          {passos.map(([n, t, d]) => (
            <article key={n} className="card"><p className="big-num">{n}</p><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
        <p><Link to="/contato" className="btn btn-purple">Quero participar ↗</Link></p>
      </Section>
    </>
  )
}
