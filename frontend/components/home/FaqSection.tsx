"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  { q: "Are all cars at Fastlane certified?", a: "Yes! Every car undergoes our 200-point inspection by ASE-certified mechanics. You receive a full inspection report with pass/fail status for each checkpoint." },
  { q: "How do I sell my car to Fastlane?", a: "Simply fill our Sell Your Car form, get an instant quote, schedule a free home inspection, receive your best offer, and get paid — all within 30 minutes of accepting!" },
  { q: "Do you offer financing or EMI options?", a: "Yes, we partner with leading banks and NBFCs. Use our EMI calculator to estimate payments, then apply directly through our platform." },
  { q: "Can I test drive before buying?", a: "Absolutely. Book a test drive directly from any car's detail page. We'll confirm within 2 hours and arrange the drive at our showroom or your preferred location." },
  { q: "What is the ₹10,000 token amount for?", a: "The token is a refundable booking deposit that reserves your chosen car while documentation is in progress. It's fully adjustable against the final purchase price." },
  { q: "How do you handle paperwork and RTO transfers?", a: "We handle all RC transfers, insurance, NOC, and RTO paperwork at zero cost to you. Our team ensures a seamless, legally complete transfer." },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section bg-brand-dark">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl md:text-5xl text-white">Frequently Asked Questions</h2>
          <span className="block w-16 h-1 bg-brand-red mx-auto mt-3" />
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className={cn("card overflow-hidden transition-all", open === i && "border-brand-red/40")}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium text-white pr-4">{f.q}</span>
                <ChevronDown size={18} className={cn("text-brand-red flex-shrink-0 transition-transform duration-200", open === i && "rotate-180")} />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
