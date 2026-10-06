import FacebookIcon from './FacebookIcon.jsx'
import InstagramIcon from './InstagramIcon.jsx'
import DanceGroupBody, { danceGroups, DanceHero, DanceOverview } from './DanceGroups.jsx'
import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import archivedContent from './content/site-content.json'
import { editorialArticles } from './content/editorial-articles.js'
import GreekCourse, { GreekTeacherMosaic } from './GreekCourse.jsx'
import HellenicCalendar from './HellenicCalendar.jsx'
import mediaMap from './content/media-map.json'
import archiveVariants from './content/archive-variants.json'
import ResponsiveImage from './ResponsiveImage.jsx'
import { assetUrl, routeUrl } from './paths.js'

const siteContent = {
  ...archivedContent,
  posts: [...editorialArticles, ...archivedContent.posts],
  categories: archivedContent.categories.map(category => ({ ...category, count: category.count + editorialArticles.filter(post => post.categories.includes(category.id)).length })),
}

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
  'aulas-de-grego-moderno': 'Curso de Grego Moderno da Coletividade Helênica de São Paulo para adultos e crianças, do iniciante ao avançado. Aulas presenciais no Brás e online, com duração de 1h30 cada.',
  'aulas-de-danca': 'Pedilea e Neolea Asteri: grupos de danças gregas para crianças, jovens e adultos, unidos pela convivência e pela preservação da cultura helênica.',
  'aulas-de-bouzouki': 'Conheça o bouzouki e sua presença na cultura grega. As aulas não estão acontecendo no momento.',
  'oficinas-culturais': 'Encontros pontuais para compartilhar os saberes e as tradições da cultura helênica. A programação é divulgada no Instagram @coletividadehelenica.sp.',
}

const lessonImages = {
  'aulas-de-grego-moderno': '/images/aulas-grego-original.webp',
  'aulas-de-danca': '/images/aulas-danca-original.webp',
  'aulas-de-bouzouki': '/images/aulas-bouzouki-original.webp',
  'oficinas-culturais': '/images/oficinas-culturais-original.webp',
}

const lessonStatus = {
  'aulas-de-grego-moderno': ['Curso', 'Consultar turmas'],
  'aulas-de-danca': ['Grupos de dança', 'Grupos ativos'],
  'aulas-de-bouzouki': ['Curso', 'Sem aulas no momento'],
  'oficinas-culturais': ['Oficinas culturais', 'Conforme programação'],
}

