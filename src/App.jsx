import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Sobre from './pages/Sobre.jsx'
import Leituras from './pages/Leituras.jsx'
import FAQ from './pages/FAQ.jsx'
import Contato from './pages/Contato.jsx'
import HeIsBehindTheTree from './pages/HeIsBehindTheTree.jsx'

const AdminArea = lazy(() => import('./pages/admin/AdminArea.jsx'))

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
      </Route>
      <Route path="/admin/*" element={<Suspense fallback={null}><AdminArea /></Suspense>} />
      <Route path="*" element={<HeIsBehindTheTree />} />
    </Routes>
  )
}
