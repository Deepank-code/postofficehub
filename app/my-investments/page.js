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

export default function InvestmentsPage() {
  const [reminders, setReminders] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("maturityReminders") || "[]"
    );
    setReminders(stored);

    if (!localStorage.getItem("dismissedLocalStorageWarning")) {
      setShowWarning(true);
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      const today = new Date();
      stored.forEach((item) => {
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

  const handleDelete = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
    localStorage.setItem("maturityReminders", JSON.stringify(updated));
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
            Data is stored locally in your browser/PWA and may be lost if you
            clear cache, change devices, or uninstall the app.
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
        reminders.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 mb-4 shadow bg-white hover:shadow-md transition-shadow"
          >
            <div className="mb-3">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <CalendarDays className="text-blue-500" size={20} />
                <span className="font-semibold text-gray-800">
                  {item.schemeName}
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
              </div>
            </div>

            <Button
              onClick={() => handleDelete(index)}
              className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
