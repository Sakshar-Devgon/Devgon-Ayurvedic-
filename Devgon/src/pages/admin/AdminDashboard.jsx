import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/config";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { Package, ShoppingCart, Users, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      // 🔹 Fetch medicines count
      const medSnap = await getDocs(collection(db, "medicines"));
      setTotalMedicines(medSnap.size);

      // 🔹 Fetch orders and count totals + pending
      const orderSnap = await getDocs(collection(db, "orders"));
      const allOrders = orderSnap.docs.map((doc) => doc.data());
      setTotalOrders(allOrders.length);
      const pending = allOrders.filter(order => order.status !== "delivered");
      setPendingOrders(pending.length);

      // 🔹 Fetch users count
      const userSnap = await getDocs(collection(db, "users"));
      setTotalUsers(userSnap.size);
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">Admin Panel</h1>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-purple-700">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/manage-medicines" className="flex items-center space-x-2 text-gray-700 hover:text-purple-700">
            <Package size={20} />
            <span>Manage Medicines</span>
          </Link>
          <Link to="/admin/manage-orders" className="flex items-center space-x-2 text-gray-700 hover:text-purple-700">
            <ShoppingCart size={20} />
            <span>Manage Orders</span>
          </Link>
          <Link to="/admin/manage-users" className="flex items-center space-x-2 text-gray-700 hover:text-purple-700">
            <Users size={20} />
            <span>Manage Users</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">📊 Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-500">Total Medicines</h3>
            <p className="text-2xl font-bold text-purple-700">{totalMedicines}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-purple-700">{totalOrders}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-500">Pending Orders</h3>
            <p className="text-2xl font-bold text-orange-500">{pendingOrders}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-500">Registered Users</h3>
            <p className="text-2xl font-bold text-green-600">{totalUsers}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
