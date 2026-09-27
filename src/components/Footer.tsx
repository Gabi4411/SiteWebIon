import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { siteConfig } from '../config'
import { services } from '../data/services'
import Icon from './Icon'
import Logo from './Logo'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-graphite-dark text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed">{t('footer.tagline')}</p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">{t('footer.services')}</h2>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-accent">
                  {t(`services.${s.slug}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">{t('footer.contact')}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-3 hover:text-accent">
                <Icon name="phone" className="h-4 w-4 text-accent" /> {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:text-accent">
                <Icon name="mail" className="h-4 w-4 text-accent" /> {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {t('contact.area')}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs sm:px-6">
          © {new Date().getFullYear()} {siteConfig.companyName}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
