export default function ResponsiveImage({ src, alt = '', ...props }) {
  const hasLocalVariants = src?.startsWith('/images/') && src.endsWith('.webp')
  if (!hasLocalVariants) return <img src={src} alt={alt} {...props} />

  const small = src.replace(/\.webp$/, '-640.webp')
  const medium = src.replace(/\.webp$/, '-960.webp')
  return <picture>
    <source media="(max-width: 560px)" srcSet={small} />
    <source media="(max-width: 1000px)" srcSet={medium} />
    <img src={src} alt={alt} {...props} />
  </picture>
}
