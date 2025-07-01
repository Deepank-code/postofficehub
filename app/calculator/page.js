"use client";

import { useState } from "react";

import CalculatorComponent from "@/app/_components/Calculator";

import MaturityReminderTool from "../_components/MaturityReminderTool";
import Image from "next/image";

export default function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState(null);

  const calculators = [
    {
      id: "rd",
      image: "/post-rd.png", // Placeholder image path
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
      minAmount: 100,
      maxAmount: 100000,
    },
    {
      id: "td",
      image: "/post-td.png", // Placeholder image path
      title: "TD Calculator",
      description:
        "Calculate Time Deposit returns with flexible tenure options and compound interest",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      schemeName: "Time Deposit (TD)",
      // interestRate here is just a fallback, specific rates per tenure are handled in CalculatorComponent
      interestRate: 6.9,
      calculationType: "compound",
      tenureOptions: [1, 2, 3, 5],
      minAmount: 1000,
      maxAmount: 500000,
    },
    {
      id: "kvp",
      image: "/post-kvp.png", // Placeholder image path
      title: "KVP Calculator",
      description:
        "Calculate Kisan Vikas Patra maturity with money doubling feature (Maturity Period: 9 years and 7 months at current 7.5% rate, compounded quarterly)", // Clarified KVP period and compounding
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      schemeName: "Kisan Vikas Patra (KVP)",
      interestRate: 7.5, // KVP rate is currently 7.5%
      calculationType: "compound",
      tenureOptions: [9.58], // Approximate years for 9 years 7 months
      minAmount: 1000,
      maxAmount: 450000,
    },
    {
      id: "mis",
      image: "/post-mis.png", // Placeholder image path
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
      image: "/post-scss.png",
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
      image: "/post-rd.png",
      title: "NSC Calculator",
      description:
        "Calculate National Savings Certificate returns with tax benefits (Compounded Annually, Paid at Maturity)", // Clarified NSC compounding
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-gradient-to-r from-teal-50 to-cyan-50",
      borderColor: "border-teal-200",
      schemeName: "National Savings Certificate (NSC)",
      interestRate: 7.7, // NSC rate is 7.7%
      calculationType: "compound",
      tenureOptions: [5],
      minAmount: 1000,
      maxAmount: 500000,
    },
    {
      id: "ssa",
      image: "/post-ssa.png",
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
      initialGirlAge: 1, // Default to 1 year for SSA
    },
    {
      id: "maturity-reminder",
      image: "/post-maturity.png",
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
        // Pass initialGirlAge prop only if it exists
        {...(calc.initialGirlAge !== undefined && {
          initialGirlAge: calc.initialGirlAge,
        })}
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
              Financial Calculators
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
                  className={`${calc.bgColor} ${calc.borderColor} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer w-full group`} // Added 'group' class here
                  onClick={() => toggleCalculator(calc.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      {" "}
                      {/* Changed items-start back to items-center for vertical centering */}
                      {/* Image Container with improved styling */}
                      <div
                        className={`
                          w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 {/* Adjusted lg size for better proportion */}
                          bg-white rounded-2xl
                          border border-white shadow-lg
                          flex items-center justify-center p-2
                          transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl
                        `}
                      >
                        <Image
                          src={calc.image}
                          alt={calc.title}
                          width={300} // Keep original width/height for Next.js optimization
                          height={300} // Keep original width/height for Next.js optimization
                          quality={80}
                          priority
                          className="w-full h-full object-contain" // Make image fill its parent div
                        />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-800 font-poppins">
                          {" "}
                          {/* Increased heading size */}
                          {calc.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-1 font-inter">
                          {" "}
                          {/* Increased paragraph size */}
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
