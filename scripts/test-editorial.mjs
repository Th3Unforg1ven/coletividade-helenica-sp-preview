import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { parseHTML } from 'linkedom'
import { prerenderRoutes } from './prerender-routes.mjs'
import { editorialArticles, newArticles } from '../src/content/editorial-articles.js'
const archive = JSON.parse(fs.readFileSync('src/content/site-content.json', 'utf8'))
const known = new Set([...archive.posts, ...editorialArticles].map((p) => p.slug))

test('Association page connects to the supplied contact and downloadable documents', () => {
  const { document } = parseHTML(fs.readFileSync('dist/participe/index.html', 'utf8'))
  assert.ok(document.querySelector('main.membership-page'))
  assert.doesNotMatch(document.querySelector('main').textContent, /91307[\s-]?3510/)
  const contactLinks = [...document.querySelectorAll('main a[href^="https://wa.me/"]')]
  assert.ok(contactLinks.length > 0)
  for (const link of contactLinks) {
    assert.equal(new URL(link.href).pathname, '/5511913073510')
  }
  const documents = [...document.querySelectorAll('main a[href$=".pdf"]')]
  assert.equal(new Set(documents.map((link) => link.getAttribute('href'))).size, 2)
  for (const link of documents) {
    const relative = link.getAttribute('href').replace(process.env.BASE_PATH || '/', '')
    const file = fs.readFileSync(`dist/${relative}`)
    assert.equal(file.subarray(0, 5).toString(), '%PDF-')
  }
  assert.ok(document.querySelector('a[download]'))
  assert.ok(document.querySelector('footer a[href$="/participe"]'))
})

