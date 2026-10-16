import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categoryById } from '../content/site-data.js'
import { decode, stripHtml } from '../legacy-content.js'
import { mediaUrl } from '../content/media.js'
import { assetUrl } from '../paths.js'
import ResponsiveImage from '../ResponsiveImage.jsx'
import archiveVariants from '../content/archive-variants.json'

export default function PostCard({ post }) {
  const category = categoryById[post.categories[0]]
  const CardLink = post.editorial ? 'a' : Link
  return (
    <CardLink
      className="post-card"
      {...(post.editorial
        ? { href: assetUrl(`/cultura/${post.slug}/`) }
        : { to: `/cultura/${post.slug}` })}
    >
      {post.featuredMedia?.sourceUrl && (
        <ResponsiveImage
          src={mediaUrl(post.featuredMedia.sourceUrl)}
          variantWidths={archiveVariants[mediaUrl(post.featuredMedia.sourceUrl)]}
          style={{ objectPosition: post.featuredMedia.position }}
          alt={post.featuredMedia.alt || ''}
          loading="lazy"
          decoding="async"
        />
      )}
      <div>
        <span>{decode(category?.name || 'Cultura')}</span>
        <h2>{decode(post.title)}</h2>
        <p>{stripHtml(post.excerpt).slice(0, 180)}</p>
        <b>
          Ler conteúdo completo <ArrowRight size={15} />
        </b>
      </div>
    </CardLink>
  )
}
