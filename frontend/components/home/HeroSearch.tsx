"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { BRANDS, FUEL_TYPES, BODY_TYPES } from "@/lib/constants";

export function HeroSearch() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (brand) params.set("brand", brand);
    if (fuel) params.set("fuel", fuel);
    if (body) params.set("body", body);
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="glass rounded-2xl p-4 md:p-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search brand, model..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-red transition-colors"
          />
        </div>

        <select value={brand} onChange={(e) => setBrand(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors appearance-none cursor-pointer">
          <option value="" className="bg-brand-black">All Brands</option>
          {BRANDS.map((b) => <option key={b} value={b} className="bg-brand-black">{b}</option>)}
        </select>

        <select value={fuel} onChange={(e) => setFuel(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors appearance-none cursor-pointer">
          <option value="" className="bg-brand-black">Fuel Type</option>
          {FUEL_TYPES.map((f) => <option key={f} value={f} className="bg-brand-black">{f}</option>)}
        </select>

        <select value={body} onChange={(e) => setBody(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors appearance-none cursor-pointer">
          <option value="" className="bg-brand-black">Body Type</option>
          {BODY_TYPES.map((b) => <option key={b} value={b} className="bg-brand-black">{b}</option>)}
        </select>

        <button onClick={handleSearch}
          className="btn-primary flex items-center gap-2 whitespace-nowrap px-8">
          <Search size={18} /> Search
        </button>
      </div>
    </div>
  );
}
