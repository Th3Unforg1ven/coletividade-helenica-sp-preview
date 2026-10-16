export function readArchiveFilters(search, total = 1000) {
  const params = new URLSearchParams(search)
  const limit = Number(params.get('limite'))
  return {
    query: params.get('q') || '',
    categoryId: params.get('categoria') || 'all',
    topicId: params.get('tema') || 'all',
    visibleCount:
      Number.isInteger(limit) && limit >= 12 ? Math.min(limit, Math.max(total, 12)) : 12,
  }
}

export function updateArchiveFilters(search, updates) {
  const params = new URLSearchParams(search)
  for (const [key, value] of Object.entries(updates)) {
    if (value === '' || value === 'all' || (key === 'limite' && value === 12)) params.delete(key)
    else params.set(key, String(value))
  }
  return params
}
