import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('public/images')
const variants = {}

async function scan(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await scan(file)
      continue
    }
    const match = entry.name.match(/-(640|960)\.webp$/)
    if (!match) continue
    const original = file.replace(/-(640|960)\.webp$/, '.webp')
    try {
      await fs.access(original)
    } catch {
      continue
    }
    const url = '/images/' + path.relative(root, original).split(path.sep).join('/')
    ;(variants[url] ??= []).push(Number(match[1]))
  }
}

await scan(root)
const sorted = Object.fromEntries(
  Object.keys(variants)
    .sort()
    .map((url) => [url, variants[url].sort((a, b) => a - b)]),
)
await fs.writeFile('src/content/responsive-variants.json', JSON.stringify(sorted, null, 2) + '\n')
