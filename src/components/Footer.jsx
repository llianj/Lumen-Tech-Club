import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import InstagramLink from './InstagramLink.jsx'
import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div><Logo /><p className="mono">Leia. Discuta. Evolua.</p></div>
        <nav className="footer-links">
          <Link to="/sobre">Sobre</Link><Link to="/leituras">Leituras</Link>
          <Link to="/faq">FAQ</Link><Link to="/contato">Contato</Link>
        </nav>
        <p className="mono">
          <InstagramLink /><br />
          © {new Date().getFullYear()} {site.nome}
        </p>
      </div>
    </footer>
  )
}
