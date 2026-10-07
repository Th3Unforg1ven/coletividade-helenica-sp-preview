import { assetUrl } from './paths.js'
import DanceVideo from './DanceVideo.jsx'
import './community-media.css'

export function CommunityPhoto({ name, caption, width = 1200, height = 1600 }) {
  return <figure className="community-photo">
    <a href={assetUrl(`/images/comunidade/${name}.jpeg`)} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar foto: ${caption}`}>
      <img src={assetUrl(`/images/comunidade/${name}.jpeg`)} alt={caption} width={width} height={height} loading="lazy" />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>
}

export function CommunityVideo({ name, caption }) {
  return <div className="community-video"><DanceVideo sourceBase={`/videos/comunidade/${name}`} caption={caption} /></div>
}

export default function CommunityMemories() {
  return <section className="community-memories" aria-labelledby="community-memories-title">
    <p className="content-kicker">Nosso acervo em imagens</p>
    <h2 id="community-memories-title">Encontros que fazem parte da nossa história.</h2>
    <p>Registros compartilhados pela Coletividade: celebrações, convivência e tradições que aproximam gerações.</p>
    <div className="community-photo-grid">
      <CommunityPhoto name="dia-imigrante-comunidade" caption="Encontro da comunidade no Dia do Imigrante Grego." width={1280} height={960} />
      <CommunityPhoto name="dia-imigrante-encontro" caption="Registro da celebração do Dia do Imigrante Grego." width={1280} height={960} />
    </div>
    <div className="community-video-grid">
      <CommunityVideo name="dia-imigrante" caption="Dia do Imigrante Grego — um registro da celebração." />
      <CommunityVideo name="bazar-natal" caption="Bazar de Natal — encontro e venda de produtos gregos." />
      <CommunityVideo name="pascoa-ortodoxa" caption="Um registro da celebração da Páscoa ortodoxa grega." />
    </div>
  </section>
}
