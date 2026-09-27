import { siteConfig } from '../config'

// Placeholder logo — replace with the real one (e.g. an <img> of an SVG/PNG file).
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-graphite" aria-hidden="true">
          <path d="M3 12.5 12 4.5l9 8V20h-6v-5H9v5H3z" fill="currentColor" />
        </svg>
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-graphite'}`}>
        {siteConfig.companyName}
        <span className="text-accent">.</span>
      </span>
    </span>
  )
}
