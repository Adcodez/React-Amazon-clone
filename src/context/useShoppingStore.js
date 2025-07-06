

import { create } from "zustand";
import supabase from "../supabaseClient";

const useShoppingStore = create((set, get) => ({
  products: [],
  basket: [],
  user: null,
  setUser: (user) => set({ user }),


  fetchProducts: async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("❌ Failed to fetch products:", error.message);
      return;
    }

    set({ products: data });
    console.log("📦 Products fetched:", data);
  },

  addToBasket: (item) =>
    set((state) => ({ basket: [...state.basket, item] })),
updateProduct: async (id, changes) => {
  try {
    const { error } = await supabase
      .from("products")
      .update(changes)
      .eq("id", id);

    if (error) {
      console.error("❌ Failed to update product:", error.message);
      return;
    }

    console.log("✅ Product updated successfully!");
    await get().fetchProducts(); // re-fetch products
  } catch (err) {
    console.error("🔥 Unexpected error:", err);
  }
},
addProduct: async (newProduct) => {
  const { error } = await supabase.from("products").insert([newProduct]);

  if (error) {
    console.error("❌ Failed to add product:", error.message);
  } else {
    console.log("✅ New product added!");
    get().fetchProducts(); // refresh list
  }
},

  removeFromBasket: (id) =>
    set((state) => ({
      basket: state.basket.filter((item) => item.id !== id),
    })),

  emptyBasket: () => set({ basket: [] }),

  getBasketTotal: () =>
    get().basket.reduce((total, item) => total + Number(item.price || 0), 0),
}));


export default useShoppingStore;