import GalleryImage from './components/GalleryImage.jsx'
import { teachers } from './content/teachers.js'
import { Languages } from 'lucide-react'
import { assetUrl } from './paths.js'
import './greek-learning-mosaic.css'

export default function GreekLearningMosaic() {
  return (
    <div className="experience-card__symbol greek-learning-frame">
      <div
        className="greek-learning-mosaic"
        aria-label="Aulas on-line e professores do curso de Grego Moderno"
      >
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            className="greek-learning-mosaic__class"
            style={{ gridArea: `s${index}` }}
            key={index}
          >
            <GalleryImage
              src={assetUrl(`/images/aulas/mosaico-participante-${index + 1}.svg`)}
              alt="Participante de uma aula on-line de grego"
              loading="lazy"
            />
          </div>
        ))}
        {teachers.map(([slug, name], index) => (
          <div
            className="greek-learning-mosaic__portrait"
            style={{ gridArea: `p${index}` }}
            key={slug}
          >
            <GalleryImage
              src={assetUrl(`/images/professores-grego/${slug}-retrato.jpg`)}
              alt={name}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <Languages strokeWidth={1} />
      <span>
        <b lang="el">ΓΛΩΣΣΑ</b> • Língua
      </span>
    </div>
  )
}
