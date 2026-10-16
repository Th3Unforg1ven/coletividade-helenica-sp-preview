import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { pageBySlug } from '../content/site-data.js'
import { lessonSlugs, pathForPage } from '../content/navigation.js'
import { decode, rewriteLegacyLinks } from '../legacy-content.js'

export function LegacyHtml({ html }) {
  return (
    <div className="wp-content" dangerouslySetInnerHTML={{ __html: rewriteLegacyLinks(html) }} />
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
            <ArrowRight size={15} />
          </Link>
        ))}
    </aside>
  )
}
