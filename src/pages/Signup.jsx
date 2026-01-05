import { useState } from "react";
import { signup } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

  const handleSignup = async () => {
    await signup(form);
    alert("Signup successful");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl w-96 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        <input className="input mb-2" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="input mb-2" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" className="input mb-2" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <select className="input mb-4"
          onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="CUSTOMER">Customer</option>
          <option value="FIELD_EXECUTIVE">Field Executive</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={handleSignup}>
          Signup
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
