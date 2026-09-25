import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { editorialArticles, newArticles } from '../src/content/editorial-articles.js'
const archive = JSON.parse(fs.readFileSync('src/content/site-content.json','utf8'))
const known = new Set([...archive.posts,...editorialArticles].map(p=>p.slug))
test('All 16 requested articles exist and the central guide links to the four calendar articles',()=>{
  assert.equal(newArticles.length,16)
  assert.equal(new Set(editorialArticles.map(p=>p.slug)).size,17)
  assert.deepEqual(editorialArticles[0].related,newArticles.slice(0,4).map(p=>p.slug))
  for(const post of newArticles){
    assert.ok(post.sources.length)
    assert.ok(post.content.match(/<h2>/g).length>=3)
    for(const slug of post.related) assert.ok(known.has(slug),slug)
    assert.ok(fs.existsSync(`public${post.featuredMedia.sourceUrl}`))
  }
})
test('All articles have complete standalone HTML, matching schema and working local assets',()=>{
  for(const post of editorialArticles){
    const html=fs.readFileSync(`dist/cultura/${post.slug}/index.html`,'utf8')
    assert.equal((html.match(/<h1>/g)||[]).length,1)
    assert.ok(html.includes(post.excerpt))
    assert.ok(html.includes('rel="canonical"'))
    assert.ok(!html.includes('type="module"'))
    const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
    assert.equal(schema.headline,post.title)
    assert.equal(schema['@type'],'BlogPosting')
    assert.ok(!schema.mainEntityOfPage.includes('#'))
    const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]))
    for(const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id))
    for(const [,src] of html.matchAll(/(?:src|href)="([^"#]*(?:\.webp|\.png|\.css))"/g)){
      const relative=src.replace(process.env.BASE_PATH||'/','')
      assert.ok(fs.existsSync(`dist/${relative}`),src)
    }
  }
  const sitemap=fs.readFileSync('dist/sitemap.xml','utf8')
  assert.equal((sitemap.match(/<loc>/g)||[]).length,18)
  assert.ok(!sitemap.includes('#'))
})
