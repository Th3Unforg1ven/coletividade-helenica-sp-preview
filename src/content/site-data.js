import archivedContent from './site-content.json'
import { editorialArticles } from './editorial-articles.js'

export const siteContent = {
  ...archivedContent,
  posts: [...editorialArticles, ...archivedContent.posts],
  categories: archivedContent.categories.map((category) => ({
    ...category,
    count:
      category.count +
      editorialArticles.filter((post) => post.categories.includes(category.id)).length,
  })),
}

export const pageBySlug = Object.fromEntries(siteContent.pages.map((page) => [page.slug, page]))
export const postBySlug = Object.fromEntries(siteContent.posts.map((post) => [post.slug, post]))
export const categoryById = Object.fromEntries(
  siteContent.categories.map((category) => [category.id, category]),
)
export const hiddenArchiveSlugs = new Set(['home', 'sample-page', 'temp'])
export const publicArchivePages = siteContent.pages.filter(
  (page) => !hiddenArchiveSlugs.has(page.slug),
)
