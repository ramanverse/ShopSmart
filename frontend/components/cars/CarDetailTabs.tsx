"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

const TABS = ["Overview", "Specifications", "Features", "Inspection"];

export function CarDetailTabs({ car }: { car: any }) {
  const [tab, setTab] = useState(0);
  const features = JSON.parse(car.features || "[]") as string[];
  const inspection = JSON.parse(car.inspectionReport || "[]") as { item: string; status: string }[];

  return (
    <div className="card overflow-hidden">
      <div className="flex border-b border-brand-border">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={cn("flex-1 py-3 text-sm font-medium transition-all",
              tab === i ? "text-brand-red border-b-2 border-brand-red bg-brand-red/5" : "text-gray-400 hover:text-white")}>
            {t}
          </button>
        ))}
      </div>
      <div className="p-5">
        {tab === 0 && (
          <p className="text-gray-300 leading-relaxed">{car.description || "No description available."}</p>
        )}
        {tab === 1 && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["Engine", car.engineCC ? `${car.engineCC} cc` : "—"],
              ["Power", car.power || "—"],
              ["Torque", car.torque || "—"],
              ["Mileage", car.mileage || "—"],
              ["Transmission", car.transmission],
              ["Fuel Type", car.fuelType],
              ["Year", car.year],
              ["KM Driven", `${car.kmDriven?.toLocaleString()} km`],
              ["Owners", car.owners],
              ["Body Type", car.bodyType],
              ["Color", car.color],
              ["Reg. State", car.registrationState],
            ].map(([k, v]) => (
              <div key={String(k)} className="flex justify-between border-b border-brand-border pb-2">
                <span className="text-gray-400">{k}</span>
                <span className="text-white font-medium">{v}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 2 && (
          features.length ? (
            <div className="grid grid-cols-2 gap-2">
              {features.map((f: string) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle size={14} className="text-brand-red flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
          ) : <p className="text-gray-400 text-sm">No features listed.</p>
        )}
        {tab === 3 && (
          inspection.length ? (
            <div className="space-y-2">
              {inspection.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-brand-border">
                  <span className="text-gray-300">{item.item}</span>
                  <span className={cn("flex items-center gap-1", item.status === "pass" ? "text-green-400" : "text-red-400")}>
                    {item.status === "pass" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {item.status === "pass" ? "Pass" : "Fail"}
                  </span>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-400 text-sm">Inspection report not available.</p>
        )}
      </div>
    </div>
  );
}
