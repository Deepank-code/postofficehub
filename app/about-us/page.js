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
        url: "https://postofficehub.in/logo.png", // replace with your clean About Us OG image
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
          At **Post Office Hub**, our core mission is to empower the rural
          communities of India with essential financial knowledge and easy
          access to various government schemes. Many people believe India Post
          is solely for mail posting and delivery; however, it is a **reliable
          and government-backed investment partner** offering schemes with
          interest rates that are often **even higher than most well-known
          banks**. We aim to be the **definitive educational resource**,
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
            <p className="text-gray-700 leading-relaxed">
              For technical inquiries or collaboration opportunities, you can
              reach out via:
            </p>
            <p className="mt-3 font-semibold text-blue-600 flex items-center">
              <Mail className="inline-block mr-2" size={20} />{" "}
              developers@postofficehub.com (Conceptual Email)
            </p>
          </div>
        </div>

        {/* Developer Profile Card */}
        <div className="relative w-full max-w-2xl mx-auto group transition-transform duration-300 hover:scale-[1.015] mb-8">
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-pink-400 via-yellow-400 to-purple-500 z-0">
            <div className="w-full h-full rounded-[inherit] bg-white" />{" "}
            {/* Removed dark mode for background */}
          </div>

          {/* Animated Gradient Glow */}
          <div
            className="
            absolute inset-0 rounded-2xl 
            bg-[linear-gradient(130deg,#a077ff,#ff3ec8,#ffc107,#a077ff)]
            bg-[length:200%_200%] animate-glow
            blur-2xl opacity-40 z-[-1]
            transition-opacity duration-300
            group-hover:opacity-70
            "
          />

          {/* <div className="relative z-10 p-6 rounded-2xl bg-white flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
           
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
              <Image
                width={120} 
                height={120}
                src="/your-profile.jpg" 
                alt="Deepank Joshi"
                className="w-full h-full object-cover"
              />
            </div>

         
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-800">
                Deepank Joshi
              </h3>
              <p className="text-pink-600 font-medium text-base mb-1">
                Full Stack Developer & Creator of Post Office Hub
              </p>
              <p className="text-gray-700 text-sm mb-2">
                Post Office Hub is developed with passion to make complex
                government information accessible to everyone. My goal is to
                build reliable, user-friendly tools that empower the community.
              </p>
              <p className="text-gray-700 text-sm">
                For technical inquiries or collaboration, contact:
              </p>

              <p className="mt-3 font-semibold text-blue-600 flex items-center justify-center sm:justify-start">
                <Mail className="inline-block mr-2" size={20} />
                developers@postofficehub.com
              </p>

          
              <div className="flex justify-center sm:justify-start space-x-4 mt-4 text-gray-600">
                <a
                  href="https://github.com/your-github" // Replace with your GitHub URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-github"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.5 0 4.1-1.6 4.1-3.6 0-1.2-.5-2.2-1.2-3 0 0-1-2.2-1.6-3.2 0 0-1.4 0-2.3.6 0 0-1.4-.4-2.8-.4-1.4 0-2.8.4-2.8.4-.6 1-1.6 3.2-1.6 3.2-.7.8-1.2 1.8-1.2 3 0 2 0 3.6 4.1 3.6a4.8 4.8 0 0 0-1 3.2v4"></path>
                    <path d="M9 18c-3.1 0-5-2.5-5-5s1.9-5 5-5"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/your-linkedin" // Replace with your LinkedIn URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/your-twitter" // Replace with your Twitter URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-500 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-19 11.6 0 0 9.9 1.5 14.5-5.3C19.9 6.2 22 4 22 4z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div> */}
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
