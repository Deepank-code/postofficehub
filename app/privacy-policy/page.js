"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Globe, Bell, Clock } from "lucide-react"; // Icons for Privacy Policy
export const metadata = {
  title: "Privacy Policy | Post Office Hub",
  description:
    "Read the Privacy Policy of Post Office Hub to understand how we collect, use, and protect your personal data while you use our Post Office schemes, calculators, and guides.",
  keywords:
    "Post Office Hub Privacy Policy, Data Privacy, User Data Protection, India Post, Financial Awareness, Post Office Schemes",
  openGraph: {
    title: "Privacy Policy | Post Office Hub",
    description:
      "Learn how Post Office Hub handles your data securely while providing financial awareness, post office calculators, and scheme guides.",
    url: "https://postofficehub.in/privacy-policy",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/og-privacy-policy.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Post Office Hub",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Post Office Hub",
    description:
      "Understand how your data is collected, used, and protected by Post Office Hub while accessing calculators and post office schemes.",
    images: ["https://postofficehub.in/og-privacy-policy.png"], // same image
    creator: "@PostOfficeHub",
  },
};
const PrivacyPolicyPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-16 text-center shadow-md">
        <Shield className="w-20 h-20 mx-auto mb-4 text-blue-200" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Privacy Policy
        </h1>
        <p className="text-lg opacity-90 max-w-3xl mx-auto">
          Your privacy is critically important to us. This policy outlines how
          we collect, use, and protect your information.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-12 max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl mt-[-40px] relative z-10">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText size={24} className="text-blue-500" /> Introduction
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to Post Office Hub. We are committed to protecting the
            privacy of our users. This Privacy Policy explains what information
            we collect, why we collect it, how we use it, and your choices
            regarding your information.
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            By using our services, you agree to the collection and use of
            information in accordance with this policy. If you do not agree with
            the terms of this policy, please do not use our services.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Globe size={24} className="text-green-500" /> Information We
            Collect
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We collect various types of information for different purposes to
            provide and improve our services to you.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">
            Non-Personal Information:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            When you access our website or use our app, we may automatically
            collect certain non-personal information such as your browser type,
            operating system, IP address, referring URLs, and pages viewed. This
            data is aggregated and used for analytical purposes to understand
            user behavior and improve our service. This information does not
            identify you personally.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">
            Personal Information:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            **We do not directly collect any personally identifiable information
            (PII) from you through our app or website.** Our app, Post Office
            Hub, is designed to be an informational and educational resource.
            Any data you input into calculators or tools within the app is
            processed locally on your device and is not transmitted to our
            servers or stored by us.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">
            Information from Third-Party Services:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our website and app may integrate with third-party services, such as
            Google Analytics for website traffic analysis. These third-party
            services may collect information about your use of our services in
            accordance with their own privacy policies. We may also integrate
            other third-party services for advertising or other functionalities
            in the future.
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>
              **Google Analytics:** We use Google Analytics to understand how
              our services are used. Google&apos;s ability to use and share
              information collected by Google Analytics about your visits is
              restricted by the Google Analytics Terms of Service and the Google
              Privacy Policy.
            </li>
            {/* AdSense specific details removed for now */}
          </ul>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Shield size={24} className="text-purple-500" /> How We Use
            Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The non-personal information collected is used for the following
            purposes:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>To provide, operate, and maintain our services.</li>
            <li>To improve, personalize, and expand our services.</li>
            <li>To understand and analyze how you use our services.</li>
            <li>
              To develop new products, services, features, and functionality.
            </li>
            <li>For analytics and usage trends.</li>
            {/* AdSense specific use removed for now */}
          </ul>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Clock size={24} className="text-orange-500" /> Data Retention
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Since we do not directly collect or store any personal data, there
            is no personal data retention period by us. Non-personal data
            collected by third-party services is subject to their respective
            retention policies.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Bell size={24} className="text-red-500" /> Your Data Protection
            Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Although we do not collect personal data, you may have rights under
            data protection laws concerning data collected by third-party
            services:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>The right to access</strong> – You have the right to
              request copies of your personal data from third-party services.
            </li>
            <li>
              <strong>The right to rectification</strong> – You have the right
              to request that third-party services correct any information you
              believe is inaccurate.
            </li>
            <li>
              <strong>The right to erasure</strong> – You have the right to
              request that third-party services erase your personal data, under
              certain conditions.
            </li>
            <li>
              <strong>The right to restrict processing</strong> – You have the
              right to request that third-party services restrict the processing
              of your personal data, under certain conditions.
            </li>
            <li>
              <strong>The right to object to processing</strong> – You have the
              right to object to third-party services processing of your
              personal data, under certain conditions.
            </li>
            <li>
              <strong>The right to data portability</strong> – You have the
              right to request that third-party services transfer the data that
              we have collected to another organization, or directly to you,
              under certain conditions.
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            If you make a request, third-party services have one month to
            respond to you. If you would like to exercise any of these rights,
            please contact the respective third-party service directly.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText size={24} className="text-cyan-500" /> Changes to This
            Privacy Policy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText size={24} className="text-indigo-500" /> Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>
              By email:{" "}
              <a
                href="mailto:privacy@postofficehub.com"
                className="text-blue-500 hover:underline"
              >
                privacy@postofficehub.com
              </a>{" "}
              (Conceptual Email)
            </li>
            <li>
              By visiting this page on our website:{" "}
              <a href="/contact" className="text-blue-500 hover:underline">
                /contact
              </a>
            </li>
          </ul>
        </motion.section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-6 mt-12 text-center text-gray-600 dark:text-gray-400">
        <div className="container mx-auto px-4">
          &copy; {new Date().getFullYear()} Post Office Hub. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
