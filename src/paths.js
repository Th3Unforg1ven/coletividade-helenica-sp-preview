export const isHashRouting = import.meta.env.VITE_ROUTER_MODE === 'hash'

export function assetUrl(path) {
  if (!path || /^(?:https?:|data:|blob:)/i.test(path)) return path
  if (path.startsWith(import.meta.env.BASE_URL)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function sectionTarget(id) {
  return isHashRouting
    ? { pathname: '/', search: `?section=${id}` }
    : { pathname: '/', hash: `#${id}` }
}

export function routeUrl(path) {
  return isHashRouting ? `${import.meta.env.BASE_URL}#${path}` : path
}
