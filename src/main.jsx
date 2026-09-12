import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GitHubProvider } from './context/GitHubContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GitHubProvider>
        <App />
      </GitHubProvider>
    </BrowserRouter>
  </StrictMode>,
)
