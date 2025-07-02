import SchemeSection from "@/app/_components/SchemeSection";

export const metadata = {
  title: "Post Office Schemes - RD, TD, NSC, KVP, SSA & More",
  description:
    "Explore detailed guides on Post Office schemes including RD, TD, NSC, KVP, SSA, PLI, and RPLI. Learn interest rates, benefits, and eligibility on Post Office Hub.",
  keywords:
    "Post Office Schemes, RD, TD, NSC, KVP, SSA, PLI, RPLI, India Post Interest Rates, Post Office Hub",
  openGraph: {
    title: "Post Office Schemes - Complete Guides & Interest Rates",
    description:
      "Discover complete details on India Post schemes including Recurring Deposit, Time Deposit, NSC, KVP, SSA, PLI, and RPLI on Post Office Hub.",
    url: "https://postofficehub.in/schemes",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/og-banner.png", // replace with your image
        width: 1200,
        height: 630,
        alt: "Post Office Schemes Guide",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Office Schemes - RD, TD, NSC, KVP Guides",
    description:
      "Post Office Hub offers complete guides on RD, TD, NSC, KVP, SSA, and PLI/RPLI schemes with latest interest rates.",
    images: ["https://postofficehub.in/og-banner.png"],
    creator: "@PostOfficeHub",
  },
};
export default function Scheme() {
  return (
    <div>
      <SchemeSection />
    </div>
  );
}
