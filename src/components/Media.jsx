import { useState } from 'react'

// Imagens do Cloudinary são entregues já otimizadas (formato e qualidade automáticos).
const otimizar = (url) =>
  url && url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('/upload/f_auto')
    ? url.replace('/upload/', '/upload/f_auto,q_auto,w_700/')
    : url

// Mostra a imagem (capa/foto). Se não existir ou falhar, mostra um bloco com o texto de reserva.
export default function Media({ src, alt, fallback }) {
  const [erro, setErro] = useState(!src)
  if (erro) return <div className="cover ph" role="img" aria-label={alt}>{fallback}</div>
  return <img className="cover" src={otimizar(src)} alt={alt} loading="lazy" draggable="false" onError={() => setErro(true)} />
}
