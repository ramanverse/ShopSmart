"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const router = useRouter();
  const params = useSearchParams();
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    const sp = new URLSearchParams(params.toString());
    sp.set("page", String(p));
    router.push(`/cars?${sp.toString()}`);
  };

  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (page <= 3) return i + 1;
    if (page >= totalPages - 2) return totalPages - 4 + i;
    return page - 2 + i;
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={() => go(page - 1)} disabled={page === 1}
        className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center text-white hover:border-brand-red disabled:opacity-30 transition-all">
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => go(p)}
          className={cn("w-10 h-10 rounded-lg border text-sm font-medium transition-all",
            p === page ? "border-brand-red bg-brand-red text-white" : "border-brand-border text-gray-400 hover:border-brand-red hover:text-white")}>
          {p}
        </button>
      ))}
      <button onClick={() => go(page + 1)} disabled={page === totalPages}
        className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center text-white hover:border-brand-red disabled:opacity-30 transition-all">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
