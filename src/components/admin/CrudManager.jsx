import { useEffect, useState } from 'react'
import { importar, listar, remover, salvar } from '../../services/adminService.js'
import { ordenar } from '../../services/content.js'
import ImageField from './ImageField.jsx'

const textoErro = (e) =>
  e.code === 'permission-denied'
    ? 'Sem permissão. Confira as regras do Firestore e se o UID do administrador está nelas.'
    : e.message

export default function CrudManager({ colecao, titulo, campos, ordenarPor, padrao, resumo, novo = {} }) {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [form, setForm] = useState(null)
  const [msg, setMsg] = useState(null)
  const [ocupado, setOcupado] = useState(false)

  async function carregar() {
    setCarregando(true)
    try { setItens(ordenar(await listar(colecao), ordenarPor)) } catch (e) { setMsg({ t: 'err', m: textoErro(e) }) }
    setCarregando(false)
  }
  useEffect(() => { carregar() }, [colecao]) // eslint-disable-line react-hooks/exhaustive-deps

  const proximaOrdem = () => Math.max(0, ...itens.map((i) => Number(i[ordenarPor]) || 0)) + 1
  const abrirNovo = () => { setMsg(null); setForm({ ...novo, [ordenarPor]: proximaOrdem() }) }
  const set = (nome, valor) => setForm((f) => ({ ...f, [nome]: valor }))

  async function aoSalvar(e) {
    e.preventDefault()
    const falta = campos.find((c) => c.obrigatorio && !String(form[c.nome] ?? '').trim())
    if (falta) return setMsg({ t: 'err', m: `Preencha o campo: ${falta.rotulo}` })
    setOcupado(true)
    try {
      const { id, ...dados } = form
      campos.filter((c) => c.tipo === 'numero').forEach((c) => { dados[c.nome] = Number(dados[c.nome]) || 0 })
      await salvar(colecao, id, dados)
      setForm(null)
      setMsg({ t: 'ok', m: 'Salvo! O site já mostra a alteração.' })
      await carregar()
    } catch (err) { setMsg({ t: 'err', m: textoErro(err) }) }
    setOcupado(false)
  }

  async function aoExcluir(item) {
    if (!window.confirm(`Excluir "${resumo(item)}"? Isso não pode ser desfeito.`)) return
    try { await remover(colecao, item.id); setMsg({ t: 'ok', m: 'Excluído.' }); await carregar() }
    catch (err) { setMsg({ t: 'err', m: textoErro(err) }) }
  }

  async function aoImportar() {
    setOcupado(true)
    try {
      await importar(colecao, padrao.map((p, i) => ({ ...p, [ordenarPor]: p[ordenarPor] ?? i + 1 })))
      setMsg({ t: 'ok', m: 'Dados atuais do site importados.' })
      await carregar()
    } catch (err) { setMsg({ t: 'err', m: textoErro(err) }) }
    setOcupado(false)
  }

  const campoImagem = campos.find((c) => c.tipo === 'imagem')

  return (
    <section>
      <div className="admin-head">
        <h2>{titulo}</h2>
        {!form && <button className="btn btn-green" onClick={abrirNovo}>+ Adicionar</button>}
      </div>
      {msg && <p className={`msg ${msg.t}`}>{msg.m}</p>}

      {form ? (
        <form className="card form admin-form" onSubmit={aoSalvar}>
          <h3>{form.id ? 'Editar' : 'Novo item'}</h3>
          {campos.map((c) => (
            c.tipo === 'imagem' ? (
              <div key={c.nome} className="field"><span className="mono">{c.rotulo}</span>
                <ImageField valor={form[c.nome]} onChange={(v) => set(c.nome, v)} /></div>
            ) : (
              <label key={c.nome}>{c.rotulo}{c.obrigatorio && ' *'}
                {c.tipo === 'textarea' ? (
                  <textarea rows="4" value={form[c.nome] ?? ''} onChange={(e) => set(c.nome, e.target.value)} />
                ) : c.tipo === 'select' ? (
                  <select value={form[c.nome] ?? ''} onChange={(e) => set(c.nome, e.target.value)}>
                    {c.opcoes.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                ) : (
                  <input type={c.tipo === 'numero' ? 'number' : 'text'} value={form[c.nome] ?? ''}
                    onChange={(e) => set(c.nome, e.target.value)} />
                )}
              </label>
            )
          ))}
          <div className="admin-actions">
            <button className="btn btn-purple" disabled={ocupado}>{ocupado ? 'Salvando...' : 'Salvar'}</button>
            <button type="button" className="btn" onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </form>
      ) : carregando ? (
        <p>Carregando...</p>
      ) : itens.length === 0 ? (
        <div className="card">
          <p>Nada cadastrado ainda. Enquanto estiver vazio, o site mostra os dados padrão do código.</p>
          <button className="btn btn-purple" onClick={aoImportar} disabled={ocupado}>Importar os dados atuais do site</button>
        </div>
      ) : (
        <ul className="admin-list">
          {itens.map((item) => (
            <li key={item.id} className="card admin-item">
              {campoImagem && (item[campoImagem.nome]
                ? <img className="thumb mini" src={item[campoImagem.nome]} alt="" />
                : <div className="thumb mini vazio">—</div>)}
              <div className="admin-info"><strong>{resumo(item)}</strong></div>
              <div className="admin-actions">
                <button className="btn btn-sm" onClick={() => { setMsg(null); setForm(item) }}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => aoExcluir(item)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
