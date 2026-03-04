"use client";
import { useState } from "react";
import { Shield, Clock, BadgeCheck, DollarSign, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function SellPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    kmDriven: "",
    name: "",
    phone: "",
    city: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Sell request submitted! Our agent will contact you within 30 minutes.");
    setForm({ brand: "", model: "", year: "", kmDriven: "", name: "", phone: "", city: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 bg-brand-dark">
      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div>
            <h1 className="font-bebas text-6xl md:text-8xl text-white leading-none mb-6">
              SELL YOUR CAR IN <br />
              <span className="text-brand-red">30 MINUTES</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-lg">
              Get the best market price for your luxury vehicle with Fastlane. Instant valuation, 
              free doorstep inspection, and immediate payment.
            </p>

            <div className="space-y-6">
              {[
                { icon: DollarSign, title: "Best Market Price", desc: "Our transparent pricing engine ensures you get the highest value." },
                { icon: Clock, title: "Instant Payment", desc: "Full amount transferred to your account within minutes of the deal." },
                { icon: Shield, title: "Free Doorstep Inspection", desc: "Expert inspection at your convenience, completely free of charge." },
                { icon: BadgeCheck, title: "Hassle-Free RC Transfer", desc: "We handle all documentation and RTO transfers for you." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="card p-8 md:p-10 relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <DollarSign size={120} className="text-brand-red" />
            </div>
            
            <h2 className="font-bebas text-3xl text-white mb-6">Get Instant Valuation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Brand</label>
                  <input required type="text" placeholder="e.g. BMW" className="input" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Model</label>
                  <input required type="text" placeholder="e.g. M5" className="input" value={form.model} onChange={e => setForm({...form, model: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Year</label>
                  <input required type="number" placeholder="2022" className="input" value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">KM Driven</label>
                  <input required type="number" placeholder="12000" className="input" value={form.kmDriven} onChange={e => setForm({...form, kmDriven: e.target.value})} />
                </div>
              </div>

              <div className="h-px bg-brand-border my-6" />

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Your Name</label>
                <input required type="text" placeholder="John Doe" className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Phone Number</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">City</label>
                  <input required type="text" placeholder="e.g. Delhi" className="input" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                </div>
              </div>

              <button disabled={loading} type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-6">
                {loading ? "Submitting..." : "Get Free Quote"} <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
