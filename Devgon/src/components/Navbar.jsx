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

  if (loading) return null; // Or a spinner if you want

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      {/* Full-width nav wrapper */}
      <div className="flex items-center justify-between w-full py-3 px-2 md:px-4 relative">
        {/* Logo (Left) */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/logo.png"
              alt="Devgon Ayurvedic Logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>
        {/* Center Nav Links (absolute center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-lg text-gray-800 font-medium">
          <Link to="/" className="hover:text-[#4CAF50] transition">Home</Link>
          <Link to="/medicines" className="hover:text-[#4CAF50] transition">Medicines</Link>
          <Link to="/cart" className="hover:text-[#4CAF50] transition">Cart</Link>
          <Link to="/contact" className="hover:text-[#4CAF50] transition">Contact</Link>
        </div>
        {/* Login/Profile (Right) */}
        <div className="flex items-center relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdown((d) => !d)}
                className="focus:outline-none"
                aria-label="User menu"
              >
                <UserCircle className="h-8 w-8 text-[#4CAF50] hover:text-green-600 transition" />
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{userData?.name || user.email}</div>
                  <Link
                    to="/user-dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-green-50"
                    onClick={() => setDropdown(false)}
                  >
                    User Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-green-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium text-gray-800 hover:text-[#4CAF50] transition"
            >
              Login
            </Link>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center ml-2">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 text-gray-800 bg-white shadow">
          <Link to="/" className="block text-base hover:text-[#4CAF50]" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/medicines" className="block text-base hover:text-[#4CAF50]" onClick={() => setIsOpen(false)}>Medicines</Link>
          <Link to="/cart" className="block text-base hover:text-[#4CAF50]" onClick={() => setIsOpen(false)}>Cart</Link>
          <Link to="/contact" className="block text-base hover:text-[#4CAF50]" onClick={() => setIsOpen(false)}>Contact</Link>
          {user ? (
            <>
              <Link to="/user-dashboard" className="block text-base hover:text-[#4CAF50]" onClick={() => setIsOpen(false)}>User Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left text-base hover:text-[#4CAF50]">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block text-base hover:text-[#4CAF50]" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
