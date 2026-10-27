import { useEffect, useRef, useState } from 'react'
import GalleryImage from './components/GalleryImage.jsx'
import { createCanvasPhotoZoom, needsCanvasPhotoZoom } from './components/canvas-photo-zoom.js'

const SLIDE_DURATION = 6000
const ZOOM_DURATION = 7200

const slides = [
  {
    src: '/images/abertura/neolea-em-sao-paulo.webp',
    fullSrc: '/images/comunidade/neolea-festa-imigrante.jpeg',
    label: 'Neolea Asteri • cultura grega em São Paulo',
    alt: 'Integrantes da Neolea Asteri com trajes tradicionais e estandarte na Festa do Imigrante',
    position: 'center 58%',
  },
  {
    src: '/images/abertura/grego-na-sede.webp',
    fullSrc: '/images/aulas/presencial/biblioteca-em-aula.jpeg',
    label: 'Grego Moderno • aprender e conviver',
    alt: 'Alunos com material de estudo durante uma aula presencial de grego na Coletividade',
    position: 'center 60%',
  },
  {
    src: '/images/abertura/pedilea-comunidade.webp',
    fullSrc: '/images/grupos-danca/pedilea-grupo.jpeg',
    label: 'Pedilea • novas gerações',
    alt: 'Crianças e instrutores da Pedilea reunidos na sede da Coletividade',
    fit: 'contain',
  },
  {
    src: '/images/abertura/oficina-tradicoes.webp',
    fullSrc: '/images/atividades/ovos-aprendizado.webp',
    label: 'Oficinas • tradições entre gerações',
    alt: 'Participantes aprendem a decorar ovos de Páscoa com orientação durante uma oficina na sede',
    position: 'center 32%',
  },
]

export default function HeroSlideshow({ redraw = false }) {
  const gallery = useRef(null)
  const images = useRef([])
  const canvases = useRef([])
  const zooms = useRef(new Map())
  const retireTimers = useRef(new Map())
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState({})
  const [requested, setRequested] = useState([0])
  const [pending, setPending] = useState(null)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(true)
  const [introVisible, setIntroVisible] = useState(true)
  const activeReady = Boolean(ready[active])
  const motionPaused = paused || reduceMotion || !visible || !pageVisible || introVisible

  useEffect(() => {
    if (pending !== null && ready[pending]) {
      setActive(pending)
      setPending(null)
    }
  }, [pending, ready])

  // Only prepare the next slide while the presentation can actually advance.
  useEffect(() => {
    if (motionPaused || !activeReady) return
    const next = (active + 1) % slides.length
    const timer = window.setTimeout(() => {
      setRequested((current) => (current.includes(next) ? current : [...current, next]))
    }, 2000)
    return () => window.clearTimeout(timer)
  }, [active, activeReady, motionPaused])

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
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(gallery.current)
    return () => {
      observer.disconnect()
      introObserver.disconnect()
      preference.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  // Keep the outgoing photo moving until its opacity fade finishes.
  useEffect(() => {
    if (!activeReady || reduceMotion) return
    window.clearTimeout(retireTimers.current.get(active))
    retireTimers.current.delete(active)
    const image = images.current[active]
    // Selecting a recently outgoing photo starts a new slide, not its old deadline.
    zooms.current.get(active)?.cancel()
    image.style.willChange = ''
    let zoom
    if (redraw || needsCanvasPhotoZoom()) {
      zoom = createCanvasPhotoZoom(image, canvases.current[active], ZOOM_DURATION)
    }
    if (!zoom) {
      image.style.willChange = 'transform'
      zoom = image.animate(
        [{ transform: 'scale3d(1, 1, 1)' }, { transform: 'scale3d(1.045, 1.045, 1)' }],
        { duration: ZOOM_DURATION, easing: 'linear', fill: 'both' },
      )
    }
    zoom.pause()
    zooms.current.set(active, zoom)
    return () => {
      retireTimers.current.set(
        active,
        window.setTimeout(() => {
          zooms.current.get(active)?.cancel()
          zooms.current.delete(active)
          image.style.willChange = ''
          retireTimers.current.delete(active)
        }, 1000),
      )
    }
  }, [active, activeReady, reduceMotion, redraw])

  useEffect(() => {
    zooms.current.forEach((zoom) => {
      if (motionPaused) zoom.pause()
      else if (zoom.playState === 'paused' && zoom.currentTime < ZOOM_DURATION) zoom.play()
    })
  }, [motionPaused, active, activeReady])

  useEffect(
    () => () => {
      retireTimers.current.forEach((timer) => window.clearTimeout(timer))
      zooms.current.forEach((zoom) => zoom.cancel())
      retireTimers.current.clear()
      zooms.current.clear()
    },
    [],
  )

  useEffect(() => {
    if (motionPaused || !activeReady) return
    const zoom = zooms.current.get(active)
    if (!zoom) return
    // Loading another photo or resuming must not give the slide six extra seconds.
    // Both renderers' animation clocks exclude time spent paused.
    const remaining = Math.max(0, SLIDE_DURATION - (zoom.currentTime ?? 0))
    const timer = window.setTimeout(() => {
      if (document.body.classList.contains('intro-active') || !ready[(active + 1) % slides.length])
        return
      setActive((current) => (current + 1) % slides.length)
    }, remaining)
    return () => window.clearTimeout(timer)
  }, [active, motionPaused, activeReady, ready])

  async function imageReady(index) {
    try {
      await images.current[index]?.decode()
    } catch {
      return
    }
    setReady((current) => ({ ...current, [index]: true }))
  }

  return (
    <div
      className="hero__gallery"
      ref={gallery}
      aria-label="Imagens da vida na Coletividade"
      aria-roledescription="carrossel"
    >
      <div className="hero__frames">
        {slides.map((item, index) => (
          <figure
            key={item.src}
            className={active === index && ready[index] ? 'active' : ''}
            aria-hidden={active !== index}
            inert={active !== index ? true : undefined}
            style={{ '--hero-position': item.position, '--hero-fit': item.fit || 'cover' }}
          >
            {requested.includes(index) && (
              <GalleryImage
                ref={(element) => {
                  images.current[index] = element
                }}
                src={item.src}
                fullSrc={item.fullSrc}
                alt={item.alt}
                fetchPriority={index === 0 ? 'high' : 'low'}
                decoding="async"
                onLoad={() => imageReady(index)}
              >
                <canvas
                  className="hero__canvas"
                  aria-hidden="true"
                  ref={(element) => {
                    canvases.current[index] = element
                  }}
                  width="0"
                  height="0"
                />
              </GalleryImage>
            )}
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="hero__controls" aria-label="Selecionar imagem">
        {slides.map((item, index) => (
          <button
            type="button"
            key={item.src}
            className={active === index ? 'active' : ''}
            onClick={() => {
              setRequested((current) => (current.includes(index) ? current : [...current, index]))
              setPending(index)
            }}
            aria-busy={pending === index || undefined}
            aria-label={`Exibir imagem ${index + 1}: ${item.label}`}
            aria-current={active === index ? 'true' : undefined}
          />
        ))}
      </div>
      {!reduceMotion && (
        <button
          type="button"
          className="hero__playback"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? 'Retomar apresentação' : 'Pausar apresentação'}
        </button>
      )}
      <div className="hero__stamp">
        <span>São Paulo</span>
        <strong>CHSP</strong>
        <span>Brasil</span>
      </div>
    </div>
  )
}
