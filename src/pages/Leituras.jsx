import Section from '../components/Section.jsx'
import BookCard from '../components/BookCard.jsx'
import { cycles } from '../data/books.js'

export default function Leituras() {
  return (
    <Section tint="purple" eyebrow="NA NOSSA ESTANTE" title="Ciclos de leitura">
      <p>Um livro por ciclo. Veja o que já lemos, o que estamos lendo e o que vem por aí.</p>
      <div className="grid grid-3">
        {cycles.map((b) => <BookCard key={b.ciclo} book={b} />)}
      </div>
    </Section>
  )
}
