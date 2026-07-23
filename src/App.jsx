import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowDown, ArrowRight, BookOpen, CalendarDays, ChevronDown,
  Languages, MapPin, Menu, Music2, Sparkles, Users, X
} from 'lucide-react'
import ResponsiveImage from './ResponsiveImage.jsx'
import IntroCover from './IntroCover.jsx'
import './intro-cover.css'
import { assetUrl, sectionTarget } from './paths.js'

const WA = 'https://wa.link/ryey8t'
const lazyPage = name => lazy(() => import('./ContentPages.jsx').then(module => ({ default: module[name] })))
const AgendaPage = lazyPage('AgendaPage')
const ArchivePage = lazyPage('ArchivePage')
const CategoryPage = lazyPage('CategoryPage')
const ContactPage = lazyPage('ContactPage')
const CultureIndex = lazyPage('CultureIndex')
const GenericPage = lazyPage('GenericPage')
const InstitutionIndex = lazyPage('InstitutionIndex')
const InstitutionPage = lazyPage('InstitutionPage')
const LessonPage = lazyPage('LessonPage')
const LessonsIndex = lazyPage('LessonsIndex')
const MemoryPage = lazyPage('MemoryPage')
const NotFound = lazyPage('NotFound')
const PostPage = lazyPage('PostPage')

function shouldShowIntroCover() {
  const usesHashRouter = import.meta.env.VITE_ROUTER_MODE === 'hash'
  const hash = window.location.hash
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const relativePath = window.location.pathname.slice(basePath.length) || '/'
  const isHome = usesHashRouter
    ? !hash || hash === '#' || hash === '#/'
    : relativePath === '/'
  const search = new URLSearchParams(window.location.search)
  const forceIntro = search.get('intro') === '1'

  if (!isHome || hash || search.get('section')) return false
  if (forceIntro) return true
  try { return window.sessionStorage.getItem('chsp-intro-seen') !== '1' }
  catch { return true }
}

const activities = [
  {
    id: 'grego', greek: 'ΓΛΩΣΣΑ', eyebrow: 'Língua', title: 'Grego Moderno',
    statement: 'Uma nova língua. Uma parte de você que ganha voz.',
    copy: 'Aprenda a conversar, viajar e acessar a cultura grega sem tradução. Turmas do elementar ao avançado, com professores nativos e metodologia alinhada à certificação oficial.',
    meta: ['Presencial ou online', 'Adultos e crianças', 'Do básico ao avançado'],
    icon: Languages, visual: '/images/aulas-grego-turma-recorte-original.webp', visualSize: 'auto 116%', visualPosition: 'center',
    href: '/aulas/aulas-de-grego-moderno',
  },
  {
    id: 'danca', greek: 'ΧΟΡΟΣ', eyebrow: 'Dança', title: 'Danças Gregas',
    statement: 'O corpo aprende aquilo que a memória não esquece.',
    copy: 'Entre ritmos, passos e histórias de cada região, a dança cria pertencimento, saúde e amizades. Aulas para quem começa agora e grupos de apresentação.',
    meta: ['Aulas presenciais', 'Crianças, jovens e adultos', 'Grupo Hellas e Pedilea'],
    icon: Users, visual: '/images/aulas-danca-original.webp', href: '/aulas/aulas-de-danca',
  },
  {
    id: 'bouzouki', greek: 'ΜΟΥΣΙΚΗ', eyebrow: 'Música', title: 'Bouzouki',
    statement: 'Toque o som que atravessou gerações.',
    copy: 'Conheça o instrumento-símbolo da música grega e desenvolva repertório, expressão e conexão cultural em uma vivência musical compartilhada.',
    meta: ['Aprendizado musical', 'Repertório tradicional', 'Cultura em cada acorde'],
    icon: Music2, visual: '/images/aulas-bouzouki-original.webp', href: '/aulas/aulas-de-bouzouki',
  },
]

