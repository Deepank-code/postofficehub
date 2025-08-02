export const metadata = {
  title:
    "Post Office Calculators - RD, TD, SSA, PPF, MIS Tools | Post Office Hub",
  description:
    "Calculate Post Office RD, TD, SSA, PPF, and MIS returns easily using our accurate, user-friendly online calculators on Post Office Hub. Plan and track your India Post savings efficiently.",
  keywords:
    "Post Office Calculator, RD Calculator, TD Calculator, SSA Calculator, PPF Calculator, MIS Calculator, India Post Interest Calculator, Post Office Hub",
  openGraph: {
    title: "Post Office Calculators - RD, TD, SSA, PPF Tools",
    description:
      "Free online calculators for Post Office RD, TD, SSA, PPF, MIS, and other India Post schemes on Post Office Hub. Plan your investments with accurate interest calculations.",
    url: "https://postofficehub.in/calculators/",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/post-cal.webp",
        width: 1200,
        height: 630,
        alt: "Post Office Calculators - Post Office Hub",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Office Calculators - Calculate RD, TD, SSA, PPF Returns",
    description:
      "Use Post Office Hub's calculators for RD, TD, SSA, PPF, and MIS to plan your savings effectively with accurate maturity and interest calculations.",
    images: ["https://postofficehub.in/post-cal.webp"],
    creator: "@PostOfficeHub",
  },
  alternates: {
    canonical: "https://postofficehub.in/calculators/",
  },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
