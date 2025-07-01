import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 text-gray-800 p-4">
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
        <Loader2 className="animate-spin text-red-600" size={64} />{" "}
        {/* Basic spinning loader */}
      </div>

      {/* Loading Text */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-wide animate-pulse">
        Post Office Hub
      </h2>
      <p className="text-xl text-red-700 font-medium">Loading Data...</p>
    </div>
  );
}
