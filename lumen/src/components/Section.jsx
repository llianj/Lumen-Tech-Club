// tint: '' | 'purple' | 'green' | 'pink'
export default function Section({ tint = '', eyebrow, title, children, id }) {
  return (
    <section id={id} className={`section tint-${tint || 'none'}`}>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  )
}
