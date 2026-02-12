import Link from "next/link";
import { Camera, MessageCircle, Globe, Play, Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  "Quick Links": [
    { href: "/cars", label: "Buy Cars" },
    { href: "/sell", label: "Sell Your Car" },
    { href: "/compare", label: "Compare Cars" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/emi-calculator", label: "EMI Calculator" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/showrooms", label: "Showrooms" },
    { href: "/contact", label: "Contact" },
    { href: "/admin", label: "Admin" },
  ],
  Support: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "FAQ" },
    { href: "#", label: "Warranty" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-border">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex flex-col mb-4">
              <span className="text-3xl font-bebas text-white tracking-widest">FASTLANE</span>
              <span className="block h-0.5 w-full bg-brand-red" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's premier luxury pre-owned car marketplace. 200-point certified cars, transparent pricing, and a seamless buying experience.
            </p>
            <div className="flex gap-3">
              {[Camera, MessageCircle, Globe, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-gray-400 hover:text-brand-red hover:border-brand-red transition-all duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-gray-400 text-sm hover:text-brand-red transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="mt-12 pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-brand-red transition-colors">
              <Phone size={14} /> +91 99999 99999
            </a>
            <a href="mailto:hello@fastlane.in" className="flex items-center gap-2 hover:text-brand-red transition-colors">
              <Mail size={14} /> hello@fastlane.in
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Delhi, Mumbai, Bangalore
            </span>
          </div>
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Fastlane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
