import GalleryImage from './components/GalleryImage.jsx'
import { siteContact } from './content/site-config.js'
import { Link } from 'react-router-dom'
import DanceVideo from './DanceVideo.jsx'
import GalleryPhoto from './components/PhotoGallery.jsx'
import './activity-stories.css'

function Photo({ name, caption }) {
  const [width, height] = {
    'cinema-cartaz': [900, 1350],
    'neolea-tv': [1200, 540],
    velas: [1200, 676],
  }[name] || [1200, 1600]
  return (
    <GalleryPhoto
      src={`/images/atividades/${name}.webp`}
      caption={caption}
      width={width}
      height={height}
    />
  )
}

export function WorkshopStories() {
  return (
    <div className="activity-stories">
      <section className="activity-story">
        <Photo
          name="ovos-aprendizado"
          caption="Pintura de ovos para a Páscoa: aprender junto, experimentar e criar."
        />
        <div>
          <p className="content-kicker">Tradições feitas à mão</p>
          <h2>A Páscoa ganha cores.</h2>
          <p>
            Na oficina de pintura de ovos, o cuidado aparece em cada detalhe. Entre pincéis,
            desenhos e conversas, participantes de diferentes gerações compartilham uma mesma mesa.
          </p>
          <p>
            São encontros para conhecer tradições, experimentar técnicas e levar consigo uma
            lembrança feita pelas próprias mãos.
          </p>
          <Photo name="ovos-detalhe" caption="Os desenhos tomam forma, um detalhe de cada vez." />
        </div>
      </section>
      <section className="activity-story activity-story--reverse">
        <Photo name="velas" caption="Oficina de decoração de velas para a Sexta-feira Santa." />
        <div>
          <p className="content-kicker">Preparar e compartilhar</p>
          <h2>Pequenos gestos, encontros especiais.</h2>
          <p>
            Fitas, flores e cores transformam as velas em peças únicas. A preparação para a
            Sexta-feira Santa também cria um espaço de convivência e troca de saberes.
          </p>
          <p>
            As oficinas são atividades pontuais. Acompanhe a programação para saber quando acontece
            o próximo encontro.
          </p>
        </div>
      </section>
      <section className="activity-story">
        <Photo
          name="artesanato"
          caption="Crianças e adultos em uma oficina de artesanato com pinhas."
        />
        <div>
          <p className="content-kicker">Criatividade em comunidade</p>
          <h2>Uma mesa aberta a novas ideias.</h2>
          <p>
            Pintar, montar e transformar materiais: as oficinas aproximam crianças e adultos pelo
            prazer de criar juntos.
          </p>
          <p>
            Além dos trabalhos manuais, a programação cultural da Coletividade reúne encontros de
            culinária, iconografia, bazares e outras atividades ao longo do ano.
          </p>
        </div>
      </section>
      <section className="activity-story activity-story--reverse">
        <DanceVideo
          sourceBase="/videos/atividades/oficina-danca"
          caption="Registro de uma oficina de dança na Coletividade."
        />
        <div>
          <p className="content-kicker">Entrar na roda</p>
          <h2>A dança também é encontro.</h2>
          <p>
            As oficinas esporádicas de dança convidam a comunidade a compartilhar música e
            movimento. Consulte a programação de cada edição para participar.
          </p>
          <p>
            O antigo curso de dança para adultos está inativo no momento. Os grupos Pedilea e Neolea
            Asteri têm suas próprias atividades.
          </p>
          <Link className="text-link" to="/cursos/aulas-de-danca">
            Conhecer os grupos de dança
          </Link>
        </div>
      </section>
      <section className="workshop-more">
        <p className="content-kicker">Outras formas de participar</p>
        <h2>Saberes, sabores e convivência.</h2>
        <div className="workshop-more__grid">
          <div>
            <h3>Cozinhando com Yiayiá</h3>
            <p>Receitas e memórias da culinária grega compartilhadas entre gerações.</p>
          </div>
          <div>
            <h3>Iconografia grega</h3>
            <p>Encontros com os símbolos e as técnicas da tradição iconográfica.</p>
          </div>
          <div>
            <h3>Bazares e encontros</h3>
            <p>Gastronomia, trabalhos da comunidade e o bingo da Liga das Senhoras Gregas.</p>
          </div>
        </div>
        <p>
          As atividades são pontuais, sem turmas permanentes. Consulte as datas e as condições de
          participação no Instagram oficial.
        </p>
        <a className="button" href={siteContact.instagram}>
          Acompanhar as próximas oficinas
        </a>
      </section>
    </div>
  )
}

export function NeoleaNewMedia() {
  return (
    <section className="activity-stories">
      <div className="activity-story">
        <Photo name="neolea-tv" caption="A Neolea em uma participação na televisão." />
        <div>
          <p className="content-kicker">Além dos palcos da comunidade</p>
          <h2>A Neolea na televisão.</h2>
          <p>
            Os trajes, a dança e a presença do grupo levam a cultura grega a novos públicos. Este
            registro guarda um desses encontros fora da sede.
          </p>
          <DanceVideo
            sourceBase="/videos/atividades/neolea-tv"
            caption="Um momento da participação da Neolea na TV."
          />
        </div>
      </div>
    </section>
  )
}

