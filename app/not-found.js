import Link from "next/link";
import { Home } from "lucide-react"; // Using Lucide icons for consistency
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4 py-12 text-center">
      <Image
        src="/not-found.webp"
        width={500}
        height={500}
        alt="Postman looking confused near a post box, representing page not found"
        priority
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 400px"
        className="w-full max-w-xs md:max-w-sm lg:max-w-sm h-auto mb-6 rounded-4xl"
      />

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-md mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved. It might be lost in the mail!
      </p>
      <Link
        href="/"
        className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
      >
        <Home className="w-5 h-5 mr-2" />
        Go to Homepage
      </Link>
    </div>
  );
}
