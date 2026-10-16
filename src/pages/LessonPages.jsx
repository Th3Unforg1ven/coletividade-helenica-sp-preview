import { siteContact } from '../content/site-config.js'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, ContentHero } from '../components/ContentLayout.jsx'
import { WorkshopStories, CinemaFeature, HistoryCourse } from '../ActivityStories.jsx'
import DanceGroupBody, { DanceHero, DanceOverview } from '../DanceGroups.jsx'
import { danceGroups, danceHistories } from '../content/dance-groups.js'
import GreekCourse, { GreekTeacherMosaic } from '../GreekCourse.jsx'
import {
  courseIntroductions,
  courseTitles,
  lessonImages,
  lessonStatus,
} from '../content/courses.js'
import { lessonSlugs, pathForPage } from '../content/navigation.js'
import { assetUrl } from '../paths.js'
import NotFound from './NotFound.jsx'
import ResponsiveImage from '../ResponsiveImage.jsx'

export function LessonsIndex() {
  const groups = [
    {
      title: 'Cursos',
      cards: [
        {
          title: 'Curso de Grego Moderno',
          slug: 'aulas-de-grego-moderno',
          action: 'Conhecer o curso',
        },
        {
          title: 'História, Mitologia e Filosofia Grega',
          href: '/cursos/historia-mitologia-filosofia',
          status: ['Online', 'Dois módulos'],
          description:
            'Das origens gregas ao legado de Bizâncio, com o professor Efstathios Tsotsos.',
          action: 'Conhecer o programa',
        },
        { title: 'Bouzouki', slug: 'aulas-de-bouzouki', action: 'Conhecer a atividade' },
      ],
    },
    {
      title: 'Grupos de dança',
      cards: [
        {
          title: 'Pedilea',
          href: '/cursos/pedilea',
          slug: 'aulas-de-danca',
          status: ['Grupo de dança infantil', 'Grupo ativo', 'Gratuito'],
          description:
            'Crianças de 5 a 11 anos. Ensaios aos sábados, das 12h30 às 13h30, na sede da Coletividade.',
          action: 'Conhecer o grupo',
        },
        {
          title: 'Neolea Asteri',
          href: '/cursos/neolea-asteri',
          slug: 'aulas-de-danca',
          status: ['Grupo de dança', 'Grupo ativo'],
          description:
            'Conheça a trajetória do grupo de danças folclóricas gregas e acompanhe suas novidades no Instagram @neolea.asteri.',
          action: 'Conhecer o grupo',
        },
      ],
    },
    {
      title: 'Oficinas culturais',
      cards: [
        {
          title: 'Clube de Cinema Grego',
          href: '/cursos/clube-de-cinema-grego',
          status: ['Nova atividade', 'Programação anunciada'],
          description:
            'Filmes gregos com legendas em português e encontros na sede da Coletividade.',
          action: 'Conhecer o clube',
        },
        {
          title: 'Encontros e oficinas culturais',
          slug: 'oficinas-culturais',
          action: 'Consultar informações',
        },
      ],
    },
  ]
  return (
    <main className="content-page content-page--themed content-page--aulas">
      <Breadcrumbs items={[{ label: 'Cursos e atividades' }]} />
      <ContentHero
        eyebrow="Cursos e atividades"
        title="Aprenda e viva a cultura grega"
        introduction="Cursos de língua e música, grupos de dança e encontros culturais: descubra as formas de participar e confira a situação de cada atividade."
        visual={
          <figure
            className="activities-mosaic"
            aria-label="Língua, dança, oficinas e música na Coletividade"
          >
            {[
              [
                'neolea',
                '/images/grupos-danca/neolea-danca.jpeg',
                'Apresentação de danças gregas da Neolea Asteri',
              ],
              [
                'grego',
                '/images/aulas/turma-grego-encontro-1.svg',
                'Turma do curso de Grego Moderno em uma aula online',
              ],
              [
                'oficinas',
                '/images/oficinas-culturais-original.webp',
                'Participantes de uma oficina cultural na Coletividade',
              ],
              [
                'pedilea',
                '/images/grupos-danca/pedilea-grupo.jpeg',
                'Integrantes da Pedilea e seus instrutores',
              ],
              [
                'bouzouki',
                '/images/archive/28c0d6ffd7-kostakis2-1024x473.webp',
                'Registro histórico de apresentação musical com bouzouki na Coletividade',
              ],
            ].map(([key, src, alt]) => (
              <span key={key} className={`activities-mosaic__${key}`}>
                <img src={assetUrl(src)} alt={alt} decoding="async" />
              </span>
            ))}
          </figure>
        }
        motifTheme="aulas"
        seoTitle="Cursos e atividades | Coletividade Helênica de São Paulo"
      />
      {groups.map((group) => (
        <section className="activity-directory" key={group.title}>
          <h2>{group.title}</h2>
          <div className="directory-grid">
            {group.cards.map((card) => (
              <Link
                className="directory-card"
                to={
                  card.href ||
                  `/cursos/${card.slug === 'aulas-de-grego-moderno' ? 'grego-moderno' : card.slug}`
                }
                key={card.title}
              >
                <div className="activity-tags">
                  {(card.status || lessonStatus[card.slug]).map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description || courseIntroductions[card.slug]}</p>
                <b>
                  {card.action} <ArrowRight size={16} />
                </b>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export function LessonPage() {
  const { slug: routeSlug } = useParams()
  const location = useLocation()
  const slug = routeSlug === 'grego-moderno' ? 'aulas-de-grego-moderno' : routeSlug
  if (['historia-mitologia-filosofia', 'clube-de-cinema-grego'].includes(slug)) {
    const cinema = slug === 'clube-de-cinema-grego'
    const title = cinema ? 'Clube de Cinema Grego' : 'História, Mitologia e Filosofia Grega'
    return (
      <main className="content-page">
        <Breadcrumbs items={[{ label: 'Cursos e atividades', to: '/cursos' }, { label: title }]} />
        <ContentHero
          image={
            cinema
              ? '/images/atividades/cinema-sala.webp'
              : '/images/archive/e3282cda77-grecia.webp'
          }
          eyebrow={cinema ? 'Cinema e comunidade' : 'Curso online'}
          title={title}
          introduction={
            cinema
              ? 'Histórias que aproximam a Grécia e a nossa comunidade.'
              : 'Conheça o programa, o professor e as informações do curso.'
          }
        />
        {cinema ? <CinemaFeature full /> : <HistoryCourse />}
      </main>
    )
  }
  if (danceGroups[slug]) return <DanceGroupPage slug={slug} />
  if (!lessonSlugs.includes(slug)) return <NotFound />
  const page = {
    slug,
    title: { 'aulas-de-bouzouki': 'Aulas de Bouzouki', 'oficinas-culturais': 'Oficinas Culturais' }[
      slug
    ],
  }
  if (location.pathname !== pathForPage(page))
    return <Navigate replace to={`${pathForPage(page)}${location.search}${location.hash}`} />
  const title =
    slug === 'aulas-de-grego-moderno'
      ? 'Curso de Grego Moderno'
      : slug === 'aulas-de-danca'
        ? 'Grupos de Danças Gregas'
        : page.title
  return (
    <main
      className={`content-page${slug === 'aulas-de-grego-moderno' ? ' content-page--greek' : ''}`}
    >
      <Breadcrumbs items={[{ label: 'Cursos e atividades', to: '/cursos' }, { label: title }]} />
      <ContentHero
        eyebrow={lessonStatus[slug][0]}
        title={title}
        seoTitle={
          slug === 'aulas-de-grego-moderno'
            ? 'Curso de Grego Moderno em São Paulo e online | CHSP'
            : undefined
        }
        introduction={courseIntroductions[slug]}
        image={lessonImages[slug]}
        visual={
          slug === 'aulas-de-grego-moderno' ? (
            <GreekTeacherMosaic />
          ) : slug === 'aulas-de-danca' ? (
            <DanceHero group={danceGroups['neolea-asteri']} />
          ) : undefined
        }
        action={
          slug === 'aulas-de-grego-moderno'
            ? { href: siteContact.whatsapp, label: 'Consultar vagas e valores' }
            : slug === 'oficinas-culturais'
              ? { href: siteContact.instagram, label: 'Acompanhar no Instagram', social: true }
              : undefined
        }
      />
      <div className="activity-tags activity-tags--detail">
        {lessonStatus[slug].slice(1).map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      {slug === 'oficinas-culturais' ? (
        <WorkshopStories />
      ) : slug === 'aulas-de-grego-moderno' ? (
        <GreekCourse />
      ) : slug === 'aulas-de-danca' ? (
        <DanceOverview />
      ) : (
        <div className="content-layout">
          <article>
            <BouzoukiCourse />
          </article>
          <aside className="page-navigation">
            <p>Nesta seção</p>
            {lessonSlugs.map((item) => (
              <Link key={item} to={pathForPage({ slug: item })}>
                {courseTitles[item]}
                <ArrowRight size={15} />
              </Link>
            ))}
          </aside>
        </div>
      )}
    </main>
  )
}

function DanceGroupPage({ slug }) {
  const group = danceGroups[slug]
  return (
    <main className="content-page content-page--greek">
      <Breadcrumbs
        items={[
          { label: 'Cursos e atividades', to: '/cursos' },
          { label: 'Grupos de dança', to: '/cursos/aulas-de-danca' },
          { label: group.name },
        ]}
      />
      <ContentHero
        eyebrow={group.category}
        title={group.name}
        introduction={group.intro}
        visual={<DanceHero group={group} />}
        seoTitle={`${group.name} — grupo de danças gregas em São Paulo | CHSP`}
        action={
          slug === 'pedilea'
            ? { href: siteContact.whatsapp, label: 'Como participar' }
            : { href: group.socialUrl, label: 'Acompanhar no Instagram', social: true }
        }
      />
      <div className="activity-tags activity-tags--detail">
        <span>Grupo ativo</span>
        {slug === 'pedilea' && <span>Gratuito</span>}
      </div>
      <DanceGroupBody
        slug={slug}
        history={
          <div className="wp-content">
            {danceHistories[slug].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        }
      />
    </main>
  )
}

function BouzoukiCourse() {
  return (
    <div className="wp-content">
      <h2>Sobre o bouzouki</h2>
      <p>
        O bouzouki é um instrumento de cordas da família do alaúde e um dos símbolos mais
        reconhecidos da música grega. Seu nome deriva da palavra turca <em>buzuk</em>, e sua
        sonoridade atravessa repertórios tradicionais e populares.
      </p>
      <p>
        Tanto no continente quanto nas ilhas, a música acompanha celebrações religiosas, casamentos,
        encontros comunitários e diferentes danças. O bouzouki pode ser ouvido em formações
        tradicionais e em ritmos como o sirtaki e o hasapiko.
      </p>
      <p>
        Mikis Theodorakis, Vasilis Tsitsanis e Manolis Karantinis estão entre os artistas que
        ajudaram a projetar a força e a identidade desse instrumento.
      </p>
      <h2>Sem aulas no momento</h2>
      <p>
        As aulas de bouzouki não estão acontecendo atualmente. Não há uma data de retomada
        confirmada para divulgação.
      </p>
      <h2>Informações sobre as aulas</h2>
      <p>Para consultar eventuais novidades, entre em contato com a Coletividade.</p>
      <p>
        <Link to="/contato">Consultar a equipe da Coletividade</Link>
      </p>
      <figure>
        <ResponsiveImage
          src="/images/aulas-bouzouki-original.webp"
          loading="lazy"
          decoding="async"
          alt="Instrumentos musicais na Coletividade Helênica de São Paulo"
        />
      </figure>
    </div>
  )
}
