import Image from "next/image";
import InsuranceTabs from "../_components/InsuranceTabs";
export const metadata = {
  title:
    "Post Office Insurance (PLI & RPLI) - Plans, Benefits & Interest Rates | Post Office Hub",
  description:
    "Explore Post Office Insurance (PLI & RPLI) plans, their interest rates, features, eligibility, and benefits. Get a complete guide on securing your future with government-backed postal insurance schemes.",
  keywords:
    "Post Office Insurance, PLI, RPLI, Postal Life Insurance, Rural Postal Life Insurance, PLI Interest Rate, PLI Plans, RPLI Plans, Post Office Hub",
  openGraph: {
    title:
      "Post Office Insurance (PLI & RPLI) - Plans, Benefits & Interest Rates",
    description:
      "Discover the benefits, eligibility, and current interest rates of Postal Life Insurance (PLI) and Rural Postal Life Insurance (RPLI) on Post Office Hub.",
    url: "https://postofficehub.in/insurance",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/post-insu.png", // upload your PLI/RPLI themed OG image
        width: 1200,
        height: 630,
        alt: "Post Office Insurance PLI RPLI Guide",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Post Office Insurance (PLI & RPLI) - Plans & Benefits | Post Office Hub",
    description:
      "Learn everything about Postal Life Insurance (PLI) and Rural Postal Life Insurance (RPLI) including plans, benefits, eligibility, and interest rates at Post Office Hub.",
    images: ["https://postofficehub.in/post-insu.png"],
    creator: "@PostOfficeHub",
  },
};
const Insurance = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Page Header */}
      <section
        className="bg-gradient-to-r from-red-600 to-yellow-500
 text-white py-12"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center flex-col gap-4 space-x-3 mb-4">
            <div>
              <Image
                src={"/post-parcell.png"}
                alt={"parcel"}
                width={300}
                height={300}
                quality={80} // Slightly higher quality for sharper images
                priority
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold">Post Office Insurance</h1>
          </div>
          <p className="text-xl mb-6">
            PLI & RPLI - Secure Your Future with Government-Backed Insurance
          </p>
        </div>
      </section>
      <InsuranceTabs />
    </div>
  );
};

export default Insurance;
