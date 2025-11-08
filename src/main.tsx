import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConfirmacaoPage from './pages/ConfirmacaoPage.jsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/confirmacao" element={<ConfirmacaoPage/>} />
    </Routes>
  </BrowserRouter>
)
