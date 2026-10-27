import ResponsiveImage from '../ResponsiveImage.jsx'
import { GalleryTrigger } from './PhotoGallery.jsx'

// A photo without its own caption/layout, for covers, portraits and mosaics.
export default function GalleryImage({ src, fullSrc = src, alt = '', children, ...imageProps }) {
  const caption = alt || 'Foto do acervo da Coletividade'
  return (
    <GalleryTrigger src={fullSrc} caption={caption} className="gallery-photo--inline">
      <ResponsiveImage src={src} alt={alt} {...imageProps} />
      {children}
    </GalleryTrigger>
  )
}
