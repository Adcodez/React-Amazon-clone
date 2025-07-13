import React from "react";

const WishlistItem = ({ item }) => {
  
  return (
    <div className="flex items-center bg-white p-4 rounded-md shadow">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="ml-4">
        <h3 className="font-semibold text-lg">{item.title || "No title"}</h3>
        <p className="text-gray-900 text-sm">R{item.price ?? "N/A"}</p>
        {item.rating ? (
          <p className="text-yellow-500 text-sm">⭐ {item.rating} / 5</p>
        ) : (
          <p className="text-gray-400 text-sm italic">No rating yet</p>
        )}
      </div>
      {/* Maybe back to home button?? */}
    </div>
  );
};

export default WishlistItem;
