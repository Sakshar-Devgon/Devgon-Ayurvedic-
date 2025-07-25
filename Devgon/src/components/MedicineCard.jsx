import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const MedicineCard = ({ id, name, description, price, imageUrl }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, imageUrl }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-lg border border-green-200 hover:shadow-2xl transition p-4 gap-4 min-h-[180px] relative group">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-28 w-28 object-cover rounded-lg border flex-shrink-0 group-hover:scale-105 transition"
        />
      ) : (
        <div className="h-28 w-28 flex items-center justify-center bg-green-50 rounded-lg text-gray-400 border flex-shrink-0">
          No Image
        </div>
      )}
      <div className="flex-1 w-full flex flex-col justify-between h-full">
        <div>
          <h4 className="text-lg font-bold text-green-900 mb-1 line-clamp-1">{name}</h4>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-green-700 font-bold text-xl">₹{price}</span>
          <div className="flex items-center gap-2">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-green-200 rounded px-2 py-1 text-sm focus:ring-green-400 focus:border-green-400"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded font-semibold text-sm shadow transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
        {added && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow-lg animate-fade-in-out">
            Added to cart
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;
