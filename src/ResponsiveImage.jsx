import { assetUrl } from './paths.js'

export default function ResponsiveImage({ src, alt = '', variantWidths, ...props }) {
  const hasLocalVariants = src?.startsWith('/images/') && src.endsWith('.webp')
  if (!hasLocalVariants) return <img src={assetUrl(src)} alt={alt} {...props} />

  const availableWidths = src.startsWith('/images/archive/') ? variantWidths || [] : [640, 960]
  if (!availableWidths.length) return <img src={assetUrl(src)} alt={alt} {...props} />
  const small = availableWidths.includes(640) ? src.replace(/\.webp$/, '-640.webp') : src
  const medium = availableWidths.includes(960) ? src.replace(/\.webp$/, '-960.webp') : small
  return <picture>
    <source media="(max-width: 560px)" srcSet={assetUrl(small)} />
    <source media="(max-width: 1000px)" srcSet={assetUrl(medium)} />
    <img src={assetUrl(src)} alt={alt} {...props} />
  </picture>
}
