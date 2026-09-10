import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { ContentProvider } from './content/ContentContext.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'

// Don't let the browser restore the previous scroll position on reload / back —
// with lazy-loaded pages it restores before the content exists and lands on the
// footer. <ScrollToTop> handles in-app navigation.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LazyMotion features={domAnimation} strict>
        <AuthProvider>
          <ContentProvider>
            <App />
          </ContentProvider>
        </AuthProvider>
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>,
)