const trustGallery = [
  { src: '/images/sala-aulas-sede-original.webp', label: 'Nossa sede', copy: 'Espaços preparados para aprender e conviver.' },
  { src: '/images/evento-comunidade-original.webp', label: 'Danças gregas', copy: 'Tradição que ganha vida em cada encontro.' },
  { src: '/images/oficinas-culturais-original.webp', label: 'Oficinas', copy: 'Saberes compartilhados entre gerações.' },
  { src: '/images/pascoa-comunidade-original.webp', label: 'Celebrações', copy: 'A comunidade reunida em São Paulo.' },
  { src: '/images/exposicao-cultural-original.webp', label: 'Cultura', copy: 'Memória grega apresentada à cidade.' },
  { src: '/images/primeira-diretoria-chsp.webp', label: 'Desde 1937', copy: 'Uma história construída por muitas pessoas.' },
]

const agenda = [
  { label: 'Calendário anual', type: 'Tradição e comunidade', title: 'Festividades Cívicas e Religiosas', place: 'Datas divulgadas na agenda', href: '/cultura/paginas/festividades-civicas-e-religiosas' },
  { label: 'Ao longo do ano', type: 'Cultura e convivência', title: 'Eventos e encontros da comunidade', place: 'Sede da CHSP e outros espaços', href: '/agenda' },
  { label: 'Novas turmas', type: 'Aprendizado e participação', title: 'Aulas e oficinas culturais', place: 'Atividades presenciais e online', href: '/aulas' },
]

const faqs = [
  ['Preciso ter ascendência grega para participar?', 'Não. A Coletividade recebe gregos, descendentes, filo-helenos e todas as pessoas interessadas em conhecer e viver a cultura helênica.'],
  ['Nunca estudei grego. Posso começar agora?', 'Sim. Há turmas específicas para iniciantes, além de níveis intermediários e avançados. As aulas duram 1h30 e podem ser presenciais ou online.'],
  ['Como descubro a turma ideal?', 'Fale com a equipe pelo WhatsApp. Vamos entender seus conhecimentos, sua disponibilidade e seus objetivos para indicar o melhor ponto de partida.'],
]

function Brand({ footer = false }) {
  return <Link className={`brand ${footer ? 'brand--footer' : ''}`} to="/" aria-label="Página inicial">
    <img src={assetUrl('/images/chsp-logo-256.png')} alt="Símbolo da Coletividade Helênica" width="58" height="58" />
    <span><strong>Coletividade Helênica</strong><small>de São Paulo</small></span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleRef = useRef(null)
  const navRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    navRef.current?.querySelector('a')?.focus()
    const closeWithEscape = event => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener('keydown', closeWithEscape)
    return () => window.removeEventListener('keydown', closeWithEscape)
  }, [open])
  const current = path => location.pathname === path || location.pathname.startsWith(`${path}/`)
  return <header className="header">
    <Brand />
    <button ref={toggleRef} type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="main-navigation">{open ? <X /> : <Menu />}</button>
    <nav ref={navRef} id="main-navigation" className={open ? 'nav is-open' : 'nav'} onClick={() => setOpen(false)} aria-label="Navegação principal">
      <Link to="/coletividade" aria-current={current('/coletividade') ? 'page' : undefined}>A Coletividade</Link>
      <Link to="/cultura" aria-current={current('/cultura') ? 'page' : undefined}>Cultura e memória</Link>
      <Link to="/aulas" aria-current={current('/aulas') ? 'page' : undefined}>Aulas</Link>
      <Link to="/agenda" aria-current={current('/agenda') ? 'page' : undefined}>Agenda</Link>
      <Link className="button button--small" to="/contato" aria-current={current('/contato') ? 'page' : undefined}>Fale conosco <ArrowRight size={16}/></Link>
    </nav>
  </header>
}

