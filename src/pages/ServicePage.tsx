import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import ContactSection from '../components/ContactSection'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import { findService, serviceImages, services } from '../data/services'
import { useGoToContact } from '../hooks/useGoToContact'
import NotFound from './NotFound'

// One template for every service — content comes from data/services.ts + the locale files.
export default function ServicePage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const goToContact = useGoToContact()
  const service = findService(slug)

  if (!service) return <NotFound />

  const key = `services.${service.slug}`
  const title = t(`${key}.title`)
  const features = t(`${key}.features`, { returnObjects: true }) as string[]
  const images = serviceImages(service.slug)

  return (
    <>
      {/* Header banner */}
      <section className="relative isolate overflow-hidden bg-graphite text-white">
        <img src={images[0]} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-accent">
              {t('nav.home')}
            </Link>
            <span>/</span>
            <span>{t('servicePage.breadcrumb')}</span>
          </nav>
          <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-accent text-graphite">
            <Icon name={service.icon} className="h-8 w-8" />
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">{t(`${key}.short`)}</p>
        </div>
        <div className="h-2 bg-accent" />
      </section>

      {/* Description + included */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3">
        <p className="text-lg leading-relaxed text-graphite/85 lg:col-span-2">{t(`${key}.description`)}</p>
        <div className="rounded-xl bg-surface p-6 ring-1 ring-graphite/5">
          <h2 className="mb-4 font-bold">{t('servicePage.included')}</h2>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-muted">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-graphite">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={goToContact}
            className="mt-6 w-full rounded-lg bg-accent px-5 py-3 font-bold text-graphite transition-colors hover:bg-accent-dark"
          >
            {t('hero.ctaQuote')}
          </button>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="mb-6 text-2xl font-extrabold">{t('servicePage.gallery')}</h2>
        <Gallery images={images} />
      </section>

      {/* Other services */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted">{t('servicePage.otherServices')}</h2>
        <div className="flex flex-wrap gap-3">
          {services
            .filter((s) => s.slug !== service.slug)
            .map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-2.5 font-semibold ring-1 ring-graphite/10 transition hover:ring-accent"
              >
                <Icon name={s.icon} className="h-4 w-4 text-accent-dark" />
                {t(`services.${s.slug}.title`)}
              </Link>
            ))}
        </div>
      </section>

      <ContactSection defaultService={service.slug} />
    </>
  )
}
