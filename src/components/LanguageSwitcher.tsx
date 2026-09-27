import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={`flex rounded-lg p-1 text-xs font-bold ${dark ? 'bg-white/10' : 'bg-background'}`}
    >
      {languages.map((lang) => {
        const active = lang.code === current
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => i18n.changeLanguage(lang.code)}
            aria-pressed={active}
            title={lang.name}
            className={`rounded-md px-2.5 py-1.5 transition-colors ${
              active
                ? 'bg-graphite text-white shadow-sm'
                : dark
                  ? 'text-white/70 hover:text-white'
                  : 'text-muted hover:text-graphite'
            }`}
          >
            {lang.label}
          </button>
        )
      })}
    </div>
  )
}
