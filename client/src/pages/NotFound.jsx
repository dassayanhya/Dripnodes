import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full glass rounded-2xl p-8 border border-white/10 text-center">
        <div className="mx-auto w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
          <i data-lucide="alert-octagon" className="w-7 h-7 text-red-400"></i>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-slate-400 mb-6">The page you’re looking for doesn’t exist or was moved.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-drip-cyan to-blue-500 text-black font-semibold hover:opacity-90 transition-opacity glow-cyan">
            Go Home
          </Link>
          <Link to="/pricing" className="px-5 py-2.5 rounded-lg glass text-white font-semibold hover:bg-white/10 transition-all border border-white/10">
            View Plans
          </Link>
        </div>
      </div>
    </div>
  )
}