function Hero() {
  const slides = [
    { src: '/images/evento-comunidade-original.webp', label: 'Dança • comunidade', position: 'center 44%' },
    { src: '/images/sala-aulas-sede-original.webp', label: 'Nossa sede • Brás', position: 'center' },
    { src: '/images/oficinas-culturais-original.webp', label: 'Oficinas • gerações', position: 'center 42%' },
    { src: '/images/pascoa-comunidade-original.webp', label: 'Celebrações • encontros', position: 'center' },
    { src: '/images/primeira-diretoria-chsp.webp', label: 'Memória • desde 1937', position: 'center 35%' },
  ]
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldSaveData = navigator.connection?.saveData
    let preloadId
    const preloadSlides = () => slides.slice(1).forEach(({ src }) => { const image = new Image(); image.src = assetUrl(src) })
    if (!shouldSaveData) {
      preloadId = 'requestIdleCallback' in window
        ? window.requestIdleCallback(preloadSlides, { timeout: 3500 })
        : window.setTimeout(preloadSlides, 1800)
    }
    if (shouldReduceMotion) return () => {
      if (preloadId != null && 'cancelIdleCallback' in window) window.cancelIdleCallback(preloadId)
      else if (preloadId != null) window.clearTimeout(preloadId)
    }
    const timer = window.setInterval(() => {
      if (!document.hidden) setSlide(value => (value + 1) % slides.length)
    }, 4600)
    return () => {
      window.clearInterval(timer)
      if (preloadId != null && 'cancelIdleCallback' in window) window.cancelIdleCallback(preloadId)
      else if (preloadId != null) window.clearTimeout(preloadId)
    }
  }, [])

  return <section className="hero" id="inicio">
    <div className="hero__content">
      <img className="hero__map" src={assetUrl('/images/mapa-grecia-linhas.webp')} alt="" aria-hidden="true" />
      <h1 className="hero__headline">A casa da Grécia<br/><em>em São Paulo.</em></h1>
      <p className="hero__statement">A Grécia vive<br/><i>onde nós estamos.</i></p>
      <p className="hero__lead">Língua, arte, música, fé, dança e memórias compartilhadas por gregos, descendentes e todos que escolhem viver a cultura helênica. Vivemos e disseminamos essa cultura por meio de encontros da comunidade e aulas de grego contemporâneo, Danças Gregas e Bouzouki.</p>
      <div className="hero__facts"><span>Online ou presencial</span><Link to="/contato"><MapPin size={14}/> Rua Bresser, 793</Link></div>
      <div className="hero__actions"><Link className="button" to={sectionTarget('aulas')}>Conheça os cursos <ArrowDown size={17}/></Link><Link className="text-link" to={sectionTarget('sobre')}>Conheça nossa história <ArrowRight size={16}/></Link></div>
    </div>
    <div className="hero__gallery">
      <div className="hero__frames">
        {slides.map((item, i) => <figure className={slide === i ? 'active' : ''} style={{backgroundImage: `url(${assetUrl(item.src)})`, backgroundPosition: item.position}} key={item.src}>
          <figcaption>{item.label}</figcaption>
        </figure>)}
      </div>
      <div className="hero__controls" aria-label="Selecionar imagem">
        {slides.map((item, i) => <button type="button" className={slide === i ? 'active' : ''} onClick={() => setSlide(i)} key={item.src} aria-label={`Exibir imagem ${i+1}: ${item.label}`} aria-current={slide === i ? 'true' : undefined}/>) }
      </div>
      <div className="hero__stamp"><span>São Paulo</span><strong>CHSP</strong><span>Brasil</span></div>
    </div>
  </section>
}

function Footer() {
  return <footer className="footer"><div><Brand footer/><p>Rua Bresser, 793, Brás<br/>São Paulo, SP</p><div className="footer__greece"><img src={assetUrl('/images/bandeira-grecia.svg')} alt="Bandeira da Grécia"/><span>Brasil e Grécia unidos pela cultura</span></div></div><div><span>Explore</span><Link to="/coletividade">A Coletividade</Link><Link to="/aulas">Aulas</Link><Link to="/agenda">Agenda</Link><Link to="/cultura">Cultura e memória</Link><Link to={sectionTarget('duvidas')}>Perguntas frequentes</Link></div><div><span>Converse</span><a href={WA} target="_blank" rel="noreferrer">WhatsApp</a><Link to="/contato">Contato</Link><Link to="/privacidade">Política de Privacidade</Link></div><small>© {new Date().getFullYear()} Coletividade Helênica de São Paulo</small></footer>
}

