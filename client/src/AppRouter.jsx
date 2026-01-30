import { useEffect, useRef, useState } from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'
import WhyUs from './pages/WhyUs.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import NotFound from './pages/NotFound.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

export default function AppRouter() {
  const navbarRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  })

  useEffect(() => {
    const onScroll = () => {
      const navbar = navbarRef.current
      if (!navbar) return
      const currentScroll = window.pageYOffset
      if (currentScroll > 50) {
        navbar.classList.add('shadow-lg', 'bg-drip-bg/80')
      } else {
        navbar.classList.remove('shadow-lg', 'bg-drip-bg/80')
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div>
      <nav ref={navbarRef} className="fixed w-full z-50 glass-strong transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-drip-cyan to-drip-purple flex items-center justify-center glow-cyan">
                <i data-lucide="hexagon" className="w-6 h-6 text-black"></i>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Drip<span className="text-drip-cyan">Nodes</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Home</Link>
              <Link to="/pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</Link>
              <Link to="/why-us" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Why Us</Link>
              <a href="/#dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Dashboard</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/pricing" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-drip-cyan to-blue-500 text-black font-semibold text-sm hover:opacity-90 transition-opacity glow-cyan">
                Get Started
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileOpen(o => !o)} className="text-slate-300 hover:text-white p-2">
                <i data-lucide="menu" className="w-6 h-6"></i>
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden glass-strong border-t border-white/5 ${mobileOpen ? '' : 'hidden'}`}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link to="/why-us" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setMobileOpen(false)}>Why Us</Link>
            <Link to="/privacy-policy" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setMobileOpen(false)}>Privacy Policy</Link>
            <Link to="/terms-of-service" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setMobileOpen(false)}>Terms of Service</Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Link to="/pricing" className="text-center px-3 py-2 rounded-lg bg-gradient-to-r from-drip-cyan to-blue-500 text-black font-semibold" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>

      <footer className="border-t border-white/5 bg-drip-surface pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-drip-cyan to-drip-purple flex items-center justify-center">
                  <i data-lucide="hexagon" className="w-5 h-5 text-black"></i>
                </div>
                <span className="text-xl font-bold text-white">Drip<span className="text-drip-cyan">Nodes</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Premium Minecraft hosting infrastructure designed for performance, reliability, and scale.
              </p>
              <div className="flex space-x-4"></div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link to="/pricing" className="hover:text-drip-cyan transition-colors">Pricing</Link></li>
                <li><Link to="/why-us" className="hover:text-drip-cyan transition-colors">Why Us</Link></li>
                <li><a href="#" className="hover:text-drip-cyan transition-colors">Status Page</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-drip-cyan transition-colors">Documentation</a></li>
                <li><a href="https://discord.gg/D4jfYPj2Az" target="_blank" rel="noopener noreferrer" className="hover:text-drip-cyan transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-drip-cyan transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">© 2024 DripNodes. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-slate-500">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
