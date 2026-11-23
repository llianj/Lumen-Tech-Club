export default function Star({ size = 40, color = 'var(--coral)', className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0Z" fill={color} stroke="var(--ink)" strokeWidth="3" />
    </svg>
  )
}
