import Image from "next/image";
import {
  Calculator,
  Shield,
  FileText,
  PiggyBank,
  ChartBar,
  UserCheck,
  BookOpen,
  Package,
} from "lucide-react";
import Link from "next/link";
const date = new Date();
const features = [
  {
    icon: "/post-sche.png",
    title: "Government Schemes",
    description:
      "Explore comprehensive Post Office savings and investment schemes with detailed eligibility criteria and benefits",
    link: "/schemes",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-100",
  },
  {
    icon: "/post-cal.png",
    title: "Financial Calculators",
    description:
      "Advanced calculators to compute returns, maturity amounts, and create personalized investment strategies",
    link: "/calculator",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100",
  },
  {
    icon: "/post-inste.png",
    title: "Interest Rates",
    description:
      "Updated interest rates for all Post Office schemes with historical data and trend analysis",
    link: "/interest-rates",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-100",
  },
  {
    icon: "/post-parcell.png",
    title: "Parcel & Consignment Tracking",
    description:
      "Track your parcels, registered articles, and speed post consignments in real-time with detailed status updates",
    link: "/tracking",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
  },
  {
    icon: "/post-insu.png",
    title: "Insurance (PLI/RPLI)",
    description:
      "Comprehensive life insurance coverage with government backing and competitive premium rates",
    link: "/insurance",
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-gradient-to-br from-rose-50 to-pink-100",
  },

  {
    icon: "/post-gdss.png",
    title: "GDS Corner",
    description:
      "Specialized resources, tools, and support materials for Gramin Dak Sevaks professionals",
    link: "/gds-corner",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
  },
];
export const metadata = {
  title: "Post Office Hub - India Post Schemes, Calculators & GDS Corner",
  description:
    "Track India Post schemes, use RD, TD, NSC, SSA, and KVP calculators, get interest rate updates, and read financial guides. One-stop Post Office Hub for GDS and citizens.",
  keywords:
    "Post Office RD Calculator, TD Calculator, Post Office Interest Rates, PLI, RPLI, India Post Schemes, GDS Corner, Financial Awareness, Post Office Tracking, Post Office Insurance",
  openGraph: {
    title: "Post Office Hub - India Post Schemes & Financial Tools",
    description:
      "Explore India Post schemes, use financial calculators, and read practical guides for PLI, RPLI, and post office services in one hub.",
    url: "https://postofficehub.in",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Post Office Hub Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Office Hub - India Post Schemes & Financial Tools",
    description:
      "Your one-stop Post Office Hub for RD, TD, NSC, PLI, RPLI calculators, interest rate updates, and financial awareness for citizens and GDS employees.",
    images: ["https://postofficehub.in/og-banner.png"],
    creator: "@PostOfficeHub",
  },
  metadataBase: new URL("https://postofficehub.in"),
  alternates: {
    canonical: "https://www.postofficehub.in",
  },
};

export default function Home() {
  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-yellow-300 opacity-20 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-15 rounded-full blur-md"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-pink-300 opacity-15 rounded-full blur-lg"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Logo in Hero Section */}

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-poppins">
            Your Complete Guide to <br />
            <span className="text-yellow-300 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text ">
              Post Office Services
            </span>
          </h1>
          <p className="text-xl mb-8 text-red-100 max-w-4xl mx-auto leading-relaxed font-inter">
            Discover government-backed savings schemes, calculate investment
            returns, track parcels and articles, access comprehensive insurance
            plans, and find specialized resources for postal employees.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/schemes"
              className="bg-white text-red-700 px-8 py-4 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-lg font-inter"
            >
              Explore Schemes
            </Link>
            <Link
              href="/tracking"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-700 transition-all duration-300 transform hover:scale-105 font-inter"
            >
              Track Parcels
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-poppins">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              From savings schemes to parcel tracking, get comprehensive
              information about all Post Office services in one centralized
              platform.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 relative">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                // The main card container
                className={`group relative overflow-hidden ${feature.bgColor} p-6 rounded-3xl border border-gray-200 shadow-md transition-all duration-300
                      hover:shadow-2xl hover:-translate-y-2 hover:border-transparent`}
              >
                <div
                  className={`absolute -top-10 -left-10 w-48 h-48 rounded-full bg-gradient-to-br ${feature.accentGradient} opacity-10 blur-3xl
                       group-hover:opacity-20 group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-700
                       pointer-events-none`}
                ></div>

                <div
                  className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${feature.accentGradient} opacity-10 blur-3xl
                       group-hover:opacity-20 group-hover:scale-110 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-700
                       pointer-events-none`}
                ></div>

                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  {/* Icon Glass Card */}
                  <div
                    className={`bg-white/70 backdrop-blur-lg rounded-2xl border border-white/80 shadow-lg flex items-center justify-center p-0.5
                          transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl`} // Scale and shadow on hover
                  >
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={300}
                      height={300}
                      quality={80} // Slightly higher quality for sharper images
                      priority
                      className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-gray-900 font-poppins transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base max-w-md font-inter transition-colors duration-300 group-hover:text-gray-700">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-6 font-poppins">
            Why to invest in Post office?
          </h1>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl">
              <div className="text-4xl font-bold text-red-600 mb-3 font-poppins">
                150+
              </div>
              <p className="text-gray-600 font-inter">Years of Trust</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl">
              <div className="text-4xl font-bold text-yellow-600 mb-3 font-poppins">
                1.5L+
              </div>
              <p className="text-gray-600 font-inter">Post Offices</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-3 font-poppins">
                40Cr+
              </div>
              <p className="text-gray-600 font-inter">Account Holders</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="text-4xl font-bold text-blue-600 mb-3 font-poppins">
                100%
              </div>
              <p className="text-gray-600 font-inter">Government Backed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-2">
                <Image
                  width={300}
                  height={300}
                  src="/logo.png"
                  alt="Post Office Hub Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold font-poppins">
                Post Office Hub
              </h3>
            </div>
            <p className="text-gray-400 text-lg mb-6 font-inter">
              भारतीय डाक | Your trusted partner for financial security and
              growth
            </p>
          </div>

          {/* Updated Footer Disclaimer */}
          <div className="border-t border-gray-700 pt-6 pb-10">
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center">
                <div className="text-center text-gray-300">
                  <p className="text-sm font-inter">
                    <span className="font-semibold text-blue-400">
                      Educational Website:
                    </span>{" "}
                    This is a private educational and promotional website
                    providing information about Post Office services. Not an
                    official Government of India website. Please consult your
                    nearest Post Office for official information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
