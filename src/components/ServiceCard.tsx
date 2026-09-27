import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { serviceImages, type Service } from '../data/services'
import Icon from './Icon'

export default function ServiceCard({ service }: { service: Service }) {
  const { t } = useTranslation()
  const key = `services.${service.slug}`

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-surface shadow-sm ring-1 ring-graphite/5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={serviceImages(service.slug)[0]}
          alt={t(`${key}.title`)}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-lg bg-accent text-graphite shadow">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{t(`${key}.title`)}</h3>
        <p className="mt-2 flex-1 text-muted">{t(`${key}.short`)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-graphite">
          {t('services.learnMore')}
          <Icon name="arrow" className="h-4 w-4 text-accent-dark transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
