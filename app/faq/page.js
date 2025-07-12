"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Info } from "lucide-react";
import Link from "next/link";

// export const metadata = {
//   title: "Frequently Asked Questions | Post Office Hub",
//   description:
//     "Find answers to common questions about India Post schemes, calculators, services, and the Post Office Hub platform. Your guide to India Post.",
//   keywords:
//     "FAQ, Post Office, India Post, Schemes, Calculators, Tracking, GDS, Interest Rates, Privacy, Questions, Answers",
//   openGraph: {
//     title: "Frequently Asked Questions | Post Office Hub",
//     description:
//       "Find answers to common questions about India Post schemes, calculators, services, and the Post Office Hub platform.",
//     url: "https://www.postofficehub.com/faq", // Replace with your actual domain
//     type: "website",
//   },
// };

const faqData = [
  {
    id: "1",
    question: "What is Post Office Hub?",
    answer:
      "Post Office Hub is an independent educational platform providing comprehensive and accurate information on India Post schemes, services, and GDS resources. We aim to bridge the information gap and empower rural communities with financial knowledge. Please note: We are NOT affiliated with India Post.",
    category: "General",
  },
  {
    id: "2",
    question: "How can I calculate my Recurring Deposit (RD) returns?",
    answer:
      "You can use our dedicated RD Calculator tool available on the 'Calculators' page. Simply input your monthly investment amount and desired tenure (e.g., 5 years) to get an estimated maturity amount and total interest earned.",
    category: "Calculators",
  },
  {
    id: "3",
    question:
      "Are the interest rates on Post Office schemes higher than traditional banks?",
    answer:
      "Often, yes. India Post schemes are government-backed and frequently offer highly competitive interest rates that can be higher than those offered by many commercial banks. We provide updated interest rates on our 'Interest Rates' page for easy comparison.",
    category: "Schemes & Rates",
  },
  {
    id: "4",
    question: "Where can I track my parcel or registered article?",
    answer:
      "You can track your parcels, registered articles, and speed post consignments using our 'Tracking' tool. Just enter your consignment number into the search bar to get real-time status updates and delivery information.",
    category: "Services",
  },
  {
    id: "5",
    question: "What kind of information is available in the GDS Corner?",
    answer:
      "The GDS Corner is a specialized section providing essential resources, tools, and important notifications specifically for Gramin Dak Sevaks (GDS) employees of India Post. This includes information on salary, allowances, promotion processes, and official circulars.",
    category: "GDS Corner",
  },
  {
    id: "6",
    question: "Is my personal data collected on Post Office Hub?",
    answer:
      "No. Post Office Hub is built with your privacy as a top priority. We do not collect any personal identifiable information (PII) such as your email, name, phone number, or passwords. It is purely an informational and educational platform. For more details, please review our Privacy Policy.",
    category: "Privacy",
  },
  {
    id: "7",
    question: "How accurate is the information provided on this website?",
    answer:
      "We strive to provide the most accurate and up-to-date information by regularly cross-referencing official India Post circulars, notifications, and government publications. However, for any official transactions, specific inquiries about your accounts, or critical decisions, always refer to the official India Post website (www.indiapost.gov.in) or visit your nearest Post Office directly.",
    category: "General",
  },
  {
    id: "8",
    question:
      "Can I apply for Post Office schemes directly through Post Office Hub?",
    answer:
      "No, Post Office Hub is an informational and educational platform only. We do not facilitate direct applications, investments, or transactions for any Post Office schemes or services. All official procedures must be completed through designated Post Office branches or the official India Post online portals.",
    category: "General",
  },
  {
    id: "9",
    question: "What is the Sukanya Samriddhi Account (SSA)?",
    answer:
      "The Sukanya Samriddhi Account (SSA) is a small savings scheme of the Government of India aimed at promoting the welfare of girl children. It encourages parents to build a fund for their daughter's education and marriage. Our SSA calculator can help you estimate returns.",
    category: "Schemes & Rates",
  },
  {
    id: "10",
    question: "How do I contact India Post for official queries?",
    answer:
      "For official inquiries, grievance redressal, or specific questions about your accounts, you should always contact India Post directly through their official website (www.indiapost.gov.in), their customer service helplines, or by visiting your nearest Post Office.",
    category: "General",
  },
  {
    id: "11",
    question: "What is the My Investment section on Post Office Hub?",
    answer:
      "The My Investment section on Post Office Hub helps you track and understand your investments in various Post Office schemes like RD, TD, PPF, SCSS, and MIS. It provides clear guidance on calculating maturity, tracking deposits, and planning your financial goals with updated interest rates and rules. Please note: Post Office Hub does not store your personal investment data; all data remains on your device for your privacy.",
    category: "General",
  },
  {
    id: "12",
    question: "What Post Office schemes can I track using My Investment?",
    answer:
      "You can track and learn about Post Office Recurring Deposit (RD), Time Deposit (TD), Monthly Income Scheme (MIS), Public Provident Fund (PPF), Senior Citizen Savings Scheme (SCSS), and KVP/NSC using the My Investment page on Post Office Hub.",
    category: "Schemes",
  },
  {
    id: "13",
    question: "Does Post Office Hub store my investment data?",
    answer:
      "No, Post Office Hub prioritizes your privacy. We do not store your personal investment data on our servers. Any data you enter stays on your device or browser for calculation purposes only, ensuring your investment information remains private and secure.",
    category: "Privacy",
  },
  {
    id: "14",
    question: "Where is the investment data stored when I use calculators?",
    answer:
      "When you use Post Office Hub’s calculators to plan your investments, the data is processed locally on your device or stored in your browser’s local storage if you choose to save your progress. We do not upload, track, or store your data on any server.",
    category: "Privacy",
  },
  {
    id: "15",
    question: "Can I get reminders for my Post Office scheme maturity dates?",
    answer:
      "Currently, Post Office Hub does not send automated reminders. We recommend manually noting your maturity dates. In the future, we plan to add an offline reminder feature that works in your browser without compromising your privacy.",
    category: "Schemes",
  },
];

