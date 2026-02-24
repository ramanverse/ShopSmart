import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CarGallery } from "@/components/cars/CarGallery";
import { CarDetailTabs } from "@/components/cars/CarDetailTabs";
import { EnquireModal } from "@/components/cars/EnquireModal";
import { TestDriveModal } from "@/components/cars/TestDriveModal";
import { EmiCalculatorWidget } from "@/components/cars/EmiCalculatorWidget";
import { CarCard } from "@/components/cars/CarCard";
import { formatPrice, formatKm } from "@/lib/utils";
import { Fuel, Gauge, GitCommit, MapPin, Users, Zap } from "lucide-react";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

async function getCar(slug: string) {
  return prisma.car.findUnique({
    where: { slug },
    include: { images: true, showroom: true },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await getCar(params.slug);
  if (!car) return { title: "Car Not Found" };
  return {
    title: `${car.year} ${car.brand} ${car.model}`,
    description: `Buy certified ${car.year} ${car.brand} ${car.model} at ${formatPrice(car.price)}. ${car.kmDriven.toLocaleString()} km driven, ${car.fuelType}, ${car.transmission}.`,
  };
}

export default async function CarDetailPage({ params }: Props) {
  const car = await getCar(params.slug);
  if (!car) notFound();

  const similar = await prisma.car.findMany({
    where: { brand: car.brand, id: { not: car.id }, status: "available" },
    take: 4, include: { images: true },
  });

  const specs = [
    { label: "KM Driven", value: formatKm(car.kmDriven), icon: Gauge },
    { label: "Fuel Type", value: car.fuelType, icon: Fuel },
    { label: "Transmission", value: car.transmission, icon: GitCommit },
    { label: "Owners", value: `${car.owners} Owner${car.owners > 1 ? "s" : ""}`, icon: Users },
    { label: "Reg. State", value: car.registrationState, icon: MapPin },
    { label: "Engine", value: car.engineCC ? `${car.engineCC} cc` : "—", icon: Zap },
  ];

  return (
    <div className="min-h-screen pt-20 bg-brand-dark">
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <CarGallery images={car.images} />

            {/* Title & Price */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="text-brand-red text-sm font-semibold uppercase tracking-widest">{car.brand}</p>
                <h1 className="font-bebas text-4xl md:text-5xl text-white">{car.model}</h1>
                <p className="text-gray-400 mt-1">{car.year} · {car.variant || car.bodyType}</p>
              </div>
              <div className="text-right">
                <p className="font-bebas text-4xl text-brand-red">{formatPrice(car.price)}</p>
                {car.status === "booked" && (
                  <span className="badge bg-brand-red/20 text-brand-red border border-brand-red/30 mt-1">BOOKED</span>
                )}
              </div>
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {specs.map(({ label, value, icon: Icon }) => (
                <div key={label} className="card p-3 text-center">
                  <Icon size={18} className="text-brand-red mx-auto mb-2" />
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            <CarDetailTabs car={car} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Price Card */}
            <div className="card p-5">
              <p className="font-bebas text-3xl text-brand-red mb-1">{formatPrice(car.price)}</p>
              <p className="text-gray-400 text-sm mb-4">+ Taxes & Registration</p>
              <div className="space-y-3">
                <EnquireModal carId={car.id} carName={`${car.brand} ${car.model}`} />
                <TestDriveModal carId={car.id} carName={`${car.brand} ${car.model}`} />
              </div>
              {car.status === "available" && (
                <div className="mt-4 pt-4 border-t border-brand-border">
                  <p className="text-xs text-gray-400 mb-2">Secure your car with a token amount</p>
                  <button className="w-full btn-outline text-sm py-2">
                    💳 Pay ₹10,000 Token
                  </button>
                </div>
              )}
            </div>

            {/* EMI */}
            <EmiCalculatorWidget price={car.price} />

            {/* Showroom */}
            {car.showroom && (
              <div className="card p-5">
                <h3 className="font-semibold text-white mb-3">Showroom Info</h3>
                <p className="text-brand-red text-sm font-semibold">{car.showroom.city}</p>
                <p className="text-gray-400 text-sm mt-1">{car.showroom.address}</p>
                <a href={`tel:${car.showroom.phone}`} className="text-brand-red text-sm mt-2 block hover:underline">{car.showroom.phone}</a>
              </div>
            )}

            {/* Share */}
            <div className="card p-4">
              <h3 className="font-semibold text-white mb-3 text-sm">Share This Car</h3>
              <div className="flex gap-2">
                <a href={`https://wa.me/?text=Check this car: ${car.brand} ${car.model} - ${typeof window !== "undefined" ? window.location.href : ""}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white text-xs font-medium py-2 rounded text-center hover:bg-green-700 transition-colors">
                  WhatsApp
                </a>
                <button onClick={() => {}}
                  className="flex-1 bg-brand-card border border-brand-border text-white text-xs font-medium py-2 rounded hover:border-brand-red transition-colors">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-bebas text-3xl text-white mb-6">Similar Cars</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
