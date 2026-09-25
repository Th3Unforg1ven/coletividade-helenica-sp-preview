import test from 'node:test'
import assert from 'node:assert/strict'
import { calendarEvents, YEARS, saoPauloDate } from './hellenic-calendar.js'

test('Today uses São Paulo midnight, including month and year rollovers', () => {
  assert.equal(saoPauloDate(new Date('2027-01-01T02:59:59Z')), '2026-12-31')
  assert.equal(saoPauloDate(new Date('2027-01-01T03:00:00Z')), '2027-01-01')
  assert.equal(saoPauloDate(new Date('2028-03-01T02:59:59Z')), '2028-02-29')
  assert.equal(saoPauloDate(new Date('2028-03-01T03:00:00Z')), '2028-03-01')
})

// Independent reference dates: https://www.oca.org/fs/paschal-cycle
const references = [
  [2026, '04-12', '02-23', '05-21', '05-31'],
  [2027, '05-02', '03-15', '06-10', '06-20'],
  [2028, '04-16', '02-28', '05-25', '06-04'],
  [2029, '04-08', '02-19', '05-17', '05-27'],
  [2030, '04-28', '03-11', '06-06', '06-16'],
]
for (const [year, pascha, lent, ascension, pentecost] of references) {
  test(`Orthodox cycle matches reference table for ${year}`, () => {
    const events = calendarEvents(year)
    for (const [title, date] of [
      ['Páscoa Ortodoxa (Pascha)', pascha],
      ['Segunda-feira Limpa — início da Grande Quaresma', lent],
      ['Ascensão de Cristo', ascension], ['Pentecostes', pentecost],
    ]) assert.equal(events.find(e => e.title === title).date, `${year}-${date}`)
  })
}
test('Dates remain valid, ordered and distinct, including coinciding celebrations', () => {
  for (const year of YEARS) {
    const events = calendarEvents(year)
    assert.equal(new Set(events.map(e => e.id)).size, events.length)
    assert.equal(events.filter(e => e.date === `${year}-03-25`).length, 2)
    for (const [i, event] of events.entries()) {
      assert.equal(new Date(`${event.date}T00:00:00Z`).toISOString().slice(0, 10), event.date)
      assert.ok(event.date.startsWith(String(year)))
      if (i) assert.ok(events[i - 1].date <= event.date)
    }
  }
  assert.deepEqual(calendarEvents(2031), [])
})
