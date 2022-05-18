import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Success from './Chart'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