function HomePage() {
  const location = useLocation()
  const [showIntro] = useState(shouldShowIntroCover)
  const [activity, setActivity] = useState(0)
  const [faq, setFaq] = useState(0)
  const current = activities[activity]
  const Icon = current.icon
  const navigateActivityTabs = event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? activities.length - 1
        : (activity + (event.key === 'ArrowRight' ? 1 : -1) + activities.length) % activities.length
    setActivity(next)
    event.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus()
  }

  useEffect(() => {
    document.title = 'Coletividade Helênica de São Paulo'
    const description = 'Língua, arte, música, fé, dança e memória compartilhadas pela Coletividade Helênica de São Paulo desde 1937.'
    document.head.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.head.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.head.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    const scrollToHash = () => {
      const id = new URLSearchParams(location.search).get('section') || window.location.hash.replace('#', '')
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

  return <>
    <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
    {showIntro && <IntroCover />}
    <Header />
    <main id="main-content">
      <Hero />

      <section className="manifesto section" id="sobre">
        <p className="section-index">Nossa essência</p>
        <div className="manifesto__grid">
          <h2>Uma comunidade<br/>feita de <em>encontros.</em></h2>
          <div>
            <p className="large-copy">Há quase nove décadas, aproximamos São Paulo da cultura grega e mantemos vivas as histórias que atravessaram o oceano.</p>
            <p>Representamos associados, gregos, descendentes e filo-helenos por meio de aulas, encontros, celebrações e ações culturais. Nossa missão é cívica, religiosa, filantrópica, beneficente, cultural e recreativa.</p>
            <Link className="text-link" to={sectionTarget('memoria')}>Descubra nossa trajetória <ArrowRight size={16}/></Link>
          </div>
        </div>
        <div className="values">
          <div><strong>1937</strong><span>ano de fundação<br/>em São Paulo</span></div>
          <div><strong lang="el">Παιδεία</strong><span>educação que<br/>forma e transforma</span></div>
          <div><strong lang="el">Φιλία</strong><span>amizade que<br/>cria comunidade</span></div>
          <div><strong lang="el">Μνήμη</strong><span>memória que<br/>mantém raízes vivas</span></div>
        </div>
      </section>

      <section className="trust section" id="comunidade" aria-labelledby="trust-title">
        <div className="section-heading section-heading--dark">
          <div><p className="section-index">Uma comunidade real</p><h2 id="trust-title">Um lugar para viver<br/><em>a cultura grega.</em></h2></div>
          <p>Conheça alguns dos espaços, encontros e momentos que formam a história da Coletividade Helênica de São Paulo.</p>
        </div>
        <div className="trust__gallery">
          {trustGallery.map((item, index) => <figure className={`trust__item trust__item--${index + 1}`} key={item.src}><ResponsiveImage src={item.src} alt={`${item.label} na Coletividade Helênica de São Paulo`} loading="lazy" decoding="async"/><figcaption><strong>{item.label}</strong><span>{item.copy}</span></figcaption></figure>)}
        </div>
      </section>

      <section className="experiences section" id="aulas">
        <div className="section-heading">
          <div><p className="section-index light">Aulas</p><h2>Não é só aprender.<br/><em>É se transformar.</em></h2></div>
          <p>Aulas para diferentes idades e níveis, conduzidas por quem vive e compartilha a cultura grega.</p>
        </div>
        <div className="experience-tabs" role="tablist" aria-label="Modalidades de aulas" onKeyDown={navigateActivityTabs}>
          {activities.map((item, i) => <button type="button" role="tab" id={`tab-${item.id}`} aria-controls={`panel-${item.id}`} aria-selected={activity === i} tabIndex={activity === i ? 0 : -1} key={item.id} className={activity === i ? 'active' : ''} onClick={() => setActivity(i)}>{item.title}</button>)}
        </div>
        <div className="experience-card" role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} key={current.id}>
          <div className="experience-card__symbol" style={{'--experience-image': `url(${assetUrl(current.visual)})`, '--experience-size': current.visualSize || 'cover', '--experience-position': current.visualPosition || 'center'}}><Icon strokeWidth={1}/><span><b lang="el">{current.greek}</b> • {current.eyebrow}</span></div>
          <div className="experience-card__copy">
            <p className="eyebrow"><span lang="el">{current.greek}</span> • {current.eyebrow}</p><h3>{current.statement}</h3><p>{current.copy}</p>
            <ul>{current.meta.map(item => <li key={item}><Sparkles size={15}/>{item}</li>)}</ul>
            <Link className="button button--white" to={current.href}>Conheça esta aula <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>

      <section className="language section">
        <div className="greek-word" lang="el" aria-hidden="true">μιλώ</div>
        <div className="language__content">
          <p className="section-index">Grego Moderno</p>
          <h2>Quando você aprende<br/>a língua, o mundo<br/><em>ganha outra voz.</em></h2>
          <p>Você deixa de apenas visitar a Grécia para realmente conversar com ela. Entende uma canção, reconhece uma história de família e descobre sentidos que nenhuma tradução alcança por inteiro.</p>
          <div className="language__features">
            <span><BookOpen/> Metodologia oficial grega</span><span><Users/> Professores nativos</span><span><Languages/> Presencial e online</span>
          </div>
          <Link className="button" to="/aulas/aulas-de-grego-moderno">Conheça as aulas de grego <ArrowRight size={17}/></Link>
        </div>
        <aside className="quote-card"><span>“</span><blockquote>Aprender grego pode ser a primeira vez que você ouve a história da sua família com a sua própria voz.</blockquote><small>O que o aprendizado pode despertar</small></aside>
      </section>

      <section className="agenda section" id="agenda">
        <div className="section-heading section-heading--dark">
          <div><p className="section-index">Agenda da comunidade</p><h2>A cultura ganha vida<br/><em>quando nos reunimos.</em></h2></div>
          <Link className="text-link" to="/agenda">Consultar programação <ArrowRight size={16}/></Link>
        </div>
        <div className="agenda__list">
          {agenda.map((event) => <article key={event.title}>
            <div className="date date--label"><CalendarDays size={20}/><span>{event.label}</span></div>
            <div><p>{event.type}</p><h3>{event.title}</h3></div>
            <span className="place"><MapPin size={16}/>{event.place}</span><Link className="event-link" to={event.href} aria-label={`Ver informações sobre ${event.title}`}><ArrowRight/></Link>
          </article>)}
        </div>
      </section>

      <section className="memory section" id="memoria">
        <div className="memory__image"><ResponsiveImage src="/images/primeira-diretoria-chsp.webp" alt="Primeira diretoria da Coletividade Helênica de São Paulo" loading="lazy" decoding="async" /></div>
        <div className="memory__copy"><p className="section-index">Cultura e memória</p><p className="greek-label" lang="el">Από γενιά σε γενιά</p><h2>De geração<br/><em>em geração.</em></h2><p>Preservar uma cultura é dar futuro à memória. Reunimos relatos, fotografias, música, gastronomia, destinos e curiosidades para que cada geração encontre seu próprio caminho até a Grécia.</p><Link className="text-link" to="/cultura/paginas/acontece-memorias">Explore nosso acervo <ArrowRight size={16}/></Link></div>
      </section>

      <section className="faq section" id="duvidas">
        <p className="section-index">Dúvidas frequentes</p>
        <div className="faq__grid"><h2>Comece por<br/><em>uma conversa.</em></h2><div>{faqs.map((item, i) => <div className={`faq__item ${faq === i ? 'open' : ''}`} key={item[0]}><button type="button" onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}><span>{item[0]}</span><ChevronDown aria-hidden="true"/></button><div><p>{item[1]}</p></div></div>)}</div></div>
      </section>

      <section className="join">
        <p className="greek-label" lang="el">Η κοινότητά μας</p><h2>Essa história também<br/>pode ser <em>sua.</em></h2><p>Associe-se, participe das atividades ou venha tomar um café conosco. A Coletividade está de portas abertas.</p><div><Link className="button button--white" to="/participe">Quero participar <ArrowRight size={17}/></Link><Link className="text-link text-link--white" to="/agenda">Conheça os próximos encontros</Link></div>
      </section>
    </main>
    <Footer />
  </>
}

