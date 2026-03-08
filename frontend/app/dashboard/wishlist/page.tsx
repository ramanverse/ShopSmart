import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CarCard } from "@/components/cars/CarCard";

export default async function WishlistPage() {
  const session = await auth();
  
  const userEmail = session?.user?.email;
  if (!userEmail) return null;

  const wishlists = await prisma.wishlist.findMany({
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
      <h1 className="text-3xl font-bebas tracking-wide">My Wishlist</h1>
      
      {wishlists.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl text-center">
          <p className="text-neutral-400">Your wishlist is empty. Start exploring our collection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((item) => (
            <CarCard key={item.id} car={item.car} />
          ))}
        </div>
      )}
    </div>
  );
}
