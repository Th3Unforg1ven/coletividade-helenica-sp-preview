import { assetUrl } from './paths.js'

export default function ResponsiveImage({ src, alt = '', ...props }) {
  const hasLocalVariants = src?.startsWith('/images/') && !src.startsWith('/images/archive/') && src.endsWith('.webp')
  if (!hasLocalVariants) return <img src={assetUrl(src)} alt={alt} {...props} />

  const small = src.replace(/\.webp$/, '-640.webp')
  const medium = src.replace(/\.webp$/, '-960.webp')
  return <picture>
    <source media="(max-width: 560px)" srcSet={assetUrl(small)} />
    <source media="(max-width: 1000px)" srcSet={assetUrl(medium)} />
    <img src={assetUrl(src)} alt={alt} {...props} />
  </picture>
}
