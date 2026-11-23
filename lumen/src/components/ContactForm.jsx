import { useState } from 'react'

// Envia para o Formspree, que encaminha para o e-mail do clube.
const ENDPOINT = import.meta.env.VITE_FORMSPREE_URL

export default function ContactForm({ tipos, tipoInicial, titulo }) {
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [anon, setAnon] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data._gotcha) return // anti-spam (campo escondido)
    data._subject = `[Lúmen] ${data.tipo}`
    data.anonimo = anon ? 'sim' : 'não'
    setStatus('sending')
    try {
      if (!ENDPOINT) throw new Error('VITE_FORMSPREE_URL não configurada')
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Falha no envio')
      form.reset(); setAnon(false); setStatus('ok')
    } catch (err) {
      console.error(err); setStatus('error')
    }
  }

  return (
    <form className="card form" onSubmit={onSubmit}>
      {titulo && <h3>{titulo}</h3>}
      <input type="text" name="_gotcha" className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <label>Nome (opcional)
        <input name="nome" disabled={anon} placeholder="Como podemos te chamar?" />
      </label>
      <label>E-mail {anon ? '' : '*'}
        <input type="email" name="email" disabled={anon} required={!anon} placeholder="voce@exemplo.com" />
      </label>
      <label>Assunto *
        <select name="tipo" required defaultValue={tipoInicial || ''}>
          <option value="" disabled>Selecione...</option>
          {tipos.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label>Mensagem *
        <textarea name="mensagem" rows="5" required placeholder="Conta para a gente..." />
      </label>
      <label className="check">
        <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
        Enviar anonimamente (sem nome e e-mail)
      </label>
      <button className="btn btn-purple" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
      <div aria-live="polite">
        {status === 'ok' && <p className="msg ok">Mensagem enviada! Obrigado, a gente responde em breve.</p>}
        {status === 'error' && <p className="msg err">Não deu certo. Tente de novo ou escreva para lumentechclub@gmail.com.</p>}
      </div>
    </form>
  )
}
