import Media from './Media.jsx'
import { statusLabel } from '../data/books.js'

export default function BookCard({ book }) {
  return (
    <article className={`card slide-card c-${book.cor} ${book.status}`}>
      <div>
        <span className="tag">CICLO {String(book.ciclo).padStart(2, '0')} · {statusLabel[book.status]}</span>
        <h3>{book.titulo}</h3>
        <p className="mono">{book.autor}</p>
        <p>{book.descricao}</p>
      </div>
      <Media src={book.capa} alt={`Capa do livro ${book.titulo}`} fallback={book.titulo} />
    </article>
  )
}
