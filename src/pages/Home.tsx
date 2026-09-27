import { useTranslation } from 'react-i18next'
import ContactSection from '../components/ContactSection'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { imageUrl, serviceImages, services } from '../data/services'
import { useGoToContact } from '../hooks/useGoToContact'

type Stat = { value: string; label: string }
type Step = { title: string; text: string }

// A mix of photos from all services for the "Recent projects" grid.
const recentWork = services.flatMap((s, i) => serviceImages(s.slug)[(i % 3) + 1]).concat(serviceImages('tiles')[0])

export default function Home() {
  const { t } = useTranslation()
  const goToContact = useGoToContact()
  const stats = t('about.stats', { returnObjects: true }) as Stat[]
  const steps = t('process.steps', { returnObjects: true }) as Step[]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-graphite text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {t('hero.eyebrow')}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">{t('hero.subtitle')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goToContact}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-bold text-graphite transition-colors hover:bg-accent-dark"
              >
                {t('hero.ctaQuote')} <Icon name="arrow" className="h-4 w-4" />
              </button>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault() // HashRouter uses the URL hash for routing
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="rounded-lg px-6 py-3.5 font-bold text-white ring-1 ring-white/30 transition hover:bg-white/10"
              >
                {t('hero.ctaServices')}
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={imageUrl('hero.jpg')}
              alt={t('hero.imageAlt')}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl bg-accent px-5 py-3 font-bold text-graphite shadow-lg">
              <Icon name="check" /> {t('hero.badge')}
            </div>
          </div>
        </div>
        <div className="h-2 bg-accent" />
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading title={t('services.title')} subtitle={t('services.subtitle')} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
          <div className="flex flex-col justify-between gap-6 rounded-xl bg-graphite p-8 text-white">
            <div>
              <h3 className="text-2xl font-extrabold">{t('services.ctaTitle')}</h3>
              <p className="mt-3 text-white/70">{t('services.ctaText')}</p>
            </div>
            <button
              type="button"
              onClick={goToContact}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-accent px-5 py-3 font-bold text-graphite transition-colors hover:bg-accent-dark"
            >
              {t('hero.ctaQuote')} <Icon name="arrow" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <img
            src={imageUrl('about.jpg')}
            alt={t('about.imageAlt')}
            loading="lazy"
            className="aspect-[10/11] w-full max-w-lg rounded-2xl object-cover"
          />
          <div>
            <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} subtitle={t('about.text')} />
            <dl className="grid grid-cols-3 gap-4 border-t border-graphite/10 pt-8">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="order-first text-3xl font-extrabold sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow={t('process.eyebrow')} title={t('process.title')} />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-xl bg-surface p-6 ring-1 ring-graphite/5">
              <span className="text-5xl font-extrabold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Recent work */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24">
        <SectionHeading eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
        <Gallery images={recentWork} featured />
      </section>

      <ContactSection />
    </>
  )
}
