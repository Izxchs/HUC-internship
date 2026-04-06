"use client";

import { useState } from "react";
import API from "../utils/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-cyan-400 mb-2">
          Login
        </h1>

        <p className="text-center text-gray-400 mb-6 text-sm">
          Access your calendar
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            placeholder="Email"
            className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-black py-2 rounded-lg font-medium transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}