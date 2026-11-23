import { useState } from 'react'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <div key={it.q} className={`acc-item ${open === i ? 'open' : ''}`}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {it.q}<span>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p>{it.a}</p>}
        </div>
      ))}
    </div>
  )
}
