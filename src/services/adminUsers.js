import { getApps, initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore/lite'
import { cfg, db } from '../lib/firebase.js'

export async function criarAdmin(email, senha) {
  const sec = getApps().find((a) => a.name === 'secundario') ?? initializeApp(cfg, 'secundario')
  const auth2 = getAuth(sec)
  let criado = false
  try {
    const { user } = await createUserWithEmailAndPassword(auth2, email, senha)
    criado = true
    await setDoc(doc(db, 'admins', user.uid), { email, criadoEm: Date.now() })
  } finally {
    if (criado) await signOut(auth2)
  }
}