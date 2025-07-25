import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user, userData, updateUserProfile, logout } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (!user || !userData) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await updateUserProfile({
        name: form.name,
        phone: form.phone,
        address: form.address,
      });
      setMessage("Profile updated successfully!");
      setEdit(false);
    } catch (err) {
      setMessage("Error updating profile");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-white flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 md:p-12 border border-green-100">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">User Dashboard</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-200 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              disabled={!edit}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              className="w-full px-4 py-2 border border-green-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-200 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              disabled={!edit}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-200 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              disabled={!edit}
              required
            />
          </div>
          {message && <div className="text-center text-green-700 font-medium">{message}</div>}
          <div className="flex justify-between items-center mt-4">
            {edit ? (
              <>
                <button
                  type="submit"
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
                  onClick={() => { setEdit(false); setForm({ name: userData.name, phone: userData.phone, address: userData.address }); setMessage(""); }}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
            )}
            <button
              type="button"
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition ml-2"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;