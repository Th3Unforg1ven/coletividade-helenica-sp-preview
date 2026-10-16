import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { PassThrough } from 'node:stream'
import App from './App.jsx'
import { PhotoGalleryProvider } from './components/PhotoGallery.jsx'

export function renderPage(pathname, basename) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough()
    const chunks = []
    output.on('data', (chunk) => chunks.push(chunk))
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    output.on('error', reject)
    const stream = renderToPipeableStream(
      <StaticRouter basename={basename} location={`${basename.replace(/\/$/, '')}${pathname}`}>
        <PhotoGalleryProvider>
          <App />
        </PhotoGalleryProvider>
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(output)
        },
        onError(error) {
          reject(error)
        },
      },
    )
  })
}
