  import { Routes, Route } from "react-router-dom";
  import Home from "./pages/Home";
  import Login from "./pages/Login";
  import Signup from "./pages/Signup";
  import Cart from "./pages/Cart";
  import Medicines from "./pages/Medicines";
  import Checkout from "./pages/Checkout";
  import UserDashboard from "./pages/UserDashboard";
  import OrderHistory from "./pages/OrderHistory";
  import AdminDashboard from "./pages/admin/AdminDashboard";
  import ManageOrders from "./pages/admin/ManageOrders";
  import ManageMedicines from "./pages/admin/ManageMedicines";
  import ManageUsers from "./pages/admin/ManageUsers";
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";

  const AppRoutes = () => {
    return (
      <>
        <Navbar />
        <div className="min-h-screen px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/medicines" element={<ManageMedicines />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Routes>
        </div>
        <Footer />
      </>
    );
  };

  export default AppRoutes;
