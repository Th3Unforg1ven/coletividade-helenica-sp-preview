import fs from 'node:fs'
import { editorialArticles } from '../src/content/editorial-articles.js'
import { pathForPage, lessonSlugs } from '../src/content/navigation.js'

const archive = JSON.parse(fs.readFileSync('src/content/site-content.json', 'utf8'))
const siteContent = { ...archive, posts: [...editorialArticles, ...archive.posts] }
const publicArchivePages = archive.pages.filter(
  (page) => !['home', 'sample-page', 'temp'].includes(page.slug),
)

export const redirects = {
  '/coletividade/conselheiros': '/coletividade/lista-de-conselheiros',
  '/coletividade/sobre-a-chsp': '/coletividade',
  '/aulas': '/cursos',
  '/cursos/aulas-de-grego-moderno': '/cursos/grego-moderno',
  '/publicacoes': '/cultura',
}
for (const slug of lessonSlugs) redirects[`/aulas/${slug}`] = pathForPage({ slug })

export const prerenderRoutes = [
  ...new Set([
    '/',
    '/coletividade',
    '/cursos',
    '/cultura',
    '/agenda',
    '/contato',
    '/participe',
    '/privacidade',
    '/arquivo',
    ...lessonSlugs.map((slug) => pathForPage({ slug })),
    ...['pedilea', 'neolea-asteri', 'historia-mitologia-filosofia', 'clube-de-cinema-grego'].map(
      (slug) => `/cursos/${slug}`,
    ),
    ...publicArchivePages.map(pathForPage),
    ...siteContent.posts.map((post) => `/cultura/${post.slug}`),
    ...siteContent.categories
      .filter((category) => category.count > 0 && category.slug !== 'uncategorized')
      .map((category) => `/cultura/categoria/${category.slug}`),
  ]),
].filter((route) => !redirects[route])
