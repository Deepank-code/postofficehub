import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import MobileBottomNav from "./_components/MobileBottomNav";

import StickyFooterCTA from "./_components/StickyFooterCTA";
import ConditionalFooter from "./_components/ConditionalFooter";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"], // optional: choose the weights you need
});

export const metadata = {
  title: {
    default: "Post Office Hub - India Post Schemes & Financial Calculators",
    template: "%s | Post Office Hub",
  },
  description:
    "Track India Post schemes, use RD, TD, NSC, KVP, SSA calculators, explore PLI and RPLI insurance guides, GDS Corner resources, and financial awareness on Post Office Hub.",
  keywords:
    "Post Office RD Calculator, TD Calculator, NSC, KVP, SSA, PLI, RPLI, GDS Corner, India Post Interest Rates, Financial Awareness, Post Office Schemes, Post Office Tracking",
  metadataBase: new URL("https://postofficehub.in"),
  openGraph: {
    title: "Post Office Hub - India Post Schemes & Financial Tools",
    description:
      "Explore India Post schemes, financial calculators, PLI/RPLI guides, and track interest rates easily with Post Office Hub.",
    url: "https://postofficehub.in",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Post Office Hub Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Office Hub - India Post Schemes & Financial Tools",
    description:
      "Your trusted hub for India Post calculators, PLI/RPLI guides, GDS resources, and financial awareness tools for secure planning.",
    images: ["https://postofficehub.in/og-banner.png"],
    creator: "@PostOfficeHub",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className={`${montserrat.variable} `}>
        <Header />
        {children}
        <ConditionalFooter /> <StickyFooterCTA />
        <MobileBottomNav />
      </body>
    </html>
  );
}
