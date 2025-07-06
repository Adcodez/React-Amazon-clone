import React from "react";
import { useNavigate } from "react-router-dom";
import useShoppingStore from "../context/useShoppingStore";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

const Checkout = () => {
  const basket = useShoppingStore((state) => state.basket);
  const user = useShoppingStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_add"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout_title">Your shopping basket</h2>

          {basket.length === 0 ? (
            <>
              <p className="text-gray-500 py-4">Your basket is currently empty.</p>
              <button
                onClick={() => navigate("/home")}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition mt-2"
              >
                ⬅ Back to Home
              </button>
            </>
          ) : (
            basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          )}
        </div>
      </div>

      {basket.length > 0 && (
        <div className="checkout_right">
          <Subtotal />
        </div>
      )}
    </div>
  );
};

export default Checkout;