import { mkdirSync, writeFileSync } from 'node:fs'

const endpoint = process.env.CDP_ENDPOINT || 'http://127.0.0.1:9333'
const baseUrl = process.env.SITE_URL || 'http://localhost:5173'

const defaultRoutes = [
  '/',
  '/aulas',
  '/aulas/aulas-de-grego-moderno',
  '/coletividade/nossa-historia',
  '/coletividade/lista-de-conselheiros',
  '/contato',
  '/privacidade',
  '/cultura',
  '/cultura/paginas/acontece-memorias',
  '/agenda',
]
const routes = process.env.QA_ROUTES ? process.env.QA_ROUTES.split(',') : defaultRoutes
const screenshotDirectory = process.env.QA_SCREENSHOT_DIR
const screenshotViewports = new Set((process.env.QA_SCREENSHOT_VIEWPORTS || '').split(',').filter(Boolean))
const summaryOnly = process.env.QA_SUMMARY === '1'
const auditSummary = { audits: 0, failures: [] }

const target = await fetch(`${endpoint}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' }).then(response => response.json())
const socket = new WebSocket(target.webSocketDebuggerUrl)
const pending = new Map()
let messageId = 0

await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (!message.id || !pending.has(message.id)) return
  const { resolve, reject } = pending.get(message.id)
  pending.delete(message.id)
  if (message.error) reject(new Error(message.error.message))
  else resolve(message.result)
})

function send(method, params = {}) {
  const id = ++messageId
  socket.send(JSON.stringify({ id, method, params }))
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
}

const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

await send('Page.enable')
await send('Runtime.enable')

const auditExpression = `(() => {
  const visible = element => {
    const style = getComputedStyle(element)
    const rect = element.getBoundingClientRect()
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0
  }
  const imagesWithoutAlt = [...document.images].filter(image => !image.hasAttribute('alt')).length
  const brokenImages = [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src)
  const smallVariantImages = [...document.images].filter(image => image.currentSrc.includes('-640.webp')).length
  const mediumVariantImages = [...document.images].filter(image => image.currentSrc.includes('-960.webp')).length
  const unnamedButtons = [...document.querySelectorAll('button')].filter(button => visible(button) && !(button.textContent.trim() || button.getAttribute('aria-label'))).length
  const emptyLinks = [...document.querySelectorAll('a')].filter(link => visible(link) && !link.textContent.trim() && !link.getAttribute('aria-label')).map(link => ({ href: link.getAttribute('href'), html: link.innerHTML.slice(0, 90) }))
  const clippedText = [...document.querySelectorAll('h1,h2,h3,p,a,button,span,strong,em')].filter(element => {
    if (!visible(element) || !element.textContent.trim()) return false
    const rect = element.getBoundingClientRect()
    return rect.left < -1 || rect.right > innerWidth + 1
  }).slice(0, 8).map(element => ({ tag: element.tagName, className: element.className, text: element.textContent.trim().slice(0, 55) }))
  return {
    title: document.title,
    h1: [...document.querySelectorAll('h1')].filter(visible).length,
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    imagesWithoutAlt,
    brokenImages,
    smallVariantImages,
    mediumVariantImages,
    unnamedButtons,
    emptyLinks,
    clippedText,
    notFound: document.body.textContent.includes('Página não encontrada'),
    truncatedMarker: /\\[(?:…|\\.\\.\\.)\\]/.test(document.body.textContent),
    mojibake: /Ã.|Î.|â€|�/.test(document.body.textContent),
  }
})()`

const viewports = [
  { name: 'small-mobile', width: 320, height: 568, mobile: true },
  { name: 'mobile', width: 390, height: 844, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'mobile-landscape', width: 844, height: 390, mobile: true },
  { name: 'notebook', width: 1024, height: 768, mobile: false },
  { name: 'desktop', width: 1440, height: 1000, mobile: false },
]

for (const viewport of viewports) {
  await send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile })
  for (const route of routes) {
    await send('Page.navigate', { url: `${baseUrl}${route}` })
    await wait(900)
    const result = await send('Runtime.evaluate', { expression: auditExpression, returnByValue: true })
    let interactions
    if (viewport.mobile && route === '/') {
      const interactionResult = await send('Runtime.evaluate', { expression: `(async () => {
        const settle = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
        const menu = document.querySelector('.menu-toggle')
        menu?.click()
        await settle()
        const menuOpened = document.querySelector('.nav')?.classList.contains('is-open') && menu?.getAttribute('aria-expanded') === 'true'
        menu?.click()
        await settle()
        const tabs = [...document.querySelectorAll('[role="tab"]')]
        tabs[1]?.click()
        await settle()
        const tabChanged = tabs[1]?.getAttribute('aria-selected') === 'true' && document.querySelector('[role="tabpanel"]')?.getAttribute('aria-labelledby') === tabs[1]?.id
        const faq = document.querySelector('.faq__item button')
        faq?.click()
        await settle()
        const faqResponded = faq?.getAttribute('aria-expanded') === 'false'
        return { menuOpened, tabChanged, faqResponded }
      })()`, returnByValue: true, awaitPromise: true })
      interactions = interactionResult.result.value
    }
    if (screenshotDirectory && screenshotViewports.has(viewport.name)) {
      mkdirSync(screenshotDirectory, { recursive: true })
      const metrics = await send('Page.getLayoutMetrics')
      const height = Math.min(Math.ceil(metrics.cssContentSize.height), 3200)
      const capture = await send('Page.captureScreenshot', {
        format: 'png',
        fromSurface: true,
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width: viewport.width, height, scale: 1 },
      })
      const routeName = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '-')
      writeFileSync(`${screenshotDirectory}/qa-${viewport.name}-${routeName}.png`, Buffer.from(capture.data, 'base64'))
    }
    const row = { viewport: viewport.name, route, ...result.result.value, interactions }
    auditSummary.audits += 1
    const hasFailure =
      row.h1 !== 1 ||
      row.scrollWidth > row.width ||
      row.imagesWithoutAlt > 0 ||
      row.brokenImages.length > 0 ||
      row.unnamedButtons > 0 ||
      row.emptyLinks.length > 0 ||
      row.clippedText.length > 0 ||
      row.notFound ||
      row.truncatedMarker ||
      row.mojibake ||
      (interactions && Object.values(interactions).some(value => value === false))

    if (hasFailure) auditSummary.failures.push(row)
    if (!summaryOnly) console.log(JSON.stringify(row))
  }
}

if (summaryOnly) console.log(JSON.stringify(auditSummary, null, 2))

socket.close()
await fetch(`${endpoint}/json/close/${target.id}`)
