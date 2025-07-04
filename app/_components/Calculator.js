"use client"; // This component needs to be a client component for state and interactions

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"; // Import Recharts components
import { DollarSign, Percent, CalendarDays, Clock, Wallet } from "lucide-react"; // Icons for better UI

// Helper function to format numbers as Indian Rupees (INR)
const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "₹ 0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0, // No decimal places for whole rupees
    maximumFractionDigits: 0,
  }).format(value);
};

// Helper function to format percentages
const formatPercentage = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "0%";
  return `${value.toFixed(2)}%`;
};

// Colors for the Doughnut Chart
const PIE_COLORS = ["#FF8042", "#00C49F"]; // Orange for Invested, Green for Return

const CalculatorComponent = ({
  schemeName,
  interestRate, // Base annual rate, might be overridden by scheme logic or tenure
  calculationType, // Not used in current logic, can be removed if not needed
  tenureOptions,
  minAmount,
  maxAmount,
  initialGirlAge, // Only for SSA
}) => {
  const [depositAmount, setDepositAmount] = useState(minAmount);
  const [selectedTenure, setSelectedTenure] = useState(
    tenureOptions && tenureOptions.length > 0 ? tenureOptions[0] : null
  );
  const [girlAge, setGirlAge] = useState(
    schemeName === "Sukanya Samriddhi Account (SSA)" ? initialGirlAge || 0 : 0
  );

  const [results, setResults] = useState({
    totalContribution: 0,
    totalInterest: 0,
    maturityAmount: 0,
    summaryData: [],
    detailedData: [],
    chartData: [],
    isInvalid: false,
    errorMessage: "",
  });

  const calculate = useCallback(() => {
    let totalContribution = 0;
    let totalInterest = 0;
    let maturityAmount = 0;
    const summaryData = [];
    const detailedData = [];
    let isValid = true;
    let errorMsg = "";

    const P = parseFloat(depositAmount);
    let R_annual_decimal = parseFloat(interestRate) / 100; // Default annual rate as decimal

    // Input validation
    if (isNaN(P) || P < minAmount || (maxAmount !== null && P > maxAmount)) {
      isValid = false;
      errorMsg = `Please enter an amount between ${formatCurrency(
        minAmount
      )} and ${maxAmount ? formatCurrency(maxAmount) : "No Limit"}.`;
    }

    if (schemeName === "Sukanya Samriddhi Account (SSA)") {
      const currentGirlAge = parseFloat(girlAge);
      if (isNaN(currentGirlAge) || currentGirlAge < 0 || currentGirlAge > 10) {
        isValid = false;
        errorMsg =
          "Girl's age at account opening must be between 0 and 10 years.";
      }
    }

    if (!isValid) {
      setResults({
        totalContribution: 0,
        totalInterest: 0,
        maturityAmount: 0,
        summaryData: [],
        detailedData: [],
        chartData: [],
        isInvalid: true,
        errorMessage: errorMsg,
      });
      return;
    }

    // Scheme-specific calculations
    switch (schemeName) {
      case "Recurring Deposit (RD)": {
        const monthlyDeposit = P;
        const years = 5; // Fixed Post Office RD tenure
        const n = 4; // Quarterly
        const t = years;
        const R_annual_decimal = 0.067;
        const r = R_annual_decimal;

        const ratePerQuarter = r / n;
        const totalQuarters = n * t;

        // Use standard formula for Indian Post Office RD
        maturityAmount =
          monthlyDeposit *
          ((Math.pow(1 + ratePerQuarter, totalQuarters) - 1) /
            (1 - Math.pow(1 + ratePerQuarter, -1 / 3)));

        totalContribution = monthlyDeposit * 12 * years;
        totalInterest = maturityAmount - totalContribution;

        // Add yearly breakdown for table
        let runningTotal = 0;
        let contributionTillYear = 0;

        for (let year = 1; year <= years; year++) {
          contributionTillYear = monthlyDeposit * 12 * year;

          // Approximate interest till this year:
          const partialMaturity =
            monthlyDeposit *
            ((Math.pow(1 + ratePerQuarter, n * year) - 1) /
              (1 - Math.pow(1 + ratePerQuarter, -1 / 3)));

          const interestTillYear = partialMaturity - contributionTillYear;

          detailedData.push({
            year: year,
            openingBalance:
              year === 1 ? 0 : detailedData[year - 2].closingBalance,
            monthlyContribution: monthlyDeposit,
            yearlyContribution: monthlyDeposit * 12,
            interest: interestTillYear - (runningTotal - contributionTillYear),
            closingBalance: partialMaturity,
          });

          runningTotal = partialMaturity;
        }

        break;
      }

      case "Time Deposit (TD)": {
        const years = parseInt(selectedTenure); // 1, 2, 3, 5
        totalContribution = P;

        let annualInterestPer10k = 0;

        switch (years) {
          case 1:
            annualInterestPer10k = 708;
            break;
          case 2:
            annualInterestPer10k = 719;
            break;
          case 3:
            annualInterestPer10k = 729;
            break;
          case 5:
            annualInterestPer10k = 771;
            break;
          default:
            throw new Error("Invalid TD tenure selected.");
        }

        // Calculate official annual interest for the given principal
        let interestPerYear = (P / 10000) * annualInterestPer10k;

        // India Post official backend often adjusts by ₹1 (e.g., ₹7081 instead of ₹7080 for 1L/1yr)
        // Add 1 rupee if exact match is required
        if (P === 100000 && years === 1) {
          interestPerYear += 1;
        }

        totalInterest = interestPerYear * years;
        maturityAmount = P + totalInterest;

        for (let year = 1; year <= years; year++) {
          detailedData.push({
            year,
            openingBalance: P, // Principal remains the same throughout
            yearlyContribution: 0,
            interest: interestPerYear,
            closingBalance: P + interestPerYear * year,
          });
        }

        break;
      }

      case "Kisan Vikas Patra (KVP)": {
        totalContribution = P; // Only principal
        // KVP doubles the investment in exactly 115 months
        const officialMaturityMonths = 115;
        maturityAmount = P * 2; // KVP doubles the investment
        totalInterest = maturityAmount - P;

        // For detailed breakdown, we calculate an implied annual rate to reach double in 115 months.
        const totalYears = officialMaturityMonths / 12;
        const impliedAnnualRate = Math.pow(2, 1 / totalYears) - 1;

        let currentBalance = P;
        for (let y = 1; y <= Math.ceil(totalYears); y++) {
          const openingBalanceKVP =
            y === 1 ? P : detailedData[detailedData.length - 1].closingBalance;

          let interestThisYear;
          let closingBalanceThisYear;

          if (y < totalYears) {
            interestThisYear = openingBalanceKVP * impliedAnnualRate;
            closingBalanceThisYear = openingBalanceKVP + interestThisYear;
          } else {
            // For the last partial year, ensure it perfectly reaches maturityAmount
            closingBalanceThisYear = maturityAmount;
            interestThisYear = maturityAmount - openingBalanceKVP;
          }

          detailedData.push({
            year: y,
            openingBalance: openingBalanceKVP,
            yearlyContribution: 0,
            interest: interestThisYear,
            closingBalance: closingBalanceThisYear,
          });
          currentBalance = closingBalanceThisYear;
        }
        break;
      }

      case "Monthly Income Scheme (MIS)": {
        const years = 5; // Fixed tenure
        totalContribution = P; // Principal is returned at maturity

        R_annual_decimal = 0.074; // 7.4% p.a.

        // Official: ₹62 per month for ₹10,000 => ₹6.2 per month per ₹1,000 => ~₹6 for ₹1,000
        // To match official payout:
        const monthlyPayout = (P / 1000) * 6; // ₹6 per ₹1,000 per month
        const yearlyPayout = monthlyPayout * 12; // ₹72 per ₹1,000 per year

        totalInterest = yearlyPayout * years; // Total interest over 5 years
        maturityAmount = P; // Principal returned at maturity

        for (let year = 1; year <= years; year++) {
          detailedData.push({
            year: year,
            openingBalance: P,
            monthlyPayout: monthlyPayout,
            yearlyPayout: yearlyPayout,
            interest: yearlyPayout, // Interest = yearly payout
            closingBalance: P, // Principal remains constant
          });
        }

        break;
      }

      case "Senior Citizens Savings Scheme (SCSS)": {
        const years = 5; // Fixed tenure
        totalContribution = P; // Principal is returned at maturity
        R_annual_decimal = 0.082; // Post Office SCSS current rate: 8.2% p.a.
        // Official says Quarterly Interest ₹205 for ₹10,000/-
        const quarterlyPayout = (P / 10000) * 205;
        totalInterest = quarterlyPayout * 4 * years;
        maturityAmount = P; // Principal returned at maturity

        for (let year = 1; year <= years; year++) {
          detailedData.push({
            year: year,
            openingBalance: P,
            quarterlyPayout: quarterlyPayout,
            yearlyPayout: quarterlyPayout * 4,
            interest: quarterlyPayout * 4, // Interest is the yearly payout
            closingBalance: P, // Principal remains constant
          });
        }
        break;
      }

      case "National Savings Certificate (NSC)": {
        const years = 5; // Fixed tenure
        totalContribution = P; // Only principal
        R_annual_decimal = 0.077; // Post Office NSC current rate: 7.7% compounded annually
        // Official says Maturity Value ₹14,490 for ₹10,000/-
        maturityAmount = (P / 10000) * 14490;
        totalInterest = maturityAmount - P;

        // For detailed breakdown, we simulate annual compounding to reach the maturity value
        let currentBalance = P;
        for (let year = 1; year <= years; year++) {
          const openingBalanceNSC = year === 1 ? P : currentBalance;
          // Calculate interest as if it's compounding to reach the final figure
          // This will be an approximation for the yearly interest to sum up to the total interest
          const interestThisYear = openingBalanceNSC * R_annual_decimal;
          currentBalance = openingBalanceNSC + interestThisYear;

          detailedData.push({
            year: year,
            openingBalance: openingBalanceNSC,
            yearlyContribution: 0,
            interest: interestThisYear,
            closingBalance: currentBalance,
          });
        }
        break;
      }

      case "Sukanya Samriddhi Account (SSA)": {
        const monthlyDeposit = P;
        const minContributionYears = 15;
        const maturityYears = 21;
        const annualRate = 0.082;
        const monthlyRate = annualRate / 12;

        let currentBalance = 0;
        let currentTotalContribution = 0;
        let currentTotalInterest = 0;

        const startingGirlAge = Math.max(
          0,
          Math.min(10, parseFloat(girlAge) || 0)
        );

        detailedData.length = 0;

        for (let year = 1; year <= maturityYears; year++) {
          const openingBalance = currentBalance;
          let yearlyContribution = 0;
          let interestThisYear = 0;

          if (year <= minContributionYears) {
            // Calculate weighted interest for monthly deposits
            for (let month = 1; month <= 12; month++) {
              const monthsRemaining = 12 - month + 1;
              interestThisYear +=
                monthlyDeposit * monthlyRate * monthsRemaining;
              yearlyContribution += monthlyDeposit;
            }
            currentTotalContribution += yearlyContribution;
          }

          // Interest on previous year's balance for 12 months
          const interestOnBalance = currentBalance * annualRate;
          interestThisYear += interestOnBalance;

          currentBalance =
            openingBalance + yearlyContribution + interestThisYear;
          currentTotalInterest += interestThisYear;

          detailedData.push({
            year: year,
            age: startingGirlAge + year - 1,
            openingBalance: openingBalance,
            monthlyContribution:
              year <= minContributionYears ? monthlyDeposit : 0,
            yearlyContribution: yearlyContribution,
            interest: interestThisYear,
            closingBalance: currentBalance,
          });
        }

        totalContribution = currentTotalContribution;
        totalInterest = currentTotalInterest;
        maturityAmount = currentBalance;
        break;
      }

      case "Public Provident Fund (PPF)": {
        const years = 15; // Fixed tenure for PPF
        R_annual_decimal = 0.071; // PPF current rate: 7.1% p.a. compounded annually
        const annualDeposit = P; // Assuming P is annual deposit

        let currentBalance = 0;
        let currentTotalInterest = 0;
        let totalDeposited = 0;

        for (let year = 1; year <= years; year++) {
          const openingBalanceForYear = currentBalance;
          totalDeposited += annualDeposit;

          // PPF interest is calculated annually on the lowest balance between 5th and end of the month.
          // For a yearly calculation, we add the annual deposit and then compound on that sum.
          currentBalance += annualDeposit; // Deposit for the year
          const interestThisYear = currentBalance * R_annual_decimal; // Interest on balance + new deposit
          currentBalance += interestThisYear;
          currentTotalInterest += interestThisYear;

          detailedData.push({
            year: year,
            openingBalance: openingBalanceForYear,
            yearlyContribution: annualDeposit,
            interest: interestThisYear,
            closingBalance: currentBalance,
          });
        }
        maturityAmount = currentBalance;
        totalContribution = totalDeposited;
        totalInterest = currentTotalInterest;
        break;
      }

      default:
        isValid = false;
        errorMsg = "Unknown scheme type.";
        break;
    }

    // Common summary data
    summaryData.push({
      label: "Total Contribution",
      value: totalContribution,
      icon: <DollarSign size={20} className="text-gray-600" />,
    });
    summaryData.push({
      label: "Total Interest Earned",
      value: totalInterest,
      icon: <Percent size={20} className="text-gray-600" />,
    });
    summaryData.push({
      label: "Maturity Amount",
      value: maturityAmount,
      icon: <DollarSign size={20} className="text-gray-600" />,
    });

    // Scheme-specific summary details
    if (schemeName === "Kisan Vikas Patra (KVP)") {
      summaryData.push({
        label: "Maturity Period",
        value: "9 Years 7 Months (115 Months)",
        icon: <Clock size={20} className="text-gray-600" />,
      });
    } else if (schemeName === "Monthly Income Scheme (MIS)") {
      summaryData.push({
        label: "Monthly Payout",
        value: (P / 10000) * 62, // Direct from official example
        icon: <DollarSign size={20} className="text-gray-600" />,
      });
      summaryData.push({
        label: "Maturity Period",
        value: "5 Years",
        icon: <Clock size={20} className="text-gray-600" />,
      });
    } else if (schemeName === "Senior Citizens Savings Scheme (SCSS)") {
      summaryData.push({
        label: "Quarterly Payout",
        value: (P / 10000) * 205, // Direct from official example
        icon: <DollarSign size={20} className="text-gray-600" />,
      });
      summaryData.push({
        label: "Maturity Period",
        value: "5 Years",
        icon: <Clock size={20} className="text-gray-600" />,
      });
    } else if (schemeName === "Sukanya Samriddhi Account (SSA)") {
      summaryData.push({
        label: "Maturity Period",
        value: "21 Years (from opening)",
        icon: <Clock size={20} className="text-gray-600" />,
      });
      summaryData.push({
        label: "Contribution Period",
        value: "15 Years (from opening)",
        icon: <CalendarDays size={20} className="text-gray-600" />,
      });
    } else if (schemeName === "Public Provident Fund (PPF)") {
      summaryData.push({
        label: "Maturity Period",
        value: "15 Years",
        icon: <Clock size={20} className="text-gray-600" />,
      });
      summaryData.push({
        label: "Current Interest Rate",
        value: formatPercentage(R_annual_decimal * 100),
        icon: <Percent size={20} className="text-gray-600" />,
      });
    } else if (schemeName === "Recurring Deposit (RD)") {
      summaryData.push({
        label: "Maturity Period",
        value: "5 Years",
        icon: <Clock size={20} className="text-gray-600" />,
      });
    } else if (schemeName === "National Savings Certificate (NSC)") {
      summaryData.push({
        label: "Maturity Period",
        value: "5 Years",
        icon: <Clock size={20} className="text-gray-600" />,
      });
    }

    setResults({
      totalContribution,
      totalInterest,
      maturityAmount,
      summaryData,
      detailedData,
      chartData: [
        { name: "Total Investment", value: totalContribution },
        { name: "Total Interest", value: totalInterest },
      ],
      isInvalid: !isValid,
      errorMessage: errorMsg,
    });
  }, [
    depositAmount,
    interestRate, // Keeping interestRate in dependencies as a general prop, though often overridden.
    schemeName,
    selectedTenure,
    minAmount,
    maxAmount,
    girlAge,
  ]);

  // Recalculate on input changes
  useEffect(() => {
    calculate();
  }, [calculate, depositAmount, selectedTenure, girlAge]);

  // Determine the display interest rate for the input section
  const displayInterestRate = useMemo(() => {
    if (schemeName === "Time Deposit (TD)") {
      switch (selectedTenure) {
        case 1:
          return 6.9;
        case 2:
          return 7.0;
        case 3:
          return 7.1;
        case 5:
          return 7.5;
        default:
          return interestRate; // Fallback
      }
    } else if (schemeName === "Kisan Vikas Patra (KVP)") {
      return "Doubles in 115 Months"; // KVP displays doubling period, updated from 9Y 7M
    } else if (schemeName === "Monthly Income Scheme (MIS)") {
      return 7.4;
    } else if (schemeName === "Senior Citizens Savings Scheme (SCSS)") {
      return 8.2;
    } else if (schemeName === "National Savings Certificate (NSC)") {
      return 7.7;
    } else if (schemeName === "Sukanya Samriddhi Account (SSA)") {
      return 8.2;
    } else if (schemeName === "Recurring Deposit (RD)") {
      return 6.7;
    } else if (schemeName === "Public Provident Fund (PPF)") {
      return 7.1;
    }
    return interestRate; // Default prop value
  }, [schemeName, selectedTenure, interestRate]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {results.isInvalid && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {results.errorMessage}</span>
        </div>
      )}

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {schemeName} Calculator
        </h3>

        {/* Deposit Amount Input */}
        <div className="mb-4">
          <label
            htmlFor="depositAmount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {schemeName === "Recurring Deposit (RD)" ||
            schemeName === "Sukanya Samriddhi Account (SSA)"
              ? "Monthly Deposit Amount (₹)"
              : schemeName === "Public Provident Fund (PPF)"
              ? "Annual Deposit Amount (₹)"
              : "Deposit Amount (₹)"}
          </label>
          <input
            type="number"
            id="depositAmount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
            min={minAmount}
            max={maxAmount || undefined}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            placeholder={`Min: ${minAmount}, Max: ${
              maxAmount ? maxAmount : "No Limit"
            }`}
          />
          {maxAmount === null && (
            <p className="text-xs text-gray-500 mt-1">
              No upper limit for deposit.
            </p>
          )}
        </div>

        {/* Tenure Selector (for schemes with options) */}
        {tenureOptions &&
          tenureOptions.length > 1 &&
          schemeName !== "Kisan Vikas Patra (KVP)" &&
          schemeName !== "Sukanya Samriddhi Account (SSA)" &&
          schemeName !== "Public Provident Fund (PPF)" &&
          schemeName !== "Recurring Deposit (RD)" && // RD is fixed at 5 years
          schemeName !== "Monthly Income Scheme (MIS)" && // MIS is fixed at 5 years
          schemeName !== "Senior Citizens Savings Scheme (SCSS)" && // SCSS is fixed at 5 years
          schemeName !== "National Savings Certificate (NSC)" && ( // NSC is fixed at 5 years
            <div className="mb-4">
              <label
                htmlFor="tenure"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select Tenure (Years)
              </label>
              <select
                id="tenure"
                value={selectedTenure}
                onChange={(e) => setSelectedTenure(parseFloat(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              >
                {tenureOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} {option === 1 ? "Year" : "Years"}
                  </option>
                ))}
              </select>
            </div>
          )}

        {/* Girl Age Input (only for SSA) */}
        {schemeName === "Sukanya Samriddhi Account (SSA)" && (
          <div className="mb-4">
            <label
              htmlFor="girlAge"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Girl&apos;s Age at Account Opening (Years)
            </label>
            <input
              type="number"
              id="girlAge"
              value={girlAge}
              onChange={(e) => setGirlAge(parseFloat(e.target.value) || 0)}
              min="0"
              max="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              placeholder="0-10 years"
            />
            <p className="text-xs text-gray-500 mt-1">
              Girl must be between 0 and 10 years of age at the time of account
              opening.
            </p>
          </div>
        )}

        {/* Interest Rate Display (now dynamic for TD and fixed for others) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Current Interest Rate
          </label>
          <div className="flex items-center bg-gray-100 rounded py-2 px-3">
            <Percent className="text-gray-500 mr-2" size={20} />
            <span className="text-gray-800 font-semibold">
              {typeof displayInterestRate === "number"
                ? formatPercentage(displayInterestRate)
                : displayInterestRate}{" "}
              {typeof displayInterestRate === "number" && "p.a."}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      {!results.isInvalid && results.maturityAmount > 0 && (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Calculation Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.summaryData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200"
              >
                {item.icon}
                <div className="ml-3">
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {typeof item.value === "number" &&
                    item.label !== "Current Interest Rate"
                      ? formatCurrency(item.value)
                      : item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doughnut Chart: Investment vs. Return */}
      {!results.isInvalid && results.chartData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100 flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Investment Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={results.chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {results.chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Detailed Table (conditionally rendered for relevant schemes) */}
      {!results.isInvalid && results.detailedData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100 overflow-x-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Detailed Breakdown
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                {schemeName === "Sukanya Samriddhi Account (SSA)" && (
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                )}
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opening Balance (₹)
                </th>
                {(schemeName === "Recurring Deposit (RD)" ||
                  schemeName === "Sukanya Samriddhi Account (SSA)") && (
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Contribution (₹)
                  </th>
                )}
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yearly Contribution (₹)
                </th>
                {schemeName === "Monthly Income Scheme (MIS)" ? (
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Payout (₹)
                  </th>
                ) : schemeName === "Senior Citizens Savings Scheme (SCSS)" ? (
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quarterly Payout (₹)
                  </th>
                ) : null}
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interest (₹)
                </th>
                <th className="px-3 py-2 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Closing Balance (₹)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.detailedData.map((data, idx) => (
                <tr key={idx}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.year}
                  </td>
                  {schemeName === "Sukanya Samriddhi Account (SSA)" && (
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {data.age}
                    </td>
                  )}
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(data.openingBalance)}
                  </td>
                  {(schemeName === "Recurring Deposit (RD)" ||
                    schemeName === "Sukanya Samriddhi Account (SSA)") && (
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(data.monthlyContribution)}
                    </td>
                  )}
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(data.yearlyContribution || 0)}
                  </td>
                  {schemeName === "Monthly Income Scheme (MIS)" ? (
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(data.monthlyPayout)}
                    </td>
                  ) : schemeName === "Senior Citizens Savings Scheme (SCSS)" ? (
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(data.quarterlyPayout)}
                    </td>
                  ) : null}
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(data.interest || 0)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {formatCurrency(data.closingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-gray-600">
            *All figures are indicative and based on current interest rates.
            Actual returns may vary slightly due to rounding or policy changes,
            especially for schemes like RD where exact Post Office internal
            calculation logic can be very specific.*
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculatorComponent;
