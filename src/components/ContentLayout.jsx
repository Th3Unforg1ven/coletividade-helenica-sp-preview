import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import InstagramIcon from '../InstagramIcon.jsx'
import GalleryImage from './GalleryImage.jsx'

import { mediaUrl } from '../content/media.js'
import archiveVariants from '../content/archive-variants.json'
import { updatePageSeo } from '../content/page-seo.js'

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Navegação estrutural">
      <Link to="/">Início</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          <b>/</b>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <em>{item.label}</em>}
        </span>
      ))}
    </nav>
  )
}

export function ContentHero({
  eyebrow,
  title,
  introduction,
  children,
  image,
  imageAlt = '',
  imagePosition,
  imageIllustration,
  motifTheme,
  visual,
  action,
  seoTitle,
  seoType = 'website',
  noIndex = false,
}) {
  const location = useLocation()
  const theme =
    motifTheme ||
    (location.pathname.startsWith('/cursos')
      ? 'aulas'
      : location.pathname.startsWith('/agenda')
        ? 'agenda'
        : location.pathname.startsWith('/cultura')
          ? 'cultura'
          : 'coletividade')
  useEffect(() => {
    const pageTitle = seoTitle || `${title} | Coletividade Helênica de São Paulo`
    const description =
      introduction ||
      'Conheça a Coletividade Helênica de São Paulo, sua história, aulas e atividades culturais.'
    updatePageSeo({
      pathname: location.pathname,
      title: pageTitle,
      description,
      image: mediaUrl(image),
      imageAlt,
      type: seoType,
      noIndex,
    })
  }, [title, introduction, seoTitle, image, imageAlt, location.pathname, seoType, noIndex])
  return (
    <header className={`content-hero content-hero--themed content-hero--${theme}`}>
      <div>
        <p className="content-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        {introduction && <p>{introduction}</p>}
        {children}
        {action && (
          <a
            className={`button content-hero__action${action.social ? ' button--instagram' : ''}`}
            href={action.href}
          >
            {action.social ? <InstagramIcon size={20} /> : <MessageCircle size={18} />}
            <span>{action.label}</span>
            <ArrowRight size={18} />
          </a>
        )}
      </div>
      {visual || (
        <figure className={image ? '' : 'content-hero__art'}>
          {image && (
            <GalleryImage
              src={mediaUrl(image)}
              variantWidths={archiveVariants[mediaUrl(image)]}
              alt={imageAlt || title}
              style={{ objectPosition: imagePosition }}
            />
          )}
          {imageIllustration && (
            <figcaption className="editorial-image-caption">Ilustração editorial</figcaption>
          )}
        </figure>
      )}
    </header>
  )
}
