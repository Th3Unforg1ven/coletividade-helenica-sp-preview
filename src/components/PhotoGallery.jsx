import { lazy, Suspense, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ResponsiveImage from '../ResponsiveImage.jsx'
import { assetUrl } from '../paths.js'
import './photo-gallery.css'
import { GalleryContext } from './gallery-context.js'

const PhotoViewer = lazy(() => import('./PhotoViewer.jsx'))

export function PhotoGalleryProvider({ children }) {
  const [gallery, setGallery] = useState(null)
  const location = useLocation()
  function openFrom(trigger) {
    const scope = trigger.closest('[data-gallery-group], main, article') || trigger.parentElement
    const triggers = [...scope.querySelectorAll('[data-gallery-src]')]
    setGallery({
      photos: triggers.map((item) => ({
        src: item.dataset.gallerySrc,
        caption: item.dataset.galleryCaption || item.querySelector('img')?.alt || 'Foto do acervo',
      })),
      index: triggers.indexOf(trigger),
      trigger,
      location,
    })
  }
  function close() {
    gallery?.trigger?.focus({ preventScroll: true })
    setGallery(null)
  }
  return (
    <GalleryContext.Provider value={openFrom}>
      {children}
      {gallery && gallery.location === location && (
        <Suspense fallback={null}>
          <PhotoViewer key={location.key} {...gallery} onClose={close} />
        </Suspense>
      )}
    </GalleryContext.Provider>
  )
}

export function usePhotoGallery() {
  return useContext(GalleryContext)
}

export function GalleryTrigger({ src, caption, className = '', children }) {
  const openFrom = usePhotoGallery()
  return (
    <button
      className={`gallery-photo ${className}`.trim()}
      type="button"
      data-gallery-src={assetUrl(src)}
      data-gallery-caption={caption}
      aria-label={`Ampliar foto: ${caption}`}
      aria-haspopup="dialog"
      onClick={(event) => openFrom(event.currentTarget)}
    >
      {children}
    </button>
  )
}

export default function GalleryPhoto({ src, displaySrc = src, caption, className, ...imageProps }) {
  return (
    <figure className={className}>
      <GalleryTrigger src={src} caption={caption}>
        <ResponsiveImage src={displaySrc} alt={caption} loading="lazy" {...imageProps} />
      </GalleryTrigger>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
