export function publicationDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date(date))
}

export function prepareArticle(html = '') {
  const source = document.createElement('div')
  source.innerHTML = html
  const headings = [...source.querySelectorAll('h2')].map((heading, index) => {
    if (!heading.id) heading.id = `secao-${index + 1}`
    return { id: heading.id, title: heading.textContent }
  })
  return {
    html: source.innerHTML,
    headings,
    minutes: Math.max(1, Math.ceil((source.textContent || '').trim().split(/\s+/).length / 200)),
  }
}
