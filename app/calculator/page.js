"use client";

import Image from "next/image";
import Link from "next/link";
const calculatorFaqs = [
  {
    question: "What are Post Office financial calculators?",
    answer:
      "These online tools help you calculate maturity amounts, interest, and returns on India Post schemes like RD, TD, MIS, SCSS, KVP, and SSA, aiding your investment planning.",
  },
  {
    question: "Are the Post Office calculators free to use?",
    answer:
      "Yes, all calculators on Post Office Hub are free for everyone to calculate and plan investments conveniently.",
  },
  {
    question: "Are the calculator results accurate?",
    answer:
      "We use the latest interest rates and accurate formulas to ensure reliable estimates, but please cross-check with your nearest Post Office for official values.",
  },
  {
    question: "Can I calculate different tenures for RD, TD, or MIS?",
    answer:
      "Yes, our calculators allow you to select different tenure options and monthly/one-time investments to calculate your potential returns.",
  },
  {
    question: "How can these calculators help in investment planning?",
    answer:
      "By comparing returns across Post Office schemes, you can choose the best investment aligned with your goals, tenure, and risk profile.",
  },
];

export default function Calculators() {
  const calculators = [
    {
      id: "rd",
      image: "/post-rd.webp",
      title: "RD Calculator",
      description:
        "Calculate your Recurring Deposit returns for 5-year tenure with monthly investments",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
      borderColor: "border-green-200",
    },
    {
      id: "td",
      image: "/post-td.webp",
      title: "TD Calculator",
      description:
        "Calculate Time Deposit returns with flexible tenure options and compound interest",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
    },
    {
      id: "kvp",
      image: "/post-kvp.webp",
      title: "KVP Calculator",
      description:
        "Calculate Kisan Vikas Patra maturity with money doubling feature (Maturity: 9 years 7 months at 7.5% compounded quarterly)",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
    },
    {
      id: "mis",
      image: "/post-mis.webp",
      title: "MIS Calculator",
      description:
        "Calculate Monthly Income Scheme returns and monthly payouts",
      color: "from-purple-400 to-violet-500",
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
    },
    {
      id: "scss",
      image: "/post-scss.webp",
      title: "SCSS Calculator",
      description:
        "Calculate Senior Citizens Savings Scheme returns with quarterly interest",
      color: "from-red-400 to-rose-500",
      bgColor: "bg-gradient-to-r from-red-50 to-rose-50",
      borderColor: "border-red-200",
    },
    {
      id: "nsc",
      image: "/post-rd.webp",
      title: "NSC Calculator",
      description:
        "Calculate National Savings Certificate returns with tax benefits (Compounded Annually, Paid at Maturity)",
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-gradient-to-r from-teal-50 to-cyan-50",
      borderColor: "border-teal-200",
    },
    {
      id: "ssa",
      image: "/post-ssa.webp",
      title: "SSA Calculator",
      description:
        "Calculate Sukanya Samriddhi Account returns for girl child education",
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-gradient-to-r from-pink-50 to-rose-50",
      borderColor: "border-pink-200",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calculatorFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20 md:pb-0">
      <section className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-5 flex-col">
            <div>
              <Image
                src={"/post-cal.webp"}
                alt={"Financial Calculator"}
                width={300}
                height={300}
                quality={80}
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

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {" "}
            {/* Using grid for a clean layout of cards */}
            {calculators.map((calc) => (
              <Link // Changed div to Link
                key={calc.id}
                href={`/calculator/${calc.id}`} // Link to the dedicated calculator page
                className={`${calc.bgColor} ${calc.borderColor} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer w-full group block`} // Added 'block' to make Link fill its container
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`
                        w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36
                        bg-white rounded-2xl
                        border border-white shadow-lg
                        flex items-center justify-center p-2
                        transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl
                      `}
                    >
                      {/* Conditionally render Image or emoji based on whether 'image' property exists */}
                      {calc.image ? (
                        <Image
                          src={calc.image}
                          alt={calc.title}
                          width={300}
                          height={300}
                          quality={80}
                          priority
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-5xl">{calc.emoji}</span> // Display emoji if no image path
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-800 font-poppins">
                        {calc.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-1 font-inter">
                        {calc.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="max-w-4xl mx-auto mt-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-700 mb-10 font-poppins">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 md:gap-8">
          {calculatorFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-orange-100 shadow hover:shadow-md transition-shadow p-6 md:p-8"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 font-poppins">
                {faq.question}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed font-inter ps-4">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
