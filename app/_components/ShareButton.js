"use client";

import { Share2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function ShareButton({ title, text, url }) {
  const [canShare, setCanShare] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.share) {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    if (!url) {
      console.warn("No URL provided to ShareButton.");
      return;
    }

    if (canShare) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        console.log("Content shared successfully");
      } catch (error) {
        // User cancelled share or other error
        if (error.name !== "AbortError") {
          console.error("Error sharing content:", error);
        }
      }
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(2000)); // Hide tooltip after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy URL:", err);
        });
    }
  };

  // No conditional rendering based on currentUrl here, as props are expected
  return (
    <div className="relative">
      <button
        onClick={handleShare}
        // Gradient and shadow styling (copied from previous gradient version)
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-200 shadow-lg"
        aria-label={`Share: ${title || "this post"}`} // Improved aria-label
      >
        <Share2 size={16} />
        <span>Share Post</span> {/* Changed back to "Share Post" */}
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg whitespace-nowrap">
          Link copied!
        </div>
      )}
    </div>
  );
}
