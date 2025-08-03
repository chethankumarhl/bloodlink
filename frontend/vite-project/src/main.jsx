import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ApiProvider from './context/ApiProvider.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ApiProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </ApiProvider>
  </BrowserRouter>,
)
