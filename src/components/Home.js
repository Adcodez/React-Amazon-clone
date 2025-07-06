import React, { useEffect } from "react";
import Products from "./Products";
import useShoppingStore from "../context/useShoppingStore";

const Home = () => {
  useEffect(() => {
    useShoppingStore.getState().fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 w-full min-h-screen pt-4">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <img
            className="w-full object-cover rounded-lg shadow-md"
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt="Amazon Banner"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🔥 Featured Products
        </h2>

        <Products />
      </div>
    </div>
  );
};

export default Home;