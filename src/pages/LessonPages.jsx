import GalleryImage from '../components/GalleryImage.jsx'
import { siteContact } from '../content/site-config.js'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'

import { Breadcrumbs, ContentHero } from '../components/ContentLayout.jsx'
import { WorkshopStories, CinemaFeature } from '../ActivityStories.jsx'
import { KoineCover, KoineCourse, HistoryCourse, BouzoukiCourse } from '../CourseStories.jsx'
import DanceGroupBody, { DanceHero, DanceOverview } from '../DanceGroups.jsx'
import { danceGroups, danceHistories } from '../content/dance-groups.js'
import GreekCourse, { GreekCourseCover } from '../GreekCourse.jsx'
import {
  courseIntroductions,
  lessonImages,
  lessonStatus,
  bouzoukiPhoto,
  koineCourse,
} from '../content/courses.js'
import { lessonSlugs, pathForPage } from '../content/navigation.js'
import NotFound from './NotFound.jsx'

export function LessonsIndex() {
  const groups = [
    {
      id: 'cursos',
      title: 'Cursos',
      cards: [
        {
          title: 'Curso de Grego Moderno',
          slug: 'aulas-de-grego-moderno',
          action: 'Conhecer o curso',
        },
        {
          title: koineCourse.title,
          href: koineCourse.path,
          status: koineCourse.status,
          description:
            'Grego bíblico com o professor Efstathios Tsotsos. Aulas online, com formação de novas turmas conforme o interesse.',
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
      id: 'grupos-de-danca',
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
      id: 'atividades-culturais',
      title: 'Atividades culturais',
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
                '/images/grupos-danca/neolea-danca.webp',
                'Apresentação de danças gregas da Neolea Asteri',
              ],
              [
                'grego',
                '/images/aulas/presencial/professora-em-aula.webp',
                'Professora e quadro de uma aula presencial de Grego Moderno',
              ],
              [
                'oficinas',
                '/images/oficinas-culturais-original.webp',
                'Participantes de uma oficina cultural na Coletividade',
              ],
              [
                'pedilea',
                '/images/grupos-danca/pedilea-grupo.webp',
                'Integrantes da Pedilea e seus instrutores',
              ],
              ['bouzouki', bouzoukiPhoto.src, bouzoukiPhoto.alt],
            ].map(([key, src, alt]) => (
              <span key={key} className={`activities-mosaic__${key}`}>
                <GalleryImage src={src} alt={alt} decoding="async" />
              </span>
            ))}
          </figure>
        }
        motifTheme="aulas"
        seoTitle="Cursos e atividades | Coletividade Helênica de São Paulo"
      >
        <nav className="activity-shortcuts" aria-label="Ir para cursos e atividades">
          {groups.map((group) => (
            <a key={group.id} href={`#${group.id}`}>
              {group.title}
            </a>
          ))}
        </nav>
      </ContentHero>
      {groups.map((group) => (
        <section className="activity-directory" key={group.id} aria-labelledby={group.id}>
          <h2 id={group.id} tabIndex={-1}>
            {group.title}
          </h2>
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
                <b>{card.action}</b>
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
  if (slug === koineCourse.slug) {
    if (location.pathname.startsWith('/aulas/'))
      return <Navigate replace to={`${koineCourse.path}${location.search}${location.hash}`} />
    return (
      <main className="content-page content-page--greek">
        <Breadcrumbs
          items={[{ label: 'Cursos e atividades', to: '/cursos' }, { label: koineCourse.title }]}
        />
        <ContentHero
          eyebrow="Curso online"
          title={koineCourse.title}
          introduction="Aproxime-se dos textos bíblicos em sua língua original. Um curso online para quem deseja conhecer o grego Koiné e sua tradição de leitura."
          image="/images/cursos/codex-sinaiticus.jpg"
          imageAlt="Páginas em grego do Codex Sinaiticus na British Library"
          visual={<KoineCover />}
          action={{ href: siteContact.whatsapp, label: 'Tenho interesse no curso' }}
        />
        <div className="activity-tags activity-tags--detail">
          <span>Sem turma no momento</span>
        </div>
        <KoineCourse />
      </main>
    )
  }
  if (['historia-mitologia-filosofia', 'clube-de-cinema-grego'].includes(slug)) {
    const cinema = slug === 'clube-de-cinema-grego'
    const title = cinema ? 'Clube de Cinema Grego' : 'História, Mitologia e Filosofia Grega'
    return (
      <main className={`content-page${cinema ? '' : ' content-page--greek'}`}>
        <Breadcrumbs items={[{ label: 'Cursos e atividades', to: '/cursos' }, { label: title }]} />
        <ContentHero
          image={
            cinema
              ? '/images/atividades/cinema-sala.webp'
              : '/images/archive/e3282cda77-grecia.webp'
          }
          action={
            cinema
              ? undefined
              : { href: siteContact.whatsapp, label: 'Consultar turma e inscrição' }
          }
          eyebrow={cinema ? 'Cinema e comunidade' : 'Curso online'}
          title={title}
          introduction={
            cinema
              ? 'Histórias que aproximam a Grécia e a nossa comunidade.'
              : 'Dos mitos de origem à filosofia clássica, do mundo greco-romano à cultura bizantina. Um percurso em dois módulos com o professor Efstathios Tsotsos.'
          }
        />
        {!cinema && (
          <div className="activity-tags activity-tags--detail">
            <span>Dois módulos</span>
          </div>
        )}
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
      className={`content-page${['aulas-de-grego-moderno', 'aulas-de-bouzouki'].includes(slug) ? ' content-page--greek' : ''}`}
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
        imageAlt={slug === 'aulas-de-bouzouki' ? bouzoukiPhoto.alt : undefined}
        visual={
          slug === 'aulas-de-grego-moderno' ? (
            <GreekCourseCover />
          ) : slug === 'aulas-de-danca' ? (
            <DanceHero group={danceGroups['neolea-asteri']} />
          ) : undefined
        }
        action={
          slug === 'aulas-de-grego-moderno'
            ? { href: siteContact.whatsapp, label: 'Consultar vagas e valores' }
            : slug === 'aulas-de-bouzouki'
              ? { href: siteContact.whatsapp, label: 'Consultar novidades' }
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
        <BouzoukiCourse />
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
