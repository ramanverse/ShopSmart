import { Shield, Award, Users, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 bg-brand-dark text-white">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-glow opacity-10 pointer-events-none" />
        <div className="container relative z-10 text-center">
          <h1 className="font-bebas text-7xl md:text-9xl mb-6">BEYOND <span className="text-brand-red">DRIVING</span></h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Fastlane is India&apos;s premier luxury pre-owned car marketplace. Founded with a vision 
            to bring transparency and trust to the luxury segment, we&apos;ve helped over 15,000 
            enthusiasts drive their dream machine.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-brand-border bg-brand-black/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Cars Sold", value: "12,000+" },
              { label: "Happy Clients", value: "15,000+" },
              { label: "Cities", value: "15+" },
              { label: "Years", value: "12" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bebas text-brand-red mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl">OUR CORE VALUES</h2>
            <span className="red-line mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Trust", desc: "Every car is verified through a 200-point inspection and rigorous documentation check." },
              { icon: Award, title: "Quality", desc: "We only list vehicles that meet our high standards of aesthetic and mechanical excellence." },
              { icon: Users, title: "Customer First", desc: "Our relationship doesn't end with a sale; we provide lifetime support for our family." },
              { icon: TrendingUp, title: "Innovation", desc: "Using technology to make the buying and selling process as seamless as a click." },
            ].map((v) => (
              <div key={v.title} className="card p-8 text-center hover:border-brand-red transition-all">
                <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mx-auto mb-6">
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
