"use client";

import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (isStandalone) {
      setShowFooter(false);
    }
  }, []);

  if (!showFooter) return null;

  return <Footer />;
}
