import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { services } from '../data/services'
import { useGoToContact } from '../hooks/useGoToContact'
import Icon from './Icon'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const goToContact = useGoToContact()

  const links = [
    { to: '/', label: t('nav.home') },
    ...services.map((s) => ({ to: `/services/${s.slug}`, label: t(`services.${s.slug}.title`) })),
  ]

  const close = () => setOpen(false)
  const contact = () => {
    close()
    goToContact()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-graphite/10 bg-surface/90 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" onClick={close} aria-label={t('nav.logoAlt')} className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  `relative rounded-md px-3 py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors ${
                    isActive
                      ? 'text-graphite after:bg-accent'
                      : 'text-muted after:bg-transparent hover:text-graphite'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={contact}
            className="hidden rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-graphite transition-colors hover:bg-accent-dark sm:block"
          >
            {t('nav.contact')}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="rounded-lg p-2 text-graphite hover:bg-background xl:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-graphite/10 bg-surface xl:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  onClick={close}
                  className={({ isActive }) =>
                    `block rounded-lg border-l-4 px-4 py-3 font-semibold ${
                      isActive
                        ? 'border-accent bg-background text-graphite'
                        : 'border-transparent text-muted hover:bg-background hover:text-graphite'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <button
                type="button"
                onClick={contact}
                className="w-full rounded-lg bg-accent px-4 py-3 font-bold text-graphite hover:bg-accent-dark"
              >
                {t('nav.contact')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
