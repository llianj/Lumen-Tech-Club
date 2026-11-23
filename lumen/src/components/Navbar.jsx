import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  ['/', 'Início'], ['/sobre', 'Sobre'], ['/leituras', 'Leituras'], ['/faq', 'FAQ'], ['/contato', 'Contato'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
          ))}
          <Link to="/contato" className="btn btn-purple" onClick={() => setOpen(false)}>Participe</Link>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button className="icon-btn burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        </div>
      </div>
    </header>
  )
}