function InteriorPage({ children }) {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }
    const targetId = decodeURIComponent(location.hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])
  return <div className="inner-page"><a className="skip-link" href="#main-content">Pular para o conteúdo</a><Header /><div id="main-content">{children}</div><Footer /></div>
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

    return <main className="page-error" role="alert">
      <img src={assetUrl('/images/chsp-logo-256.png')} alt="" width="72" height="72" />
      <p className="eyebrow">Coletividade Helênica de São Paulo</p>
      <h1>Não foi possível abrir esta página.</h1>
      <p>O conteúdo continua disponível. Tente novamente ou retorne à página inicial.</p>
      <div><button className="button" type="button" onClick={() => window.location.reload()}>Tentar novamente</button><Link className="text-link" to="/">Ir para o início <ArrowRight size={16}/></Link></div>
    </main>
  }
}

function App() {
  const location = useLocation()
  return <PageErrorBoundary key={location.pathname}><Suspense fallback={<main className="route-loading" aria-live="polite"><img src={assetUrl('/images/chsp-logo-256.png')} alt="" width="64" height="64"/><p>Carregando conteúdo...</p></main>}><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/aulas" element={<InteriorPage><LessonsIndex /></InteriorPage>} />
    <Route path="/aulas/:slug" element={<InteriorPage><LessonPage /></InteriorPage>} />
    <Route path="/coletividade" element={<InteriorPage><InstitutionIndex /></InteriorPage>} />
    <Route path="/coletividade/:slug" element={<InteriorPage><InstitutionPage /></InteriorPage>} />
    <Route path="/agenda" element={<InteriorPage><AgendaPage /></InteriorPage>} />
    <Route path="/cultura" element={<InteriorPage><CultureIndex /></InteriorPage>} />
    <Route path="/cultura/categoria/:slug" element={<InteriorPage><CategoryPage /></InteriorPage>} />
    <Route path="/cultura/paginas/acontece-memorias" element={<InteriorPage><MemoryPage /></InteriorPage>} />
    <Route path="/cultura/paginas/:slug" element={<InteriorPage><GenericPage eyebrow="Cultura e memória" /></InteriorPage>} />
    <Route path="/cultura/:slug" element={<InteriorPage><PostPage /></InteriorPage>} />
    <Route path="/participe" element={<InteriorPage><GenericPage fixedSlug="associados-e-parceiros" eyebrow="Participe" /></InteriorPage>} />
    <Route path="/contato" element={<InteriorPage><ContactPage /></InteriorPage>} />
    <Route path="/privacidade" element={<InteriorPage><GenericPage fixedSlug="politica-de-privacidade" eyebrow="Privacidade" /></InteriorPage>} />
    <Route path="/paginas/:slug" element={<InteriorPage><GenericPage /></InteriorPage>} />
    <Route path="/arquivo" element={<InteriorPage><ArchivePage /></InteriorPage>} />
    <Route path="*" element={<InteriorPage><NotFound /></InteriorPage>} />
  </Routes></Suspense></PageErrorBoundary>
}

export default App
