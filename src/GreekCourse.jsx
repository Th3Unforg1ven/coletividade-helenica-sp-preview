import { teachers } from './content/teachers.js'
import { siteContact } from './content/site-config.js'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { assetUrl } from './paths.js'
import GalleryPhoto from './components/PhotoGallery.jsx'
import DanceVideo from './DanceVideo.jsx'
import { classroomPhotos, classroomFeature } from './content/greek-course-media.js'
import './greek-course.css'

function teacherPortrait(slug) {
  return assetUrl(`/images/professores-grego/${slug}-retrato.jpg`)
}

export function GreekTeacherMosaic() {
  return (
    <figure className="greek-teacher-mosaic" aria-label="Equipe de professores de Grego Moderno">
      {teachers.map(([slug, name]) => (
        <div className="greek-teacher-mosaic__portrait" key={slug}>
          <img src={teacherPortrait(slug)} alt={name} width="550" height="550" />
        </div>
      ))}
    </figure>
  )
}

function ClassPhoto({ src, caption }) {
  return <GalleryPhoto className="greek-course__photo" src={src} caption={caption} />
}

export default function GreekCourse() {
  return (
    <div className="greek-course">
      <section className="greek-course__intro" aria-labelledby="greek-intro">
        <div>
          <p className="content-kicker">Língua e cultura</p>
          <h2 id="greek-intro">
            Um novo idioma.
            <br />
            Mais formas de se conectar.
          </h2>
        </div>
        <div>
          <p>
            Aprender grego moderno é se aproximar das conversas, das canções e das histórias que
            fazem parte da cultura grega. Na Coletividade, adultos e crianças encontram cursos do
            nível elementar ao avançado, incluindo turmas para quem está começando do zero.
          </p>
          <p>
            O Departamento de Língua Grega começou a tomar forma em 2013. Hoje, o ensino reúne
            diferentes níveis e duas formas de participar: na sede da CHSP ou online.
          </p>
        </div>
      </section>

      <dl className="greek-course__facts">
        <div>
          <dt>Duração da aula</dt>
          <dd>1h30</dd>
        </div>
        <div>
          <dt>Modalidades</dt>
          <dd>Presencial e online</dd>
        </div>
        <div>
          <dt>Para quem</dt>
          <dd>Adultos e crianças</dd>
        </div>
        <div>
          <dt>Níveis</dt>
          <dd>Do básico ao avançado</dd>
        </div>
      </dl>

      <section className="greek-course__split" aria-labelledby="greek-method">
        <GalleryPhoto
          className="greek-course__photo greek-course__photo--classroom"
          {...classroomFeature}
        />
        <div>
          <p className="content-kicker">O aprendizado</p>
          <h2 id="greek-method">
            Do primeiro contato
            <br />a novos horizontes.
          </h2>
          <p>
            Você não precisa ter estudado grego para começar. Há cursos específicos para iniciantes
            e turmas em diferentes níveis para continuar o aprendizado.
          </p>
          <p>
            A metodologia adotada pelo governo grego oferece condições para a preparação para a
            certificação de proficiência no idioma.
          </p>
          <a className="greek-course__text-link" href={siteContact.whatsapp}>
            Converse sobre o seu nível <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="greek-course__classroom" aria-labelledby="greek-classroom">
        <header>
          <p className="content-kicker">Uma aula por dentro</p>
          <h2 id="greek-classroom">O grego ganha vida na sala de aula.</h2>
          <p>
            Entre leituras, anotações e explicações no quadro, o aprendizado acontece em grupo.
            Estes registros mostram um pouco das aulas presenciais na sede da Coletividade.
          </p>
        </header>
        <div className="greek-course__classroom-videos">
          <div>
            <DanceVideo
              sourceBase="/videos/aulas/escrita-em-grego"
              caption="A escrita e as explicações no quadro durante a aula."
            />
            <h3>Escrever para aprender.</h3>
            <p>
              O idioma toma forma no quadro, nas palavras e nas explicações compartilhadas com a
              turma.
            </p>
          </div>
          <div>
            <DanceVideo
              sourceBase="/videos/aulas/leitura-em-grego"
              caption="Um registro dos materiais e da rotina de estudo da turma."
            />
            <h3>Do livro à conversa.</h3>
            <p>
              Livros e anotações acompanham o contato com a língua e com referências da cultura
              grega.
            </p>
          </div>
        </div>
        <div className="greek-course__classroom-photos" data-gallery-group="aula-presencial">
          {classroomPhotos.map(({ name, ...photo }) => (
            <GalleryPhoto key={name} className="greek-course__photo" {...photo} />
          ))}
        </div>
      </section>

      <section className="greek-course__teachers" aria-labelledby="greek-teachers">
        <header>
          <div>
            <p className="content-kicker">Quem ensina</p>
            <h2 id="greek-teachers">Conheça nossos professores.</h2>
          </div>
          <p>
            A equipe conta com professores nativos que falam português, aproximando o aprendizado da
            língua e da cultura grega.
          </p>
        </header>
        <div className="greek-course__portraits">
          {teachers.map(([slug, name]) => (
            <figure key={slug}>
              <img src={teacherPortrait(slug)} alt={name} width="550" height="550" loading="lazy" />
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="greek-course__split greek-course__split--reverse"
        aria-labelledby="greek-formats"
      >
        <div>
          <p className="content-kicker">Como participar</p>
          <h2 id="greek-formats">
            Na nossa sede.
            <br />
            Ou de onde você estiver.
          </h2>
          <p>
            As aulas têm duração de 1h30 nas modalidades presencial e online. Consulte a equipe para
            conhecer as turmas disponíveis para o seu nível.
          </p>
          <div className="greek-course__format">
            <h3>Presencial</h3>
            <p>
              Na sede da CHSP, na Rua Bresser, 793, Brás, São Paulo. As salas comportam de 6 a 10
              alunos.
            </p>
          </div>
          <div className="greek-course__format">
            <h3>Online</h3>
            <p>Aulas por videochamada, em turmas de até 12 alunos.</p>
          </div>
        </div>
        <ClassPhoto
          src="/images/aulas/turma-grego-encontro-2.svg"
          caption="A língua grega aproxima a comunidade também nas aulas online."
        />
      </section>

      <section className="greek-course__contact" aria-labelledby="greek-contact">
        <div>
          <p className="content-kicker">Seu próximo passo</p>
          <h2 id="greek-contact">Vamos encontrar sua turma?</h2>
          <p>
            Consulte vagas, horários e valores pelo WhatsApp da Coletividade. Conte à equipe se você
            já estudou grego e qual modalidade procura.
          </p>
        </div>
        <a className="button" href={siteContact.whatsapp}>
          <MessageCircle size={18} /> Falar sobre as aulas <ArrowRight size={18} />
        </a>
      </section>
      <Link className="greek-course__text-link" to="/cursos">
        Conheça também nossos cursos e atividades <ArrowRight size={18} />
      </Link>
    </div>
  )
}
