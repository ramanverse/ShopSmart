"use client";
import { Shield, Award, Clock, BadgeCheck, Headphones, FileText } from "lucide-react";
import { USPS } from "@/lib/constants";

const ICON_MAP: Record<string, any> = { Shield, Award, Clock, BadgeCheck, Headphones, FileText };

export function WhyFastlane() {
  return (
    <section className="section bg-brand-black">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-bebas text-4xl md:text-5xl text-white">Why Choose Fastlane?</h2>
          <span className="block w-16 h-1 bg-brand-red mx-auto mt-3" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">We&apos;re not just a car marketplace — we&apos;re your trusted partner in the luxury car journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {USPS.map((u, i) => {
            const Icon = ICON_MAP[u.icon];
            return (
              <div key={i} className="card p-6 group hover:border-brand-red/40">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4 group-hover:bg-brand-red transition-all duration-300">
                  <Icon size={24} className="text-brand-red group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{u.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{u.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
