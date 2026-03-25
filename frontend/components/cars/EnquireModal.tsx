"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { MessageSquare, X } from "lucide-react";

export function EnquireModal({ carId, carName }: { carId: string; carName: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "", preferredTime: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, carId }),
      });
      if (res.ok) { toast.success("Enquiry sent! We'll call you shortly."); setOpen(false); setForm({ name: "", phone: "", message: "", preferredTime: "" }); }
      else toast.error("Failed to send. Please try again.");
    } catch { toast.error("Something went wrong."); }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary w-full flex items-center justify-center gap-2">
        <MessageSquare size={18} /> Enquire Now
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="font-bebas text-2xl text-white mb-1">Enquire Now</h2>
            <p className="text-gray-400 text-sm mb-5">{carName}</p>
            <form onSubmit={submit} className="space-y-3">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="input" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="input" type="tel" />
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message (optional)" rows={3} className="input resize-none" />
              <select value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} className="input">
                <option value="">Preferred Call Time</option>
                {["Morning (9-12)", "Afternoon (12-4)", "Evening (4-8)"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
