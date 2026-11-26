import { site } from '../data/site.js'

export default function InstagramLink({ className = '' }) {
  return (
    <a
      className={`instagram-link ${className}`.trim()}
      href={site.instagramUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Instagram: @${site.instagram}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span>@{site.instagram}</span>
    </a>
  )
}