const lessonContentOverrides = {
  'aulas-de-danca': `
    <h2>Pedilea — grupo de dança infantil</h2>
    <p><strong>Grupo ativo · Gratuito · Crianças de 5 a 11 anos</strong></p>
    <p>A Pedilea reúne crianças que gostam de dançar e conhecer a cultura grega, descendentes de gregos ou não. Os encontros apresentam danças, suas origens e as tradições das diferentes regiões da Grécia.</p>
    <h3>Horários dos ensaios</h3>
    <p>Sábados, das <strong>12h30 às 13h30</strong>, na Coletividade Helênica de São Paulo: Rua Bresser, 793, Brás.</p>
    <h3>Como participar</h3>
    <p>A participação é gratuita. Aos responsáveis é sugerida a associação à Coletividade; ela não é uma exigência para participar do grupo. Consulte a equipe para combinar a participação e esclarecer dúvidas sobre a associação.</p>
    <h3>A história da Pedilea</h3>
    <p>Criada em 1982, a Pedilea nasceu para aproximar as novas gerações da língua e da cultura gregas por meio da dança, da música e de atividades culturais. Participou de celebrações como a Independência Grega, o Dia do Oxi e a Páscoa.</p>
    <p>Após um período de inatividade, retornou em 2002 com o incentivo do pároco da Igreja Ortodoxa Grega São Pedro e de mães voluntárias. O então diretor da Neolea ensinou as primeiras danças às crianças e preparou uma apresentação no 31º Festival Internacional de Danças Folclóricas do Bunkyo.</p>
    <p>O centro de atividades foi dissolvido em 2005, e o grupo fez uma pausa. A retomada aconteceu em julho de 2006, com a diretoria Nova Genia. Os encontros seguiram até a interrupção pela pandemia em 2020 e recomeçaram em agosto de 2025.</p>
    <h2>Neolea Asteri — grupo de danças folclóricas gregas</h2>
    <p><strong>Grupo ativo · A partir de 12 anos e adultos</strong></p>
    <p>A Neolea Asteri reúne descendentes e filo-helenos para preservar e divulgar a cultura grega. Os ensaios e as apresentações conectam os passos de dança às histórias, aos costumes e aos significados de cada tradição.</p>
    <h3>Horários dos ensaios</h3>
    <p>Sábados, das <strong>14h às 16h30</strong>, na Coletividade Helênica de São Paulo: Rua Bresser, 793, Brás.</p>
    <h3>Acompanhe o grupo</h3>
    <p>Acompanhe a Neolea Asteri no Instagram <a href="https://www.instagram.com/neolea.asteri/">@neolea.asteri</a>.</p>
    <h3>Da Neolea à Neolea Asteri</h3>
    <p>A Neolea foi criada em 1967, originalmente para jovens a partir de 13 anos. Sua trajetória inclui atividades até 2004, uma retomada de 2011 a 2013 e um novo ciclo iniciado em 2022.</p>
    <p>Em 2022, crianças que haviam participado da Pedilea antes da pandemia, agora mais velhas, formaram a Neolea Asteri. O grupo representa a Coletividade em festivais, shows, feiras, noites gregas e Festas das Nações, no Brasil e na América Latina.</p>
    <p>Quando possível, as apresentações contam com a Elliniki Compania ou a Nea Elliniki Compania, que reúne também jovens dançarinos e outros artistas.</p>
    <p><a href="/contato">Conversar com a Coletividade sobre os grupos</a></p>
  `,
  'aulas-de-bouzouki': `
    <h2>Sobre o bouzouki</h2>
    <p>O bouzouki é um instrumento de cordas da família do alaúde e um dos símbolos mais reconhecidos da música grega. Seu nome deriva da palavra turca <em>buzuk</em>, e sua sonoridade atravessa repertórios tradicionais e populares.</p>
    <p>Tanto no continente quanto nas ilhas, a música acompanha celebrações religiosas, casamentos, encontros comunitários e diferentes danças. O bouzouki pode ser ouvido em formações tradicionais e em ritmos como o sirtaki e o hasapiko.</p>
    <p>Mikis Theodorakis, Vasilis Tsitsanis e Manolis Karantinis estão entre os artistas que ajudaram a projetar a força e a identidade desse instrumento.</p>
    <h2>Sem aulas no momento</h2>
    <p>As aulas de bouzouki não estão acontecendo atualmente. Não há uma data de retomada confirmada para divulgação.</p>
    <h2>Informações sobre as aulas</h2>
    <p>Para consultar eventuais novidades, entre em contato com a Coletividade.</p>
    <p><a href="/contato">Consultar a equipe da Coletividade</a></p>
    <figure><img src="/images/aulas-bouzouki-original.webp" alt="Instrumentos musicais na Coletividade Helênica de São Paulo"/></figure>
  `,
  'oficinas-culturais': `
    <h2>Cultura grega para aprender fazendo</h2>
    <p>As oficinas culturais transformam tradições, histórias e saberes em encontros práticos. A programação varia ao longo do ano e aproxima diferentes gerações da comunidade.</p>
    <p>As oficinas são pontuais, sem uma oferta permanente de turmas. As referências abaixo apresentam iniciativas culturais da comunidade; sua presença nesta página não indica inscrições abertas.</p>
    <h3>Cozinhando com Yiayiá</h3>
    <p>Encontros dedicados às receitas, aos ingredientes e às memórias afetivas da culinária grega, compartilhadas entre gerações.</p>
    <h3>Iconografia grega</h3>
    <p>Atividades de introdução à linguagem visual, aos símbolos e às técnicas ligadas à tradição iconográfica grega.</p>
    <h3>Bingo da Liga das Senhoras Gregas</h3>
    <p>Uma atividade de convivência que reúne a comunidade e fortalece as iniciativas culturais e beneficentes da Coletividade.</p>
    <h3>Bazares</h3>
    <p>Programações especiais em datas como Dia das Mães, Páscoa e Natal, com produtos, gastronomia e trabalhos realizados pela comunidade.</p>
    <h2>Consulte a programação</h2>
    <p>A programação das oficinas culturais é divulgada no Instagram oficial da Coletividade, @coletividadehelenica.sp. Acompanhe o perfil para conhecer os encontros anunciados e as informações de cada atividade.</p>
    <p><a href="https://www.instagram.com/coletividadehelenica.sp/">Acompanhar @coletividadehelenica.sp no Instagram</a></p>
  `,
}

