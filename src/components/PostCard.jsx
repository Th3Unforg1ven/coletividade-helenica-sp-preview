import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categoryById } from '../content/site-data.js'
import { decode, stripHtml } from '../legacy-content.js'
import { mediaUrl } from '../content/media.js'
import ResponsiveImage from '../ResponsiveImage.jsx'
import archiveVariants from '../content/archive-variants.json'
import { saveArchiveScroll } from './useArchiveScroll.js'

export default function PostCard({ post }) {
  const category = categoryById[post.categories[0]]
  const location = useLocation()
  return (
    <Link
      className="post-card"
      to={`/cultura/${post.slug}`}
      state={{ archiveReturn: `${location.pathname}${location.search}` }}
      onClick={() => saveArchiveScroll(location.pathname, location.search)}
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
    </Link>
  )
}
