import { useState } from 'react'

// Mostra a imagem (capa/foto). Se não existir ou falhar, mostra um bloco com o texto de reserva.
export default function Media({ src, alt, fallback }) {
  const [erro, setErro] = useState(!src)
  if (erro) return <div className="cover ph" role="img" aria-label={alt}>{fallback}</div>
  return <img className="cover" src={src} alt={alt} loading="lazy" draggable="false" onError={() => setErro(true)} />
}
