"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (res.ok) { toast.success("Subscribed successfully!"); setEmail(""); }
      else toast.error("Already subscribed or invalid email.");
    } catch { toast.error("Something went wrong."); }
    setLoading(false);
  };

  return (
    <section className="section bg-brand-red">
      <div className="container text-center">
        <h2 className="font-bebas text-4xl md:text-5xl text-white mb-3">Stay in the Fast Lane</h2>
        <p className="text-red-200 mb-8 max-w-md mx-auto">Get exclusive alerts on new arrivals, special deals, and luxury car insights — straight to your inbox.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email"
            className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-red-200 focus:outline-none focus:border-white transition-colors" />
          <button type="submit" disabled={loading}
            className="bg-white text-brand-red font-semibold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-70">
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
