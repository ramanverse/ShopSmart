import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message, preferredTime, carId } = body;
    if (!name || !phone || !carId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const enquiry = await prisma.enquiry.create({ data: { name, phone, message, preferredTime, carId } });
    return NextResponse.json(enquiry);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, include: { car: true } });
  return NextResponse.json(enquiries);
}
