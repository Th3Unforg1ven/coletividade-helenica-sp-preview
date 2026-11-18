import { Link } from 'react-router-dom'
import {
  greeceOverview,
  greeceConnections,
  greeceReferences,
} from '../content/greece-relationship.js'
import '../greece-relationship.css'

export default function GreeceRelationship() {
  return (
    <div className="greece-relationship">
      <section className="institution-chapter" aria-labelledby="conhecer-grecia">
        <div className="wp-content">
          <h2 id="conhecer-grecia">Conhecer a Grécia</h2>
          {greeceOverview.map(({ id, title, paragraphs }) => (
            <section key={id} aria-labelledby={id}>
              <h3 id={id}>{title}</h3>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <aside className="greece-relationship__references" aria-labelledby="grecia-fontes">
            <h3 id="grecia-fontes">Referências sobre o país</h3>
            <ul>
              {greeceReferences.map(({ href, label }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <section className="institution-chapter" aria-labelledby="cultura-viva">
        <div className="wp-content">
          <h2 id="cultura-viva">Como mantemos essa cultura viva</h2>
          <p>
            Nossa relação com a Grécia se constrói também em São Paulo: no idioma que se aprende,
            nas danças que se compartilham, nas tradições que se praticam e nas histórias que se
            preservam. Na Coletividade, esses vínculos ganham continuidade por meio de atividades
            culturais, educação e convivência.
          </p>
          {greeceConnections.map(({ id, title, paragraphs, link }) => (
            <section className="greece-relationship__connection" key={id} aria-labelledby={id}>
              <h3 id={id}>{title}</h3>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link className="text-link" to={link.to}>
                {link.label}
              </Link>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}
