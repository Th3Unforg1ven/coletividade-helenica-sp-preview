import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')

    if (reduceMotion.matches || coarsePointer.matches || navigator.connection?.saveData) {
      return undefined
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.85,
      easing: value => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.82,
    })

    const syncWithIntro = () => {
      if (document.body.classList.contains('intro-active')) lenis.stop()
      else lenis.start()
    }

    const introObserver = new MutationObserver(syncWithIntro)
    introObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    syncWithIntro()

    return () => {
      introObserver.disconnect()
      lenis.destroy()
    }
  }, [])

  return null
}
