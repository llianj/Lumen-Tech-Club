import { useState } from 'react'
import { enviarImagem } from '../../lib/cloudinary.js'

export default function ImageField({ valor, onChange }) {
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function aoEscolher(e) {
    const arquivo = e.target.files?.[0]
    e.target.value = ''
    if (!arquivo) return
    setErro('')
    if (!arquivo.type.startsWith('image/')) return setErro('Escolha um arquivo de imagem.')
    if (arquivo.size > 5 * 1024 * 1024) return setErro('Imagem maior que 5 MB. Reduza e tente de novo.')
    setEnviando(true)
    try { onChange(await enviarImagem(arquivo)) } catch (err) { setErro(err.message) }
    setEnviando(false)
  }

  return (
    <div className="img-field">
      {valor ? <img className="thumb" src={valor} alt="Pré-visualização" /> : <div className="thumb vazio">sem imagem</div>}
      <div className="img-actions">
        <label className="btn btn-sm">
          {enviando ? 'Enviando...' : valor ? 'Trocar imagem' : 'Enviar imagem'}
          <input type="file" accept="image/*" onChange={aoEscolher} disabled={enviando} hidden />
        </label>
        {valor && <button type="button" className="btn btn-sm" onClick={() => onChange('')}>Remover</button>}
      </div>
      {erro && <p className="msg err">{erro}</p>}
    </div>
  )
}
