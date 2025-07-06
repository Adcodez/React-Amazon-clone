// import React, { useContext } from "react";
// import ShoppingContext from "../context/shopping/shoppingContext";
// import { {useShoppingStore} } from "../context/{useShoppingStore}";
// import "./CheckoutProduct.css";
// const CheckoutProduct = ({ id, title, image, price, rating, hideButton }) => {
//   const shoppingContext = useContext(ShoppingContext);
//   const { removeFromBasket } = shoppingContext;
//   // removeFromBasketHandler
//  const removeFromBasketHandler = () => {
//     removeFromBasket({ id: id });
//   };
import React from "react";
import useShoppingStore from "../context/useShoppingStore";
import "./CheckoutProduct.css";

const CheckoutProduct = ({ id, title, image, price, rating, hideButton }) => {
  const removeFromBasket = useShoppingStore((state) => state.removeFromBasket);

  const removeFromBasketHandler = () => {
    removeFromBasket(id); // Zustand uses just the id, not an object
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} alt=""/>
      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        {!hideButton && (
          <button onClick={removeFromBasketHandler}>Remove from basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
