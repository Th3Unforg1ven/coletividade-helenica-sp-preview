import GalleryImage from './GalleryImage.jsx'
import './section-hero-photos.css'
import { memoryPhotos } from '../content/memory-photos.js'

export default function CultureHeroPhotos() {
  return (
    <figure className="culture-hero-photos" aria-label="Memória e tradições da Coletividade">
      <span className="culture-hero-photos__memory">
        <GalleryImage
          src={memoryPhotos.culture.src}
          alt={memoryPhotos.culture.alt}
          width={1024}
          height={681}
          style={{ objectPosition: memoryPhotos.culture.position }}
        />
      </span>
      <span className="culture-hero-photos__tradition">
        <GalleryImage
          src="/images/grupos-danca/neolea-celebracao.webp"
          alt="Integrantes da comunidade com trajes tradicionais e a bandeira grega na sede da Coletividade."
          width={1600}
          height={1200}
        />
      </span>
    </figure>
  )
}
