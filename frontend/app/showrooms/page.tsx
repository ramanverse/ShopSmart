import { prisma } from "@/lib/prisma";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

async function getShowrooms() {
  return prisma.showroom.findMany();
}

export default async function ShowroomsPage() {
  const showrooms = await getShowrooms();

  return (
    <div className="min-h-screen pt-24 bg-brand-dark text-white">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-bebas text-6xl">OUR SHOWROOMS</h1>
            <span className="red-line" />
          </div>
          <p className="text-gray-400 max-w-md">
            Visit any of our state-of-the-art showrooms across India to experience 
            the Fastlane premium service firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showrooms.map((s) => (
            <div key={s.id} className="card group">
              <div className="relative h-48 bg-brand-black overflow-hidden">
                {/* Map Placeholder or Generic Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-1563720223809-b2b2d9d87949?auto=format&fit=crop&q=80&w=800`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" 
                  alt={s.city}
                />
                <div className="absolute bottom-4 left-6 z-20">
                  <h2 className="font-bebas text-3xl text-white tracking-wider">{s.city}</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex gap-3 text-sm">
                  <MapPin size={18} className="text-brand-red shrink-0" />
                  <p className="text-gray-400">{s.address}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 border-t border-brand-border pt-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-brand-red" />
                    <span className="text-gray-300">{s.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-brand-red" />
                    <span className="text-gray-300">{s.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-brand-red" />
                    <span className="text-gray-300">{s.hours}</span>
                  </div>
                </div>

                <button className="btn-primary w-full text-sm py-2.5 flex items-center justify-center gap-2 mt-4">
                  Get Directions <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
