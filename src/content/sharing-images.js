export const sharingImages = {
  '/cursos': '/images/grupos-danca/neolea-danca.jpeg',
  '/cursos/grego-moderno': '/images/sala-aulas-sede-original.webp',
  '/cursos/pedilea': '/images/grupos-danca/pedilea-grupo.jpeg',
  '/cursos/neolea-asteri': '/images/comunidade/neolea-festa-imigrante.jpeg',
  '/cursos/aulas-de-danca': '/images/grupos-danca/neolea-danca.jpeg',
  '/cursos/oficinas-culturais': '/images/atividades/ovos-aprendizado.webp',
  '/cursos/historia-mitologia-filosofia': '/images/archive/e3282cda77-grecia.webp',
  '/cursos/clube-de-cinema-grego': '/images/atividades/cinema-sala.webp',
  '/agenda': '/images/comunidade/neolea-festa-imigrante.jpeg',
  '/cultura': '/images/archive/d816786101-fotos-exposicao-noivas.webp',
}

export function sharingImageFor(route, image) {
  const candidate = sharingImages[route] || image || '/images/chsp-social-preview-seal-v6.png'
  return /\.svg(?:[?#]|$)/i.test(candidate) ? '/images/sala-aulas-sede-original.webp' : candidate
}
