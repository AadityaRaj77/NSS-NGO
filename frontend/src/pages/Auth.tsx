import { useState } from "react";
import { login, register } from "../api/auth";
import { setToken } from "../utils/token";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [adminKey, setAdminKey] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await login(email, password);
        setToken(res.data.access_token);
        alert("Login successful");
      } else {
        await register(email, password, role, adminKey);
        alert("Registered successfully");
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-[380px] rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-blue-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="mt-1 mb-6 text-sm text-gray-500">
          {isLogin
            ? "Login to continue to the NGO platform"
            : "Register to get started"}
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <>
            <select
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none mb-4"
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="USER">Register as User</option>
              <option value="ADMIN">Register as Admin</option>
            </select>

            {role === "ADMIN" && (
              <input
                placeholder="Admin Secret Key"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none mb-4"
                onChange={(e) => setAdminKey(e.target.value)}
              />
            )}
          </>
        )}

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 font-semibold text-white hover:opacity-95 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="mt-6 text-center text-sm text-blue-700 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
