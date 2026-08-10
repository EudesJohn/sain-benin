import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import SocialResponsibility from './pages/SocialResponsibility'
import Activities from './pages/Activities'
import Team from './pages/Team'
import Formations from './pages/Formations'
import Accommodation from './pages/Accommodation'
import Restaurant from './pages/Restaurant'
import Circuits from './pages/Circuits'
import Production from './pages/Production'
import Support from './pages/Support'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import LegalMentions from './pages/LegalMentions'
import BackToTop from './components/BackToTop'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projet-global" element={<About />} />
          <Route path="/responsabilite-sociale" element={<SocialResponsibility />} />
          <Route path="/activites-sain" element={<Activities />} />
          <Route path="/equipe-sain" element={<Team />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/hebergement-ferme" element={<Accommodation />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/circuits-decouverte" element={<Circuits />} />
          <Route path="/production" element={<Production />} />
          <Route path="/nous-soutenir" element={<Support />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalMentions />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
