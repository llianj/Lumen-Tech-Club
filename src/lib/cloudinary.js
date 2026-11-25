const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

// Reduz a imagem no navegador (lado maior = max px) e converte para WebP.
function redimensionar(arquivo, max = 1600, qualidade = 0.85) {
  return new Promise((resolve) => {
    if (arquivo.type === 'image/gif' || arquivo.type === 'image/svg+xml') return resolve(arquivo)
    const url = URL.createObjectURL(arquivo)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      const escala = Math.min(1, max / Math.max(img.width, img.height))
      if (escala === 1 && arquivo.size < 800 * 1024) return resolve(arquivo)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * escala)
      canvas.height = Math.round(img.height * escala)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => resolve(blob ? new File([blob], arquivo.name.replace(/\.\w+$/, '') + '.webp', { type: 'image/webp' }) : arquivo),
        'image/webp',
        qualidade,
      )
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(arquivo) }
    img.src = url
  })
}

// Envia a imagem ao Cloudinary (upload "unsigned") e devolve a URL segura.
export async function enviarImagem(arquivo) {
  if (!CLOUD || !PRESET) throw new Error('Cloudinary não configurado no .env')
  const dados = new FormData()
  dados.append('file', await redimensionar(arquivo))
  dados.append('upload_preset', PRESET)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: 'POST', body: dados })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error?.message || 'Falha ao enviar a imagem')
  return json.secure_url
}
