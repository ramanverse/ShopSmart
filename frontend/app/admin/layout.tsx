import Link from "next/link";
import { Car, Calendar, MessageSquare, LayoutDashboard, Settings, LogOut, DollarSign } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inventory", href: "/admin/cars", icon: Car },
    { name: "Test Drives", href: "/admin/test-drives", icon: Calendar },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { name: "Sell Requests", href: "/admin/sell-requests", icon: DollarSign },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-900 pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-neutral-800 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bebas text-white tracking-wider">Fastlane <span className="text-red-500">Admin</span></h2>
        </div>
        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 text-neutral-400 hover:text-white hover:bg-neutral-800 px-4 py-3 rounded-lg transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
