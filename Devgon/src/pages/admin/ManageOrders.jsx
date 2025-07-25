import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../Firebase/config";

const statusSteps = ["placed", "processing", "shipped", "delivered"];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
    setLoading(false);
  };

  const updateStatus = async (orderId, currentStatus) => {
    const currentIndex = statusSteps.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex >= statusSteps.length - 1) return;

    const nextStatus = statusSteps[currentIndex + 1];
    const updateData = { status: nextStatus };

    if (nextStatus === "delivered") {
      updateData.deliveredAt = new Date().toISOString();
    }

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, updateData);
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const renderStatusTimeline = (currentStatus) => {
    const currentIndex = statusSteps.indexOf(currentStatus);
    return (
      <div className="flex justify-between items-center mt-2 mb-2">
        {statusSteps.map((step, index) => (
          <div key={step} className="flex-1 text-center">
            <div
              className={`w-4 h-4 mx-auto rounded-full mb-1 ${
                index <= currentIndex ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`text-xs ${
                index <= currentIndex
                  ? "text-green-700 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on searchTerm
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(term) ||
      (order.userName && order.userName.toLowerCase().includes(term)) ||
      (order.userEmail && order.userEmail.toLowerCase().includes(term))
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🛠️ Manage Orders
      </h2>

      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Order ID, User Name or Email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No matching orders found.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>User:</strong> {order.userName || "N/A"} (
                    {order.userEmail})
                  </p>
                  <p className="text-xs text-gray-500">
                    Placed on:{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                  {order.deliveredAt && (
                    <p className="text-xs text-green-700 mt-1">
                      Delivered on:{" "}
                      {new Date(order.deliveredAt).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      order.status === "placed"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "shipped"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>

                  {statusSteps.indexOf(order.status) <
                    statusSteps.length - 1 && (
                    <button
                      onClick={() => updateStatus(order.id, order.status)}
                      className="ml-4 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark as{" "}
                      {statusSteps[statusSteps.indexOf(order.status) + 1]}
                    </button>
                  )}
                </div>
              </div>

              {/* Timeline */}
              {renderStatusTimeline(order.status)}

              <div className="divide-y divide-gray-100 text-sm mt-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-1 flex justify-between text-gray-800"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="text-right text-sm font-semibold text-green-700 mt-2">
                Total: ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
