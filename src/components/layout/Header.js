import { useEffect } from "react";

import useShoppingStore from "../../context/useShoppingStore";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import useWishlistStore from "../../context/useWishlistStore";
import { auth } from "../../Firebase";
const Header = () => {
  // const shoppingContext = useContext(ShoppingContext);
  // const { basket, user } = shoppingContext;
  const basket = useShoppingStore((state) => state.basket);
  const user = useShoppingStore((state) => state.user);
  const navigate = useNavigate();
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);

  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  useEffect(() => {
    if (user) fetchWishlist();
  }, [user, fetchWishlist]);
  const handleAuthentication = async () => {
    if (user) {
      await auth.signOut();
      useShoppingStore.getState().setUser(null);
      useWishlistStore.getState().setUser(null);
      navigate("/login"); // 🔁 Redirect after sign-out
    }
  };

  useEffect(() => {
    console.log("💖 Wishlist Count (Header):", wishlistCount);
  }, [wishlistCount]);

  const wishlist = useWishlistStore((state) => state.wishlist);
  console.log("🧾 Wishlist (raw Zustand state):", wishlist);

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50 flex items-center px-4 py-3 gap-4">
      <Link to="/">
        <img
          className="h-10 w-24 mt-5"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </Link>
      <span className="text-xl font-bold -ml-4 top-0 left-0">.co.za</span>

      {/* Location */}
      <div className="flex items-center space-x-1 ml-2">
        <span className="material-icons text-white text-xl">location_on</span>
        <div className="flex flex-col">
          <span className="text-sm text-gray-300">
            Delivering to Sandton 2196
          </span>
          <span className="text-sm text-white font-semibold">
            Update Location
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-1 max-w-[700px] mx-auto">
        <div className="flex w-full items-center rounded overflow-hidden shadow">
          <button className="bg-gray-200 text-sm px-3 py-2 hover:bg-gray-600 All-btn">
            All
          </button>
          <input
            className="flex-1 px-4 py-2 text-black text-sm outline-none"
            type="text"
            placeholder="Search Amazon"
          />
          <span className="material-icons bg-yellow-400 text-black px-3 py-2.5 cursor-pointer hover:bg-yellow-500">
            search
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 whitespace-nowrap">
        <Link to={user ? "#" : "/login"}>
          <div
            onClick={handleAuthentication}
            className="flex flex-col cursor-pointer"
          >
            <span>Hello {!user ? "Guest" : user.email}</span>
            <span className="font-bold">{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="flex flex-col ">
            <span>Returns</span>
            <span className="font-bold">& Orders</span>
          </div>
        </Link>

        <Link
          to="/wishlist"
          className="text-red-400 font-semibold  hover:underline"
        >
          ❤️ Wishlist ({wishlistCount})
        </Link>

        <Link to="/checkout" className="flex items-center relative">
          <span className="absolute -top-2 right-3 bg-yellow-400 text-black rounded-full px-1 text-xs font-bold">
            {basket?.length}
          </span>
          <i className="material-icons text-2xl">shopping_cart</i>
          <span className="ml-1 text-sm font-bold">Basket</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
