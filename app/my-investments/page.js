"use client";

import { useEffect, useState, useMemo } from "react";
import Button from "@/app/_components/_ui/Button";
import {
  Bell,
  Trash2,
  CalendarDays,
  CalendarCheck,
  AlertTriangle,
  X,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getAllReminders, deleteReminder } from "@/lib/indexedDB";

export default function InvestmentsPage() {
  const [reminders, setReminders] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allReminders = await getAllReminders();
        setReminders(allReminders);

        const dismissed =
          localStorage.getItem("dismissedLocalStorageWarning") === "true";
        setShowWarning(!dismissed);

        if ("Notification" in window && Notification.permission !== "granted") {
          Notification.requestPermission();
        } else {
          const today = new Date();
          allReminders.forEach((item) => {
            if (!item?.maturityDate) return;
            const maturity = new Date(item.maturityDate);
            const diffDays = Math.ceil(
              (maturity - today) / (1000 * 60 * 60 * 24)
            );
            const key = `notified-${item.id}-${
              maturity.toISOString().split("T")[0]
            }`;
            if (localStorage.getItem(key)) return;

            if (diffDays === 0 || diffDays === 7) {
              new Notification(
                diffDays === 0
                  ? `Maturity Today: ${item.schemeName}`
                  : `Upcoming Maturity: ${item.schemeName}`,
                {
                  body: `₹${parseFloat(item.amount).toLocaleString(
                    "en-IN"
                  )} matures in ${diffDays === 0 ? "today" : "7 days"}.`,
                }
              );
              localStorage.setItem(key, "true");
            }
          });
        }
      } catch (err) {
        console.error("DB Error:", err);
        toast.error("Failed to load investments.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
      toast.success("Deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete.");
    }
  };

  const dismissWarning = () => {
    localStorage.setItem("dismissedLocalStorageWarning", "true");
    setShowWarning(false);
  };

  const calculateTimeLeft = (maturityDate) => {
    if (!maturityDate) return "N/A";
    const today = new Date();
    const maturity = new Date(maturityDate);
    today.setHours(0, 0, 0, 0);
    maturity.setHours(0, 0, 0, 0);
    let diff = maturity.getTime() - today.getTime();
    if (diff < 0) return "Matured";
    let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    let y = Math.floor(days / 365);
    days -= y * 365;
    let m = Math.floor(days / 30);
    days -= m * 30;
    return (
      `${y ? `${y}y ` : ""}${m ? `${m}m ` : ""}${
        days ? `${days}d` : ""
      }`.trim() || "Today"
    );
  };

  const getBadge = (maturityDate) => {
    if (!maturityDate) return null;
    const today = new Date();
    const maturity = new Date(maturityDate);
    today.setHours(0, 0, 0, 0);
    maturity.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((maturity - today) / (1000 * 60 * 60 * 24));

    const base = "text-xs px-2 py-0.5 rounded-full";
    if (diffDays < 0)
      return (
        <span className={`${base} bg-gray-200 text-gray-700`}>Matured</span>
      );
    if (diffDays === 0)
      return (
        <span className={`${base} bg-green-100 text-green-800`}>
          Matures Today
        </span>
      );
    if (diffDays <= 7)
      return (
        <span className={`${base} bg-yellow-100 text-yellow-800`}>
          {diffDays} days left
        </span>
      );
    return (
      <span className={`${base} bg-blue-100 text-blue-800`}>
        {diffDays} days left
      </span>
    );
  };

  const chartData = useMemo(() => {
    const schemeTotals = {};
    let total = 0;
    reminders.forEach((r) => {
      const key = r.customName || r.schemeName;
      const amount = parseFloat(r.amount || 0);
      schemeTotals[key] = (schemeTotals[key] || 0) + amount;
      total += amount;
    });
    const data = Object.entries(schemeTotals).map(([name, value]) => ({
      name,
      value,
    }));
    const COLORS = [
      "#3b82f6",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#f97316",
      "#06b6d4",
      "#eab308",
      "#db2777",
      "#64748b",
      "#84cc16",
      "#a855f7",
      "#f43f5e",
    ];
    return { data, totalAmount: total, COLORS };
  }, [reminders]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const d = payload[0].payload;
      const percent = ((d.value / chartData.totalAmount) * 100).toFixed(1);
      return (
        <div className="bg-white p-2 border text-sm rounded shadow">
          <p className="font-semibold">{d.name}</p>
          <p>₹{d.value.toLocaleString("en-IN")}</p>
          <p>{percent}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {showWarning && (
        <div className="flex items-start p-4 mb-4 rounded-lg bg-yellow-50 border border-yellow-200 relative">
          <AlertTriangle className="text-yellow-600 mr-2 mt-0.5" size={20} />
          <div className="text-sm text-yellow-800">
            Your data is saved in your browser using IndexedDB. It may be lost
            if you clear cache or switch devices. Please keep your own backup.
          </div>
          <button
            onClick={dismissWarning}
            className="absolute top-2 right-2 text-yellow-700 hover:text-yellow-900"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center mb-4 space-x-2">
        <Bell className="text-blue-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">Your Investments</h1>
      </div>

      {reminders.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Investment Portfolio
          </h2>
          <div className="relative w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                >
                  {chartData.data.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={chartData.COLORS[i % chartData.COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="text-center">
                <div className="text-sm text-gray-500">Total Invested</div>
                <div className="text-xl font-bold text-gray-800">
                  ₹{chartData.totalAmount.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-sm">
            {chartData.data.map((entry, i) => (
              <div key={i} className="flex items-center">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      chartData.COLORS[i % chartData.COLORS.length],
                  }}
                />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {reminders.length === 0 ? (
        <div className="bg-white p-4 rounded shadow text-center text-gray-600">
          No investments saved yet.
        </div>
      ) : (
        reminders.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 mb-4 shadow bg-white hover:shadow-md transition-shadow"
          >
            <div className="mb-3">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <CalendarDays className="text-blue-500" size={20} />
                <span className="font-semibold text-gray-800">
                  {item.customName
                    ? `${item.customName} (${item.schemeName})`
                    : item.schemeName}
                </span>
                {getBadge(item.maturityDate)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <CalendarDays size={16} className="text-gray-500" />
                  Investment:{" "}
                  <span className="font-medium text-gray-900">
                    {item.investmentDate || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarCheck size={16} className="text-gray-500" />
                  Maturity:{" "}
                  <span className="font-medium text-gray-900">
                    {item.maturityDate || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  💰 Amount:{" "}
                  <span className="font-medium text-gray-900">
                    ₹{parseFloat(item.amount || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  ⏳ Time Left:{" "}
                  <span className="font-medium text-gray-900">
                    {calculateTimeLeft(item.maturityDate)}
                  </span>
                </div>
                {item.note && (
                  <div className="sm:col-span-2 flex items-center gap-1">
                    📜 <span className="italic text-gray-800">{item.note}</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={() => handleDelete(item.id)}
              className="w-full bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        ))
      )}

      <div className="w-full flex justify-center my-10">
        <Link
          href="/add-my-scheme"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg"
        >
          Add your schemes
        </Link>
      </div>

      <div className="text-xs text-center text-gray-400 mt-6">
        ✨ You&apos;re in control. Your data stays in your browser only.
      </div>
    </div>
  );
}
