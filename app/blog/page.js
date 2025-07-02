import { getAllBlogPosts } from "@/lib/getBlogPosts";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Star } from "lucide-react";
import Image from "next/image";
import BlogSection from "../_components/BlogSection";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = {
  title:
    "Post Office Hub Blog - Guides on RD, TD, SSA, GDS & India Post Services",
  description:
    "Explore detailed blogs on Post Office schemes (RD, TD, SSA, PPF), GDS corner, tracking, PLI/RPLI insurance, and India Post financial awareness guides on Post Office Hub.",
  keywords:
    "Post Office Blog, India Post Guides, GDS Articles, RD Guide, TD Guide, SSA Guide, PPF Guide, Post Office Hub",
  openGraph: {
    title: "Post Office Hub Blog - Latest Guides & Updates",
    description:
      "Stay updated with the latest articles and guides on India Post services, including RD, TD, SSA, PPF, MIS, GDS salary updates, and tracking tips on Post Office Hub.",
    url: "https://postofficehub.in/blog",
    siteName: "Post Office Hub",
    images: [
      {
        url: "https://postofficehub.in/og-blog.png", // replace with your uploaded OG image
        width: 1200,
        height: 630,
        alt: "Post Office Hub Blog",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Office Hub Blog - India Post Schemes, GDS, Tracking Guides",
    description:
      "Discover guides on India Post schemes, GDS rules, PLI/RPLI insurance, and tracking articles on Post Office Hub for your financial awareness and planning.",
    images: ["https://postofficehub.in/og-blog.png"],
    creator: "@PostOfficeHub",
  },
};

const POSTS_PER_PAGE = 6;

export default async function BlogPage({ searchParams }) {
  const page = parseInt(searchParams.page || "1", 10);
  const allPosts = await getAllBlogPosts();

  // Sort: featured posts first, then by date descending
  const sortedPosts = allPosts.sort((a, b) => {
    if (a.metadata.featured === b.metadata.featured) {
      return (
        new Date(b.metadata.formattedDate) - new Date(a.metadata.formattedDate)
      );
    }
    return a.metadata.featured ? -1 : 1;
  });

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const start = POSTS_PER_PAGE * (page - 1);
  const end = start + POSTS_PER_PAGE;
  const displayedPosts = sortedPosts.slice(start, end);

  if (displayedPosts.length === 0) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Banner */}
      <section className="relative overflow-hidden text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Financial Wisdom Hub
          </h1>
          <p className="text-xl text-purple-100 max-w-4xl mx-auto mb-8 leading-relaxed">
            Expert insights and actionable strategies to maximize your Post
            Office investments.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {page === 1
            ? "Featured & Latest Articles"
            : `Articles - Page ${page}`}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="h-48 relative overflow-hidden rounded-t-2xl">
                {post.metadata.image && post.metadata.image.startsWith("/") ? (
                  <Image
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    fill
                    priority
                    quality={50}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                )}
                {post.metadata.featured && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star size={14} /> Featured
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                    {post.metadata.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {post.metadata.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.metadata.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>
                        {new Date(
                          post.metadata.formattedDate
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.metadata.readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-purple-600 hover:text-purple-800 font-semibold flex items-center space-x-1 group"
                  >
                    <span>Read More</span>
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Link
                key={idx}
                href={`/blog?page=${idx + 1}`}
                className={`px-4 py-2 rounded-lg border ${
                  idx + 1 === page
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-purple-600 border-gray-300 hover:bg-purple-50"
                } transition`}
              >
                {idx + 1}
              </Link>
            ))}
          </div>
        )}
      </div>

      <BlogSection blogPosts={allPosts} />
    </div>
  );
}
