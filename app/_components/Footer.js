"use client";

import Link from "next/link";
import { Instagram, Linkedin, Github } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        {/* <div>
          <h4 className="text-xl font-semibold text-blue-700">
            Post Office Hub
          </h4>
          <p className="mt-3 text-sm text-gray-600">
            Helping India's Postal Family with calculators, schemes, and
            investment tools.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-gray-500 hover:text-pink-500 transition" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-gray-500 hover:text-blue-600 transition" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-gray-500 hover:text-gray-800 transition" />
            </a>
          </div>
        </div> */}
        <Link href="/" className="flex space-x-3 group items-start">
          <div className="w-12 h-12 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo.png"
              width={300}
              height={300}
              alt="Post Office Hub Logo"
              className="w-full h-full object-contain bg-white rounded-full"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800 font-poppins">
              <span className="text-red-600"> Post Office </span>Hub
            </h1>
            <p className="text-gray-600 text-xs font-inter">
              भारतीय डाक | Your Digital Gateway
            </p>
          </div>
        </Link>
        {/* Quick Links */}
        <div>
          <h5 className="font-semibold mb-3 text-gray-800">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/gds-corner"
                className="hover:text-blue-600 transition"
              >
                GDS Corner
              </Link>
            </li>
            <li>
              <Link
                href="/my-investments"
                className="hover:text-blue-600 transition"
              >
                My Investments
              </Link>
            </li>
            <li>
              <Link
                href="/interest-rates"
                className="hover:text-blue-600 transition"
              >
                Interest Rate
              </Link>
            </li>
            <li>
              <Link href="/schemes" className="hover:text-blue-600 transition">
                Schemes
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-blue-600 transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h5 className="font-semibold mb-3 text-gray-800">Legal</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-blue-600 transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact CTA */}
        <div>
          <h5 className="font-semibold mb-3 text-gray-800">Contact</h5>
          <p className="text-sm text-gray-600 mb-4">
            Have questions or feedback? Reach out anytime to help us serve you
            better.
          </p>
          <Link
            href="/contact-us"
            className="  bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-200 shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} Post Office Hub. All rights
          reserved.Educational content only. Not affiliated with India Post.
        </p>
      </div>
    </footer>
  );
}