export function CinemaFeature({ full = false }) {
  return (
    <section className="activity-stories">
      <div className={`activity-story${full ? ' activity-story--text' : ''}`}>
        {!full && (
          <Photo
            name="cinema-sala"
            caption="A sala da Coletividade preparada para uma sessão de cinema."
          />
        )}
        <div>
          <p className="content-kicker">Uma nova programação cultural</p>
          <h2>Mais do que filmes, um encontro com a Grécia.</h2>
          <p>
            O Clube de Cinema Grego propõe encontros com filmes gregos selecionados e legendas em
            português. Uma iniciativa do Departamento de Língua Grega da Coletividade para descobrir
            histórias e diferentes olhares sobre a Grécia.
          </p>
          <dl className="activity-facts">
            <div>
              <dt>Programação anunciada</dt>
              <dd>Terceiro domingo de cada mês, às 17h</dd>
            </div>
            <div>
              <dt>Local</dt>
              <dd>
                Salão da Comunidade Grega
                <br />
                Rua Bresser, 793 — Brás, São Paulo
              </dd>
            </div>
          </dl>
          <p>
            Consulte a Coletividade para confirmar a primeira sessão, o filme e as condições de
            participação.
          </p>
          {full ? (
            <a className="button" href={siteContact.whatsapp}>
              Consultar a próxima sessão
            </a>
          ) : (
            <Link className="button" to="/cursos/clube-de-cinema-grego">
              Conhecer o clube
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

const modules = [
  [
    'Primeiro módulo · agosto a novembro',
    [
      'Mitologia grega e pré-história',
      'Civilizações Minoica e Micênica',
      'Poemas de Homero e Hesíodo',
      'Tempos Arcaicos e Grécia Clássica',
      'Filósofos pré-socráticos',
      'Sócrates, Platão e Aristóteles',
      'Período Helenístico: Alexandre e a expansão do Helenismo',
      'Filosofia helenística: estoicos, epicúrios e cínicos',
      'Conquista romana e cultura greco-romana',
    ],
  ],
  [
    'Segundo módulo · março a junho',
    [
      'A Grécia sob domínio romano',
      'Escolas filosóficas gregas e sua influência em Roma',
      'Cristianismo no mundo greco-romano',
      'Debates entre filosofia e cristianismo, do século I ao IV',
      'Império Romano Oriental e fundação de Constantinopla',
      'O encontro dos gregos com os árabes e a filosofia',
      'Filosofia, literatura e artes em Bizâncio',
      'A influência dos gregos bizantinos na Renascença europeia',
    ],
  ],
]

export function HistoryCourse() {
  return (
    <div className="activity-stories">
      <section className="activity-story">
        <figure>
          <GalleryImage
            src="/images/professores-grego/efstathios-tsotsos-retrato.jpg"
            alt="Professor Efstathios Tsotsos"
            loading="lazy"
          />
          <figcaption>Professor Efstathios Tsotsos.</figcaption>
        </figure>
        <div>
          <p className="content-kicker">História, Mitologia e Filosofia Grega</p>
          <h2>Das origens gregas ao legado de Bizâncio.</h2>
          <p>
            Um percurso pela mitologia, pelas civilizações e pelas ideias que atravessam a história
            grega. O curso conecta a Grécia antiga, o mundo greco-romano e a tradição bizantina em
            dois módulos.
          </p>
          <h3>Com Efstathios Tsotsos</h3>
          <p>
            Natural de Tessalônica, na Grécia, é doutor em Teologia pela PUC-PR e professor de
            História, Filosofia, Paleografia e língua grega antiga e moderna. Integra o corpo
            docente de grego da Coletividade.
          </p>
        </div>
      </section>
      <dl className="activity-facts activity-facts--grid">
        <div>
          <dt>Duração</dt>
          <dd>1 ano, em dois módulos</dd>
        </div>
        <div>
          <dt>Modalidade</dt>
          <dd>Online</dd>
        </div>
        <div>
          <dt>Aulas anunciadas</dt>
          <dd>Segundas, das 19h30 às 21h</dd>
        </div>
        <div>
          <dt>Conclusão</dt>
          <dd>Certificado</dd>
        </div>
      </dl>
      <section>
        <p className="content-kicker">Programa do curso</p>
        <h2>Uma viagem pelas ideias e pela história.</h2>
        <div className="activity-syllabus">
          {modules.map(([title, topics]) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul>
                {topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="activity-enrollment">
        <h2>Conheça a próxima turma.</h2>
        <p>
          O material de divulgação informa investimento de R$ 1.440, com material incluso e
          parcelamento em até 6 vezes. Confirme com a equipe os valores vigentes, as datas e a
          disponibilidade da próxima turma.
        </p>
        <a className="button" href={siteContact.whatsapp}>
          Consultar turma e inscrição
        </a>
      </section>
    </div>
  )
}
