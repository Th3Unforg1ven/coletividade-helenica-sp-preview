import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const contentPath = path.join(root, 'src', 'content', 'site-content.json')
const outputDirectory = path.join(root, 'public', 'images', 'archive')
const temporaryDirectory = path.join(root, '.media-migration')
const manifestPath = path.join(root, 'src', 'content', 'media-map.json')
const content = JSON.parse(await readFile(contentPath, 'utf8'))
const records = [...content.pages, ...content.posts]
const urls = new Set()

for (const record of records) {
  if (record.featuredMedia?.sourceUrl) urls.add(record.featuredMedia.sourceUrl)
  for (const match of (record.content || '').matchAll(/<(?:img|video)[^>]+src="(https?:\/\/(?:www\.)?helenica\.com\.br\/wp-content\/[^"\s]+)"/gi)) {
    urls.add(match[1].replaceAll('&amp;', '&'))
  }
}

await mkdir(outputDirectory, { recursive: true })
await mkdir(temporaryDirectory, { recursive: true })

function canonicalUrl(value) {
  return value
    .replace(/^http:\/\/(?:www\.)?helenica\.com\.br/i, 'https://www.helenica.com.br')
    .replace(/^https:\/\/helenica\.com\.br/i, 'https://www.helenica.com.br')
}

function safeName(url) {
  const parsed = new URL(url)
  const decoded = decodeURIComponent(path.basename(parsed.pathname))
  const extension = path.extname(decoded)
  const stem = path.basename(decoded, extension)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 58) || 'media'
  const hash = createHash('sha1').update(canonicalUrl(url)).digest('hex').slice(0, 10)
  return `${hash}-${stem}`
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let errorOutput = ''
    child.stderr.on('data', chunk => { errorOutput += chunk })
    child.on('error', reject)
    child.on('close', code => code === 0 ? resolve() : reject(new Error(errorOutput || `${command} terminou com código ${code}`)))
  })
}

const manifest = {}
const queue = [...urls]
let completed = 0

async function migrate(url) {
  const normalized = canonicalUrl(url)
  const response = await fetch(normalized, {
    headers: { 'user-agent': 'CHSP media preservation/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) throw new Error(`${response.status} ao baixar ${normalized}`)
  const mime = response.headers.get('content-type') || ''
  const isVideo = mime.startsWith('video/') || /\.mp4(?:$|\?)/i.test(normalized)
  const baseName = safeName(normalized)
  const temporaryPath = path.join(temporaryDirectory, `${baseName}.source`)
  const outputName = `${baseName}.${isVideo ? 'mp4' : 'webp'}`
  const outputPath = path.join(outputDirectory, outputName)
  await writeFile(temporaryPath, Buffer.from(await response.arrayBuffer()))

  if (isVideo) {
    await run('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', temporaryPath,
      '-vf', 'scale=-2:min(540\\,ih)',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '31',
      '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart',
      '-map_metadata', '-1', outputPath,
    ])
  } else {
    await run('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', temporaryPath,
      '-vf', 'scale=min(1600\\,iw):-2',
      '-frames:v', '1', '-c:v', 'libwebp', '-q:v', '78',
      '-compression_level', '5', '-map_metadata', '-1', outputPath,
    ])
  }

  await rm(temporaryPath, { force: true })
  const localPath = `/images/archive/${outputName}`
  manifest[normalized] = localPath
  manifest[url] = localPath
  completed += 1
  process.stdout.write(`\rMídias preservadas: ${completed}/${urls.size}`)
}

async function worker() {
  while (queue.length) {
    const url = queue.shift()
    await migrate(url)
  }
}

try {
  await Promise.all(Array.from({ length: 4 }, worker))
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  process.stdout.write(`\nManifesto criado em ${path.relative(root, manifestPath)}\n`)
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true })
}
