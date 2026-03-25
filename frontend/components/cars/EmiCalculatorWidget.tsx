"use client";
import { useState, useEffect } from "react";
import { calculateEMI, formatPrice } from "@/lib/utils";
import { Calculator } from "lucide-react";
import Link from "next/link";

export function EmiCalculatorWidget({ price }: { price: number }) {
  const [loan, setLoan] = useState(Math.round(price * 0.8));
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(60);
  const emi = calculateEMI(loan, rate, tenure);
  const total = emi * tenure;
  const interest = total - loan;

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator size={18} className="text-brand-red" />
        <h3 className="font-semibold text-white">EMI Calculator</h3>
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Loan Amount: {formatPrice(loan)}</label>
          <input type="range" min={100000} max={price} step={50000} value={loan} onChange={(e) => setLoan(Number(e.target.value))}
            className="w-full accent-brand-red" />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Interest Rate: {rate}%</label>
          <input type="range" min={6} max={20} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-brand-red" />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Tenure: {tenure} months</label>
          <input type="range" min={12} max={84} step={12} value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-brand-red" />
        </div>
        <div className="bg-brand-dark rounded-lg p-3 mt-3">
          <p className="text-gray-400 text-xs">Monthly EMI</p>
          <p className="font-bebas text-2xl text-brand-red">{formatPrice(emi)}/mo</p>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Principal: {formatPrice(loan)}</span>
            <span>Interest: {formatPrice(interest)}</span>
          </div>
        </div>
        <Link href="/emi-calculator" className="block text-center text-brand-red text-xs hover:underline">
          Advanced EMI Calculator →
        </Link>
      </div>
    </div>
  );
}
