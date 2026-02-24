"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarImage { id: string; url: string; isPrimary: boolean; }

export function CarGallery({ images }: { images: CarImage[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images.length) return (
    <div className="h-96 card flex items-center justify-center text-gray-600">No Images Available</div>
  );

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <>
      <div className="space-y-3">
        {/* Main */}
        <div className="relative h-72 md:h-96 card overflow-hidden cursor-zoom-in group" onClick={() => setLightbox(true)}>
          <Image src={images[active].url} alt="Car" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 right-3 bg-black/60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={16} className="text-white" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-brand-red transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-brand-red transition-colors">
            <ChevronRight size={18} />
          </button>
          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">{active + 1}/{images.length}</span>
        </div>
        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button key={img.id} onClick={() => setActive(i)}
              className={cn("relative w-20 h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-all",
                i === active ? "border-brand-red" : "border-transparent opacity-60 hover:opacity-100")}>
              <Image src={img.url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 text-white hover:text-brand-red"><X size={28} /></button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white hover:text-brand-red"><ChevronLeft size={36} /></button>
          <div className="relative w-full max-w-4xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[active].url} alt="" fill className="object-contain" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white hover:text-brand-red"><ChevronRight size={36} /></button>
        </div>
      )}
    </>
  );
}
