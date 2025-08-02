export const metadata = {
  title: "Track Speed Post, Parcel & Post Office Services | Post Office Hub",
  description:
    "Easily track your Speed Post, Registered Post, Parcels, and Post Office consignments using Post Office Hub. Stay updated with your shipment status, delivery updates, and postal tracking guides.",
  keywords:
    "Post Office Tracking, Speed Post Tracking, Parcel Tracking, Registered Post Tracking, India Post Tracking, Consignment Tracking, Post Office Hub",
  authors: [{ name: "Post Office Hub", url: "https://postofficehub.in" }],
  creator: "Post Office Hub",
  metadataBase: new URL("https://postofficehub.in"),
  openGraph: {
    title:
      "Post Office Tracking - Speed Post & Parcel Status | Post Office Hub",
    description:
      "Track your India Post Speed Post, Registered Post, and Parcels easily with Post Office Hub. Get accurate delivery status, updates, and postal tracking guidance.",
    url: "https://postofficehub.in/tracking",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/post-parcell.webp",
        width: 1200,
        height: 630,
        alt: "Post Office Tracking Guide",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Post Office Tracking - Speed Post & Parcel Status | Post Office Hub",
    description:
      "Track your Speed Post, Registered Post, and India Post Parcels with ease. Post Office Hub offers tracking tools and shipment updates for your postal needs.",
    images: ["https://postofficehub.in/post-parcell.webp"],
    creator: "@PostOfficeHub",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#2563eb",
  alternates: {
    canonical: "https://postofficehub.in/tracking",
  },
};

export default function TrackingLayout({ children }) {
  return <> {children}</>;
}
