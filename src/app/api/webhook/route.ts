import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    const body = await req.text(); // Read the request body as text
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation (e.g., update database, notify user)
      console.log(`Subscription deleted: ${deletedSubscription.id}`);
      break;

    case "customer.subscription.updated":
      const updatedSubscription = event.data.object as Stripe.Subscription;
      // Handle subscription update (e.g., update database, notify user)
      console.log(`Subscription updated: ${updatedSubscription.id}`);
      break;

    case "customer.subscription.created":
      const newSubscription = event.data.object as Stripe.Subscription;
      // Handle subscription creation (e.g., update database, notify user)
      console.log(`Subscription created: ${newSubscription.id}`);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
