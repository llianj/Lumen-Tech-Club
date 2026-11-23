import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Sobre from './pages/Sobre.jsx'
import Leituras from './pages/Leituras.jsx'
import FAQ from './pages/FAQ.jsx'
import Contato from './pages/Contato.jsx'

function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
  window.scrollTo(0, 0)
}, [pathname])
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/leituras" element={<Leituras />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
