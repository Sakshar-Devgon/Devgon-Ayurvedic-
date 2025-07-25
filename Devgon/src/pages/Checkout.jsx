import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase/config";
import { addDoc, collection } from "firebase/firestore";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!user) return;

    try {
      const order = {
        userId: user.uid,
        userName: userData?.name || "",
        userEmail: user.email,
        items: cart,
        total,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      await addDoc(collection(db, "orders"), order);
      clearCart();
      navigate("/cart");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-50">
        <h2 className="text-2xl font-bold text-red-600 mb-2">You are not logged in</h2>
        <p className="text-gray-600 mb-4">Please log in to proceed to checkout and place your order.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-2 md:px-0">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 border border-green-100">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Checkout</h2>

        <div className="mb-4">
          <p><strong>Name:</strong> {userData?.name || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="divide-y divide-gray-200 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between py-3">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4 mb-6 text-lg">
              <span className="font-semibold text-green-800">Total:</span>
              <span className="text-green-700 font-bold">₹{total}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#4CAF50] hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg shadow"
            >
              Place Order (Cash on Delivery)
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
