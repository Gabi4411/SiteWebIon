// Small inline stroke icons, so we don't need an icon library.
const paths = {
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  arrowLeft: 'M19 12H5M11 6l-6 6 6 6',
  check: 'M5 12.5l4.5 4.5L19 7',
  phone:
    'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  whatsapp:
    'M20 11.5a8 8 0 01-11.8 7L4 20l1.5-4.1A8 8 0 1120 11.5zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1a4 4 0 01-2-2l1-1-1-2z',
  pin: 'M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  floor: 'M3 20h18M3 16h18M3 12h18M8 12v4M15 16v4M12 20v-4M17 12v4M6 16v4',
  tiles: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  plaster: 'M4 5h11v5H4zM15 7.5h3v5h-7v8M9 20.5h4',
  paint: 'M5 4h12v5H5zM17 6.5h2v5h-8v3M10 14.5h2V21h-2z',
  wall: 'M3 5h18v14H3zM3 9.5h18M3 14.5h18M9 5v4.5M15 5v4.5M6 9.5v5M12 9.5v5M18 9.5v5M9 14.5V19M15 14.5V19',
} as const

export type IconName = keyof typeof paths

export default function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
