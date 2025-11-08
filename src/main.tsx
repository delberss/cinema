import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConfirmacaoPage from './pages/ConfirmacaoPage.jsx'
import LoginPage from './pages/LoginPage.tsx'
import RegistroPage from './pages/RegistroPage.tsx'
import MeusIngressosPage from './pages/MeusIngressosPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/confirmacao" element={<ConfirmacaoPage/>} />
      <Route path="/meusingressos" element={<MeusIngressosPage />} />
    </Routes>
  </BrowserRouter>
)
