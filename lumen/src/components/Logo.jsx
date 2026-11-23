// Salve o logo real em public/logo.png. Se não existir, mostra só o texto.
export default function Logo({ size = 40, texto = true }) {
  return (
    <span className="logo">
      <img src="/logo.png" alt="" width={size} height={size} onError={(e) => (e.currentTarget.style.display = 'none')} />
      {texto && <span className="logo-text">LÚMEN<br />TECH CLUB</span>}
    </span>
  )
}
