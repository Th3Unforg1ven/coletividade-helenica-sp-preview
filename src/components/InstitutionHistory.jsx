import { Link } from 'react-router-dom'
import GalleryPhoto from './PhotoGallery.jsx'
import { historyPeriods, historyGallery } from '../content/institution-history.js'
import '../institution-history.css'

export default function InstitutionHistory() {
  return (
    <div className="institution-history">
      <div className="institution-history__periods">
        {historyPeriods.map(({ id, period, title, paragraphs, quote, attribution }) => (
          <section className="institution-history__period" key={id} aria-labelledby={id}>
            <p className="institution-history__date">{period}</p>
            <div>
              <h2 id={id}>{title}</h2>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {quote && (
                <figure className="institution-history__testimony">
                  <blockquote>
                    <p>“{quote}”</p>
                  </blockquote>
                  <figcaption>{attribution}</figcaption>
                </figure>
              )}
            </div>
          </section>
        ))}
      </div>
      <section className="institution-history__sources" aria-labelledby="history-sources">
        <h2 id="history-sources">Memória e fontes</h2>
        <p>
          Esta história reúne os registros institucionais da Coletividade e o depoimento de seu
          primeiro presidente, Abrão Jorge Nasser. O histórico também se apoia em trechos do livro{' '}
          <Link to="/cultura/livro-os-guardioes-das-lembrancas">Os Guardiões das Lembranças</Link>,
          de Vassiliki Constantinidou, dedicado à memória da imigração grega no Brasil.
        </p>
      </section>
      <section className="institution-history__photos" aria-labelledby="history-photos">
        <p className="content-kicker">Registros da comunidade</p>
        <h2 id="history-photos">Momentos preservados no acervo.</h2>
        <div data-gallery-group="historia-coletividade">
          {historyGallery.map((photo) => (
            <GalleryPhoto key={photo.src} {...photo} width={840} height={620} />
          ))}
        </div>
      </section>
    </div>
  )
}
