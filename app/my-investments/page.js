"use client";

import { useEffect, useState } from "react";
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

export default function InvestmentsPage() {
  const [reminders, setReminders] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const storedReminders = JSON.parse(
      localStorage.getItem("maturityReminders") || "[]"
    );
    const storedCustomSchemes = JSON.parse(
      localStorage.getItem("customSchemes") || "[]"
    );

    const combined = [...storedReminders, ...storedCustomSchemes];
    setReminders(combined);

    if (!localStorage.getItem("dismissedLocalStorageWarning")) {
      setShowWarning(true);
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      const today = new Date();
      combined.forEach((item) => {
        const maturity = new Date(item.maturityDate);
        const diffDays = Math.ceil((maturity - today) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) {
          new Notification(`Maturity Today: ${item.schemeName}`, {
            body: `₹${item.amount} matures today.`,
          });
        } else if (diffDays === 7) {
          new Notification(`Upcoming Maturity: ${item.schemeName}`, {
            body: `₹${item.amount} matures in 7 days.`,
          });
        }
      });
    }
  }, []);

  const handleDelete = (id) => {
    let updatedReminders = reminders.filter((item) => item.id !== id);

    const updatedMaturityReminders = updatedReminders.filter(
      (item) => !item.customName
    );
    const updatedCustomSchemes = updatedReminders.filter(
      (item) => item.customName
    );

    localStorage.setItem(
      "maturityReminders",
      JSON.stringify(updatedMaturityReminders)
    );
    localStorage.setItem("customSchemes", JSON.stringify(updatedCustomSchemes));
    toast.success("Deleted");
    setReminders(updatedReminders);
  };

  const calculateTimeLeft = (maturityDate) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    let years = maturity.getFullYear() - today.getFullYear();
    let months = maturity.getMonth() - today.getMonth();
    let days = maturity.getDate() - today.getDate();
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return `${years}y ${months}m ${days}d`;
  };

  const getBadge = (maturityDate) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    const diffDays = Math.ceil((maturity - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
          Matured
        </span>
      );
    } else if (diffDays === 0) {
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
          Matures Today
        </span>
      );
    } else if (diffDays <= 7) {
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
          {diffDays} days left
        </span>
      );
    } else {
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
          {diffDays} days left
        </span>
      );
    }
  };

  const dismissWarning = () => {
    localStorage.setItem("dismissedLocalStorageWarning", "true");
    setShowWarning(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {showWarning && (
        <div className="flex items-start p-4 mb-4 rounded-lg bg-yellow-50 border border-yellow-200 relative">
          <AlertTriangle className="text-yellow-600 mr-2 mt-0.5" size={20} />
          <div className="text-sm text-yellow-800">
            Your data is saved locally on your device and may be lost if you
            clear cache, uninstall, or switch devices. Please maintain your own
            backup if needed.
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
                <div className="flex items-center space-x-1">
                  <CalendarDays size={16} className="text-gray-500" />
                  <span>
                    Investment:{" "}
                    <span className="font-medium text-gray-900">
                      {item.investmentDate}
                    </span>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <CalendarCheck size={16} className="text-gray-500" />
                  <span>
                    Maturity:{" "}
                    <span className="font-medium text-gray-900">
                      {item.maturityDate}
                    </span>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  💰
                  <span>
                    Amount:{" "}
                    <span className="font-medium text-gray-900">
                      ₹{parseFloat(item.amount).toLocaleString("en-IN")}
                    </span>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  ⏳
                  <span>
                    Time Left:{" "}
                    <span className="font-medium text-gray-900">
                      {calculateTimeLeft(item.maturityDate)}
                    </span>
                  </span>
                </div>
                {item.note && (
                  <div className="flex items-center space-x-1 sm:col-span-2">
                    📝
                    <span className="italic text-gray-800">{item.note}</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={() => handleDelete(item.id)}
              className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Delete
            </Button>{" "}
          </div>
        ))
      )}
      <div className="w-full flex justify-center my-10 ">
        <Link
          href="/add-my-scheme"
          className=" bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-colors duration-200 shadow-lg"
        >
          Add your schemes
        </Link>
      </div>
    </div>
  );
}
