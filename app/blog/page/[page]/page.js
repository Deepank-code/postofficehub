import { getAllBlogPosts } from "@/lib/getBlogPosts";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 6;

// Generate static paths for /blog/page/1, /blog/page/2 ...
export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, idx) => ({
    page: (idx + 1).toString(),
  }));
}

export async function generateMetadata({ params }) {
  const page = params?.page ?? "1";
  return {
    title: `Post Office Hub Blog - Page ${page}`,
    description: `Read India Post scheme guides, GDS updates, and financial tips - Page ${page}`,
  };
}

export default async function BlogPage({ params }) {
  const page = parseInt(params.page, 10);

  if (isNaN(page) || page < 1) {
    notFound(); // Handle invalid pages gracefully
  }

  const allPosts = await getAllBlogPosts();

  // Sort featured first, then by date
  const sortedPosts = allPosts.sort((a, b) => {
    if (a.metadata.featured === b.metadata.featured) {
      return (
        new Date(b.metadata.formattedDate) - new Date(a.metadata.formattedDate)
      );
    }
    return a.metadata.featured ? -1 : 1;
  });

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  if (page > totalPages) {
    notFound(); // If page exceeds total pages
  }

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const displayedPosts = sortedPosts.slice(start, end);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <section className="py-10 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {page === 1 ? "Latest Articles" : `Articles - Page ${page}`}
        </h1>
        <p className="text-gray-600">
          Insights & Strategies for India Post investments.
        </p>
      </section>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {displayedPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-[1.02] overflow-hidden flex flex-col border border-gray-100"
          >
            <div className="relative h-48 w-full bg-gray-100">
              {post.metadata.image ? (
                <Image
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400" />
              )}
              {post.metadata.featured && (
                <span className="absolute top-2 left-2 bg-white text-purple-600 text-xs font-semibold px-2 py-1 rounded shadow flex items-center gap-1">
                  <Star size={12} /> Featured
                </span>
              )}
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-base font-semibold mb-2 line-clamp-2 text-gray-800">
                  {post.metadata.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.metadata.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.metadata.formattedDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.metadata.readTime}
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-full px-4 py-2 shadow hover:shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                >
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <Link
              key={idx}
              href={`/blog/page/${idx + 1}`}
              className={`px-4 py-2 border rounded ${
                idx + 1 === page
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-purple-600 border-gray-300 hover:bg-purple-50"
              }`}
            >
              {idx + 1}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
