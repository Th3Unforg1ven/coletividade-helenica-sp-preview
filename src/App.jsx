import { EncontroIcon, LivroIcon, CalendarioIcon } from './components/ChspIcons.jsx'
import { activities } from './content/home-activities.js'
import { siteContact } from './content/site-config.js'
import GreekLearningMosaic from './GreekLearningMosaic.jsx'
import HeroSlideshow from './HeroSlideshow.jsx'
import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ChevronDown, Languages, MapPin, Menu, Sparkles, X } from 'lucide-react'
import GalleryImage from './components/GalleryImage.jsx'
import { GalleryTrigger } from './components/PhotoGallery.jsx'
import responsiveVariants from './content/responsive-variants.json'
import IntroCover from './IntroCover.jsx'
import './intro-cover.css'
import { assetUrl, sectionTarget } from './paths.js'
import { updatePageSeo } from './content/page-seo.js'

const WA = siteContact.whatsapp
const LessonPage = lazy(() =>
  import('./pages/LessonPages.jsx').then((module) => ({ default: module.LessonPage })),
)
const LessonsIndex = lazy(() =>
  import('./pages/LessonPages.jsx').then((module) => ({ default: module.LessonsIndex })),
)
const InstitutionIndex = lazy(() =>
  import('./pages/InstitutionPages.jsx').then((module) => ({ default: module.InstitutionIndex })),
)
const InstitutionPage = lazy(() =>
  import('./pages/InstitutionPages.jsx').then((module) => ({ default: module.InstitutionPage })),
)
const CultureIndex = lazy(() =>
  import('./pages/CulturePages.jsx').then((module) => ({ default: module.CultureIndex })),
)
const CategoryPage = lazy(() =>
  import('./pages/CulturePages.jsx').then((module) => ({ default: module.CategoryPage })),
)
const MemoryPage = lazy(() =>
  import('./pages/CulturePages.jsx').then((module) => ({ default: module.MemoryPage })),
)
const PostPage = lazy(() =>
  import('./pages/CulturePages.jsx').then((module) => ({ default: module.PostPage })),
)
const ArchivePage = lazy(() =>
  import('./pages/ArchivePages.jsx').then((module) => ({ default: module.ArchivePage })),
)
const GenericPage = lazy(() =>
  import('./pages/ArchivePages.jsx').then((module) => ({ default: module.GenericPage })),
)
const AgendaPage = lazy(() => import('./pages/AgendaPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const MembershipPage = lazy(() => import('./pages/MembershipPage.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function shouldShowIntroCover() {
  if (import.meta.env.SSR) return false
  const hash = window.location.hash
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const relativePath = window.location.pathname.slice(basePath.length) || '/'
  const isHome = relativePath === '/'
  const search = new URLSearchParams(window.location.search)
  const forceIntro = search.get('intro') === '1'

  if (!isHome || hash || search.get('section')) return false
  if (forceIntro) return true
  try {
    return window.sessionStorage.getItem('chsp-intro-seen') !== '1'
  } catch {
    return true
  }
}

const trustGallery = [
  {
    src: '/images/aulas/presencial/biblioteca-em-aula.webp',
    label: 'Grego na nossa sede',
    copy: 'Aprendizado e convivência em uma aula presencial.',
  },
  {
    src: '/images/evento-comunidade-original.webp',
    label: 'Danças gregas',
    copy: 'Tradição que ganha vida em cada encontro.',
  },
  {
    src: '/images/oficinas-culturais-original.webp',
    label: 'Oficinas',
    copy: 'Saberes compartilhados entre gerações.',
  },
  {
    src: '/images/pascoa-comunidade-original.webp',
    label: 'Celebrações',
    copy: 'A comunidade reunida em São Paulo.',
  },
  {
    src: '/images/exposicao-cultural-original.webp',
    label: 'Cultura',
    copy: 'Memória grega apresentada à cidade.',
  },
  {
    src: '/images/primeira-diretoria-chsp.webp',
    label: 'Desde 1937',
    copy: 'Uma história construída por muitas pessoas.',
  },
]

const agenda = [
  {
    label: 'Calendário anual',
    type: 'Tradição e comunidade',
    title: 'Festividades Cívicas e Religiosas',
    place: 'Calendário grego e ortodoxo',
    href: '/agenda',
  },
  {
    label: 'Ao longo do ano',
    type: 'Cultura e convivência',
    title: 'Eventos e encontros da comunidade',
    place: 'Sede da CHSP e outros espaços',
    href: '/agenda',
  },
  {
    label: 'Como participar',
    type: 'Aprendizado e participação',
    title: 'Cursos e atividades culturais',
    place: 'Atividades presenciais e online',
    href: '/cursos',
  },
]

const faqs = [
  [
    'Preciso ter ascendência grega para participar?',
    'Não. A Coletividade recebe gregos, descendentes, filo-helenos e todas as pessoas interessadas em conhecer e viver a cultura helênica.',
  ],
  [
    'Nunca estudei grego. Posso começar agora?',
    'O curso atende do básico ao avançado, com aulas de 1h30 presenciais ou online. Consulte pelo WhatsApp quais turmas para iniciantes estão disponíveis.',
  ],
  [
    'Posso participar dos grupos de dança?',
    'A Pedilea é um grupo infantil gratuito para crianças de 5 a 11 anos; consulte a equipe sobre como participar. A Neolea Asteri é apresentada para acompanhamento de suas atividades pelo Instagram @neolea.asteri.',
  ],
  [
    'As oficinas e as aulas de bouzouki estão disponíveis?',
    'As oficinas são pontuais e divulgadas no Instagram @coletividadehelenica.sp. As aulas de bouzouki não estão acontecendo no momento.',
  ],
  [
    'Como descubro a turma ideal?',
    'Fale com a equipe pelo WhatsApp. Vamos entender seus conhecimentos, sua disponibilidade e seus objetivos para indicar o melhor ponto de partida.',
  ],
]

function Brand({ footer = false }) {
  return (
    <Link className={`brand ${footer ? 'brand--footer' : ''}`} to="/" aria-label="Página inicial">
      <img
        src={assetUrl('/images/chsp-logo-256.png')}
        alt="Símbolo da Coletividade Helênica"
        width="58"
        height="58"
      />
      <span>
        <strong>Coletividade Helênica</strong>
        <small>de São Paulo</small>
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleRef = useRef(null)
  const navRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 901px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    navRef.current?.querySelector('a')?.focus()
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (event.key === 'Tab') {
        const first = toggleRef.current
        const last = navRef.current?.querySelector('a:last-child')
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', closeWithEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      desktop.removeEventListener('change', closeOnDesktop)
      window.removeEventListener('keydown', closeWithEscape)
    }
  }, [open])
  const current = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`)
  return (
    <header className="header">
      <Brand />
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="main-navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        ref={navRef}
        id="main-navigation"
        className={open ? 'nav is-open' : 'nav'}
        onClick={() => setOpen(false)}
        onBlur={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget) &&
            event.relatedTarget !== toggleRef.current
          )
            setOpen(false)
        }}
        aria-label="Navegação principal"
      >
        <Link to="/coletividade" aria-current={current('/coletividade') ? 'page' : undefined}>
          A Coletividade
        </Link>
        <Link to="/cultura" aria-current={current('/cultura') ? 'page' : undefined}>
          Cultura e memória
        </Link>
        <Link to="/cursos" aria-current={current('/cursos') ? 'page' : undefined}>
          Cursos e atividades
        </Link>
        <Link to="/agenda" aria-current={current('/agenda') ? 'page' : undefined}>
          Agenda e eventos
        </Link>
        <Link
          className="nav__membership"
          to="/participe"
          aria-current={current('/participe') ? 'page' : undefined}
        >
          Associe-se
        </Link>
        <Link
          className="button button--small"
          to="/contato"
          aria-current={current('/contato') ? 'page' : undefined}
        >
          Fale conosco
        </Link>
      </nav>
    </header>
  )
}

function ActivityAction({ activity }) {
  const content = <>{activity.cta}</>
  return activity.external ? (
    <a
      className="button button--white"
      href={activity.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <Link className="button button--white" to={activity.href}>
      {content}
    </Link>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__content">
        <img
          className="hero__map"
          src={assetUrl('/images/mapa-grecia-linhas.webp')}
          alt=""
          aria-hidden="true"
        />
        <h1 className="hero__headline">
          A casa da Grécia
          <br />
          <em>em São Paulo.</em>
        </h1>
        <p className="hero__statement">
          A Grécia vive
          <br />
          <i>onde nós estamos.</i>
        </p>
        <p className="hero__lead">
          Língua, arte, música, fé, dança e memórias compartilhadas por gregos, descendentes e todos
          que escolhem viver a cultura helênica. Conheça o curso de Grego Moderno, os grupos de
          dança e os encontros culturais da nossa comunidade.
        </p>
        <div className="hero__facts">
          <span>Desde 1937 em São Paulo</span>
          <Link to="/contato">
            <MapPin size={14} /> Rua Bresser, 793
          </Link>
        </div>
        <div className="hero__actions">
          <Link className="button" to={sectionTarget('aulas')}>
            Cursos e atividades
          </Link>
          <Link className="text-link" to="/coletividade/nossa-historia">
            Conheça nossa história
          </Link>
        </div>
      </div>
      <HeroSlideshow />
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__identity">
        <Brand footer />
        <p>
          Rua Bresser, 793, Brás
          <br />
          São Paulo, SP
        </p>
        <div className="footer__greece">
          <img src={assetUrl('/images/bandeira-grecia.svg')} alt="Bandeira da Grécia" />
          <span>Brasil e Grécia unidos pela cultura</span>
        </div>
      </div>
      <nav className="footer__nav" aria-label="Explore a Coletividade">
        <span>Explore</span>
        <Link to="/coletividade">A Coletividade</Link>
        <Link to="/cultura">Cultura e memória</Link>
        <Link to="/agenda">Agenda e eventos</Link>
      </nav>
      <nav className="footer__nav" aria-label="Participe da Coletividade">
        <span>Participe</span>
        <Link to="/cursos">Cursos e atividades</Link>
        <Link to="/participe">Associe-se</Link>
        <Link to={sectionTarget('duvidas')}>Perguntas frequentes</Link>
      </nav>
      <nav className="footer__nav footer__nav--contact" aria-label="Canais de contato">
        <span>Converse</span>
        <a href={WA} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <Link to="/contato">Contato</Link>
        <div className="footer__socials">
          <a href={siteContact.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={siteContact.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </nav>
      <div className="footer__bottom">
        <small>© {new Date().getFullYear()} Coletividade Helênica de São Paulo</small>
        <div className="footer__privacy" data-privacy-controls>
          <Link to="/privacidade">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  const location = useLocation()
  const [showIntro] = useState(shouldShowIntroCover)
  const [activity, setActivity] = useState(0)
  const [faq, setFaq] = useState(0)
  const current = activities[activity]
  const Icon = current.icon
  const navigateActivityTabs = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? activities.length - 1
          : (activity + (event.key === 'ArrowRight' ? 1 : -1) + activities.length) %
            activities.length
    setActivity(next)
    event.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus()
  }

  useEffect(() => {
    const description =
      'Língua, arte, música, fé, dança e memória compartilhadas pela Coletividade Helênica de São Paulo desde 1937.'
    updatePageSeo({ pathname: '/', title: 'Coletividade Helênica de São Paulo', description })
    const scrollToHash = () => {
      const id =
        new URLSearchParams(location.search).get('section') || window.location.hash.replace('#', '')
      if (!id) return
      window.requestAnimationFrame(() => {
        const target = document.getElementById(id)
        if (!target) return
        const root = document.documentElement
        const previousBehavior = root.style.scrollBehavior
        root.style.scrollBehavior = 'auto'
        window.scrollTo(0, Math.max(0, target.offsetTop - 94))
        root.style.scrollBehavior = previousBehavior
      })
    }
    document.fonts?.ready.then(scrollToHash) ?? scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [location.search])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      {showIntro && <IntroCover />}
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />

        <section className="manifesto section" id="sobre">
          <p className="section-index">Nossa essência</p>
          <div className="manifesto__grid">
            <h2>
              Uma comunidade
              <br />
              feita de <em>encontros.</em>
            </h2>
            <div>
              <p className="large-copy">
                Há quase nove décadas, aproximamos São Paulo da cultura grega e mantemos vivas as
                histórias que atravessaram o oceano.
              </p>
              <p>
                Representamos associados, gregos, descendentes e filo-helenos por meio de aulas,
                encontros, celebrações e ações culturais. Nossa missão é cívica, religiosa,
                filantrópica, beneficente, cultural e recreativa.
              </p>
              <Link className="text-link" to={sectionTarget('memoria')}>
                Descubra nossa trajetória
              </Link>
            </div>
          </div>
          <div className="values">
            <div>
              <strong>1937</strong>
              <span>
                ano de fundação
                <br />
                em São Paulo
              </span>
            </div>
            <div>
              <strong lang="el">Παιδεία</strong>
              <span>
                educação que
                <br />
                forma e transforma
              </span>
            </div>
            <div>
              <strong lang="el">Φιλία</strong>
              <span>
                amizade que
                <br />
                cria comunidade
              </span>
            </div>
            <div>
              <strong lang="el">Μνήμη</strong>
              <span>
                memória que
                <br />
                mantém raízes vivas
              </span>
            </div>
          </div>
        </section>

        <section className="trust section" id="comunidade" aria-labelledby="trust-title">
          <div className="section-heading section-heading--dark">
            <div>
              <p className="section-index">Uma comunidade real</p>
              <h2 id="trust-title">
                Um lugar para viver
                <br />
                <em>a cultura grega.</em>
              </h2>
            </div>
            <p>
              Conheça alguns dos espaços, encontros e momentos que formam a história da Coletividade
              Helênica de São Paulo.
            </p>
          </div>
          <div className="trust__gallery">
            {trustGallery.map((item, index) => (
              <figure className={`trust__item trust__item--${index + 1}`} key={item.src}>
                <GalleryImage
                  src={item.src}
                  alt={`${item.label} na Coletividade Helênica de São Paulo`}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <strong>{item.label}</strong>
                  <span>{item.copy}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="experiences section" id="aulas">
          <div className="section-heading">
            <div>
              <p className="section-index light">Cursos e atividades</p>
              <h2>
                Não é só aprender.
                <br />
                <em>É se transformar.</em>
              </h2>
            </div>
            <p>Cursos, grupos de dança e encontros para aprender e conviver com a comunidade.</p>
          </div>
          <div
            className="experience-tabs"
            role="tablist"
            aria-label="Cursos e atividades"
            onKeyDown={navigateActivityTabs}
          >
            {activities.map((item, i) => (
              <button
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-controls={`panel-${item.id}`}
                aria-selected={activity === i}
                tabIndex={activity === i ? 0 : -1}
                key={item.id}
                className={activity === i ? 'active' : ''}
                onClick={() => setActivity(i)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div
            className="experience-card"
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            key={current.id}
          >
            {current.id === 'grego' ? (
              <GreekLearningMosaic />
            ) : (
              <div
                className="experience-card__symbol"
                style={{
                  '--experience-image': `url(${assetUrl(current.visual)})`,
                  '--experience-image-mobile': `url(${assetUrl(responsiveVariants[current.visual]?.includes(640) ? current.visual.replace(/\.webp$/, '-640.webp') : current.visual)})`,
                  '--experience-size': current.visualSize || 'cover',
                  '--experience-position': current.visualPosition || 'center',
                }}
              >
                <GalleryTrigger
                  src={current.visual}
                  caption={current.title}
                  className="experience-card__photo-trigger"
                />
                <Icon strokeWidth={1} />
                <span>
                  <b lang="el">{current.greek}</b> • {current.eyebrow}
                </span>
              </div>
            )}
            <div className="experience-card__copy">
              <p className="eyebrow">
                <span lang="el">{current.greek}</span> • {current.eyebrow}
              </p>
              <h3>{current.statement}</h3>
              <p>{current.copy}</p>
              <div className="activity-tags">
                <span>{current.status}</span>
              </div>
              <ul>
                {current.meta.map((item) => (
                  <li key={item}>
                    <Sparkles size={15} />
                    {item}
                  </li>
                ))}
              </ul>
              <ActivityAction activity={current} />
            </div>
          </div>
          <div className="activity-discoveries" aria-label="Mais atividades da Coletividade">
            <Link to="/cursos/historia-mitologia-filosofia">
              <span>Curso online</span>
              <h3>História, Mitologia e Filosofia Grega</h3>
              <p>Conheça o programa e o professor do curso.</p>
              <b>Explorar o curso</b>
            </Link>
            <Link to="/cursos/clube-de-cinema-grego">
              <span>Cinema e comunidade</span>
              <h3>Clube de Cinema Grego</h3>
              <p>Filmes gregos e encontros na nossa sede.</p>
              <b>Conhecer o clube</b>
            </Link>
          </div>
          <Link className="text-link activities-all" to="/cursos">
            Ver todas as atividades
          </Link>
        </section>

        <section className="language section">
          <div className="greek-word" lang="el" aria-hidden="true">
            μιλώ
          </div>
          <div className="language__content">
            <p className="section-index">Grego Moderno</p>
            <h2>
              Quando você aprende
              <br />a língua, o mundo
              <br />
              <em>ganha outra voz.</em>
            </h2>
            <p>
              Você deixa de apenas visitar a Grécia para realmente conversar com ela. Entende uma
              canção, reconhece uma história de família e descobre sentidos que nenhuma tradução
              alcança por inteiro.
            </p>
            <div className="language__features">
              <span>
                <LivroIcon /> Metodologia oficial grega
              </span>
              <span>
                <EncontroIcon /> Professores nativos
              </span>
              <span>
                <Languages /> Presencial e online
              </span>
            </div>
            <Link className="button" to="/cursos/grego-moderno">
              Conheça o curso de grego
            </Link>
          </div>
          <aside className="quote-card">
            <span>“</span>
            <blockquote>
              Aprender grego transforma a maneira como você vive a história humana e se conecta com
              a ancestralidade.
            </blockquote>
            <small>O que o aprendizado pode despertar</small>
          </aside>
        </section>

        <section className="agenda section" id="agenda">
          <div className="section-heading section-heading--dark">
            <div>
              <p className="section-index">Agenda da comunidade</p>
              <h2>
                A cultura ganha vida
                <br />
                <em>quando nos reunimos.</em>
              </h2>
            </div>
            <Link className="text-link" to="/agenda">
              Consultar programação
            </Link>
          </div>
          <div className="agenda__list">
            {agenda.map((event) => (
              <article key={event.title}>
                <div className="date date--label">
                  <CalendarioIcon size={20} />
                  <span>{event.label}</span>
                </div>
                <div>
                  <p>{event.type}</p>
                  <h3>
                    <Link to={event.href}>{event.title}</Link>
                  </h3>
                </div>
                <span className="place">
                  <MapPin size={16} />
                  {event.place}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="memory section" id="memoria">
          <div className="memory__image">
            <GalleryImage
              src="/images/primeira-diretoria-chsp.webp"
              alt="Primeira diretoria da Coletividade Helênica de São Paulo"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="memory__copy">
            <p className="section-index">Cultura e memória</p>
            <p className="greek-label" lang="el">
              Από γενιά σε γενιά
            </p>
            <h2>
              De geração
              <br />
              <em>em geração.</em>
            </h2>
            <p>
              Preservar uma cultura é dar futuro à memória. Reunimos relatos, fotografias, música,
              gastronomia, destinos e curiosidades para que cada geração encontre seu próprio
              caminho até a Grécia.
            </p>
            <Link className="text-link" to="/cultura/paginas/acontece-memorias">
              Explore nosso acervo
            </Link>
          </div>
        </section>

        <section className="faq section" id="duvidas">
          <p className="section-index">Dúvidas frequentes</p>
          <div className="faq__grid">
            <h2>
              Comece por
              <br />
              <em>uma conversa.</em>
            </h2>
            <div>
              {faqs.map((item, i) => (
                <div className={`faq__item ${faq === i ? 'open' : ''}`} key={item[0]}>
                  <button
                    type="button"
                    onClick={() => setFaq(faq === i ? -1 : i)}
                    aria-expanded={faq === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span>{item[0]}</span>
                    <ChevronDown aria-hidden="true" />
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    aria-hidden={faq !== i}
                    inert={faq !== i ? true : undefined}
                  >
                    <p>{item[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="join">
          <p className="greek-label" lang="el">
            Η κοινότητά μας
          </p>
          <h2>
            Essa história também
            <br />
            pode ser <em>sua.</em>
          </h2>
          <p>
            Ao se associar, você fortalece os laços com a comunidade e contribui para manter viva a
            cultura grega em São Paulo. Conheça as etapas e saiba como participar.
          </p>
          <div>
            <Link className="button button--white" to="/participe">
              Saiba como se associar
            </Link>
            <Link className="text-link text-link--white" to="/agenda">
              Ver agenda e eventos
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function InteriorPage({ children }) {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const targetId = decodeURIComponent(location.hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])
  return (
    <div className="inner-page">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <Header />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

class PageErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, details) {
    console.error('Falha ao exibir a página', error, details)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <main className="page-error" role="alert">
        <img src={assetUrl('/images/chsp-logo-256.png')} alt="" width="72" height="72" />
        <p className="eyebrow">Coletividade Helênica de São Paulo</p>
        <h1>Não foi possível abrir esta página.</h1>
        <p>O conteúdo continua disponível. Tente novamente ou retorne à página inicial.</p>
        <div>
          <button className="button" type="button" onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
          <Link className="text-link" to="/">
            Ir para o início
          </Link>
        </div>
      </main>
    )
  }
}

function App() {
  const location = useLocation()
  return (
    <PageErrorBoundary key={location.pathname}>
      <Suspense
        fallback={
          <main className="route-loading" aria-live="polite">
            <img src={assetUrl('/images/chsp-logo-256.png')} alt="" width="64" height="64" />
            <p>Carregando conteúdo...</p>
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/cursos"
            element={
              <InteriorPage>
                <LessonsIndex />
              </InteriorPage>
            }
          />
          <Route path="/aulas" element={<Navigate replace to="/cursos" />} />
          <Route
            path="/cursos/:slug"
            element={
              <InteriorPage>
                <LessonPage />
              </InteriorPage>
            }
          />
          <Route
            path="/aulas/:slug"
            element={
              <InteriorPage>
                <LessonPage />
              </InteriorPage>
            }
          />
          <Route
            path="/coletividade"
            element={
              <InteriorPage>
                <InstitutionIndex />
              </InteriorPage>
            }
          />
          <Route
            path="/coletividade/:slug"
            element={
              <InteriorPage>
                <InstitutionPage />
              </InteriorPage>
            }
          />
          <Route
            path="/agenda"
            element={
              <InteriorPage>
                <AgendaPage />
              </InteriorPage>
            }
          />
          <Route
            path="/cultura"
            element={
              <InteriorPage>
                <CultureIndex />
              </InteriorPage>
            }
          />
          <Route
            path="/cultura/categoria/:slug"
            element={
              <InteriorPage>
                <CategoryPage />
              </InteriorPage>
            }
          />
          <Route
            path="/cultura/paginas/acontece-memorias"
            element={
              <InteriorPage>
                <MemoryPage />
              </InteriorPage>
            }
          />
          <Route
            path="/cultura/paginas/:slug"
            element={
              <InteriorPage>
                <GenericPage eyebrow="Cultura e memória" />
              </InteriorPage>
            }
          />
          <Route
            path="/cultura/:slug"
            element={
              <InteriorPage>
                <PostPage />
              </InteriorPage>
            }
          />
          <Route
            path="/participe"
            element={
              <InteriorPage>
                <MembershipPage />
              </InteriorPage>
            }
          />
          <Route
            path="/contato"
            element={
              <InteriorPage>
                <ContactPage />
              </InteriorPage>
            }
          />
          <Route
            path="/privacidade"
            element={
              <InteriorPage>
                <GenericPage fixedSlug="politica-de-privacidade" eyebrow="Privacidade" />
              </InteriorPage>
            }
          />
          <Route
            path="/paginas/:slug"
            element={
              <InteriorPage>
                <GenericPage />
              </InteriorPage>
            }
          />
          <Route
            path="/arquivo"
            element={
              <InteriorPage>
                <ArchivePage />
              </InteriorPage>
            }
          />
          <Route
            path="*"
            element={
              <InteriorPage>
                <NotFound />
              </InteriorPage>
            }
          />
        </Routes>
      </Suspense>
    </PageErrorBoundary>
  )
}

export default App
