import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { assetUrl } from './paths.js'

const MarbleCanvas = lazy(() => import('./MarbleCanvas.jsx'))

export default function IntroCover() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const [assetsReady, setAssetsReady] = useState(false)
  const coverRef = useRef(null)
  const sealRef = useRef(null)
  const startExitRef = useRef(() => {})
  const disposeMarbleRef = useRef(() => {})
  const markCanvasReady = useCallback(() => setCanvasReady(true), [])
  const ready = canvasReady && assetsReady

  useEffect(() => {
    document.body.classList.add('intro-active')
    return () => document.body.classList.remove('intro-active')
  }, [])

  useEffect(() => {
    let cancelled = false
    const seal = sealRef.current
    const fontReady = document.fonts?.ready ?? Promise.resolve()
    const sealReady = seal?.complete
      ? (seal.decode?.().catch(() => {}) ?? Promise.resolve())
      : new Promise(resolve => {
          seal?.addEventListener('load', resolve, { once: true })
          seal?.addEventListener('error', resolve, { once: true })
        })

    Promise.all([fontReady, sealReady]).then(() => {
      if (cancelled) return
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!cancelled) setAssetsReady(true)
      }))
    })

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    let wheelIntent = 0
    let wheelResetTimer
    let touchStartY = null

    const open = () => {
      if (!ready || exiting) return
      setExiting(true)
      startExitRef.current()
      try { window.sessionStorage.setItem('chsp-intro-seen', '1') }
      catch { /* A abertura continua funcionando mesmo sem armazenamento disponível. */ }
      window.setTimeout(() => {
        disposeMarbleRef.current()
        requestAnimationFrame(() => {
          document.body.classList.remove('intro-active')
          setVisible(false)
        })
      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 80 : 1040)
    }
    const wheel = event => {
      if (event.deltaY <= 0) return
      wheelIntent += Math.min(event.deltaY, 45)
      clearTimeout(wheelResetTimer)
      wheelResetTimer = window.setTimeout(() => { wheelIntent = 0 }, 420)
      if (wheelIntent >= 72) open()
    }
    const touchStart = event => { touchStartY = event.touches[0]?.clientY ?? null }
    const touchMove = event => {
      const currentY = event.touches[0]?.clientY
      if (touchStartY !== null && typeof currentY === 'number' && touchStartY - currentY >= 56) open()
    }
    const touchEnd = () => { touchStartY = null }
    const keyDown = event => {
      if (event.repeat) return
      if (['Enter', ' ', 'ArrowDown', 'PageDown'].includes(event.key)) {
        event.preventDefault()
        open()
      }
    }
    const button = coverRef.current.querySelector('.intro-cover__action')
    button.addEventListener('click', open)
    window.addEventListener('wheel', wheel, { passive: true })
    window.addEventListener('keydown', keyDown)
    coverRef.current.addEventListener('touchstart', touchStart, { passive: true })
    coverRef.current.addEventListener('touchmove', touchMove, { passive: true })
    coverRef.current.addEventListener('touchend', touchEnd, { passive: true })
    return () => {
      clearTimeout(wheelResetTimer)
      button.removeEventListener('click', open)
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('keydown', keyDown)
      coverRef.current?.removeEventListener('touchstart', touchStart)
      coverRef.current?.removeEventListener('touchmove', touchMove)
      coverRef.current?.removeEventListener('touchend', touchEnd)
    }
  }, [exiting, ready])

  if (!visible) return null
  return <section ref={coverRef} className={`intro-cover${ready ? ' is-ready' : ''}${exiting ? ' is-exiting' : ''}`} aria-labelledby="intro-cover-title" aria-busy={!ready}>
    <Suspense fallback={<div className="intro-cover__marble intro-cover__marble--fallback" aria-hidden="true" />}>
      <MarbleCanvas sealRef={sealRef} startExitRef={startExitRef} disposeRef={disposeMarbleRef} onReady={markCanvasReady} />
    </Suspense>
    <div className="intro-cover__content">
      <p className="intro-cover__welcome" lang="el">ΚΑΛΩΣ ΗΡΘΑΤΕ</p>
      <img ref={sealRef} className="intro-cover__seal" src={assetUrl('/images/chsp-logo-256.png')} alt="Brasão da Coletividade Helênica de São Paulo" width="142" height="142" />
      <h1 id="intro-cover-title">Coletividade Helênica de São Paulo</h1>
      <p className="intro-cover__tagline">Desde 1937, a casa da Grécia em São Paulo.</p>
      <button className="intro-cover__action" type="button" disabled={!ready}>Entre e conheça</button>
    </div>
    <span className="intro-cover__scroll" aria-hidden="true"><span className="intro-cover__scroll-desktop">Role</span><span className="intro-cover__scroll-mobile">Arraste</span></span>
    <span className="intro-cover__inscription" lang="el" aria-hidden="true">ΜΝΗΜΗ · ΠΑΙΔΕΙΑ · ΦΙΛΙΑ</span>
  </section>
}
