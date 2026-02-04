import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const CAR_IMAGES: Record<string, string[]> = {
  BMW: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1617654112368-307921291f42?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1200"
  ],
  Mercedes: [
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200"
  ],
  Porsche: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1611821064430-0d401179c07b?auto=format&fit=crop&q=80&w=1200"
  ],
  Audi: [
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1555652736-e92021d28a10?auto=format&fit=crop&q=80&w=1200"
  ],
  Ferrari: [
    "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200"
  ],
  Lamborghini: [
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200"
  ],
  Bentley: [
    "https://images.unsplash.com/photo-1563720223809-b2b2d9d87949?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1200"
  ],
  Rolls: [
    "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200"
  ],
};

function getImg(brand: string) {
  const key = Object.keys(CAR_IMAGES).find(k => brand.includes(k)) || "BMW";
  return CAR_IMAGES[key];
}

const FEATURES = ["Sunroof", "Leather Seats", "Navigation", "Bluetooth", "Cruise Control", "Lane Assist", "Parking Sensors", "360 Camera", "Heated Seats", "Ventilated Seats", "Heads-Up Display", "Apple CarPlay", "Android Auto", "Ambient Lighting", "Air Suspension"];

const INSPECTION = ["Engine Oil", "Brake Pads", "Tire Condition", "AC System", "Electrical Systems", "Battery Health", "Suspension", "Steering", "Transmission", "Exhaust System"].map(item => ({ item, status: "pass" }));

const CARS = [
  { brand: "BMW", model: "M5 Competition", year: 2022, price: 12500000, km: 18000, fuel: "Petrol", trans: "Automatic", body: "Sedan", color: "Black", state: "Delhi", engine: 4395, power: "625 bhp", torque: "750 Nm", variant: "M5 Competition xDrive" },
  { brand: "Mercedes-Benz", model: "GLE 53 AMG", year: 2023, price: 15000000, km: 8000, fuel: "Hybrid", trans: "Automatic", body: "SUV", color: "Silver", state: "Maharashtra", engine: 2999, power: "435 bhp", torque: "520 Nm", variant: "AMG 4MATIC+" },
  { brand: "Porsche", model: "Cayenne GTS", year: 2022, price: 18500000, km: 22000, fuel: "Petrol", trans: "Automatic", body: "SUV", color: "White", state: "Karnataka", engine: 4000, power: "460 bhp", torque: "620 Nm", variant: "Cayenne GTS Coupe" },
  { brand: "Audi", model: "RS7 Sportback", year: 2023, price: 17500000, km: 5000, fuel: "Petrol", trans: "Automatic", body: "Coupe", color: "Grey", state: "Telangana", engine: 3996, power: "591 bhp", torque: "800 Nm", variant: "RS7 Performance" },
  { brand: "Ferrari", model: "Roma", year: 2021, price: 38000000, km: 12000, fuel: "Petrol", trans: "Automatic", body: "Coupe", color: "Red", state: "Delhi", engine: 3855, power: "612 bhp", torque: "760 Nm", variant: "Roma GT" },
  { brand: "Lamborghini", model: "Urus S", year: 2023, price: 42000000, km: 6000, fuel: "Petrol", trans: "Automatic", body: "SUV", color: "White", state: "Maharashtra", engine: 3996, power: "666 bhp", torque: "850 Nm", variant: "Urus S" },
  { brand: "Bentley", model: "Continental GT", year: 2022, price: 35000000, km: 15000, fuel: "Petrol", trans: "Automatic", body: "Coupe", color: "Black", state: "Karnataka", engine: 5950, power: "635 bhp", torque: "900 Nm", variant: "Continental GT Speed" },
  { brand: "Rolls-Royce", model: "Ghost", year: 2023, price: 70000000, km: 3000, fuel: "Petrol", trans: "Automatic", body: "Sedan", color: "Silver", state: "Delhi", engine: 6749, power: "563 bhp", torque: "900 Nm", variant: "Ghost Series II" },
  { brand: "BMW", model: "X7 M60i", year: 2023, price: 14500000, km: 9000, fuel: "Petrol", trans: "Automatic", body: "SUV", color: "Blue", state: "Telangana", engine: 4395, power: "530 bhp", torque: "750 Nm", variant: "X7 M60i xDrive" },
  { brand: "Mercedes-Benz", model: "S 680 Maybach", year: 2022, price: 28000000, km: 7000, fuel: "Petrol", trans: "Automatic", body: "Sedan", color: "White", state: "Maharashtra", engine: 5980, power: "604 bhp", torque: "900 Nm", variant: "S 680 Maybach 4MATIC" },
  { brand: "Porsche", model: "911 GT3", year: 2022, price: 25000000, km: 11000, fuel: "Petrol", trans: "Automatic", body: "Coupe", color: "Red", state: "Karnataka", engine: 3996, power: "510 bhp", torque: "470 Nm", variant: "911 GT3 PDK" },
  { brand: "Audi", model: "R8 V10 Plus", year: 2021, price: 28500000, km: 19000, fuel: "Petrol", trans: "Automatic", body: "Coupe", color: "Black", state: "Delhi", engine: 5204, power: "620 bhp", torque: "580 Nm", variant: "R8 V10 Plus RWD" },
  { brand: "BMW", model: "i8 Roadster", year: 2020, price: 22000000, km: 25000, fuel: "Hybrid", trans: "Automatic", body: "Convertible", color: "Blue", state: "Maharashtra", engine: 1499, power: "369 bhp", torque: "570 Nm", variant: "i8 Roadster eDrive" },
  { brand: "Mercedes-Benz", model: "AMG GT 63 S", year: 2022, price: 26000000, km: 13000, fuel: "Petrol", trans: "Automatic", body: "Coupe", color: "Grey", state: "Telangana", engine: 3982, power: "630 bhp", torque: "900 Nm", variant: "AMG GT 63 S 4MATIC+" },
  { brand: "Lamborghini", model: "Huracán EVO", year: 2021, price: 32000000, km: 16000, fuel: "Petrol", trans: "Automatic", body: "Coupe", color: "Red", state: "Karnataka", engine: 5204, power: "640 bhp", torque: "600 Nm", variant: "Huracán EVO RWD" },
  { brand: "Bentley", model: "Bentayga EWB", year: 2023, price: 45000000, km: 4000, fuel: "Petrol", trans: "Automatic", body: "SUV", color: "Brown", state: "Delhi", engine: 3996, power: "542 bhp", torque: "770 Nm", variant: "Bentayga EWB Mulliner" },
  { brand: "Porsche", model: "Taycan Turbo S", year: 2023, price: 23000000, km: 7500, fuel: "Electric", trans: "Automatic", body: "Sedan", color: "White", state: "Maharashtra", engine: 0, power: "761 bhp", torque: "1050 Nm", variant: "Taycan Turbo S Cross Turismo" },
  { brand: "BMW", model: "M8 Competition", year: 2022, price: 20000000, km: 14000, fuel: "Petrol", trans: "Automatic", body: "Coupe", color: "Black", state: "Karnataka", engine: 4395, power: "625 bhp", torque: "750 Nm", variant: "M8 Competition xDrive" },
  { brand: "Audi", model: "e-tron GT", year: 2023, price: 19500000, km: 6000, fuel: "Electric", trans: "Automatic", body: "Sedan", color: "Grey", state: "Delhi", engine: 0, power: "637 bhp", torque: "830 Nm", variant: "RS e-tron GT" },
  { brand: "Mercedes-Benz", model: "EQS 580", year: 2023, price: 16500000, km: 4500, fuel: "Electric", trans: "Automatic", body: "Sedan", color: "Silver", state: "Telangana", engine: 0, power: "516 bhp", torque: "855 Nm", variant: "EQS 580 4MATIC" },
];

