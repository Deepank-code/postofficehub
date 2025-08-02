import { permanentRedirect } from "next/navigation";

export const metadata = {
  title: "Post Office Hub Blog - Guides, Tips, Updates",
  description:
    "Explore guides, tips, and the latest updates on India Post schemes, GDS, RD, TD, SSA, PPF, and more on Post Office Hub Blog.",
  alternates: {
    canonical: "https://postofficehub.in/blog/page/1/",
  },
};

export default function BlogHomePage() {
  permanentRedirect("/blog/page/1/");
}
