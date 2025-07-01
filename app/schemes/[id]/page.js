import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  CheckCircle,
  Info,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { schemes } from "@/data/schemes";

export async function generateStaticParams() {
  return schemes.map((scheme) => ({ id: scheme.id }));
}
export async function generateMetadata({ params }) {
  const scheme = schemes.find((s) => s.id === params.id);

  if (!scheme) {
    return {
      title: "Post Office Scheme - Details | Post Office Hub",
      description:
        "Explore detailed guides, interest rates, eligibility, and benefits of various Post Office saving schemes on Post Office Hub.",
    };
  }

  const title = `${scheme.shortName} Scheme - Interest Rates, Eligibility & Benefits | Post Office Hub`;
  const description = `Learn all about the ${scheme.shortName} scheme, including interest rates (${scheme.interestRate}), eligibility, tenure (${scheme.tenure}), and benefits. Plan your investments smartly with Post Office Hub.`;
  const url = `https://postofficehub.in/schemes/${scheme.id}`;
  const ogImage = `https://postofficehub.in/og-schemes/${scheme.id}.png`; // place images accordingly

  return {
    title,
    description,
    keywords: `${scheme.shortName} Scheme, Post Office ${scheme.shortName}, India Post ${scheme.shortName} Scheme, Interest Rate, Post Office Hub`,
    openGraph: {
      title,
      description,
      url,
      siteName: "Post Office Hub",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${scheme.shortName} Scheme Guide`,
        },
      ],
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@PostOfficeHub",
    },
  };
}
export default function SchemeDetail({ params }) {
  const scheme = schemes.find((s) => s.id === params.id);

  if (!scheme) return notFound();

  const schemeToBlogMap = {
    rd: "rd-scheme",
    td: "td-guide",
    ssa: "ssa-guide",
    nsc: "nsc-guide",
    mis: "mis-guide",
    scss: "scss-guide",
    ppf: "ppf-guide",
    kvp: "kvp-guide",
  };

  const blogPostId = schemeToBlogMap[scheme.id];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/schemes"
            className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to All Schemes</span>
          </Link>
        </div>
      </div>

      {/* Header Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6">
            <div className="text-6xl">{scheme.icon}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{scheme.shortName}</h1>
              <p className="text-xl text-red-100 mb-4">{scheme.title}</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} />
                  <span>Interest Rate: {scheme.interestRate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⏱️</span>
                  <span>Tenure: {scheme.tenure}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💰</span>
                  <span>Min: {scheme.minAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More CTA */}
      {blogPostId && (
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-6 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between flex-col text-left sm:text-left gap-3 md:flex-row bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4 flex-col md:flex-row">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Learn in Detail About {scheme.shortName}
                  </h3>
                  <p className="text-gray-600">
                    Get comprehensive insights, tips, and strategies for
                    maximizing your {scheme.shortName} investment
                  </p>
                </div>
              </div>
              <Link
                href={`/blog/${blogPostId}`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
              >
                Read Complete Guide
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Info className="text-blue-600" size={24} />
                  <span>Overview</span>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {scheme.detailedDescription}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Minimum Amount</span>
                      <span className="font-semibold text-gray-800">
                        {scheme.minAmount}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Maximum Amount</span>
                      <span className="font-semibold text-gray-800">
                        {scheme.maxAmount}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Tenure</span>
                      <span className="font-semibold text-gray-800">
                        {scheme.tenure}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-semibold text-green-600">
                        {scheme.interestRate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Eligibility Criteria
                </h2>
                <ul className="space-y-3">
                  {scheme.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle
                        className="text-green-500 mt-0.5 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-gray-700">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle
                        className="text-blue-500 mt-0.5 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tax Info */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <span>🏛️</span>
                  <span>Tax Information</span>
                </h2>
                <p className="text-gray-700">{scheme.taxBenefits}</p>
              </div>
            </div>

            {/* Right - Calculator Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Calculator className="text-red-600" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Quick Calculator
                    </h3>
                  </div>
                  <div className="text-center mb-6">
                    <Link
                      href={`/calculators?scheme=${scheme.id}`}
                      className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium inline-block"
                    >
                      Calculate Returns
                    </Link>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Quick Facts
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Fixed interest rate of {scheme.interestRate}</li>
                        <li>
                          •{" "}
                          {scheme.calculationType === "compound"
                            ? "Compound"
                            : scheme.calculationType === "simple"
                            ? "Simple"
                            : "Monthly compound"}{" "}
                          interest
                        </li>
                        <li>• Tenure: {scheme.tenure}</li>
                        <li>• Government guaranteed returns</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        💡 Pro Tip
                      </h4>
                      <p className="text-blue-700 text-sm">
                        Use our calculator to compare different investment
                        amounts and see how your money grows over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
