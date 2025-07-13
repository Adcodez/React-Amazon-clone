const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config(); // Optional if you use a .env file locally

const app = express();

// Middlewares
app.use(
  cors({
    origin: "https://amazon-klones.netlify.app/", // use your actual Netlify URL
    credentials: true
  })
);

app.use(express.json());

// OPTIONS preflight (CORS)
app.options("/*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204).send("");
});

// Test route
app.get("/", (req, res) => res.status(200).send("✨ Render backend up and running"));

// Stripe payment route
app.post("/payments/create", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  res.set("Access-Control-Allow-Origin", "*");

  const total = req.body.total;
  console.log("💰 Total received:", total);

  if (!total || isNaN(total)) {
    return res.status(400).json({ error: "Invalid total amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total),
      currency: "usd",
    });

    console.log("✅ PaymentIntent created:", paymentIntent);
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("❌ Stripe error:", error.message);
    res.status(500).json({ error: "Could not create payment intent" });
  }
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server is running on port", process.env.PORT || 3000);
});