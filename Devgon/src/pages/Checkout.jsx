import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (!user) {
        setMessage("You must be logged in to place an order.");
        setLoading(false);
        return;
      }
      if (!address) {
        setMessage("Please enter your delivery address.");
        setLoading(false);
        return;
      }
      const order = {
        userId: user.uid,
        address,
        alternateMobile,
        items: cart,
        total,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      await addDoc(collection(db, "orders"), order);
      clearCart();
      setMessage("Order placed successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage("Error placing order: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-2 md:px-0">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Checkout</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="divide-y divide-green-100 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="h-14 w-14 object-cover rounded border" />
                  ) : (
                    <div className="h-14 w-14 flex items-center justify-center bg-green-50 rounded text-gray-400 border">No Image</div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900 mb-1">{item.name}</h4>
                    <p className="text-gray-600 text-sm">₹{item.price} x {item.quantity}</p>
                  </div>
                  <div className="text-green-700 font-bold text-lg">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-green-900">Total:</span>
              <span className="text-2xl font-bold text-green-700">₹{total}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter your delivery address"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Receiver Mobile Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                value={alternateMobile}
                onChange={(e) => setAlternateMobile(e.target.value)}
                placeholder="Optional alternate mobile number"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4CAF50] text-white py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition text-lg"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
            {message && <p className="mt-4 text-center text-green-700 font-semibold">{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
