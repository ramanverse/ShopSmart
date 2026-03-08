import Link from "next/link";
import { User, Heart, Calendar, MessageSquare, LogOut } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  const navItems = [
    { name: "My Profile", href: "/dashboard", icon: User },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "My Test Drives", href: "/dashboard/test-drives", icon: Calendar },
    { name: "My Enquiries", href: "/dashboard/enquiries", icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-900 pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-neutral-800 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white">My Account</h2>
          <p className="text-neutral-400 text-sm mt-1">{session.user?.email}</p>
        </div>
        <nav className="px-4 space-y-2 mt-4">
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
