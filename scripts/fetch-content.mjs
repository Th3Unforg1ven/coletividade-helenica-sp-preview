import { mkdir, writeFile } from 'node:fs/promises'

const API = 'https://www.helenica.com.br/wp-json/wp/v2'

async function getAll(type, query = '') {
  const first = await fetch(`${API}/${type}?per_page=100&page=1${query}`)
  if (!first.ok) throw new Error(`${type}: ${first.status} ${first.statusText}`)
  const totalPages = Number(first.headers.get('x-wp-totalpages') || 1)
  const records = await first.json()
  for (let page = 2; page <= totalPages; page += 1) {
    const response = await fetch(`${API}/${type}?per_page=100&page=${page}${query}`)
    if (!response.ok) throw new Error(`${type} página ${page}: ${response.status}`)
    records.push(...await response.json())
  }
  return records
}

const [pages, posts, categories, media] = await Promise.all([
  getAll('pages', '&orderby=menu_order&order=asc'),
  getAll('posts', '&orderby=date&order=desc'),
  getAll('categories', '&orderby=name&order=asc'),
  getAll('media', '&media_type=image'),
])

const mediaById = new Map(media.map(item => [item.id, {
  id: item.id,
  sourceUrl: item.source_url,
  alt: item.alt_text || '',
  caption: item.caption?.rendered || '',
  sizes: item.media_details?.sizes || {},
}]))

const compact = item => ({
  id: item.id,
  slug: item.slug,
  type: item.type,
  status: item.status,
  date: item.date,
  modified: item.modified,
  parent: item.parent || 0,
  menuOrder: item.menu_order || 0,
  link: item.link,
  title: item.title?.rendered || '',
  excerpt: item.excerpt?.rendered || '',
  content: item.content?.rendered || '',
  categories: item.categories || [],
  featuredMedia: mediaById.get(item.featured_media) || null,
})

const payload = {
  source: 'https://www.helenica.com.br',
  fetchedAt: new Date().toISOString(),
  totals: { pages: pages.length, posts: posts.length, categories: categories.length, media: media.length },
  categories: categories.map(item => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    count: item.count,
    description: item.description,
    parent: item.parent,
  })),
  pages: pages.map(compact),
  posts: posts.map(compact),
}

await mkdir('src/content', { recursive: true })
await writeFile('src/content/site-content.json', `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
console.log(JSON.stringify(payload.totals))
