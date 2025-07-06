

import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";

import Home from "./components/Home";
import Products from "./components/Products";
import Header from "./components/layout/Header";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import Wishlist from "./components/Wishlist"; // at the top

import { auth } from "./Firebase";
import useWishlistStore from "./context/useWishlistStore";
import useShoppingStore from "./context/useShoppingStore";

const promise = loadStripe(
  "pk_test_51Rc3u0FVZWznpKv5gNUNUlbTNrC00Wu61OvEEDCgvuR8OyfYqt1pMdNV2g8pbO765XhhL6l7Gz8L5C40eQCcFaMJ00sDNsZ3a6"
);

const App = () => {
  const setUser = useShoppingStore((state) => state.setUser);
  const user = useShoppingStore((state) => state.user);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("🔍 Firebase Auth State Changed:", user);
      setUser(user);
       useWishlistStore.getState().setUser(user);

    });
    return () => unsubscribe();
  }, [setUser]);
useEffect(() => {
  useShoppingStore.getState().fetchProducts();
}, []);



  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              user === undefined ? (
                <button className="cursor-progress">Loading...</button> // Show a loading state while Firebase initializes
              ) : user ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
