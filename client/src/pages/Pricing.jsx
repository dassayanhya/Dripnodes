import { useEffect, useRef, useState } from 'react'

export default function Pricing() {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons()
  }, [])

  const wrapRef = useRef(null)
  const primaryRef = useRef(null)
  const mcRef = useRef(null)
  const dcRef = useRef(null)
  const [indicatorX, setIndicatorX] = useState(0)
  const [indicatorW, setIndicatorW] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const wrap = wrapRef.current
    const primary = primaryRef.current
    if (!wrap || !primary) return
    const enter = () => wrap.classList.add('hover-glow-cyan-blue')
    const leave = () => wrap.classList.remove('hover-glow-cyan-blue')
    primary.addEventListener('mouseenter', enter)
    primary.addEventListener('mouseleave', leave)
    primary.addEventListener('focus', enter)
    primary.addEventListener('blur', leave)
    return () => {
      primary.removeEventListener('mouseenter', enter)
      primary.removeEventListener('mouseleave', leave)
      primary.removeEventListener('focus', enter)
      primary.removeEventListener('blur', leave)
    }
  }, [])

  const [product, setProduct] = useState('minecraft')
  const switchProduct = (next) => {
    if (next === product) return
    setVisible(false)
    setTimeout(() => {
      setProduct(next)
      requestAnimationFrame(() => setVisible(true))
    }, 160)
  }
  useEffect(() => {
    const wrap = wrapRef.current
    const target = product === 'minecraft' ? mcRef.current : dcRef.current
    if (!wrap || !target) return
    const update = () => {
      const x = target.offsetLeft
      const w = target.offsetWidth
      setIndicatorX(x)
      setIndicatorW(w)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [product])

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
  const tiersMinecraft = [
    {
      name: 'Drip Starter',
      subtitle: 'Minecraft Server',
      priceLabel: 'FREE',
      priceNote: 'Forever free',
      stats: [
        ['RAM','2 GB'],
        ['CPU','Shared'],
        ['Storage','10 GB SSD'],
        ['Players','Up to 10'],
      ],
      features: [
        {label:'Paper / Spigot Support'},
        {label:'Web Panel Access'},
        {label:'Plugin Support', disabled:true},
        {label:'Backups', disabled:true},
        {label:'DDoS Protection', disabled:true},
      ],
      cta: {label:'Start Free', color:'emerald'},
      highlight:false
    },
    {
      name: 'Drip Pro',
      subtitle: 'Minecraft Server',
      priceLabel: '₹299',
      priceNote: '/ month',
      stats: [
        ['RAM','6–8 GB'],
        ['CPU','Dedicated vCore'],
        ['Storage','50 GB NVMe'],
        ['Players','40–80'],
      ],
      features: [
        {label:'Full Plugin & Mod Support'},
        {label:'Daily Backups'},
        {label:'DDoS Protection'},
        {label:'Priority Support'},
        {label:'Custom Domains'},
      ],
      cta: {label:'Upgrade to Pro', color:'blue'},
      highlight:true
    },
    {
      name: 'Drip Basic',
      subtitle: 'Minecraft Server',
      priceLabel: '₹199',
      priceNote: '/ month',
      stats: [
        ['RAM','4 GB'],
        ['CPU','Shared vCore'],
        ['Storage','20 GB NVMe'],
        ['Players','20–40'],
      ],
      features: [
        {label:'Plugin Support'},
        {label:'Automatic Backups'},
        {label:'DDoS Protection'},
        {label:'Community Support'},
      ],
      cta: {label:'Get Started', color:'blue'},
      highlight:false
    },
    {
      name: 'Drip Plus',
      subtitle: 'Minecraft Server',
      priceLabel: '₹399',
      priceNote: '/ month',
      stats: [
        ['RAM','8 GB'],
        ['CPU','Dedicated vCore'],
        ['Storage','75 GB NVMe'],
        ['Players','80–120'],
      ],
      features: [
        {label:'Full Plugin & Mod Support'},
        {label:'Daily Backups'},
        {label:'DDoS Protection'},
        {label:'Priority Support'},
      ],
      cta: {label:'Get Started', color:'blue'},
      highlight:false
    },
    {
      name: 'Drip Elite',
      subtitle: 'Minecraft Server',
      priceLabel: '₹699',
      priceNote: '/ month',
      stats: [
        ['RAM','12–16 GB'],
        ['CPU','2 Dedicated vCores'],
        ['Storage','150 GB NVMe'],
        ['Players','150–250'],
      ],
      features: [
        {label:'Advanced Modpacks Support'},
        {label:'Hourly Backups'},
        {label:'Premium DDoS Protection'},
        {label:'Priority Support'},
      ],
      cta: {label:'Get Started', color:'blue'},
      highlight:false
    },
    {
      name: 'Drip Ultra',
      subtitle: 'Minecraft Server',
      priceLabel: 'Custom',
      priceNote: 'Enterprise',
      stats: [
        ['RAM','Custom'],
        ['CPU','Dedicated Machine'],
        ['Uptime','SLA-backed'],
        ['Support','Direct Admin'],
      ],
      features: [
        {label:'Custom RAM & CPU Configuration'},
        {label:'Dedicated Machine Options'},
        {label:'99.99% SLA-backed Uptime'},
        {label:'Direct Admin Support'},
        {label:'White-label Options'},
      ],
      cta: {label:'Contact Sales', color:'rose'},
      highlight:false
    },
  ]

  const tiersDiscord = [
    {
      name: 'Drip Bot Starter',
      subtitle: 'Discord Hosting',
      priceLabel: 'FREE',
      priceNote: '',
      stats: [
        ['RAM','1 GB'],
        ['CPU','Shared'],
        ['Storage','5 GB SSD'],
      ],
      features: [
        {label:'Node.js Runtime'},
        {label:'Always-on Uptime'},
        {label:'Web Panel Access'},
        {label:'Basic Logs'},
      ],
      cta: {label:'Start Free', color:'emerald'},
      highlight:false
    },
    {
      name: 'Drip Bot Pro',
      subtitle: 'Discord Hosting',
      priceLabel: '₹299',
      priceNote: '',
      stats: [
        ['RAM','4 GB'],
        ['CPU','Dedicated vCore'],
        ['Storage','30 GB NVMe'],
      ],
      features: [
        {label:'Advanced Logging & Metrics'},
        {label:'DDoS Protection'},
        {label:'Priority Support'},
        {label:'Custom Domains'},
      ],
      cta: {label:'Upgrade to Pro', color:'blue'},
      highlight:true
    },
    {
      name: 'Drip Bot Plus',
      subtitle: 'Discord Hosting',
      priceLabel: '₹399',
      priceNote: '',
      stats: [
        ['RAM','8 GB'],
        ['CPU','Dedicated vCore'],
        ['Storage','60 GB NVMe'],
      ],
      features: [
        {label:'Scaling Support'},
        {label:'Daily Backups'},
        {label:'DDoS Protection'},
        {label:'24/7 Support'},
      ],
      cta: {label:'Get Started', color:'blue'},
      highlight:false
    },
    {
      name: 'Drip Bot Ultra',
      subtitle: 'Discord Hosting',
      priceLabel: 'Custom',
      priceNote: '',
      stats: [
        ['RAM','Custom'],
        ['CPU','Dedicated Machine'],
        ['Uptime','SLA-backed'],
        ['Support','Direct Admin'],
      ],
      features: [
        {label:'Custom Infra'},
        {label:'Enterprise Backups'},
        {label:'Premium DDoS Protection'},
        {label:'White-label Options'},
      ],
      cta: {label:'Contact Sales', color:'rose'},
      highlight:false
    },
  ]

  const priceValue = (label) => {
    if (label === 'FREE') return 0
    if (label === 'Custom') return Number.POSITIVE_INFINITY
    const n = Number(String(label).replace(/[^\d]/g, ''))
    return isNaN(n) ? Number.POSITIVE_INFINITY : n
  }
  const activeTiers = product === 'minecraft' ? tiersMinecraft : tiersDiscord
  const sortedTiers = [...activeTiers].sort((a, b) => priceValue(a.priceLabel) - priceValue(b.priceLabel))

  return (
    <div className="pricing-root relative">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-drip-surfaceLight via-drip-bg to-black"></div>
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-6 border border-white/10">
            <span className="flex h-2 w-2 rounded-full bg-drip-emerald mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-300">Now supporting 120+ Minecraft versions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient-subtle">Simple, Scalable Hosting for</span><br/>
            <span className="text-gradient">Minecraft & Discord</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-8">
            Start free. Upgrade when you’re ready. No hidden limits, no surprise bills.
          </p>
        </div>
      </section>

      <section className="py-8 relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-drip-cyan/15 to-blue-500/15 border border-drip-cyan/30 glow-cyan">
            <i data-lucide={product==='minecraft'?'cpu':'bot'} className="w-4 h-4 text-drip-cyan"></i>
            <span className="text-white font-semibold">{product==='minecraft'?'Minecraft Servers':'Discord Hosting'}</span>
            <span className="text-slate-300 text-sm">{product==='minecraft'?'High-performance servers for Java & Bedrock':'Reliable Node.js bot hosting'}</span>
          </div>
        </div>
      </section>
      <div className="py-2 relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={wrapRef} className="relative inline-flex items-center p-1 rounded-full glass-strong border border-white/10 glow-transition segmented-wrap overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-drip-cyan to-blue-500 transition-transform duration-300"
              style={{ transform: `translateX(${indicatorX}px)`, width: indicatorW }}
            />
            <a
              ref={(el)=>{primaryRef.current=el; mcRef.current=el}}
              href="#"
              onClick={(e)=>{e.preventDefault(); switchProduct('minecraft');}}
              className={`${product==='minecraft'?'text-black font-semibold':'text-slate-300 hover:text-white'} px-6 py-2 rounded-full text-sm transition-colors inline-flex items-center relative z-10`}
            >
              <i data-lucide="gamepad-2" className="w-4 h-4 mr-2"></i>
              Minecraft
            </a>
            <a
              ref={dcRef}
              href="#"
              onClick={(e)=>{e.preventDefault(); switchProduct('discord');}}
              className={`${product==='discord'?'text-black font-semibold':'text-slate-300 hover:text-white'} px-6 py-2 rounded-full text-sm transition-colors inline-flex items-center relative z-10`}
            >
              <i data-lucide="bot" className="w-4 h-4 mr-2"></i>
              Discord Bots
            </a>
          </div>
        </div>
      </div>


      <section id="pricing-plans" className="py-32 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-8 max-w-6xl mx-auto items-stretch transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`} key={product}>
            {sortedTiers.map((tier, idx) => (
              <div key={tier.name} className={`glass-strong rounded-2xl pricing-card hover-lift card-hover-glow border border-white/5 h-full flex flex-col reveal`} style={{transitionDelay: `${idx * 100}ms`}}>
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-drip-cyan to-blue-500 text-black text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${tier.highlight ? 'text-drip-cyan' : 'text-slate-300'} mb-1`}>{tier.name}</h3>
                  <div className="text-slate-500 text-sm mb-3">{tier.subtitle}</div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-5xl md:text-6xl font-bold text-white">{tier.priceLabel}</span>
                    <span className="mt-1 text-slate-400 text-xs">
                      {tier.priceLabel === 'FREE' ? 'Free' : tier.priceLabel === 'Custom' ? 'Custom' : 'Monthly'}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6 text-sm">
                  {tier.stats.map(([k,v])=>(
                    <li key={k} className="flex items-center justify-between text-slate-300 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center">
                        <i data-lucide={k==='RAM'?'memory-stick':k==='CPU'?'cpu':k==='Storage'?'hard-drive':k==='Players'?'users':'badge-check'} className="w-4 h-4 mr-2 text-slate-500"></i>
                        <span className="uppercase tracking-wide text-slate-400">{k}</span>
                      </div>
                      <span className="text-white font-medium">{v}</span>
                    </li>
                  ))}
                </ul>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f.label} className={`flex items-center text-sm ${f.disabled ? 'text-slate-500 line-through opacity-60' : 'text-slate-300'}`}>
                      <i data-lucide={f.disabled?'x':'check'} className={`w-5 h-5 mr-3 flex-shrink-0 ${f.disabled ? 'text-slate-500' : 'text-drip-cyan'} opacity-90`}></i>
                      {f.label}
                    </li>
                  ))}
                </ul>

                <a href="https://billing.dripnodes.site" className={`mt-auto w-full py-3 rounded-lg font-semibold text-center inline-block ${tier.cta.color==='emerald' ? 'bg-emerald-500/90 hover:bg-emerald-500 text-black' : tier.cta.color==='blue' ? 'bg-blue-500/90 hover:bg-blue-500 text-black' : 'bg-rose-500/90 hover:bg-rose-500 text-black'}`}>
                  Order Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 mb-40 reveal">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 mb-6 mx-auto">
          <i data-lucide="infinity" className="w-5 h-5 text-drip-cyan"></i>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Built for creators, communities, and growing servers.</h2>
        <p className="text-slate-400 text-base max-w-2xl mx-auto mb-10">
          Join thousands of developers and server owners who trust Drip Nodes for reliable, high-performance hosting. From small communities to enterprise deployments.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 text-slate-300 text-sm">
          <div className="inline-flex items-center">
            <i data-lucide="shield" className="w-4 h-4 mr-2 text-drip-emerald"></i>
            DDoS Protected
          </div>
          <div className="inline-flex items-center">
            <i data-lucide="circle" className="w-4 h-4 mr-2 text-drip-cyan"></i>
            99.9% Uptime
          </div>
          <div className="inline-flex items-center">
            <i data-lucide="headphones" className="w-4 h-4 mr-2 text-drip-emerald"></i>
            24/7 Support
          </div>
          <div className="inline-flex items-center">
            <i data-lucide="server" className="w-4 h-4 mr-2 text-rose-400"></i>
            Daily Backups
          </div>
        </div>
      </div>
    </div>
  )
}
