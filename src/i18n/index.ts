import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import de from './locales/de.json'
import en from './locales/en.json'
import ro from './locales/ro.json'

export const languages = [
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'ro', label: 'RO', name: 'Română' },
  { code: 'en', label: 'EN', name: 'English' },
] as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      ro: { translation: ro },
      en: { translation: en },
    },
    // German is the default; only a language the visitor picked before overrides it.
    fallbackLng: 'de',
    supportedLngs: languages.map((l) => l.code),
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng
  document.title = i18n.t('meta.title')
}
syncHtmlLang(i18n.resolvedLanguage ?? 'de')
i18n.on('languageChanged', syncHtmlLang)

export default i18n
