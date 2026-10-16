import { assetUrl } from '../paths.js'
import { sharingImageFor } from './sharing-images.js'

export function updatePageSeo({
  pathname,
  title,
  description,
  image,
  imageAlt = '',
  type = 'website',
  noIndex = false,
}) {
  const origin = import.meta.env.VITE_SITE_ORIGIN || window.location.origin
  const route = pathname.replace(/\/$/, '') || '/'
  const canonical = new URL(assetUrl(route === '/' ? '/' : `${route}/`), origin).href
  const picture = new URL(assetUrl(sharingImageFor(route, image)), origin).href
  document.title = title
  function meta(attribute, name, value) {
    let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, name)
      document.head.append(element)
    }
    element.content = value
  }
  meta('name', 'description', description)
  for (const prefix of ['og', 'twitter']) {
    const attribute = prefix === 'og' ? 'property' : 'name'
    for (const [name, value] of Object.entries({
      title,
      description,
      image: picture,
      'image:alt': imageAlt || title,
    }))
      meta(attribute, `${prefix}:${name}`, value)
  }
  meta('property', 'og:url', canonical)
  meta('property', 'og:type', type)
  meta('property', 'og:image:secure_url', picture)
  document.head
    .querySelectorAll(
      'meta[property="og:image:width"],meta[property="og:image:height"],meta[property="og:image:type"]',
    )
    .forEach((element) => element.remove())
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.append(link)
  }
  link.href = canonical
  if (noIndex) meta('name', 'robots', 'noindex')
  else document.head.querySelector('meta[name="robots"]')?.remove()
  let schema = document.head.querySelector('script[data-page-schema]')
  if (!schema) {
    schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.dataset.pageSchema = ''
    document.head.append(schema)
  }
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonical,
  })
}
