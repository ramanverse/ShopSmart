"use client";
import { useCompareStore } from "@/lib/store";
import { X, ArrowRight, Gauge, Fuel, Calendar, ShieldCheck } from "lucide-react";
import { formatPrice, formatKm } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function ComparePage() {
  const { items, removeItem, clearAll } = useCompareStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-brand-card border border-brand-border flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} className="text-gray-600" />
          </div>
          <h1 className="font-bebas text-4xl text-white mb-4">No Cars to Compare</h1>
          <p className="text-gray-400 mb-8">Add up to 3 cars to compare their specifications side-by-side.</p>
          <Link href="/cars" className="btn-primary">Browse All Cars</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-brand-dark text-white">
      <div className="container py-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h1 className="font-bebas text-6xl">COMPARE CARS</h1>
            <p className="text-gray-400 mt-2">Compare your favorite luxury vehicles head-to-head.</p>
          </div>
          <button onClick={clearAll} className="text-brand-red text-sm hover:underline">Clear All</button>
        </div>

        <div className="overflow-x-auto pb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-64 p-6 bg-brand-card border border-brand-border text-left font-bebas text-2xl tracking-wider">Features</th>
                {items.map((car) => (
                  <th key={car.id} className="min-w-[280px] p-0 bg-brand-card border border-brand-border relative group">
                    <button 
                      onClick={() => removeItem(car.id)}
                      className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-brand-red flex items-center justify-center transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <div className="relative h-48 overflow-hidden">
                      <Image src={car.images[0]?.url || "/placeholder-car.jpg"} alt={car.model} fill className="object-cover" />
                    </div>
                    <div className="p-6 text-left">
                      <p className="text-xs text-brand-red font-bold uppercase tracking-widest">{car.brand}</p>
                      <h3 className="text-xl font-bold mb-1">{car.model}</h3>
                      <p className="text-brand-red font-bold text-lg">{formatPrice(car.price)}</p>
                    </div>
                  </th>
                ))}
                {/* Empty slots if less than 3 */}
                {[...Array(Math.max(0, 3 - items.length))].map((_, i) => (
                  <th key={`empty-${i}`} className="min-w-[280px] p-6 bg-brand-card/30 border border-brand-border">
                    <div className="h-full flex flex-col items-center justify-center text-gray-700 py-20">
                      <Link href="/cars" className="w-12 h-12 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-all">
                        <ArrowRight size={20} />
                      </Link>
                      <p className="text-xs uppercase tracking-widest font-bold mt-4">Add Car</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* SPEC ROWS */}
              {[
                { label: "Year", icon: Calendar, key: "year" },
                { label: "KM Driven", icon: Gauge, key: "kmDriven", format: formatKm },
                { label: "Fuel Type", icon: Fuel, key: "fuelType" },
                { label: "Transmission", icon: ShieldCheck, key: "transmission" },
              ].map((row) => (
                <tr key={row.key} className="group">
                  <td className="p-6 bg-brand-card border border-brand-border">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-widest">
                      <row.icon size={16} className="text-brand-red" />
                      {row.label}
                    </div>
                  </td>
                  {items.map((car) => (
                    <td key={`${car.id}-${row.key}`} className="p-6 bg-brand-card border border-brand-border text-center text-white font-medium">
                      {row.format ? row.format((car as any)[row.key]) : (car as any)[row.key]}
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - items.length))].map((_, i) => (
                    <td key={`empty-td-${i}-${row.key}`} className="p-6 bg-brand-card/20 border border-brand-border" />
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-6 bg-brand-card border border-brand-border" />
                {items.map((car) => (
                  <td key={`action-${car.id}`} className="p-6 bg-brand-card border border-brand-border">
                    <Link href={`/cars/${car.slug}`} className="btn-primary w-full text-center text-sm py-2">View Details</Link>
                  </td>
                ))}
                {[...Array(Math.max(0, 3 - items.length))].map((_, i) => (
                  <td key={`empty-action-${i}`} className="p-6 bg-brand-card/20 border border-brand-border" />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
