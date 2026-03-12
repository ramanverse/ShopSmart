import { prisma } from "@/lib/prisma";
import { CheckCircle, XCircle } from "lucide-react";

export default async function AdminTestDrivesPage() {
  const testDrives = await prisma.testDrive.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bebas tracking-wide">Test Drives</h1>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-800/50 text-neutral-400 text-sm">
              <tr>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Car</th>
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {testDrives.map((td) => (
                <tr key={td.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="p-4 font-medium">{td.name}</td>
                  <td className="p-4">
                    <div className="text-sm">{td.phone}</div>
                    <div className="text-xs text-neutral-400">{td.email}</div>
                  </td>
                  <td className="p-4 text-sm font-medium text-red-500">
                    {td.car.brand} {td.car.model}
                  </td>
                  <td className="p-4">
                    <div className="text-sm">{new Date(td.date).toLocaleDateString()}</div>
                    <div className="text-xs text-neutral-400">{td.timeSlot}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      td.status === 'pending' ? 'bg-orange-500/10 text-orange-500' :
                      td.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {td.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-green-500/10 rounded text-neutral-400 hover:text-green-500 transition-colors" title="Confirm">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded text-neutral-400 hover:text-red-500 transition-colors" title="Cancel">
                        <XCircle className="w-4 h-4" />
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
