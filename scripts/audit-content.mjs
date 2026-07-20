import { readFileSync } from 'node:fs'

const content = JSON.parse(readFileSync(new URL('../src/content/site-content.json', import.meta.url), 'utf8'))
const records = [...content.pages, ...content.posts]
const pageSlugs = new Set(content.pages.map(item => item.slug))
const postSlugs = new Set(content.posts.map(item => item.slug))
const mappedLegacyPaths = new Set(['/festividades'])
const links = []

for (const record of records) {
  for (const match of String(record.content || '').matchAll(/href=["']([^"']+)["']/gi)) {
    links.push({ source: record.slug, href: match[1] })
  }
}

const unresolved = []
for (const link of links) {
  let url
  try { url = new URL(link.href, 'https://www.helenica.com.br') } catch { continue }
  if (!/(^|\.)helenica\.com\.br$/i.test(url.hostname)) continue
  if (/^\/wp-(?:content|admin|includes)\//.test(url.pathname)) continue
  if (mappedLegacyPaths.has(url.pathname)) continue
  const slug = url.pathname.split('/').filter(Boolean).pop()
  if (!slug || pageSlugs.has(slug) || postSlugs.has(slug)) continue
  if (['category', 'tag', 'author'].some(segment => url.pathname.includes(`/${segment}/`))) continue
  unresolved.push({ ...link, pathname: url.pathname })
}

const allHtml = records.map(record => record.content || '').join('\n')
const checks = {
  records: records.length,
  links: links.length,
  unresolvedLinks: [...new Map(unresolved.map(item => [`${item.pathname}|${item.source}`, item])).values()],
  emptyPages: content.pages.filter(page => !String(page.content || '').replace(/<[^>]*>|&nbsp;|\s/g, '')).map(page => page.slug),
  legacyTerms: {
    matina: (allHtml.match(/matina/gi) || []).length,
    danca: (allHtml.match(/\bDanca\b/gi) || []).length,
    truncatedMarkers: (allHtml.match(/\[(?:…|\.\.\.)\]/g) || []).length,
    dashes: (allHtml.match(/[–—]/g) || []).length,
  },
}

console.log(JSON.stringify(checks, null, 2))
