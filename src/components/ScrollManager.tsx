import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// On page change: jump to top, or to a section requested via navigation state.
export default function ScrollManager() {
  const { pathname, state } = useLocation()
  const target = (state as { scrollTo?: string } | null)?.scrollTo

  useEffect(() => {
    const section = target ? document.getElementById(target) : null
    if (section) section.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0 })
  }, [pathname, target])

  return null
}
