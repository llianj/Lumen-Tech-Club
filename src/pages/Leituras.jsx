import Section from '../components/Section.jsx'
import Carousel from '../components/Carousel.jsx'
import BookCard from '../components/BookCard.jsx'
import { cycles } from '../data/books.js'

export default function Leituras() {
  return (
    <Section tint="purple" eyebrow="NA NOSSA ESTANTE" title="Ciclos de leitura">
      <p>Um livro por ciclo. Arraste ou use as setas para ver o que já lemos, o que estamos lendo e o que vem por aí.</p>
      <Carousel label="Ciclos de leitura" items={cycles} renderItem={(b) => <BookCard book={b} />} />
    </Section>
  )
}
