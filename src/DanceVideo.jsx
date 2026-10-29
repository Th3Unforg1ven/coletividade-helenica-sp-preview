import './dance-video.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { assetUrl } from './paths.js'
import { PhotoViewerOpenContext } from './components/gallery-context.js'

export default function DanceVideo({ number, caption, sourceBase }) {
  const viewerOpen = useContext(PhotoViewerOpenContext)
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setLoaded(true)
      },
      { threshold: 0.2 },
    )
    observer.observe(video.current)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', updatePreference)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    const player = video.current
    if (!player) return
    if (!visible || !pageVisible || viewerOpen) {
      player.pause()
      return
    }
    if (manualPlay ?? !reduceMotion) player.play().catch(() => setPlaying(false))
    else player.pause()
    return () => player.pause()
  }, [visible, pageVisible, loaded, manualPlay, reduceMotion, viewerOpen])

  function togglePlayback() {
    const player = video.current
    if (!player) return
    const shouldPlay = player.paused
    setManualPlay(shouldPlay)
    // Keep playback inside the tap gesture, including browsers that block autoplay.
    if (shouldPlay) player.play().catch(() => setPlaying(false))
    else player.pause()
  }

  return (
    <figure ref={container}>
      <button
        type="button"
        className="dance-video-toggle"
        onClick={togglePlayback}
        aria-label={`${playing ? 'Pausar' : 'Reproduzir'} vídeo: ${caption}`}
      >
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          poster={assetUrl(`${base}-poster-hq.jpg`)}
          src={loaded ? assetUrl(`${base}-loop-hq.mp4`) : undefined}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
