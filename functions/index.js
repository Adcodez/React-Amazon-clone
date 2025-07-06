/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
;

//API

//App Config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.body.total;
   console.log("💰 Total received:", request.body.total); // 👈 Add this

  if (!total || isNaN(total)) {
    return response.status(400).send({ error: "Invalid total amount" });
  }

  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total), //subunits of currency
    currency: "usd",
  });
  console.log("✅ PaymentIntent created:", paymentIntent);
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Listeners
exports.api = onRequest(app);
