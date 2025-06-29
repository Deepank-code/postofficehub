"use client";

import { useState } from "react";
import { Calculator as CalcIcon, Info, BookOpen } from "lucide-react";
import Link from "next/link";

const Calculator = ({
  schemeName,
  interestRate,
  calculationType,
  tenureOptions = [],
  minAmount = 100,
  maxAmount = 1000000,
}) => {
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState(null);

  const calculateMaturity = () => {
    const principal = parseFloat(amount);
    const years = parseFloat(tenure);
    const rate = interestRate / 100;

    if (
      !principal ||
      !years ||
      principal < minAmount ||
      principal > maxAmount
    ) {
      return;
    }

    let maturityAmount = 0;
    let totalPrincipal = principal;

    switch (calculationType) {
      case "compound":
        maturityAmount = principal * Math.pow(1 + rate, years);
        break;
      case "simple":
        maturityAmount = principal * (1 + rate * years);
        break;
      case "monthly":
        const monthlyRate = rate / 12;
        const months = years * 12;
        totalPrincipal = principal * months;
        maturityAmount =
          principal *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);
        break;
    }

    setResult({
      maturityAmount: Math.round(maturityAmount),
      interestEarned: Math.round(maturityAmount - totalPrincipal),
      totalPrincipal: Math.round(totalPrincipal),
    });
  };

  const getEducationalContent = () => {
    const schemeKey = schemeName.toLowerCase();

    if (schemeKey.includes("rd") || schemeKey.includes("recurring")) {
      return {
        howItWorks:
          "RD works by allowing you to deposit a fixed amount every month for 5 years. Interest is compounded quarterly at 6.7% per annum.",
        penalties:
          "Missing deposits attracts ₹1 penalty per ₹100 for each month of default. Missing 4 consecutive deposits discontinues the account.",
        calculation:
          "Maturity = Monthly Deposit × [((1+r)^n - 1) / r] × (1+r), where r = monthly rate and n = number of months",
        blogLink: "/blog/rd-complete-guide",
      };
    } else if (schemeKey.includes("td") || schemeKey.includes("time")) {
      return {
        howItWorks:
          "TD is a fixed deposit where you invest a lump sum for 1-5 years at 6.9% interest, compounded annually.",
        penalties:
          "Premature withdrawal after 6 months attracts 2% penalty. Before 6 months, only principal is returned.",
        calculation: "Maturity Amount = Principal × (1 + Interest Rate)^Years",
        blogLink: "/blog/td-investment-guide",
      };
    } else if (
      schemeKey.includes("mis") ||
      schemeKey.includes("monthly income")
    ) {
      return {
        howItWorks:
          "MIS provides monthly income through a one-time investment. You receive 7.4% annual interest paid monthly.",
        penalties:
          "Premature closure after 1 year attracts 2% deduction from principal. Before 1 year, 1% deduction applies.",
        calculation:
          "Monthly Income = (Principal × 7.4%) ÷ 12. Bonus of 5% paid at maturity.",
        blogLink: "/blog/mis-monthly-income-guide",
      };
    }

    return null;
  };

  const educationalContent = getEducationalContent();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <CalcIcon className="text-red-600" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            {schemeName} Calculator
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {calculationType === "monthly"
                  ? "Monthly Amount (₹)"
                  : "Investment Amount (₹)"}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder={`Min: ₹${minAmount}, Max: ₹${maxAmount.toLocaleString()}`}
                min={minAmount}
                max={maxAmount}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenure (Years)
              </label>
              {tenureOptions.length > 0 ? (
                <select
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Tenure</option>
                  {tenureOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} years
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter years"
                  min="1"
                  max="20"
                  step="0.5"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (Fixed)
              </label>
              <input
                type="text"
                value={`${interestRate}% per annum`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                readOnly
              />
            </div>

            <button
              onClick={calculateMaturity}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Calculate Maturity
            </button>
          </div>

          {result && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                Calculation Results
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Total Principal:</span>
                  <span className="font-bold text-gray-800">
                    ₹{result.totalPrincipal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Interest Earned:</span>
                  <span className="font-bold text-green-600">
                    ₹{result.interestEarned.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Maturity Amount:</span>
                  <span className="font-bold text-blue-600 text-xl">
                    ₹{result.maturityAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {educationalContent && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Info className="text-blue-600" size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              How {schemeName} Works
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  📋 How It Works
                </h4>
                <p className="text-gray-600 text-sm">
                  {educationalContent.howItWorks}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  ⚠️ Penalties & Rules
                </h4>
                <p className="text-gray-600 text-sm">
                  {educationalContent.penalties}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  🧾 Calculation Method
                </h4>
                <p className="text-gray-600 text-sm">
                  {educationalContent.calculation}
                </p>
              </div>

              <div>
                <Link
                  href={educationalContent.blogLink}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <BookOpen size={16} />
                  <span>Read Complete Guide</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
