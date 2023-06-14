import React    from 'react'
import ReactDOM from 'react-dom/client'
import App      from './App.js'

import './styles/global.css'
import './styles/dark.css'

import { StoreProvider } from './context/DemoStore.js'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
