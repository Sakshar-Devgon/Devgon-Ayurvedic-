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

const statusSteps = ["placed", "processing", "shipped", "delivered"];

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, userData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        status: "placed",
      };

      await addDoc(collection(db, "orders"), order);
      clearCart();
      fetchOrders();
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

  const renderStatusTimeline = (currentStatus) => {
    const currentIndex = statusSteps.indexOf(currentStatus);

    return (
      <div className="flex justify-between items-center mt-4 mb-2">
        {statusSteps.map((step, index) => (
          <div key={step} className="flex-1 text-center">
            <div
              className={`w-4 h-4 mx-auto rounded-full mb-1 ${
                index <= currentIndex ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`text-xs ${
                index <= currentIndex ? "text-green-700 font-semibold" : "text-gray-500"
              }`}
            >
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-2 md:px-0">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-green-100">
        <h2 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mb-6">
            Your cart is empty. Add some items to see them here.
          </p>
        ) : (
          <>
            <div className="divide-y divide-green-100 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-5 transition hover:bg-green-50 rounded-lg px-2">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="h-16 w-16 flex items-center justify-center bg-green-100 rounded-lg text-gray-400 border">
                      No Image
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900 text-lg">{item.name}</h4>
                    <p className="text-gray-600 text-sm">₹{item.price} x {item.quantity}</p>
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

            <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-xl font-bold text-green-900">Total:</span>
              <span className="text-2xl font-bold text-green-700">₹{total}</span>
            </div>

            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition text-lg mb-3"
              onClick={placeOrder}
            >
              ✅ Place Order (COD)
            </button>
            <button
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition text-sm"
              onClick={clearCart}
            >
              🗑️ Clear Cart
            </button>
          </>
        )}

        {/* Orders Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
            📦 Your Orders
          </h3>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center text-sm">No orders placed yet.</p>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-green-100 p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-700">
                      Order ID: <span className="text-gray-500">{order.id}</span>
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                  </div>

                  {/* Timeline */}
                  {renderStatusTimeline(order.status)}

                  <div className="divide-y divide-gray-100 text-sm text-gray-800">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-1 flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-sm text-gray-600">
                    <span className="font-semibold">Total: ₹{order.total}</span>
                    <span>{new Date(order.createdAt).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md text-center border border-red-200">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              🔒 Login Required
            </h2>
            <p className="text-gray-700 mb-4">
              You need to log in to place an order.
            </p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              onClick={() => {
                window.location.href = "/login";
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
