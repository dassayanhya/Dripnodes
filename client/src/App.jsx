import { useEffect, useRef, useState } from 'react'

export default function App() {
  const navbarRef = useRef(null)
  const canvasRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [period, setPeriod] = useState('monthly')

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  })

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, { root: null, rootMargin: '0px', threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width, height
    let particles = []

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }
      draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.5)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function initParticles() {
      particles = []
      const count = Math.min(window.innerWidth / 10, 100)
      for (let i = 0; i < count; i++) particles.push(new Particle())
    }

    let raf
    function animate() {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p, i) => {
        p.update()
        p.draw()
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })
      raf = requestAnimationFrame(animate)
    }

    const onResize = () => { resize(); initParticles() }
    window.addEventListener('resize', onResize)
    resize(); initParticles(); animate()
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div>
      <nav ref={navbarRef} className="fixed w-full z-50 glass-strong transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-drip-cyan to-drip-purple flex items-center justify-center glow-cyan">
                <i data-lucide="hexagon" className="w-6 h-6 text-black"></i>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Drip<span className="text-drip-cyan">Nodes</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</a>
              <a href="#why-us" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Why Us</a>
              <a href="#dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Dashboard</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#pricing" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-drip-cyan to-blue-500 text-black font-semibold text-sm hover:opacity-90 transition-opacity glow-cyan">
                Get Started
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileOpen(o => !o)} className="text-slate-300 hover:text-white p-2">
                <i data-lucide="menu" className="w-6 h-6"></i>
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden glass-strong border-t border-white/5 ${mobileOpen ? '' : 'hidden'}`} id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['features','pricing','why-us','dashboard'].map(id => (
              <a key={id} href={`#${id}`} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md" onClick={() => setMobileOpen(false)}>
                {id === 'why-us' ? 'Why Us' : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <a href="#pricing" className="text-center px-3 py-2 rounded-lg bg-gradient-to-r from-drip-cyan to-blue-500 text-black font-semibold">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <canvas ref={canvasRef} id="hero-canvas" className="absolute inset-0 w-full h-full opacity-30"></canvas>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-drip-cyan/20 rounded-full blur-[128px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-drip-purple/20 rounded-full blur-[128px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-8 border border-drip-cyan/20 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-drip-emerald mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-300">Now serving 10,000+ servers worldwide</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 reveal">
            <span className="text-gradient-subtle">Host Without</span><br/>
            <span className="text-gradient">Limits</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed reveal" style={{transitionDelay: '100ms'}}>
            Premium Minecraft infrastructure built for speed. Experience lag-free gameplay with enterprise-grade hardware and instant deployment.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 reveal" style={{transitionDelay: '200ms'}}>
            <a href="#pricing" className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-drip-cyan to-blue-500 text-black font-bold text-lg hover:opacity-90 transition-all glow-cyan flex items-center">
              Deploy Server
              <i data-lucide="arrow-right" className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
            </a>
            <a href="#features" className="px-8 py-4 rounded-xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center border border-white/10">
              View Plans
            </a>
          </div>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto reveal" style={{transitionDelay: '300ms'}}>
            {[
              ['99.99%', 'Uptime SLA'],
              ['<15ms', 'Latency'],
              ['24/7', 'Support'],
              ['12', 'Global Locations'],
            ].map(([value,label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Built for <span className="text-drip-cyan">Performance</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Enterprise-grade infrastructure optimized specifically for Minecraft servers. No compromises.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {icon:'cpu', title:'High-Performance Nodes', desc:'AMD Ryzen 9 7950X processors with NVMe SSDs. DDR5 memory for blazing fast chunk loading and world generation.', color:'drip-cyan'},
              {icon:'shield', title:'DDoS Protection', desc:'Advanced L7 DDoS mitigation with automatic threat detection. Your server stays online during attacks up to 1Tbps.', color:'drip-purple', delay:'100ms'},
              {icon:'zap', title:'Instant Setup', desc:'Deploy your server in seconds. Automated provisioning with pre-configured optimizations for Paper, Fabric, and Forge.', color:'drip-emerald', delay:'200ms'},
              {icon:'puzzle', title:'Mod & Plugin Support', desc:'One-click installer for 50,000+ mods and plugins. Auto-updates, dependency resolution, and version management.', color:'orange-400'},
              {icon:'globe', title:'Global Network', desc:'Strategic locations in NA, EU, Asia, and Oceania. Premium bandwidth with low-latency routing to major ISPs.', color:'blue-400', delay:'100ms'},
              {icon:'database', title:'Automated Backups', desc:'Hourly incremental backups with 30-day retention. One-click restore points and off-site redundancy.', color:'pink-400', delay:'200ms'},
            ].map((f, idx) => (
              <div key={idx} className="glass rounded-2xl p-8 hover-lift reveal group" style={{transitionDelay: f.delay}}>
                <div className={`w-14 h-14 rounded-xl bg-${f.color.replace('400','500')}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <i data-lucide={f.icon} className={`w-7 h-7 text-${f.color}`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-drip-surfaceLight to-drip-bg"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Transparent <span className="text-gradient">Pricing</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">No hidden fees. No arbitrary player limits. Pay for the resources you need.</p>
            <div className="inline-flex items-center p-1 rounded-xl glass">
              <button className={`pricing-toggle px-6 py-2 rounded-lg text-sm font-medium transition-all ${period==='monthly' ? 'active' : 'text-slate-400'}`} onClick={() => setPeriod('monthly')}>Monthly</button>
              <button className={`pricing-toggle px-6 py-2 rounded-lg text-sm font-medium transition-all ${period==='yearly' ? 'active' : 'text-slate-400'}`} onClick={() => setPeriod('yearly')}>Yearly <span className="text-drip-emerald text-xs ml-1">-20%</span></button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {name:'Starter', monthly:'$8', yearly:'$76', features:['4 GB DDR5 RAM','2 vCPU Cores (Ryzen 9)','20 GB NVMe Storage','Unlimited Players','Standard Support'], cta:'Get Started', highlight:false},
              {name:'Pro', monthly:'$16', yearly:'$153', features:['8 GB DDR5 RAM','4 vCPU Cores (Ryzen 9)','50 GB NVMe Storage','Unlimited Players','Priority Support','Free Dedicated IP'], cta:'Get Started', highlight:true},
              {name:'Enterprise', monthly:'$32', yearly:'$307', features:['16 GB DDR5 RAM','8 vCPU Cores (Ryzen 9)','100 GB NVMe Storage','Unlimited Players','24/7 Dedicated Support','Custom JAR Support'], cta:'Contact Sales', highlight:false},
            ].map(plan => (
              <div key={plan.name} className={`glass rounded-2xl p-8 hover-lift reveal border ${plan.highlight ? 'border-drip-cyan/30 glow-cyan transform md:-translate-y-4 relative' : 'border-white/5'}`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-drip-cyan to-blue-500 text-black text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold ${plan.highlight ? 'text-drip-cyan' : 'text-slate-300'} mb-2`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{period==='monthly' ? plan.monthly : plan.yearly}</span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{plan.highlight ? 'For growing communities' : plan.name==='Starter' ? 'Perfect for small SMPs' : 'Maximum performance'}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center text-slate-300 text-sm">
                      <i data-lucide="check" className="w-5 h-5 text-drip-cyan mr-3 flex-shrink-0"></i>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg ${plan.highlight ? 'bg-gradient-to-r from-drip-cyan to-blue-500 text-black font-bold hover:opacity-90 transition-opacity' : 'border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why server owners choose <span className="text-drip-cyan">DripNodes</span></h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                We're builders too. We understand that downtime kills communities and lag ruins gameplay. That's why we've engineered every aspect of our platform for reliability.
              </p>
              <div className="space-y-6">
                {[
                  {icon:'heart-handshake', title:'Community First', desc:'Built by Minecraft players, for Minecraft players. We actually play the game.', color:'drip-cyan'},
                  {icon:'gauge', title:'Obsessive Optimization', desc:"Custom kernel tweaks and JVM flags fine-tuned for Minecraft's unique workload.", color:'drip-purple'},
                  {icon:'headphones', title:'Real Human Support', desc:'Average response time under 5 minutes. No ticket robots, no canned responses.', color:'drip-emerald'},
                ].map((item, i)=>(
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-drip-cyan/10 flex items-center justify-center mr-4">
                      <i data-lucide={item.icon} className={`w-6 h-6 text-${item.color}`}></i>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative reveal" style={{transitionDelay: '200ms'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-drip-cyan/20 to-drip-purple/20 rounded-3xl blur-3xl"></div>
              <div className="relative glass rounded-2xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">server-status.log</span>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="terminal-line pl-4 py-2">
                    <span className="text-drip-cyan">[System]</span> <span className="text-slate-300">Allocating resources...</span>
                  </div>
                  <div className="pl-4 py-2"><span className="text-green-400">[OK]</span> <span className="text-slate-400">64GB DDR5 initialized</span></div>
                  <div className="pl-4 py-2"><span className="text-green-400">[OK]</span> <span className="text-slate-400">NVMe RAID mounted</span></div>
                  <div className="pl-4 py-2"><span className="text-green-400">[OK]</span> <span className="text-slate-400">Network interfaces up (10Gbps)</span></div>
                  <div className="pl-4 py-2"><span className="text-drip-purple">[Game]</span> <span className="text-slate-300">Starting Paper 1.20.4...</span></div>
                  <div className="pl-4 py-2"><span className="text-drip-purple">[Game]</span> <span className="text-slate-300">Loaded 1432 chunks in 120ms</span></div>
                  <div className="terminal-line pl-4 py-2 mt-4">
                    <span className="text-drip-cyan animate-pulse">➜</span> <span className="text-white">Server online • TPS 20.0 • 47 players</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                  <div><div className="text-2xl font-bold text-white">20.0</div><div className="text-xs text-slate-500 uppercase">TPS</div></div>
                  <div><div className="text-2xl font-bold text-drip-emerald">12ms</div><div className="text-xs text-slate-500 uppercase">Ping</div></div>
                  <div><div className="text-2xl font-bold text-drip-cyan">0%</div><div className="text-xs text-slate-500 uppercase">Packet Loss</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-drip-surface"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-drip-cyan/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Powerful <span className="text-gradient">Control</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Manage your server with our intuitive, lightning-fast control panel.</p>
          </div>
          <div className="relative reveal">
            <div className="absolute -inset-1 bg-gradient-to-r from-drip-cyan to-drip-purple rounded-2xl blur opacity-30"></div>
            <div className="relative glass rounded-xl overflow-hidden border border-white/10">
              <div className="bg-drip-surfaceLight px-4 py-3 flex items-center space-x-4 border-b border-white/5">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="flex-1 bg-black/30 rounded-md px-4 py-1.5 text-sm text-slate-400 flex items-center justify-center font-mono">
                  <i data-lucide="lock" className="w-3 h-3 mr-2"></i>
                  panel.dripnodes.com/server/smp-main
                </div>
              </div>
              <div className="bg-drip-bg p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="hidden lg:block space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 text-white">
                    <i data-lucide="layout-dashboard" className="w-5 h-5 text-drip-cyan"></i>
                    <span className="font-medium">Overview</span>
                  </div>
                  {[
                    ['terminal','Console'],
                    ['folder','Files'],
                    ['database','Databases'],
                    ['settings','Settings'],
                  ].map(([icon,label]) => (
                    <div key={label} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 transition-colors cursor-pointer">
                      <i data-lucide={icon} className="w-5 h-5"></i>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-3 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass rounded-lg p-4 border border-white/5">
                      <div className="text-slate-400 text-sm mb-1">CPU Usage</div>
                      <div className="flex items/end justify-between">
                        <span className="text-2xl font-bold text-white">24%</span>
                        <div className="h-8 w-24 bg-drip-cyan/20 rounded overflow-hidden relative">
                          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-drip-cyan"></div>
                        </div>
                      </div>
                    </div>
                    <div className="glass rounded-lg p-4 border border-white/5">
                      <div className="text-slate-400 text-sm mb-1">Memory</div>
                      <div className="flex items/end justify-between">
                        <span className="text-2xl font-bold text-white">4.2 GB</span>
                        <div className="h-8 w-24 bg-drip-purple/20 rounded overflow-hidden relative">
                          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-drip-purple"></div>
                        </div>
                      </div>
                    </div>
                    <div className="glass rounded-lg p-4 border border-white/5">
                      <div className="text-slate-400 text-sm mb-1">Players Online</div>
                      <div className="flex items/end justify-between">
                        <span className="text-2xl font-bold text-white">47/100</span>
                        <div className="h-8 w-24 bg-drip-emerald/20 rounded overflow-hidden relative">
                          <div className="absolute bottom-0 left-0 w-3/4 h-full bg-drip-emerald"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="glass rounded-lg p-4 border border-white/5 font-mono text-sm h-64 overflow-hidden relative">
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs border border-red-500/30 hover:bg-red-500/30 transition-colors">Stop</button>
                      <button className="px-3 py-1 rounded bg-green-500/20 text-green-400 text-xs border border-green-500/30 hover:bg-green-500/30 transition-colors">Restart</button>
                    </div>
                    <div className="space-y-1 text-slate-300 mt-8">
                      <p><span className="text-slate-500">[14:23:01]</span> <span className="text-green-400">INFO</span>: Preparing level "world"</p>
                      <p><span className="text-slate-500">[14:23:02]</span> <span className="text-green-400">INFO</span>: Preparing start region for dimension minecraft:overworld</p>
                      <p><span className="text-slate-500">[14:23:04]</span> <span className="text-green-400">INFO</span>: Time elapsed: 1204 ms</p>
                      <p><span className="text-slate-500">[14:23:05]</span> <span className="text-green-400">INFO</span>: Done (4.203s)! For help, type "help"</p>
                      <p><span className="text-slate-500">[14:25:12]</span> <span className="text-yellow-400">WARN</span>: Can't keep up! Is the server overloaded?</p>
                      <p className="text-slate-500 italic">... never with DripNodes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to deploy?</h2>
          <p className="text-xl text-slate-400 mb-10">Join thousands of server owners who trust DripNodes with their communities.</p>
          <a href="/pricing" className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-drip-cyan to-drip-purple text-white font-bold text-lg hover:opacity-90 transition-all glow-cyan">
            Start Your Server Now
            <i data-lucide="rocket" className="ml-2 w-5 h-5"></i>
          </a>
          <p className="mt-6 text-sm text-slate-500">24-hour money-back guarantee • Instant setup • No credit card required</p>
        </div>
      </section>

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
                <li><a href="#features" className="hover:text-drip-cyan transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-drip-cyan transition-colors">Pricing</a></li>
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
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
