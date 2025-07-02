"use client";

import { useEffect, useState } from "react";
import { Calendar, Bell, Clock, AlertCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/_ui/dialog";
import { Alert, AlertDescription } from "@/app/_components/_ui/alert";
import Input from "./_ui/Input";
import Button from "./_ui/Button";

const MaturityReminderTool = () => {
  const [schemeName, setSchemeName] = useState("");
  const [investmentDate, setInvestmentDate] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [reminderData, setReminderData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted!");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  }, []);
  const schemeOptions = [
    {
      name: "Recurring Deposit (RD)",
      durations: [{ value: "5", label: "5 Years (Fixed)" }],
    },
    {
      name: "Time Deposit (TD)",
      durations: [
        { value: "1", label: "1 Year" },
        { value: "2", label: "2 Years" },
        { value: "3", label: "3 Years" },
        { value: "5", label: "5 Years" },
      ],
    },
    {
      name: "Monthly Income Scheme (MIS)",
      durations: [{ value: "5", label: "5 Years (Fixed)" }],
    },
    {
      name: "Kisan Vikas Patra (KVP)",
      durations: [{ value: "10.4", label: "10.4 Years (Money Doubles)" }],
    },
    {
      name: "Senior Citizen Savings Scheme (SCSS)",
      durations: [{ value: "5", label: "5 Years (Extendable by 3 years)" }],
    },
    {
      name: "Public Provident Fund (PPF)",
      durations: [
        { value: "15", label: "15 Years (Extendable in blocks of 5 years)" },
      ],
    },
    {
      name: "National Savings Certificate (NSC)",
      durations: [{ value: "5", label: "5 Years (Fixed)" }],
    },
    {
      name: "Postal Life Insurance (PLI)",
      durations: [
        { value: "10", label: "10 Years" },
        { value: "15", label: "15 Years" },
        { value: "20", label: "20 Years" },
      ],
    },
    {
      name: "Rural Postal Life Insurance (RPLI)",
      durations: [
        { value: "10", label: "10 Years" },
        { value: "15", label: "15 Years" },
        { value: "20", label: "20 Years" },
      ],
    },
  ];

  const calculateMaturityDate = (investmentDate, duration) => {
    const startDate = new Date(investmentDate);
    const years = parseFloat(duration);
    const months = Math.floor((years % 1) * 12);

    const maturityDate = new Date(startDate);
    maturityDate.setFullYear(maturityDate.getFullYear() + Math.floor(years));
    maturityDate.setMonth(maturityDate.getMonth() + months);

    return maturityDate.toISOString().split("T")[0];
  };

  const calculateDaysRemaining = (maturityDate) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    const diffTime = maturity.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

    return { years, months, days };
  };

  const selectedScheme = schemeOptions.find(
    (scheme) => scheme.name === schemeName
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schemeName || !investmentDate || !duration || !amount) {
      alert("Please fill in all fields");
      return;
    }

    const maturityDate = calculateMaturityDate(investmentDate, duration);
    const daysRemaining = calculateDaysRemaining(maturityDate);
    const timeLeft = calculateTimeLeft(maturityDate);

    const data = {
      id: Date.now(),
      schemeName,
      investmentDate,
      maturityDate,
      amount: parseFloat(amount),
      daysRemaining,
      timeLeft,
    };

    const existingReminders = JSON.parse(
      localStorage.getItem("maturityReminders") || "[]"
    );
    existingReminders.push(data);
    localStorage.setItem(
      "maturityReminders",
      JSON.stringify(existingReminders)
    );
    if (Notification.permission === "granted") {
      new Notification("Reminder Saved!", {
        body: `Your ${schemeName} reminder has been saved successfully.`,
      });
    }
    setReminderData(data);
    setIsModalOpen(true);
    setSchemeName("");
    setInvestmentDate("");
    setDuration("");
    setAmount("");
  };

  const getStatusColor = (days) => {
    if (days <= 30) return "text-red-600 bg-red-50 border-red-200";
    if (days <= 90) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getStatusMessage = (days) => {
    if (days < 0) return "Investment has matured!";
    if (days === 0) return "Investment matures today!";
    if (days <= 30) return "Investment matures soon!";
    if (days <= 90) return "Investment approaching maturity";
    return "Investment on track";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Bell className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Maturity Reminder Tool
          </h3>
          <p className="text-gray-600 text-sm">
            Track your investment maturity dates
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Scheme
          </label>
          <select
            value={schemeName}
            onChange={(e) => {
              setSchemeName(e.target.value);
              setDuration("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a scheme</option>
            {schemeOptions.map((scheme) => (
              <option key={scheme.name} value={scheme.name}>
                {scheme.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Date
            </label>
            <Input
              type="date"
              value={investmentDate}
              onChange={(e) => setInvestmentDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedScheme}
            >
              <option value="">Select duration</option>
              {selectedScheme?.durations.map((dur) => (
                <option key={dur.value} value={dur.value}>
                  {dur.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Amount (₹)
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter investment amount"
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          <Clock className="mr-2" size={18} />
          Set Reminder
        </Button>
      </form>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="text-blue-600" size={24} />
              <span>Investment Reminder Set</span>
            </DialogTitle>
          </DialogHeader>

          {reminderData && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 ${getStatusColor(
                  reminderData.daysRemaining
                )}`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle size={20} />
                  <span className="font-semibold">
                    {getStatusMessage(reminderData.daysRemaining)}
                  </span>
                </div>
                <p className="text-sm">
                  {reminderData.daysRemaining >= 0
                    ? `${reminderData.daysRemaining} days remaining`
                    : `Matured ${Math.abs(
                        reminderData.daysRemaining
                      )} days ago`}
                </p>
                <p className="text-sm mt-1">
                  ⏳{" "}
                  {`${reminderData.timeLeft.years} years, ${reminderData.timeLeft.months} months, ${reminderData.timeLeft.days} days left`}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Scheme:</span>
                  <span className="text-sm">{reminderData.schemeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Investment Date:</span>
                  <span>
                    {new Date(reminderData.investmentDate).toLocaleDateString(
                      "en-IN"
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Maturity Date:</span>
                  <span>
                    {new Date(reminderData.maturityDate).toLocaleDateString(
                      "en-IN"
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span>₹{reminderData.amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Alert>
                <Bell className="h-4 w-4" />
                <AlertDescription>
                  Reminder saved successfully! You can view all your reminders
                  anytime.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaturityReminderTool;
