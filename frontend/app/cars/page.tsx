import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/cars/CarCard";
import { FilterSidebar } from "@/components/cars/FilterSidebar";
import { CarListingHeader } from "@/components/cars/CarListingHeader";
import { Pagination } from "@/components/ui/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Buy Cars", description: "Browse 5000+ certified luxury pre-owned cars" };

const PER_PAGE = 12;

interface SearchParams {
  search?: string; brand?: string; fuel?: string; body?: string; transmission?: string;
  priceMin?: string; priceMax?: string; yearMin?: string; yearMax?: string;
  kmMin?: string; kmMax?: string; sort?: string; page?: string; color?: string; state?: string;
}

async function getCars(params: SearchParams) {
  const page = parseInt(params.page || "1");
  const skip = (page - 1) * PER_PAGE;

  const where: any = {};
  if (params.search) {
    where.OR = [
      { brand: { contains: params.search, mode: "insensitive" } },
      { model: { contains: params.search, mode: "insensitive" } },
    ];
  }
  if (params.brand) where.brand = params.brand;
  if (params.fuel) where.fuelType = params.fuel;
  if (params.body) where.bodyType = params.body;
  if (params.transmission) where.transmission = params.transmission;
  if (params.color) where.color = params.color;
  if (params.state) where.registrationState = params.state;
  if (params.priceMin || params.priceMax) {
    where.price = {};
    if (params.priceMin) where.price.gte = parseFloat(params.priceMin);
    if (params.priceMax) where.price.lte = parseFloat(params.priceMax);
  }
  if (params.yearMin || params.yearMax) {
    where.year = {};
    if (params.yearMin) where.year.gte = parseInt(params.yearMin);
    if (params.yearMax) where.year.lte = parseInt(params.yearMax);
  }
  if (params.kmMin || params.kmMax) {
    where.kmDriven = {};
    if (params.kmMin) where.kmDriven.gte = parseInt(params.kmMin);
    if (params.kmMax) where.kmDriven.lte = parseInt(params.kmMax);
  }

  let orderBy: any = { createdAt: "desc" };
  if (params.sort === "price_asc") orderBy = { price: "asc" };
  if (params.sort === "price_desc") orderBy = { price: "desc" };
  if (params.sort === "km_asc") orderBy = { kmDriven: "asc" };
  if (params.sort === "year_desc") orderBy = { year: "desc" };

  const [cars, total] = await Promise.all([
    prisma.car.findMany({ where, orderBy, skip, take: PER_PAGE, include: { images: true } }),
    prisma.car.count({ where }),
  ]);
  return { cars, total, page, totalPages: Math.ceil(total / PER_PAGE) };
}

export default async function CarsPage({ searchParams }: { searchParams: SearchParams }) {
  const { cars, total, page, totalPages } = await getCars(searchParams);

  return (
    <div className="min-h-screen pt-20 bg-brand-dark">
      <div className="container py-8">
        <CarListingHeader total={total} />
        <div className="flex gap-6 mt-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>
          <div className="flex-1">
            {cars.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-bebas text-4xl text-gray-600 mb-4">No Cars Found</p>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {cars.map((car) => <CarCard key={car.id} car={car} />)}
                </div>
                <div className="mt-10">
                  <Pagination page={page} totalPages={totalPages} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