const pageContentOverrides = {
  'politica-de-privacidade': `
    <h2>Compromisso com a privacidade</h2>
    <p>A Coletividade Helênica de São Paulo respeita a privacidade de visitantes, associados, estudantes e demais pessoas que entram em contato com a instituição. Não comercializamos dados pessoais.</p>
    <h2>Dados e canais de contato</h2>
    <p>Este site não possui cadastro próprio nem formulário de coleta. Quando você utiliza telefone, e-mail ou WhatsApp, os dados fornecidos são tratados para responder solicitações sobre aulas, eventos, associação e atividades da Coletividade.</p>
    <h2>Cookies e preferências</h2><p>As escolhas de privacidade são armazenadas neste navegador por até 180 dias. Estatísticas de acesso pelo Google Analytics, quando configurado, só são ativadas após sua autorização. Mapas e vídeos externos também dependem da categoria de conteúdos externos. Você pode recusar os opcionais ou rever suas escolhas no botão “Privacidade e cookies”.</p><h2>Serviços de terceiros</h2>
    <p>O site pode incorporar recursos de serviços externos, como Google Maps, YouTube e WhatsApp. Esses serviços podem processar informações técnicas, como endereço IP, características do dispositivo e dados necessários ao funcionamento de seus recursos, conforme suas próprias políticas de privacidade.</p>
    <h2>Compartilhamento e conservação</h2>
    <p>Dados pessoais não são divulgados a outras instituições, exceto quando necessário para atender uma solicitação, cumprir uma obrigação legal ou responder a uma ordem de autoridade competente. As informações são conservadas apenas pelo período necessário às finalidades informadas e às obrigações aplicáveis.</p>
    <h2>Seus direitos</h2>
    <p>Nos termos da Lei Geral de Proteção de Dados Pessoais, você pode solicitar confirmação de tratamento, acesso, correção, atualização ou eliminação de dados, quando aplicável.</p>
    <h2>Fale conosco</h2>
    <p>Para dúvidas ou solicitações relacionadas à privacidade, escreva para <a href="mailto:coletividade@helenica.com.br">coletividade@helenica.com.br</a>.</p>
    <p><small>Última atualização: julho de 2026.</small></p>
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
const hiddenArchiveSlugs = new Set(['home', 'sample-page', 'temp'])
const publicArchivePages = siteContent.pages.filter(page => !hiddenArchiveSlugs.has(page.slug))

function mediaUrl(value = '') {
  if (!value) return value
  if (value.startsWith('/')) return value
  const normalized = value
    .replace(/^http:\/\/(?:www\.)?helenica\.com\.br/i, 'https://www.helenica.com.br')
    .replace(/^https:\/\/helenica\.com\.br/i, 'https://www.helenica.com.br')
  return mediaMap[normalized] || value
}

const consolidatedFallbacks = {
  'nossa-historia': 'sobre-a-chsp',
  'missao-visao-valores': 'sobre-a-chsp',
  'conselho-deliberativo-e-diretoria-executiva': 'conselheiros',
}

const editorialReplacements = [
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
  if (page.slug === 'sobre-a-chsp') return '/coletividade'
  if (lessonSlugs.includes(page.slug)) return `/cursos/${page.slug === 'aulas-de-grego-moderno' ? 'grego-moderno' : page.slug}`
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
      const smallImage = availableWidths.includes(640) ? preservedSource.replace(/\.webp$/, '-640.webp') : preservedSource
      const mediumImage = availableWidths.includes(960) ? preservedSource.replace(/\.webp$/, '-960.webp') : smallImage
      smallSource.setAttribute('media', '(max-width: 560px)')
      smallSource.setAttribute('srcset', assetUrl(smallImage))
      mediumSource.setAttribute('media', '(max-width: 1000px)')
      mediumSource.setAttribute('srcset', assetUrl(mediumImage))
      image.replaceWith(picture)
      picture.append(smallSource, mediumSource, image)
    }
  })
  element.querySelectorAll('iframe').forEach(frame => {
    if (!frame.hasAttribute('title')) frame.setAttribute('title', 'Conteúdo incorporado')
    frame.setAttribute('loading', 'lazy')
    if (frame.hasAttribute('src')) { frame.setAttribute('data-consent-src', frame.getAttribute('src')); frame.removeAttribute('src'); }
  })
  element.querySelectorAll('video').forEach(video => {
    const preservedMedia = mediaUrl(video.getAttribute('src'))
    if (preservedMedia.endsWith('.webp')) {
      const figure = document.createElement('figure')
      const image = document.createElement('img')
      const caption = document.createElement('figcaption')
      image.setAttribute('src', assetUrl(preservedMedia))
      image.setAttribute('alt', 'Registro visual do acervo histórico da Coletividade Helênica de São Paulo')
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
    const preservedMedia = mediaUrl(href)
    if (preservedMedia !== href && preservedMedia.startsWith('/images/archive/')) {
      anchor.setAttribute('href', assetUrl(preservedMedia))
      return
    }
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

function ContentHero({ eyebrow, title, introduction, image, imageAlt = '', imagePosition, imageIllustration, motifTheme, visual, action, seoTitle }) {
  const location = useLocation()
  const theme = motifTheme || (location.pathname.startsWith('/cursos') ? 'aulas' : location.pathname.startsWith('/agenda') ? 'agenda' : location.pathname.startsWith('/cultura') ? 'cultura' : 'coletividade')
  useEffect(() => {
    const pageTitle = seoTitle || `${title} | Coletividade Helênica de São Paulo`
    const description = introduction || 'Conheça a Coletividade Helênica de São Paulo, sua história, aulas e atividades culturais.'
    document.title = pageTitle
    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        const [name, key] = attribute.split('=')
        element.setAttribute(name, key)
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    }
    setMeta('meta[name="description"]', 'name=description', description)
    setMeta('meta[property="og:title"]', 'property=og:title', pageTitle)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
  }, [title, introduction, seoTitle])
  return <header className={`content-hero content-hero--themed content-hero--${theme}`}>
    <div>
      <p className="content-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {introduction && <p>{introduction}</p>}
      {action && <a className={`button content-hero__action${action.social ? ' button--instagram' : ''}`} href={action.href}>{action.social ? <InstagramIcon size={20} /> : <MessageCircle size={18} />}<span>{action.label}</span><ArrowRight size={18} /></a>}
    </div>
    {visual || <figure className={image ? '' : 'content-hero__art'}>
      {image && <ResponsiveImage src={mediaUrl(image)} variantWidths={archiveVariants[mediaUrl(image)]} alt={imageAlt} style={{ objectPosition: imagePosition }} />}
      {imageIllustration && <figcaption className="editorial-image-caption">Ilustração editorial</figcaption>}
    </figure>}
  </header>
}

function LegacyHtml({ html }) {
  return <div className="wp-content" dangerouslySetInnerHTML={{ __html: rewriteLegacyLinks(html) }} />
}

function PageNavigation({ slugs, basePath, labels = {} }) {
  return <aside className="page-navigation">
    <p>Nesta seção</p>
    {slugs.map(slug => pageBySlug[slug]).filter(Boolean).map(page => (
      <Link key={page.id} to={lessonSlugs.includes(page.slug) ? pathForPage(page) : `${basePath}/${page.slug}`}>{page.slug === 'aulas-de-grego-moderno' ? 'Curso de Grego Moderno' : labels[page.slug] || decode(page.title)}<ArrowRight size={15}/></Link>
    ))}
  </aside>
}

function FullPage({ page, eyebrow = 'Coletividade Helênica de São Paulo', navigation }) {
  if (!page) return <NotFound />
  const fallback = pageBySlug[consolidatedFallbacks[page.slug]]
  const originalIsEmpty = !page.content.trim()
  const displayedContent = pageContentOverrides[page.slug] || (originalIsEmpty && fallback ? fallback.content : page.content)
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
  </main>
}

export function LessonsIndex() {
  const groups = [
    { title: 'Cursos', cards: [
      { title: 'Curso de Grego Moderno', slug: 'aulas-de-grego-moderno', action: 'Conhecer o curso' },
      { title: 'Bouzouki', slug: 'aulas-de-bouzouki', action: 'Conhecer a atividade' },
    ] },
    { title: 'Grupos de dança', cards: [
      { title: 'Pedilea', href: '/cursos/pedilea', slug: 'aulas-de-danca', status: ['Grupo de dança infantil', 'Grupo ativo', 'Gratuito'], description: 'Crianças de 5 a 11 anos. Ensaios aos sábados, das 12h30 às 13h30, na sede da Coletividade.', action: 'Conhecer o grupo' },
      { title: 'Neolea Asteri', href: '/cursos/neolea-asteri', slug: 'aulas-de-danca', status: ['Grupo de dança', 'Grupo ativo'], description: 'Conheça a trajetória do grupo de danças folclóricas gregas e acompanhe suas novidades no Instagram @neolea.asteri.', action: 'Conhecer o grupo' },
    ] },
    { title: 'Oficinas culturais', cards: [
      { title: 'Encontros e oficinas culturais', slug: 'oficinas-culturais', action: 'Consultar informações' },
    ] },
  ]
  return <main className="content-page content-page--themed content-page--aulas">
    <Breadcrumbs items={[{ label: 'Cursos e atividades' }]} />
    <ContentHero eyebrow="Cursos e atividades" title="Aprenda e viva a cultura grega" introduction="Cursos de língua e música, grupos de dança e encontros culturais: descubra as formas de participar e confira a situação de cada atividade." visual={<figure className="activities-mosaic" aria-label="Língua, dança, oficinas e música na Coletividade">
      {[
        ['neolea', '/images/grupos-danca/neolea-danca.jpeg', 'Apresentação de danças gregas da Neolea Asteri'],
        ['grego', '/images/aulas-grego-turma-recorte-original.webp', 'Turma do curso de Grego Moderno em uma aula online'],
        ['oficinas', '/images/oficinas-culturais-original.webp', 'Participantes de uma oficina cultural na Coletividade'],
        ['pedilea', '/images/grupos-danca/pedilea-grupo.jpeg', 'Integrantes da Pedilea e seus instrutores'],
        ['bouzouki', '/images/archive/28c0d6ffd7-kostakis2-1024x473.webp', 'Registro histórico de apresentação musical com bouzouki na Coletividade'],
      ].map(([key, src, alt]) => <span key={key} className={`activities-mosaic__${key}`}><img src={assetUrl(src)} alt={alt} decoding="async" /></span>)}
    </figure>} motifTheme="aulas" seoTitle="Cursos e atividades | Coletividade Helênica de São Paulo" />
    {groups.map(group => <section className="activity-directory" key={group.title}>
      <h2>{group.title}</h2>
      <div className="directory-grid">
        {group.cards.map(card => <Link className="directory-card" to={card.href || pathForPage(pageBySlug[card.slug])} key={card.title}>
          <div className="activity-tags">{(card.status || lessonStatus[card.slug]).map(label => <span key={label}>{label}</span>)}</div>
          <h3>{card.title}</h3><p>{card.description || courseIntroductions[card.slug]}</p><b>{card.action} <ArrowRight size={16}/></b>
        </Link>)}
      </div>
    </section>)}
  </main>
}

export function LessonPage() {
  const { slug: routeSlug } = useParams()
  const location = useLocation()
  const slug = routeSlug === 'grego-moderno' ? 'aulas-de-grego-moderno' : routeSlug
  if (danceGroups[slug]) return <DanceGroupPage slug={slug} />
  const page = pageBySlug[slug]
  if (!page || !lessonSlugs.includes(slug)) return <NotFound />
  if (location.pathname !== pathForPage(page)) return <Navigate replace to={`${pathForPage(page)}${location.search}${location.hash}`} />
  const title = slug === 'aulas-de-grego-moderno' ? 'Curso de Grego Moderno' : slug === 'aulas-de-danca' ? 'Grupos de Danças Gregas' : decode(page.title)
  return <main className={`content-page${slug === 'aulas-de-grego-moderno' ? ' content-page--greek' : ''}`}>
    <Breadcrumbs items={[{ label: 'Cursos e atividades', to: '/cursos' }, { label: title }]} />
    <ContentHero eyebrow={lessonStatus[slug][0]} title={title} seoTitle={slug === 'aulas-de-grego-moderno' ? 'Curso de Grego Moderno em São Paulo e online | CHSP' : undefined} introduction={courseIntroductions[slug]} image={lessonImages[slug]} visual={slug === 'aulas-de-grego-moderno' ? <GreekTeacherMosaic /> : slug === 'aulas-de-danca' ? <DanceHero group={danceGroups['neolea-asteri']} /> : undefined} action={slug === 'aulas-de-grego-moderno' ? { href: 'https://wa.link/ryey8t', label: 'Consultar vagas e valores' } : slug === 'oficinas-culturais' ? { href: 'https://www.instagram.com/coletividadehelenica.sp/', label: 'Acompanhar no Instagram', social: true } : undefined} />
    <div className="activity-tags activity-tags--detail">{lessonStatus[slug].slice(1).map(label => <span key={label}>{label}</span>)}</div>
    {slug === 'aulas-de-grego-moderno' ? <GreekCourse /> : slug === 'aulas-de-danca' ? <DanceOverview /> : <div className="content-layout">
      <article><LegacyHtml html={lessonContentOverrides[slug] || page.content}/></article>
      <PageNavigation slugs={lessonSlugs} basePath="/cursos" labels={{ 'aulas-de-danca': 'Grupos de Danças Gregas' }} />
    </div>}
  </main>
}

function DanceGroupPage({ slug }) {
  const group = danceGroups[slug]
  const source = lessonContentOverrides['aulas-de-danca']
  const history = slug === 'pedilea'
    ? source.split('<h3>A história da Pedilea</h3>')[1].split('<h2>Neolea Asteri')[0]
    : source.split('<h3>Da Neolea à Neolea Asteri</h3>')[1].split('<p><a href=')[0]
  return <main className="content-page content-page--greek">
    <Breadcrumbs items={[{ label: 'Cursos e atividades', to: '/cursos' }, { label: 'Grupos de dança', to: '/cursos/aulas-de-danca' }, { label: group.name }]} />
    <ContentHero eyebrow={group.category} title={group.name} introduction={group.intro} visual={<DanceHero group={group}/>} seoTitle={`${group.name} — grupo de danças gregas em São Paulo | CHSP`} action={slug === 'pedilea' ? { href: 'https://wa.link/ryey8t', label: 'Como participar' } : { href: group.socialUrl, label: 'Acompanhar no Instagram', social: true }} />
    <div className="activity-tags activity-tags--detail"><span>Grupo ativo</span>{slug === 'pedilea' && <span>Gratuito</span>}</div>
    <DanceGroupBody slug={slug} history={<LegacyHtml html={history}/>} />
  </main>
}

const institutionVisuals = {
  'sobre-a-chsp': ['/images/contato-sede-original.webp', 'Sede da Coletividade Helênica de São Paulo'],
  'nossa-historia': ['/images/primeira-diretoria-chsp.webp', 'Primeira diretoria da Coletividade, em 1937'],
  'missao-visao-valores': ['/images/grupos-danca/pedilea-grupo.jpeg', 'Integrantes e instrutores da Pedilea'],
  'conselho-deliberativo-e-diretoria-executiva': ['/images/contato-sede-original.webp', 'Sede da Coletividade'],
  'lista-de-conselheiros': ['/images/primeira-diretoria-chsp.webp', 'Registro histórico da primeira diretoria'],
  'um-pouco-mais-sobre-a-grecia': ['/images/archive/e3282cda77-grecia.webp', 'Paisagem da Grécia'],
}
const institutionDescriptions = {
  'sobre-a-chsp': 'A casa da comunidade helênica: conheça nossa origem e atuação em São Paulo.',
  'nossa-historia': 'Da primeira diretoria às gerações que mantêm a cultura viva.',
  'missao-visao-valores': 'Os princípios que orientam a vida e o trabalho da nossa comunidade.',
  'conselho-deliberativo-e-diretoria-executiva': 'Conheça a estrutura administrativa e os registros publicados pela instituição.',
  'lista-de-conselheiros': 'Pessoas que participaram da construção e da continuidade da Coletividade.',
  'um-pouco-mais-sobre-a-grecia': 'Território, história e símbolos que nos conectam às nossas raízes.',
}
function InstitutionChapters({ html }) {
  const chapters = html.split(/(?=<h2(?:\s|>))/i).filter(part => stripHtml(part).trim() || /<img/i.test(part))
  return <div className="institution-chapters">{chapters.map((chapter, index) => <section className="institution-chapter" key={index}><LegacyHtml html={chapter}/></section>)}</div>
}
function InstitutionExplore() {
  return <section className="institution-explore"><div><p className="content-kicker">A cultura continua</p><h2>Conheça a comunidade em movimento.</h2></div><div><p>Encontre cursos, grupos de dança, encontros culturais e as histórias que compartilhamos.</p><Link className="button" to="/cursos">Cursos e atividades <ArrowRight size={18}/></Link><Link className="text-link" to="/agenda">Agenda e eventos <ArrowRight size={16}/></Link></div></section>
}

export function InstitutionIndex() {
  return <main className="content-page content-page--themed content-page--coletividade">
    <Breadcrumbs items={[{ label: 'A Coletividade' }]} />
    <ContentHero eyebrow="A Coletividade" title="Uma história grega em São Paulo" introduction="Conheça a origem, a missão, as pessoas e os valores que sustentam a Coletividade Helênica de São Paulo." visual={<figure className="institution-mosaic"><img src={assetUrl('/images/primeira-diretoria-chsp.webp')} alt="Primeira diretoria da Coletividade"/><img src={assetUrl('/images/grupos-danca/neolea-danca.jpeg')} alt="Apresentação da Neolea Asteri"/><img src={assetUrl('/images/grupos-danca/pedilea-grupo.jpeg')} alt="Integrantes e instrutores da Pedilea"/></figure>} motifTheme="coletividade" />
    <section className="institution-summary institution-summary--intro">
      <p className="content-kicker">Quem somos</p>
      <div><h2>A casa da comunidade helênica em São Paulo.</h2><div><p>Desde 1937, a Coletividade Helênica de São Paulo reúne gregos, descendentes, filo-helenos e todas as pessoas interessadas na preservação e na promoção da cultura grega.</p><p>Na sede da Rua Bresser, no Brás, língua, dança, música, fé, gastronomia e memória fazem parte da vida da comunidade. Cursos, grupos de dança, encontros e celebrações aproximam gerações e mantêm essa cultura viva.</p><Link className="text-link" to="/cursos">Conheça nossos cursos e atividades <ArrowRight size={16}/></Link></div></div>
    </section>
    <section className="institution-directory" aria-label="Conheça a Coletividade">
      <div className="collection-heading"><h2>Nossa casa, nossas histórias</h2><span>Explore a Coletividade</span></div>
      <div className="directory-grid">{institutionNavSlugs.map(slug => <Link className="directory-card institution-card" to={`/coletividade/${slug}`} key={slug}><img src={assetUrl(institutionVisuals[slug][0])} alt={institutionVisuals[slug][1]} loading="lazy"/><div><span className="content-kicker">A Coletividade</span><h2>{institutionLabels[slug]}</h2><p>{institutionDescriptions[slug]}</p><b>Conhecer <ArrowRight size={16}/></b></div></Link>)}</div>
    </section>

  </main>
}

function InstitutionSectionPage({ title, introduction, image, html, children }) {
  const { slug } = useParams()
  const [sectionImage, sectionAlt] = institutionVisuals[slug] || institutionVisuals['sobre-a-chsp']
  return <main className="content-page content-page--themed content-page--coletividade institution-detail">
    <Breadcrumbs items={[{ label: 'A Coletividade', to: '/coletividade' }, { label: title }]} />
    <ContentHero eyebrow="A Coletividade Helênica de São Paulo" title={title} introduction={introduction} image={image || sectionImage} imageAlt={sectionAlt} motifTheme="coletividade" />
    <div className="content-layout">
      <article>
        {children}
        {html && <InstitutionChapters html={html} />}
      </article>
      <PageNavigation slugs={institutionNavSlugs} basePath="/coletividade" labels={institutionLabels} />
    </div>
    <InstitutionExplore />
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
  if (slug === 'sobre-a-chsp') return <Navigate replace to="/coletividade" />
  if (slug === 'conselheiros') return <Navigate replace to="/coletividade/lista-de-conselheiros" />
  const source = pageBySlug['sobre-a-chsp']
  if (slug === 'nossa-historia') return <InstitutionSectionPage
    title="Nossa história"
    introduction="Da fundação em 1937 ao trabalho educacional e cultural que atravessa gerações em São Paulo."
    image="/images/primeira-diretoria-chsp.webp"
    html={extractLegacySection(source.content, /^Nossa História$/i, /^No que acreditamos$/i)}
  />
  if (slug === 'missao-visao-valores') return <InstitutionSectionPage
    title="Missão, visão e valores"
    introduction="Os princípios que orientam a atuação cívica, religiosa, filantrópica, beneficente, cultural e recreativa da Coletividade."
    html={extractLegacySection(source.content, /^No que acreditamos$/i, /^diretoria executiva$/i).replace(/<h3>/g, '<h2>').replace(/<\/h3>/g, '</h2>')}
  />
  if (slug === 'conselho-deliberativo-e-diretoria-executiva') return <InstitutionSectionPage
    title="Diretoria e conselhos"
    introduction="Conheça a estrutura administrativa publicada pela Coletividade e acesse os registros de quem ajudou a conduzir a instituição."
    html={extractLegacySection(source.content, /^diretoria executiva$/i, /^Conselheiros de 2020 a 2024$/i, true)}
  ><GovernanceLinks /></InstitutionSectionPage>
  if (slug === 'conselheiros' || slug === 'lista-de-conselheiros') {
    const page = pageBySlug['lista-de-conselheiros']
    return <InstitutionSectionPage
      title="Conselheiros e ex-presidentes"
      introduction="Registros das pessoas que integraram os conselhos e presidiram os órgãos da Coletividade Helênica de São Paulo."
      image="/images/primeira-diretoria-chsp.webp"
      html={page.content}
    ><GovernanceLinks /></InstitutionSectionPage>
  }
  if (slug === 'um-pouco-mais-sobre-a-grecia') return <InstitutionSectionPage
    title="Um pouco mais sobre a Grécia"
    introduction="Informações essenciais para conhecer o território, a história e alguns dos símbolos da cultura grega."
    html={extractLegacySection(source.content, /^Um pouco mais sobre$/i, null, true)}
  />
  return <InstitutionSectionPage title="Sobre a Coletividade" introduction={institutionDescriptions[slug]} html={pageBySlug[slug].content.replace(/^<h3>[\s\S]*?<\/h1>/, '')} />
}

function PostCard({ post }) {
  const category = categoryById[post.categories[0]]
  const CardLink = post.editorial ? 'a' : Link
  return <CardLink className="post-card" {...(post.editorial ? { href: assetUrl(`/cultura/${post.slug}/`) } : { to: `/cultura/${post.slug}` })}>
    {post.featuredMedia?.sourceUrl && <ResponsiveImage src={mediaUrl(post.featuredMedia.sourceUrl)} variantWidths={archiveVariants[mediaUrl(post.featuredMedia.sourceUrl)]} style={{ objectPosition: post.featuredMedia.position }} alt={post.featuredMedia.alt || ''} loading="lazy" decoding="async" />}
    <div><span>{decode(category?.name || 'Cultura')}</span><h2>{decode(post.title)}</h2><p>{stripHtml(post.excerpt).slice(0, 180)}</p><b>Ler conteúdo completo <ArrowRight size={15}/></b></div>
  </CardLink>
}

export function CultureIndex() {
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('all')
  const [visibleCount, setVisibleCount] = useState(12)
  const categories = siteContent.categories.filter(category => category.count > 0 && category.slug !== 'uncategorized')
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
  const filteredPosts = siteContent.posts.filter(post => {
    const matchesCategory = categoryId === 'all' || post.categories.includes(Number(categoryId))
    const searchable = `${decode(post.title)} ${stripHtml(post.excerpt)} ${stripHtml(post.content)}`.toLocaleLowerCase('pt-BR')
    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
  })
  const updateQuery = event => {
    setQuery(event.target.value)
    setVisibleCount(12)
  }
  const updateCategory = event => {
    setCategoryId(event.target.value)
    setVisibleCount(12)
  }
  return <main className="content-page content-page--themed content-page--cultura">
    <Breadcrumbs items={[{ label: 'Cultura e memória' }]} />
    <ContentHero eyebrow="Cultura e memória" title="Grécia para ler, ouvir, provar e lembrar" introduction="Explore guias sobre a cultura grega e publicações que preservam a história da nossa comunidade." image="/images/exposicao-cultural-original.webp" motifTheme="cultura" />
    <section className="archive-tools" aria-label="Pesquisar o acervo cultural">
      <label><span>Buscar no acervo</span><input type="search" value={query} onChange={updateQuery} placeholder="Digite um tema, lugar ou título" /></label>
      <label><span>Categoria</span><select value={categoryId} onChange={updateCategory}><option value="all">Todas as categorias</option>{categories.map(category => <option value={category.id} key={category.id}>{decode(category.name)} ({category.count})</option>)}</select></label>
    </section>
    <div className="collection-heading"><h2>Publicações</h2><span>{filteredPosts.length} resultados</span></div>
    {filteredPosts.length
      ? <><section className="posts-grid">{filteredPosts.slice(0, visibleCount).map(post => <PostCard post={post} key={post.id}/>)}</section>{visibleCount < filteredPosts.length && <div className="load-more"><button type="button" className="button" onClick={() => setVisibleCount(count => count + 12)}>Carregar mais publicações</button></div>}</>
      : <p className="empty-results">Nenhuma publicação corresponde aos filtros selecionados.</p>}
    <nav className="category-links" aria-label="Abrir páginas das categorias">
      {categories.map(category => <Link to={`/cultura/categoria/${category.slug}`} key={category.id}>{decode(category.name)} <span>{category.count}</span></Link>)}
    </nav>
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
  </main>
}

export function PostPage() {
  const { slug } = useParams()
  const post = postBySlug[slug]
  useEffect(() => {
    if (!post?.editorial) return
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = new URL(assetUrl(`/cultura/${post.slug}/`), window.location.origin).href
    document.head.appendChild(canonical)
    return () => canonical.remove()
  }, [post])
  if (!post) return <NotFound />
  const category = categoryById[post.categories[0]]
  return <main className="content-page">
    {post.editorial && <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.excerpt, datePublished: post.date, dateModified: post.date, inLanguage: 'pt-BR' })}</script>}
    <Breadcrumbs items={[{ label: 'Cultura e memória', to: '/cultura' }, { label: decode(post.title) }]} />
    <ContentHero eyebrow={decode(category?.name || 'Cultura')} title={decode(post.title)} introduction={stripHtml(post.excerpt)} image={post.featuredMedia?.sourceUrl} imageAlt={post.featuredMedia?.alt} imagePosition={post.featuredMedia?.position} imageIllustration={post.featuredMedia?.illustration} />
    <div className="content-layout"><article><LegacyHtml html={post.content}/>{post.sources?.length > 0 && <details className="wp-content editorial-sources"><summary>Fontes e referências</summary><ul>{post.sources.map(([href,label]) => <li key={href}><a href={href.startsWith('/') ? routeUrl(href) : href} target={href.startsWith('/') ? undefined : '_blank'} rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}>{label}</a></li>)}</ul></details>}{post.related?.length > 0 && <nav className="wp-content" aria-label="Publicações relacionadas"><h2>Continue a leitura</h2><ul>{post.related.map(slug => postBySlug[slug]).filter(Boolean).map(item => <li key={item.slug}><a href={item.editorial ? assetUrl(`/cultura/${item.slug}/`) : routeUrl(`/cultura/${item.slug}`)}>{decode(item.title)}</a></li>)}</ul></nav>}{post.cta && <Link className="button" to={post.cta.href}>{post.cta.label} <ArrowRight size={16}/></Link>}</article><aside className="page-navigation"><p>Informações</p><span>Publicado em {new Intl.DateTimeFormat('pt-BR').format(new Date(post.date))}</span>{post.categories.map(id => categoryById[id]).filter(Boolean).map(item => <Link to={`/cultura/categoria/${item.slug}`} key={item.id}>{decode(item.name)}<ArrowRight size={15}/></Link>)}{post.cta && <Link to={post.cta.href}>{post.cta.label}<ArrowRight size={16}/></Link>}</aside></div>
  </main>
}

export function AgendaPage() {
  const events = siteContent.posts.filter(post => post.categories.includes(13))
  return <main className="content-page content-page--themed content-page--agenda">
    <Breadcrumbs items={[{ label: 'Agenda e eventos' }]} />
    <ContentHero eyebrow="Agenda e eventos" title="Encontros que celebram nossa cultura" seoTitle="Agenda e eventos | Coletividade Helênica de São Paulo" introduction="Acompanhe a programação da comunidade, explore as datas do calendário grego e ortodoxo e relembre nossos encontros." image="/images/evento-comunidade-original.webp" motifTheme="agenda" />
    <nav className="section-shortcuts" aria-label="Explore a agenda">
      <button type="button" onClick={() => document.getElementById('programacao')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><span>01 · Comunidade</span><strong>Próximos eventos</strong><ArrowRight size={18}/></button>
      <button type="button" onClick={() => document.getElementById('calendario')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><span>02 · Tradições</span><strong>Calendário grego</strong><ArrowRight size={18}/></button>
      <button type="button" onClick={() => document.getElementById('eventos-anteriores')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><span>03 · Memória</span><strong>Eventos anteriores</strong><ArrowRight size={18}/></button>
    </nav>
    <section className="agenda-status" id="programacao">
      <p className="content-kicker">Próxima programação</p>
      <h2>Novas datas serão divulgadas em breve.</h2>
      <p>Para confirmar festas, encontros e atividades, fale com a equipe da Coletividade. Enquanto isso, você pode conhecer os eventos que marcaram nossa história.</p>
      <Link className="button" to="/contato">Consultar a Coletividade <ArrowRight size={16}/></Link>
    </section>
    <div id="calendario"><HellenicCalendar /></div>
    <div className="collection-heading" id="eventos-anteriores"><h2>Eventos anteriores</h2><span>{events.length} registros preservados</span></div>
    <section className="posts-grid">{events.map(post => <PostCard post={post} key={post.id}/>)}</section>
  </main>
}

export function ArchivePage() {
  return <main className="content-page">
    <Breadcrumbs items={[{ label: 'Arquivo integral' }]} />
    <ContentHero eyebrow="Arquivo histórico" title="Conteúdo preservado da Coletividade" introduction={`${publicArchivePages.length} páginas institucionais e ${siteContent.posts.length} publicações históricas acessíveis.`} />
    <section className="archive-columns">
      <div><h2>Páginas</h2>{publicArchivePages.map(page => <Link to={pathForPage(page)} key={page.id}><span>{decode(page.title)}</span><small>{page.slug}</small></Link>)}</div>
      <div><h2>Publicações</h2>{siteContent.posts.map(post => <Link to={`/cultura/${post.slug}`} key={post.id}><span>{decode(post.title)}</span><small>{new Intl.DateTimeFormat('pt-BR').format(new Date(post.date))}</small></Link>)}</div>
    </section>
  </main>
}

export function GenericPage({ fixedSlug, eyebrow = 'Arquivo do site anterior' }) {
  const params = useParams()
  const slug = fixedSlug || params.slug
  const page = pageBySlug[slug]
  if (!page || (!fixedSlug && hiddenArchiveSlugs.has(slug))) return <NotFound />
  if (!fixedSlug) {
    const canonicalPath = pathForPage(page)
    if (canonicalPath !== `/paginas/${slug}`) return <Navigate replace to={canonicalPath} />
  }
  return <FullPage page={page} eyebrow={eyebrow} />
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
        <a href="https://www.instagram.com/coletividadehelenica.sp/" target="_blank" rel="noreferrer"><InstagramIcon/><span><small>Instagram oficial</small><strong>@coletividadehelenica.sp</strong></span></a>
        <a href="https://www.facebook.com/coletividadehelenicasp" target="_blank" rel="noreferrer"><FacebookIcon/><span><small>Facebook oficial</small><strong>Coletividade Helênica de São Paulo</strong></span></a>
        <div><MapPin/><span><small>Endereço</small><strong>Rua Bresser, 793</strong><em>Brás, São Paulo, SP</em></span></div>
      </div>
      <aside className="contact-return"><MessageCircle/><p className="content-kicker">Prefere conversar pelo WhatsApp?</p><h2>Fale com nossa equipe.</h2><p>Envie uma mensagem e conte brevemente como podemos ajudar.</p><a className="button button--white" href="https://wa.link/ryey8t" target="_blank" rel="noreferrer">Conversar pelo WhatsApp <ArrowRight size={16}/></a></aside>
    </section>
    <div className="contact-map"><iframe title="Mapa da sede da Coletividade Helênica de São Paulo" data-consent-src="https://maps.google.com/maps?q=Rua%20Bresser%2C%20793&amp;t=m&amp;z=17&amp;output=embed&amp;iwloc=near" loading="lazy"/></div>
  </main>
}

export function NotFound() {
  return <main className="content-page not-found"><ContentHero eyebrow="Conteúdo" title="Página não encontrada" introduction="O endereço pode ter mudado durante a reorganização do site."/><Link className="button" to="/arquivo">Consultar arquivo integral <ArrowRight size={16}/></Link></main>
}
