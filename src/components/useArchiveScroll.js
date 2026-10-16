import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export function saveArchiveScroll(pathname, search = '') {
  try {
    sessionStorage.setItem(`chsp:archive:${pathname}${search}`, String(window.scrollY))
  } catch {
    /* Optional navigation memory. */
  }
}

export default function useArchiveScroll() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const key = `chsp:archive:${location.pathname}${location.search}`
  useEffect(() => {
    let frame
    let cancelled = false
    let saveFrame
    const remember = () => {
      cancelAnimationFrame(saveFrame)
      saveFrame = requestAnimationFrame(() => saveArchiveScroll(location.pathname, location.search))
    }
    window.addEventListener('scroll', remember, { passive: true })
    if (navigationType === 'POP' || location.state?.restoreArchive) {
      try {
        const saved = Number(sessionStorage.getItem(key))
        if (Number.isFinite(saved) && saved > 0) {
          const restore = () => {
            if (cancelled) return
            frame = requestAnimationFrame(() =>
              window.scrollTo({ top: saved, behavior: 'instant' }),
            )
          }
          document.fonts?.ready.then(restore) ?? restore()
        }
      } catch {
        /* Navigation remains available if storage is disabled. */
      }
    }
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      cancelAnimationFrame(saveFrame)
      window.removeEventListener('scroll', remember)
    }
  }, [key, navigationType, location.state, location.pathname, location.search])
}
