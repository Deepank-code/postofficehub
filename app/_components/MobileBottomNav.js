"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Book,
  Calculator,
  PackageSearch,
  MoreHorizontal,
  BellRing,
} from "lucide-react";
import MoreModal from "./MoreModal";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Schemes", href: "/schemes", icon: Book },
  { name: "Calculator", href: "/calculator", icon: Calculator },
  { name: "Tracking", href: "/tracking", icon: PackageSearch },
  // { name: "Portfolio", href: "/reminder-tool", icon: BellRing },
  {
    name: "More",
    href: "",
    icon: MoreHorizontal,
    path: null,
    isModal: true,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const handleMoreClick = () => {
    setIsMoreModalOpen(true);
  };
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow md:hidden z-50">
        <ul className="flex justify-between items-center text-sm">
          {navItems.map(({ name, href, icon: Icon, isModal }, index) => {
            const isActive = pathname === href;

            return (
              <li key={name} className="flex-1">
                <Link
                  href={href}
                  onClick={(e) => {
                    if (name === "More") {
                      e.preventDefault();
                      handleMoreClick(true);
                    }
                  }}
                  className={`flex flex-col items-center justify-center py-2 ${
                    isActive
                      ? "text-red-700 bg-red-100 font-semibold"
                      : "text-gray-600"
                  } transition`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <MoreModal
        isOpen={isMoreModalOpen}
        onClose={() => setIsMoreModalOpen(false)}
      />
    </>
  );
}
