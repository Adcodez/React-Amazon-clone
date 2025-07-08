import "./Payment.css";
import axios from "../axios";
import OrderSuccessToast from "../components/OrderSuccessToast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";
import { db } from "../Firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import useShoppingStore from "../context/useShoppingStore";
import supabase from "../supabaseClient";

const Payment = () => {
  const basket = useShoppingStore((state) => state.basket);
  const user = useShoppingStore((state) => state.user);
  const [showToast, setShowToast] = useState(false);
  const getBasketTotal = useShoppingStore((state) => state.getBasketTotal);
  const emptyBasket = useShoppingStore((state) => state.emptyBasket);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const total = Math.round(getBasketTotal() * 100);
        console.log("🧮 Basket total:", total);
       const response = await axios.post("/.netlify/functions/payments-create", {
      total,
    });

        console.log("💳 Stripe worked response:", response);
        console.log("💳 Stripe client secret:", response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("❌ Axios error:", err.response?.data || err.message);
      }
    };

    if (basket.length > 0) getClientSecret();
  }, [basket, getBasketTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      setShowToast(true);
      // Show success toast

      const userOrdersRef = doc(
        collection(db, "user", user?.uid, "orders"),
        paymentIntent.id
      );

      await setDoc(userOrdersRef, {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setError(null);
      emptyBasket();
     try {
    const { data, error } = await supabase.from("orders").insert([
      {
        user_id: user?.uid,
        basket: basket,
        amount: paymentIntent.amount,
        created_at: new Date().toISOString(),
      },
    ]);

    console.log("📨 Supabase insert response:", data, error);

    if (error) {
      console.error("❌ Supabase insert failed:", error.message);
    } else {
      console.log("✅ Order inserted into Supabase successfully!");
    }
  } catch (supabaseError) {
    console.error("🔥 Supabase catch block error:", supabaseError.message);
  }

  navigate("/orders");
} catch (err) {
  console.error("❌ Stripe confirmCardPayment error:", err.message);
  setError(err.message);
} finally {
  setProcessing(false);
}

  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <>
      <div className="payment">
        <div className="payment_container">
          <h1>
            Checkout (<Link to="/checkout">{basket?.length} items</Link>)
          </h1>

          {/* Delivery Address */}
          <div className="payment_section">
            <div className="payment_title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment_address">
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Los Angeles, CA</p>
            </div>
          </div>

          {/* Item Review */}
          <div className="payment_section">
            <div className="payment_title">
              <h3>Review Items</h3>
            </div>
            <div className="payment_items">
              {basket.map((item) => (
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment_section">
            <div className="payment_title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment_details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment_priceContainer">
                  <NumericFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? "Processing..." : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div className="payment_error">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <OrderSuccessToast
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default Payment;
