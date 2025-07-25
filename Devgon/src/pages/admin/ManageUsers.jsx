import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/config";
import { collection, getDocs } from "firebase/firestore";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error loading users:", error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const snapshot = await getDocs(collection(db, "orders"));
      const ordersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
      setLoading(false);
    } catch (error) {
      console.error("Error loading orders:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  const getUserOrders = (userId) =>
    orders.filter((order) => order.userId === userId);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {loading ? (
        <p>Loading users and orders...</p>
      ) : (
        <table className="w-full border border-gray-300 mb-6">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Total Orders</th>
              <th className="p-2 border">Orders History</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const userOrders = getUserOrders(user.id);
              const isExpanded = expandedUserId === user.id;

              return (
                <React.Fragment key={user.id}>
                  <tr className="border-t">
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.phone}</td>
                    <td className="p-2 border">{user.address}</td>
                    <td className="p-2 border">{user.role}</td>
                    <td className="p-2 border">{userOrders.length}</td>
                    <td className="p-2 border">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() =>
                          setExpandedUserId(isExpanded ? null : user.id)
                        }
                      >
                        {isExpanded ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan="7" className="p-2 bg-gray-50">
                        <h3 className="font-semibold mb-2">
                          Order History ({userOrders.length})
                        </h3>
                        {userOrders.length === 0 ? (
                          <p className="text-gray-500">No orders found.</p>
                        ) : (
                          <ul className="list-disc ml-6 space-y-1 text-sm">
                            {userOrders.map((order) => (
                              <li key={order.id}>
                                <span className="font-medium">Order ID:</span>{" "}
                                {order.id} |{" "}
                                <span className="font-medium">Date:</span>{" "}
                                {formatDate(order.createdAt)} |{" "}
                                <span className="font-medium">Status:</span>{" "}
                                {order.status || "N/A"}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
