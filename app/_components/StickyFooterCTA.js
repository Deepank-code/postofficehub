"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyFooterCTA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("PWA Installed");
      }
      setDeferredPrompt(null);
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-400  text-white flex justify-between items-center px-4 py-3 shadow-lg z-50">
      <p className="text-sm">
        Get the Post Office Hub app for a faster experience.
      </p>
      <div className="flex space-x-2">
        <button
          onClick={handleInstall}
          className="bg-white text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-100 transition"
        >
          Install App
        </button>
        <Link
          href="/contact-us"
          className="bg-white text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-100 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
