import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Sem as variáveis, o site continua funcionando com os dados de src/data/.
export const firebaseOk = Boolean(cfg.apiKey && cfg.projectId && cfg.appId)
export const app = firebaseOk ? initializeApp(cfg) : null
export const db = app ? getFirestore(app) : null
