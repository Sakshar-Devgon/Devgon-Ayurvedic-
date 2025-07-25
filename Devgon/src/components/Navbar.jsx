import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { user, userData, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setDropdown(false);
    navigate("/");
  };

  if (loading) return null;

  const isAdmin = userData?.role === "admin";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between w-full py-3 px-2 md:px-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Center Nav Links (Desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-lg text-gray-800 font-medium">
          {!isAdmin ? (
            <>
              <Link to="/" className="hover:text-[#4CAF50]">Home</Link>
              <Link to="/medicines" className="hover:text-[#4CAF50]">Medicines</Link>
              <Link to="/cart" className="hover:text-[#4CAF50]">Cart</Link>
              <Link to="/contact" className="hover:text-[#4CAF50]">Contact</Link>
            </>
          ) : (
            <>
              <Link to="/admin/medicines" className="hover:text-[#4CAF50]">Manage Medicines</Link>
              <Link to="/admin/users" className="hover:text-[#4CAF50]">Manage Users</Link>
              <Link to="/admin/orders" className="hover:text-[#4CAF50]">Manage Orders</Link>
            </>
          )}
        </div>

        {/* Right User Section */}
        <div className="flex items-center relative">
          {user ? (
            <div className="relative">
              <button onClick={() => setDropdown(!dropdown)} className="focus:outline-none">
                <UserCircle className="h-8 w-8 text-[#4CAF50]" />
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {userData?.name || user.email}
                  </div>
                  {!isAdmin && (
                    <>
                      <Link
                        to="/user-dashboard"
                        className="block px-4 py-2 hover:bg-green-50"
                        onClick={() => setDropdown(false)}
                      >
                        User Dashboard
                      </Link>
                      <Link
                        to="/order-history"
                        className="block px-4 py-2 hover:bg-green-50"
                        onClick={() => setDropdown(false)}
                      >
                        Order History
                      </Link>
                    </>
                  )}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-green-50"
                      onClick={() => setDropdown(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-green-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-lg font-medium text-gray-800 hover:text-[#4CAF50]">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center ml-2">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 text-gray-800 bg-white shadow">
          {!isAdmin ? (
            <>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/medicines" onClick={() => setIsOpen(false)}>Medicines</Link>
              <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </>
          ) : (
            <>
              <Link to="/admin/medicines" onClick={() => setIsOpen(false)}>Manage Medicines</Link>
              <Link to="/admin/users" onClick={() => setIsOpen(false)}>Manage Users</Link>
              <Link to="/admin/orders" onClick={() => setIsOpen(false)}>Manage Orders</Link>
            </>
          )}
          {user ? (
            <>
              {!isAdmin && (
                <>
                  <Link to="/user-dashboard" onClick={() => setIsOpen(false)}>User Dashboard</Link>
                  <Link to="/order-history" onClick={() => setIsOpen(false)}>Order History</Link>
                </>
              )}
              {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>}
              <button onClick={handleLogout} className="w-full text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
