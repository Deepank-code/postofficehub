"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

import SchemeCard from "./SchemeCard";
import { schemes } from "@/data/schemes";
import Image from "next/image";
const SchemeSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "tax-saving" &&
        ["ssa", "nsc", "scss"].includes(scheme.id)) ||
      (selectedCategory === "regular-income" &&
        ["mis", "scss"].includes(scheme.id)) ||
      (selectedCategory === "lump-sum" &&
        ["td", "kvp", "nsc"].includes(scheme.id)) ||
      (selectedCategory === "recurring" && ["rd"].includes(scheme.id));

    return matchesSearch && matchesCategory;
  });
  return (
    <div>
      {" "}
      <section className="bg-white shadow-sm border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="m-auto text-center mb-8">
            <div className="flex justify-center align-middle w-full">
              <Image
                src={"/post-sche.png"}
                alt={"finincial calculator"}
                width={300}
                height={300}
                quality={80} // Slightly higher quality for sharper images
                priority
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Post Office Savings Schemes
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore all government-backed savings schemes offered by India
              Post. Choose from various options based on your investment goals,
              tenure preferences, and risk appetite.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search schemes by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white appearance-none cursor-pointer"
              >
                <option value="all">All Schemes</option>
                <option value="tax-saving">Tax Saving</option>
                <option value="regular-income">Regular Income</option>
                <option value="lump-sum">Lump Sum Investment</option>
                <option value="recurring">Recurring Investment</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      {/* Schemes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredSchemes.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                  Showing {filteredSchemes.length} scheme
                  {filteredSchemes.length !== 1 ? "s" : ""}
                  {searchTerm && ` for "${searchTerm}"`}
                  {selectedCategory !== "all" &&
                    ` in ${selectedCategory.replace("-", " ")}`}
                </p>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    id={scheme.id}
                    title={scheme.title}
                    shortName={scheme.shortName}
                    description={scheme.description}
                    minAmount={scheme.minAmount}
                    tenure={scheme.tenure}
                    interestRate={scheme.interestRate}
                    icon={scheme.icon}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Schemes Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find the schemes
                you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SchemeSection;
