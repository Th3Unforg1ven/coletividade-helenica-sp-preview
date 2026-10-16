import { pathForPage } from '../content/navigation.js'
import {
  consolidatedFallbacks,
  pageContentOverrides,
  pageTitles,
  pageIntroductions,
} from '../content/page-config.js'
import { Link, Navigate, useParams, useLocation } from 'react-router-dom'

import { Breadcrumbs, ContentHero } from '../components/ContentLayout.jsx'
import { LegacyHtml } from '../components/ArchiveLayout.jsx'
import { decode, stripHtml } from '../legacy-content.js'
import {
  siteContent,
  pageBySlug,
  hiddenArchiveSlugs,
  publicArchivePages,
} from '../content/site-data.js'

import NotFound from './NotFound.jsx'
function FullPage({ page, eyebrow = 'Coletividade Helênica de São Paulo', navigation }) {
  if (!page) return <NotFound />
  const fallback = pageBySlug[consolidatedFallbacks[page.slug]]
  const originalIsEmpty = !page.content.trim()
  const displayedContent =
    pageContentOverrides[page.slug] ||
    (originalIsEmpty && fallback ? fallback.content : page.content)
  return (
    <main className="content-page">
      <Breadcrumbs items={[{ label: eyebrow }]} />
      <ContentHero
        eyebrow={eyebrow}
        title={pageTitles[page.slug] || decode(page.title)}
        introduction={pageIntroductions[page.slug] || stripHtml(page.excerpt)}
        image={page.featuredMedia?.sourceUrl}
      />
      <div className="content-layout">
        <article>
          {originalIsEmpty && (
            <div className="consolidation-note">
              <h2>Conteúdo consolidado</h2>
              <p>
                A página anterior não possuía texto próprio. O conteúdo relacionado disponível em
                outra página institucional foi apresentado aqui para evitar uma seção vazia.
              </p>
            </div>
          )}
          {displayedContent ? (
            <LegacyHtml html={displayedContent} />
          ) : (
            <div className="consolidation-note">
              <h2>Página preservada</h2>
              <p>
                Esta página existia na navegação anterior, mas não possuía conteúdo público
                cadastrado no WordPress.
              </p>
            </div>
          )}
        </article>
        {navigation}
      </div>
    </main>
  )
}

export function ArchivePage() {
  return (
    <main className="content-page">
      <Breadcrumbs items={[{ label: 'Arquivo integral' }]} />
      <ContentHero
        eyebrow="Arquivo histórico"
        title="Conteúdo preservado da Coletividade"
        introduction={`${publicArchivePages.length} páginas institucionais e ${siteContent.posts.length} publicações históricas acessíveis.`}
      />
      <section className="archive-columns">
        <div>
          <h2>Páginas</h2>
          {publicArchivePages.map((page) => (
            <Link to={pathForPage(page)} key={page.id}>
              <span>{decode(page.title)}</span>
              <small>{page.slug}</small>
            </Link>
          ))}
        </div>
        <div>
          <h2>Publicações</h2>
          {siteContent.posts.map((post) => (
            <Link to={`/cultura/${post.slug}`} key={post.id}>
              <span>{decode(post.title)}</span>
              <small>{new Intl.DateTimeFormat('pt-BR').format(new Date(post.date))}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export function GenericPage({ fixedSlug, eyebrow = 'Arquivo do site anterior' }) {
  const params = useParams()
  const location = useLocation()
  const slug = fixedSlug || params.slug
  const page = pageBySlug[slug]
  if (!page || (!fixedSlug && hiddenArchiveSlugs.has(slug))) return <NotFound />
  if (!fixedSlug) {
    const canonicalPath = pathForPage(page)
    if (canonicalPath !== location.pathname.replace(/\/$/, ''))
      return <Navigate replace to={canonicalPath} />
  }
  return <FullPage page={page} eyebrow={eyebrow} />
}
