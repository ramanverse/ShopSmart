import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { MessageSquare } from "lucide-react";

export default async function UserEnquiriesPage() {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) return null;

  const enquiries = await prisma.enquiry.findMany({
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
      <h1 className="text-3xl font-bebas tracking-wide flex items-center gap-2"><MessageSquare className="w-6 h-6"/> My Enquiries</h1>

      {enquiries.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl text-center">
          <p className="text-neutral-400">You haven't made any enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div key={enq.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-32 h-24 relative rounded-lg overflow-hidden shrink-0">
                <Image 
                  src={enq.car.images.find(img => img.isPrimary)?.url || enq.car.images[0]?.url || "https://images.unsplash.com/photo-1555215695-3004980ad54e"} 
                  alt={enq.car.model}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{enq.car.brand} {enq.car.model}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    enq.status === 'new' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 bg-black p-3 rounded-lg border border-neutral-800">
                  "{enq.message || "No specific message provided."}"
                </p>
                <p className="text-xs text-neutral-500">Submitted on: {new Date(enq.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
