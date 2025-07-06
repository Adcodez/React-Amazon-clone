import { create } from "zustand";
import supabase from "../supabaseClient";

const useWishlistStore = create((set, get) => ({
  wishlist: [],
  user: null,

  setUser: (user) => set({ user }),

  setWishlist: (items) => set({ wishlist: items }),

  fetchWishlist: async () => {
    const { user } = get();
    if (!user?.uid) return;

    const { data, error } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", user.uid);

    if (!error) {
      set({
        wishlist: data.map((row) => ({
          ...row,
          _rowId: row.id,
        })),
      });
    } else {
      console.error("❌ fetchWishlist error:", error.message);
    }
  },

  addToWishlist: async (item) => {
    const { user } = get();
    if (!user?.uid || !item) return;

    const { data, error } = await supabase
      .from("wishlist")
      .insert([
        {

          id: item.id, // 👈 this is key for matching in your products list
          user_id: user.uid,
          title: item.title,
          price: item.price,
          image: item.image,
          rating: item.rating ?? null,
        },
      ])
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return;
    }

    if (data && data.length > 0) {
      const insertedItem = {
        ...data[0],
        _rowId: data[0].id, // optional for rendering or removal
      };

      // ✅ Replace whole wishlist with fresh list
      set((state) => ({
        wishlist: [...state.wishlist, insertedItem],
      }));

      console.log("✅ Wishlist updated locally:", get().wishlist);
    }
  },
  fetchProducts: async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("❌ Failed to fetch products:", error.message);
    return;
  }
  set({ products: data });
},

  removeFromWishlist: async (wishlistId) => {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("wishlist_id", wishlistId);

  if (!error) {
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.wishlist_id !== wishlistId),
    }));
  }
},
}));

export default useWishlistStore;
