export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-dark">
          <span className="h-0.5 w-8 bg-accent" />
          <span className={light ? 'text-accent' : ''}>{eyebrow}</span>
        </p>
      )}
      <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-graphite'}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-4 text-lg ${light ? 'text-white/70' : 'text-muted'}`}>{subtitle}</p>}
    </div>
  )
}
