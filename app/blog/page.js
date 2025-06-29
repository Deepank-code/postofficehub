import { getAllBlogPosts } from "@/lib/getBlogPosts";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  Star,
  Tag,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import BlogSection from "../_components/BlogSection";

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  const blogCategories = [
    "All",
    ...new Set(blogPosts.map((p) => p.metadata.category)),
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <section className="relative overflow-hidden text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black opacity-25"></div>

        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-24 h-24 bg-white opacity-10 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-300 opacity-15 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-pink-300 opacity-20 rounded-full blur-md"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Financial Wisdom Hub
          </h1>
          <p className="text-xl text-purple-100 max-w-4xl mx-auto mb-8 leading-relaxed">
            Expert insights, comprehensive guides, and actionable strategies for
            maximizing your Post Office investments. Stay informed with the
            latest updates on schemes, interest rates, and financial planning
            techniques.
          </p>
          <div className="flex items-center justify-center space-x-8 text-purple-200">
            <div className="flex items-center space-x-2">
              <TrendingUp size={20} />
              <span>Latest Market Trends</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={20} />
              <span>Expert Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye size={20} />
              <span>Practical Insights</span>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        {/* expirement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-48 relative overflow-hidden rounded-t-2xl">
                  {post.metadata.image ? (
                    <Image
                      width={200}
                      src={post.metadata.image}
                      height={200}
                      alt={post.metadata.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                  )}
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
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
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>
                          {new Date(post.metadata.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
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
        </section>
        <BlogSection blogPosts={blogPosts} />
      </div>
    </div>
  );
}
