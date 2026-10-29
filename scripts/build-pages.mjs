import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { parseHTML } from 'linkedom'
import { prerenderRoutes, redirects } from './prerender-routes.mjs'
import { sharingImageFor } from '../src/content/sharing-images.js'

const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/')
const origin = (process.env.SITE_ORIGIN || 'https://th3unforg1ven.github.io').replace(/\/$/, '')
const shell = await fs.readFile('dist/index.html', 'utf8')
const styles = (await fs.readdir('dist/assets')).filter((file) => file.endsWith('.css'))
const siteUrl = (route) =>
  route === '/' ? origin + base : origin + base + route.replace(/^\//, '').replace(/\/?$/, '/')
const asset = (file) => `${base}${file.replace(/^\//, '')}`
const { window: buildWindow } = parseHTML('<!doctype html><html><head></head><body></body></html>')
buildWindow.location = new URL(origin + base)
globalThis.window = buildWindow
globalThis.document = buildWindow.document
const { renderPage } = await import(
  pathToFileURL(path.resolve('tmp/prerender/server-entry.js')).href
)

function documentFor(route, markup) {
  const { document } = parseHTML(shell)
  const root = document.getElementById('root')
  root.innerHTML = markup
  const heading = root.querySelector('h1')?.textContent.trim()
  if (route !== '/' && !heading) throw new Error(`Page rendered without a title: ${route}`)
  const title = route === '/' ? document.title : `${heading} | Coletividade Helênica de São Paulo`
  const description =
    root.querySelector('.content-hero > div > p:not(.content-kicker)')?.textContent.trim() ||
    document.querySelector('meta[name="description"]').content
  const image = sharingImageFor(route, root.querySelector('.content-hero img')?.getAttribute('src'))
  const picture = new URL(image.startsWith('/images/') ? asset(image) : image, origin).href
  const imageAlt =
    root.querySelector('.content-hero img')?.getAttribute('alt') ||
    heading ||
    'Coletividade Helênica de São Paulo'
  document.title = title
  function meta(attribute, name, value) {
    let node = document.head.querySelector(`meta[${attribute}="${name}"]`)
    if (!node) {
      node = document.createElement('meta')
      node.setAttribute(attribute, name)
      document.head.append(node)
    }
    node.content = value
  }
  meta('name', 'description', description)
  meta('property', 'og:url', siteUrl(route))
  meta(
    'property',
    'og:type',
    route.startsWith('/cultura/') && root.querySelector('.article-context') ? 'article' : 'website',
  )
  for (const prefix of ['og', 'twitter']) {
    const attribute = prefix === 'og' ? 'property' : 'name'
    for (const [key, value] of Object.entries({
      title,
      description,
      image: picture,
      'image:alt': imageAlt,
    }))
      meta(attribute, `${prefix}:${key}`, value)
  }
  meta('property', 'og:image:secure_url', picture)
  document
    .querySelectorAll(
      'meta[property="og:image:width"],meta[property="og:image:height"],meta[property="og:image:type"]',
    )
    .forEach((node) => node.remove())
  const canonical = document.createElement('link')
  canonical.rel = 'canonical'
  canonical.href = siteUrl(route)
  document.head.append(canonical)
  const schema = document.createElement('script')
  schema.type = 'application/ld+json'
  schema.dataset.pageSchema = ''
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: siteUrl(route),
  }).replaceAll('<', '\\u003c')
  document.head.append(schema)
  for (const file of styles) {
    const href = asset(`assets/${file}`)
    if (
      [...document.querySelectorAll('link[rel="stylesheet"]')].some(
        (node) => node.getAttribute('href') === href,
      )
    )
      continue
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.append(link)
  }
  return '<!doctype html>\n' + document.documentElement.outerHTML
}

for (const route of prerenderRoutes) {
  const markup = await renderPage(route, base)
  const output = documentFor(route, markup)
  const directory = path.join('dist', ...route.slice(1).split('/').map(decodeURIComponent))
  await fs.mkdir(directory, { recursive: true })
  await fs.writeFile(path.join(directory, 'index.html'), output)
}
for (const [route, destination] of Object.entries(redirects)) {
  const directory = path.join('dist', ...route.slice(1).split('/'))
  await fs.mkdir(directory, { recursive: true })
  const url = asset(destination + '/')
  await fs.writeFile(
    path.join(directory, 'index.html'),
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${url}"><link rel="canonical" href="${siteUrl(destination)}"><title>Coletividade Helênica de São Paulo</title></head><body><a href="${url}">Ir para a página atual</a></body></html>`,
  )
}
await fs.writeFile(
  'dist/404.html',
  shell.replace(
    '<meta name="description"',
    '<meta name="robots" content="noindex"><meta name="description"',
  ),
)
const urls = [...new Set(['/', ...prerenderRoutes])].filter((route) => route !== '/arquivo')
await fs.writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((route) => `<url><loc>${siteUrl(route)}</loc></url>`).join('')}</urlset>`,
)
await fs.writeFile(
  'dist/robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}${base}sitemap.xml\n`,
)
console.log(
  `Generated ${prerenderRoutes.length} complete pages, ${Object.keys(redirects).length} redirects and sitemap.`,
)
