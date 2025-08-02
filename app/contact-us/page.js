import Link from "next/link";
import { Mail, Info, HelpCircle, AlertCircle, FileText } from "lucide-react"; // Changed 'Form' to 'FileText'

// Optional: Metadata for SEO. This goes outside the component for App Router.
export const metadata = {
  title: "Contact Post Office Hub - Send Your Queries & Feedback",
  description:
    "Contact Post Office Hub for queries related to India Post schemes, GDS corner, tracking support, insurance guides, calculators, and feedback. We are here to help you with clear guidance and resources.",
  keywords:
    "Contact Post Office Hub, India Post Support, GDS Help, Post Office Queries, RD TD SSA PLI RPLI Help, Post Office Hub Contact",
  openGraph: {
    title: "Contact Post Office Hub - Get in Touch",
    description:
      "Send us your questions or feedback regarding India Post schemes, GDS corner, insurance, tracking, and calculators on Post Office Hub.",
    url: "https://postofficehub.in/contact-us",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/og-contact.png", // Replace with your uploaded OG image
        width: 1200,
        height: 630,
        alt: "Contact Post Office Hub",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Post Office Hub - Queries & Support",
    description:
      "Reach out to Post Office Hub for support related to India Post services, GDS help, tracking, calculators, and scheme-related queries.",
    images: ["https://postofficehub.in/og-contact.png"],
    creator: "@PostOfficeHub",
  },
  alternates: {
    canonical: "https://postofficehub.in/contact-us/",
  },
};

export default function ContactUsPage() {
  return (
    // Main container with Post Office theme background and responsive padding
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-xl shadow-xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-poppins">
          Contact Post Office Hub
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 font-inter">
          Your feedback helps us improve our educational content.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-orange-200 p-8 md:p-10 lg:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2 font-poppins">
          How to Connect with Us
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 font-inter">
          At Post Office Hub, we are dedicated to providing accurate and helpful
          information. <strong>If you encounter any issues</strong> or have
          feedback, please reach out to us. Since this is an{" "}
          <strong className="text-red-600">
            informational and educational app that does not collect any personal
            user data directly
          </strong>
          , we utilize an external service (Google Forms) for structured
          feedback collection.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 font-inter">
          Your input is invaluable for enhancing the app&apos;s content and user
          experience!
        </p>

        {/* Contact options grid - responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Google Form Card */}
          <div className="bg-orange-50 p-6 rounded-lg shadow-sm border border-orange-200">
            <FileText className="w-10 h-10 text-orange-600 mb-3" />{" "}
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-poppins">
              Submit Feedback via Form
            </h3>
            <p className="text-gray-600 text-sm mb-4 font-inter">
              Use the embedded form below to provide specific feedback, content
              suggestions, or report an issue. This helps us categorize and
              address your input efficiently.
            </p>
            {/* Increased paddingTop to 200% for a taller aspect ratio, making it more visible */}
            <div className="w-full relative" style={{ paddingTop: "200%" }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScOndnLd6UEpBta149OZA3sY8YYUOEb1nTuYPVMmfHCToSH3A/viewform?embedded=true" // REPLACE THIS WITH YOUR ACTUAL GOOGLE FORM EMBED LINK
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                title="Post Office Hub Feedback Form"
              >
                Loading...
              </iframe>
            </div>
            <p className="mt-3 text-sm text-gray-700 font-inter">
              *Please note: This form is hosted externally by Google. Your
              submission will be processed according to{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:underline"
              >
                Google&apos;s Privacy Policy
              </a>
              .*
            </p>
            <p className="mt-2 text-xs text-gray-500 font-inter">
              *The appearance and scrolling behavior within the embedded form
              are controlled by Google Forms itself and cannot be directly
              styled by this application.*
            </p>
          </div>

          {/* Email Contact Cards - flex column for stacking */}
          <div className="flex flex-col gap-8">
            {/* General Feedback Email Card */}
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <HelpCircle className="w-10 h-10 text-red-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-poppins">
                General Feedback by Email
              </h3>
              <p className="text-gray-600 text-sm font-inter">
                For general thoughts or app feature suggestions that don&apos;t
                require the form structure, you can email us directly at:
              </p>
              <p className="mt-3 font-semibold text-red-600 font-inter">
                <Mail className="inline-block mr-2" size={20} />{" "}
                postofficehub0@gmail.com
              </p>
            </div>
            {/* Content Errors Email Card */}
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <AlertCircle className="w-10 h-10 text-red-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-poppins">
                Report Content Errors by Email
              </h3>
              <p className="text-gray-600 text-sm font-inter">
                To report inaccuracies or outdated information in our articles
                or guides, please help us by sending details to:
              </p>
              <p className="mt-3 font-semibold text-red-600 font-inter">
                <Mail className="inline-block mr-2" size={20} />{" "}
                postofficehub0@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Important Official Channels Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2 font-poppins">
          Important: India Post Official Channels
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 font-inter">
          <strong className="text-red-600">
            Post Office Hub is an independent educational initiative and is not
            the official website of India Post.
          </strong>{" "}
          For any inquiries related to your specific postal transactions,
          account details, grievances, or official services, please always use
          the official channels provided by India Post.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://www.indiapost.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg transform hover:scale-105 font-poppins text-center flex-1"
          >
            Visit India Post Official Website
          </a>
          <a
            href="https://pgportal.gov.in/" // India Post Grievance Portal (CPGRAMS)
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors duration-300 shadow-lg transform hover:scale-105 font-poppins text-center flex-1"
          >
            Lodge Grievance (CPGRAMS)
          </a>
        </div>

        {/* Back to Homepage Button */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg transform hover:scale-105 font-poppins"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
