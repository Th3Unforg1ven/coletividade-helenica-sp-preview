import { teachers } from '../../src/content/teachers.js'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Languages, Users, Music2, Sparkles, ArrowRight } from 'lucide-react'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/gfs-didot/latin-400.css'
import '@fontsource/gfs-didot/greek-400.css'
import '../../src/styles.css'
import './mosaic-proposals.css'
const names = teachers.map(([slug]) => slug)
const variants = [
  '01 · Turma ao centro',
  '02 · Faixas de encontros',
  '03 · Retratos em destaque',
  '04 · Ritmo alternado',
  '05 · Professores nas laterais',
  '06 · Duas colunas',
]
const layouts = [
  ['p0 s0 s1 p1', 'p2 s2 s3 p3', 'p4 s4 s5 p5'],
  ['p0 p1 p2', 's0 s1 s2', 's3 s4 s5', 'p3 p4 p5'],
  ['p0 p0 s0 s1', 'p0 p0 p1 p2', 'p3 p4 p5 p5', 's2 s3 p5 p5'],
  ['p0 s0 p1 s1', 's2 p2 s3 p3', 'p4 s4 p5 s5'],
  ['p0 s0 s1 p1', 'p0 s2 s3 p1', 'p2 s4 s5 p3', 'p2 p4 p5 p3'],
  ['p0 p1 s0 s1', 'p2 p3 s2 s3', 'p4 p5 s4 s5'],
]
const activities = [
  ['Grego Moderno', 'ΓΛΩΣΣΑ', 'Língua', null, Languages],
  ['Pedilea', 'ΧΟΡΟΣ', 'Grupo infantil', '/images/grupos-danca/pedilea-grupo.jpeg', Users],
  ['Neolea Asteri', 'ΧΟΡΟΣ', 'Grupo de dança', '/images/grupos-danca/neolea-danca.jpeg', Users],
  [
    'Oficinas culturais',
    'ΠΟΛΙΤΙΣΜΟΣ',
    'Encontros culturais',
    '/images/oficinas-culturais-original.webp',
    Sparkles,
  ],
  ['Bouzouki', 'ΜΟΥΣΙΚΗ', 'Música', '/images/aulas-bouzouki-original.webp', Music2],
]
function Photos({ variant }) {
  const areas = layouts[variant]
  const used = new Set(areas.join(' ').split(' '))
  return (
    <div
      className="proposal-photos"
      style={{
        gridTemplateAreas: areas
          .map((row) => String.fromCharCode(34) + row + String.fromCharCode(34))
          .join(' '),
        gridTemplateColumns: 'repeat(' + areas[0].split(' ').length + ',minmax(0,1fr))',
        gridTemplateRows: 'repeat(' + areas.length + ',minmax(0,1fr))',
      }}
      aria-label="Professores e participantes das aulas de Grego Moderno"
    >
      {names.map(
        (n, i) =>
          used.has('p' + i) && (
            <div className="proposal-portrait" style={{ gridArea: 'p' + i }} key={n}>
              <img
                src={'/images/professores-grego/' + n + '-retrato.jpg'}
                alt={n.replaceAll('-', ' ')}
              />
            </div>
          ),
      )}
      {[0, 1, 2, 3, 4, 5].map(
        (i) =>
          used.has('s' + i) && (
            <div className="proposal-participant" style={{ gridArea: 's' + i }} key={i}>
              <img
                src={'/images/aulas/mosaico-participante-' + (i + 1) + '.svg'}
                alt="Participante de uma aula on-line de grego"
              />
            </div>
          ),
      )}
    </div>
  )
}
function Preview() {
  const [variant, setVariant] = useState(0)
  const [activity, setActivity] = useState(0)
  const [title, greek, eyebrow, photo, Icon] = activities[activity]
  return (
    <main className="proposals">
      <header className="proposal-controls">
        <p className="eyebrow">Estudo de composição</p>
        <h1>Seis maneiras de reunir a turma.</h1>
        <p>
          Mesma moldura, símbolo e identidade do site. Seis composições com fotos contínuas, sem
          blocos de cor. Compare pelos botões abaixo.
        </p>
        <div className="proposal-switch" aria-label="Versões do mosaico">
          {variants.map((v, i) => (
            <button
              key={v}
              aria-pressed={variant === i}
              onClick={() => {
                setVariant(i)
                setActivity(0)
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </header>
      <section className="proposal-context">
        <div className="experience-tabs" aria-label="Comparar com outras atividades">
          {activities.map(([t], i) => (
            <button
              className={activity === i ? 'active' : ''}
              key={t}
              onClick={() => setActivity(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="experience-card">
          <div
            className={`experience-card__symbol ${activity === 0 ? 'proposal-symbol' : ''}`}
            style={{ '--experience-image': photo ? `url(${photo})` : 'none' }}
          >
            {activity === 0 && <Photos variant={variant} />}
            <Icon strokeWidth={1} />
            <span>
              <b lang="el">{greek}</b> • {eyebrow}
            </span>
          </div>
          <div className="experience-card__copy">
            <p className="eyebrow">
              <span lang="el">{greek}</span> • {eyebrow}
            </p>
            <h3>{activity === 0 ? 'Uma nova língua. Uma parte de você que ganha voz.' : title}</h3>
            <p>
              {activity === 0
                ? 'Aprenda a conversar, viajar e acessar a cultura grega sem tradução. Aulas de 1h30, presenciais ou online, do básico ao avançado. Consulte a equipe sobre vagas, horários e valores.'
                : 'Referência visual da atividade, para comparar o enquadramento com as propostas de Grego Moderno.'}
            </p>
            {activity === 0 && (
              <>
                <div className="activity-tags">
                  <span>Consultar turmas</span>
                </div>
                <ul>
                  {['Presencial ou online', 'Adultos e crianças', 'Do básico ao avançado'].map(
                    (t) => (
                      <li key={t}>
                        <Sparkles size={15} />
                        {t}
                      </li>
                    ),
                  )}
                </ul>
                <a className="button button--white" href="/cursos/grego-moderno">
                  Consultar turmas de Grego <ArrowRight size={18} />
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
createRoot(document.getElementById('root')).render(<Preview />)
