import HellenicCalendar from '../HellenicCalendar.jsx'
import PostCard from '../components/PostCard.jsx'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, ContentHero } from '../components/ContentLayout.jsx'

import { siteContent } from '../content/site-data.js'

export default function AgendaPage() {
  const events = siteContent.posts.filter((post) => post.categories.includes(13))
  return (
    <main className="content-page content-page--themed content-page--agenda">
      <Breadcrumbs items={[{ label: 'Agenda e eventos' }]} />
      <ContentHero
        eyebrow="Agenda e eventos"
        title="Encontros que celebram nossa cultura"
        seoTitle="Agenda e eventos | Coletividade Helênica de São Paulo"
        introduction="Acompanhe a programação da comunidade, explore as datas do calendário grego e ortodoxo e relembre nossos encontros."
        image="/images/evento-comunidade-original.webp"
        motifTheme="agenda"
      />
      <nav className="section-shortcuts" aria-label="Explore a agenda">
        <button
          type="button"
          onClick={() =>
            document.getElementById('programacao')?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
            })
          }
        >
          <span>01 · Comunidade</span>
          <strong>Próximos eventos</strong>
          <ArrowRight size={18} />
        </button>
        <button
          type="button"
          onClick={() =>
            document.getElementById('calendario')?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
            })
          }
        >
          <span>02 · Tradições</span>
          <strong>Calendário grego</strong>
          <ArrowRight size={18} />
        </button>
        <button
          type="button"
          onClick={() =>
            document.getElementById('eventos-anteriores')?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
            })
          }
        >
          <span>03 · Memória</span>
          <strong>Eventos anteriores</strong>
          <ArrowRight size={18} />
        </button>
      </nav>
      <section className="agenda-status" id="programacao">
        <p className="content-kicker">Próxima programação</p>
        <h2>Novas datas serão divulgadas em breve.</h2>
        <p>
          Para confirmar festas, encontros e atividades, fale com a equipe da Coletividade. Enquanto
          isso, você pode conhecer os eventos que marcaram nossa história.
        </p>
        <Link className="button" to="/contato">
          Consultar a Coletividade <ArrowRight size={16} />
        </Link>
      </section>
      <div id="calendario">
        <HellenicCalendar />
      </div>
      <div className="collection-heading" id="eventos-anteriores">
        <h2>Eventos anteriores</h2>
        <span>{events.length} registros preservados</span>
      </div>
      <section className="posts-grid">
        {events.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </main>
  )
}