const SHOWROOMS = [
  { city: "Delhi", address: "Plot 42, DLF Cyber City, Gurugram, Delhi NCR", phone: "+91 98101 00001", email: "delhi@fastlane.in", hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM" },
  { city: "Mumbai", address: "Bandra Kurla Complex, Bandra East, Mumbai 400051", phone: "+91 98201 00002", email: "mumbai@fastlane.in", hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM" },
  { city: "Bangalore", address: "Outer Ring Road, Marathahalli, Bangalore 560037", phone: "+91 98401 00003", email: "bangalore@fastlane.in", hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM" },
  { city: "Hyderabad", address: "Financial District, Nanakramguda, Hyderabad 500032", phone: "+91 98501 00004", email: "hyderabad@fastlane.in", hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM" },
  { city: "Pune", address: "Baner Road, Baner, Pune 411045", phone: "+91 98601 00005", email: "pune@fastlane.in", hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM" },
];

const REVIEWS = [
  { name: "Arjun Kapoor", city: "Delhi", rating: 5, comment: "Bought my BMW M5 from Fastlane. The entire process was seamless — inspection report was thorough and the car was exactly as described. Will definitely buy again!", carModel: "BMW M5 Competition" },
  { name: "Priya Sharma", city: "Mumbai", rating: 5, comment: "Sold my old Mercedes here in literally 28 minutes. Best price in the market, zero paperwork headaches. Highly recommended!", carModel: "Mercedes-Benz C300" },
  { name: "Rahul Mehta", city: "Bangalore", rating: 5, comment: "The 200-point inspection gave me complete confidence. My Porsche Cayenne was perfect and the EMI process was super smooth.", carModel: "Porsche Cayenne" },
  { name: "Sneha Patel", city: "Hyderabad", rating: 4, comment: "Great experience. Test drive was arranged same day. Minor documentation delay but overall very professional team.", carModel: "Audi RS7" },
  { name: "Vikram Singh", city: "Pune", rating: 5, comment: "Fastlane is the future of luxury car buying in India. Transparent pricing, honest inspection, and the staff really knows their cars.", carModel: "Ferrari Roma" },
  { name: "Aisha Khan", city: "Delhi", rating: 5, comment: "Bought a Lamborghini Urus through Fastlane. The experience was premium from start to finish. Token payment was easy and secure.", carModel: "Lamborghini Urus" },
];

const BLOGS = [
  { slug: "top-10-luxury-suvs-2024", title: "Top 10 Luxury SUVs to Buy Pre-Owned in 2024", excerpt: "Our curated list of the best value luxury SUVs in the pre-owned market this year.", content: "The luxury SUV segment has never been more exciting...", category: "Buying Tips", author: "Rohan Das", published: true },
  { slug: "ferrari-vs-lamborghini-comparison", title: "Ferrari vs Lamborghini: Which Italian Supercar Is Right for You?", excerpt: "We compare the Roma and Huracán EVO head-to-head on performance, comfort, and ownership costs.", content: "The eternal rivalry between Ferrari and Lamborghini...", category: "Car Reviews", author: "Amit Verma", published: true },
  { slug: "emi-guide-luxury-cars-india", title: "Complete Guide to Financing Your Luxury Car in India", excerpt: "Everything you need to know about EMI options, banks, interest rates, and loan eligibility.", content: "Financing a luxury car in India has become increasingly accessible...", category: "Guides", author: "Neha Gupta", published: true },
];

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.carImage.deleteMany();
  await prisma.car.deleteMany();
  await prisma.showroom.deleteMany();
  await prisma.review.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  // Showrooms
  const showrooms = await Promise.all(SHOWROOMS.map(s => prisma.showroom.create({ data: s })));
  console.log(`✅ Created ${showrooms.length} showrooms`);

  // Cars
  for (let i = 0; i < CARS.length; i++) {
    const c = CARS[i];
    const slug = `${c.brand}-${c.model}-${c.year}-${(i + 1).toString().padStart(3, "0")}`.toLowerCase().replace(/[\s.]/g, "-").replace(/[^a-z0-9-]/g, "");
    const showroom = showrooms[i % showrooms.length];
    const imgs = getImg(c.brand);
    await prisma.car.create({
      data: {
        slug, brand: c.brand, model: c.model, year: c.year, variant: c.variant,
        price: c.price, kmDriven: c.km, fuelType: c.fuel, transmission: c.trans,
        bodyType: c.body, color: c.color, registrationState: c.state,
        engineCC: c.engine, power: c.power, torque: c.torque,
        mileage: c.fuel === "Electric" ? "400-500 km range" : "8-14 kmpl",
        owners: Math.floor(Math.random() * 2) + 1,
        description: `This stunning ${c.year} ${c.brand} ${c.model} is in excellent condition with ${c.km.toLocaleString()} km on the odometer. Fully serviced, accident-free, and comes with complete documentation. Available at our ${showroom.city} showroom.`,
        features: JSON.stringify(FEATURES.slice(0, 10 + Math.floor(Math.random() * 5))),
        inspectionReport: JSON.stringify(INSPECTION),
        status: i < 18 ? "available" : "booked",
        featured: i < 5,
        showroomId: showroom.id,
        images: { create: imgs.map((url, idx) => ({ url, isPrimary: idx === 0 })) },
      },
    });
  }
  console.log(`✅ Created ${CARS.length} cars`);

  // Admin
  await prisma.user.create({
    data: {
      name: "Fastlane Admin", email: "admin@fastlane.com",
      password: await bcrypt.hash("Admin@123", 12), role: "admin", phone: "+91 99999 00000",
    },
  });

  // Users
  const users = ["Arjun Kapoor", "Priya Sharma", "Rahul Mehta", "Sneha Patel", "Vikram Singh"];
  for (let i = 0; i < users.length; i++) {
    const name = users[i];
    const email = `${name.toLowerCase().replace(" ", ".")}@example.com`;
    await prisma.user.create({ data: { name, email, password: await bcrypt.hash("User@123", 12), phone: `+91 9800000${i + 10}` } });
  }
  console.log("✅ Created 6 users (1 admin + 5 regular)");

  // Reviews
  for (const r of REVIEWS) await prisma.review.create({ data: r });
  console.log(`✅ Created ${REVIEWS.length} reviews`);

  // Blog posts
  for (const b of BLOGS) {
    await prisma.blogPost.create({ data: { ...b, coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200" } });
  }
  console.log(`✅ Created ${BLOGS.length} blog posts`);

  console.log("\n🎉 Seed complete!");
  console.log("Admin: admin@fastlane.com / Admin@123");
  console.log("User:  arjun.kapoor@example.com / User@123");
}

main().catch(console.error).finally(() => prisma.$disconnect());
