import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default async function UserTestDrivesPage() {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) return null;

  const testDrives = await prisma.testDrive.findMany({
    where: { user: { email: userEmail } },
    include: { 
      car: { 
        include: { images: true } 
      } 
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bebas tracking-wide flex items-center gap-2"><Calendar className="w-6 h-6"/> My Test Drives</h1>

      {testDrives.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl text-center">
          <p className="text-neutral-400">You haven't scheduled any test drives yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testDrives.map((td) => (
            <div key={td.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-32 h-24 relative rounded-lg overflow-hidden shrink-0">
                <Image 
                  src={td.car.images.find(img => img.isPrimary)?.url || td.car.images[0]?.url || "https://images.unsplash.com/photo-1555215695-3004980ad54e"} 
                  alt={td.car.model}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-bold">{td.car.brand} {td.car.model}</h3>
                <p className="text-sm text-neutral-400">
                  Scheduled for: <span className="text-white font-medium">{new Date(td.date).toLocaleDateString()} at {td.timeSlot}</span>
                </p>
              </div>
              <div className="shrink-0 text-center sm:text-right">
                <span className={`px-4 py-2 rounded-lg text-sm font-bold capitalize ${
                  td.status === 'pending' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                  td.status === 'confirmed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                  'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}>
                  {td.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
