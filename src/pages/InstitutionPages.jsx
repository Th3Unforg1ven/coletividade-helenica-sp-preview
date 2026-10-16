import { institutionSlugs, institutionNavSlugs, institutionLabels } from '../content/navigation.js'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, ContentHero } from '../components/ContentLayout.jsx'
import { LegacyHtml, PageNavigation } from '../components/ArchiveLayout.jsx'
import { stripHtml, extractLegacySection } from '../legacy-content.js'
import { pageBySlug } from '../content/site-data.js'
import NotFound from './NotFound.jsx'
import ResponsiveImage from '../ResponsiveImage.jsx'
const institutionVisuals = {
  'sobre-a-chsp': [
    '/images/contato-sede-original.webp',
    'Sede da Coletividade Helênica de São Paulo',
  ],
  'nossa-historia': [
    '/images/primeira-diretoria-chsp.webp',
    'Primeira diretoria da Coletividade, em 1937',
  ],
  'missao-visao-valores': [
    '/images/grupos-danca/pedilea-grupo.webp',
    'Integrantes e instrutores da Pedilea',
  ],
  'conselho-deliberativo-e-diretoria-executiva': [
    '/images/contato-sede-original.webp',
    'Sede da Coletividade',
  ],
  'lista-de-conselheiros': [
    '/images/primeira-diretoria-chsp.webp',
    'Registro histórico da primeira diretoria',
  ],
  'um-pouco-mais-sobre-a-grecia': ['/images/archive/e3282cda77-grecia.webp', 'Paisagem da Grécia'],
}
const institutionDescriptions = {
  'sobre-a-chsp': 'A casa da comunidade helênica: conheça nossa origem e atuação em São Paulo.',
  'nossa-historia': 'Da primeira diretoria às gerações que mantêm a cultura viva.',
  'missao-visao-valores': 'Os princípios que orientam a vida e o trabalho da nossa comunidade.',
  'conselho-deliberativo-e-diretoria-executiva':
    'Conheça a estrutura administrativa e os registros publicados pela instituição.',
  'lista-de-conselheiros':
    'Pessoas que participaram da construção e da continuidade da Coletividade.',
  'um-pouco-mais-sobre-a-grecia':
    'Território, história e símbolos que nos conectam às nossas raízes.',
}
function InstitutionChapters({ html }) {
  const chapters = html
    .split(/(?=<h2(?:\s|>))/i)
    .filter((part) => stripHtml(part).trim() || /<img/i.test(part))
  return (
    <div className="institution-chapters">
      {chapters.map((chapter, index) => (
        <section className="institution-chapter" key={index}>
          <LegacyHtml html={chapter} />
        </section>
      ))}
    </div>
  )
}
function InstitutionExplore() {
  return (
    <section className="institution-explore">
      <div>
        <p className="content-kicker">A cultura continua</p>
        <h2>Conheça a comunidade em movimento.</h2>
      </div>
      <div>
        <p>
          Encontre cursos, grupos de dança, encontros culturais e as histórias que compartilhamos.
        </p>
        <Link className="button" to="/cursos">
          Cursos e atividades <ArrowRight size={18} />
        </Link>
        <Link className="text-link" to="/agenda">
          Agenda e eventos <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

export function InstitutionIndex() {
  return (
    <main className="content-page content-page--themed content-page--coletividade">
      <Breadcrumbs items={[{ label: 'A Coletividade' }]} />
      <ContentHero
        eyebrow="A Coletividade"
        title="Uma história grega em São Paulo"
        introduction="Conheça a origem, a missão, as pessoas e os valores que sustentam a Coletividade Helênica de São Paulo."
        visual={
          <figure className="institution-mosaic">
            <ResponsiveImage
              src="/images/primeira-diretoria-chsp.webp"
              alt="Primeira diretoria da Coletividade"
            />
            <ResponsiveImage
              src="/images/grupos-danca/neolea-danca.webp"
              alt="Apresentação da Neolea Asteri"
            />
            <ResponsiveImage
              src="/images/grupos-danca/pedilea-grupo.webp"
              alt="Integrantes e instrutores da Pedilea"
            />
          </figure>
        }
        motifTheme="coletividade"
      />
      <section className="institution-summary institution-summary--intro">
        <p className="content-kicker">Quem somos</p>
        <div>
          <h2>A casa da comunidade helênica em São Paulo.</h2>
          <div>
            <p>
              Desde 1937, a Coletividade Helênica de São Paulo reúne gregos, descendentes,
              filo-helenos e todas as pessoas interessadas na preservação e na promoção da cultura
              grega.
            </p>
            <p>
              Na sede da Rua Bresser, no Brás, língua, dança, música, fé, gastronomia e memória
              fazem parte da vida da comunidade. Cursos, grupos de dança, encontros e celebrações
              aproximam gerações e mantêm essa cultura viva.
            </p>
            <Link className="text-link" to="/cursos">
              Conheça nossos cursos e atividades <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="institution-directory" aria-label="Conheça a Coletividade">
        <div className="collection-heading">
          <h2>Nossa casa, nossas histórias</h2>
          <span>Explore a Coletividade</span>
        </div>
        <div className="directory-grid">
          {institutionNavSlugs.map((slug) => (
            <Link
              className="directory-card institution-card"
              to={`/coletividade/${slug}`}
              key={slug}
            >
              <ResponsiveImage
                src={institutionVisuals[slug][0]}
                alt={institutionVisuals[slug][1]}
                loading="lazy"
              />
              <div>
                <span className="content-kicker">A Coletividade</span>
                <h2>{institutionLabels[slug]}</h2>
                <p>{institutionDescriptions[slug]}</p>
                <b>
                  Conhecer <ArrowRight size={16} />
                </b>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function InstitutionSectionPage({ title, introduction, image, html, children }) {
  const { slug } = useParams()
  const [sectionImage, sectionAlt] = institutionVisuals[slug] || institutionVisuals['sobre-a-chsp']
  return (
    <main className="content-page content-page--themed content-page--coletividade institution-detail">
      <Breadcrumbs items={[{ label: 'A Coletividade', to: '/coletividade' }, { label: title }]} />
      <ContentHero
        eyebrow="A Coletividade Helênica de São Paulo"
        title={title}
        introduction={introduction}
        image={image || sectionImage}
        imageAlt={sectionAlt}
        motifTheme="coletividade"
      />
      <div className="content-layout">
        <article>
          {children}
          {html && <InstitutionChapters html={html} />}
        </article>
        <PageNavigation
          slugs={institutionNavSlugs}
          basePath="/coletividade"
          labels={institutionLabels}
        />
      </div>
      <InstitutionExplore />
    </main>
  )
}

function GovernanceLinks() {
  const links = [
    ['Conselheiros eleitos de 2020 a 2024', '#conselheiros-2020-2024'],
    ['Conselheiros eleitos de 2022 a 2026', '#conselheiros-2022-2026'],
    ['Conselheiros vitalícios', '#conselheiros-vitalicios'],
    ['Ex-presidentes da Diretoria Executiva', '#ex-presidentes-diretoria'],
    ['Ex-presidentes do Conselho Deliberativo', '#ex-presidentes-conselho'],
  ]
  return (
    <nav className="governance-links" aria-label="Registros de conselheiros e ex-presidentes">
      <p className="content-kicker">Consulte os registros</p>
      {links.map(([label, hash]) => (
        <Link key={hash} to={`/coletividade/lista-de-conselheiros${hash}`}>
          {label}
          <ArrowRight size={16} />
        </Link>
      ))}
    </nav>
  )
}

export function InstitutionPage() {
  const { slug } = useParams()
  if (!institutionSlugs.includes(slug)) return <NotFound />
  if (slug === 'sobre-a-chsp') return <Navigate replace to="/coletividade" />
  if (slug === 'conselheiros') return <Navigate replace to="/coletividade/lista-de-conselheiros" />
  const source = pageBySlug['sobre-a-chsp']
  if (slug === 'nossa-historia')
    return (
      <InstitutionSectionPage
        title="Nossa história"
        introduction="Da fundação em 1937 ao trabalho educacional e cultural que atravessa gerações em São Paulo."
        image="/images/primeira-diretoria-chsp.webp"
        html={extractLegacySection(source.content, /^Nossa História$/i, /^No que acreditamos$/i)}
      />
    )
  if (slug === 'missao-visao-valores')
    return (
      <InstitutionSectionPage
        title="Missão, visão e valores"
        introduction="Os princípios que orientam a atuação cívica, religiosa, filantrópica, beneficente, cultural e recreativa da Coletividade."
        html={extractLegacySection(
          source.content,
          /^No que acreditamos$/i,
          /^diretoria executiva$/i,
        )
          .replace(/<h3>/g, '<h2>')
          .replace(/<\/h3>/g, '</h2>')}
      />
    )
  if (slug === 'conselho-deliberativo-e-diretoria-executiva')
    return (
      <InstitutionSectionPage
        title="Diretoria e conselhos"
        introduction="Conheça a estrutura administrativa publicada pela Coletividade e acesse os registros de quem ajudou a conduzir a instituição."
        html={extractLegacySection(
          source.content,
          /^diretoria executiva$/i,
          /^Conselheiros de 2020 a 2024$/i,
          true,
        )}
      >
        <GovernanceLinks />
      </InstitutionSectionPage>
    )
  if (slug === 'conselheiros' || slug === 'lista-de-conselheiros') {
    const page = pageBySlug['lista-de-conselheiros']
    return (
      <InstitutionSectionPage
        title="Conselheiros e ex-presidentes"
        introduction="Registros das pessoas que integraram os conselhos e presidiram os órgãos da Coletividade Helênica de São Paulo."
        image="/images/primeira-diretoria-chsp.webp"
        html={page.content}
      >
        <GovernanceLinks />
      </InstitutionSectionPage>
    )
  }
  if (slug === 'um-pouco-mais-sobre-a-grecia')
    return (
      <InstitutionSectionPage
        title="Um pouco mais sobre a Grécia"
        introduction="Informações essenciais para conhecer o território, a história e alguns dos símbolos da cultura grega."
        html={extractLegacySection(source.content, /^Um pouco mais sobre$/i, null, true)}
      />
    )
  return (
    <InstitutionSectionPage
      title="Sobre a Coletividade"
      introduction={institutionDescriptions[slug]}
      html={pageBySlug[slug].content.replace(/^<h3>[\s\S]*?<\/h1>/, '')}
    />
  )
}
