import { useState } from 'react'
import { enviarImagem } from '../../lib/cloudinary.js'
import CropModal from './CropModal.jsx'

export default function ImageField({ valor, onChange, aspecto = 2 / 3 }) {
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [pendente, setPendente] = useState(null)

  async function enviar(arquivo) {
    setErro('')
    setEnviando(true)
    try {
      onChange(await enviarImagem(arquivo))
      setPendente(null)
    } catch (err) {
      setErro(err.message)
    } finally {
      setEnviando(false)
    }
  }

  function aoEscolher(e) {
    const arquivo = e.target.files?.[0]
    e.target.value = ''
    if (!arquivo) return
    setErro('')
    if (!arquivo.type.startsWith('image/')) return setErro('Escolha um arquivo de imagem.')
    if (arquivo.size > 20 * 1024 * 1024) return setErro('Imagem maior que 20 MB. Reduza e tente de novo.')
    if (arquivo.type === 'image/gif' || arquivo.type === 'image/svg+xml') {
      void enviar(arquivo)
      return
    }
    setPendente(arquivo)
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
      {pendente && (
        <CropModal
          arquivo={pendente}
          aspectoInicial={aspecto}
          onConfirm={enviar}
          onOriginal={() => enviar(pendente)}
          onCancel={() => setPendente(null)}
        />
      )}
    </div>
  )
}
