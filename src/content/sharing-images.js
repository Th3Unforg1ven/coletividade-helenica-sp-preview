import { memoryPhotos } from './memory-photos.js'

export const sharingImages = {
  '/coletividade': memoryPhotos.institution.src,
  '/coletividade/nossa-historia': memoryPhotos.ourHistory.src,
  '/coletividade/lista-de-conselheiros': memoryPhotos.councillors.src,
  '/cultura/paginas/acontece-memorias': memoryPhotos.memories.src,
  '/participe': '/images/comunidade/dia-imigrante-comunidade.webp',
  '/cursos': '/images/grupos-danca/neolea-danca.jpeg',
  '/cursos/grego-koine': '/images/cursos/codex-sinaiticus.jpg',
  '/cursos/grego-moderno': '/images/aulas/presencial/professora-em-aula.webp',
  '/cursos/pedilea': '/images/grupos-danca/pedilea-grupo.jpeg',
  '/cursos/neolea-asteri': '/images/comunidade/neolea-festa-imigrante.jpeg',
  '/cursos/aulas-de-danca': '/images/grupos-danca/neolea-danca.jpeg',
  '/cursos/oficinas-culturais': '/images/atividades/ovos-aprendizado.webp',
  '/cursos/historia-mitologia-filosofia': '/images/archive/e3282cda77-grecia.webp',
  '/cursos/clube-de-cinema-grego': '/images/atividades/cinema-sala.webp',
  '/agenda': '/images/comunidade/neolea-festa-imigrante.jpeg',
  '/cultura': memoryPhotos.culture.src,
}

export function sharingImageFor(route, image) {
  const candidate = sharingImages[route] || image || '/images/chsp-social-preview-seal-v6.png'
  return /\.svg(?:[?#]|$)/i.test(candidate) ? '/images/sala-aulas-sede-original.webp' : candidate
}
