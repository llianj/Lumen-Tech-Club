import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeIsBehindTheTree() {
  const audioRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      if (audio.paused) {
        audio.play().catch((error) => {
          if (error.name !== 'NotAllowedError') {
            console.error('Não foi possível reproduzir o áudio.', error)
          }
        })
      }
    }

    const onGesture = (event) => {
      if (event.target instanceof Element && event.target.closest('button')) return
      tryPlay()
    }

    tryPlay()
    document.addEventListener('pointerdown', onGesture)
    document.addEventListener('keydown', onGesture)

    return () => {
      document.removeEventListener('pointerdown', onGesture)
      document.removeEventListener('keydown', onGesture)
    }
  }, [])

  return (
    <main className="he-is-behind-the-tree" aria-label="HeIsBehindTheTree">
      <img
        className="he-is-behind-the-tree__tree"
        src="/egg.gif"
        alt="Ele está atrás da árvore"
      />
      <p className="he-is-behind-the-tree__text">
        Página não encontrada
      </p>
      <button
        className="he-is-behind-the-tree__home-button"
        type="button"
        onClick={() => navigate('/')}
      >
        Voltar ao início
      </button>
      <audio
        ref={audioRef}
        src="/man.ogg.mp3"
        autoPlay
        loop
        preload="auto"
        onError={() => console.error('Falha ao carregar o áudio da página HeIsBehindTheTree.')}
      />
    </main>
  )
}
