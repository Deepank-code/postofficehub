"use client";

import { useState } from "react";
import {
  Calculator,
  PiggyBank,
  TrendingUp,
  DollarSign,
  Percent,
  Bell,
} from "lucide-react";

import CalculatorComponent from "@/app/_components/Calculator";

import MaturityReminderTool from "../_components/MaturityReminderTool";
import Image from "next/image";

export default function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState(null);

  const calculators = [
    {
      id: "rd",
      emoji: "🏦",
      title: "RD Calculator",
      description:
        "Calculate your Recurring Deposit returns for 5-year tenure with monthly investments",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      schemeName: "Recurring Deposit (RD)",
      interestRate: 6.7,
      calculationType: "monthly",
      tenureOptions: [5],
      minAmount: 10,
      maxAmount: 100000,
    },
    {
      id: "td",
      emoji: "💰",
      title: "TD Calculator",
      description:
        "Calculate Time Deposit returns with flexible tenure options and compound interest",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      schemeName: "Time Deposit (TD)",
      interestRate: 6.9,
      calculationType: "compound",
      tenureOptions: [1, 2, 3, 5],
      minAmount: 1000,
      maxAmount: 500000,
    },
    {
      id: "kvp",
      emoji: "🌾",
      title: "KVP Calculator",
      description:
        "Calculate Kisan Vikas Patra maturity with money doubling feature",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      schemeName: "Kisan Vikas Patra (KVP)",
      interestRate: 7.5,
      calculationType: "compound",
      tenureOptions: [10.4],
      minAmount: 1000,
      maxAmount: 450000,
    },
    {
      id: "mis",
      emoji: "📈",
      title: "MIS Calculator",
      description:
        "Calculate Monthly Income Scheme returns and monthly payouts",
      color: "from-purple-400 to-violet-500",
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      schemeName: "Monthly Income Scheme (MIS)",
      interestRate: 7.4,
      calculationType: "simple",
      tenureOptions: [5],
      minAmount: 1000,
      maxAmount: 450000,
    },
    {
      id: "scss",
      emoji: "👴",
      title: "SCSS Calculator",
      description:
        "Calculate Senior Citizens Savings Scheme returns with quarterly interest",
      color: "from-red-400 to-rose-500",
      bgColor: "bg-gradient-to-r from-red-50 to-rose-50",
      borderColor: "border-red-200",
      schemeName: "Senior Citizens Savings Scheme (SCSS)",
      interestRate: 8.2,
      calculationType: "simple",
      tenureOptions: [5],
      minAmount: 1000,
      maxAmount: 1500000,
    },
    {
      id: "nsc",
      emoji: "🏛️",
      title: "NSC Calculator",
      description:
        "Calculate National Savings Certificate returns with tax benefits",
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-gradient-to-r from-teal-50 to-cyan-50",
      borderColor: "border-teal-200",
      schemeName: "National Savings Certificate (NSC)",
      interestRate: 6.8,
      calculationType: "compound",
      tenureOptions: [5],
      minAmount: 1000,
      maxAmount: 500000,
    },
    {
      id: "ssa",
      emoji: "🎓",
      title: "SSA Calculator",
      description:
        "Calculate Sukanya Samriddhi Account returns for girl child education",
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-gradient-to-r from-pink-50 to-rose-50",
      borderColor: "border-pink-200",
      schemeName: "Sukanya Samriddhi Account (SSA)",
      interestRate: 8.2,
      calculationType: "compound",
      tenureOptions: [21],
      minAmount: 250,
      maxAmount: 150000,
    },
    {
      id: "maturity-reminder",
      emoji: "🔔",
      title: "Maturity Reminder Tool",
      description: "Set smart reminders for your investment maturity dates",
      color: "from-indigo-400 to-blue-500",
      bgColor: "bg-gradient-to-r from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200",
    },
  ];

  const toggleCalculator = (id) => {
    setActiveCalculator(activeCalculator === id ? null : id);
  };

  const getCalculatorComponent = (calc) => {
    if (calc.id === "maturity-reminder") {
      return <MaturityReminderTool />;
    }
    return (
      <CalculatorComponent
        schemeName={calc.schemeName}
        interestRate={calc.interestRate}
        calculationType={calc.calculationType}
        tenureOptions={calc.tenureOptions}
        minAmount={calc.minAmount}
        maxAmount={calc.maxAmount}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20 md:pb-0">
      <section className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-5 flex-col">
            <div>
              <Image
                src={"/post-cal.png"}
                alt={"finincial calculator"}
                width={300}
                height={300}
                quality={80} // Slightly higher quality for sharper images
                priority
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold font-poppins">
              Financial Calculator
            </h1>
          </div>
          <p className="text-xl text-orange-100 mb-4 font-inter">
            Smart financial calculators for Post Office investment schemes
          </p>
          <p className="text-orange-200 font-inter">
            Calculate returns, plan investments, and set maturity reminders
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">
              Choose Your Calculator
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-inter">
              Select from our comprehensive collection of financial calculators
            </p>
          </div>

          <div className="space-y-6">
            {calculators.map((calc) => (
              <div key={calc.id} className="w-full">
                <div
                  className={`${calc.bgColor} ${calc.borderColor} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer w-full`}
                  onClick={() => toggleCalculator(calc.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${calc.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}
                      >
                        {calc.emoji}
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-xl font-bold text-gray-800 font-poppins">
                          {calc.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 font-inter">
                          {calc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {activeCalculator === calc.id && (
                  <div className="mt-4 w-full">
                    <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-200">
                      {getCalculatorComponent(calc)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
