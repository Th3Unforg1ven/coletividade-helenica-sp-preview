import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const source = process.argv[2]
if (!source) throw new Error('Informe a pasta das novas mídias como primeiro argumento.')
const ffmpeg = path.resolve(
  process.argv[3] || 'tmp/video-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe',
)
const archive = 'local-media/curso-grego-2026-10'
const photos = 'public/images/aulas/presencial'
const videos = 'public/videos/aulas'
for (const folder of [archive, photos, videos]) await fs.mkdir(folder, { recursive: true })
for (const file of await fs.readdir(source)) {
  if (/\.(jpeg|mp4)$/i.test(file))
    await fs.copyFile(path.join(source, file), path.join(archive, file))
}
const photoFiles = {
  'biblioteca-em-aula': 'WhatsApp Image 2026-10-10 at 19.28.04.jpeg',
  'turma-em-estudo': 'WhatsApp Image 2026-10-10 at 19.28.04 (1).jpeg',
  'escrita-no-quadro': 'WhatsApp Image 2026-10-10 at 19.28.04 (2).jpeg',
  'professora-em-aula': 'WhatsApp Image 2026-10-10 at 19.28.05.jpeg',
  'sala-e-cultura': 'WhatsApp Image 2026-10-10 at 19.28.06.jpeg',
}
const run = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args])
for (const [name, file] of Object.entries(photoFiles)) {
  const original = path.join(photos, `${name}.jpeg`)
  await fs.copyFile(path.join(source, file), original)
  for (const width of [640, 960, 1600]) {
    run([
      '-i',
      original,
      '-vf',
      `scale=w='min(${width},iw)':h=-1`,
      '-quality',
      '84',
      '-frames:v',
      '1',
      path.join(photos, `${name}${width === 1600 ? '' : `-${width}`}.webp`),
    ])
  }
}
for (const [name, file, start, duration, poster] of [
  ['leitura-em-grego', 'WhatsApp Video 2026-10-10 at 19.28.04.mp4', 0, 11.8, 0.8],
  ['escrita-em-grego', 'WhatsApp Video 2026-10-10 at 19.28.05.mp4', 7, 3.5, 8],
]) {
  const original = path.join(source, file)
  run([
    '-ss',
    String(start),
    '-i',
    original,
    '-t',
    String(duration),
    '-vf',
    'fps=24,scale=464:-2,format=yuv420p',
    '-an',
    '-c:v',
    'libx264',
    '-crf',
    '25',
    '-preset',
    'medium',
    '-movflags',
    '+faststart',
    path.join(videos, `${name}-loop-hq.mp4`),
  ])
  run([
    '-ss',
    String(poster),
    '-i',
    original,
    '-frames:v',
    '1',
    '-vf',
    'scale=464:-2',
    '-q:v',
    '3',
    path.join(videos, `${name}-poster-hq.jpg`),
  ])
}
console.log(
  'Preparadas 5 fotos com versões responsivas e 2 vídeos sem áudio. Os 11 originais foram preservados em local-media/.',
)
