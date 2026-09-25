import fs from 'node:fs/promises'
import path from 'node:path'
import { editorialArticles } from '../src/content/editorial-articles.js'

const archived = JSON.parse(await fs.readFile('src/content/site-content.json', 'utf8'))
const bySlug = Object.fromEntries([...archived.posts, ...editorialArticles].map(p => [p.slug, p]))
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/')
const hash = process.env.VITE_ROUTER_MODE === 'hash'
const origin = (process.env.SITE_ORIGIN || 'https://th3unforg1ven.github.io').replace(/\/$/, '')
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const asset = p => `${base}${p.replace(/^\//,'')}`
const articlePath = slug => asset(`cultura/${slug}/`)
const appPath = p => hash ? `${base}#${p}` : asset(p)
const href = p => {
  if (!p.startsWith('/')) return p
  const slug = p.replace(/\/$/,'').split('/').pop()
  return bySlug[slug]?.editorial ? articlePath(slug) : appPath(p)
}
const shell = await fs.readFile('dist/index.html','utf8')
const styles = shell.match(/<link[^>]+rel="stylesheet"[^>]*>/g)?.join('\n') || ''
const nav = `<header class="editorial-header"><a href="${appPath('/')}"><img src="${asset('images/chsp-logo-256.png')}" alt="" width="52" height="52">Coletividade Helênica de São Paulo</a><nav aria-label="Navegação principal"><a href="${appPath('/coletividade')}">A Coletividade</a><a href="${asset('publicacoes/')}">Publicações</a><a href="${appPath('/cursos')}">Cursos</a><a href="${appPath('/agenda')}">Agenda</a><a href="${appPath('/contato')}">Contato</a></nav></header>`
const footer = `<footer class="editorial-footer"><strong>Coletividade Helênica de São Paulo</strong><p>Rua Bresser, 793, Brás · São Paulo, SP</p><a href="${appPath('/cultura')}">Explore todo o acervo cultural</a> · <a href="${appPath('/contato')}">Fale conosco</a></footer>`
const css = `<style>.editorial-header{display:flex;justify-content:space-between;align-items:center;gap:24px;padding:24px 5vw;background:white}.editorial-header>a{display:flex;align-items:center;gap:12px;font-weight:600;max-width:360px}.editorial-header nav{display:flex;flex-wrap:wrap;gap:20px;font-size:.85rem}.editorial-footer{padding:40px 5vw;background:var(--blue-900);color:white}.editorial-footer a{text-decoration:underline}.editorial-meta{font-size:.85rem;color:var(--muted);margin-bottom:30px}.editorial-toc{margin:28px 0;padding:24px;background:white}.editorial-toc a{line-height:1.7}.editorial-toc ol{padding-left:22px}.editorial-static .wp-content table{max-width:100%}.editorial-static .wp-content h2{scroll-margin-top:20px}.editorial-static .content-layout{grid-template-columns:minmax(0,850px);justify-content:center}.editorial-static .content-hero h1{font-size:clamp(2.4rem,4.5vw,4.8rem)}@media(max-width:800px){.editorial-header{align-items:flex-start;flex-direction:column}.editorial-header nav{gap:15px}.editorial-header>a{font-size:.9rem}.editorial-static .content-hero figure{min-height:260px}.editorial-static .content-layout{gap:24px}}</style>`
function page(title, description, url, body, schema, image) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)} | CHSP</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(url)}"><meta property="og:type" content="${schema?.['@type']==='BlogPosting'?'article':'website'}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(url)}">${image?`<meta property="og:image" content="${origin}${asset(image)}">`:''}<meta name="twitter:card" content="summary_large_image">${styles}${css}<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script></head><body><a class="skip-link" href="#main-content">Pular para o conteúdo</a>${nav}${body}${footer}</body></html>`
}
const urls = []
for (const post of editorialArticles) {
  const url = origin + articlePath(post.slug)
  const headings = []
  let content = post.content.replace(/<h2>(.*?)<\/h2>/g, (_, title) => {
    const id = `secao-${headings.length+1}`
    headings.push({id,title})
    return `<h2 id="${id}">${title}</h2>`
  }).replace(/href="([^"]+)"/g, (_,target)=>`href="${esc(href(target))}"`)
  if(post.sources?.length) content += `<h2>Fontes e leituras</h2><ul>${post.sources.map(([target,label])=>`<li><a href="${esc(href(target))}">${esc(label)}</a></li>`).join('')}</ul>`
  const related = (post.related||[]).map(slug=>bySlug[slug]).filter(Boolean)
  if(related.length) content += `<nav aria-label="Publicações relacionadas"><h2>Continue a leitura</h2><ul>${related.map(p=>`<li><a href="${href(`/cultura/${p.slug}`)}">${esc(p.title)}</a></li>`).join('')}</ul></nav>`
  const minutes = Math.max(1,Math.ceil(post.content.replace(/<[^>]*>/g,' ').split(/\s+/).length/200))
  const body = `<main id="main-content" class="content-page editorial-static"><nav class="breadcrumbs" aria-label="Navegação estrutural"><a href="${appPath('/')}">Início</a><span>/ <a href="${asset('publicacoes/')}">Publicações</a></span></nav><header class="content-hero"><div><p class="content-kicker">Cultura e memória</p><h1>${esc(post.title)}</h1><p>${esc(post.excerpt)}</p></div><figure><img src="${asset(post.featuredMedia.sourceUrl)}" alt="Registro do acervo da Coletividade Helênica" width="900" height="600"></figure></header><div class="content-layout"><article><p class="editorial-meta">Publicado em ${new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo'}).format(new Date(post.date))} · Leitura de ${minutes} min</p><nav class="editorial-toc" aria-label="Neste artigo"><strong>Neste artigo</strong><ol>${headings.map(h=>`<li><a href="#${h.id}">${h.title}</a></li>`).join('')}</ol></nav><div class="wp-content">${content}</div>${post.cta?`<a class="button" href="${href(post.cta.href)}">${esc(post.cta.label)}</a>`:''}</article></div></main>`
  const schema = {'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.excerpt,datePublished:post.date,dateModified:post.date,inLanguage:'pt-BR',image:[origin+asset(post.featuredMedia.sourceUrl)],mainEntityOfPage:url,publisher:{'@type':'Organization',name:'Coletividade Helênica de São Paulo',url:origin+base}}
  const dir = path.join('dist','cultura',post.slug)
  await fs.mkdir(dir,{recursive:true})
  await fs.writeFile(path.join(dir,'index.html'),page(post.title,post.excerpt,url,body,schema,post.featuredMedia.sourceUrl))
  urls.push(url)
}
const indexUrl = origin+asset('publicacoes/')
const cards = editorialArticles.map(p=>`<a class="post-card" href="${articlePath(p.slug)}"><img src="${asset(p.featuredMedia.sourceUrl)}" alt="" loading="lazy" width="600" height="400"><div><span>Cultura e memória</span><h2>${esc(p.title)}</h2><p>${esc(p.excerpt)}</p><b>Ler artigo →</b></div></a>`).join('')
await fs.mkdir('dist/publicacoes',{recursive:true})
await fs.writeFile('dist/publicacoes/index.html',page('Publicações sobre cultura grega','Guias sobre idioma, história, festas e tradições gregas, com caminhos para conhecer a Coletividade Helênica de São Paulo.',indexUrl,`<main id="main-content" class="content-page"><header><p class="content-kicker">Cultura e memória</p><h1>Publicações sobre cultura grega</h1><p>Idioma, tradições, história e vida em comunidade.</p><p><a href="${appPath('/cultura')}">Pesquisar também as publicações do acervo histórico →</a></p></header><section class="posts-grid">${cards}</section></main>`,{'@context':'https://schema.org','@type':'CollectionPage',name:'Publicações sobre cultura grega',url:indexUrl}))
await fs.writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[indexUrl,...urls].map(url=>`<url><loc>${esc(url)}</loc></url>`).join('')}</urlset>`)
console.log(`Generated ${urls.length} static articles, publication index and sitemap.`)
