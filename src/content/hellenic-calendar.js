// Datas civis no calendário gregoriano; festas fixas do calendário grego de novo estilo.
// Fontes: https://www.mfa.gr/uk/public-holidays/
// https://www.oca.org/fs/paschal-cycle
// https://www.oca.org/fs/icons-of-twelve-great-feasts
// https://www.oca.org/fs/icons-of-church-year
export const YEARS = [2026, 2027, 2028, 2029, 2030]
export const PASCHA = { 2026: '2026-04-12', 2027: '2027-05-02', 2028: '2028-04-16', 2029: '2029-04-08', 2030: '2030-04-28' }
export const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
export function saoPauloDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}
const fixed = [
  ['01-01', 'Ano-Novo', 'civil'],
  ['01-06', 'Teofania (Epifania)', 'orthodox'],
  ['02-02', 'Apresentação de Cristo no Templo', 'orthodox'],
  ['03-25', 'Independência da Grécia', 'civil'],
  ['03-25', 'Anunciação à Mãe de Deus', 'orthodox'],
  ['05-01', 'Dia do Trabalho', 'civil'],
  ['08-06', 'Transfiguração de Cristo', 'orthodox'],
  ['08-15', 'Dormição da Mãe de Deus', 'orthodox'],
  ['09-08', 'Natividade da Mãe de Deus', 'orthodox'],
  ['09-14', 'Exaltação da Santa Cruz', 'orthodox'],
  ['10-28', 'Dia do Oxi (Dia do Não)', 'civil'],
  ['11-21', 'Entrada da Mãe de Deus no Templo', 'orthodox'],
  ['12-25', 'Natal de Cristo', 'orthodox'],
  ['12-26', 'Sinaxe da Mãe de Deus', 'orthodox'],
]
const movable = [
  [-70, 'Domingo do Publicano e do Fariseu'],
  [-63, 'Domingo do Filho Pródigo'],
  [-56, 'Domingo do Juízo Final'],
  [-49, 'Domingo do Perdão'],
  [-48, 'Segunda-feira Limpa — início da Grande Quaresma'],
  [-42, 'Domingo da Ortodoxia'],
  [-8, 'Sábado de Lázaro'],
  [-7, 'Domingo de Ramos'],
  [-6, 'Segunda-feira Santa'],
  [-5, 'Terça-feira Santa'],
  [-4, 'Quarta-feira Santa'],
  [-3, 'Quinta-feira Santa'],
  [-2, 'Sexta-feira Santa'],
  [-1, 'Sábado Santo'],
  [0, 'Páscoa Ortodoxa (Pascha)'],
  [1, 'Segunda-feira de Páscoa'],
  [39, 'Ascensão de Cristo'],
  [49, 'Pentecostes'],
  [50, 'Segunda-feira do Espírito Santo'],
  [56, 'Domingo de Todos os Santos'],
]
export function dateAtUTC(date) { return new Date(`${date}T12:00:00Z`) }
export function offsetDate(date, days) {
  const value = dateAtUTC(date)
  value.setUTCDate(value.getUTCDate() + days)
  return value.toISOString().slice(0, 10)
}
export function calendarEvents(year) {
  if (!YEARS.includes(year)) return []
  return [
    ...fixed.map(([day, title, category]) => ({ id: `${year}-${day}-${category}`, date: `${year}-${day}`, title, category })),
    ...movable.map(([offset, title]) => ({ id: `${year}-pascha-${offset}`, date: offsetDate(PASCHA[year], offset), title, category: 'orthodox', pascha: offset === 0 })),
  ].sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title, 'pt-BR'))
}
