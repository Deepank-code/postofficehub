"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Clock, Bell } from "lucide-react";
import Input from "@/app/_components/_ui/Input";
import Button from "@/app/_components/_ui/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/_ui/dialog";

// Scheme options
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

export default function AddMySchemePage() {
  const [customName, setCustomName] = useState("");
  const [schemeName, setSchemeName] = useState("");
  const [investmentDate, setInvestmentDate] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maturityDate, setMaturityDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const calculateMaturityDate = (date, duration) => {
    const start = new Date(date);
    const years = parseFloat(duration);
    const months = Math.floor((years % 1) * 12);
    const maturity = new Date(start);
    maturity.setFullYear(maturity.getFullYear() + Math.floor(years));
    maturity.setMonth(maturity.getMonth() + months);
    return maturity.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customName || !schemeName || !investmentDate || !duration || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    const maturity = calculateMaturityDate(investmentDate, duration);
    setMaturityDate(maturity);
    const today = new Date();
    const maturityD = new Date(maturity);
    const diffDays = Math.ceil((maturityD - today) / (1000 * 60 * 60 * 24));

    const newScheme = {
      id: Date.now(),
      customName,
      schemeName,
      investmentDate,
      duration,
      maturityDate: maturity,
      amount: parseFloat(amount),
      note,
      daysRemaining: diffDays,
      notifiedDates: [],
    };

    const existing = JSON.parse(localStorage.getItem("customSchemes") || "[]");
    existing.push(newScheme);
    localStorage.setItem("customSchemes", JSON.stringify(existing));

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Scheme Added", {
        body: `${customName} (${schemeName}) added for tracking.`,
        icon: "/icons/icon-192x192.png",
      });
    }
    setIsModalOpen(true);
    toast.success(`Scheme added successfully`);
  };

  const selectedScheme = schemeOptions.find(
    (scheme) => scheme.name === schemeName
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6 mt-6">
      <div className="flex items-center mb-4 space-x-3">
        <div className="p-2 bg-blue-100 rounded-full">
          <PlusCircle className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Add Investment Scheme
          </h1>
          <p className="text-sm text-gray-500">
            Track your post office investments easily
          </p>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm mb-4">
        ⚠️ <strong>Important:</strong> Your schemes are saved locally on your
        device only. Clearing browser data, uninstalling, or removing the app
        will delete your saved schemes.
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Purpose / Custom Name */}
        <div>
          <label
            htmlFor="customName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter your purpose for this investment (e.g., Daughter&apos;s
            Education)
          </label>
          <Input
            id="customName"
            placeholder="Eg: Daughter's Education"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
        </div>

        {/* Scheme Selection */}
        <div>
          <label
            htmlFor="schemeName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select the scheme you are investing in
          </label>
          <select
            id="schemeName"
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

        {/* Investment Date */}
        <div>
          <label
            htmlFor="investmentDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select your investment starting date
          </label>
          <Input
            id="investmentDate"
            type="date"
            value={investmentDate}
            onChange={(e) => setInvestmentDate(e.target.value)}
          />
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select duration as per your scheme
          </label>
          <select
            id="duration"
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

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter your investment amount (₹)
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Eg: 1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Note */}
        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Add additional notes if needed (optional)
          </label>
          <Input
            id="note"
            placeholder="Eg: Matures before daughter's college"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mb-10 bg-blue-600 hover:bg-blue-700"
        >
          <Clock className="mr-2 h-4 w-4" />
          Add Scheme
        </Button>
      </form>
      {/* 
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-sm bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="text-blue-600" size={24} />
              <span>Scheme Added Successfully</span>
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 text-center mt-2">
            Your <strong>{customName}</strong> ({schemeName}) will mature on{" "}
            <strong>
              {new Date(maturityDate).toLocaleDateString("en-IN")}
            </strong>
            .
          </p>
          <Button
            onClick={() => router.push("/my-investments")}
            className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
          >
            Go to My Investments
          </Button>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
