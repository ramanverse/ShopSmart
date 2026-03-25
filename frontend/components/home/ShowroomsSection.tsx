import Link from "next/link";
import { MapPin } from "lucide-react";

interface Showroom { id: string; city: string; address: string; phone: string; }

export function ShowroomsSection({ showrooms }: { showrooms: Showroom[] }) {
  return (
    <section className="section bg-brand-black">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-bebas text-4xl md:text-5xl text-white">Our Showrooms</h2>
            <span className="red-line" />
          </div>
          <Link href="/showrooms" className="text-brand-red text-sm hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {showrooms.map((s) => (
            <Link key={s.id} href={`/showrooms`}
              className="card p-6 text-center group hover:border-brand-red/60 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-red transition-all duration-300">
                <MapPin size={20} className="text-brand-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-white mb-1">{s.city}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{s.address}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
