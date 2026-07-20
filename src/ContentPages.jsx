import { useEffect } from 'react'
import { ArrowRight, BookOpen, CalendarDays, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import siteContent from './content/site-content.json'
import ResponsiveImage from './ResponsiveImage.jsx'
import { routeUrl } from './paths.js'

const lessonSlugs = [
  'aulas-de-grego-moderno',
  'aulas-de-danca',
  'aulas-de-bouzouki',
  'oficinas-culturais',
]

const institutionSlugs = [
  'sobre-a-chsp',
  'nossa-historia',
  'missao-visao-valores',
  'conselho-deliberativo-e-diretoria-executiva',
  'conselheiros',
  'lista-de-conselheiros',
  'um-pouco-mais-sobre-a-grecia',
]

const institutionNavSlugs = [
  'sobre-a-chsp',
  'nossa-historia',
  'missao-visao-valores',
  'conselho-deliberativo-e-diretoria-executiva',
  'lista-de-conselheiros',
  'um-pouco-mais-sobre-a-grecia',
]

const institutionLabels = {
  'sobre-a-chsp': 'Sobre a Coletividade',
  'nossa-historia': 'Nossa história',
  'missao-visao-valores': 'Missão, visão e valores',
  'conselho-deliberativo-e-diretoria-executiva': 'Diretoria e conselhos',
  'conselheiros': 'Conselheiros e ex-presidentes',
  'lista-de-conselheiros': 'Conselheiros e ex-presidentes',
  'um-pouco-mais-sobre-a-grecia': 'Um pouco mais sobre a Grécia',
}

const culturalPageSlugs = [
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

const courseIntroductions = {
  'aulas-de-grego-moderno': 'Aprenda a conversar, compreender canções, viajar com autonomia e acessar a cultura grega em sua própria língua.',
  'aulas-de-danca': 'Conheça ritmos de diferentes regiões da Grécia e transforme movimento em memória, saúde e convivência.',
  'aulas-de-bouzouki': 'Descubra o instrumento que acompanha gerações de música grega e desenvolva expressão por meio de seu repertório.',
  'oficinas-culturais': 'Experimente diferentes expressões da cultura helênica por meio de encontros, práticas e oficinas abertas à comunidade.',
}

const lessonImages = {
  'aulas-de-grego-moderno': '/images/aulas-grego-original.webp',
  'aulas-de-danca': '/images/aulas-danca-original.webp',
  'aulas-de-bouzouki': '/images/aulas-bouzouki-original.webp',
  'oficinas-culturais': '/images/oficinas-culturais-original.webp',
}

const lessonContentOverrides = {
  'aulas-de-bouzouki': `
    <h2>Sobre o bouzouki</h2>
    <p>O bouzouki é um instrumento de cordas da família do alaúde e um dos símbolos mais reconhecidos da música grega. Seu nome deriva da palavra turca <em>buzuk</em>, e sua sonoridade atravessa repertórios tradicionais e populares.</p>
    <p>Tanto no continente quanto nas ilhas, a música acompanha celebrações religiosas, casamentos, encontros comunitários e diferentes danças. O bouzouki pode ser ouvido em formações tradicionais e em ritmos como o sirtaki e o hasapiko.</p>
    <p>Mikis Theodorakis, Vasilis Tsitsanis e Manolis Karantinis estão entre os artistas que ajudaram a projetar a força e a identidade desse instrumento.</p>
    <h2>Aprender é participar dessa história</h2>
    <p>As aulas aproximam técnica, repertório e cultura. Quem começa desenvolve coordenação e escuta musical, enquanto estudantes com experiência podem aprofundar interpretação e expressão.</p>
    <h2>Informações sobre as aulas</h2>
    <p>Turmas, horários, formato e valores podem variar ao longo do ano. Entre em contato com a Coletividade para conhecer a programação disponível.</p>
    <p><a href="/contato">Consultar a equipe da Coletividade</a></p>
    <figure><img src="https://www.helenica.com.br/wp-content/uploads/2021/01/church-2020258_1920-768x503.jpg" alt="Patrimônio cultural grego"/></figure>
  `,
  'oficinas-culturais': `
    <h2>Cultura grega para aprender fazendo</h2>
    <p>As oficinas culturais transformam tradições, histórias e saberes em encontros práticos. A programação varia ao longo do ano e aproxima diferentes gerações da comunidade.</p>
    <h3>Cozinhando com Yiayiá</h3>
    <p>Encontros dedicados às receitas, aos ingredientes e às memórias afetivas da culinária grega, compartilhadas entre gerações.</p>
    <h3>Iconografia grega</h3>
    <p>Atividades de introdução à linguagem visual, aos símbolos e às técnicas ligadas à tradição iconográfica grega.</p>
    <h3>Bingo da Liga das Senhoras Gregas</h3>
    <p>Uma atividade de convivência que reúne a comunidade e fortalece as iniciativas culturais e beneficentes da Coletividade.</p>
    <h3>Bazares</h3>
    <p>Programações especiais em datas como Dia das Mães, Páscoa e Natal, com produtos, gastronomia e trabalhos realizados pela comunidade.</p>
    <h2>Participe das próximas oficinas</h2>
    <p>Consulte a equipe para conhecer o calendário, as inscrições e as atividades disponíveis.</p>
    <p><a href="/contato">Falar com a Coletividade</a></p>
  `,
}

const pageIntroductions = {
  'acontece2': 'Acompanhe os acontecimentos da Coletividade e explore eventos, curiosidades, memórias, música, destinos e gastronomia.',
  'sobre-a-chsp': 'Conheça a origem, a atuação e os princípios que orientam a Coletividade Helênica de São Paulo desde 1937.',
}

const pageTitles = {
  'sobre-a-chsp': 'Sobre a Coletividade Helênica de São Paulo',
}

const pageBySlug = Object.fromEntries(siteContent.pages.map(page => [page.slug, page]))
const postBySlug = Object.fromEntries(siteContent.posts.map(post => [post.slug, post]))
const categoryById = Object.fromEntries(siteContent.categories.map(category => [category.id, category]))

const consolidatedFallbacks = {
  'nossa-historia': 'sobre-a-chsp',
  'missao-visao-valores': 'sobre-a-chsp',
  'conselho-deliberativo-e-diretoria-executiva': 'conselheiros',
}

const editorialReplacements = [
  [/^\s*festividades\s*$/i, 'Festividades'],
  [/\bfestividades-civicas-e-religiosas\b/gi, 'Festividades Cívicas e Religiosas'],
  [/\bAulas de Danca\b/gi, 'Aulas de Dança'],
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
  [/\bMais informações,\s*contate a Matina\b/gi, 'Para mais informações, entre em contato com a Coletividade'],
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
  [/\bDepois do encerramento das atividades do Instituto Educacional Ateniense \(IEA\), desde 2014, passamos a oferecer semanalmente o ensino do idioma grego\./gi, 'Desde o encerramento das atividades do Instituto Educacional Ateniense (IEA), em 2014, oferecemos semanalmente o ensino do idioma grego.'],
  [/\bHoje contamos com várias turmas em vários níveis, no idioma grego baseados na metodologia adotada pelo governo grego, para certificação de proficiência na língua com aulas na sede da CHSP e online\./gi, 'Hoje contamos com turmas em diferentes níveis, com metodologia adotada pelo governo grego e preparação para a certificação de proficiência. As aulas acontecem na sede da CHSP e online.'],
  [/\bsobre o Grego Moderno\b/g, 'Sobre o grego moderno'],
  [/\bfalado, aproximadamente, por\b/gi, 'falado por aproximadamente'],
  [/\bO início do período da língua grega, conhecida por “Grego Moderno”, é simbolicamente atribuído\b/gi, 'O início do período da língua grega conhecido como “grego moderno” é simbolicamente atribuído'],
  [/\bembora rigorosamente se deva atribuir a sua gênese ao século XI\b/gi, 'embora sua gênese remonte ao século XI'],
  [/\bNotavelmente, esta situação durou até ao século XX\b/gi, 'Essa situação durou até o século XX'],
  [/\bAtualmente o grego moderno\b/g, 'Atualmente, o grego moderno'],
  [/\bpor que estudar Grego conosco\?/gi, 'Por que estudar grego conosco?'],
  [/\bos professores são nativos da Grécia\?/gi, 'Os professores são nativos da Grécia?'],
  [/\bas aulas são presenciais\?/gi, 'As aulas são presenciais?'],
  [/\bnão falo nada de Grego, será que vai ter problema\?/gi, 'Não falo grego. Isso será um problema?'],
  [/\bOnline turma de 15 alunos\./gi, 'As turmas online têm até 15 alunos.'],
  [/\b1h e 30min\b/gi, '1h30'],
  [/\bA coletividade helênica oferece, a todos que desejarem, suas aulas de dança\./gi, 'A Coletividade Helênica oferece aulas de dança a todas as pessoas interessadas.'],
  [/\beventos particulares como:\s*/gi, 'eventos particulares, como '],
  [/\bna sequência, em Festivais como:\s*/gi, 'depois, em festivais como '],
  [/\beventos como;\s*/gi, 'eventos como: '],
  [/\bFesta dos Imigrantes, organizado pelo Museu do Imigrante\b/gi, 'Festa dos Imigrantes, organizada pelo Museu da Imigração'],
  [/\btem caráter, cívico\b/gi, 'tem caráter cívico'],
  [/\bTem como visão, ser\b/g, 'Tem como visão ser'],
  [/\bValores;\s*/g, 'Valores: '],
  [/\b03 de Agosto\b/g, '3 de agosto'],
  [/\bAté meados da década de 30\b/g, 'Até meados da década de 1930'],
  [/\bna região da 25 de Março\b/gi, 'na região da Rua 25 de Março'],
  [/\bDesse grupo de gregos, a maioria vindo da Ásia Menor, surge\b/g, 'Desse grupo, formado em sua maioria por gregos vindos da Ásia Menor, surgiu'],
  [/\bA carta enviada em 31 de março de 1937 pela coletividade grega ao embaixador Vassilios Dendramis, comunica a eleição da 1ª diretoria em 14\/03\/1937\b/g, 'A carta enviada em 31 de março de 1937 pela comunidade grega ao embaixador Vassilios Dendramis comunicava a eleição da primeira diretoria, realizada em 14 de março de 1937'],
  [/\bno seguinte trecho;\b/gi, 'no seguinte trecho:'],
  [/\bComo é conhecido, a maioria dos imigrantes gregos chegaram em São Paulo, por volta dos anos 50\b/g, 'Como se sabe, a maioria dos imigrantes gregos chegou a São Paulo por volta da década de 1950'],
  [/\bsuas funções iniciais que era o ensino\b/gi, 'sua função inicial, que era o ensino'],
  [/\bmantem cursos de lingua grega\b/gi, 'mantém cursos de língua grega'],
]

function correctEditorialText(value = '') {
  return editorialReplacements
    .reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value)
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
}

function normalizePunctuation(value = '') {
  return value
    .replace(/&#8211;|&#8212;|&ndash;|&mdash;|[–—]/g, ',')
    .replace(/\s+,\s+/g, ', ')
}

function decode(value = '') {
  const element = document.createElement('textarea')
  element.innerHTML = normalizePunctuation(value)
  return correctEditorialText(element.value)
}

function stripHtml(value = '') {
  const element = document.createElement('div')
  element.innerHTML = normalizePunctuation(value)
  const decoded = correctEditorialText(element.textContent || '').trim()
  const wasTruncated = /\[(?:…|\.\.\.)\]\s*$/.test(decoded)
  const withoutMarker = decoded.replace(/\s*\[(?:…|\.\.\.)\]\s*$/, '').trim()
  return wasTruncated ? withoutMarker.replace(/\s+(?:o|a|os|as|um|uma|de|do|da|e)$/i, '').trim() : withoutMarker
}

function pathForPage(page) {
  if (lessonSlugs.includes(page.slug)) return `/aulas/${page.slug}`
  if (institutionSlugs.includes(page.slug)) return `/coletividade/${page.slug}`
  if (page.slug === 'agenda-de-eventos-e-festas') return '/agenda'
  if (page.slug === 'associados-e-parceiros') return '/participe'
  if (page.slug === 'contato') return '/contato'
  if (page.slug === 'politica-de-privacidade') return '/privacidade'
  if (culturalPageSlugs.includes(page.slug)) return `/cultura/paginas/${page.slug}`
  return `/paginas/${page.slug}`
}

function rewriteLegacyLinks(html = '') {
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
  element.querySelectorAll('p, li').forEach(block => {
    if (!obsoletePhone.test(block.textContent)) return
    const previousBlock = block.previousElementSibling
    block.remove()
    if (previousBlock?.matches('p') && /^(?:inscri[cç][oõ]es|mais informa[cç][oõ]es|informa[cç][oõ]es)\b/i.test(previousBlock.textContent.trim())) {
      previousBlock.remove()
    }
  })
  element.querySelectorAll('p').forEach(paragraph => {
    if (!paragraph.textContent.trim() && !paragraph.querySelector('img, iframe, video')) paragraph.remove()
  })
  element.querySelectorAll('h1').forEach(heading => {
    const replacement = document.createElement('h2')
    replacement.innerHTML = heading.innerHTML
    Array.from(heading.attributes).forEach(attribute => replacement.setAttribute(attribute.name, attribute.value))
    heading.replaceWith(replacement)
  })
  element.querySelectorAll('img').forEach(image => {
    if (!image.hasAttribute('alt')) image.setAttribute('alt', '')
    image.setAttribute('loading', 'lazy')
    image.setAttribute('decoding', 'async')
  })
  element.querySelectorAll('iframe').forEach(frame => {
    if (!frame.hasAttribute('title')) frame.setAttribute('title', 'Conteúdo incorporado')
    frame.setAttribute('loading', 'lazy')
  })

  const openingHeading = Array.from(element.querySelectorAll('h1,h2,h3')).find(heading => /^Sobre a$/i.test(heading.textContent.trim()))
  const institutionName = openingHeading?.nextElementSibling
  if (institutionName && /^H[1-6]$/.test(institutionName.tagName) && /^Coletividade Helênica de São Paulo$/i.test(institutionName.textContent.trim())) {
    openingHeading.remove()
    institutionName.remove()
  }

  const greeceHeading = Array.from(element.querySelectorAll('h1,h2,h3')).find(heading => /^Um pouco mais sobre$/i.test(heading.textContent.trim()))
  const greeceName = greeceHeading?.nextElementSibling
  if (greeceName && /^H[1-6]$/.test(greeceName.tagName) && /^a Grécia$/i.test(greeceName.textContent.trim())) {
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
  const governanceHeadings = Array.from(element.querySelectorAll('h1,h2,h3,h4')).filter(heading => {
    const link = heading.querySelector('a[href]')
    return link && governanceLinkLabels.has(heading.textContent.trim().toLowerCase())
  })
  if (governanceHeadings.length > 1) {
    const unifiedLink = document.createElement('a')
    unifiedLink.href = '/coletividade/lista-de-conselheiros'
    unifiedLink.textContent = 'Conselheiros e ex-presidentes'
    governanceHeadings[0].replaceChildren(unifiedLink)
    governanceHeadings.slice(1).forEach(heading => heading.remove())
  }

  const councillorAnchors = {
    'conselheiros de 2020 a 2024': 'conselheiros-2020-2024',
    'conselheiros de 2022 a 2026': 'conselheiros-2022-2026',
    'conselheiros vitalícios': 'conselheiros-vitalicios',
  }
  let formerPresidents = 0
  element.querySelectorAll('h1,h2,h3,h4').forEach(heading => {
    const text = heading.textContent.trim()
    if (/^Acontece$/i.test(text)) heading.textContent = 'Acontecimentos'
    if (/^gastronomia$/i.test(text)) heading.textContent = 'Gastronomia'
    const councillorId = councillorAnchors[text.toLowerCase()]
    if (councillorId) heading.id = councillorId
    if (/^Conselheiros Eleitos$/i.test(text)) {
      const period = heading.nextElementSibling?.textContent.trim() || ''
      if (/2020.*2024/.test(period)) { heading.textContent = 'Conselheiros eleitos de 2020 a 2024'; heading.id = 'conselheiros-2020-2024' }
      if (/2022.*2026/.test(period)) { heading.textContent = 'Conselheiros eleitos de 2022 a 2026'; heading.id = 'conselheiros-2022-2026' }
    }
    if (/^Ex[,\s-]*Presidentes$/i.test(text)) {
      const area = heading.nextElementSibling?.textContent.trim() || ''
      formerPresidents += 1
      const isCouncil = /Conselho Deliberativo/i.test(area) || formerPresidents > 1
      heading.textContent = isCouncil ? 'Ex-presidentes do Conselho Deliberativo' : 'Ex-presidentes da Diretoria Executiva'
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
  element.querySelectorAll('a[href]').forEach(anchor => {
    const href = anchor.getAttribute('href')
    if (!href || href === '#') { anchor.replaceWith(...anchor.childNodes); return }
    let url
    try { url = new URL(href, window.location.origin) } catch { return }
    const isLegacyDomain = /(^|\.)helenica\.com\.br$/i.test(url.hostname)
    const isLocal = url.origin === window.location.origin
    if (!isLegacyDomain && !isLocal) return
    const slug = url.pathname.split('/').filter(Boolean).pop()
    const mappedHash = legacyHashMap[url.hash] || url.hash
    if (legacyPathMap[url.pathname]) anchor.setAttribute('href', routeUrl(`${legacyPathMap[url.pathname]}${mappedHash}`))
    else if (pageBySlug[slug]) anchor.setAttribute('href', routeUrl(`${pathForPage(pageBySlug[slug])}${mappedHash}`))
    if (postBySlug[slug]) anchor.setAttribute('href', routeUrl(`/cultura/${slug}${mappedHash}`))
    if (!anchor.textContent.trim() && !anchor.getAttribute('aria-label')) {
      const finalSlug = new URL(anchor.getAttribute('href'), window.location.origin).pathname.split('/').filter(Boolean).pop()
      const destination = pageBySlug[slug] || postBySlug[slug] || pageBySlug[finalSlug] || postBySlug[finalSlug]
      const label = destination ? decode(destination.title) : 'conteúdo relacionado'
      anchor.setAttribute('aria-label', `Acessar ${label}`)
      const image = anchor.querySelector('img')
      if (image && !image.getAttribute('alt')) image.setAttribute('alt', label)
    }
  })
  return element.innerHTML
}

function extractLegacySection(html, startPattern, endPattern, includeStart = false) {
  const source = document.createElement('div')
  const output = document.createElement('div')
  source.innerHTML = html
  let collecting = false
  Array.from(source.children).forEach(child => {
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

function Breadcrumbs({ items = [] }) {
  return <nav className="breadcrumbs" aria-label="Navegação estrutural">
    <Link to="/">Início</Link>
    {items.map((item, index) => <span key={`${item.label}-${index}`}>
      <b>/</b>{item.to ? <Link to={item.to}>{item.label}</Link> : <em>{item.label}</em>}
    </span>)}
  </nav>
}

function ContentHero({ eyebrow, title, introduction, image, motifTheme }) {
  useEffect(() => {
    document.title = `${title} | Coletividade Helênica de São Paulo`
  }, [title])
  return <header className={`content-hero${motifTheme ? ` content-hero--themed content-hero--${motifTheme}` : ''}`}>
    <div>
      <p className="content-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {introduction && <p>{introduction}</p>}
    </div>
    <figure className={image ? '' : 'content-hero__art'}>
      {image && <ResponsiveImage src={image} alt="" />}
    </figure>
  </header>
}

function LegacyHtml({ html }) {
  return <div className="wp-content" dangerouslySetInnerHTML={{ __html: rewriteLegacyLinks(html) }} />
}

function PageNavigation({ slugs, basePath, labels = {} }) {
  return <aside className="page-navigation">
    <p>Nesta seção</p>
    {slugs.map(slug => pageBySlug[slug]).filter(Boolean).map(page => (
      <Link key={page.id} to={`${basePath}/${page.slug}`}>{labels[page.slug] || decode(page.title)}<ArrowRight size={15}/></Link>
    ))}
  </aside>
}

function FullPage({ page, eyebrow = 'Coletividade Helênica de São Paulo', navigation }) {
  if (!page) return <NotFound />
  const fallback = pageBySlug[consolidatedFallbacks[page.slug]]
  const originalIsEmpty = !page.content.trim()
  const displayedContent = originalIsEmpty && fallback ? fallback.content : page.content
  return <main className="content-page">
    <Breadcrumbs items={[{ label: eyebrow }]} />
    <ContentHero
      eyebrow={eyebrow}
      title={pageTitles[page.slug] || decode(page.title)}
      introduction={pageIntroductions[page.slug] || stripHtml(page.excerpt)}
      image={page.featuredMedia?.sourceUrl}
    />
    <div className="content-layout">
      <article>
        {originalIsEmpty && <div className="consolidation-note"><h2>Conteúdo consolidado</h2><p>A página anterior não possuía texto próprio. O conteúdo relacionado disponível em outra página institucional foi apresentado aqui para evitar uma seção vazia.</p></div>}
        {displayedContent ? <LegacyHtml html={displayedContent} /> : <div className="consolidation-note"><h2>Página preservada</h2><p>Esta página existia na navegação anterior, mas não possuía conteúdo público cadastrado no WordPress.</p></div>}
      </article>
      {navigation}
    </div>
    <SourceNote link={page.link} />
  </main>
}

function SourceNote({ link }) {
  return <div className="source-note">
    <BookOpen size={18}/><p>Conteúdo migrado do site anterior e revisado para a nova experiência da Coletividade Helênica de São Paulo.</p>
    <a href={link} target="_blank" rel="noreferrer">Consultar original</a>
  </div>
}

export function LessonsIndex() {
  const overview = pageBySlug['atividades-culturais-da-chsp']
  return <main className="content-page content-page--themed content-page--aulas">
    <Breadcrumbs items={[{ label: 'Aulas' }]} />
    <ContentHero eyebrow="Aulas" title="Aprenda e viva a cultura grega" introduction="Língua, dança, música e oficinas para diferentes idades, níveis e formas de participação." image="/images/aulas-grego-turma-recorte-original.webp" motifTheme="aulas" />
    <section className="directory-grid">
      {lessonSlugs.map(slug => pageBySlug[slug]).filter(Boolean).map(page => <Link className="directory-card" to={`/aulas/${page.slug}`} key={page.id}>
        <span>Aulas</span><h2>{decode(page.title).replace(/^Aulas de /i, '')}</h2><p>{courseIntroductions[page.slug] || stripHtml(page.excerpt)}</p><b>Ver informações completas <ArrowRight size={16}/></b>
      </Link>)}
    </section>
    {overview && <section className="legacy-overview"><LegacyHtml html={overview.content}/><SourceNote link={overview.link}/></section>}
  </main>
}

export function LessonPage() {
  const { slug } = useParams()
  const page = pageBySlug[slug]
  if (!page || !lessonSlugs.includes(slug)) return <NotFound />
  return <main className="content-page">
    <Breadcrumbs items={[{ label: 'Aulas', to: '/aulas' }, { label: decode(page.title) }]} />
    <ContentHero eyebrow="Aulas" title={decode(page.title)} introduction={courseIntroductions[slug]} image={lessonImages[slug]} />
    <div className="content-layout">
      <article><LegacyHtml html={lessonContentOverrides[slug] || page.content}/></article>
      <PageNavigation slugs={lessonSlugs} basePath="/aulas" />
    </div>
    <SourceNote link={page.link}/>
  </main>
}

export function InstitutionIndex() {
  return <main className="content-page content-page--themed content-page--coletividade">
    <Breadcrumbs items={[{ label: 'A Coletividade' }]} />
    <ContentHero eyebrow="A Coletividade" title="Uma história grega em São Paulo" introduction="Conheça a origem, a missão, as pessoas e os valores que sustentam a Coletividade Helênica de São Paulo." image="/images/primeira-diretoria-chsp.webp" motifTheme="coletividade" />
    <section className="directory-grid directory-grid--compact">
      {institutionNavSlugs.map(slug => pageBySlug[slug]).filter(Boolean).map(page => <Link className="directory-card" to={`/coletividade/${page.slug}`} key={page.id}><span>A Coletividade</span><h2>{institutionLabels[page.slug]}</h2><b>Ler página completa <ArrowRight size={16}/></b></Link>)}
    </section>
    <section className="institution-summary">
      <p className="content-kicker">Desde 1937</p>
      <div><h2>Uma instituição feita por pessoas, memória e participação.</h2><p>A Coletividade Helênica de São Paulo reúne gregos, descendentes, filo-helenos e todas as pessoas interessadas na preservação e na promoção da cultura grega. Nesta seção, a história, os princípios e os registros de sua administração estão organizados em páginas próprias.</p></div>
    </section>
  </main>
}

function InstitutionSectionPage({ title, introduction, image, html, sourceLink, children }) {
  return <main className="content-page">
    <Breadcrumbs items={[{ label: 'A Coletividade', to: '/coletividade' }, { label: title }]} />
    <ContentHero eyebrow="A Coletividade Helênica de São Paulo" title={title} introduction={introduction} image={image} />
    <div className="content-layout">
      <article>
        {children}
        {html && <LegacyHtml html={html} />}
      </article>
      <PageNavigation slugs={institutionNavSlugs} basePath="/coletividade" labels={institutionLabels} />
    </div>
    <SourceNote link={sourceLink} />
  </main>
}

function GovernanceLinks() {
  const links = [
    ['Conselheiros eleitos de 2020 a 2024', '#conselheiros-2020-2024'],
    ['Conselheiros eleitos de 2022 a 2026', '#conselheiros-2022-2026'],
    ['Conselheiros vitalícios', '#conselheiros-vitalicios'],
    ['Ex-presidentes da Diretoria Executiva', '#ex-presidentes-diretoria'],
    ['Ex-presidentes do Conselho Deliberativo', '#ex-presidentes-conselho'],
  ]
  return <nav className="governance-links" aria-label="Registros de conselheiros e ex-presidentes">
    <p className="content-kicker">Consulte os registros</p>
    {links.map(([label, hash]) => <Link key={hash} to={`/coletividade/lista-de-conselheiros${hash}`}>{label}<ArrowRight size={16}/></Link>)}
  </nav>
}

export function InstitutionPage() {
  const { slug } = useParams()
  if (!institutionSlugs.includes(slug)) return <NotFound />
  const source = pageBySlug['sobre-a-chsp']
  if (slug === 'nossa-historia') return <InstitutionSectionPage
    title="Nossa história"
    introduction="Da fundação em 1937 ao trabalho educacional e cultural que atravessa gerações em São Paulo."
    image="/images/primeira-diretoria-chsp.webp"
    html={extractLegacySection(source.content, /^Nossa História$/i, /^No que acreditamos$/i)}
    sourceLink={source.link}
  />
  if (slug === 'missao-visao-valores') return <InstitutionSectionPage
    title="Missão, visão e valores"
    introduction="Os princípios que orientam a atuação cívica, religiosa, filantrópica, beneficente, cultural e recreativa da Coletividade."
    html={extractLegacySection(source.content, /^Nossa Missão, visão e valores$/i, /^diretoria executiva$/i)}
    sourceLink={source.link}
  />
  if (slug === 'conselho-deliberativo-e-diretoria-executiva') return <InstitutionSectionPage
    title="Diretoria e conselhos"
    introduction="Conheça a estrutura administrativa publicada pela Coletividade e acesse os registros de quem ajudou a conduzir a instituição."
    html={extractLegacySection(source.content, /^diretoria executiva$/i, /^Conselheiros de 2020 a 2024$/i, true)}
    sourceLink={source.link}
  ><GovernanceLinks /></InstitutionSectionPage>
  if (slug === 'conselheiros' || slug === 'lista-de-conselheiros') {
    const page = pageBySlug['lista-de-conselheiros']
    return <InstitutionSectionPage
      title="Conselheiros e ex-presidentes"
      introduction="Registros das pessoas que integraram os conselhos e presidiram os órgãos da Coletividade Helênica de São Paulo."
      image="/images/primeira-diretoria-chsp.webp"
      html={page.content}
      sourceLink={page.link}
    ><GovernanceLinks /></InstitutionSectionPage>
  }
  if (slug === 'um-pouco-mais-sobre-a-grecia') return <InstitutionSectionPage
    title="Um pouco mais sobre a Grécia"
    introduction="Informações essenciais para conhecer o território, a história e alguns dos símbolos da cultura grega."
    html={extractLegacySection(source.content, /^Um pouco mais sobre$/i, null, true)}
    sourceLink={source.link}
  />
  return <FullPage page={pageBySlug[slug]} eyebrow="A Coletividade" navigation={<PageNavigation slugs={institutionNavSlugs} basePath="/coletividade" labels={institutionLabels} />} />
}

function PostCard({ post }) {
  const category = categoryById[post.categories[0]]
  return <Link className="post-card" to={`/cultura/${post.slug}`}>
    {post.featuredMedia?.sourceUrl && <img src={post.featuredMedia.sourceUrl} alt={post.featuredMedia.alt || ''} loading="lazy" />}
    <div><span>{decode(category?.name || 'Cultura')}</span><h2>{decode(post.title)}</h2><p>{stripHtml(post.excerpt).slice(0, 180)}</p><b>Ler conteúdo completo <ArrowRight size={15}/></b></div>
  </Link>
}

export function CultureIndex() {
  return <main className="content-page content-page--themed content-page--cultura">
    <Breadcrumbs items={[{ label: 'Cultura e memória' }]} />
    <ContentHero eyebrow="Cultura e memória" title="Grécia para ler, ouvir, provar e lembrar" introduction={`O arquivo reúne ${siteContent.posts.length} publicações preservadas do site anterior.`} image="/images/exposicao-cultural-original.webp" motifTheme="cultura" />
    <nav className="category-links">
      {siteContent.categories.filter(category => category.count > 0).map(category => <Link to={`/cultura/categoria/${category.slug}`} key={category.id}>{decode(category.name)} <span>{category.count}</span></Link>)}
    </nav>
    <section className="posts-grid">{siteContent.posts.map(post => <PostCard post={post} key={post.id}/>)}</section>
    <section className="cultural-pages"><h2>Páginas culturais do acervo</h2>{culturalPageSlugs.map(slug => pageBySlug[slug]).filter(Boolean).map(page => <Link to={`/cultura/paginas/${page.slug}`} key={page.id}>{decode(page.title)}<ArrowRight size={15}/></Link>)}</section>
  </main>
}

export function CategoryPage() {
  const { slug } = useParams()
  const category = siteContent.categories.find(item => item.slug === slug)
  if (!category) return <NotFound />
  const posts = siteContent.posts.filter(post => post.categories.includes(category.id))
  return <main className="content-page">
    <Breadcrumbs items={[{ label: 'Cultura e memória', to: '/cultura' }, { label: decode(category.name) }]} />
    <ContentHero eyebrow="Cultura e memória" title={decode(category.name)} introduction={`${posts.length} publicações disponíveis nesta coleção.`} />
    <section className="posts-grid">{posts.map(post => <PostCard post={post} key={post.id}/>)}</section>
  </main>
}

export function MemoryPage() {
  const page = pageBySlug['acontece-memorias']
  const category = siteContent.categories.find(item => item.slug === 'memorias')
  const posts = category ? siteContent.posts.filter(post => post.categories.includes(category.id)) : []
  return <main className="content-page memory-landing">
    <Breadcrumbs items={[{ label: 'Cultura e memória', to: '/cultura' }, { label: 'Memórias' }]} />
    <ContentHero eyebrow="Cultura e memória" title="Memórias da Coletividade" introduction="Desde 1937, festas, encontros, viagens e histórias de vida formam a memória da Coletividade Helênica de São Paulo." image="/images/primeira-diretoria-chsp.webp" />
    <section className="collection-intro">
      <p className="content-kicker">Histórias que permanecem</p>
      <div><h2>Quase nove décadas<br/>em imagens e relatos.</h2><p>Este acervo reúne lembranças da imigração grega, exposições realizadas pela Coletividade, trajetórias familiares e momentos importantes para a comunidade. Cada relato ajuda a preservar essa história e a transmiti-la às próximas gerações.</p></div>
    </section>
    <div className="collection-heading"><h2>Explore as memórias</h2><span>{posts.length} histórias preservadas</span></div>
    <section className="posts-grid">{posts.map(post => <PostCard post={post} key={post.id}/>)}</section>
    {page && <SourceNote link={page.link}/ >}
  </main>
}

export function PostPage() {
  const { slug } = useParams()
  const post = postBySlug[slug]
  if (!post) return <NotFound />
  const category = categoryById[post.categories[0]]
  return <main className="content-page">
    <Breadcrumbs items={[{ label: 'Cultura e memória', to: '/cultura' }, { label: decode(post.title) }]} />
    <ContentHero eyebrow={decode(category?.name || 'Cultura')} title={decode(post.title)} introduction={stripHtml(post.excerpt)} image={post.featuredMedia?.sourceUrl} />
    <div className="content-layout"><article><LegacyHtml html={post.content}/></article><aside className="page-navigation"><p>Informações</p><span>Publicado em {new Intl.DateTimeFormat('pt-BR').format(new Date(post.date))}</span>{post.categories.map(id => categoryById[id]).filter(Boolean).map(item => <Link to={`/cultura/categoria/${item.slug}`} key={item.id}>{decode(item.name)}<ArrowRight size={15}/></Link>)}</aside></div>
    <SourceNote link={post.link}/>
  </main>
}

export function AgendaPage() {
  const page = pageBySlug['agenda-de-eventos-e-festas']
  const events = siteContent.posts.filter(post => post.categories.includes(13))
  return <main className="content-page content-page--themed content-page--agenda">
    <Breadcrumbs items={[{ label: 'Agenda' }]} />
    <ContentHero eyebrow="Agenda" title="Eventos, festas e celebrações" introduction="Acompanhe encontros culturais, festividades cívicas, celebrações religiosas e atividades da comunidade." image="/images/evento-comunidade-original.webp" motifTheme="agenda" />
    {page && <section className="legacy-overview"><LegacyHtml html={page.content}/></section>}
    <section className="posts-grid">{events.map(post => <PostCard post={post} key={post.id}/>)}</section>
    {page && <SourceNote link={page.link}/ >}
  </main>
}

export function ArchivePage() {
  return <main className="content-page">
    <Breadcrumbs items={[{ label: 'Arquivo integral' }]} />
    <ContentHero eyebrow="Arquivo integral" title="Todo o conteúdo do site anterior" introduction={`${siteContent.totals.pages} páginas e ${siteContent.totals.posts} publicações preservadas e acessíveis.`} />
    <section className="archive-columns">
      <div><h2>Páginas</h2>{siteContent.pages.map(page => <Link to={pathForPage(page)} key={page.id}><span>{decode(page.title)}</span><small>{page.slug}</small></Link>)}</div>
      <div><h2>Publicações</h2>{siteContent.posts.map(post => <Link to={`/cultura/${post.slug}`} key={post.id}><span>{decode(post.title)}</span><small>{new Intl.DateTimeFormat('pt-BR').format(new Date(post.date))}</small></Link>)}</div>
    </section>
  </main>
}

export function GenericPage({ fixedSlug, eyebrow = 'Arquivo do site anterior' }) {
  const params = useParams()
  return <FullPage page={pageBySlug[fixedSlug || params.slug]} eyebrow={eyebrow} />
}

export function ContactPage() {
  return <main className="content-page">
    <Breadcrumbs items={[{ label: 'Contato' }]} />
    <ContentHero eyebrow="Contato" title="Converse com a Coletividade" introduction="Informações sobre aulas, inscrições, associação, eventos e atividades culturais." image="/images/contato-sede-original.webp" />
    <section className="contact-panel">
      <div className="contact-panel__intro"><p className="content-kicker">Contato direto</p><h2>Como podemos ajudar?</h2><p>Escolha o canal mais conveniente para falar com a equipe da Coletividade Helênica de São Paulo.</p></div>
      <div className="contact-methods">
        <div><Phone/><span><small>Telefones</small><a href="tel:+551126951678">(11) 2695-1678</a><a href="tel:+5511940318080">(11) 94031-8080</a></span></div>
        <a href="mailto:coletividade@helenica.com.br"><Mail/><span><small>E-mail</small><strong>coletividade@helenica.com.br</strong></span></a>
        <div><MapPin/><span><small>Endereço</small><strong>Rua Bresser, 793</strong><em>Brás, São Paulo, SP</em></span></div>
      </div>
      <aside className="contact-return"><MessageCircle/><p className="content-kicker">Prefere que entremos em contato com você?</p><h2>Fale com nossa equipe.</h2><p>Envie uma mensagem pelo WhatsApp e conte brevemente como podemos ajudar.</p><a className="button button--white" href="https://wa.link/ryey8t" target="_blank" rel="noreferrer">Conversar pelo WhatsApp <ArrowRight size={16}/></a></aside>
    </section>
    <div className="contact-map"><iframe title="Mapa da sede da Coletividade Helênica de São Paulo" src="https://maps.google.com/maps?q=Rua%20Bresser%2C%20793&amp;t=m&amp;z=17&amp;output=embed&amp;iwloc=near" loading="lazy"/></div>
    <SourceNote link={pageBySlug.contato.link}/>
  </main>
}

export function NotFound() {
  return <main className="content-page not-found"><ContentHero eyebrow="Conteúdo" title="Página não encontrada" introduction="O endereço pode ter mudado durante a reorganização do site."/><Link className="button" to="/arquivo">Consultar arquivo integral <ArrowRight size={16}/></Link></main>
}
