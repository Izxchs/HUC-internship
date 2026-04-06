"use client";

import { useState } from "react";
import API from "@/app/utils/api";

export default function EventModal({ date: initialDate, onClose }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState(initialDate || "");

  const handleSubmit = async () => {
    if (!title.trim() || !date) return;

    await API.post("/events", {
      title,
      description,
      date,
    });

    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 w-[420px] rounded-2xl shadow-2xl p-6"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-cyan-400">
            Add Event
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* TITLE */}
        <input
          placeholder="Event title"
          className="w-full bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none p-2.5 mb-3 rounded-lg text-sm transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DATE */}
        <div className="mb-3">
          <label className="text-sm text-gray-400 block mb-1">
            {initialDate ? "Event Date" : "Select Date"}
          </label>

          {initialDate ? (
            <div className="p-2.5 border border-slate-700 rounded-lg text-sm bg-slate-800 text-gray-300">
              {new Date(date + "T00:00:00").toDateString()}
            </div>
          ) : (
            <input
              type="date"
              className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          )}
        </div>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Add description..."
          rows={3}
          className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 mb-4 rounded-lg text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border border-slate-700 hover:bg-slate-800 transition text-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!title || !date}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black px-5 py-2 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}