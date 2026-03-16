import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2024-10-28.acacia",
});

export async function POST(req: Request) {
  try {
    const { amount, carId, email } = await req.json();

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit (e.g., paise for INR, cents for USD)
      currency: "inr",
      metadata: {
        carId,
        email,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
