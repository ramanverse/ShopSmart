"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Car, X } from "lucide-react";

export function TestDriveModal({ carId, carName }: { carId: string; carName: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", timeSlot: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/test-drives", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, carId }),
      });
      if (res.ok) { toast.success("Test drive booked! We'll confirm shortly."); setOpen(false); }
      else toast.error("Failed to book. Try again.");
    } catch { toast.error("Something went wrong."); }
    setLoading(false);
  };

  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-outline w-full flex items-center justify-center gap-2">
        <Car size={18} /> Book Test Drive
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
            <h2 className="font-bebas text-2xl text-white mb-1">Book Test Drive</h2>
            <p className="text-gray-400 text-sm mb-5">{carName}</p>
            <form onSubmit={submit} className="space-y-3">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="input" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="input" type="tel" />
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email (optional)" className="input" type="email" />
              <input required type="date" min={minDate} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" />
              <select required value={form.timeSlot} onChange={(e) => setForm({ ...form, timeSlot: e.target.value })} className="input">
                <option value="">Select Time Slot</option>
                {["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
