import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function PhotoViewer({ photos, index, trigger, onClose }) {
  const [current, setCurrent] = useState(index)
  const [failed, setFailed] = useState(false)
  const dialog = useRef(null)
  const photo = photos[current]
  const move = (step) => {
    setFailed(false)
    setCurrent((value) => (value + step + photos.length) % photos.length)
  }
  useEffect(() => {
    const modal = dialog.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    modal.showModal()
    return () => {
      modal.close()
      document.body.style.overflow = previousOverflow
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [trigger])
  return (
    <dialog
      ref={dialog}
      className="photo-viewer"
      aria-label="Galeria de fotos"
      aria-describedby="photo-viewer-caption"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
    >
      <div className="photo-viewer__body">
        <div className="photo-viewer__toolbar">
          <span aria-live="polite" aria-atomic="true">
            Foto {current + 1} de {photos.length}
          </span>
          <button type="button" onClick={onClose} aria-label="Fechar galeria" autoFocus>
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="photo-viewer__stage">
          {failed ? (
            <p role="status">Não foi possível carregar esta foto.</p>
          ) : (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.caption}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <div className="photo-viewer__footer">
          {photos.length > 1 && (
            <button type="button" onClick={() => move(-1)} aria-label="Foto anterior">
              <ChevronLeft aria-hidden="true" />
            </button>
          )}
          <p id="photo-viewer-caption" aria-live="polite">
            {photo.caption}
          </p>
          {photos.length > 1 && (
            <button type="button" onClick={() => move(1)} aria-label="Próxima foto">
              <ChevronRight aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}
