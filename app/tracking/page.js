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
              src={"/post-parcell.webp"}
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
          How to Track Your Parcel Online with India Post
        </h2>
        <p className="text-gray-700 font-inter">
          Tracking your parcel online helps you know exactly where your parcel,
          registered letter, or money order is without going to the post office
          again and again. You can see when it will arrive, where it is
          currently, and avoid the stress of waiting blindly.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          What Types of Articles Can You Track?
        </h3>
        <p className="text-gray-700 font-inter">
          India Post allows you to track a wide range of services:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-inter space-y-1">
          <li> Speed Post consignments (fast delivery parcels and letters)</li>
          <li> Registered Letters & Articles</li>
          <li> Parcels (Domestic and International)</li>
          <li> Money Orders and Insurance Articles</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          Understanding Tracking Numbers: EV, CV, RV, etc.
        </h3>
        <p className="text-gray-700 font-inter">
          Every India Post article has a unique 13-digit tracking number:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-inter space-y-1">
          <li>
            <strong>EVXXXXXXXXXIN</strong> - Speed Post articles (fast delivery)
          </li>
          <li>
            <strong>CVXXXXXXXXXIN</strong> - Registered Parcels (secure parcels)
          </li>
          <li>
            <strong>RVXXXXXXXXXIN</strong> - Registered Letters (documents and
            letters)
          </li>
          <li>
            Other prefixes like <strong>EM</strong>, <strong>CP</strong>, and{" "}
            <strong>RA</strong> may also appear on your tracking number:
            <ul className="list-disc list-inside ml-5 mt-1 text-gray-700">
              <li>
                <strong>EM</strong>: Used for Express Mail and Speed Post
                articles in some cases.
              </li>
              <li>
                <strong>CP</strong>: Stands for Customs Parcel or Commercial
                Parcel usually used for international parcels.
              </li>
              <li>
                <strong>RA</strong>: Registered Articles, similar to RV, often
                used for registered letters or documents.
              </li>
            </ul>
            These prefixes help India Post identify the type of service used for
            your shipment and determine its delivery speed and handling.
          </li>
        </ul>
        <p className="text-gray-700 font-inter">
          This helps you easily identify if your article is Speed Post,
          Registered Post, or Parcel.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          Step-by-Step: How to Track Your Parcel
        </h3>
        <ol className="list-decimal list-inside text-gray-700 font-inter space-y-1">
          <li>
            Find your 13-digit tracking number on your receipt (e.g.,
            EV123456789IN).
          </li>
          <li>Click the “Track Your Parcel Now” button on this page.</li>
          <li>
            Enter your tracking number in the box provided on the tracking page.
          </li>
          <li>
            Press submit to view the current status and location of your
            article.
          </li>
          <li>Note the expected delivery date and any updates shown.</li>
        </ol>

        <div className="my-4 w-full">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-lg shadow border overflow-hidden">
            <Image
              src="/Ev.webp"
              alt="Screenshot of India Post tracking page showing where to enter your consignment number"
              fill
              quality={50}
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Example: Enter your 13-digit tracking number in the box shown above
            to track your parcel easily.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          Common Tracking Statuses You May See
        </h3>
        <ul className="list-disc list-inside text-gray-700 font-inter space-y-1">
          <li>🛫 Dispatched from Sorting Facility</li>
          <li>🏢 Arrived at Delivery Post Office</li>
          <li>📬 Out for Delivery</li>
          <li>✅ Delivered Successfully</li>
          <li>⚠️ Attempted Delivery – Contact Post Office</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          Tips for Smooth Parcel Tracking
        </h3>
        <ul className="list-disc list-inside text-gray-700 font-inter space-y-1">
          <li>Double-check your tracking number before entering.</li>
          <li>
            Tracking updates may take 24–48 hours after booking to appear.
          </li>
          <li>
            For international parcels, tracking updates may be delayed due to
            customs.
          </li>
          <li>
            Keep your tracking receipt until your parcel is delivered for your
            records.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 font-poppins">
          Need Help with Tracking?
        </h3>
        <p className="text-gray-700 font-inter">
          If your parcel is delayed or the status is unclear, visit your nearest
          post office with your tracking number or call India Post customer care
          for assistance. Tracking online saves you time and keeps you updated
          without unnecessary visits to the post office.
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
              Track your parcel’s movement through India Post&apos;s network
              easily.
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
