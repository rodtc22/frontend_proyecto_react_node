import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './layouts/utils/ThemeContext.jsx'
// import './index.css'

import { HashRouter, BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* USAR EL THEME PROVIDER, HABILITA EL MODO CLARO O MODO OSCURO */}
    <ThemeProvider> 
      <App />
    </ThemeProvider>
  </BrowserRouter>,
)