const categories = ["All", ...new Set(faqData.map((faq) => faq.category))];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openQuestion, setOpenQuestion] = useState(null); // State to manage which accordion item is open

  const filteredFaqs = useMemo(() => {
    let filtered = faqData;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowerCaseSearchTerm) ||
          faq.answer.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return filtered;
  }, [searchTerm, selectedCategory]);

  // JSON-LD Structured Data for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-xl shadow-xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Your quick guide to common queries about Post Office Hub and India
          Post services.
        </p>
      </div>

      <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10 lg:p-12">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    selectedCategory === category
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-red-600"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <section className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() =>
                    setOpenQuestion(openQuestion === faq.id ? null : faq.id)
                  }
                  aria-expanded={openQuestion === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  {faq.question}
                  {openQuestion === faq.id ? (
                    <ChevronUp
                      size={20}
                      className="text-red-600 flex-shrink-0 ml-2"
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-gray-500 flex-shrink-0 ml-2"
                    />
                  )}
                </button>
                {openQuestion === faq.id && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 pb-5 pt-2 text-gray-700 leading-relaxed border-t border-gray-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-600">
              <Info size={30} className="mx-auto mb-4 text-gray-400" />
              <p>No FAQs found matching your criteria.</p>
            </div>
          )}
        </section>

        {/* Disclaimer/Contact Section */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200 text-blue-800 text-sm">
          <p className="font-semibold mb-2">Still have questions?</p>
          <p>
            If you couldn&apos;t find the answer you were looking for, please
            feel free to
            <Link
              href="/contact-us"
              className="text-blue-700 underline hover:no-underline font-medium"
            >
              contact us
            </Link>
            or refer to the official India Post website for specific queries.
          </p>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
