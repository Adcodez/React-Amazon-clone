
import React from "react";
import "./Product.css";
import useShoppingStore from "../context/useShoppingStore";
import useWishlistStore from "../context/useWishlistStore";
const Product = ({ id, image, title, rating, price }) => {
  console.log("🖼️ Image:", image);
console.log("🔤 Title:", title);
console.log("🖼️ Image received:", image);
  const addToBasket = useShoppingStore((state) => state.addToBasket);
  //wishlis
  const { addToWishlist } = useWishlistStore();
  const safeRating = Math.max(1, Math.min(Number(rating) || 1, 5));

  const addToBasketHandler = () => {
    addToBasket({ id, image, title, rating: safeRating, price });
  };

return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col text-center h-[420px] hover:shadow-lg transition">
  <div className="flex-shrink-0">
    <img
      src={image}
      alt={title}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/assets/fallback.png";
      }}
      className="w-full h-[200px] object-contain bg-gray-50 rounded mb-2"
    />
  </div>

  <div className="flex-grow flex flex-col justify-between">
    <div>
      <h3 className="text-base font-semibold mb-1 line-clamp-2 text-gray-800">{title}</h3>
      <div className="text-yellow-500 text-sm mb-2">
        {Array.from({ length: safeRating }, (_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
      <p className="text-indigo-600 font-bold text-md">
        <small>$</small>
        {price.toFixed(2)}
      </p>
    </div>

    <div className="mt-4 space-y-2">
      <button
        className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
        onClick={addToBasketHandler}
      >
        🛒 Add to Basket
      </button>
      <button
        className="w-full bg-pink-100 text-pink-600 py-2 rounded hover:bg-pink-200 transition"
        onClick={() => addToWishlist({ id, image, title, rating: safeRating, price })}
      >
        ❤️ Add to Wishlist
      </button>
    </div>
  </div>
</div>

  );
};



export default Product;
