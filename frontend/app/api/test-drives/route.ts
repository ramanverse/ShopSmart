import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, date, timeSlot, carId } = body;
    if (!name || !phone || !date || !timeSlot || !carId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const td = await prisma.testDrive.create({ data: { name, phone, email, date: new Date(date), timeSlot, carId } });
    return NextResponse.json(td);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const items = await prisma.testDrive.findMany({ orderBy: { createdAt: "desc" }, include: { car: true } });
  return NextResponse.json(items);
}
