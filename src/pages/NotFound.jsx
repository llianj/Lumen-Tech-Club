import { useEffect, useRef, useState } from 'react'

export default function NotFound() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [canPlayManually, setCanPlayManually] = useState(false)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
 
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => setCanPlayManually(true))
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio || audioError) return

    if (audio.paused) {
      audio.play()
        .then(() => {
          setIsPlaying(true)
          setCanPlayManually(false)
        })
        .catch(() => setAudioError(true))
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <main className="easter-egg" aria-labelledby="not-found-title">
      <h1 id="not-found-title">404</h1>
      <img
        className="easter-egg__tree"
        src="/egg.gif"
        alt="Ele está atrás da árvore. Você não deveria estar aqui."
      />
      <p>Esta página não existe.</p>
      <div className="easter-egg__actions">
        <button
          className="easter-egg__button"
          type="button"
          onClick={toggleMusic}
          disabled={audioError}
        >
          {audioError
            ? 'Áudio indisponível'
            : isPlaying
              ? 'Pausar música'
              : canPlayManually
                ? 'Ativar música'
                : 'Iniciando música…'}
        </button>
        <a className="easter-egg__link" href="/">Voltar ao início</a>
      </div>
      <audio
        ref={audioRef}
        src="/man.ogg.mp3"
        loop
        preload="auto"
        onError={() => setAudioError(true)}
      />
    </main>
  )
}
