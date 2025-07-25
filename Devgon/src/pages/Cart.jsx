import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../Firebase/config";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, userData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

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
      fetchOrders(); // refresh orders
      alert("Order placed successfully (Cash on Delivery).");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Try again.");
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-2 md:px-0">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mb-6">Your cart is empty.</p>
        ) : (
          <>
            <div className="divide-y divide-green-100 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded border"
                    />
                  ) : (
                    <div className="h-16 w-16 flex items-center justify-center bg-green-50 rounded text-gray-400 border">
                      No Image
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-green-700 font-bold text-lg">
                    ₹{item.price * item.quantity}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-green-900">Total:</span>
              <span className="text-2xl font-bold text-green-700">
                ₹{total}
              </span>
            </div>

            <button
              className="w-full bg-[#4CAF50] text-white py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition text-lg mb-2"
              onClick={placeOrder}
            >
              Proceed to Place Order
            </button>
            <button
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition text-sm"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </>
        )}

        {/* Orders Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Your Orders
          </h3>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">No orders placed yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border p-4 rounded shadow-sm bg-green-50"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-green-700">
                      Order ID:
                    </span>
                    <span className="text-sm text-gray-600">{order.id}</span>
                  </div>
                  <div className="text-sm text-gray-800">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-700">
                    <span>Total: ₹{order.total}</span>
                    <span>
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔒 Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center border">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              Login Required
            </h2>
            <p className="text-gray-700 mb-4">
              You need to log in to place an order.
            </p>
            <button
              className="bg-[#4CAF50] text-white px-6 py-2 rounded hover:bg-green-700 transition"
              onClick={() => {
                window.location.href = "/login"; // or use `navigate("/login")` if using `useNavigate`
              }}
            >
              Go to Login
            </button>
            <button
              className="ml-4 px-4 py-2 text-sm text-gray-600 hover:underline"
              onClick={() => setShowLoginModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
