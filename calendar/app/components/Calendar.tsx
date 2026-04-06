"use client";

import dayjs from "dayjs";

export default function Calendar({
  onDateClick,
  events,
  currentMonth,
  setCurrentMonth,
}: any) {
  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();

  const startDay = startOfMonth.day();

  const daysArray = [];

  for (let i = 0; i < startDay; i++) {
    daysArray.push(null);
  }

  for (let i = 0; i < daysInMonth; i++) {
    daysArray.push(startOfMonth.add(i, "day"));
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4 text-gray-200">

      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-cyan-400 tracking-wide">
          {currentMonth.format("MMMM YYYY")}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition"
          >
            ←
          </button>

          <button
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
            className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition"
          >
            →
          </button>
        </div>
      </div>

      {/* WEEK HEADER */}
      <div className="grid grid-cols-7 mb-3 text-center text-sm font-semibold text-gray-400">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-3">
        {daysArray.map((day: any, index) => {
          if (!day) return <div key={index}></div>;

          const dayEvents = events.filter(
            (e: any) =>
              dayjs(e.date).format("YYYY-MM-DD") ===
              day.format("YYYY-MM-DD")
          );

          return (
            <div
              key={index}
              onClick={() => onDateClick(day.format("YYYY-MM-DD"))}
              className="bg-slate-900 border border-slate-800 rounded-xl p-2 h-28 shadow hover:shadow-xl hover:scale-[1.03] transition cursor-pointer flex flex-col"
            >
              {/* DATE */}
              <div className="text-sm font-semibold text-cyan-400">
                {day.format("DD")}
              </div>

              {/* EVENTS */}
              <div className="mt-1 space-y-1 overflow-hidden flex-1">
                {dayEvents.slice(0, 2).map((event: any) => (
                  <div
                    key={event._id}
                    className="bg-violet-500 text-white text-xs px-2 py-0.5 rounded truncate"
                  >
                    {event.title}
                  </div>
                ))}
              </div>

              {/* MORE EVENTS */}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-400 mt-1">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}