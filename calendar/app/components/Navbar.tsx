"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventModal from "./EventModal";

export default function Navbar() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  return (
    <>
      <div className="flex justify-between items-center px-6 py-3 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800 shadow">

        {/* TITLE */}
        <h1 className="text-xl font-semibold text-White-400 tracking-wide">
          Calendar
        </h1>

        <div className="flex items-center gap-3">

          {/* ADD EVENT */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg"
          >
            + Add Event
          </button>

          {/* AUTH BUTTONS */}
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg text-sm transition shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <EventModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}``