import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bebas tracking-wide">Manage Inventory</h1>
        <Link href="/admin/cars/new" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Car</span>
        </Link>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-800/50 text-neutral-400 text-sm">
              <tr>
                <th className="p-4 font-medium">Car</th>
                <th className="p-4 font-medium">Year</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 relative rounded overflow-hidden">
                        <Image 
                          src={car.images.find(img => img.isPrimary)?.url || car.images[0]?.url || "https://images.unsplash.com/photo-1555215695-3004980ad54e"} 
                          alt={car.model}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold">{car.brand} {car.model}</p>
                        <p className="text-xs text-neutral-400">{car.variant}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{car.year}</td>
                  <td className="p-4 text-red-500 font-medium">{formatPrice(car.price)}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium capitalize">
                      {car.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded text-neutral-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
