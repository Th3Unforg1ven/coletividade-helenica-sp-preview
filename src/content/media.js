import mediaMap from './media-map.json'

export function mediaUrl(value = '') {
  if (!value) return value
  if (value.startsWith('/')) return value
  const normalized = value
    .replace(/^http:\/\/(?:www\.)?helenica\.com\.br/i, 'https://www.helenica.com.br')
    .replace(/^https:\/\/helenica\.com\.br/i, 'https://www.helenica.com.br')
  return mediaMap[normalized] || value
}
