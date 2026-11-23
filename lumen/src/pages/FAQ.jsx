import Section from '../components/Section.jsx'
import Accordion from '../components/Accordion.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { faq } from '../data/faq.js'

export default function FAQ() {
  return (
    <>
      <Section tint="pink" eyebrow="SEM MISTÉRIO" title="Talvez você esteja pensando…">
        <Accordion items={faq} />
      </Section>
      <Section eyebrow="NÃO ACHOU?" title="Mande sua pergunta">
        <p>Se a sua dúvida não estiver aqui, manda uma mensagem. Vamos adorar conversar.</p>
        <ContactForm tipos={['Pergunta', 'Dúvida sobre os encontros', 'Outro']} tipoInicial="Pergunta" />
      </Section>
    </>
  )
}
