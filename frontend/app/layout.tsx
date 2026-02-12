import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Fastlane | Drive Your Dream", template: "%s | Fastlane" },
  description: "India's premier luxury pre-owned car marketplace. Find certified BMW, Mercedes, Porsche, Ferrari & more. Transparent pricing, 200-point inspection.",
  keywords: ["luxury cars", "pre-owned cars", "used cars India", "BMW used", "Mercedes used", "Fastlane"],
  openGraph: {
    title: "Fastlane | Drive Your Dream",
    description: "India's premier luxury pre-owned car marketplace.",
    url: "https://fastlane.in",
    siteName: "Fastlane",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Fastlane", description: "Drive Your Dream" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-brand-dark text-white antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#1A1A1A", color: "#fff", border: "1px solid #2A2A2A" },
              success: { iconTheme: { primary: "#FF2D2D", secondary: "#fff" } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
