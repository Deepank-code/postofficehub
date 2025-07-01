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
  Cell, // Keep PieChart, Pie, Cell for Doughnut
} from "recharts"; // Import Recharts components
import {
  DollarSign,
  Percent,
  CalendarDays,
  BarChart,
  Clock,
  Hash,
} from "lucide-react"; // Icons for better UI

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
  interestRate, // Annual rate (base rate, might be overridden by scheme logic)
  calculationType,
  tenureOptions,
  minAmount,
  maxAmount,
  initialGirlAge, // Only for SSA
}) => {
  const [depositAmount, setDepositAmount] = useState(minAmount);
  const [selectedTenure, setSelectedTenure] = useState(tenureOptions[0]);
  // Initialize girlAge to 1 for SSA if initialGirlAge is 0 or undefined, as per "min age is one" requirement.
  const [girlAge, setGirlAge] = useState(
    schemeName === "Sukanya Samriddhi Account (SSA)" ? initialGirlAge || 1 : 0
  );

  const [results, setResults] = useState({
    totalContribution: 0,
    totalInterest: 0,
    maturityAmount: 0,
    summaryData: [], // Data for summary table
    detailedData: [], // Data for detailed table
    chartData: [], // Data for pie chart
    isInvalid: false,
    errorMessage: "",
  });

  // Calculate function memoized for performance
  const calculate = useCallback(() => {
    let totalContribution = 0;
    let totalInterest = 0;
    let maturityAmount = 0;
    const summaryData = [];
    const detailedData = [];
    let isValid = true;
    let errorMsg = "";

    const P = parseFloat(depositAmount);
    let R_annual = parseFloat(interestRate) / 100; // Annual rate as decimal, can be overridden below

    // Input validation
    if (isNaN(P) || P < minAmount || (maxAmount !== null && P > maxAmount)) {
      isValid = false;
      errorMsg = `Please enter an amount between ${formatCurrency(
        minAmount
      )} and ${maxAmount ? formatCurrency(maxAmount) : "No Limit"}.`;
    }

    if (schemeName === "Sukanya Samriddhi Account (SSA)") {
      const currentGirlAge = parseFloat(girlAge);
      if (isNaN(currentGirlAge) || currentGirlAge < 1 || currentGirlAge > 10) {
        isValid = false;
        errorMsg =
          "Girl's age at account opening must be between 1 and 10 years.";
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

    switch (schemeName) {
      case "Recurring Deposit (RD)": {
        const monthlyDeposit = P;
        const years = 5; // Fixed tenure
        const totalMonths = years * 12;
        const quarterlyRate = R_annual / 4; // RD compounded quarterly
        let balance = 0;
        let contributedInYear = 0;
        let interestInYear = 0;

        for (let month = 1; month <= totalMonths; month++) {
          balance += monthlyDeposit;
          totalContribution += monthlyDeposit;
          contributedInYear += monthlyDeposit;

          // Interest calculation for RD is slightly more complex, as per official norms
          // It's calculated on the lowest balance between the 10th and end of the month
          // For simplicity in a general calculator, we can assume average balance or quarterly compounding on current balance.
          // Current logic: compound quarterly on current balance. This is an approximation.
          if (month % 3 === 0) {
            // End of quarter
            const q_interest = balance * quarterlyRate;
            totalInterest += q_interest;
            balance += q_interest; // Interest compounded
            interestInYear += q_interest;
          }

          if (month % 12 === 0) {
            // End of year
            detailedData.push({
              year: month / 12,
              openingBalance:
                month / 12 === 1
                  ? monthlyDeposit * 12
                  : detailedData[detailedData.length - 1].closingBalance, // Approximation
              monthlyContribution: monthlyDeposit,
              yearlyContribution: contributedInYear,
              interest: interestInYear,
              closingBalance: balance,
            });
            contributedInYear = 0;
            interestInYear = 0;
          }
        }
        maturityAmount = balance;
        break;
      }

      case "Time Deposit (TD)": {
        const years = parseInt(selectedTenure);
        totalContribution = P; // Only principal is contributed

        // Adjust annual interest rate based on tenure for TD
        switch (years) {
          case 1:
            R_annual = 0.069;
            break; // 6.9%
          case 2:
            R_annual = 0.07;
            break; // 7.0%
          case 3:
            R_annual = 0.071;
            break; // 7.1%
          case 5:
            R_annual = 0.075;
            break; // 7.5%
          default:
            R_annual = parseFloat(interestRate) / 100; // Fallback
        }

        maturityAmount = P * Math.pow(1 + R_annual / 4, years * 4); // Compounded quarterly
        totalInterest = maturityAmount - P;

        let currentBalanceForTD = P;
        for (let year = 1; year <= years; year++) {
          const interestEarnedThisYear =
            currentBalanceForTD * (Math.pow(1 + R_annual / 4, 4) - 1);
          currentBalanceForTD += interestEarnedThisYear;
          detailedData.push({
            year: year,
            openingBalance:
              year === 1
                ? P
                : detailedData[detailedData.length - 2].closingBalance, // Corrected index for opening balance
            yearlyContribution: 0,
            interest: interestEarnedThisYear,
            closingBalance: currentBalanceForTD,
          });
        }
        break;
      }

      case "Kisan Vikas Patra (KVP)": {
        totalContribution = P; // Only principal
        const officialMaturityMonths = 115; // 9 years and 7 months = 115 months
        const currentKVPAnnualRate = 0.075; // 7.5% fixed for KVP
        const periodsPerYear = 4; // Quarterly compounding
        const ratePerPeriod = currentKVPAnnualRate / periodsPerYear;

        // Calculate maturity amount based on the exact periods
        const totalQuarterlyPeriods = officialMaturityMonths / 3;
        maturityAmount = P * Math.pow(1 + ratePerPeriod, totalQuarterlyPeriods);
        totalInterest = maturityAmount - P;

        let currentBalance = P;
        let prevClosingBalance = P; // Used to calculate interest earned in the current year for detailed table

        // Loop for years, stopping at the year when maturity is reached
        const maxYearsInTable = Math.ceil(officialMaturityMonths / 12);

        for (let y = 1; y <= maxYearsInTable; y++) {
          let yearEndBalance;
          let interestThisYear;

          // Calculate the number of months completed at the end of this 'y' year
          const monthsCompletedThisYear =
            Math.min(y * 12, officialMaturityMonths) - (y - 1) * 12;
          const quartersCompletedThisYear = monthsCompletedThisYear / 3;

          if (quartersCompletedThisYear > 0) {
            let balanceAtStartOfThisYear = openingBalanceForYear;
            for (let q = 0; q < quartersCompletedThisYear; q++) {
              let interestInQuarter = balanceAtStartOfThisYear * ratePerPeriod;
              interestThisYear += interestInQuarter;
              balanceAtStartOfThisYear += interestInQuarter;
            }
            closingBalanceForYear = balanceAtStartOfThisYear;
          } else {
            // No full quarter in this year (e.g. final partial month)
            closingBalanceForYear = openingBalanceForYear;
          }

          // If this is the final year, ensure closing balance matches maturityAmount
          if (y === totalYears) {
            closingBalanceForYear = maturityAmount;
            interestThisYear = maturityAmount - openingBalanceForYear;
          }

          detailedData.push({
            year: y,
            openingBalance:
              y === 1
                ? P
                : detailedData[detailedData.length - 1].closingBalance,
            yearlyContribution: 0,
            interest: interestThisYear,
            closingBalance: closingBalanceForYear,
          });

          if (monthsCompletedThisYear === officialMaturityMonths) {
            break; // Stop if maturity is reached
          }
        }
        break;
      }

      case "Monthly Income Scheme (MIS)": {
        const years = 5; // Fixed tenure
        totalContribution = P; // Principal is returned at maturity
        const monthlyPayout = P * (R_annual / 12);
        totalInterest = monthlyPayout * 12 * years;
        maturityAmount = P; // Principal returned at maturity

        for (let year = 1; year <= years; year++) {
          detailedData.push({
            year: year,
            openingBalance: P,
            monthlyPayout: monthlyPayout,
            yearlyPayout: monthlyPayout * 12,
            closingBalance: P, // Principal remains constant
          });
        }
        break;
      }

      case "Senior Citizens Savings Scheme (SCSS)": {
        const years = 5; // Fixed tenure
        totalContribution = P; // Principal is returned at maturity
        const quarterlyPayout = P * (R_annual / 4);
        totalInterest = quarterlyPayout * 4 * years;
        maturityAmount = P; // Principal returned at maturity

        for (let year = 1; year <= years; year++) {
          detailedData.push({
            year: year,
            openingBalance: P,
            quarterlyPayout: quarterlyPayout,
            yearlyPayout: quarterlyPayout * 4,
            closingBalance: P, // Principal remains constant
          });
        }
        break;
      }

      case "National Savings Certificate (NSC)": {
        const years = 5; // Fixed tenure
        totalContribution = P; // Only principal
        maturityAmount = P * Math.pow(1 + R_annual, years); // Compounded annually
        totalInterest = maturityAmount - P;

        let currentBalance = P;
        for (let year = 1; year <= years; year++) {
          const interestThisYear = currentBalance * R_annual;
          currentBalance += interestThisYear;
          detailedData.push({
            year: year,
            openingBalance:
              detailedData.length > 0
                ? detailedData[detailedData.length - 1].closingBalance
                : P,
            yearlyContribution: 0,
            interest: interestThisYear,
            closingBalance: currentBalance,
          });
        }
        break;
      }

      case "Sukanya Samriddhi Account (SSA)": {
        const monthlyDeposit = P;
        const minContributionYears = 15; // Contributions for 15 years
        const maturityYears = 21; // Account matures 21 years from opening
        let currentBalance = 0;
        let currentTotalContribution = 0;
        let currentTotalInterest = 0;
        // Ensure startingGirlAge is a valid number, default to 1 if NaN or less than 1
        const startingGirlAge = Math.max(
          1,
          Math.min(10, parseFloat(girlAge) || 1)
        ); // Clamped between 1 and 10

        for (let year = 1; year <= maturityYears; year++) {
          const openingBalanceForYear = currentBalance;
          let yearlyContribution = 0;

          if (year <= minContributionYears) {
            // Contribute for the first 15 years
            yearlyContribution = monthlyDeposit * 12;
            currentTotalContribution += yearlyContribution;
          }

          // SSA interest is calculated on the lowest balance between 10th and end of the month
          // For annual compounding, simplify by adding yearly contribution before interest calc
          currentBalance += yearlyContribution; // Add yearly contribution before interest calculation

          const interestThisYear = currentBalance * R_annual; // Interest compounded annually
          currentBalance += interestThisYear;
          currentTotalInterest += interestThisYear;

          detailedData.push({
            year: year,
            age: startingGirlAge + year - 1, // Girl's age at the end of the year
            openingBalance: openingBalanceForYear,
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
        value: "9 Years 7 Months", // Corrected KVP maturity period
        icon: <Clock size={20} className="text-gray-600" />,
      });
    } else if (schemeName === "Monthly Income Scheme (MIS)") {
      summaryData.push({
        label: "Monthly Payout",
        value: P * (R_annual / 12),
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
        value: P * (R_annual / 4),
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
    } else {
      // For RD, TD, NSC
      summaryData.push({
        label: "Maturity Period",
        value: `${selectedTenure} Years`,
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
    interestRate,
    schemeName,
    selectedTenure,
    minAmount,
    maxAmount,
    girlAge,
  ]); // Add girlAge to dependencies

  // Recalculate on input changes
  useEffect(() => {
    calculate();
  }, [calculate, depositAmount, selectedTenure, girlAge]); // Include girlAge here

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
              : "Deposit Amount (₹)"}
          </label>
          <input
            type="number"
            id="depositAmount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)} // Ensure number or 0
            min={minAmount}
            max={maxAmount || undefined} // max will be undefined if no limit
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
          schemeName !== "Sukanya Samriddhi Account (SSA)" && (
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
                onChange={(e) => setSelectedTenure(parseFloat(e.target.value))} // Ensure number
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
              onChange={(e) => setGirlAge(parseFloat(e.target.value) || 1)} // Ensure number or default to 1
              min="1" // Changed min to 1
              max="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              placeholder="1-10 years"
            />
            <p className="text-xs text-gray-500 mt-1">
              Girl must be between 1 and 10 years of age at the time of account
              opening.
            </p>
          </div>
        )}

        {/* Interest Rate Display (now dynamic for TD) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Current Interest Rate
          </label>
          <div className="flex items-center bg-gray-100 rounded py-2 px-3">
            <Percent className="text-gray-500 mr-2" size={20} />
            <span className="text-gray-800 font-semibold">
              {schemeName === "Time Deposit (TD)"
                ? formatPercentage(
                    selectedTenure === 1
                      ? 6.9
                      : selectedTenure === 2
                      ? 7.0
                      : selectedTenure === 3
                      ? 7.1
                      : selectedTenure === 5
                      ? 7.5
                      : interestRate
                  )
                : formatPercentage(interestRate)}{" "}
              p.a.
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
                    {typeof item.value === "number"
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
                innerRadius={70} // Inner radius for Doughnut effect
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                } // Optional label for segments
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
                {schemeName === "Recurring Deposit (RD)" ||
                schemeName === "Sukanya Samriddhi Account (SSA)" ? (
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Contribution (₹)
                  </th>
                ) : null}
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
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  {schemeName === "Recurring Deposit (RD)" ||
                  schemeName === "Sukanya Samriddhi Account (SSA)" ? (
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(data.monthlyContribution)}
                    </td>
                  ) : null}
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
            Actual returns may vary slightly due to rounding or policy changes.*
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculatorComponent;
