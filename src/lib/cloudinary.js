const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

// Envia a imagem ao Cloudinary (upload "unsigned") e devolve a URL segura.
export async function enviarImagem(arquivo) {
  if (!CLOUD || !PRESET) throw new Error('Cloudinary não configurado no .env')
  const dados = new FormData()
  dados.append('file', arquivo)
  dados.append('upload_preset', PRESET)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: 'POST', body: dados })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error?.message || 'Falha ao enviar a imagem')
  return json.secure_url
}
