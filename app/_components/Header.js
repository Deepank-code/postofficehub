"use client";

import { useState } from "react";
import {
  Book,
  BotMessageSquare,
  Briefcase,
  Calculator,
  ChevronDown,
  ConciergeBell,
  MailCheck,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Newspaper,
  Percent,
  PiggyBankIcon,
  Shield,
  ShieldCheck,
  TrendingUp,
  User2Icon,
  UserCheck2Icon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpenService, setIsOpenService] = useState(false);
  const [isOpenMore, setIsOpenMore] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo.webp"
              width={120}
              height={120}
              quality={50}
              priority
              sizes="48px"
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/schemes"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium gap-2 ${
              path === "/schemes"
                ? "bg-red-100 text-red-700 shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
            }`}
          >
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
            className={`flex items-center gap-3 space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium gap-2 ${
              path === "/interest-rates"
                ? "bg-red-100 text-red-700 shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
            }`}
          >
            <span>
              <TrendingUp size={18} />
            </span>{" "}
            Interest Rates
          </Link>
          <Link
            href="/blog"
            className={`flex items-center gap-3 space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              path === "/blog"
                ? "bg-red-100 text-red-700 shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
            }`}
          >
            <span>
              <Newspaper size={18} />
            </span>{" "}
            Blog
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpenService((prev) => !prev)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg gap-2 transition-all duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600"
            >
              <span>
                <ConciergeBell size={18} />
              </span>{" "}
              Services
            </button>
            {isOpenService && (
              <div className="absolute left-0 w-64 bg-white text-gray-800 rounded-md shadow-lg mt-2 p-4 z-50 space-y-4">
                <Link
                  href="/my-investments"
                  className="block hover:text-red-600"
                  onClick={() => setIsOpenService(false)}
                >
                  <div className="flex items-start space-x-2">
                    <span>
                      <PiggyBankIcon />
                    </span>
                    <div>
                      <p className="font-semibold">My Schemes</p>
                      <p className="text-xs text-gray-600">
                        Explore your Schemes here
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/insurance"
                  className="block hover:text-red-600"
                  onClick={() => setIsOpenService(false)}
                >
                  <div className="flex items-start space-x-2">
                    <span>
                      <ShieldCheck />
                    </span>
                    <div>
                      <p className="font-semibold">Insurance</p>
                      <p className="text-xs text-gray-600">
                        Explore postal life and accident insurance schemes.
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/tracking"
                  className="block hover:text-red-600"
                  onClick={() => setIsOpenService(false)}
                >
                  <div className="flex items-start space-x-2">
                    <span>
                      <MailCheck />
                    </span>
                    <div>
                      <p className="font-semibold">Tracking</p>
                      <p className="text-xs text-gray-600">
                        Track articles and parcels.
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/gds-corner"
                  className="block hover:text-red-600"
                  onClick={() => setIsOpenService(false)}
                >
                  <div className="flex items-start space-x-2">
                    <span>
                      <UserCheck2Icon />
                    </span>
                    <div>
                      <p className="font-semibold">GDS Corner</p>
                      <p className="text-xs text-gray-600">
                        Access tools for GDS employees.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpenMore((prev) => !prev)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg gap-2 transition-all duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600"
            >
              <span>
                <ChevronDown size={18} />
              </span>{" "}
              More...
            </button>
            {isOpenMore && (
              <div className="absolute left-0 w-40 bg-white text-gray-800 rounded-md shadow-lg mt-2 p-4 z-50 space-y-4">
                <Link
                  href="/faq"
                  className="flex gap-2 hover:text-red-600 items-center 
                  "
                  onClick={() => setIsOpenMore(false)}
                >
                  <BotMessageSquare size={16} />
                  <span>FAQ</span>
                </Link>
                <Link
                  href="/privacy-policy"
                  className="flex gap-2 hover:text-red-600"
                  onClick={() => setIsOpenMore(false)}
                >
                  <Shield size={16} />
                  <span> Privacy Policy</span>
                </Link>
                <Link
                  href="/about-us"
                  className="flex gap-2 hover:text-red-600"
                  onClick={() => setIsOpenMore(false)}
                >
                  <User2Icon size={16} />
                  <span> About Us</span>
                </Link>
                <Link
                  href="/contact-us"
                  className="flex gap-2 hover:text-red-600"
                  onClick={() => setIsOpenMore(false)}
                >
                  <MessageSquare size={16} />
                  <span>Contact Us</span>
                </Link>
              </div>
            )}
          </div>

          {/* Language Switch */}
          {/* <div className="border-l border-red-400 pl-4 ml-4 flex space-x-2 text-xs">
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
          </div> */}
        </nav>

        <div className="md:hidden flex items-center space-x-3">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md px-4 py-4 rounded-b-xl shadow-xl border-t border-red-200 text-sm font-medium space-y-2">
          {[
            { icon: Shield, href: "/interest-rates", label: "Interest rates" },
            { icon: Shield, href: "/insurance", label: "Insurance" },

            { icon: Newspaper, href: "/blog", label: "Blog" },
            { icon: User2Icon, href: "/gds-corner", label: "GDS Corner" },
          ].map((item) => {
            let Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex gap-2 w-full rounded-lg px-4 py-2 text-red-700 hover:bg-red-50 hover:text-red-800 transition-all duration-200 shadow-sm"
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
