import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Shield,
  BookOpen,
  Clock,
  User,
  Code,
  Info,
  UserCheck,
  Calculator,
  Scale,
} from "lucide-react";

export const metadata = {
  title: "About Us - Post Office Hub",
  description:
    "Learn about Post Office Hub, your trusted source for India Post scheme guides, GDS resources, calculators, and financial literacy tools to empower your postal journey.",
  keywords:
    "About Post Office Hub, India Post Guides, Post Office Hub Team, GDS Resources, Postal Financial Literacy",
  openGraph: {
    title: "About Us - Post Office Hub",
    description:
      "Get to know Post Office Hub, our mission, and how we help you navigate India Post services with ease and clarity.",
    url: "https://postofficehub.in/about-us",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/logo.png",
        width: 1200,
        height: 630,
        alt: "About Post Office Hub",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Post Office Hub",
    description:
      "Post Office Hub helps you understand and use India Post services, from RD and TD to GDS resources, with clear guides and tools.",
    images: ["https://postofficehub.in/logo.png"],
    creator: "@PostOfficeHub",
  },
  alternates: {
    canonical: "https://postofficehub.in/about-us/",
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-xl shadow-xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About Post Office Hub
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Your Trusted Digital Gateway for All Things India Post.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10 lg:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          At <strong>Post Office Hub</strong>, our core mission is to empower
          the rural communities of India with essential financial knowledge and
          easy access to various government schemes. Many people believe India
          Post is solely for mail posting and delivery; however, it is a{" "}
          <strong>reliable and government-backed investment partner</strong>{" "}
          offering schemes with interest rates that are often{" "}
          <strong>even higher than most well-known banks</strong>. We aim to be
          the <strong>definitive educational resource</strong>
          bridging the gap between official information and the common user,
          fostering financial literacy and enabling access to crucial postal
          services and investment opportunities.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
            <BookOpen className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              In-depth Scheme Guides & Financial Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Comprehensive explanations of all Post Office Savings Schemes (RD,
              FD, SCSS, NSC, KVP, PPF, Sukanya Samriddhi Yojana, etc.),
              detailing eligibility, benefits, and application processes.
              Discover why India Post offers competitive interest rates, often
              surpassing those of many popular banks, making it a reliable,
              government-backed investment choice.
            </p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
            <Mail className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Postal Services Simplified
            </h3>
            <p className="text-gray-600 text-sm">
              Clear information on mail services, parcel booking, international
              services, and other essential postal operations, ensuring everyone
              can utilize the full range of India Post&apos;s offerings.
            </p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
            <UserCheck className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              GDS Specific Resources
            </h3>
            <p className="text-gray-600 text-sm">
              A dedicated &quot;GDS Corner&quot; providing information on rules,
              promotions, allowances, and other professional resources for
              Gramin Dak Sevaks, empowering them with necessary knowledge.
            </p>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
            <Clock className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Always Up-to-Date
            </h3>
            <p className="text-gray-600 text-sm">
              We strive to provide the latest interest rates, circulars, and
              policy changes as released by India Post, ensuring you always have
              current and accurate information.
            </p>
          </div>

          {/* New: Financial Calculators */}
          <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
            <Calculator className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Smart Financial Calculators
            </h3>
            <p className="text-gray-600 text-sm">
              Utilize our intuitive calculators for various Post Office schemes
              (RD, TD, KVP, etc.) to estimate your returns, plan investments,
              and understand maturity amounts. Make informed financial decisions
              with ease.
            </p>
          </div>

          {/* New: Comparison of Interest Rates */}
          <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
            <Scale className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Competitive Interest Rate Comparisons
            </h3>
            <p className="text-gray-600 text-sm">
              Understand how Post Office savings schemes offer highly
              competitive and often superior interest rates compared to
              traditional bank deposits, backed by the Government of India for
              maximum security.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
          Our Commitment to Privacy
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Post Office Hub is built with your privacy in mind. **We do not
          collect any personal identifiable information (PII)** such as your
          email, name, phone number, or passwords. This app is purely an
          informational and educational platform. For more details, please see
          our{" "}
          <Link
            href="/privacy"
            className="text-red-600 hover:underline font-semibold"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* --- Disclaimer Section --- */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
          Important Disclaimer: Independent Educational Initiative
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200 mb-8 flex items-start gap-4">
          <Info className="w-10 h-10 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Post Office Hub is NOT affiliated with India Post.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This application is an independent educational and informational
              platform. It is designed to simplify and disseminate public
              information related to India Post services and schemes for general
              understanding.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              For any official transactions, specific inquiries about your
              accounts, or grievance redressal, please **always refer to the
              official India Post website** (
              <a
                href="https://www.indiapost.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.indiapost.gov.in
              </a>
              ) or visit your nearest Post Office.
            </p>
          </div>
        </div>
        {/* --- End Disclaimer Section --- */}

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
          Connect With Us
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          While we don&apos;t collect personal data through forms, we value your
          feedback on the app&apos;s content and functionality. If you have
          suggestions or find information that needs updating, please refer to
          our{" "}
          <Link
            href="/contact"
            className="text-red-600 hover:underline font-semibold"
          >
            Contact Us
          </Link>{" "}
          page for appropriate channels. For India Post service-related queries,
          always contact official India Post helplines or visit their official
          website.
        </p>

        {/* --- Developer Information Section --- */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
          About the Developers
        </h2>

        {/* General Project Description */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row items-start gap-4">
          <User className="w-10 h-10 text-gray-700 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Crafted with Care
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Post Office Hub is developed by a passionate individual (or small
              team) committed to making complex government information
              accessible and easy to understand for everyone. Our goal is to
              create valuable tools and resources that benefit the community.
            </p>
          </div>
        </div>

        {/* Developer Profile Card */}
        <div className="relative w-full max-w-2xl mx-auto mb-8 group">
          {/* Subtle Glow Gradient with hover brightening */}
          <div
            className="
      absolute -inset-1
      rounded-[22px]
      bg-gradient-to-br from-pink-400 via-yellow-400 to-purple-500
      blur-xl opacity-30
      group-hover:opacity-60
      transition-opacity duration-300
      z-0
      pointer-events-none
    "
          />

          {/* Gradient Border */}
          <div
            className="
    relative z-10
    bg-gradient-to-br from-pink-400 via-yellow-400 to-purple-500
    p-[2px] rounded-2xl
  "
          >
            {/* Card Content */}
            <div className="bg-white rounded-[inherit] p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-5">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Deepank Joshi
                  </h3>
                  <p className="text-pink-600 font-medium text-base mb-1">
                    Full Stack Developer & Creator of Post Office Hub
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    Post Office Hub is developed with passion to make complex
                    government information accessible to everyone. My goal is to
                    build reliable, user-friendly tools that empower the
                    community.
                  </p>
                  <p className="text-gray-700 text-sm">
                    For technical inquiries or collaboration, contact:
                  </p>
                  <p className="mt-3 font-semibold text-blue-600 flex items-center justify-center sm:justify-start">
                    <Mail className="inline-block mr-2" size={20} />
                    postofficehub0@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- End Developer Information Section --- */}

        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            Explore Post Office Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
