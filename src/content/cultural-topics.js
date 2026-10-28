const articleTopicLabels = {
  calendar: 'Calendário e tradições',
  language: 'Língua grega',
  dance: 'Dança grega',
  music: 'Música grega',
  history: 'História e memória',
}

export const culturalTopics = [
  {
    id: 'language',
    title: 'Língua grega',
    description: 'Palavras, escrita e aprendizado.',
    image: '/images/aulas/presencial/professora-em-aula.webp',
    topics: ['language'],
    slugs: ['falando-grego', 'lingua-grega'],
  },
  {
    id: 'food',
    title: 'Gastronomia',
    description: 'Receitas e sabores para compartilhar.',
    image: '/images/archive/3cfc2160fe-moussaka-1.webp',
    categories: [9],
    slugs: ['live-vinhos-gregos', 'delivery-grego'],
  },
  {
    id: 'arts',
    title: 'Dança e música',
    description: 'Ritmos e tradições em movimento.',
    image: '/images/grupos-danca/neolea-danca.webp',
    topics: ['dance', 'music'],
    categories: [8],
    slugs: ['live-banda-kostakis'],
  },
  {
    id: 'history',
    title: 'História e memória',
    description: 'Origens, relatos e lembranças.',
    image: '/images/primeira-diretoria-chsp.webp',
    topics: ['history'],
    categories: [22],
    slugs: [
      'teogonia-de-hesiodo-o-nascimento-dos-deuses-gregos',
      'encontros-grandes-deuses',
      'afrodite-por-afrodite-um-ensaio',
      'a-queda-de-constantinopla',
      'o-mecanismo-de-anticitera',
      'principe-philip-o-principe-grego',
    ],
  },
  {
    id: 'traditions',
    title: 'Tradições e encontros',
    description: 'Celebrações e vida em comunidade.',
    image: '/images/pascoa-comunidade-original.webp',
    topics: ['calendar'],
    categories: [13],
  },
  {
    id: 'places',
    title: 'Destinos',
    description: 'Lugares para conhecer a Grécia.',
    image: '/images/archive/e3282cda77-grecia.webp',
    categories: [23],
    slugs: ['a-historia-de-petros'],
  },
]

export function matchesTopic(post, topicId) {
  if (topicId === 'all') return true
  const topic = culturalTopics.find((item) => item.id === topicId)
  return Boolean(
    topic &&
    (topic.topics?.includes(post.topic) ||
      topic.categories?.some((id) => post.categories.includes(id)) ||
      topic.slugs?.includes(post.slug)),
  )
}

export function publicationTopicLabel(post) {
  return (
    articleTopicLabels[post.topic] ||
    (post.categories.includes(21)
      ? culturalTopics.find((topic) => matchesTopic(post, topic.id))?.title
      : undefined)
  )
}

export function normalizeSearch(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
}
