"use client";

import { useEffect, useState } from "react";
import { openDB } from "idb";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const COLORS = ["#0d47a1", "#2e7d32", "#c62828"];

export default function PortfolioPage() {
  const [db, setDb] = useState(null);
  const [entries, setEntries] = useState([]);
  const [dueToday, setDueToday] = useState([]);
  const [schemeType, setSchemeType] = useState("RD");
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [installmentDay, setInstallmentDay] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const initDB = async () => {
      const dbInstance = await openDB("PostOfficeHubDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("portfolio")) {
            db.createObjectStore("portfolio", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      setDb(dbInstance);
      fetchEntries(dbInstance);
    };
    initDB();

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const fetchEntries = async (dbInstance = db) => {
    if (!dbInstance) return;
    const tx = dbInstance.transaction("portfolio", "readonly");
    const store = tx.objectStore("portfolio");
    const allEntries = await store.getAll();
    setEntries(allEntries);
    checkDueReminders(allEntries);
  };

  const handleAdd = async () => {
    if (
      !db ||
      !schemeType ||
      !accountNumber ||
      !startDate ||
      !installmentDay ||
      !amount
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const entryFrequency = schemeType === "RD" ? "Monthly" : frequency;

    const tx = db.transaction("portfolio", "readwrite");
    const store = tx.objectStore("portfolio");
    await store.add({
      schemeType,
      accountNumber,
      startDate,
      installmentDay: parseInt(installmentDay),
      frequency: entryFrequency,
      amount: parseFloat(amount),
      notes,
    });
    await tx.done;
    toast.success("Added");
    setSchemeType("RD");
    setAccountNumber("");
    setStartDate("");
    setInstallmentDay("");
    setFrequency("Monthly");
    setAmount("");
    setNotes("");

    fetchEntries();
  };

  const handleDelete = async (id) => {
    if (!db) return;
    const tx = db.transaction("portfolio", "readwrite");
    const store = tx.objectStore("portfolio");
    await store.delete(id);
    await tx.done;
    toast.success("Deleted");
    fetchEntries();
  };

  const checkDueReminders = (allEntries) => {
    const today = new Date();
    const dueList = [];

    allEntries.forEach((entry) => {
      const installmentDay = parseInt(entry.installmentDay);
      const startDate = new Date(entry.startDate);
      const frequency = entry.frequency || "Monthly";

      if (today.getDate() !== installmentDay) return;

      const monthsElapsed =
        (today.getFullYear() - startDate.getFullYear()) * 12 +
        (today.getMonth() - startDate.getMonth());

      const frequencyMap = {
        Monthly: 1,
        Quarterly: 3,
        "Half-Yearly": 6,
        Yearly: 12,
      };

      if (monthsElapsed % frequencyMap[frequency] === 0) {
        dueList.push(entry);

        if (Notification.permission === "granted") {
          new Notification(`📌 ${entry.schemeType} Payment Due Today`, {
            body: `Account: ${entry.accountNumber}, Amount: ₹${entry.amount}`,
          });
        }
      }
    });

    setDueToday(dueList);
  };

  // Prepare data for Doughnut Chart
  const summary = { RD: 0, RPLI: 0, PLI: 0 };
  entries.forEach((e) => {
    summary[e.schemeType] += e.amount;
  });
  const chartData = [
    { name: "RD", value: summary.RD },
    { name: "RPLI", value: summary.RPLI },
    { name: "PLI", value: summary.PLI },
  ].filter((item) => item.value > 0);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Post Office Portfolio
      </h1>

      {/* Doughnut Chart */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Your RD / RPLI / PLI Distribution
        </h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">
            No data yet, add entries below.
          </p>
        )}
      </div>

      {/* Add Entry */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">➕ Add New Entry</h2>

        <label className="block text-sm font-medium mb-1">Scheme Type</label>
        <select
          value={schemeType}
          onChange={(e) => setSchemeType(e.target.value)}
          className="border border-green-400 p-2 w-full mb-3 rounded focus:border-green-600 focus:ring focus:ring-green-300"
        >
          <option value="RD">RD</option>
          <option value="RPLI">RPLI</option>
          <option value="PLI">PLI</option>
        </select>

        <label className="block text-sm font-medium mb-1">
          Account/Policy Number
        </label>
        <input
          type="text"
          placeholder="Enter account or policy number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border border-green-400 p-2 w-full mb-3 rounded focus:border-green-600 focus:ring focus:ring-green-300"
        />

        <label className="block text-sm font-medium mb-1">Starting Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-green-400 p-2 w-full mb-3 rounded focus:border-green-600 focus:ring focus:ring-green-300"
        />

        <label className="block text-sm font-medium mb-1">
          Installment Day (1–31)
        </label>
        <input
          type="number"
          max={31}
          min={1}
          placeholder="Installment Day"
          value={installmentDay}
          onChange={(e) => setInstallmentDay(e.target.value)}
          className="border border-green-400 p-2 w-full mb-3 rounded focus:border-green-600 focus:ring focus:ring-green-300"
        />

        {(schemeType === "RPLI" || schemeType === "PLI") && (
          <>
            <label className="block text-sm font-medium mb-1">
              Payment Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="border border-green-400 p-2 w-full mb-3 rounded focus:border-green-600 focus:ring focus:ring-green-300"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </>
        )}

        <label className="block text-sm font-medium mb-1">Amount (₹)</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-green-400 p-2 w-full mb-3 rounded focus:border-green-600 focus:ring focus:ring-green-300"
        />

        <label className="block text-sm font-medium mb-1">
          Notes (Optional)
        </label>
        <input
          type="text"
          placeholder="Any notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border border-green-400 p-2 w-full mb-4 rounded focus:border-green-500 focus:ring focus:ring-green-300"
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white py-2 w-full rounded hover:bg-green-600 transition"
        >
          Add Entry
        </button>
      </div>

      {/* Entries List */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-5 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            📋 Your Entries
          </h2>
          <span className="text-xs text-gray-500">
            🔒 Stored securely in your browser (IndexedDB)
          </span>
        </div>
        {entries.length === 0 ? (
          <p className="text-center text-gray-400">No entries added yet.</p>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 border border-gray-200 p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-blue-600">
                    {entry.schemeType} • ₹{entry.amount}
                  </span>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className=" p-2 bg-red-500 text-white hover:text-white-600 transition rounded-xl"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-700 space-y-0.5">
                  <p>
                    <span className="font-medium">Account:</span>{" "}
                    {entry.accountNumber}
                  </p>
                  <p>
                    <span className="font-medium">Start:</span>{" "}
                    {entry.startDate}
                  </p>
                  <p>
                    <span className="font-medium">Inst. Day:</span>{" "}
                    {entry.installmentDay}
                  </p>
                  <p>
                    <span className="font-medium">Frequency:</span>{" "}
                    {entry.frequency}
                  </p>
                  {entry.notes && (
                    <p className="text-gray-500">
                      <span className="font-medium">Notes:</span> {entry.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reminder Tool */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-lg p-5 mb-6 border border-green-200">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          ⏰ Today&apos;s Due Reminders
        </h2>
        {dueToday.length === 0 ? (
          <p className="text-center text-green-600">No dues today 🎉</p>
        ) : (
          <div className="grid gap-4">
            {dueToday.map((entry, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md border border-green-200 p-4"
              >
                <p>
                  <span className="font-semibold">Scheme:</span>{" "}
                  {entry.schemeType}
                </p>
                <p>
                  <span className="font-semibold">Account:</span>{" "}
                  {entry.accountNumber}
                </p>
                <p>
                  <span className="font-semibold">Amount Due:</span> ₹
                  {entry.amount}
                </p>
                <p className="text-sm text-gray-600">{entry.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg mt-4 shadow-sm">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          ✨ You&apos;re in Control
        </h2>
        <p className="mt-2 text-sm">
          Your portfolio is saved <strong>securely on your device</strong> using
          your browser’s local storage and PWA support — no account or internet
          needed.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
          <li>
            <strong>🔒 Private</strong>: We never collect or send your data
            online.
          </li>
          <li>
            <strong>📲 PWA Friendly</strong>: You can install this app and use
            it like a native app, even offline.
          </li>
          <li>
            <strong>⚠️ Important</strong>: Clearing your browser data, using
            incognito mode, or switching devices may remove saved entries.
          </li>
          <li>
            <strong>📸 Tip</strong>: Take a screenshot or save your entries
            manually as a backup.
          </li>
        </ul>
      </div>
    </div>
  );
}
