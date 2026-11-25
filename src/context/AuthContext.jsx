import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { app } from '../lib/firebase.js'


const auth = app ? getAuth(app) : null
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setCarregando(false) }), [])
  useEffect(() => {
  if (!user) return undefined
  const LIMITE = 30 * 60 * 1000
  const eventos = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll']
  let t
  const reiniciar = () => { clearTimeout(t); t = setTimeout(() => signOut(auth), LIMITE) }
  eventos.forEach((e) => window.addEventListener(e, reiniciar, { passive: true }))
  reiniciar()
  return () => { clearTimeout(t); eventos.forEach((e) => window.removeEventListener(e, reiniciar)) }
}, [user])

  const valor = {
    user,
    carregando,
    entrar: (email, senha) => signInWithEmailAndPassword(auth, email, senha),
    sair: () => signOut(auth),
    recuperarSenha: (email) => sendPasswordResetEmail(auth, email),
  }
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
