"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Heart, BarChart2, User, ChevronDown, LogOut, Settings } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-brand-black/95 backdrop-blur-md shadow-lg border-b border-brand-border" : "bg-transparent"
    )}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="text-2xl md:text-3xl font-bebas text-white tracking-widest group-hover:text-brand-red transition-colors">FASTLANE</span>
          <span className="block h-0.5 w-full bg-brand-red group-hover:w-3/4 transition-all duration-300" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm text-gray-300 hover:text-brand-red transition-colors font-medium relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-200" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/wishlist" className="relative p-2 text-gray-400 hover:text-brand-red transition-colors">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>
            )}
          </Link>
          <Link href="/compare" className="p-2 text-gray-400 hover:text-brand-red transition-colors">
            <BarChart2 size={20} />
          </Link>

          {session ? (
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold">
                  {session.user?.name?.[0] || "U"}
                </div>
                <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-brand-card border border-brand-border rounded-xl shadow-glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/dashboard" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand-border rounded-t-xl transition-colors">
                  <User size={14} /> Profile
                </Link>
                {session.user?.role === "admin" && (
                  <Link href="/admin" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand-border transition-colors">
                    <Settings size={14} /> Admin Panel
                  </Link>
                )}
                <button onClick={() => signOut()} className="flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-brand-border rounded-b-xl w-full transition-colors">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block btn-primary text-sm py-2 px-4">Sign In</Link>
          )}

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-brand-black/98 border-t border-brand-border py-4">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block px-6 py-3 text-gray-300 hover:text-brand-red hover:bg-brand-card transition-colors">
              {l.label}
            </Link>
          ))}
          {session ? (
            <button onClick={() => signOut()} className="block px-6 py-3 text-red-400 w-full text-left">Sign Out</button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="block px-6 py-3 text-brand-red font-semibold">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}
