import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/gfs-didot/latin-400.css'
import '@fontsource/gfs-didot/greek-400.css'
import '@fontsource/gfs-didot/greek-ext-400.css'
import App from './App.jsx'
import './styles.css'

const Router = import.meta.env.VITE_ROUTER_MODE === 'hash' ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router><App /></Router>,
)
