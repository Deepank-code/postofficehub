// "use client";

import React from "react";

import CalculatorComponent from "../../_components/Calculator";
import Link from "next/link";
import Image from "next/image";

// Calculator data
const calculatorsData = [
  {
    id: "rd",
    image: "/post-rd.webp",
    title: "RD Calculator",
    description:
      "Calculate your Recurring Deposit returns for a 5-year tenure with monthly investments.",
    schemeName: "Recurring Deposit (RD)",
    interestRate: 6.7,
    calculationType: "monthly",
    tenureOptions: [5],
    minAmount: 100,
    maxAmount: 100000,
    blogLink: "/blog/rd-scheme",
  },
  {
    id: "td",
    image: "/post-td.webp",
    title: "TD Calculator",
    description:
      "Calculate Time Deposit returns with flexible tenure options and compound interest.",
    schemeName: "Time Deposit (TD)",
    interestRate: 6.9,
    calculationType: "compound",
    tenureOptions: [1, 2, 3, 5],
    minAmount: 1000,
    maxAmount: 500000,
    blogLink: "/blog/td-scheme",
  },
  {
    id: "kvp",
    image: "/post-kvp.webp",
    title: "KVP Calculator",
    description:
      "Calculate Kisan Vikas Patra maturity with money doubling feature (Maturity: 9 years 7 months at 7.5% compounded quarterly).",
    schemeName: "Kisan Vikas Patra (KVP)",
    interestRate: 7.5,
    calculationType: "compound",
    tenureOptions: [9.58],
    minAmount: 1000,
    maxAmount: 450000,
    blogLink: "/blog/kvp-scheme",
  },
  {
    id: "mis",
    image: "/post-mis.webp",
    title: "MIS Calculator",
    description:
      "Calculate Monthly Income Scheme returns and monthly payouts easily.",
    schemeName: "Monthly Income Scheme (MIS)",
    interestRate: 7.4,
    calculationType: "simple",
    tenureOptions: [5],
    minAmount: 1000,
    maxAmount: 450000,
    blogLink: "/blog/mis-scheme",
  },
  {
    id: "scss",
    image: "/post-scss.webp",
    title: "SCSS Calculator",
    description:
      "Calculate Senior Citizens Savings Scheme returns with quarterly interest.",
    schemeName: "Senior Citizens Savings Scheme (SCSS)",
    interestRate: 8.2,
    calculationType: "simple",
    tenureOptions: [5],
    minAmount: 1000,
    maxAmount: 1500000,
    blogLink: "/blog/scss-scheme",
  },
  {
    id: "nsc",
    image: "/post-rd.webp",
    title: "NSC Calculator",
    description:
      "Calculate National Savings Certificate returns with tax benefits, compounded annually and paid at maturity.",
    schemeName: "National Savings Certificate (NSC)",
    interestRate: 7.7,
    calculationType: "compound",
    tenureOptions: [5],
    minAmount: 1000,
    maxAmount: 500000,
    blogLink: "/blog/nsc-scheme",
  },
  {
    id: "ssa",
    image: "/post-ssa.webp",
    title: "SSA Calculator",
    description:
      "Calculate Sukanya Samriddhi Account returns for your daughter's education and marriage.",
    schemeName: "Sukanya Samriddhi Account (SSA)",
    interestRate: 8.2,
    calculationType: "compound",
    tenureOptions: [21],
    minAmount: 250,
    maxAmount: 150000,
    initialGirlAge: 1,
    blogLink: "/blog/ssa-scheme",
  },
];
export async function generateStaticParams() {
  return calculatorsData.map((calc) => ({
    id: calc.id,
  }));
}
export async function generateMetadata({ params }) {
  const calc = calculatorsData.find((c) => c.id === params.id);

  if (!calc) {
    return {
      title: "Calculator Not Found | Post Office Hub",
      description: "The requested calculator was not found on Post Office Hub.",
    };
  }

  const pageUrl = `https://postofficehub.in/calculator/${calc.id}`;
  const imageUrl = `https://postofficehub.in${calc.image}`;

  return {
    title: `${calc.title} | Post Office Hub`,
    description: calc.description,
    keywords: `${calc.title}, Post Office Calculator, India Post Schemes`,
    openGraph: {
      title: `${calc.title} | Post Office Hub`,
      description: calc.description,
      url: pageUrl,
      siteName: "Post Office Hub",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${calc.title} | Post Office Hub`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${calc.title} | Post Office Hub`,
      description: calc.description,
      images: [imageUrl],
      creator: "@PostOfficeHub",
    },
  };
}

export default function DynamicCalculatorPage({ params }) {
  const { id } = params;

  const selectedCalc = calculatorsData.find((calc) => calc.id === id);

  if (!selectedCalc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 text-center border border-orange-200 max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
            Calculator Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The requested calculator does not exist or has been moved.
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-full font-medium hover:brightness-110 transition-transform hover:scale-105 shadow-md"
          >
            &larr; Back to All Calculators
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-yellow-200 p-5 sm:p-8 md:p-12 lg:p-16 transition-transform hover:scale-[1.005]">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 relative mb-4">
            <Image
              src={selectedCalc.image}
              alt={selectedCalc.title}
              fill
              sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 180px"
              className="object-contain p-2 bg-white rounded-full shadow-md border border-yellow-100"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-700 text-center">
            {selectedCalc.title}
          </h1>
          <p className="mt-2 text-center text-gray-700 max-w-2xl text-base sm:text-lg">
            {selectedCalc.description}
          </p>
        </div>

        {/* Blog Button */}
        {selectedCalc.blogLink && (
          <div className="mb-6 text-center">
            <Link
              href={selectedCalc.blogLink}
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-full text-sm sm:text-base font-semibold hover:brightness-110 transition-transform hover:scale-105 shadow-md"
            >
              Read {selectedCalc.id.toUpperCase()} Detailed Guide
            </Link>
          </div>
        )}

        {/* Calculator Component */}
        <div className="mb-8">
          <CalculatorComponent
            schemeName={selectedCalc.schemeName}
            interestRate={selectedCalc.interestRate}
            calculationType={selectedCalc.calculationType}
            tenureOptions={selectedCalc.tenureOptions}
            minAmount={selectedCalc.minAmount}
            maxAmount={selectedCalc.maxAmount}
            {...(selectedCalc.initialGirlAge !== undefined && {
              initialGirlAge: selectedCalc.initialGirlAge,
            })}
          />
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/calculator"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-full font-medium hover:brightness-110 transition-transform hover:scale-105 shadow-md"
          >
            &larr; Back to All Calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
