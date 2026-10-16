import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ContentHero } from '../components/ContentLayout.jsx'

export default function NotFound() {
  return (
    <main className="content-page not-found">
      <ContentHero
        eyebrow="Conteúdo"
        title="Página não encontrada"
        noIndex
        introduction="O endereço pode ter mudado durante a reorganização do site."
      />
      <Link className="button" to="/arquivo">
        Consultar arquivo integral <ArrowRight size={16} />
      </Link>
    </main>
  )
}
