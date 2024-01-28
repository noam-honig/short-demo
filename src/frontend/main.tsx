import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth from './Auth.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1>todos</h1>
    <Auth />
  </React.StrictMode>
)
