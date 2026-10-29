import GalleryImage from './GalleryImage.jsx'
import './section-hero-photos.css'

export default function CultureHeroPhotos() {
  return (
    <figure className="culture-hero-photos" aria-label="Memória e tradições da Coletividade">
      <span className="culture-hero-photos__memory">
        <GalleryImage
          src="/images/primeira-diretoria-chsp.webp"
          alt="Fotografia histórica da diretoria da Coletividade Helênica de São Paulo."
          width={1244}
          height={653}
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
