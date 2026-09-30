import { useEffect, useRef, useState } from 'react'
import { assetUrl } from './paths.js'

const slides = [
  { src: '/images/grupos-danca/neolea-danca.jpeg', label: 'Neolea Asteri • tradição em movimento', position: 'center' },
  { src: '/images/grupos-danca/pedilea-grupo.jpeg', label: 'Pedilea • novas gerações', position: 'center 55%' },
  { src: '/images/oficinas-culturais-original.webp', label: 'Oficinas • cultura compartilhada', position: 'center 42%' },
  { src: '/images/archive/28c0d6ffd7-kostakis2-1024x473.webp', label: 'Bouzouki • memória musical', position: '65% center' },
  { src: '/images/pascoa-comunidade-original.webp', label: 'Celebrações • encontros', position: 'center' },
  { src: '/images/primeira-diretoria-chsp.webp', label: 'Memória • desde 1937', position: 'center 35%' },
]

export default function HeroSlideshow() {
  const gallery = useRef(null)
  const images = useRef([])
  const zooms = useRef(new Map())
  const retireTimers = useRef(new Map())
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState({})
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(true)
  const [introVisible, setIntroVisible] = useState(true)
  const activeReady = Boolean(ready[active])
  const motionPaused = paused || reduceMotion || !visible || !pageVisible || introVisible

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduceMotion(preference.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    updateMotion()
    updateVisibility()
    const updateIntro = () => setIntroVisible(document.body.classList.contains('intro-active'))
    updateIntro()
    const introObserver = new MutationObserver(updateIntro)
    introObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    preference.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(gallery.current)
    return () => {
      observer.disconnect()
      introObserver.disconnect()
      preference.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  // Keep the outgoing image's transform alive until its opacity fade finishes.
  useEffect(() => {
    if (!activeReady || reduceMotion) return
    window.clearTimeout(retireTimers.current.get(active))
    retireTimers.current.delete(active)
    const image = images.current[active]
    if (!zooms.current.has(active)) {
      image.style.willChange = 'transform'
      const zoom = image.animate([
        { transform: 'scale3d(1, 1, 1)' },
        { transform: 'scale3d(1.045, 1.045, 1)' },
      ], { duration: 7200, easing: 'linear', fill: 'both' })
      zoom.pause()
      zooms.current.set(active, zoom)
    }
    return () => {
      retireTimers.current.set(active, window.setTimeout(() => {
        zooms.current.get(active)?.cancel()
        zooms.current.delete(active)
        image.style.willChange = ''
        retireTimers.current.delete(active)
      }, 1000))
    }
  }, [active, activeReady, reduceMotion])

  useEffect(() => {
    zooms.current.forEach(zoom => motionPaused ? zoom.pause() : zoom.play())
  }, [motionPaused, active, activeReady])

  useEffect(() => () => {
    retireTimers.current.forEach(timer => window.clearTimeout(timer))
    zooms.current.forEach(zoom => zoom.cancel())
    retireTimers.current.clear()
    zooms.current.clear()
  }, [])

  useEffect(() => {
    if (motionPaused || !activeReady) return
    const timer = window.setInterval(() => {
      if (document.body.classList.contains('intro-active') || !ready[(active + 1) % slides.length]) return
      setActive(current => (current + 1) % slides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [active, motionPaused, activeReady, ready])

  async function imageReady(index) {
    try { await images.current[index]?.decode() } catch { return }
    setReady(current => ({ ...current, [index]: true }))
  }

  return <div className="hero__gallery" ref={gallery} aria-label="Imagens da vida na Coletividade" aria-roledescription="carrossel">
    <div className="hero__frames">
      {slides.map((item, index) => <figure key={item.src} className={active === index && ready[index] ? 'active' : ''} aria-hidden={active !== index} style={{ '--hero-position': item.position }}>
        <img ref={element => { images.current[index] = element }} src={assetUrl(item.src)} alt={item.label} decoding="async" onLoad={() => imageReady(index)} />
        <figcaption>{item.label}</figcaption>
      </figure>)}
    </div>
    <div className="hero__controls" aria-label="Selecionar imagem">
      {slides.map((item, index) => <button type="button" key={item.src} disabled={!ready[index]} className={active === index ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Exibir imagem ${index + 1}: ${item.label}`} aria-current={active === index ? 'true' : undefined} />)}
    </div>
    {!reduceMotion && <button type="button" className="hero__playback" onClick={() => setPaused(value => !value)}>{paused ? 'Retomar apresentação' : 'Pausar apresentação'}</button>}
    <div className="hero__stamp"><span>São Paulo</span><strong>CHSP</strong><span>Brasil</span></div>
  </div>
}
