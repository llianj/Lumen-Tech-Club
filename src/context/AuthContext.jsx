import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { app } from '../lib/firebase.js'

const auth = app ? getAuth(app) : null
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setCarregando(false) }), [])

  const valor = {
    user,
    carregando,
    entrar: (email, senha) => signInWithEmailAndPassword(auth, email, senha),
    sair: () => signOut(auth),
  }
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
