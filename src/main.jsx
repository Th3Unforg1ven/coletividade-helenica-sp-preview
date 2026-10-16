import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/gfs-didot/latin-400.css'
import '@fontsource/gfs-didot/greek-400.css'
import '@fontsource/gfs-didot/greek-ext-400.css'
import App from './App.jsx'
import { PhotoGalleryProvider } from './components/PhotoGallery.jsx'
import './styles.css'
import './mobile.css'

// Keep previously shared hash links working after moving to ordinary page URLs.
if (window.location.hash.startsWith('#/')) {
  const destination = window.location.hash.slice(1)
  window.history.replaceState(
    null,
    '',
    `${import.meta.env.BASE_URL.replace(/\/$/, '')}${destination}`,
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <PhotoGalleryProvider>
      <App />
    </PhotoGalleryProvider>
  </BrowserRouter>,
)
