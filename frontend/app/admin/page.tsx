import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Car, Calendar, MessageSquare, DollarSign } from "lucide-react";

export default async function AdminDashboard() {
  const [carCount, testDrives, enquiries, sellRequests] = await Promise.all([
    prisma.car.count(),
    prisma.testDrive.count({ where: { status: "pending" } }),
    prisma.enquiry.count({ where: { status: "new" } }),
    prisma.sellRequest.count({ where: { status: "new" } })
  ]);

  const recentEnquiries = await prisma.enquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { car: true }
  });

  const stats = [
    { name: "Total Inventory", value: carCount, icon: Car, color: "text-blue-500" },
    { name: "Pending Test Drives", value: testDrives, icon: Calendar, color: "text-orange-500" },
    { name: "New Enquiries", value: enquiries, icon: MessageSquare, color: "text-green-500" },
    { name: "Sell Requests", value: sellRequests, icon: DollarSign, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bebas tracking-wide">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 text-sm font-medium">{stat.name}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className={`p-3 bg-neutral-800 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mt-8">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold">Recent Enquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-800/50 text-neutral-400 text-sm">
              <tr>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Car</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="p-4">{enq.name}</td>
                  <td className="p-4">{enq.car.brand} {enq.car.model}</td>
                  <td className="p-4">{enq.phone}</td>
                  <td className="p-4">{new Date(enq.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                      {enq.status}
                    </span>
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
