import { HashRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ServicePage from './pages/ServicePage'

// HashRouter: GitHub Pages has no server-side routing, so URLs look like /#/services/tiles.
export default function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
