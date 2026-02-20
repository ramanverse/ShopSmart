"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { BRANDS, FUEL_TYPES, BODY_TYPES, TRANSMISSIONS, COLORS, STATES } from "@/lib/constants";
import { X } from "lucide-react";

export function FilterSidebar() {
  const router = useRouter();
  const params = useSearchParams();

  const update = (key: string, value: string) => {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value); else p.delete(key);
    p.delete("page");
    router.push(`/cars?${p.toString()}`);
  };

  const clearAll = () => router.push("/cars");

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</h4>
      {children}
    </div>
  );

  const CheckGroup = ({ items, paramKey }: { items: string[]; paramKey: string }) => {
    const val = params.get(paramKey) || "";
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name={paramKey} checked={val === item} onChange={() => update(paramKey, val === item ? "" : item)}
              className="accent-brand-red" />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item}</span>
          </label>
        ))}
      </div>
    );
  };

  const hasFilters = [...params.keys()].some((k) => k !== "page");

  return (
    <div className="card p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-white">Filters</h3>
        {hasFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-brand-red hover:text-red-400 transition-colors">
            <X size={12} /> Clear All
          </button>
        )}
      </div>

      <Section title="Brand">
        <select value={params.get("brand") || ""} onChange={(e) => update("brand", e.target.value)}
          className="input text-sm py-2">
          <option value="">All Brands</option>
          {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </Section>

      <Section title="Fuel Type">
        <CheckGroup items={FUEL_TYPES} paramKey="fuel" />
      </Section>

      <Section title="Body Type">
        <CheckGroup items={BODY_TYPES} paramKey="body" />
      </Section>

      <Section title="Transmission">
        <CheckGroup items={TRANSMISSIONS} paramKey="transmission" />
      </Section>

      <Section title="Price Range">
        <div className="flex gap-2">
          <input type="number" placeholder="Min ₹" defaultValue={params.get("priceMin") || ""}
            onBlur={(e) => update("priceMin", e.target.value)}
            className="input text-sm py-2 w-1/2" />
          <input type="number" placeholder="Max ₹" defaultValue={params.get("priceMax") || ""}
            onBlur={(e) => update("priceMax", e.target.value)}
            className="input text-sm py-2 w-1/2" />
        </div>
      </Section>

      <Section title="Year">
        <div className="flex gap-2">
          <input type="number" placeholder="From" defaultValue={params.get("yearMin") || ""}
            onBlur={(e) => update("yearMin", e.target.value)}
            className="input text-sm py-2 w-1/2" />
          <input type="number" placeholder="To" defaultValue={params.get("yearMax") || ""}
            onBlur={(e) => update("yearMax", e.target.value)}
            className="input text-sm py-2 w-1/2" />
        </div>
      </Section>

      <Section title="Color">
        <select value={params.get("color") || ""} onChange={(e) => update("color", e.target.value)}
          className="input text-sm py-2">
          <option value="">All Colors</option>
          {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Section>

      <Section title="Registration State">
        <select value={params.get("state") || ""} onChange={(e) => update("state", e.target.value)}
          className="input text-sm py-2">
          <option value="">All States</option>
          {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Section>
    </div>
  );
}
