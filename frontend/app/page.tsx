import { prisma } from "@/lib/prisma";
import { HeroSearch } from "@/components/home/HeroSearch";
import { CarCarousel } from "@/components/home/CarCarousel";
import { StatsBar } from "@/components/home/StatsBar";
import { WhyFastlane } from "@/components/home/WhyFastlane";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ShowroomsSection } from "@/components/home/ShowroomsSection";
import { SellCtaSection } from "@/components/home/SellCtaSection";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";

async function getRecentCars() {
  return prisma.car.findMany({
    where: { status: "available" },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { images: true },
  });
}

async function getReviews() {
  return prisma.review.findMany({ where: { approved: true }, take: 6, orderBy: { createdAt: "desc" } });
}

async function getShowrooms() {
  return prisma.showroom.findMany({ take: 5 });
}

export default async function HomePage() {
  const [cars, reviews, showrooms] = await Promise.all([getRecentCars(), getReviews(), getShowrooms()]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-brand-dark via-brand-black to-brand-dark" />
          <div className="absolute inset-0 bg-red-glow opacity-30" />
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "linear-gradient(rgba(255,45,45,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,45,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <div className="container relative z-10 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-1.5 mb-8">
            <Zap size={14} className="text-brand-red" />
            <span className="text-sm text-brand-red font-medium">India&apos;s #1 Luxury Pre-Owned Car Marketplace</span>
          </div>

          <h1 className="font-bebas text-7xl md:text-9xl lg:text-[10rem] text-white leading-none tracking-wide mb-4">
            DRIVE YOUR
            <span className="block text-brand-red">DREAM</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Discover 5000+ certified luxury vehicles. BMW, Mercedes, Porsche, Ferrari & more — all inspected, verified, and ready to drive.
          </p>

          <div className="mb-10">
            <HeroSearch />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/cars" className="btn-primary flex items-center gap-2 text-base">
              Browse All Cars <ArrowRight size={18} />
            </Link>
            <Link href="/sell" className="btn-outline flex items-center gap-2 text-base">
              Sell Your Car
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 justify-center mt-10 text-sm text-gray-500">
            {[{ icon: Shield, text: "200-Point Inspection" }, { icon: Award, text: "Certified Quality" }, { icon: Zap, text: "Instant Offers" }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={14} className="text-brand-red" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-brand-red to-transparent" />
          <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* STATS */}
      <StatsBar />

      {/* RECENTLY ADDED */}
      <section className="section bg-brand-dark">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-bebas text-4xl md:text-5xl text-white">Recently Added</h2>
              <span className="red-line" />
            </div>
            <Link href="/cars" className="text-brand-red text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <CarCarousel cars={cars} />
        </div>
      </section>

      {/* WHY FASTLANE */}
      <WhyFastlane />

      {/* SELL CTA */}
      <SellCtaSection />

      {/* SHOWROOMS */}
      <ShowroomsSection showrooms={showrooms} />

      {/* TESTIMONIALS */}
      <Testimonials reviews={reviews} />

      {/* FAQ */}
      <FaqSection />

      {/* NEWSLETTER */}
      <NewsletterSection />
    </>
  );
}
