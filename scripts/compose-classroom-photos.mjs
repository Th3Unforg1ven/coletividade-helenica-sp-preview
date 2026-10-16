import fs from 'node:fs'
// SVG viewports compose unaltered photographs, excluding the meeting UI.
const sets = [
  {
    name: 'turma-grego-encontro-1',
    file: 'fe0620d728-whatsapp-image-2021-05-14-at-09-23-51-1024x547.webp',
    w: 1024,
    h: 547,
    cols: 4,
    tiles: [
      [3, 90, 203, 112],
      [208, 90, 202, 131],
      [412, 90, 202, 131],
      [616, 90, 203, 131],
      [821, 90, 201, 131],
      [3, 224, 203, 131],
      [208, 224, 202, 131],
      [412, 224, 202, 131],
      [617, 224, 202, 131],
      [120, 357, 262, 132],
      [384, 357, 262, 132],
      [648, 357, 260, 132],
    ],
  },
  {
    name: 'turma-grego-encontro-2',
    file: 'fdd133abe4-whatsapp-image-2021-05-14-at-09-10-56-1024x514.webp',
    w: 1024,
    h: 514,
    cols: 4,
    tiles: [
      [2, 2, 254, 184],
      [260, 2, 255, 184],
      [519, 42, 253, 143],
      [777, 42, 245, 143],
      [2, 219, 254, 180],
      [260, 219, 255, 180],
      [519, 219, 253, 180],
      [777, 219, 245, 180],
    ],
  },
  {
    name: 'turma-grego-encontro-3',
    file: 'cd1cf2b27b-auladegrego-1024x543.webp',
    w: 1024,
    h: 543,
    cols: 2,
    tiles: [
      [85, 54, 428, 189],
      [516, 87, 427, 156],
      [85, 273, 428, 189],
      [516, 273, 415, 189],
    ],
  },
]
fs.mkdirSync('public/images/aulas', { recursive: true })
for (const s of sets) {
  const data = fs.readFileSync('public/images/archive/' + s.file).toString('base64')
  const tw = 240,
    th = 160,
    gap = 4
  const width = s.cols * tw + (s.cols - 1) * gap,
    height = Math.ceil(s.tiles.length / s.cols) * (th + gap) - gap
  const tiles = s.tiles
    .map(
      ([x, y, w, h], i) =>
        `<svg x="${(i % s.cols) * (tw + gap)}" y="${Math.floor(i / s.cols) * (th + gap)}" width="${tw}" height="${th}" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="xMidYMid slice" overflow="hidden"><use href="#photo"/></svg>`,
    )
    .join('')
  fs.writeFileSync(
    `public/images/aulas/${s.name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><title>Participantes de uma aula de grego por videochamada</title><defs><image id="photo" width="${s.w}" height="${s.h}" href="data:image/webp;base64,${data}"/></defs>${tiles}</svg>`,
  )
}
