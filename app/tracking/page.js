"use client";

import { Bus, MapPin, Clock, Bell } from "lucide-react";
import Image from "next/image";

const Tracking = () => {
  const handleRedirect = () => {
    window.open(
      "https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-4 py-16">
      {/* Hero Section */}
      <section className="w-full max-w-2xl bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-2xl p-8 shadow-xl mb-12">
        <div className="flex justify-center mb-4">
          <div>
            <Image
              src={"/post-parcell.png"}
              alt={"parcel"}
              width={300}
              height={300}
              quality={80} // Slightly higher quality for sharper images
              priority
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain"
            />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-poppins">
          India Post Tracking Guide
        </h1>
        <p className="text-pink-100 mb-4 font-inter">
          Track your Speed Post, Registered Articles, and Parcels easily with
          our simplified guidance and direct links to the official tracking
          system.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-white text-red-600 hover:bg-pink-50 font-semibold px-6 py-3 rounded-full transition-colors duration-200 shadow-md"
        >
          Track Your Parcel Now
        </button>
      </section>

      {/* Enriched Content Section */}
      <section className="max-w-3xl w-full mb-12 text-left space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 font-poppins">
          Why Track Your Parcel Online?
        </h2>
        <p className="text-gray-700 font-inter">
          Tracking your parcel online helps you stay informed about the current
          location and status of your shipment without visiting your local post
          office. It provides peace of mind, estimated delivery dates, and
          ensures your documents, gifts, and parcels reach their destinations
          safely.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          What Can You Track with India Post?
        </h3>
        <ul className="list-disc list-inside text-gray-700 font-inter space-y-1">
          <li>📦 Speed Post consignments</li>
          <li>📑 Registered Letters & Articles</li>
          <li>🎁 Parcels (Domestic and International)</li>
          <li>📃 Money Orders and Insurance Articles</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          How to Track Your Parcel
        </h3>
        <ol className="list-decimal list-inside text-gray-700 font-inter space-y-1">
          <li>Find your 13-digit tracking number (e.g., EE123456789IN).</li>
          <li>
            Click the “Track Your Parcel Now” button above to open the official
            India Post tracking page.
          </li>
          <li>Enter your tracking number and submit to view the status.</li>
          <li>Check your parcel’s location, delivery status, and updates.</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          Common Tracking Statuses
        </h3>
        <p className="text-gray-700 font-inter">
          Here are some statuses you may see while tracking:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-inter space-y-1">
          <li>🛫 Dispatched from Sorting Facility</li>
          <li>🏢 Arrived at Delivery Post Office</li>
          <li>📬 Out for Delivery</li>
          <li>✅ Delivered Successfully</li>
          <li>⚠️ Attempted Delivery – Contact Post Office</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          Tips for Effective Tracking
        </h3>
        <ul className="list-disc list-inside text-gray-700 font-inter space-y-1">
          <li>Double-check your tracking number before submitting.</li>
          <li>Allow 24–48 hours after dispatch for tracking to get updated.</li>
          <li>
            For international parcels, tracking may be delayed due to customs.
          </li>
          <li>
            Save your tracking number until delivery is confirmed for safety.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          Need Help?
        </h3>
        <p className="text-gray-700 font-inter">
          If your parcel is delayed or shows an unclear status, visit your
          nearest post office with your tracking number or call India Post
          customer care for clarification.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl w-full mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 font-poppins text-center">
          Tracking Features at a Glance
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-red-50 rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105 border border-red-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-red-600" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-poppins">
              Real-time Location
            </h3>
            <p className="text-gray-700 text-sm font-inter">
              Track your parcel’s movement through India Post's network easily.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105 border border-red-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-red-600" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-poppins">
              Notifications
            </h3>
            <p className="text-gray-700 text-sm font-inter">
              Receive important updates and delivery status alerts directly.
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105 border border-red-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-red-600" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-poppins">
              Delivery Estimates
            </h3>
            <p className="text-gray-700 text-sm font-inter">
              Get accurate delivery timeframes to plan accordingly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tracking;
