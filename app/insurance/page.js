import Image from "next/image";
import InsuranceTabs from "../_components/InsuranceTabs";
export const metadata = {
  title:
    "Post Office Insurance (PLI & RPLI) - Plans, Benefits, Interest Rates & Forms | Post Office Hub",
  description:
    "Explore Post Office Insurance (PLI & RPLI) plans, interest rates, features, eligibility, and benefits. Download important forms for PLI and RPLI maturity, surrender, claim, and address updates easily at Post Office Hub.",
  keywords:
    "Post Office Insurance, PLI, RPLI, Postal Life Insurance, Rural Postal Life Insurance, PLI Interest Rate, PLI Plans, RPLI Plans, Post Office Hub, PLI Forms, RPLI Forms, Post Office Forms Download",
  openGraph: {
    title:
      "Post Office Insurance (PLI & RPLI) - Plans, Benefits, Interest Rates & Forms",
    description:
      "Discover benefits, eligibility, and current interest rates of Postal Life Insurance (PLI) and Rural Postal Life Insurance (RPLI). Easily download important PLI/RPLI forms for maturity, surrender, and claims at Post Office Hub.",
    url: "https://postofficehub.in/insurance",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/post-insu.png", // your PLI/RPLI themed OG image
        width: 1200,
        height: 630,
        alt: "Post Office Insurance PLI RPLI Guide and Forms Download",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Post Office Insurance (PLI & RPLI) - Plans, Benefits & Forms | Post Office Hub",
    description:
      "Learn about Postal Life Insurance (PLI) and Rural Postal Life Insurance (RPLI) plans, benefits, and rates. Download important post office forms for claims and maturity at Post Office Hub.",
    images: ["https://postofficehub.in/post-insu.png"],
    creator: "@PostOfficeHub",
  },
};

const Insurance = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
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
