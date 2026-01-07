import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import loginIllustration from "../assets/login-illustration.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
// 🔹 STORE – EXACT
localStorage.setItem(`${res.role}_token`, res.token);
localStorage.setItem(`${res.role}_name`, res.name);
localStorage.setItem(`${res.role}_email`, res.email || email);

// 🔹 IMPORTANT
localStorage.setItem("role", res.role);   // keep original
      console.log(res);

      if (res.role === "SUPER_ADMIN") navigate("/super-admin");
      else if (res.role === "ADMIN") navigate("/admin");
      else if (res.role === "FIELD_EXECUTIVE") navigate("/field");
      else navigate("/customer");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-10">
        <div className="w-[385px] max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-700 mb-8 font-bold">
            Enter your Credentials to access your account
          </p>

          {/* Email */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email or Phone
          </label>
          <input
            value={email}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email or phone"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Remember */}
          <div className="flex items-center mb-6">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">
              Remember for 30 days
            </span>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-900 text-white py-2.5 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* RIGHT SECTION (Illustration) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
        <img
          src={loginIllustration}
          alt="Login Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
