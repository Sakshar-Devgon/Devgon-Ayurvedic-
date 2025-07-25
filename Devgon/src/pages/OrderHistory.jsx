import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date =
      timestamp?.seconds !== undefined
        ? new Date(timestamp.seconds * 1000)
        : new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        📜 Order History
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  <strong>Order ID:</strong> {order.id}
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium capitalize">
                  {order.status}
                </span>
              </div>

              <div className="divide-y divide-gray-100 mb-2 text-sm">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span className="font-semibold">Total: ₹{order.total}</span>
                <div className="text-right space-y-1">
                  <div>📅 Placed on: {formatDate(order.createdAt)}</div>
                  {order.deliveredAt && (
                    <div className="text-green-700">
                      ✅ Delivered on: {formatDate(order.deliveredAt)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
