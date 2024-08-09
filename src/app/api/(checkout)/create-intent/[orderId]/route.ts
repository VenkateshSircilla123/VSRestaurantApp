import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  // console.log("order", orderId);

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  // console.log(order)

  if (order) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        description: "this is payment intent",
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      console.log(paymentIntent.client_secret);

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: { intent_id: paymentIntent.id },
      });

      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        { status: 200 }
      );
    } catch (error) {
      console.log("venky something wrong");
    }
  }
  return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
    status: 404,
  });
}
