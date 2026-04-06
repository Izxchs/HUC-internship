"use client";

import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";
import Navbar from "./components/Navbar";
import API from "./utils/api";
import dayjs from "dayjs";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />

      <Calendar
        events={events}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        onDateClick={(date: any) => setSelectedDate(date)}
      />

      {selectedDate && (
        <EventModal
          date={selectedDate}
          onClose={() => {
            setSelectedDate(null);
            fetchEvents();
          }}
        />
      )}
    </div>
  );
}