import { useMemo, useRef } from 'react'
import { readArchiveFilters, updateArchiveFilters } from '../content/archive-navigation.js'
import useArchiveScroll from '../components/useArchiveScroll.js'
import ResponsiveImage from '../ResponsiveImage.jsx'
import {
  publicationTopicLabel,
  culturalTopics,
  matchesTopic,
  normalizeSearch,
} from '../content/cultural-topics.js'
import CommunityMemories from '../CommunityMedia.jsx'
import PostCard from '../components/PostCard.jsx'
import { culturalPageSlugs } from '../content/navigation.js'
import { Link, useParams, useSearchParams, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, ContentHero } from '../components/ContentLayout.jsx'
import { LegacyHtml } from '../components/ArchiveLayout.jsx'
import { decode, stripHtml } from '../legacy-content.js'
import { siteContent, pageBySlug, postBySlug, categoryById } from '../content/site-data.js'
import { assetUrl, routeUrl } from '../paths.js'
import NotFound from './NotFound.jsx'
import '../cultural-topics.css'
import CultureHeroPhotos from '../components/CultureHeroPhotos.jsx'
import { prepareArticle, publicationDate } from '../content/article-presentation.js'
import { mediaUrl } from '../content/media.js'
export function CultureIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { query, categoryId, visibleCount, topicId } = readArchiveFilters(
    searchParams,
    siteContent.posts.length,
  )
  useArchiveScroll()
  const updateFilters = (updates) =>
    setSearchParams(updateArchiveFilters(searchParams, updates), { replace: true })
  const resultsHeading = useRef(null)
  const categories = siteContent.categories.filter(
    (category) => category.count > 0 && category.slug !== 'uncategorized',
  )
  const searchIndex = useMemo(
    () =>
      new Map(
        siteContent.posts.map((post) => [
          post.id,
          normalizeSearch(
            `${decode(post.title)} ${stripHtml(post.excerpt)} ${stripHtml(post.content)}`,
          ),
        ]),
      ),
    [],
  )
  const normalizedQuery = normalizeSearch(query)
  const filteredPosts = siteContent.posts.filter((post) => {
    const matchesCategory = categoryId === 'all' || post.categories.includes(Number(categoryId))
    return (
      matchesCategory &&
      matchesTopic(post, topicId) &&
      (!normalizedQuery || searchIndex.get(post.id).includes(normalizedQuery))
    )
  })
  const activeTopic = culturalTopics.find((topic) => topic.id === topicId)
  function clearFilters() {
    updateFilters({ q: '', categoria: 'all', tema: 'all', limite: 12 })
  }
  function selectTopic(id) {
    updateFilters({ q: '', categoria: 'all', tema: id, limite: 12 })
    requestAnimationFrame(() => {
      document.getElementById('acervo').scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      })
      resultsHeading.current?.focus({ preventScroll: true })
    })
  }
  const updateQuery = (event) => {
    updateFilters({ q: event.target.value, limite: 12 })
  }
  const updateCategory = (event) => {
    updateFilters({ categoria: event.target.value, limite: 12 })
  }
  return (
    <main className="content-page content-page--themed content-page--cultura">
      <Breadcrumbs items={[{ label: 'Cultura e memória' }]} />
      <ContentHero
        eyebrow="Cultura e memória"
        title="Grécia para ler, ouvir, provar e lembrar"
        introduction="Explore guias sobre a cultura grega e publicações que preservam a história da nossa comunidade."
        visual={<CultureHeroPhotos />}
        motifTheme="cultura"
      >
        <a className="culture-archive-shortcut" href="#acervo">
          Buscar no acervo <ArrowRight size={18} />
        </a>
      </ContentHero>
      <section className="cultural-topics" aria-labelledby="cultural-topics-title">
        <p className="content-kicker">Escolha por onde começar</p>
        <h2 id="cultural-topics-title">Encontre o seu tema.</h2>
        <div className="cultural-topics__grid">
          {culturalTopics.map((topic) => (
            <button
              type="button"
              key={topic.id}
              aria-pressed={topicId === topic.id}
              onClick={() => selectTopic(topic.id)}
            >
              <ResponsiveImage src={topic.image} alt="" loading="lazy" width={640} height={360} />
              <span>
                <strong>{topic.title}</strong>
                <small>{topic.description}</small>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
      <section className="archive-tools" id="acervo" aria-label="Pesquisar o acervo cultural">
        <label>
          <span>Buscar no acervo</span>
          <input
            type="search"
            value={query}
            onChange={updateQuery}
            placeholder="Digite um tema, lugar ou título"
          />
        </label>
        <label>
          <span>Categoria</span>
          <select value={categoryId} onChange={updateCategory}>
            <option value="all">Todas as categorias</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {decode(category.name)} ({category.count})
              </option>
            ))}
          </select>
        </label>
      </section>
      <div className="collection-heading">
        <h2 ref={resultsHeading} tabIndex={-1}>
          {activeTopic?.title || 'Publicações'}
        </h2>
        <span role="status" aria-live="polite">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'}
        </span>
        {(query || categoryId !== 'all' || topicId !== 'all') && (
          <button className="archive-clear" type="button" onClick={clearFilters}>
            Limpar filtros
          </button>
        )}
      </div>
      {filteredPosts.length ? (
        <>
          <section className="posts-grid">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </section>
          {visibleCount < filteredPosts.length && (
            <div className="load-more">
              <button
                type="button"
                className="button"
                onClick={() => updateFilters({ limite: visibleCount + 12 })}
              >
                Carregar mais publicações
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="empty-results">Nenhuma publicação corresponde aos filtros selecionados.</p>
      )}
      <nav className="category-links" aria-label="Abrir páginas das categorias">
        {categories.map((category) => (
          <Link to={`/cultura/categoria/${category.slug}`} key={category.id}>
            {decode(category.name)} <span>{category.count}</span>
          </Link>
        ))}
      </nav>
      <CommunityMemories />
      <section className="cultural-pages">
        <h2>Páginas culturais do acervo</h2>
        {culturalPageSlugs
          .map((slug) => pageBySlug[slug])
          .filter(Boolean)
          .map((page) => (
            <Link to={`/cultura/paginas/${page.slug}`} key={page.id}>
              {decode(page.title)}
              <ArrowRight size={15} />
            </Link>
          ))}
      </section>
    </main>
  )
}

export function CategoryPage() {
  useArchiveScroll()
  const { slug } = useParams()
  const category = siteContent.categories.find((item) => item.slug === slug)
  if (!category) return <NotFound />
  const posts = siteContent.posts.filter((post) => post.categories.includes(category.id))
  return (
    <main className="content-page">
      <Breadcrumbs
        items={[{ label: 'Cultura e memória', to: '/cultura' }, { label: decode(category.name) }]}
      />
      <ContentHero
        eyebrow="Cultura e memória"
        title={decode(category.name)}
        introduction={`${posts.length} publicações disponíveis nesta coleção.`}
      />
      <section className="posts-grid">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </main>
  )
}

export function MemoryPage() {
  useArchiveScroll()
  const category = siteContent.categories.find((item) => item.slug === 'memorias')
  const posts = category
    ? siteContent.posts.filter((post) => post.categories.includes(category.id))
    : []
  return (
    <main className="content-page memory-landing">
      <Breadcrumbs
        items={[{ label: 'Cultura e memória', to: '/cultura' }, { label: 'Memórias' }]}
      />
      <ContentHero
        eyebrow="Cultura e memória"
        title="Memórias da Coletividade"
        introduction="Desde 1937, festas, encontros, viagens e histórias de vida formam a memória da Coletividade Helênica de São Paulo."
        image="/images/primeira-diretoria-chsp.webp"
      />
      <section className="collection-intro">
        <p className="content-kicker">Histórias que permanecem</p>
        <div>
          <h2>
            Quase nove décadas
            <br />
            em imagens e relatos.
          </h2>
          <p>
            Este acervo reúne lembranças da imigração grega, exposições realizadas pela
            Coletividade, trajetórias familiares e momentos importantes para a comunidade. Cada
            relato ajuda a preservar essa história e a transmiti-la às próximas gerações.
          </p>
        </div>
      </section>
      <div className="collection-heading">
        <h2>Explore as memórias</h2>
        <span>{posts.length} histórias preservadas</span>
      </div>
      <section className="posts-grid">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </main>
  )
}

export function PostPage() {
  const { slug } = useParams()
  const location = useLocation()
  const post = postBySlug[slug] || postBySlug[encodeURIComponent(slug).toLowerCase()]
  const article = useMemo(() => prepareArticle(post?.content), [post])
  if (!post) return <NotFound />
  const category = categoryById[post.categories[0]]
  return (
    <main className="content-page">
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: decode(post.title),
          description: stripHtml(post.excerpt),
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: 'pt-BR',
          image: post.featuredMedia?.sourceUrl
            ? [
                new URL(
                  assetUrl(mediaUrl(post.featuredMedia.sourceUrl)),
                  import.meta.env.VITE_SITE_ORIGIN,
                ).href,
              ]
            : undefined,
          mainEntityOfPage: new URL(
            assetUrl(`/cultura/${post.slug}/`),
            import.meta.env.VITE_SITE_ORIGIN,
          ).href,
          publisher: {
            '@type': 'Organization',
            name: 'Coletividade Helênica de São Paulo',
            url: new URL(import.meta.env.BASE_URL, import.meta.env.VITE_SITE_ORIGIN).href,
          },
        })}
      </script>
      <Breadcrumbs
        items={[{ label: 'Cultura e memória', to: '/cultura' }, { label: decode(post.title) }]}
      />
      <div className={`article-context${post.editorial ? '' : ' article-context--historical'}`}>
        <Link to={location.state?.archiveReturn || '/cultura'} state={{ restoreArchive: true }}>
          ← Voltar ao acervo
        </Link>
        <p>
          <time dateTime={post.date}>Publicado em {publicationDate(post.date)}</time> · Leitura de{' '}
          {article.minutes} min
        </p>
        {!post.editorial && (
          <p>
            <strong>Registro histórico do acervo.</strong> Datas, serviços e condições mencionados
            se referem à época da publicação.
          </p>
        )}
      </div>
      <ContentHero
        eyebrow={publicationTopicLabel(post) || decode(category?.name || 'Cultura')}
        seoType="article"
        title={decode(post.title)}
        introduction={stripHtml(post.excerpt)}
        image={post.featuredMedia?.sourceUrl}
        imageAlt={post.featuredMedia?.alt}
        imagePosition={post.featuredMedia?.position}
        imageIllustration={post.featuredMedia?.illustration}
      />
      <div className="content-layout">
        <article>
          {article.headings.length > 1 && (
            <nav className="article-toc" aria-label="Neste artigo">
              <strong>Neste artigo</strong>
              <ol>
                {article.headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <LegacyHtml html={article.html} />
          {post.sources?.length > 0 && (
            <details className="wp-content editorial-sources">
              <summary>Fontes e referências</summary>
              <ul>
                {post.sources.map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href.startsWith('/') ? routeUrl(href) : href}
                      target={href.startsWith('/') ? undefined : '_blank'}
                      rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
          {post.related?.length > 0 && (
            <nav className="wp-content" aria-label="Publicações relacionadas">
              <h2>Continue a leitura</h2>
              <ul>
                {post.related
                  .map((slug) => postBySlug[slug])
                  .filter(Boolean)
                  .map((item) => (
                    <li key={item.slug}>
                      <a
                        href={
                          item.editorial
                            ? assetUrl(`/cultura/${item.slug}/`)
                            : routeUrl(`/cultura/${item.slug}`)
                        }
                      >
                        {decode(item.title)}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          )}
          {post.cta && (
            <Link className="button" to={post.cta.href}>
              {post.cta.label} <ArrowRight size={16} />
            </Link>
          )}
        </article>
        <aside className="page-navigation">
          <p>Informações</p>
          <span>Publicado em {publicationDate(post.date)}</span>
          {post.categories
            .map((id) => categoryById[id])
            .filter(Boolean)
            .map((item) => (
              <Link to={`/cultura/categoria/${item.slug}`} key={item.id}>
                {decode(item.name)}
                <ArrowRight size={15} />
              </Link>
            ))}
          {post.cta && (
            <Link to={post.cta.href}>
              {post.cta.label}
              <ArrowRight size={16} />
            </Link>
          )}
        </aside>
      </div>
    </main>
  )
}
