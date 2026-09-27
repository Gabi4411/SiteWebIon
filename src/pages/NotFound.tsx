import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <section className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="text-7xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">{t('notFound.title')}</h1>
      <p className="mt-3 text-muted">{t('notFound.text')}</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 font-bold text-graphite hover:bg-accent-dark"
      >
        {t('notFound.back')}
      </Link>
    </section>
  )
}
