"use client";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

function AnimatedNumber({ target }: { target: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const num = parseInt(target.replace(/\D/g, ""));
    if (isNaN(num)) { setDisplay(target); return; }
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(num / 60);
        const timer = setInterval(() => {
          start = Math.min(start + step, num);
          setDisplay(target.replace(/[\d,]+/, start.toLocaleString("en-IN")));
          if (start >= num) clearInterval(timer);
        }, 20);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
}

export function StatsBar() {
  return (
    <section className="bg-brand-red py-10">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-bebas text-4xl md:text-5xl text-white">
              <AnimatedNumber target={s.value} />
            </div>
            <p className="text-red-200 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
