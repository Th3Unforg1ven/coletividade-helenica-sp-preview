import { useEffect, useRef, useState } from 'react'
import { assetUrl } from './paths.js'

export default function DanceVideo({ number, caption, sourceBase }) {
  const container = useRef(null)
  const video = useRef(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [manualPlay, setManualPlay] = useState(null)
  const [reduceMotion, setReduceMotion] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const base = sourceBase || `/videos/grupos-danca/registro-${number}`

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(preference.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    updatePreference()
    updateVisibility()
    preference.addEventListener('change', updatePreference)
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      if (entry.isIntersecting) setLoaded(true)
    }, { threshold: 0.2 })
    observer.observe(container.current)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', updatePreference)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    const player = video.current
    if (!player) return
    if (!visible || !pageVisible) {
      player.pause()
      return
    }
    if (manualPlay ?? !reduceMotion) player.play().catch(() => setPlaying(false))
    else player.pause()
    return () => player.pause()
  }, [visible, pageVisible, loaded, manualPlay, reduceMotion])

  function togglePlayback() {
    setManualPlay(video.current?.paused ?? true)
  }

  return <figure ref={container}>
    <button type="button" className="dance-video-toggle" onClick={togglePlayback}
      aria-label={`${playing ? 'Pausar' : 'Reproduzir'} vídeo: ${caption}`}>
      <video ref={video} muted loop playsInline preload="none" aria-hidden="true"
        poster={assetUrl(`${base}-poster-hq.jpg`)}
        src={loaded ? assetUrl(`${base}-loop-hq.mp4`) : undefined}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      />
    </button>
    <figcaption>{caption}</figcaption>
  </figure>
}
