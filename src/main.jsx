import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './typography.css'
import { runSplash } from './splash/splash'

const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload'
const scrollToStart = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

if (isReload) {
  window.history.scrollRestoration = 'manual'
  // A section hash must not send a refreshed page back down the homepage.
  if (window.location.hash) {
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
  }
  scrollToStart()
  window.addEventListener('load', scrollToStart, { once: true })
}

runSplash({ onDone: () => {
  if (isReload) scrollToStart()
  window.dispatchEvent(new Event('brand-splash-done'))
  window.dispatchEvent(new Event('resize'))
} })
createRoot(document.getElementById('root')).render(<App />)
