"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  Globe,
  Bell,
  Clock,
  AlertCircle,
} from "lucide-react";

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
      {/* Header */}
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

      <main className="container mx-auto px-4 py-12 max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl mt-[-40px] relative z-10">
        {/* Introduction */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-3">
            <FileText size={24} className="text-blue-500" /> Introduction
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to Post Office Hub. We are committed to protecting your
            privacy. This Privacy Policy explains what we collect, why we
            collect it, how we use it, and your choices regarding your data.
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            By using our services, you agree to the collection and use of
            information in accordance with this policy. If you do not agree,
            please do not use our services.
          </p>
        </motion.section>

        {/* Information We Collect */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-3">
            <Globe size={24} className="text-green-500" /> Information We
            Collect
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We collect non-personal information to improve our services.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">
            Non-Personal Information:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may automatically collect your browser type, OS, IP address, and
            pages viewed for analytics. This data is aggregated and does not
            identify you personally.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">
            Personal Information:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We do not collect any personally identifiable information (PII)
            directly. Our RD/TD Maturity Reminder Tool and similar tools operate
            entirely within your device.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-100 p-4 rounded-lg mt-3 flex items-start gap-3">
            <AlertCircle className="text-yellow-500 mt-1" size={20} />
            <p className="text-sm leading-relaxed">
              <strong>Important:</strong> All your saved reminders and schemes
              are stored locally in your device&apos;s browser (LocalStorage or
              IndexedDB) and are not transmitted to or stored on our servers. If
              you clear your browser cache, uninstall our PWA app, or switch
              devices, your saved reminders will be lost. We recommend backing
              up important maturity dates separately to avoid data loss.
            </p>
          </div>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">
            Information from Third-Party Services:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may use Google Analytics and similar services for traffic
            analysis, which collect usage data under their privacy policies.
          </p>
        </motion.section>

        {/* How We Use Information */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-3">
            <Shield size={24} className="text-purple-500" /> How We Use
            Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use non-personal information for:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>Improving our services.</li>
            <li>Understanding user behavior to enhance experience.</li>
            <li>Maintaining and operating our services.</li>
            <li>Usage analytics.</li>
          </ul>
        </motion.section>

        {/* Data Retention */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-3">
            <Clock size={24} className="text-orange-500" /> Data Retention
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Since we do not collect personal data, we do not store or retain any
            personal data on our servers. Your investment reminders and scheme
            details are stored only on your device. Deleting your browser cache
            or uninstalling our PWA will permanently remove your saved
            reminders.
          </p>
        </motion.section>

        {/* Data Protection Rights */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-3">
            <Bell size={24} className="text-red-500" /> Your Data Protection
            Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            While we do not store personal data, you have rights under privacy
            laws regarding data collected by third-party services like Google
            Analytics.
          </p>
        </motion.section>

        {/* Changes to Privacy Policy */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-3">
            <FileText size={24} className="text-cyan-500" /> Changes to This
            Privacy Policy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update this Privacy Policy periodically. Updates will be
            posted on this page.
          </p>
        </motion.section>

        {/* Contact Us */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="p-6"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-3">
            <FileText size={24} className="text-indigo-500" /> Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have questions about this Privacy Policy, contact us:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 dark:text-gray-300">
            <li>
              By email:{" "}
              <a
                href="mailto:postofficehub0@gmail.com"
                className="text-blue-500 hover:underline"
              >
                postofficehub0@gmail.com
              </a>
            </li>
            <li>
              By visiting:{" "}
              <a href="/contact-us" className="text-blue-500 hover:underline">
                /contact
              </a>
            </li>
          </ul>
        </motion.section>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
