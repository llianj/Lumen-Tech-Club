import Section from '../components/Section.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { site } from '../data/site.js'

export default function Contato() {
  return (
    <Section tint="green" eyebrow="A CONVERSA CONTINUA" title="Sua ideia tem lugar aqui.">
      <div className="grid grid-2">
        <div>
          <p>Quer participar, sugerir uma leitura ou contar algo que podemos melhorar? Fala com o Lúmen.</p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><a href={site.instagramUrl} target="_blank" rel="noreferrer">@{site.instagram}</a></p>
          <span className="tag c-green">SUGESTÕES E RECLAMAÇÕES SÃO BEM-VINDAS</span>
        </div>
        <ContactForm tipos={['Quero participar', 'Sugestão', 'Reclamação', 'Dúvida', 'Outro']} />
      </div>
    </Section>
  )
}
