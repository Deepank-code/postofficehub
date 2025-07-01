import { getGDSCornerContent } from "@/lib/getGDSCornerContent";
import GDSTabs from "../_components/GDSTabs";
export const metadata = {
    title:
      "GDS Corner - Tools, Salary, Leave Rules & Resources for GDS BPM/ABPM | Post Office Hub",
    description:
      "Access GDS Corner for Gramin Dak Sevaks (GDS), BPM, and ABPM: salary details, leave rules, tools, forms, and latest updates to simplify your daily India Post work on Post Office Hub.",
    keywords:
      "GDS Corner, GDS BPM, GDS ABPM, Gramin Dak Sevak Salary, GDS Leave Rules, India Post GDS Tools, GDS Forms, GDS Updates, Post Office Hub",
    openGraph: {
      title:
        "GDS Corner - Tools, Salary, Leave Rules & Resources for GDS BPM/ABPM",
      description:
        "Visit GDS Corner for salary updates, leave rules, forms, and essential tools designed for Gramin Dak Sevaks (GDS), BPM, and ABPM on Post Office Hub.",
      url: "https://postofficehub.in/gds-corner",
      siteName: "Post Office Hub",
      images: [
        {
          url: "https://postofficehub.in/og-gds-corner.png", // Replace with your uploaded OG image
          width: 1200,
          height: 630,
          alt: "GDS Corner - Post Office Hub",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "GDS Corner - Salary, Leave Rules & Tools for GDS BPM/ABPM",
      description:
        "Post Office Hub's GDS Corner provides leave rules, salary details, forms, and helpful tools for Gramin Dak Sevaks (GDS), BPM, and ABPM in India Post.",
      images: ["https://postofficehub.in/og-gds-corner.png"],
      creator: "@PostOfficeHub",
    },
  };
export default function GDSCornerPage() {
  const notifications = getGDSCornerContent("notifications");
  const resources = getGDSCornerContent("resources");
  

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <div className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-12 px-4 text-center shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">📬 GDS Corner</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Your one-stop hub for Gramin Dak Sevaks to access official
          notifications, downloadable resources, and essential tools to stay
          informed and manage your work efficiently under India Post.
        </p>
      </div>
      <GDSTabs notifications={notifications} resources={resources} />
    </div>
  );
}
