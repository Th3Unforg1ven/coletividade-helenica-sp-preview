import test from 'node:test'
import assert from 'node:assert/strict'
import { pathForPage } from './navigation.js'

test('Legacy links keep their canonical destinations after pages are split', () => {
  const destinations = {
    'sobre-a-chsp': '/coletividade',
    'aulas-de-grego-moderno': '/cursos/grego-moderno',
    'aulas-de-danca': '/cursos/aulas-de-danca',
    'oficinas-culturais': '/cursos/oficinas-culturais',
    'nossa-historia': '/coletividade/nossa-historia',
    'agenda-de-eventos-e-festas': '/agenda',
    'associados-e-parceiros': '/participe',
    contato: '/contato',
    'politica-de-privacidade': '/privacidade',
    'acontece-memorias': '/cultura/paginas/acontece-memorias',
    'pagina-do-acervo': '/paginas/pagina-do-acervo',
  }
  for (const [slug, destination] of Object.entries(destinations)) {
    assert.equal(pathForPage({ slug }), destination, slug)
  }
})
