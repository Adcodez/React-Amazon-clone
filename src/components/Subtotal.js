// import React, { useContext } from "react";
// import { useNavigate} from "react-router-dom";
// import {NumericFormat} from "react-number-format";
// import "./Subtotal.css";
// import ShoppingContext from "../context/shopping/shoppingContext";
// const Subtotal = () => {
//   const navigate = useNavigate();
//   const shoppingContext = useContext(ShoppingContext);
//   const { basket, getBasketTotal } = shoppingContext;

import React from "react";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import "./Subtotal.css";
import useShoppingStore from "../context/useShoppingStore";

const Subtotal = () => {
  const navigate = useNavigate();
  const basket = useShoppingStore((state) => state.basket);
  const getBasketTotal = useShoppingStore((state) => state.getBasketTotal);


  return (
    <div className="subtotal">
      <NumericFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={(e) => navigate("/payment")}>
        Proceed to checkout!
      </button>
    </div>
  );
};

export default Subtotal;
