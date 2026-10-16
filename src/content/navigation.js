export const lessonSlugs = [
  'aulas-de-grego-moderno',
  'aulas-de-danca',
  'aulas-de-bouzouki',
  'oficinas-culturais',
]

export const institutionSlugs = [
  'sobre-a-chsp',
  'nossa-historia',
  'missao-visao-valores',
  'conselho-deliberativo-e-diretoria-executiva',
  'conselheiros',
  'lista-de-conselheiros',
  'um-pouco-mais-sobre-a-grecia',
]

export const institutionNavSlugs = [
  'nossa-historia',
  'missao-visao-valores',
  'conselho-deliberativo-e-diretoria-executiva',
  'lista-de-conselheiros',
  'um-pouco-mais-sobre-a-grecia',
]

export const institutionLabels = {
  'sobre-a-chsp': 'Sobre a Coletividade',
  'nossa-historia': 'Nossa história',
  'missao-visao-valores': 'Missão, visão e valores',
  'conselho-deliberativo-e-diretoria-executiva': 'Diretoria e conselhos',
  conselheiros: 'Conselheiros e ex-presidentes',
  'lista-de-conselheiros': 'Conselheiros e ex-presidentes',
  'um-pouco-mais-sobre-a-grecia': 'Um pouco mais sobre a Grécia',
}

export const culturalPageSlugs = [
  'atividades-culturais-da-chsp',
  'festividades-civicas-e-religiosas',
  'acontece-curiosidades',
  'acontece-destinos',
  'acontece-gastronomia',
  'acontece-memorias',
  'acontece-musicas-gregas',
  'acontece-ultimos-eventos',
  'acontece2',
]

export function pathForPage(page) {
  if (page.slug === 'sobre-a-chsp') return '/coletividade'
  if (lessonSlugs.includes(page.slug))
    return `/cursos/${page.slug === 'aulas-de-grego-moderno' ? 'grego-moderno' : page.slug}`
  if (institutionSlugs.includes(page.slug)) return `/coletividade/${page.slug}`
  if (page.slug === 'agenda-de-eventos-e-festas') return '/agenda'
  if (page.slug === 'associados-e-parceiros') return '/participe'
  if (page.slug === 'contato') return '/contato'
  if (page.slug === 'politica-de-privacidade') return '/privacidade'
  if (culturalPageSlugs.includes(page.slug)) return `/cultura/paginas/${page.slug}`
  return `/paginas/${page.slug}`
}
