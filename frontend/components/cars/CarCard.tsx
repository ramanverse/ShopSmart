"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, GitCompare, Fuel, Gauge, Calendar } from "lucide-react";
import { formatPrice, formatKm, cn } from "@/lib/utils";
import { useWishlistStore, useCompareStore } from "@/lib/store";
import toast from "react-hot-toast";

interface CarCardProps {
  car: {
    id: string;
    slug: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    kmDriven: number;
    fuelType: string;
    transmission: string;
    registrationState: string;
    status: string;
    images: { url: string; isPrimary: boolean }[];
  };
}

export function CarCard({ car }: CarCardProps) {
  const { toggleItem, hasItem } = useWishlistStore();
  const { addItem, hasItem: inCompare, removeItem } = useCompareStore();
  const isWishlisted = hasItem(car.id);
  const isInCompare = inCompare(car.id);
  const primaryImage = car.images.find((i) => i.isPrimary)?.url || car.images[0]?.url || "/placeholder-car.jpg";

  const handleCompare = () => {
    if (isInCompare) {
      removeItem(car.id);
      toast.success("Removed from compare");
    } else {
      addItem(car as any);
      toast.success("Added to compare");
    }
  };

  return (
    <div className="card group relative">
      {car.status === "booked" && (
        <div className="absolute top-3 left-3 z-10 badge bg-brand-red text-white">BOOKED</div>
      )}
      {/* Actions */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <button
          onClick={() => { toggleItem(car.id); toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
          className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200", isWishlisted ? "bg-brand-red text-white" : "bg-black/60 text-white hover:bg-brand-red")}
        >
          <Heart size={14} fill={isWishlisted ? "white" : "none"} />
        </button>
        <button
          onClick={handleCompare}
          className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200", isInCompare ? "bg-blue-600 text-white" : "bg-black/60 text-white hover:bg-blue-600")}
        >
          <GitCompare size={14} />
        </button>
      </div>

      <Link href={`/cars/${car.slug}`}>
        <div className="relative h-52 overflow-hidden">
          <Image src={primaryImage} alt={`${car.brand} ${car.model}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-brand-red font-semibold uppercase tracking-wider">{car.brand}</p>
              <h3 className="font-semibold text-white text-lg leading-tight">{car.model}</h3>
            </div>
            <div className="text-right">
              <p className="text-brand-red font-bold text-lg">{formatPrice(car.price)}</p>
              <p className="text-xs text-gray-500">{car.year}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400 mt-3 flex-wrap">
            <span className="flex items-center gap-1"><Gauge size={12} />{formatKm(car.kmDriven)}</span>
            <span className="flex items-center gap-1"><Fuel size={12} />{car.fuelType}</span>
            <span className="flex items-center gap-1"><Calendar size={12} />{car.transmission}</span>
            <span className="ml-auto text-gray-500">{car.registrationState}</span>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border">
            <span className="btn-primary block text-center text-sm py-2">View Details</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
