import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { YEARS, PASCHA, MONTHS, calendarEvents, dateAtUTC, saoPauloDate } from './content/hellenic-calendar.js'
import './hellenic-calendar.css'

const formatDate = date => new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(dateAtUTC(date))
const categoryName = category => category === 'civil' ? 'Data cívica grega' : 'Celebração ortodoxa'

export default function HellenicCalendar() {
  const [today, setToday] = useState(saoPauloDate)
  const currentYear = Number(today.slice(0, 4))
  const [year, setYear] = useState(YEARS.includes(currentYear) ? currentYear : YEARS[0])
  const [month, setMonth] = useState(YEARS.includes(currentYear) ? Number(today.slice(5, 7)) - 1 : 0)
  const [category, setCategory] = useState('all')
  const [annual, setAnnual] = useState(false)
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    const sync = () => {
      const next = saoPauloDate()
      if (next === today) return
      const nextYear = Number(next.slice(0, 4))
      // Follow the date rollover only while viewing the current month.
      if (year === currentYear && month === Number(today.slice(5, 7)) - 1 && YEARS.includes(nextYear)) {
        setYear(nextYear)
        setMonth(Number(next.slice(5, 7)) - 1)
        setSelected(null)
      }
      setToday(next)
    }
    const timer = window.setInterval(sync, 1000)
    window.addEventListener('focus', sync)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('focus', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [today, year, month, currentYear])
  const events = calendarEvents(year).filter(e => category === 'all' || e.category === category)
  const monthly = events.filter(e => Number(e.date.slice(5, 7)) === month + 1)
  const visible = annual ? events : selected ? monthly.filter(e => e.date === selected) : monthly
  const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay()
  const length = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  function moveMonth(delta) {
    const next = new Date(Date.UTC(year, month + delta, 1))
    if (!YEARS.includes(next.getUTCFullYear())) return
    setYear(next.getUTCFullYear()); setMonth(next.getUTCMonth()); setSelected(null)
  }
  return <section className="hellenic-calendar" aria-labelledby="calendar-title">
    <header className="hellenic-calendar__intro"><div><p className="content-kicker">Tradição ao longo do ano · 2026–2030</p><h2 id="calendar-title">Calendário grego e ortodoxo</h2><p>Consulte os feriados gregos, as doze grandes festas ortodoxas e as principais datas do ciclo pascal.</p></div><div className="hellenic-calendar__pascha"><span>Páscoa Ortodoxa · {year}</span><strong>{formatDate(PASCHA[year])}</strong><button type="button" onClick={() => { setMonth(Number(PASCHA[year].slice(5, 7)) - 1); setCategory('all'); setAnnual(false); setSelected(PASCHA[year]) }}>Ver no calendário →</button></div></header>
    <p className="hellenic-calendar__notice">Estas datas são referências culturais e religiosas. Festas, liturgias e horários de funcionamento da CHSP dependem da programação da comunidade. <Link to="/cultura/calendario-grego-ortodoxo-pascoa-feriados"><u>Entenda a Páscoa e as festas do calendário grego.</u></Link></p>
    <div className="hellenic-calendar__tools">
      <button type="button" className="hellenic-calendar__today" disabled={!YEARS.includes(currentYear)} onClick={() => { setYear(currentYear); setMonth(Number(today.slice(5, 7)) - 1); setSelected(today); setAnnual(false); setCategory('all') }}>Hoje · {formatDate(today)} de {currentYear}</button>
      <label>Ano<select value={year} onChange={e => { setYear(Number(e.target.value)); setSelected(null) }}>{YEARS.map(y => <option key={y}>{y}</option>)}</select></label>
      {!annual && <label>Mês<select value={month} onChange={e => { setMonth(Number(e.target.value)); setSelected(null) }}>{MONTHS.map((m, i) => <option value={i} key={m}>{m}</option>)}</select></label>}
      <label>Mostrar<select value={category} onChange={e => { setCategory(e.target.value); setSelected(null) }}><option value="all">Todas as datas</option><option value="civil">Datas cívicas gregas</option><option value="orthodox">Celebrações ortodoxas</option></select></label>
      <button type="button" className="hellenic-calendar__view" aria-pressed={annual} onClick={() => { setAnnual(!annual); setSelected(null) }}>{annual ? 'Ver calendário mensal' : 'Ver lista do ano'}</button>
    </div>
    <div className={`hellenic-calendar__body${annual ? ' is-annual' : ''}`}>
      {!annual && <div><div className="hellenic-calendar__month"><button type="button" aria-label="Mês anterior" disabled={year === 2026 && month === 0} onClick={() => moveMonth(-1)}><ChevronLeft /></button><h3>{MONTHS[month]} {year}</h3><button type="button" aria-label="Próximo mês" disabled={year === 2030 && month === 11} onClick={() => moveMonth(1)}><ChevronRight /></button></div>
        <div className="hellenic-calendar__week" aria-hidden="true">{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <span key={d}>{d}</span>)}</div>
        <div className="hellenic-calendar__grid" role="group" aria-label={`${MONTHS[month]} de ${year}`}>
          {Array.from({ length: firstDay }, (_, i) => <span key={`blank-${i}`} />)}
          {Array.from({ length }, (_, i) => {
            const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
            const dayEvents = monthly.filter(e => e.date === date)
            return <button type="button" key={date} className={`${dayEvents.length ? 'has-events' : ''} ${date === PASCHA[year] && dayEvents.length ? 'is-pascha' : ''}`} aria-current={date === today ? 'date' : undefined} aria-pressed={selected === date} aria-label={`${formatDate(date)} de ${year}${dayEvents.length ? ': ' + dayEvents.map(e => e.title).join('; ') : ', sem datas comemorativas cadastradas'}`} onClick={() => setSelected(selected === date ? null : date)}><span>{i + 1}</span>{dayEvents.length > 0 && <span className="hellenic-calendar__dots" aria-hidden="true">{[...new Set(dayEvents.map(e => e.category))].map(c => <i className={c} key={c}/>)}</span>}</button>
          })}
        </div><p className="hellenic-calendar__legend"><span><i className="civil"/>Cívica</span><span><i className="orthodox"/>Ortodoxa</span><span>Contorno: hoje</span></p>
      </div>}
      <div className="hellenic-calendar__list" aria-live="polite"><h3>{annual ? `Datas de ${year}` : selected ? formatDate(selected) : `Datas de ${MONTHS[month].toLowerCase()}`}</h3>{selected && <button className="hellenic-calendar__clear" type="button" onClick={() => setSelected(null)}>Mostrar todo o mês</button>}
        {visible.length ? <ul>{visible.map(e => <li key={e.id} className={e.pascha ? 'is-pascha' : ''}><time dateTime={e.date}>{formatDate(e.date)}</time><div><span className="hellenic-calendar__category">{categoryName(e.category)}</span><h4>{e.title}</h4>{e.title === 'Dia do Trabalho' && <p>Data de referência: 1º de maio. Eventual transferência do feriado depende de anúncio oficial na Grécia.</p>}</div></li>)}</ul> : <p>Nenhuma data cadastrada neste período para o filtro escolhido.</p>}
      </div>
    </div>
    <details className="hellenic-calendar__sources"><summary>Sobre as datas e fontes</summary><p>Festas fixas segundo o calendário grego de novo estilo, que coincide com o calendário civil neste período. Outras tradições ortodoxas podem observar festas fixas em dias diferentes. A Páscoa segue o ciclo pascal ortodoxo. Este calendário não inclui todos os santos do calendário diário nem feriados municipais ou regionais da Grécia.</p><p>As datas futuras são referências do calendário; não representam anúncios de suspensão de expediente. A observância de algumas datas, como a Segunda-feira do Espírito Santo, varia por setor.</p><ul><li><a href="https://www.mfa.gr/uk/public-holidays/">Ministério das Relações Exteriores da Grécia — datas gregas</a></li><li><a href="https://www.oca.org/fs/paschal-cycle">Igreja Ortodoxa na América — ciclo pascal de 2026 a 2030</a></li><li><a href="https://www.oca.org/fs/icons-of-twelve-great-feasts">As doze grandes festas ortodoxas</a></li><li><a href="https://www.oca.org/fs/icons-of-church-year">Ciclo de festas do ano litúrgico</a></li></ul></details>
  </section>
}
