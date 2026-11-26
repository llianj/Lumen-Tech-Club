import Section from '../components/Section.jsx'
import Carousel from '../components/Carousel.jsx'
import BookCard from '../components/BookCard.jsx'
import { cycles as padrao } from '../data/books.js'
import { useContent } from '../services/content.js'

export default function Leituras() {
  const cycles = useContent('cycles', padrao, 'ciclo')
  const initialIndex = Math.max(0, cycles.findIndex((cycle) => cycle.status === 'atual'))

  return (
    <Section tint="purple" eyebrow="NA NOSSA ESTANTE" title="Ciclos de leitura">
      <p>Um livro por ciclo. Arraste ou use as setas para ver o que já lemos, o que estamos lendo e o que vem por aí.</p>
      <Carousel
        key={initialIndex}
        label="Ciclos de leitura"
        items={cycles}
        initialIndex={initialIndex}
        renderItem={(b) => <BookCard book={b} />}
      />
    </Section>
  )
}
