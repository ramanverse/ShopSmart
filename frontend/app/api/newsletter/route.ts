import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
    await prisma.newsletter.upsert({ where: { email }, create: { email }, update: {} });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Already subscribed" }, { status: 400 });
  }
}
