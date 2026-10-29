import { Link } from 'react-router-dom'

import { pageBySlug } from '../content/site-data.js'
import { lessonSlugs, pathForPage } from '../content/navigation.js'
import { decode, rewriteLegacyLinks } from '../legacy-content.js'
import { useMemo } from 'react'
import { usePhotoGallery } from './PhotoGallery.jsx'

export function LegacyHtml({ html }) {
  const openFrom = usePhotoGallery()
  const content = useMemo(() => rewriteLegacyLinks(html), [html])
  return (
    <div
      className="wp-content"
      onClick={(event) => {
        const trigger = event.target.closest('button[data-gallery-src]')
        if (trigger) openFrom(trigger)
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export function PageNavigation({ slugs, basePath, labels = {} }) {
  return (
    <aside className="page-navigation">
      <p>Nesta seção</p>
      {slugs
        .map((slug) => pageBySlug[slug])
        .filter(Boolean)
        .map((page) => (
          <Link
            key={page.id}
            to={lessonSlugs.includes(page.slug) ? pathForPage(page) : `${basePath}/${page.slug}`}
          >
            {page.slug === 'aulas-de-grego-moderno'
              ? 'Curso de Grego Moderno'
              : labels[page.slug] || decode(page.title)}
          </Link>
        ))}
    </aside>
  )
}
