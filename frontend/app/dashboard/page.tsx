import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Heart, Calendar, MessageSquare, Car } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();
  
  const userEmail = session?.user?.email;
  if (!userEmail) return null;

  const [testDrives, enquiries, wishlists] = await Promise.all([
    prisma.testDrive.findMany({
      where: { user: { email: userEmail } },
      include: { car: true },
      orderBy: { createdAt: "desc" },
      take: 3
    }),
    prisma.enquiry.findMany({
      where: { user: { email: userEmail } },
      include: { car: true },
      orderBy: { createdAt: "desc" },
      take: 3
    }),
    prisma.wishlist.findMany({
      where: { user: { email: userEmail } },
      include: { car: { include: { images: true } } },
      orderBy: { createdAt: "desc" },
      take: 3
    })
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bebas tracking-wide">Welcome, {session.user?.name || "User"}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-400 font-medium">Saved Cars</p>
              <h3 className="text-3xl font-bold mt-2">{wishlists.length}</h3>
            </div>
            <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
              <Heart className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-400 font-medium">Test Drives</p>
              <h3 className="text-3xl font-bold mt-2">{testDrives.length}</h3>
            </div>
            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-400 font-medium">Enquiries</p>
              <h3 className="text-3xl font-bold mt-2">{enquiries.length}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Test Drives */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5"/> Recent Test Drives</h2>
            <Link href="/dashboard/test-drives" className="text-sm text-red-500 hover:text-red-400">View All</Link>
          </div>
          <div className="p-6 space-y-4">
            {testDrives.length === 0 ? (
              <p className="text-neutral-500">No test drives scheduled yet.</p>
            ) : (
              testDrives.map((td) => (
                <div key={td.id} className="flex justify-between items-center border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-bold">{td.car.brand} {td.car.model}</h4>
                    <p className="text-sm text-neutral-400">{new Date(td.date).toLocaleDateString()} at {td.timeSlot}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    td.status === 'pending' ? 'bg-orange-500/10 text-orange-500' :
                    td.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {td.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2"><MessageSquare className="w-5 h-5"/> Recent Enquiries</h2>
            <Link href="/dashboard/enquiries" className="text-sm text-red-500 hover:text-red-400">View All</Link>
          </div>
          <div className="p-6 space-y-4">
            {enquiries.length === 0 ? (
              <p className="text-neutral-500">No enquiries submitted yet.</p>
            ) : (
              enquiries.map((enq) => (
                <div key={enq.id} className="flex justify-between items-center border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-bold">{enq.car.brand} {enq.car.model}</h4>
                    <p className="text-sm text-neutral-400 truncate max-w-[200px]">{enq.message || "No message"}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    enq.status === 'new' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                  }`}>
                    {enq.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
