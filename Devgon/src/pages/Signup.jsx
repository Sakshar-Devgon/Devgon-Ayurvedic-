import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/config";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!form.phone.match(/^\d{10}$/)) {
      setError("Phone number must be 10 digits");
      return;
    }
    if (!form.address.trim()) {
      setError("Address is required");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Save additional user data in Firestore with default role and status
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        role: "user",           // ✅ default role
        suspended: false,       // ✅ default status
        createdAt: new Date()
      });

      navigate("/login"); // Redirect to login page after signup
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-white flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 md:p-12 border border-green-100">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/logo.png" alt="Devgon Ayurvedic Logo" className="h-16 mb-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-1 text-center">Create Your Account</h2>
          <p className="text-gray-600 text-center text-sm mb-2">Join Devgon Ayurvedic for authentic wellness & medical care</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-1 bg-green-50 placeholder:text-green-700"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-1 bg-green-50 placeholder:text-green-700"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-1 bg-green-50 placeholder:text-green-700"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-1 bg-green-50 placeholder:text-green-700"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-1 bg-green-50 placeholder:text-green-700"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-2 bg-green-50 placeholder:text-green-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#4CAF50] hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold shadow transition text-lg flex items-center justify-center gap-2"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-green-700 font-semibold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
