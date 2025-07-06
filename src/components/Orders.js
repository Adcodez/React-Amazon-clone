import React, { useEffect, useState } from "react";
import "./Orders.css";
import supabase from "../supabaseClient";
import useShoppingStore from "../context/useShoppingStore";
import CheckoutProduct from "./CheckoutProduct";
import moment from "moment";

const Orders = () => {
  const user = useShoppingStore((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.uid)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Supabase fetch failed:", error.message);
      } else {
        console.log("📦 Supabase orders:", data);
        setOrders(data);
      }
    };

    fetchOrders();
  }, [user?.uid]);

  return (
    <div className="orders px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-indigo-500 rounded-lg shadow-md mb-8 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold text-gray-800">
                🧾 <strong>Order ID:</strong> {order.id}
              </p>

              {/* I friggin love Tailwind!! */}
              <p className="text-sm text-black-500">
                {order.created_at
                  ? moment(order.created_at).format("MMMM Do YYYY, h:mma")
                  : "N/A"}
              </p>
            </div>

            <div className="space-y-4">
              {order.basket &&
                order.basket.map((item, idx) => (
                  <CheckoutProduct key={idx} {...item} hideButton />
                ))}
            </div>

            <div className="mt-6 border-t pt-4 flex justify-between items-center text-gray-700">
              <p className="text-lg font-bold">
                Total: ${order.amount ? (order.amount / 100).toFixed(2) : "N/A"}
              </p>
              {/* Optional: Add a "Return" button or status badge here */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
