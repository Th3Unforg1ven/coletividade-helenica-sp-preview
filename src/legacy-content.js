import { mediaUrl } from './content/media.js'
import archiveVariants from './content/archive-variants.json'
import { pageBySlug, postBySlug } from './content/site-data.js'
import { pathForPage } from './content/navigation.js'
import { assetUrl, routeUrl } from './paths.js'

export const editorialReplacements = [
  [/^\s*festividades\s*$/i, 'Festividades'],
  [/\bfestividades-civicas-e-religiosas\b/gi, 'Festividades Cívicas e Religiosas'],
  [/\bAulas de Danca\b/gi, 'Aulas de Dança'],
  [/\bAulas de Grego Moderno\b/gi, 'Curso de Grego Moderno'],
  [/\bDancas Gregas\b/gi, 'Danças Gregas'],
  [/\bPolitica de privacidade\b/gi, 'Política de Privacidade'],
  [/\bMusica\b/g, 'Música'],
  [/\bUncategorized\b/g, 'Cultura'],
  [/\bSample Page\b/g, 'Página de exemplo'],
  [/\bAcontece Últimos Eventos\b/gi, 'Eventos recentes'],
  [/\bAcontece Memórias\b/gi, 'Memórias'],
  [/\bAcontece Gastronomia\b/gi, 'Gastronomia'],
  [/\bAcontece Destinos\b/gi, 'Destinos'],
  [/\bAcontece Músicas Gregas e Danças Folclóricas\b/gi, 'Músicas Gregas e Danças Folclóricas'],
  [/\bAcontece Curiosidades\b/gi, 'Curiosidades'],
  [/\bAcontece2\b/g, 'Acontecimentos'],
  [/\bAcontece\s+Fique por dentro do nosso blog!/gi, 'Fique por dentro do nosso acervo cultural!'],
  [/\bdiretoria executiva\b/gi, 'Diretoria Executiva'],
  [/\bconselho-deliberativo\b/gi, 'Conselho Deliberativo'],
  [/\bex-presidentes\b/gi, 'Ex-presidentes'],
  [/\búltimos eventos\b/gi, 'Últimos eventos'],
  [/\bContinua com alguma outra dúvida\?/gi, 'Ainda tem alguma dúvida?'],
  [
    /\bMais informações,\s*contate a Matina\b/gi,
    'Para mais informações, entre em contato com a Coletividade',
  ],
  [/\bContate a Matina\b/gi, 'Entre em contato com a Coletividade'],
  [/\bentre em contato com a Matina\b/gi, 'entre em contato com a Coletividade'],
  [/\bInscrições e informações com Matina\b/gi, 'Inscrições e informações com a Coletividade'],
  [/\bà cargo\b/gi, 'a cargo'],
  [/\bà gosto\b/gi, 'a gosto'],
  [/\bà meia noite\b/gi, 'à meia-noite'],
  [/\bviagem a Grécia\b/gi, 'viagem à Grécia'],
  [/\bterá inicio\b/gi, 'terá início'],
  [/\bteve inicio\b/gi, 'teve início'],
  [/\bunanime\b/gi, 'unânime'],
  [/\bhebráico\b/gi, 'hebraico'],
  [/\bsouveniers\b/gi, 'souvenires'],
  [/\bfilelenos\b/gi, 'filo-helenos'],
  [/\bA fotografa\b/g, 'A fotógrafa'],
  [/\bDesde de cedo\b/g, 'Desde cedo'],
  [/\bUsplash\b/g, 'Unsplash'],
  [/\bcerne e as batatas\b/gi, 'carne e as batatas'],
  [/\bÁ elas\b/g, 'A elas'],
  [/\bao mesmo, reconstruir\b/gi, 'ao mesmo tempo, reconstruir'],
  [/\bSão Pauço\b/g, 'São Paulo'],
  [/\bcuja a maior\b/gi, 'cuja maior'],
  [/\bproporcionadas peça CHSP\b/gi, 'proporcionadas pela CHSP'],
  [/\bgraças à inúmeras\b/gi, 'graças a inúmeras'],
  [/\bFamilia\b/g, 'Família'],
  [/\bVideo:\b/g, 'Vídeo:'],
  [/\.\s*regue com o suco\b/gi, '. Regue com o suco'],
  [/\bGreco-\s+Italiana\b/g, 'Greco-Italiana'],
  [/\bà respeito\b/gi, 'a respeito'],
  [/\bna rua Bresser\b/gi, 'na Rua Bresser'],
  [/\bhouveram várias tentativas\b/gi, 'houve várias tentativas'],
  [/\bdifere-se do grego clássico\b/gi, 'difere do grego clássico'],
  [/\bruinas\b/gi, 'ruínas'],
  [/\bBilingue\b/g, 'Bilíngue'],
  [/\bnorte americano\b/gi, 'norte-americano'],
  [/\bstress pós-traumático\b/gi, 'estresse pós-traumático'],
  [/\bos filhos terminar a aula\b/gi, 'os filhos terminarem a aula'],
  [/\bas quais seguem até hoje\b/gi, 'que seguem até hoje'],
  [/\batravés das danças, manter\b/gi, 'por meio das danças, buscam manter'],
  [/\bmemoria\b/gi, 'memória'],
  [
    /\bDepois do encerramento das atividades do Instituto Educacional Ateniense \(IEA\), desde 2014, passamos a oferecer semanalmente o ensino do idioma grego\./gi,
    'Desde o encerramento das atividades do Instituto Educacional Ateniense (IEA), em 2014, oferecemos semanalmente o ensino do idioma grego.',
  ],
  [
    /\bHoje contamos com várias turmas em vários níveis, no idioma grego baseados na metodologia adotada pelo governo grego, para certificação de proficiência na língua com aulas na sede da CHSP e online\./gi,
    'Hoje contamos com turmas em diferentes níveis, com metodologia adotada pelo governo grego e preparação para a certificação de proficiência. As aulas acontecem na sede da CHSP e online.',
  ],
  [/\bsobre o Grego Moderno\b/g, 'Sobre o grego moderno'],
  [/\bfalado, aproximadamente, por\b/gi, 'falado por aproximadamente'],
  [
    /\bO início do período da língua grega, conhecida por “Grego Moderno”, é simbolicamente atribuído\b/gi,
    'O início do período da língua grega conhecido como “grego moderno” é simbolicamente atribuído',
  ],
  [
    /\bembora rigorosamente se deva atribuir a sua gênese ao século XI\b/gi,
    'embora sua gênese remonte ao século XI',
  ],
  [
    /\bNotavelmente, esta situação durou até ao século XX\b/gi,
    'Essa situação durou até o século XX',
  ],
  [/\bAtualmente o grego moderno\b/g, 'Atualmente, o grego moderno'],
  [/\bpor que estudar Grego conosco\?/gi, 'Por que estudar grego conosco?'],
  [/\bos professores são nativos da Grécia\?/gi, 'Os professores são nativos da Grécia?'],
  [/\bas aulas são presenciais\?/gi, 'As aulas são presenciais?'],
  [
    /\bnão falo nada de Grego, será que vai ter problema\?/gi,
    'Não falo grego. Isso será um problema?',
  ],
  [/\bOnline turma de 15 alunos\./gi, 'As turmas online têm até 15 alunos.'],
  [/\b1h e 30min\b/gi, '1h30'],
  [
    /\bA coletividade helênica oferece, a todos que desejarem, suas aulas de dança\./gi,
    'A Coletividade Helênica oferece aulas de dança a todas as pessoas interessadas.',
  ],
  [/\beventos particulares como:\s*/gi, 'eventos particulares, como '],
  [/\bna sequência, em Festivais como:\s*/gi, 'depois, em festivais como '],
  [/\beventos como;\s*/gi, 'eventos como: '],
  [
    /\bFesta dos Imigrantes, organizado pelo Museu do Imigrante\b/gi,
    'Festa dos Imigrantes, organizada pelo Museu da Imigração',
  ],
  [/\btem caráter, cívico\b/gi, 'tem caráter cívico'],
  [/\bTem como visão, ser\b/g, 'Tem como visão ser'],
  [/\bValores;\s*/g, 'Valores: '],
  [/\b03 de Agosto\b/g, '3 de agosto'],
  [/\bAté meados da década de 30\b/g, 'Até meados da década de 1930'],
  [/\bna região da 25 de Março\b/gi, 'na região da Rua 25 de Março'],
  [
    /\bDesse grupo de gregos, a maioria vindo da Ásia Menor, surge\b/g,
    'Desse grupo, formado em sua maioria por gregos vindos da Ásia Menor, surgiu',
  ],
  [
    /\bA carta enviada em 31 de março de 1937 pela coletividade grega ao embaixador Vassilios Dendramis, comunica a eleição da 1ª diretoria em 14\/03\/1937\b/g,
    'A carta enviada em 31 de março de 1937 pela comunidade grega ao embaixador Vassilios Dendramis comunicava a eleição da primeira diretoria, realizada em 14 de março de 1937',
  ],
  [/\bno seguinte trecho;\b/gi, 'no seguinte trecho:'],
  [
    /\bComo é conhecido, a maioria dos imigrantes gregos chegaram em São Paulo, por volta dos anos 50\b/g,
    'Como se sabe, a maioria dos imigrantes gregos chegou a São Paulo por volta da década de 1950',
  ],
  [/\bsuas funções iniciais que era o ensino\b/gi, 'sua função inicial, que era o ensino'],
  [/\bmantem cursos de lingua grega\b/gi, 'mantém cursos de língua grega'],
]

