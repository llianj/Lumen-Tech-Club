
const LOGO_CLARO = '/logo-colorida.svg'
const LOGO_ESCURO = '/logo-branca.svg'

const aviso = (e) => {
  console.warn('Logo não encontrada:', e.currentTarget.getAttribute('src'))
  e.currentTarget.style.display = 'none'
}

export default function Logo({ size = 40, texto = true }) {
  const estilo = { '--logo-h': `${size}px` }
  return (
    <span className="logo" style={estilo}>
      <img className="logo-img logo-light" src={LOGO_CLARO} alt="" onError={aviso} />
      <img className="logo-img logo-dark" src={LOGO_ESCURO} alt="" onError={aviso} />
      {texto && <span className="logo-text">LÚMEN<br />TECH CLUB</span>}
    </span>
  )
}
