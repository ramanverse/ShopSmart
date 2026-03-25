import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateReferenceId } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const refId = generateReferenceId();
    const sellRequest = await prisma.sellRequest.create({
      data: { ...body, referenceId: refId, photos: JSON.stringify(body.photos || []) },
    });
    return NextResponse.json({ success: true, referenceId: refId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const items = await prisma.sellRequest.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}
