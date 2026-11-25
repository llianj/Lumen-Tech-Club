import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const FORMATOS = [
  { rotulo: '2:3', valor: 2 / 3 },
  { rotulo: '3:4', valor: 3 / 4 },
  { rotulo: '1:1', valor: 1 },
  { rotulo: '4:3', valor: 4 / 3 },
  { rotulo: '16:9', valor: 16 / 9 },
  { rotulo: 'Original', valor: 0 },
]
const TAMANHOS = [800, 1200, 1600]
const MAX = 340

export default function CropModal({ arquivo, aspectoInicial = 2 / 3, onConfirm, onOriginal, onCancel }) {
  const [img, setImg] = useState(null)
  const [formato, setFormato] = useState(aspectoInicial)
  const [zoom, setZoom] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [saida, setSaida] = useState(1200)
  const arrasto = useRef(null)

  useEffect(() => {
    const u = URL.createObjectURL(arquivo)
    let ativo = true
    const imagem = new Image()
    imagem.onload = () => { if (ativo) setImg(imagem) }
    imagem.onerror = () => { if (ativo) setImg(false) }
    imagem.src = u
    return () => {
      ativo = false
      URL.revokeObjectURL(u)
    }
  }, [arquivo])

  const g = useMemo(() => {
    if (!img) return null
    const asp = formato || img.width / img.height
    const W = asp >= 1 ? MAX : Math.round(MAX * asp)
    const H = asp >= 1 ? Math.round(MAX / asp) : MAX
    const escala = Math.max(W / img.width, H / img.height) * zoom
    const w = img.width * escala
    const h = img.height * escala
    const mx = Math.max(0, (w - W) / 2)
    const my = Math.max(0, (h - H) / 2)
    const x = Math.min(mx, Math.max(-mx, pos.x))
    const y = Math.min(my, Math.max(-my, pos.y))
    return { asp, W, H, escala, w, h, x, y }
  }, [img, formato, zoom, pos])

  function iniciar(e) {
    e.currentTarget.setPointerCapture(e.pointerId)
    arrasto.current = { px: e.clientX, py: e.clientY, x: g.x, y: g.y }
  }

  function mover(e) {
    const a = arrasto.current
    if (a) setPos({ x: a.x + e.clientX - a.px, y: a.y + e.clientY - a.py })
  }

  const soltar = () => { arrasto.current = null }

  function confirmar() {
    const srcW = g.W / g.escala
    const outW = Math.min(saida, Math.round(srcW))
    const outH = Math.round(outW / g.asp)
    const canvas = document.createElement('canvas')
    canvas.width = outW
    canvas.height = outH
    const contexto = canvas.getContext('2d')
    if (!contexto) {
      onOriginal()
      return
    }
    const sx = (g.w / 2 - g.W / 2 - g.x) / g.escala
    const sy = (g.h / 2 - g.H / 2 - g.y) / g.escala
    contexto.drawImage(img, sx, sy, srcW, g.H / g.escala, 0, 0, outW, outH)
    canvas.toBlob((blob) => {
      if (!blob) return onOriginal()
      onConfirm(new File([blob], arquivo.name.replace(/\.\w+$/, '') + '.webp', { type: 'image/webp' }))
    }, 'image/webp', 0.88)
  }

  return createPortal(
    <div className="crop-fundo" role="dialog" aria-modal="true" aria-label="Ajustar imagem">
      <div className="crop-caixa">
        <h3>Ajustar imagem</h3>
        {img === false ? (
          <>
            <p className="mono">Não foi possível abrir esta imagem.</p>
            <div className="crop-acoes">
              <button type="button" className="btn btn-sm" onClick={onCancel}>Cancelar</button>
              <button type="button" className="btn btn-sm" onClick={onOriginal}>Enviar sem editar</button>
            </div>
          </>
        ) : !g ? <p className="mono">Carregando...</p> : (
          <>
            <div
              className="crop-moldura"
              style={{ width: g.W, height: g.H }}
              onPointerDown={iniciar}
              onPointerMove={mover}
              onPointerUp={soltar}
              onPointerCancel={soltar}
            >
              <img
                src={img.src}
                alt=""
                draggable="false"
                style={{ width: g.w, height: g.h, left: (g.W - g.w) / 2 + g.x, top: (g.H - g.h) / 2 + g.y }}
              />
            </div>
            <p className="mono crop-dica">Arraste a imagem para posicionar</p>

            <label className="crop-linha">
              Zoom
              <input type="range" min="1" max="4" step="0.01" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
            </label>

            <div className="crop-linha">
              <span>Formato</span>
              <div className="crop-opcoes">
                {FORMATOS.map((f) => (
                  <button
                    key={f.rotulo}
                    type="button"
                    className={`btn btn-sm${formato === f.valor ? ' on' : ''}`}
                    onClick={() => { setFormato(f.valor); setPos({ x: 0, y: 0 }) }}
                  >
                    {f.rotulo}
                  </button>
                ))}
              </div>
            </div>

            <div className="crop-linha">
              <span>Largura final</span>
              <div className="crop-opcoes">
                {TAMANHOS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`btn btn-sm${saida === t ? ' on' : ''}`}
                    onClick={() => setSaida(t)}
                  >
                    {t} px
                  </button>
                ))}
              </div>
            </div>

            <div className="crop-acoes">
              <button type="button" className="btn btn-sm" onClick={onCancel}>Cancelar</button>
              <button type="button" className="btn btn-sm" onClick={onOriginal}>Enviar sem editar</button>
              <button type="button" className="btn btn-sm primary" onClick={confirmar}>Usar recorte</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