test('Each editorial article has a distinct image and a meaningful description', () => {
  assert.equal(
    new Set(editorialArticles.map((p) => p.featuredMedia.sourceUrl)).size,
    editorialArticles.length,
  )
  for (const post of editorialArticles) {
    assert.ok(post.featuredMedia.alt.length > 20, post.slug)
    assert.ok(fs.existsSync(`public${post.featuredMedia.sourceUrl}`), post.slug)
    if (post.featuredMedia.illustration) {
      for (const width of [640, 960])
        assert.ok(
          fs.existsSync(`public${post.featuredMedia.sourceUrl.replace('.webp', `-${width}.webp`)}`),
        )
    }
  }
})
test('All 16 requested articles exist and the central guide links to the four calendar articles', () => {
  assert.equal(newArticles.length, 16)
  assert.equal(new Set(editorialArticles.map((p) => p.slug)).size, 17)
  assert.deepEqual(
    editorialArticles[0].related,
    newArticles.slice(0, 4).map((p) => p.slug),
  )
  for (const post of newArticles) {
    assert.ok(post.sources.length)
    assert.ok(post.content.match(/<h2>/g).length >= 3)
    for (const slug of post.related) assert.ok(known.has(slug), slug)
    assert.ok(fs.existsSync(`public${post.featuredMedia.sourceUrl}`))
  }
})
test('All articles have complete standalone HTML, matching schema and working local assets', () => {
  for (const post of editorialArticles) {
    const html = fs.readFileSync(`dist/cultura/${post.slug}/index.html`, 'utf8')
    const { document } = parseHTML(html)
    assert.equal(document.querySelectorAll('h1').length, 1)
    assert.ok(document.body.textContent.includes(post.excerpt))
    assert.ok(html.includes('rel="canonical"'))
    assert.ok(document.querySelector('script[type="module"]'))
    assert.ok(!html.includes('/publicacoes/'))
    assert.ok(document.querySelector('.header .menu-toggle'))
    assert.ok(document.querySelector('footer.footer'))
    assert.ok(document.querySelector('.article-toc'))
    const schema = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((node) => JSON.parse(node.textContent))
      .find((item) => item['@type'] === 'BlogPosting')
    assert.equal(schema.headline, post.title)
    assert.equal(schema['@type'], 'BlogPosting')
    assert.ok(!schema.mainEntityOfPage.includes('#'))
    const ids = new Set([...document.querySelectorAll('[id]')].map((node) => node.id))
    for (const anchor of document.querySelectorAll('a[href^="#"]'))
      assert.ok(ids.has(anchor.getAttribute('href').slice(1)))
    for (const [, src] of html.matchAll(/(?:src|href)="([^"#]*(?:\.webp|\.png|\.css))"/g)) {
      const relative = src.replace(process.env.BASE_PATH || '/', '')
      assert.ok(fs.existsSync(`dist/${relative}`), src)
    }
  }
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8')
  assert.equal(
    (sitemap.match(/<loc>/g) || []).length,
    prerenderRoutes.filter((route) => route !== '/arquivo').length + 1,
  )
  assert.ok(!sitemap.includes('#'))
  assert.ok(!sitemap.includes('/publicacoes/'))
  const redirect = fs.readFileSync('dist/publicacoes/index.html', 'utf8')
  assert.ok(redirect.includes('http-equiv="refresh"'))
  assert.ok(redirect.includes('/cultura'))
  assert.ok(redirect.includes('noindex'))
})

test('Every public page has complete HTML, a canonical URL and specific sharing metadata', () => {
  const base = process.env.BASE_PATH || '/'
  const origin = process.env.SITE_ORIGIN || 'https://th3unforg1ven.github.io'
  for (const route of prerenderRoutes) {
    const html = fs.readFileSync(`dist${decodeURIComponent(route)}/index.html`, 'utf8')
    const { document } = parseHTML(html)
    const heading = document.querySelector('h1')?.textContent
    assert.ok(heading?.length > 0, route)
    assert.ok(document.querySelector('main')?.textContent.length > 100, route)
    const canonical = document.querySelector('link[rel="canonical"]').getAttribute('href')
    assert.equal(canonical, `${origin}${base}${route.slice(1)}/`, route)
    assert.ok(!canonical.includes('#'), route)
    assert.ok(document.title.includes(heading), route)
    assert.equal(
      document.querySelector('meta[property="og:url"]').getAttribute('content'),
      canonical,
      route,
    )
    const image = document.querySelector('meta[property="og:image"]').getAttribute('content')
    const imagePath = decodeURIComponent(new URL(image).pathname).slice(base.length)
    assert.ok(fs.existsSync(`dist/${imagePath}`), `${route}: ${image}`)
    for (const node of document.querySelectorAll(
      'script[src],link[rel="stylesheet"],.content-hero img',
    )) {
      const source = node.getAttribute('src') || node.getAttribute('href')
      if (!source?.startsWith(base)) continue
      assert.ok(
        fs.existsSync(`dist/${decodeURIComponent(source.slice(base.length))}`),
        `${route}: ${source}`,
      )
    }
  }
})

test('Historical records are identified before the article and editorial guides are not marked historical', () => {
  const old = parseHTML(fs.readFileSync('dist/cultura/we-are-open/index.html', 'utf8')).document
  assert.ok(
    old
      .querySelector('.article-context--historical')
      ?.textContent.includes('à época da publicação'),
  )
  const date = old.querySelector('.article-context time')
  assert.ok(date.getAttribute('datetime') || date.getAttribute('dateTime'))
  const current = parseHTML(
    fs.readFileSync(`dist/cultura/${newArticles[0].slug}/index.html`, 'utf8'),
  ).document
  assert.equal(current.querySelector('.article-context--historical'), null)
})

test('Content photos enlarge in the gallery while navigation images keep their links', () => {
  const base = process.env.BASE_PATH || '/'
  for (const route of prerenderRoutes) {
    const { document } = parseHTML(
      fs.readFileSync(`dist${decodeURIComponent(route)}/index.html`, 'utf8'),
    )
    for (const image of document.querySelectorAll('main img')) {
      if (image.closest('a, .cultural-topics button[aria-pressed]')) continue
      const trigger = image.closest('button[data-gallery-src]')
      assert.ok(trigger, `${route}: photo without gallery: ${image.getAttribute('src')}`)
      assert.ok(trigger.getAttribute('aria-label')?.startsWith('Ampliar foto:'), route)
      const source = trigger.getAttribute('data-gallery-src')
      if (source?.startsWith(base))
        assert.ok(
          fs.existsSync(`dist/${decodeURIComponent(source.slice(base.length))}`),
          `${route}: missing enlarged photo: ${source}`,
        )
      assert.equal(trigger.querySelector('a,button'), null, `${route}: nested control`)
    }
    assert.equal(document.querySelector('.gallery-photo__hint'), null, route)
    for (const video of document.querySelectorAll('main video')) {
      assert.ok(video.closest('button'), `${route}: video without direct playback control`)
      assert.ok(video.hasAttribute('playsInline') || video.hasAttribute('playsinline'), route)
      const poster = video.getAttribute('poster')
      assert.ok(poster, `${route}: video without preview`)
      assert.ok(fs.existsSync(`dist/${decodeURIComponent(poster.slice(base.length))}`), route)
    }
  }
})
