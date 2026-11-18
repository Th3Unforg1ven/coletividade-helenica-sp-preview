import { Link } from 'react-router-dom'
import { EncontroIcon } from './components/ChspIcons.jsx'
import GalleryImage from './components/GalleryImage.jsx'
import { siteContact } from './content/site-config.js'
import { bouzoukiPhoto } from './content/courses.js'
import { historyModules } from './content/course-programs.js'
import './greek-course.css'
import './course-stories.css'

export function KoineCover() {
  return (
    <figure className="course-cover">
      <GalleryImage
        src="/images/cursos/codex-sinaiticus.jpg"
        alt="Páginas em grego do Codex Sinaiticus expostas na British Library, em Londres"
        width={1280}
        height={960}
      />
      <figcaption>
        Codex Sinaiticus · British Library. Foto de PotatoCow25, CC0.{' '}
        <a href="https://commons.wikimedia.org/wiki/File:Codex_Sinaiticus.jpg">Fonte da imagem</a>
      </figcaption>
    </figure>
  )
}

function CourseFacts({ items }) {
  return (
    <dl className={`greek-course__facts${items.length === 2 ? ' greek-course__facts--two' : ''}`}>
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function CourseContact({ id, title, children, label = 'Falar sobre o curso' }) {
  return (
    <>
      <section className="greek-course__contact" aria-labelledby={id}>
        <div>
          <p className="content-kicker">Seu próximo passo</p>
          <h2 id={id}>{title}</h2>
          {children}
        </div>
        <a className="button" href={siteContact.whatsapp}>
          <EncontroIcon size={20} />
          {label}
        </a>
      </section>
      <Link className="greek-course__text-link" to="/cursos">
        Conheça também nossos cursos e atividades
      </Link>
    </>
  )
}

function CourseTeacher() {
  return (
    <section className="greek-course__teachers" aria-labelledby="course-teacher-title">
      <div className="greek-course__split">
        <figure className="greek-course__photo course-teacher-photo">
          <GalleryImage
            src="/images/professores-grego/efstathios-tsotsos-retrato.jpg"
            alt="Professor Efstathios Tsotsos"
            width={550}
            height={550}
            loading="lazy"
          />
        </figure>
        <div>
          <p className="content-kicker">Quem ensina</p>
          <h2 id="course-teacher-title">
            Conheça o professor.
            <br />
            Efstathios Tsotsos.
          </h2>
          <p>
            Natural de Tessalônica, na Grécia, é doutor em Teologia pela PUC-PR e professor de
            História, Filosofia, Paleografia e língua grega antiga e moderna. Integra o corpo
            docente de grego da Coletividade Helênica de São Paulo.
          </p>
          <p>
            Na Coletividade, é responsável pelos cursos de Grego Koiné e de História, Mitologia e
            Filosofia Grega.
          </p>
        </div>
      </div>
    </section>
  )
}

export function KoineCourse() {
  return (
    <div className="greek-course">
      <section className="greek-course__intro" aria-labelledby="koine-intro">
        <div>
          <p className="content-kicker">Língua e história</p>
          <h2 id="koine-intro">
            O grego dos textos.
            <br />
            Um novo olhar para a leitura.
          </h2>
        </div>
        <div>
          <p>
            Koiné vem de <span lang="grc">κοινή</span>, palavra grega que significa “comum”. Essa
            forma da língua se difundiu no mundo helenístico e está presente nos textos do Novo
            Testamento e em obras da literatura grega dos séculos posteriores a Cristo.
          </p>
          <p>
            Na Coletividade, o curso é indicado principalmente para estudantes da Bíblia e
            seminaristas. As aulas são exclusivamente online, com o professor Efstathios Tsotsos.
          </p>
        </div>
      </section>
      <CourseFacts
        items={[
          ['Modalidade', 'Online'],
          ['Para quem', 'Estudantes da Bíblia e seminaristas'],
          ['Professor', 'Efstathios Tsotsos'],
          ['Turmas', 'Sem turma no momento'],
        ]}
      />
      <section className="greek-course__split" aria-labelledby="koine-context-title">
        <figure className="greek-course__photo course-manuscript-photo">
          <GalleryImage
            src="/images/cursos/papiro-46.jpg"
            alt="Folha do Papiro 46 com o texto grego de 2 Coríntios"
            width={580}
            height={819}
            loading="lazy"
          />
          <figcaption>
            Papiro 46 · trecho de 2 Coríntios. Reprodução em domínio público.{' '}
            <a href="https://commons.wikimedia.org/wiki/File:P46.jpg">Fonte da imagem</a>
          </figcaption>
        </figure>
        <div>
          <p className="content-kicker">O estudo da língua</p>
          <h2 id="koine-context-title">
            Ler mais perto.
            <br />
            Compreender novos sentidos.
          </h2>
          <p>
            Para quem se dedica à Bíblia, conhecer o grego abre outra possibilidade de leitura:
            aproximar-se das palavras e expressões na língua em que os textos foram escritos e
            perceber escolhas que uma tradução precisa fazer.
          </p>
          <p>
            É um encontro entre língua, história e tradição de estudo, que aproxima o leitor do
            universo em que esses textos circularam.
          </p>
          <Link className="greek-course__text-link" to="/cursos/grego-moderno">
            Conheça também o Grego Moderno
          </Link>
        </div>
      </section>
      <CourseTeacher />
      <section className="greek-course__intro" aria-labelledby="koine-formats">
        <div>
          <p className="content-kicker">Como participar</p>
          <h2 id="koine-formats">
            Uma turma começa
            <br />
            com o interesse de vocês.
          </h2>
        </div>
        <div>
          <p>
            O curso já foi ministrado pela Coletividade e está sem turma no momento. Com a reunião
            de pessoas interessadas, uma nova turma online pode ser formada.
          </p>
          <div className="greek-course__format">
            <h3>Online</h3>
            <p>
              Fale com a equipe para manifestar interesse e consultar as condições de participação.
            </p>
          </div>
        </div>
      </section>
      <CourseContact
        id="koine-contact"
        title="Vamos formar uma nova turma?"
        label="Tenho interesse no curso"
      >
        <p>
          Converse com a Coletividade pelo WhatsApp e conte que você tem interesse em estudar Grego
          Koiné.
        </p>
      </CourseContact>
    </div>
  )
}

export function HistoryCourse() {
  return (
    <div className="greek-course">
      <section className="greek-course__intro" aria-labelledby="history-intro">
        <div>
          <p className="content-kicker">História e pensamento</p>
          <h2 id="history-intro">
            Mitos que atravessam o tempo.
            <br />
            Ideias que continuam vivas.
          </h2>
        </div>
        <div>
          <p>
            Do universo de Homero à herança de Bizâncio, o curso conecta acontecimentos, obras e
            pensadores que ajudam a compreender a história e a cultura grega.
          </p>
          <p>
            Com Efstathios Tsotsos, o percurso se organiza em dois módulos: das primeiras
            civilizações ao mundo greco-romano e, depois, de Roma à cultura bizantina e à Renascença
            europeia.
          </p>
        </div>
      </section>
      <CourseFacts
        items={[
          ['Duração', '1 ano, em dois módulos'],
          ['Modalidade', 'Online'],
          ['Aulas anunciadas', 'Segundas, das 19h30 às 21h'],
          ['Conclusão', 'Certificado'],
        ]}
      />
      <section className="greek-course__split" aria-labelledby="history-continuity-title">
        <figure className="greek-course__photo">
          <GalleryImage
            src="/images/cursos/bizancio-deesis.jpg"
            alt="Mosaico bizantino da Deesis, com Cristo entre Maria e João Batista, em Santa Sofia"
            width={1280}
            height={745}
            loading="lazy"
          />
          <figcaption>
            Mosaico da Deesis, Santa Sofia · século XIII. Foto de Myrabella, CC0.{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Deesis_mosaic_Hagia_Sophia.jpg">
              Fonte da imagem
            </a>
          </figcaption>
        </figure>
        <div>
          <p className="content-kicker">O percurso</p>
          <h2 id="history-continuity-title">
            Além da Antiguidade.
            <br />O legado grego continua.
          </h2>
          <p>
            A passagem da Grécia antiga ao mundo bizantino é um dos fios condutores do curso. O
            programa acompanha como ideias, tradições religiosas, literatura e artes atravessam
            diferentes épocas e encontram novos sentidos.
          </p>
          <a className="greek-course__text-link" href="#history-program-title">
            Explore o programa do curso
          </a>
        </div>
      </section>
      <section className="greek-course__classroom" aria-labelledby="history-program-title">
        <header>
          <p className="content-kicker">Programa do curso</p>
          <h2 id="history-program-title">
            Uma história contada por seus mitos, suas cidades e suas ideias.
          </h2>
          <p>
            Explore os eixos de cada módulo para conhecer os temas do programa e os diálogos entre
            história, mitologia e filosofia.
          </p>
        </header>
        <div className="greek-course__classroom-videos course-modules">
          {historyModules.map((module) => (
            <article className="course-module" key={module.number}>
              <p className="content-kicker">{module.period}</p>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="course-chapters">
                {module.chapters.map((chapter, index) => (
                  <details key={chapter.title} open={index === 0}>
                    <summary>{chapter.title}</summary>
                    <div>
                      <p>{chapter.description}</p>
                      <ul>
                        {chapter.topics.map((topic) => (
                          <li key={topic}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <CourseTeacher />
      <section className="greek-course__intro" aria-labelledby="history-formats">
        <div>
          <p className="content-kicker">Como participar</p>
          <h2 id="history-formats">
            Dois módulos.
            <br />
            Um percurso de descobertas.
          </h2>
        </div>
        <div>
          <p>
            O curso é online e tem duração anunciada de um ano, com certificado de conclusão.
            Consulte a equipe sobre a disponibilidade da próxima turma.
          </p>
          <div className="greek-course__format">
            <h3>Inscrição e material</h3>
            <p>
              O material de divulgação informa investimento de R$ 1.440, com material incluso e
              parcelamento em até 6 vezes. Confirme com a equipe os valores vigentes e as datas.
            </p>
          </div>
        </div>
      </section>
      <CourseContact
        id="history-contact"
        title="Conheça a próxima turma."
        label="Consultar turma e inscrição"
      >
        <p>
          Converse com a Coletividade pelo WhatsApp para saber como participar do curso de História,
          Mitologia e Filosofia Grega.
        </p>
      </CourseContact>
    </div>
  )
}

export function BouzoukiCourse() {
  return (
    <div className="greek-course">
      <section className="greek-course__intro" aria-labelledby="bouzouki-intro">
        <div>
          <p className="content-kicker">Música e cultura</p>
          <h2 id="bouzouki-intro">
            Um instrumento.
            <br />A sonoridade da Grécia.
          </h2>
        </div>
        <div>
          <p>
            O bouzouki é um instrumento de cordas da família do alaúde e um dos símbolos mais
            reconhecidos da música grega. Seu nome deriva da palavra turca <em>buzuk</em>, e sua
            sonoridade atravessa repertórios tradicionais e populares.
          </p>
          <p>
            Na Coletividade, ele faz parte da aproximação com a música e as tradições helênicas. As
            aulas não estão acontecendo no momento e não há data de retomada confirmada.
          </p>
        </div>
      </section>
      <CourseFacts
        items={[
          ['Situação das aulas', 'Sem aulas no momento'],
          ['Retomada', 'Sem data confirmada'],
        ]}
      />
      <section className="greek-course__split" aria-labelledby="bouzouki-culture">
        <figure className="greek-course__photo">
          <GalleryImage src={bouzoukiPhoto.src} alt={bouzoukiPhoto.alt} loading="lazy" />
          <figcaption>
            Imagem ambientada com IA a partir da{' '}
            <a href={bouzoukiPhoto.source}>foto de Arent, com edição de Pandouris</a> ·{' '}
            <a href={bouzoukiPhoto.license}>CC BY-SA 3.0</a>.
          </figcaption>
        </figure>
        <div>
          <p className="content-kicker">A música grega</p>
          <h2 id="bouzouki-culture">
            Tradição que se ouve.
            <br />
            Cultura que se compartilha.
          </h2>
          <p>
            Tanto no continente quanto nas ilhas, a música acompanha celebrações religiosas,
            casamentos, encontros comunitários e diferentes danças. O bouzouki pode ser ouvido em
            formações tradicionais e em ritmos como o sirtaki e o hasapiko.
          </p>
          <p>
            Mikis Theodorakis, Vasilis Tsitsanis e Manolis Karantinis estão entre os artistas que
            ajudaram a projetar a força e a identidade desse instrumento.
          </p>
        </div>
      </section>
      <CourseContact
        id="bouzouki-contact"
        title="Quer acompanhar as novidades?"
        label="Consultar a Coletividade"
      >
        <p>
          As aulas estão sem previsão de retomada. Fale com a equipe pelo WhatsApp para consultar
          eventuais novidades.
        </p>
      </CourseContact>
    </div>
  )
}
