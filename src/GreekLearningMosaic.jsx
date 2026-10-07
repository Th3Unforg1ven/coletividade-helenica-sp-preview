import { Languages } from 'lucide-react'
import { assetUrl } from './paths.js'
import './greek-learning-mosaic.css'

const portraits = [
  ['panaghiota-kartali-retrato.jpg', 'Panaghiota (Julie) Kartali'],
  ['efstathios-tsotsos-retrato.jpg', 'Efstathios Tsotsos'],
  ['natasha-gonda-polichronopoulos-retrato.jpg', 'Natasha Gonda Polichronopoulos'],
  ['kleoniki-kiourkou-retrato.jpg', 'Kleoniki Kiourkou'],
  ['luciana-povoa-retrato.jpg', 'Luciana Póvoa'],
  ['olympia-dimitrakopoulou-retrato.jpg', 'Olympia Dimitrakopoulou'],
]

export default function GreekLearningMosaic() {
  return <div className="experience-card__symbol greek-learning-frame">
    <div className="greek-learning-mosaic" aria-label="Aulas on-line e professores do curso de Grego Moderno">
      {[1,2].map(n => <div className={`greek-learning-mosaic__class class-${n}`} key={n}><img src={assetUrl(`/images/aulas/turma-grego-encontro-${n}.svg`)} alt={`Participantes de uma aula on-line de grego — turma ${n}`} loading="lazy" /></div>)}
      {portraits.map(([file,name],index) => <div className="greek-learning-mosaic__portrait" style={{gridColumn:index % 2 ? 3 : 1,gridRow:`${Math.floor(index / 2)*2+1} / span 2`}} key={file}><img src={assetUrl(`/images/professores-grego/${file}`)} alt={name} loading="lazy" /></div>)}
    </div>
    <Languages strokeWidth={1}/><span><b lang="el">ΓΛΩΣΣΑ</b> • Língua</span>
  </div>
}
