import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../lib/firebase.js'

const chave = (nome) => `lumen-cache-${nome}`
export const ordenar = (lista, k) => [...lista].sort((a, b) => (a[k] ?? 0) - (b[k] ?? 0))

function lerCache(nome) {
  try { const c = localStorage.getItem(chave(nome)); return c ? JSON.parse(c) : null } catch { return null }
}
function gravarCache(nome, lista) {
  try {
    if (lista) localStorage.setItem(chave(nome), JSON.stringify(lista))
    else localStorage.removeItem(chave(nome))
  } catch { /* sem cache, tudo bem */ }
}

// Lê uma coleção do Firestore. Enquanto carrega (ou se falhar / estiver vazia)
// usa os dados padrão de src/data/, então o site nunca fica em branco.
export function useContent(nome, padrao, ordenarPor = 'ordem') {
  const [itens, setItens] = useState(() => lerCache(nome) ?? padrao)

  useEffect(() => {
    if (!db) return undefined
    let vivo = true
    getDocs(collection(db, nome))
      .then((snap) => {
        if (!vivo) return
        if (snap.empty) { gravarCache(nome, null); setItens(padrao); return }
        const lista = ordenar(snap.docs.map((d) => ({ id: d.id, ...d.data() })), ordenarPor)
        gravarCache(nome, lista)
        setItens(lista)
      })
      .catch((e) => console.warn(`Não foi possível ler "${nome}" do Firestore:`, e.message))
    return () => { vivo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, ordenarPor])

  return itens
}
