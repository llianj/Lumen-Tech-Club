import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, writeBatch } from 'firebase/firestore/lite'
import { db } from '../lib/firebase.js'

export async function listar(nome) {
  const snap = await getDocs(collection(db, nome))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
export async function salvar(nome, id, dados) {
  if (id) await setDoc(doc(db, nome, id), dados)
  else await addDoc(collection(db, nome), dados)
}
export const remover = (nome, id) => deleteDoc(doc(db, nome, id))
export async function importar(nome, itens) {
  const lote = writeBatch(db)
  itens.forEach((it) => lote.set(doc(collection(db, nome)), it))
  await lote.commit()
}
