import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

// Create display copies; the original JPEG remains available in the photo viewer.
const ffmpeg = path.resolve(
  process.argv[2] || 'tmp/video-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe',
)
const folders = ['public/images/grupos-danca', 'public/images/comunidade']
let originalBytes = 0
let mobileBytes = 0
for (const folder of folders) {
  for (const entry of await fs.readdir(folder)) {
    if (!entry.endsWith('.jpeg')) continue
    const source = path.join(folder, entry)
    originalBytes += (await fs.stat(source)).size
    for (const width of [640, 960, 1600]) {
      const target = source.replace(/\.jpeg$/, `${width === 1600 ? '' : `-${width}`}.webp`)
      execFileSync(ffmpeg, [
        '-hide_banner',
        '-loglevel',
        'error',
        '-y',
        '-i',
        source,
        '-vf',
        `scale=w='min(${width},iw)':h=-1`,
        '-quality',
        '84',
        '-frames:v',
        '1',
        target,
      ])
      if (width === 640) mobileBytes += (await fs.stat(target)).size
    }
  }
}
console.log(
  JSON.stringify({
    originalBytes,
    mobileBytes,
    reductionPercent: Math.round((1 - mobileBytes / originalBytes) * 100),
  }),
)
