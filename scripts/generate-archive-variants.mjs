import { spawn } from 'node:child_process'
import { readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const archiveDirectory = path.join(process.cwd(), 'public', 'images', 'archive')
const manifestPath = path.join(process.cwd(), 'src', 'content', 'archive-variants.json')
const widths = [640, 960]
const archiveFiles = await readdir(archiveDirectory)
const originals = archiveFiles
  .filter(name => name.endsWith('.webp') && !/-(?:640|960)\.webp$/.test(name))

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let errorOutput = ''
    child.stderr.on('data', chunk => { errorOutput += chunk })
    child.on('error', reject)
    child.on('close', code => code === 0 ? resolve() : reject(new Error(errorOutput || `${command} terminou com código ${code}`)))
  })
}

function read(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let output = ''
    let errorOutput = ''
    child.stdout.on('data', chunk => { output += chunk })
    child.stderr.on('data', chunk => { errorOutput += chunk })
    child.on('error', reject)
    child.on('close', code => code === 0 ? resolve(output.trim()) : reject(new Error(errorOutput || `${command} terminou com código ${code}`)))
  })
}

await Promise.all(
  archiveFiles
    .filter(name => /-(?:640|960)\.webp$/.test(name))
    .map(name => rm(path.join(archiveDirectory, name), { force: true })),
)

const manifest = {}
const jobs = []
for (const name of originals) {
  const source = path.join(archiveDirectory, name)
  const sourceWidth = Number(await read('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width', '-of', 'csv=p=0', source,
  ]))
  const availableWidths = widths.filter(width => sourceWidth > width)
  if (availableWidths.length) manifest[`/images/archive/${name}`] = availableWidths
  jobs.push(...availableWidths.map(width => ({ name, width })))
}

let completed = 0
const totalJobs = jobs.length

async function worker() {
  while (jobs.length) {
    const { name, width } = jobs.shift()
    const source = path.join(archiveDirectory, name)
    const output = path.join(archiveDirectory, name.replace(/\.webp$/, `-${width}.webp`))
    await run('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', source,
      '-vf', `scale=min(${width}\\,iw):-2`,
      '-frames:v', '1', '-c:v', 'libwebp', '-q:v', '72',
      '-compression_level', '5', '-map_metadata', '-1', output,
    ])
    completed += 1
    process.stdout.write(`\rVariantes responsivas: ${completed}/${totalJobs}`)
  }
}

await Promise.all(Array.from({ length: 4 }, worker))
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
process.stdout.write('\n')
