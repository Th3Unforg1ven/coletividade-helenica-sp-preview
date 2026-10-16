import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { culturalTopics, matchesTopic, normalizeSearch } from './cultural-topics.js'
import { editorialArticles } from './editorial-articles.js'

const archive = JSON.parse(fs.readFileSync('src/content/site-content.json', 'utf8'))
const posts = [...editorialArticles, ...archive.posts]

test('Every publication can be found through a topic, and topic photos exist', () => {
  for (const post of posts) {
    assert.ok(
      culturalTopics.some((topic) => matchesTopic(post, topic.id)),
      post.slug,
    )
  }
  for (const topic of culturalTopics) {
    assert.ok(fs.existsSync(`public${topic.image}`), topic.image)
    assert.ok(
      posts.some((post) => matchesTopic(post, topic.id)),
      topic.id,
    )
    for (const slug of topic.slugs || [])
      assert.ok(
        posts.some((post) => post.slug === slug),
        slug,
      )
  }
})

test('Language guides remain discoverable independently of the old Curiosidades category', () => {
  const language = posts.filter((post) => matchesTopic(post, 'language'))
  assert.ok(language.some((post) => post.slug === 'alfabeto-grego-letras-sons'))
  assert.ok(language.some((post) => post.slug === 'falando-grego'))
  assert.ok(!language.some((post) => post.slug === 'pascoa-ortodoxa-2026-2030'))
})

test('Search supports the same words with accents, case and surrounding spaces', () => {
  assert.equal(normalizeSearch('  LÍNGUA GREGA '), normalizeSearch('lingua grega'))
  assert.equal(normalizeSearch('São Paulo'), normalizeSearch('sao paulo'))
  assert.equal(normalizeSearch('Grécia'), normalizeSearch('Gre\u0301cia'))
})
