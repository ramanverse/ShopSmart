"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review { id: string; name: string; city: string; rating: number; comment: string; carModel?: string | null; }

export function Testimonials({ reviews }: { reviews: Review[] }) {
  const [idx, setIdx] = useState(0);
  if (!reviews.length) return null;
  const prev = () => setIdx((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIdx((i) => (i + 1) % reviews.length);
  const r = reviews[idx];
  return (
    <section className="section bg-brand-black">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl md:text-5xl text-white">What Our Customers Say</h2>
          <span className="block w-16 h-1 bg-brand-red mx-auto mt-3" />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="card p-8 text-center relative">
            <div className="text-6xl text-brand-red/20 font-serif absolute top-4 left-6">&ldquo;</div>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < r.rating ? "#FF2D2D" : "none"} className={i < r.rating ? "text-brand-red" : "text-gray-600"} />
              ))}
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">&ldquo;{r.comment}&rdquo;</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-lg">
                {r.name[0]}
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">{r.name}</p>
                <p className="text-sm text-gray-400">{r.city}{r.carModel ? ` · ${r.carModel}` : ""}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-white hover:border-brand-red hover:text-brand-red transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-brand-red w-6" : "bg-gray-600"}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-white hover:border-brand-red hover:text-brand-red transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
