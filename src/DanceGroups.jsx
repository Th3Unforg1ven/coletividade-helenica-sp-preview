import { siteContact } from './content/site-config.js'
import { NeoleaNewMedia } from './ActivityStories.jsx'
import DanceVideo from './DanceVideo.jsx'
import { CommunityPhoto } from './CommunityMedia.jsx'
import InstagramIcon from './InstagramIcon.jsx'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import GalleryPhoto from './components/PhotoGallery.jsx'
import ResponsiveImage from './ResponsiveImage.jsx'
import './greek-course.css'
import './dance-groups.css'

import { danceGroups } from './content/dance-groups.js'
const photo = (name) => `/images/grupos-danca/${name}.webp`
export function DancePhoto({ name, caption, eager = false }) {
  return (
    <GalleryPhoto
      className="greek-course__photo"
      src={`/images/grupos-danca/${name}.jpeg`}
      displaySrc={photo(name)}
      caption={caption}
      loading={eager ? 'eager' : 'lazy'}
      width={name === 'pedilea-encontro' ? 960 : 1280}
      height={name === 'pedilea-encontro' ? 1280 : 960}
    />
  )
}
export function DanceHero({ group }) {
  return (
    <figure
      className={`dance-hero-photo${group.name === 'Pedilea' ? ' dance-hero-photo--pedilea' : ''}`}
    >
      <ResponsiveImage
        src={photo(group.photo)}
        alt={`Integrantes ${group.name === 'Pedilea' ? 'da Pedilea e instrutores' : 'da Neolea Asteri com trajes tradicionais e bandeira grega'}`}
        width="1280"
        height="960"
        fetchPriority="high"
      />
    </figure>
  )
}
export function DanceOverview() {
  return (
    <div className="greek-course dance-groups">
      <section className="greek-course__intro">
        <div>
          <p className="content-kicker">Dança e comunidade</p>
          <h2>
            Uma tradição.
            <br />
            Diferentes gerações.
          </h2>
        </div>
        <p>
          Da infância à vida adulta, os grupos da Coletividade mantêm a cultura grega em movimento.
          Conheça a Pedilea e acompanhe a trajetória da Neolea Asteri.
        </p>
      </section>
      {Object.entries(danceGroups).map(([slug, group]) => (
        <section className="greek-course__split dance-section" key={slug}>
          <DancePhoto
            name={group.photo}
            caption={
              group.name === 'Pedilea'
                ? 'Integrantes da Pedilea e instrutores.'
                : 'Neolea Asteri reunida na Coletividade.'
            }
          />
          <div>
            <p className="content-kicker">{group.category}</p>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            {slug === 'pedilea' ? (
              <p>
                <strong>{group.age}</strong>
                <br />
                Sábados, das {group.time}.
              </p>
            ) : (
              <p>Acompanhe o grupo no Instagram @neolea.asteri.</p>
            )}
            <div className="activity-tags">
              <span>Grupo ativo</span>
              {slug === 'pedilea' && <span>Gratuito</span>}
            </div>
            <Link className="button" to={`/cursos/${slug}`}>
              Conhecer o grupo <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}
export default function DanceGroupBody({ slug, history }) {
  const group = danceGroups[slug]
  const child = slug === 'pedilea'
  return (
    <div className="greek-course dance-groups">
      <section className="greek-course__intro">
        <div>
          <p className="content-kicker">Dança, cultura e convivência</p>
          <h2>{group.heading}</h2>
        </div>
        <div>
          <p>{group.description}</p>
          <p>{group.invitation}</p>
        </div>
      </section>
      <dl className="greek-course__facts">
        <div>
          <dt>{child ? 'Para quem' : 'Integrantes'}</dt>
          <dd>{group.age}</dd>
        </div>
        <div>
          <dt>Encontros</dt>
          <dd>Sábados</dd>
        </div>
        <div>
          <dt>Horário dos ensaios</dt>
          <dd>{group.time}</dd>
        </div>
        <div>
          <dt>{child ? 'Participação' : 'Acompanhe'}</dt>
          <dd>{group.status}</dd>
        </div>
      </dl>
      <section className="greek-course__split">
        <DancePhoto
          name={child ? 'pedilea-encontro' : 'neolea-danca'}
          caption={
            child
              ? 'Um encontro de crianças e instrutores na sede da Coletividade.'
              : 'Dança, trajes e tradição em uma apresentação da Neolea Asteri.'
          }
        />
        <div>
          <p className="content-kicker">{child ? 'Como participar' : 'Acompanhe o grupo'}</p>
          <h2>
            {child
              ? 'Um lugar para descobrir e conviver.'
              : 'A tradição continua. Acompanhe cada momento.'}
          </h2>
          <p>{group.participation}</p>
          <div className="greek-course__format">
            <h3>{child ? 'Encontros presenciais' : 'Instagram oficial'}</h3>
            {child ? (
              <p>
                Sábados, das {group.time}.<br />
                Rua Bresser, 793, Brás, São Paulo.
              </p>
            ) : (
              <p>@neolea.asteri</p>
            )}
          </div>
          <a
            className="greek-course__text-link"
            href={child ? siteContact.whatsapp : group.socialUrl}
          >
            {child ? 'Conversar sobre a participação' : 'Acompanhar no Instagram'}{' '}
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
      {child ? (
        <section className="dance-section">
          <p className="content-kicker">Momentos do grupo</p>
          <h2>A cultura acontece no encontro.</h2>
          <p>Registros de convivência e movimento da Pedilea na Coletividade.</p>
          <div className="dance-videos">
            {[1, 2, 3].map((n) => (
              <DanceVideo
                key={n}
                number={n}
                caption={
                  [
                    'Uma roda de convivência.',
                    'Aprendizado compartilhado.',
                    'Os primeiros passos em grupo.',
                  ][n - 1]
                }
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="dance-section">
          <p className="content-kicker">Cultura em movimento</p>
          <h2>Da nossa sede a novos encontros.</h2>
          <p>
            O grupo representa a Coletividade em festivais, shows, feiras e celebrações no Brasil e
            na América Latina.
          </p>
          <div className="dance-gallery">
            <DancePhoto
              name="neolea-trajes"
              caption="Integrantes com trajes tradicionais, junto às bandeiras do Brasil e da Grécia."
            />
            <DancePhoto name="neolea-viagem" caption="O grupo reunido em um registro de viagem." />
            <DancePhoto
              name="neolea-celebracao"
              caption="Um encontro da Neolea Asteri na sede da Coletividade."
            />
          </div>
        </section>
      )}
      {child ? (
        <section className="community-feature">
          <p className="content-kicker">Aprender e conviver</p>
          <h2>Descobertas compartilhadas.</h2>
          <div className="greek-course__split">
            <CommunityPhoto
              name="pedilea-roda"
              caption="Crianças e instrutores da Pedilea em uma roda de convivência."
            />
            <div>
              <p>
                As atividades da Pedilea também são momentos de escuta, brincadeira e encontro entre
                as crianças.
              </p>
              <DanceVideo
                sourceBase="/videos/comunidade/pedilea-atividade"
                caption="Atividade com as crianças da Pedilea."
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="community-feature">
          <p className="content-kicker">Encontros e apresentações</p>
          <h2>A cultura grega para além da nossa sede.</h2>
          <div className="community-photo-grid">
            <CommunityPhoto
              name="neolea-casa-transitoria"
              caption="Neolea Asteri na Casa Transitória Fabiano de Cristo."
              width={900}
              height={1600}
            />
            <CommunityPhoto
              name="neolea-casa-transitoria-trajes"
              caption="Integrantes com trajes de apresentação na Casa Transitória Fabiano de Cristo."
              width={900}
              height={1600}
            />
          </div>
          <div className="greek-course__split">
            <CommunityPhoto
              name="neolea-festa-imigrante"
              caption="Neolea Asteri na 29ª Festa do Imigrante."
              width={2773}
              height={4160}
            />
            <div>
              <p className="content-kicker">Música e comunidade</p>
              <h3>Nea Elliniki Compania</h3>
              <p>
                A banda é composta por integrantes da Neolea Asteri. Conheça um registro de seu
                ensaio.
              </p>
              <DanceVideo
                sourceBase="/videos/atividades/banda-ensaio"
                caption="Ensaio da banda Nea Elliniki Compania."
              />
            </div>
          </div>
        </section>
      )}
      {!child && <NeoleaNewMedia />}
      <section className="greek-course__split dance-history">
        <div>
          <p className="content-kicker">Memória do grupo</p>
          <h2>{child ? 'Uma história que continua crescendo.' : 'Gerações que dançam juntas.'}</h2>
          <p>
            {child
              ? 'De 1982 à retomada em agosto de 2025, a Pedilea conecta novas gerações à cultura grega.'
              : 'Da Neolea, criada em 1967, à Neolea Asteri, formada em 2022: uma trajetória de preservação e encontro.'}
          </p>
        </div>
        <div>{history}</div>
      </section>
      <section className="greek-course__contact">
        <div>
          <p className="content-kicker">Seu próximo passo</p>
          <h2>{child ? 'Vamos conhecer a Pedilea?' : 'Acompanhe a Neolea Asteri.'}</h2>
          <p>
            {child
              ? 'Converse com a equipe da Coletividade para saber como participar dos encontros.'
              : 'Siga @neolea.asteri no Instagram para acompanhar as apresentações e novidades do grupo.'}
          </p>
        </div>
        <a
          className={`button${child ? '' : ' button--instagram'}`}
          href={child ? siteContact.whatsapp : group.socialUrl}
        >
          {child ? <MessageCircle size={18} /> : <InstagramIcon size={20} />}{' '}
          <span>{child ? 'Como participar' : 'Acompanhar no Instagram'}</span>{' '}
          <ArrowRight size={18} />
        </a>
      </section>
      <div className="dance-related">
        <Link className="greek-course__text-link" to={`/cursos/${group.other}`}>
          Conheça também {danceGroups[group.other].name} <ArrowRight size={18} />
        </Link>
        <Link className="greek-course__text-link" to="/cursos">
          Todos os cursos e atividades <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
