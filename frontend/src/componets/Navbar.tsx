import React, { useEffect, useState } from "react";
import { getSocket } from "../util/socket";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Reminder {
  todoId: string;
  title: string;
  due_date: string;
  priority: string;
}

const Navbar: React.FC = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notifications, setNotifications] = useState<Reminder[]>([]);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  /* ================= DATE & TIME ================= */
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setDate(
        now.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );

      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ================= SOCKET ================= */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("due_soon", (data: Reminder) => {
      setNotifications((prev) => [data, ...prev]);
      toast.success(`⏰ "${data.title}" is due soon!`);
    });

    return () => {
      socket.off("due_soon");
    };
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/my-task?search=${search}`);
  };

  const priorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between relative">

        {/* LOGO */}
        <h1 className="text-xl font-bold">
          <span className="text-primary">Dash</span>board
        </h1>

        {/* SEARCH */}
        <div className="flex w-[500px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search your task here..."
            className="flex-1 bg-gray-100 px-4 py-2 rounded-l-lg outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-4 rounded-r-lg"
          >
            <i className="ri-search-line" />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative">

          {/* NOTIFICATION */}
          <button
            onClick={() => setOpen(true)}
            className="relative bg-primary w-9 h-9 rounded text-white"
          >
            <i className="ri-notification-3-line" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* CALENDAR */}
          <button
            onClick={() => setShowCalendar(true)}
            className="bg-primary w-9 h-9 rounded text-white"
          >
            <i className="ri-calendar-line" />
          </button>

          {/* CLOCK */}
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            <i className="ri-time-line text-base" />
            {time}
          </div>

          {/* DATE */}
          <span className="text-primary text-sm font-medium">
            {date}
          </span>
        </div>
      </header>

      {/* ================= NOTIFICATION MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white w-[400px] max-h-[500px] rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">🔔 Notifications</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                No new notifications
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[350px]">
                {notifications.map((note, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border rounded-xl p-3"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-sm">
                        {note.title}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${priorityColor(
                          note.priority
                        )}`}
                      >
                        {note.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(note.due_date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= CALENDAR MODAL ================= */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={() => setShowCalendar(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-4">
              Select Date
            </h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4"
            />

            <button
              onClick={() => {
                navigate(`/my-task?date=${selectedDate}`);
                setShowCalendar(false);
              }}
              className="w-full bg-primary text-white py-2 rounded-lg"
            >
              Filter Tasks
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
