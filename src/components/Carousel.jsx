import { useEffect, useRef, useState } from 'react'

// Carrossel circular: o card ativo fica no centro e o anterior/próximo aparecem
// menores nas laterais. Na primeira posição, "voltar" leva ao último (e vice-versa).
export default function Carousel({ items, renderItem, label }) {
  const n = items.length
  const [i, setI] = useState(0)
  const prevI = useRef(0)       // posição anterior (para detectar saltos de volta ao início/fim)
  const startX = useRef(null)
  const dragged = useRef(false)

  useEffect(() => { prevI.current = i }, [i])

  const go = (k) => setI(((k % n) + n) % n)
  // distância circular de um item até a posição `from` (negativo = esquerda)
  const offset = (idx, from) => {
    let o = idx - from
    if (o > n / 2) o -= n
    if (o < -n / 2) o += n
    return o
  }

  function onPointerUp(e) {
    if (startX.current === null) return
    const delta = e.clientX - startX.current
    startX.current = null
    dragged.current = Math.abs(delta) > 10
    if (Math.abs(delta) > 50) go(i + (delta < 0 ? 1 : -1))
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(i + 1)
        if (e.key === 'ArrowLeft') go(i - 1)
      }}
      onPointerDown={(e) => { startX.current = e.clientX; dragged.current = false }}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (startX.current = null)}
    >
      <div className="car-stage">
        {items.map((item, idx) => {
          const off = offset(idx, i)
          const jump = Math.abs(off - offset(idx, prevI.current)) > 1
          const cls = ['car-slide', off === 0 && 'is-active', Math.abs(off) > 2 && 'is-hidden', jump && 'jump']
          return (
            <div
              key={idx}
              className={cls.filter(Boolean).join(' ')}
              style={{ '--off': off, '--abs': Math.abs(off) }}
              aria-hidden={off !== 0}
              onClick={() => {
                if (dragged.current) { dragged.current = false; return }
                if (off !== 0) go(idx)
              }}
            >
              {renderItem(item)}
            </div>
          )
        })}
      </div>

      {n > 1 && (
        <div className="car-controls">
          <button className="car-arrow" onClick={() => go(i - 1)} aria-label="Anterior">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <div className="car-dots">
            {items.map((_, idx) => (
              <button key={idx} className={idx === i ? 'on' : ''} onClick={() => go(idx)} aria-label={`Ir para o item ${idx + 1}`} />
            ))}
          </div>
          <button className="car-arrow" onClick={() => go(i + 1)} aria-label="Próximo">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">{i + 1} de {n}</p>
    </div>
  )
}
