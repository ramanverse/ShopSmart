"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you shortly.");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 bg-brand-dark text-white">
      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h1 className="font-bebas text-6xl md:text-8xl mb-6">GET IN <span className="text-brand-red">TOUCH</span></h1>
            <p className="text-gray-400 text-lg mb-12">
              Have questions about a specific car or need help with selling your vehicle? 
              Our luxury consultants are here to help you 24/7.
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, title: "Call Us", val: "+91 99999 00000", sub: "Mon-Sat, 9am - 8pm" },
                { icon: Mail, title: "Email Us", val: "support@fastlane.in", sub: "Instant response" },
                { icon: MapPin, title: "Headquarters", val: "DLF Cyber City, Delhi NCR", sub: "Main Office" },
              ].map((item) => (
                <div key={item.title} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">{item.title}</h3>
                    <p className="text-xl font-bold text-white">{item.val}</p>
                    <p className="text-gray-600 text-sm mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-brand-red/20 to-transparent border border-brand-red/20">
              <div className="flex items-center gap-4 mb-4">
                <MessageSquare className="text-brand-red" size={24} />
                <h3 className="text-xl font-bold">Live WhatsApp Support</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">Connect with our luxury consultants instantly on WhatsApp for quick inquiries and virtual tours.</p>
              <button className="btn-primary w-full md:w-auto">Start Chat Now</button>
            </div>
          </div>

          {/* Form */}
          <div className="card p-8 md:p-12">
            <h2 className="font-bebas text-3xl mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Full Name</label>
                <input required type="text" placeholder="Your Name" className="input" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Address</label>
                  <input required type="email" placeholder="email@example.com" className="input" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Phone Number</label>
                  <input required type="tel" placeholder="+91" className="input" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Message</label>
                <textarea required rows={4} placeholder="How can we help you?" className="input resize-none" />
              </div>

              <button disabled={loading} type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? "Sending..." : "Send Message"} <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
