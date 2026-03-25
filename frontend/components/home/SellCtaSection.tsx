"use client";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle, Banknote, FileCheck } from "lucide-react";

const STEPS = [
  { icon: Clock, title: "Get Instant Quote", desc: "Fill our form and get a market price estimate in minutes" },
  { icon: CheckCircle, title: "Free Inspection", desc: "Our experts inspect your car at your doorstep" },
  { icon: Banknote, title: "Best Offer", desc: "Receive the best offer with zero negotiation hassle" },
  { icon: FileCheck, title: "Instant Payment", desc: "Transfer completed within 30 minutes, zero paperwork" },
];

export function SellCtaSection() {
  return (
    <section className="section bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-red-glow opacity-20" />
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-red text-sm font-semibold uppercase tracking-widest mb-3">Sell Your Car</p>
            <h2 className="font-bebas text-5xl md:text-6xl text-white mb-4 leading-tight">
              SELL IN JUST<br /><span className="text-brand-red">30 MINUTES</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">Get the best price for your luxury car. Free home pickup, zero paperwork, instant bank transfer.</p>
            <div className="flex flex-wrap gap-4 mb-8">
              {["Best Price", "Free Pickup", "Zero Docs", "Instant Pay"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle size={14} className="text-brand-red" /> {t}
                </span>
              ))}
            </div>
            <Link href="/sell" className="btn-primary inline-flex items-center gap-2">
              Sell Your Car <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="card p-5 group">
                <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-brand-red transition-all duration-300">
                  <Icon size={20} className="text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
