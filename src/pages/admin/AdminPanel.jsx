import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import CrudManager from '../../components/admin/CrudManager.jsx'
import UsuariosAdmin from '../../components/admin/UsuariosAdmin.jsx'
import { abas } from './config.js'

const ADMINS = 'admins'

export default function AdminPanel() {
  const { user, sair } = useAuth()
  const [aba, setAba] = useState(abas[0].chave)
  const atual = abas.find((a) => a.chave === aba)

  return (
    <div className="container admin-wrap">
      <div className="admin-card">
        <header className="admin-top">
          <div><p className="eyebrow">PAINEL DO ADMINISTRADOR</p><p className="mono">{user.email}</p></div>
          <div className="admin-actions">
            <Link to="/" className="btn btn-sm">Ver site</Link>
            <button className="btn btn-sm" onClick={sair}>Sair</button>
          </div>
        </header>
        <nav className="admin-tabs">
          {abas.map((a) => (
            <button key={a.chave} className={a.chave === aba ? 'on' : ''} onClick={() => setAba(a.chave)}>{a.rotulo}</button>
          ))}
          <button className={aba === ADMINS ? 'on' : ''} onClick={() => setAba(ADMINS)}>Admins</button>
        </nav>
      </div>
      {aba === ADMINS
        ? <UsuariosAdmin />
        : <CrudManager key={atual.chave} colecao={atual.chave} {...atual} />}
    </div>
  )
}
