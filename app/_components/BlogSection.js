// app/components/BlogSection.js

"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight, Search } from "lucide-react";

export default function BlogSection({ blogPosts }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const blogCategories = [
    "All",
    ...new Set(blogPosts.map((post) => post.metadata.category)),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.metadata.category === selectedCategory;
    const matchesSearch =
      post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.metadata.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.metadata.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Search and Filter Section */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for investment strategies, scheme guides, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-700 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-8">
        <p className="text-gray-600 text-lg">
          Showing {filteredPosts.length} comprehensive article
          {filteredPosts.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
                  {post.metadata.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 leading-tight">
                {post.metadata.title}
              </h2>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                {post.metadata.excerpt}
              </p>
              <div className="flex items-center text-xs text-gray-500 mb-6 space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>
                    {new Date(post.metadata.formattedDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{post.metadata.readTime}</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {post.metadata.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 bg-gray-50 text-gray-600 text-xs px-3 py-1 rounded-full border"
                    >
                      <Tag size={10} />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold text-sm group hover:shadow-lg transition-all duration-300"
              >
                Read Complete Guide
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🔍</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            No Articles Found
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            Try adjusting your search criteria or explore different categories
            to find relevant financial guidance.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
