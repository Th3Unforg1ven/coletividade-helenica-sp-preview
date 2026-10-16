import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const vite = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
const env = process.env
execFileSync(process.execPath, [vite, 'build'], { stdio: 'inherit', env })
execFileSync(
  process.execPath,
  [vite, 'build', '--ssr', 'src/server-entry.jsx', '--outDir', path.resolve('tmp/prerender')],
  { stdio: 'inherit', env },
)
await import('./build-pages.mjs')
