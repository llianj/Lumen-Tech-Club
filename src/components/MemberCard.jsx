import Media from './Media.jsx'

function iniciais(nome) {
  const p = nome.trim().split(/\s+/)
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase()
}

export default function MemberCard({ membro }) {
  return (
    <article className={`card slide-card c-${membro.cor}`}>
      <div>
        <span className="tag">{membro.vinculo.toUpperCase()}</span>
        <h3>{membro.nome}</h3>
        <p className="role">{membro.funcao}</p>
        {membro.bio && <p className="bio">{membro.bio}</p>}
      </div>
      <Media src={membro.foto} alt={`Foto de ${membro.nome}`} fallback={iniciais(membro.nome)} />
    </article>
  )
}
