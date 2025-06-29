"use client";
import { useState, useEffect, useRef } from "react";
import { Book, Calculator, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [language, setLanguage] = useState("EN"); // 'EN' or 'HI'

  const path = usePathname();
  const router = useRouter();

  const switchLanguage = (lang) => {
    if (lang === "hi") {
      if (!path.startsWith("/hi")) {
        router.push(`/hi${path === "/" ? "" : path}`);
      }
    } else {
      if (path.startsWith("/hi")) {
        const newPath = path.replace("/hi", "") || "/";
        router.push(newPath);
      }
    }
  };

  const currentLang = path.startsWith("/hi") ? "hi" : "en";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/schemes"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium gap-2  ${
              path === "/scheme"
                ? "bg-red-100 text-red-700 shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
            }`}
          >
            {" "}
            <Book size={18} />
            Schemes
          </Link>
          <Link
            href="/calculator"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium gap-2 ${
              path === "/calculator"
                ? "bg-red-100 text-red-700 shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
            }`}
          >
            <Calculator size={18} />
            Calculator
          </Link>
          <Link
            href="/interest-rates"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium gap-2 ${
              path === "/interest-rates"
                ? "bg-red-100 text-red-700 shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
            }`}
          >
            {" "}
            <span className="text-lg">📈</span>
            Interest rates
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg gap-2 transition-all duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600"
            >
              🛠️ Services
            </button>

            {isOpen && (
              <div className="absolute left-0 w-64 bg-white text-gray-800 rounded-md shadow-lg mt-2 p-4 z-50 space-y-4">
                <Link href="/insurance" className="block hover:text-red-600">
                  <div className="flex items-start space-x-2">
                    <span>🛡️</span>
                    <div>
                      <p className="font-semibold">Insurance</p>
                      <p className="text-xs text-gray-600">
                        Explore postal life and accident insurance schemes.
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="/tracking" className="block hover:text-red-600">
                  <div className="flex items-start space-x-2">
                    <span>📦</span>
                    <div>
                      <p className="font-semibold">Tracking</p>
                      <p className="text-xs text-gray-600">Track articles</p>
                    </div>
                  </div>
                </Link>

                <Link href="/gds-corner" className="block hover:text-red-600">
                  <div className="flex items-start space-x-2">
                    <span>👨‍💼</span>
                    <div>
                      <p className="font-semibold">GDS Corner</p>
                      <p className="text-xs text-gray-600">
                        Access important tools and resources for GDS employees.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              path === "/blog"
                ? "bg-red-100 text-red-700 shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
            }`}
          >
            Blog
          </Link>

          {/* Language Switch - Desktop Only */}
          <div className="border-l border-red-400 pl-4 ml-4 flex space-x-2 text-xs">
            <button
              onClick={() => switchLanguage("en")}
              className={`px-2 py-1 rounded-full ${
                currentLang === "en"
                  ? "bg-red-600 text-white"
                  : "hover:bg-red-100 text-gray-700"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLanguage("hi")}
              className={`px-2 py-1 rounded-full ${
                currentLang === "hi"
                  ? "bg-red-600 text-white"
                  : "hover:bg-red-100 text-gray-700"
              }`}
            >
              HI
            </button>
          </div>
        </nav>

        {/* Mobile: Language toggle + Hamburger */}
        <div className="md:hidden flex items-center space-x-3">
          <div className="flex border border-red-300 rounded-full overflow-hidden bg-white shadow-inner text-xs">
            <button
              onClick={() => switchLanguage("EN")}
              className={`px-3 py-1 transition-all ${
                language === "EN"
                  ? "bg-red-600 text-white font-semibold"
                  : "text-red-700 hover:bg-red-100"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLanguage("HI")}
              className={`px-3 py-1 transition-all ${
                language === "HI"
                  ? "bg-red-600 text-white font-semibold"
                  : "text-red-700 hover:bg-red-100"
              }`}
            >
              HI
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md px-4 py-4 rounded-b-xl shadow-xl border-t border-red-200 text-sm font-medium space-y-2">
          <Link
            href="/schemes"
            className="block w-full rounded-lg px-4 py-2 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-200 shadow-sm"
          >
            Schemes
          </Link>
          <Link
            href="/calculator"
            className="block w-full rounded-lg px-4 py-2 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-200 shadow-sm"
          >
            Calculator
          </Link>
          <Link
            href="/tracking"
            className="block w-full rounded-lg px-4 py-2 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-200 shadow-sm"
          >
            Tracking
          </Link>
          <Link
            href="/insurance"
            className="block w-full rounded-lg px-4 py-2 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-200 shadow-sm"
          >
            Insurance
          </Link>
          <Link
            href="/gds-corner"
            className="block w-full rounded-lg px-4 py-2 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-200 shadow-sm"
          >
            GDS Corner
          </Link>
          <Link
            href="/resources"
            className="block w-full rounded-lg px-4 py-2 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-200 shadow-sm"
          >
            Educational Resources
          </Link>
          <Link
            href="/blog"
            className="block w-full rounded-lg px-4 py-2 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-200 shadow-sm"
          >
            Blog
          </Link>
        </div>
      )}
    </header>
  );
}