export function correctEditorialText(value = '') {
  return editorialReplacements
    .reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value)
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
}

export function normalizePunctuation(value = '') {
  return value.replace(/&#8211;|&#8212;|&ndash;|&mdash;|[–—]/g, ',').replace(/\s+,\s+/g, ', ')
}

export function decode(value = '') {
  const element = document.createElement('div')
  element.innerHTML = normalizePunctuation(value).replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  return correctEditorialText(element.textContent || '')
}

export function stripHtml(value = '') {
  const element = document.createElement('div')
  element.innerHTML = normalizePunctuation(value)
  const decoded = correctEditorialText(element.textContent || '').trim()
  const wasTruncated = /\[(?:…|\.\.\.)\]\s*$/.test(decoded)
  const withoutMarker = decoded.replace(/\s*\[(?:…|\.\.\.)\]\s*$/, '').trim()
  return wasTruncated
    ? withoutMarker.replace(/\s+(?:o|a|os|as|um|uma|de|do|da|e)$/i, '').trim()
    : withoutMarker
}

export function rewriteLegacyLinks(html = '') {
  const source = normalizePunctuation(html)
    .replace(/http:\/\/(?:www\.)?helenica\.com\.br/gi, 'https://www.helenica.com.br')
    .replace(/<h[1-6][^>]*>\s*0?\d+\.\s*<\/h[1-6]>/gi, '')
  const element = document.createElement('div')
  element.innerHTML = source
  const walker = document.createTreeWalker(element, 4)
  let node = walker.nextNode()
  while (node) {
    node.nodeValue = correctEditorialText(node.nodeValue)
    node = walker.nextNode()
  }
  const obsoletePhone = /(?:\(?11\)?[.\s-]*)?99782[\s-]*5300/
  element.querySelectorAll('p, li').forEach((block) => {
    if (!obsoletePhone.test(block.textContent)) return
    const previousBlock = block.previousElementSibling
    block.remove()
    if (
      previousBlock?.matches('p') &&
      /^(?:inscri[cç][oõ]es|mais informa[cç][oõ]es|informa[cç][oõ]es)\b/i.test(
        previousBlock.textContent.trim(),
      )
    ) {
      previousBlock.remove()
    }
  })
  element.querySelectorAll('p').forEach((paragraph) => {
    if (!paragraph.textContent.trim() && !paragraph.querySelector('img, iframe, video'))
      paragraph.remove()
  })
  element.querySelectorAll('h1').forEach((heading) => {
    const replacement = document.createElement('h2')
    replacement.innerHTML = heading.innerHTML
    Array.from(heading.attributes).forEach((attribute) =>
      replacement.setAttribute(attribute.name, attribute.value),
    )
    heading.replaceWith(replacement)
  })
  element.querySelectorAll('img').forEach((image) => {
    const preservedSource = mediaUrl(image.getAttribute('src'))
    image.setAttribute('src', assetUrl(preservedSource))
    image.removeAttribute('srcset')
    image.removeAttribute('sizes')
    if (!image.getAttribute('alt')?.trim()) {
      const caption = image.closest('figure')?.querySelector('figcaption')?.textContent.trim()
      image.setAttribute('alt', caption || '')
    }
    image.setAttribute('loading', 'lazy')
    image.setAttribute('decoding', 'async')
    const availableWidths = archiveVariants[preservedSource] || []
    if (availableWidths.length && !image.closest('picture')) {
      const picture = document.createElement('picture')
      const smallSource = document.createElement('source')
      const mediumSource = document.createElement('source')
      const smallImage = availableWidths.includes(640)
        ? preservedSource.replace(/\.webp$/, '-640.webp')
        : preservedSource
      const mediumImage = availableWidths.includes(960)
        ? preservedSource.replace(/\.webp$/, '-960.webp')
        : smallImage
      smallSource.setAttribute('media', '(max-width: 560px)')
      smallSource.setAttribute('srcset', assetUrl(smallImage))
      mediumSource.setAttribute('media', '(max-width: 1000px)')
      mediumSource.setAttribute('srcset', assetUrl(mediumImage))
      image.replaceWith(picture)
      picture.append(smallSource, mediumSource, image)
    }
  })
  element.querySelectorAll('iframe').forEach((frame) => {
    if (!frame.hasAttribute('title')) frame.setAttribute('title', 'Conteúdo incorporado')
    frame.setAttribute('loading', 'lazy')
    if (frame.hasAttribute('src')) {
      frame.setAttribute('data-consent-src', frame.getAttribute('src'))
      frame.removeAttribute('src')
    }
  })
  element.querySelectorAll('video').forEach((video) => {
    const preservedMedia = mediaUrl(video.getAttribute('src'))
    if (preservedMedia.endsWith('.webp')) {
      const figure = document.createElement('figure')
      const image = document.createElement('img')
      const caption = document.createElement('figcaption')
      image.setAttribute('src', assetUrl(preservedMedia))
      image.setAttribute(
        'alt',
        'Registro visual do acervo histórico da Coletividade Helênica de São Paulo',
      )
      image.setAttribute('loading', 'lazy')
      image.setAttribute('decoding', 'async')
      caption.textContent = 'Registro visual preservado do vídeo original'
      figure.append(image, caption)
      video.replaceWith(figure)
      return
    }
    video.setAttribute('src', assetUrl(preservedMedia))
    video.setAttribute('preload', 'metadata')
  })

  const openingHeading = Array.from(element.querySelectorAll('h1,h2,h3')).find((heading) =>
    /^Sobre a$/i.test(heading.textContent.trim()),
  )
  const institutionName = openingHeading?.nextElementSibling
  if (
    institutionName &&
    /^H[1-6]$/.test(institutionName.tagName) &&
    /^Coletividade Helênica de São Paulo$/i.test(institutionName.textContent.trim())
  ) {
    openingHeading.remove()
    institutionName.remove()
  }

  const greeceHeading = Array.from(element.querySelectorAll('h1,h2,h3')).find((heading) =>
    /^Um pouco mais sobre$/i.test(heading.textContent.trim()),
  )
  const greeceName = greeceHeading?.nextElementSibling
  if (
    greeceName &&
    /^H[1-6]$/.test(greeceName.tagName) &&
    /^a Grécia$/i.test(greeceName.textContent.trim())
  ) {
    const mergedHeading = document.createElement('h2')
    mergedHeading.textContent = 'Um pouco mais sobre a Grécia'
    greeceHeading.replaceWith(mergedHeading)
    greeceName.remove()
  }

  const governanceLinkLabels = new Set([
    'conselheiros de 2020 a 2024',
    'conselheiros de 2022 a 2026',
    'conselheiros vitalícios',
    'ex-presidentes',
    'conselho deliberativo',
  ])
  const governanceHeadings = Array.from(element.querySelectorAll('h1,h2,h3,h4')).filter(
    (heading) => {
      const link = heading.querySelector('a[href]')
      return link && governanceLinkLabels.has(heading.textContent.trim().toLowerCase())
    },
  )
  if (governanceHeadings.length > 1) {
    const unifiedLink = document.createElement('a')
    unifiedLink.href = '/coletividade/lista-de-conselheiros'
    unifiedLink.textContent = 'Conselheiros e ex-presidentes'
    governanceHeadings[0].replaceChildren(unifiedLink)
    governanceHeadings.slice(1).forEach((heading) => heading.remove())
  }

  const councillorAnchors = {
    'conselheiros de 2020 a 2024': 'conselheiros-2020-2024',
    'conselheiros de 2022 a 2026': 'conselheiros-2022-2026',
    'conselheiros vitalícios': 'conselheiros-vitalicios',
  }
  let formerPresidents = 0
  element.querySelectorAll('h1,h2,h3,h4').forEach((heading) => {
    const text = heading.textContent.trim()
    if (/^Acontece$/i.test(text)) heading.textContent = 'Acontecimentos'
    if (/^gastronomia$/i.test(text)) heading.textContent = 'Gastronomia'
    const councillorId = councillorAnchors[text.toLowerCase()]
    if (councillorId) heading.id = councillorId
    if (/^Conselheiros Eleitos$/i.test(text)) {
      const period = heading.nextElementSibling?.textContent.trim() || ''
      if (/2020.*2024/.test(period)) {
        heading.textContent = 'Conselheiros eleitos de 2020 a 2024'
        heading.id = 'conselheiros-2020-2024'
      }
      if (/2022.*2026/.test(period)) {
        heading.textContent = 'Conselheiros eleitos de 2022 a 2026'
        heading.id = 'conselheiros-2022-2026'
      }
    }
    if (/^Ex[,\s-]*Presidentes$/i.test(text)) {
      const area = heading.nextElementSibling?.textContent.trim() || ''
      formerPresidents += 1
      const isCouncil = /Conselho Deliberativo/i.test(area) || formerPresidents > 1
      heading.textContent = isCouncil
        ? 'Ex-presidentes do Conselho Deliberativo'
        : 'Ex-presidentes da Diretoria Executiva'
      heading.id = isCouncil ? 'ex-presidentes-conselho' : 'ex-presidentes-diretoria'
    }
  })
  const legacyHashMap = {
    '#Conselheiros-de-2020-a-2024': '#conselheiros-2020-2024',
    '#Conselheiros-de-2022-a-2026': '#conselheiros-2022-2026',
    '#Conselheiros-vitalicios': '#conselheiros-vitalicios',
    '#ex-presidentes': '#ex-presidentes-diretoria',
    '#conselho-deliberativo': '#ex-presidentes-conselho',
  }
  const legacyPathMap = {
    '/festividades': '/paginas/festividades-civicas-e-religiosas',
  }
  element.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href')
    if (!href || href === '#') {
      anchor.replaceWith(...anchor.childNodes)
      return
    }
    const preservedMedia = mediaUrl(href)
    if (preservedMedia !== href && preservedMedia.startsWith('/images/archive/')) {
      anchor.setAttribute('href', assetUrl(preservedMedia))
      return
    }
    let url
    try {
      url = new URL(href, window.location.origin)
    } catch {
      return
    }
    const isLegacyDomain = /(^|\.)helenica\.com\.br$/i.test(url.hostname)
    const isLocal = url.origin === window.location.origin
    if (!isLegacyDomain && !isLocal) return
    const slug = url.pathname.split('/').filter(Boolean).pop()
    const mappedHash = legacyHashMap[url.hash] || url.hash
    if (legacyPathMap[url.pathname])
      anchor.setAttribute('href', routeUrl(`${legacyPathMap[url.pathname]}${mappedHash}`))
    else if (pageBySlug[slug])
      anchor.setAttribute('href', routeUrl(`${pathForPage(pageBySlug[slug])}${mappedHash}`))
    if (postBySlug[slug]) anchor.setAttribute('href', routeUrl(`/cultura/${slug}${mappedHash}`))
    if (!anchor.textContent.trim() && !anchor.getAttribute('aria-label')) {
      const finalSlug = new URL(anchor.getAttribute('href'), window.location.origin).pathname
        .split('/')
        .filter(Boolean)
        .pop()
      const destination =
        pageBySlug[slug] || postBySlug[slug] || pageBySlug[finalSlug] || postBySlug[finalSlug]
      const label = destination ? decode(destination.title) : 'conteúdo relacionado'
      anchor.setAttribute('aria-label', `Acessar ${label}`)
      const image = anchor.querySelector('img')
      if (image && !image.getAttribute('alt')) image.setAttribute('alt', label)
    }
  })
  element.querySelectorAll('img').forEach((image) => {
    const src = image.getAttribute('src')
    if (!src || !src.includes('/images/')) return
    const anchor = image.closest('a')
    // Preserve links to articles, documents and other destinations.
    if (anchor && !/\.(?:webp|jpe?g|png|svg)(?:[?#].*)?$/i.test(anchor.getAttribute('href'))) return
    const caption =
      image.closest('figure')?.querySelector('figcaption')?.textContent.trim() ||
      image.alt ||
      'Foto do acervo da Coletividade'
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'gallery-photo'
    button.dataset.gallerySrc = anchor?.getAttribute('href') || src
    button.dataset.galleryCaption = caption
    button.setAttribute('aria-label', `Ampliar foto: ${caption}`)
    button.setAttribute('aria-haspopup', 'dialog')
    const visual = image.closest('picture') || image
    if (anchor) {
      anchor.replaceWith(button)
      button.append(visual)
    } else {
      visual.replaceWith(button)
      button.append(visual)
    }
  })
  return element.innerHTML
}

export function extractLegacySection(html, startPattern, endPattern, includeStart = false) {
  const source = document.createElement('div')
  const output = document.createElement('div')
  source.innerHTML = html
  let collecting = false
  Array.from(source.children).forEach((child) => {
    const isHeading = /^H[1-6]$/.test(child.tagName)
    const headingText = isHeading ? child.textContent.trim() : ''
    if (!collecting && isHeading && startPattern.test(headingText)) {
      collecting = true
      if (includeStart) output.append(child.cloneNode(true))
      return
    }
    if (collecting && endPattern && isHeading && endPattern.test(headingText)) {
      collecting = false
      return
    }
    if (collecting) output.append(child.cloneNode(true))
  })
  return output.innerHTML
}
