import useWishlistStore from "../context/useWishlistStore";
import useShoppingStore from "../context/useShoppingStore";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  const wishlist = useWishlistStore((state) => state.wishlist); // [{ id }]
  const allProducts = useShoppingStore((state) => state.products);

  // map wishlist ids to live product info

const wishlistProducts = wishlist
  .map((wish) => allProducts.find((p) => String(p.id) === String(wish.id))
  )
  .filter(Boolean); // remove any nulls if product isn't found
console.log("🧾 Wishlist raw from store:", wishlist);
console.log("📦 Products from store:", allProducts);
  return (
    <div>
      {wishlist.map((wish, index) => {
        const product = allProducts.find((p) => String(p.id) === String(wish.id));
        return product ? (
          <WishlistItem key={product.id} item={product} />
        ) : (
          <div key={`unmatched-${index}`} className="p-2 text-red-500">
            ⚠️ Product not found for wishlist item with id: {wish.id}
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;