import ResponsiveImage from '../ResponsiveImage.jsx'
import './section-hero-photos.css'

export default function CultureHeroPhotos() {
  return (
    <figure className="culture-hero-photos" aria-label="Memória e tradições da Coletividade">
      <span className="culture-hero-photos__memory">
        <ResponsiveImage
          src="/images/archive/d816786101-fotos-exposicao-noivas.webp"
          alt="Fotografias de famílias gregas apresentadas na exposição Noivas."
          width={1024}
          height={768}
        />
      </span>
      <span className="culture-hero-photos__tradition">
        <ResponsiveImage
          src="/images/atividades/ovos-detalhe.webp"
          alt="Pintura de um ovo de Páscoa durante uma oficina da Coletividade."
          width={1200}
          height={1600}
        />
      </span>
    </figure>
  )
}
