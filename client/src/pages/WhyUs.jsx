export default function WhyUs() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why server owners choose <span className="text-drip-cyan">DripNodes</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Reliability, performance, and real human support.
            </p>
            <div className="space-y-6">
              {[
                {icon:'heart-handshake', title:'Community First', desc:'Built by Minecraft players, for Minecraft players.', color:'drip-cyan'},
                {icon:'gauge', title:'Obsessive Optimization', desc:'Kernel tweaks and JVM flags tuned for Minecraft workloads.', color:'drip-purple'},
                {icon:'headphones', title:'Real Human Support', desc:'Average response time under 5 minutes.', color:'drip-emerald'},
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
          <div className="relative">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
