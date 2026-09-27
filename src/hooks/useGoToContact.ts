import { useNavigate } from 'react-router-dom'

// Scrolls to the #contact section on the current page, or goes to Home and scrolls there.
export function useGoToContact() {
  const navigate = useNavigate()
  return () => {
    const section = document.getElementById('contact')
    if (section) section.scrollIntoView({ behavior: 'smooth' })
    else navigate('/', { state: { scrollTo: 'contact' } })
  }
}
