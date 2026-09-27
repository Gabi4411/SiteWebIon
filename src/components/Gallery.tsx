import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './Icon'

// Photo grid; clicking a photo opens it full screen (arrow keys / Esc supported).
// `featured` makes the first photo large — looks best with 6 photos; otherwise use an even count.
export default function Gallery({ images, featured = false }: { images: string[]; featured?: boolean }) {
  const { t } = useTranslation()
  const [active, setActive] = useState<number | null>(null)

  // On the 2-column mobile grid, stretch a lone last photo to full width.
  const smallCount = featured ? images.length - 1 : images.length
  const isOrphan = (i: number) => smallCount % 2 === 1 && i === images.length - 1 && !(featured && i === 0)

  const show = (delta: number) =>
    setActive((i) => (i === null ? i : (i + delta + images.length) % images.length))

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') show(1)
      if (e.key === 'ArrowLeft') show(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  })

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${featured ? 'lg:grid-cols-3' : ''}`}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`group overflow-hidden rounded-xl focus-visible:outline-3 focus-visible:outline-accent ${
              featured && i === 0 ? 'col-span-2 lg:row-span-2' : ''
            } ${isOrphan(i) ? 'col-span-2 lg:col-span-1' : ''}`}
          >
            <img
              src={src}
              alt={t('gallery.imageAlt', { n: i + 1 })}
              loading="lazy"
              className="aspect-[3/2] h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-dark/95 p-4"
          onClick={() => setActive(null)}
        >
          <img
            src={images[active]}
            alt={t('gallery.imageAlt', { n: active + 1 })}
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label={t('gallery.close')}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <Icon name="close" />
          </button>
          {[
            { delta: -1, icon: 'arrowLeft' as const, label: t('gallery.previous'), side: 'left-4' },
            { delta: 1, icon: 'arrow' as const, label: t('gallery.next'), side: 'right-4' },
          ].map((b) => (
            <button
              key={b.delta}
              type="button"
              aria-label={b.label}
              onClick={(e) => {
                e.stopPropagation()
                show(b.delta)
              }}
              className={`absolute bottom-6 rounded-full bg-accent p-3 text-graphite hover:bg-accent-dark sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${b.side}`}
            >
              <Icon name={b.icon} />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
