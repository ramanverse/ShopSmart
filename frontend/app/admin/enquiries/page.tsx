import { prisma } from "@/lib/prisma";
import { CheckCircle, MessageSquare } from "lucide-react";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bebas tracking-wide">Enquiries</h1>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-800/50 text-neutral-400 text-sm">
              <tr>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Car</th>
                <th className="p-4 font-medium">Message</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="p-4 font-medium">{enq.name}</td>
                  <td className="p-4">
                    <div className="text-sm">{enq.phone}</div>
                    <div className="text-xs text-neutral-400">{enq.email}</div>
                  </td>
                  <td className="p-4 text-sm font-medium text-red-500">
                    {enq.car.brand} {enq.car.model}
                  </td>
                  <td className="p-4 text-sm max-w-xs truncate" title={enq.message || ""}>
                    {enq.message || "-"}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      enq.status === 'new' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-blue-500/10 rounded text-neutral-400 hover:text-blue-500 transition-colors" title="Reply via WhatsApp">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-green-500/10 rounded text-neutral-400 hover:text-green-500 transition-colors" title="Mark as Resolved">
                        <CheckCircle className="w-4 h-4" />
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
