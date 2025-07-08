/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import Stripe from "stripe"; // ✅ if "type": "module" is set


// API

// App Config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// 👇 Manual handling for OPTIONS preflight requests
app.options("/{*splat}", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204).send("");
});


// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const stripe = new Stripe("sk_test_51Rc3u0FVZWznpKv5ZAhylIG97jbOg7VL98BW88VldhZ0KrymshwOPJJLpP1XLoVluRafR7IT8LLi8WKh4Fw7odgn00Igzm2yFo");

console.log("🔐 Stripe Key:", process.env.STRIPE_SECRET_KEY);
  response.set("Access-Control-Allow-Origin", "*");
  const total = request.body.total;
  console.log("💰 Total received:", request.body.total); // 👈 Add this

  if (!total || isNaN(total)) {
    return response.status(400).send({error: "Invalid total amount"});
  }

  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total), // subunits of currency
    currency: "usd",
  });
  console.log("✅ PaymentIntent created:", paymentIntent);
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
export const api = onRequest(app);

