export function assetUrl(path) {
  if (!path || /^(?:https?:|data:|blob:)/i.test(path)) return path
  if (path.startsWith(import.meta.env.BASE_URL)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function sectionTarget(id) {
  return { pathname: '/', hash: `#${id}` }
}

export function routeUrl(path) {
  return assetUrl(path)
}
