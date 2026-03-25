"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { toast.success("Account created! Please sign in."); router.push("/login"); }
      else { const d = await res.json(); toast.error(d.error || "Registration failed"); }
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center">
            <span className="font-bebas text-4xl text-white tracking-widest">FASTLANE</span>
            <span className="block h-0.5 w-full bg-brand-red" />
          </Link>
          <h1 className="font-bebas text-3xl text-white mt-6">Create Account</h1>
          <p className="text-gray-400 text-sm mt-1">Join Fastlane today</p>
        </div>
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
            <input required type="password" placeholder="Password (min 8 chars)" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
            <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-red hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
