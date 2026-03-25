"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/constants";
import { SlidersHorizontal } from "lucide-react";

export function CarListingHeader({ total }: { total: number }) {
  const router = useRouter();
  const params = useSearchParams();

  const updateSort = (sort: string) => {
    const p = new URLSearchParams(params.toString());
    p.set("sort", sort);
    router.push(`/cars?${p.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-bebas text-4xl text-white">Premium Cars</h1>
        <p className="text-gray-400 text-sm mt-1">
          <span className="text-brand-red font-semibold">{total.toLocaleString()}</span> cars available
        </p>
      </div>
      <div className="flex items-center gap-3">
        <SlidersHorizontal size={16} className="text-gray-400" />
        <select
          defaultValue={params.get("sort") || "newest"}
          onChange={(e) => updateSort(e.target.value)}
          className="input text-sm py-2 w-48"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
