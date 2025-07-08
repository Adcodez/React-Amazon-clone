import Stripe from "stripe";

// ✅ Safety check BEFORE initializing Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY is missing");
}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  const { total } = JSON.parse(event.body);

  if (!total || isNaN(total)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid total amount" }),
    };
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total),
    currency: "usd",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
  };
}