// Adding a service: add an entry here + `services.<slug>` texts in all 3 locale files.
export const services = [
  { slug: 'floors', icon: 'floor' },
  { slug: 'tiles', icon: 'tiles' },
  { slug: 'plaster', icon: 'plaster' },
  { slug: 'painting', icon: 'paint' },
  { slug: 'drywall', icon: 'wall' },
] as const

export type Service = (typeof services)[number]
export type ServiceSlug = Service['slug']

export const imageUrl = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export const serviceImages = (slug: string) =>
  [1, 2, 3, 4].map((n) => imageUrl(`${slug}-${n}.jpg`))

export const findService = (slug: string | undefined) => services.find((s) => s.slug === slug)
