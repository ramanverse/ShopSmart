"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarCard } from "@/components/cars/CarCard";

interface Props {
  cars: any[];
}

export function CarCarousel({ cars }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (!cars.length) return null;

  return (
    <div className="relative">
      <button onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-white hover:border-brand-red hover:text-brand-red transition-all shadow-glass">
        <ChevronLeft size={20} />
      </button>
      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollbarWidth: "none" }}>
        {cars.map((car) => (
          <div key={car.id} className="flex-none w-72 snap-start">
            <CarCard car={car} />
          </div>
        ))}
      </div>
      <button onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-white hover:border-brand-red hover:text-brand-red transition-all shadow-glass">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
