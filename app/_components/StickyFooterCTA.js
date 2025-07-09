"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function StickyTopCTA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        setDeferredPrompt(e);
        setShow(true);

        const timer = setTimeout(() => setShow(false), 60000);
        return () => clearTimeout(timer);
      }
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

  const handleClose = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white flex justify-between items-center px-4 py-3 shadow-md z-50">
      <p className="text-sm">
        📱 Install the Post Office Hub app for a faster experience.
      </p>
      <div className="flex space-x-2 items-center">
        <button
          onClick={handleInstall}
          className="bg-white text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-100 transition"
        >
          Install App
        </button>
        <button
          onClick={handleClose}
          aria-label="Close"
          className="text-white hover:text-gray-200 transition"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
