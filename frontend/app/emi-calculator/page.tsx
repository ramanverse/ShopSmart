"use client";
import { useState, useEffect } from "react";
import { DollarSign, Percent, Calendar, Calculator } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function EmiCalculatorPage() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [downPayment, setDownPayment] = useState(1000000);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const principal = amount - downPayment;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emiValue = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Math.round(emiValue));
  }, [amount, rate, tenure, downPayment]);

  const totalPayable = emi * tenure * 12;
  const totalInterest = totalPayable - (amount - downPayment);

  return (
    <div className="min-h-screen pt-24 bg-brand-dark">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-bebas text-6xl text-white">EMI CALCULATOR</h1>
          <p className="text-gray-400 mt-2">Plan your luxury car purchase with our flexible finance tool</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-8">
              <div className="space-y-10">
                {/* Amount */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <DollarSign size={16} className="text-brand-red" /> Loan Amount
                    </label>
                    <span className="text-brand-red font-bold text-xl">{formatPrice(amount)}</span>
                  </div>
                  <input type="range" min="1000000" max="50000000" step="100000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-brand-red h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer" />
                </div>

                {/* Down Payment */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <Percent size={16} className="text-brand-red" /> Down Payment
                    </label>
                    <span className="text-brand-red font-bold text-xl">{formatPrice(downPayment)}</span>
                  </div>
                  <input type="range" min="0" max={amount * 0.8} step="50000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-brand-red h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Interest */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                        <Percent size={16} className="text-brand-red" /> Interest Rate (%)
                      </label>
                      <span className="text-brand-red font-bold text-xl">{rate}%</span>
                    </div>
                    <input type="range" min="5" max="15" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-brand-red h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer" />
                  </div>

                  {/* Tenure */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={16} className="text-brand-red" /> Tenure (Years)
                      </label>
                      <span className="text-brand-red font-bold text-xl">{tenure} Years</span>
                    </div>
                    <input type="range" min="1" max="7" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-brand-red h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="space-y-6">
            <div className="card p-8 bg-brand-red/5 border-brand-red/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Calculator size={100} className="text-brand-red" />
              </div>
              
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-2">Estimated Monthly EMI</p>
              <h3 className="text-5xl font-bold text-brand-red mb-8">{formatPrice(emi)}</h3>
              
              <div className="space-y-4 pt-6 border-t border-brand-border">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Principal Amount</span>
                  <span className="text-white font-medium">{formatPrice(amount - downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Total Interest</span>
                  <span className="text-white font-medium">{formatPrice(totalInterest)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-brand-border">
                  <span className="text-white font-bold uppercase tracking-wider">Total Payable</span>
                  <span className="text-brand-red font-bold">{formatPrice(totalPayable)}</span>
                </div>
              </div>

              <button className="btn-primary w-full mt-10">Get Expert Financial Advice</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
