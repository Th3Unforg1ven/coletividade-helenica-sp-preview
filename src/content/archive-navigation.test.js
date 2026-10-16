import test from 'node:test'
import assert from 'node:assert/strict'
import { readArchiveFilters, updateArchiveFilters } from './archive-navigation.js'

test('Archive links preserve accents, categories, topics and loaded results', () => {
  const params = updateArchiveFilters('', {
    q: 'Grécia e memória',
    categoria: '22',
    tema: 'history',
    limite: 36,
  })
  assert.deepEqual(readArchiveFilters(params, 59), {
    query: 'Grécia e memória',
    categoryId: '22',
    topicId: 'history',
    visibleCount: 36,
  })
})

test('Resetting filters removes only archive parameters and limits untrusted counts', () => {
  const params = updateArchiveFilters(
    '?q=grego&tema=language&categoria=21&limite=24&utm_source=site',
    { q: '', tema: 'all', categoria: 'all', limite: 12 },
  )
  assert.equal(params.toString(), 'utm_source=site')
  for (const value of ['NaN', '-1', '1', '15.5'])
    assert.equal(readArchiveFilters(`limite=${value}`).visibleCount, 12)
  assert.equal(readArchiveFilters('limite=900000', 59).visibleCount, 59)
})
