import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { isFormDemoMode, siteConfig } from '../config'
import { services } from '../data/services'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Contact info + quote form. The form posts straight to Web3Forms (no own backend).
export default function ContactSection({ defaultService = '' }: { defaultService?: string }) {
  const { t, i18n } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const validate = (data: FormData): Errors => {
    const value = (field: string) => String(data.get(field) ?? '').trim()
    const found: Errors = {}
    if (!value('name')) found.name = t('contact.form.required')
    if (!value('email')) found.email = t('contact.form.required')
    else if (!EMAIL_RE.test(value('email'))) found.email = t('contact.form.invalidEmail')
    if (!value('message')) found.message = t('contact.form.required')
    return found
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot filled in → a spam bot

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    try {
      if (isFormDemoMode) {
        await new Promise((resolve) => setTimeout(resolve, 800))
      } else {
        data.append('access_key', siteConfig.web3formsAccessKey)
        data.append('subject', `${t('contact.form.subject')} (${i18n.resolvedLanguage?.toUpperCase()})`)
        data.append('from_name', siteConfig.companyName)
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
        const json = await res.json()
        if (!json.success) throw new Error(json.message)
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (invalid: boolean) =>
    `mt-1.5 w-full rounded-lg border bg-background px-4 py-3 text-graphite outline-none transition focus:bg-surface focus:ring-2 focus:ring-accent ${
      invalid ? 'border-red-600' : 'border-graphite/15'
    }`

  const field = (name: keyof Errors | 'phone', type = 'text', autoComplete?: string) => (
    <label className="block">
      <span className="text-sm font-semibold">{t(`contact.form.${name}`)}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={name in errors}
        className={inputClass(name in errors)}
      />
      {name !== 'phone' && errors[name] && <span className="mt-1 block text-sm text-red-600">{errors[name]}</span>}
    </label>
  )

  const channels = [
    { href: `tel:${siteConfig.phoneHref}`, icon: 'phone' as const, label: t('contact.call'), detail: siteConfig.phoneDisplay },
    { href: `mailto:${siteConfig.email}`, icon: 'mail' as const, label: t('contact.write'), detail: siteConfig.email },
    { href: `https://wa.me/${siteConfig.whatsappNumber}`, icon: 'whatsapp' as const, label: t('contact.whatsapp'), detail: siteConfig.phoneDisplay },
  ]

  return (
    <section id="contact" className="bg-graphite py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} subtitle={t('contact.subtitle')} light />
          <ul className="space-y-3">
            {channels.map((c) => (
              <li key={c.icon}>
                <a
                  href={c.href}
                  target={c.icon === 'whatsapp' ? '_blank' : undefined}
                  rel={c.icon === 'whatsapp' ? 'noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-xl bg-white/5 p-4 text-white ring-1 ring-white/10 transition hover:bg-white/10"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent text-graphite">
                    <Icon name={c.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold">{c.label}</span>
                    <span className="block truncate text-sm text-white/60">{c.detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-start gap-3 text-sm text-white/60">
            <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {t('contact.area')}
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-surface p-6 shadow-xl sm:p-8 lg:col-span-3"
        >
          {isFormDemoMode && (
            <p className="rounded-lg bg-accent/15 px-4 py-2.5 text-sm font-medium text-graphite">
              {t('contact.form.demoNotice')}
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            {field('name', 'text', 'name')}
            {field('email', 'email', 'email')}
            {field('phone', 'tel', 'tel')}
            <label className="block">
              <span className="text-sm font-semibold">{t('contact.form.service')}</span>
              {/* key forces the default to re-apply when navigating between service pages */}
              <select key={defaultService} name="service" defaultValue={defaultService} className={inputClass(false)}>
                <option value="">{t('contact.form.servicePlaceholder')}</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {t(`services.${s.slug}.title`)}
                  </option>
                ))}
                <option value="other">{t('contact.form.other')}</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold">{t('contact.form.message')}</span>
            <textarea
              name="message"
              rows={5}
              placeholder={t('contact.form.messagePlaceholder')}
              aria-invalid={'message' in errors}
              className={inputClass('message' in errors)}
            />
            {errors.message && <span className="mt-1 block text-sm text-red-600">{errors.message}</span>}
          </label>
          {/* Honeypot: hidden from people, bots fill it in */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-bold text-graphite transition-colors hover:bg-accent-dark disabled:opacity-60 sm:w-auto"
          >
            {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
            <Icon name="arrow" className="h-4 w-4" />
          </button>

          <div aria-live="polite">
            {status === 'success' && (
              <p className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                <Icon name="check" /> {t('contact.form.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{t('contact.form.error')}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
