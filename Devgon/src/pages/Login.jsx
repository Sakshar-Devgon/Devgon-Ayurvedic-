import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/config";
import { getDoc, doc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      console.log("Logged in UID:", uid);

      // Fetch user data from Firestore
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("User role:", userData.role);

        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        console.warn("User document not found in Firestore.");
        setError("User data not found. Contact support.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-white flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 md:p-12 border border-green-100">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/logo.png" alt="Devgon Ayurvedic Logo" className="h-16 mb-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-1 text-center">
            Login to Your Account
          </h2>
          <p className="text-gray-600 text-center text-sm mb-2">
            Welcome back to Devgon Ayurvedic
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 placeholder:text-green-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 placeholder:text-green-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#4CAF50] text-white py-2.5 rounded-lg font-semibold shadow hover:bg-green-700 transition text-lg flex items-center justify-center gap-2"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">  
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-700 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
