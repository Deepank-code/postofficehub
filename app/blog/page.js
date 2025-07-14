// import { getAllBlogPosts } from "@/lib/getBlogPosts";
// import Link from "next/link";
// import { ArrowRight, Calendar, Clock, Star } from "lucide-react";
// import Image from "next/image";

// import { notFound } from "next/navigation";
// import BlogSection from "../_components/BlogSection";

// export const metadata = {
//   title:
//     "Post Office Hub Blog - Guides on RD, TD, SSA, GDS & India Post Services",
//   description:
//     "Explore detailed blogs on Post Office schemes (RD, TD, SSA, PPF), GDS corner, tracking, PLI/RPLI insurance, and India Post financial awareness guides on Post Office Hub.",
//   keywords:
//     "Post Office Blog, India Post Guides, GDS Articles, RD Guide, TD Guide, SSA Guide, PPF Guide, Post Office Hub",
//   openGraph: {
//     title: "Post Office Hub Blog - Latest Guides & Updates",
//     description:
//       "Stay updated with the latest articles and guides on India Post services, including RD, TD, SSA, PPF, MIS, GDS salary updates, and tracking tips on Post Office Hub.",
//     url: "https://postofficehub.in/blog",
//     siteName: "Post Office Hub",
//     images: [
//       {
//         url: "https://postofficehub.in/logo.png",
//         width: 1200,
//         height: 630,
//         alt: "Post Office Hub Blog",
//       },
//     ],
//     locale: "en_IN",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Post Office Hub Blog - India Post Schemes, GDS, Tracking Guides",
//     description:
//       "Discover guides on India Post schemes, GDS rules, PLI/RPLI insurance, and tracking articles on Post Office Hub for your financial awareness and planning.",
//     images: ["https://postofficehub.in/logo.png"],
//     creator: "@PostOfficeHub",
//   },
// };

// const POSTS_PER_PAGE = 6;

// export async function generateStaticParams() {
//   const allPosts = await getAllBlogPosts();
//   const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

//   return Array.from({ length: totalPages }, (_, idx) => ({
//     page: (idx + 1).toString(),
//   }));
// }

// export default async function BlogPage({ params }) {
//   const page = parseInt(params.page, 10);
//   const allPosts = await getAllBlogPosts();

//   // Sort featured first, then by date
//   const sortedPosts = allPosts.sort((a, b) => {
//     if (a.metadata.featured === b.metadata.featured) {
//       return (
//         new Date(b.metadata.formattedDate) - new Date(a.metadata.formattedDate)
//       );
//     }
//     return a.metadata.featured ? -1 : 1;
//   });

//   const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
//   const start = POSTS_PER_PAGE * (page - 1);
//   const end = start + POSTS_PER_PAGE;
//   const displayedPosts = sortedPosts.slice(start, end);

//   if (displayedPosts.length === 0) notFound();

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
//       {/* Banner */}
//       <section className="relative overflow-hidden text-white py-20">
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
//         <div className="absolute inset-0 bg-black opacity-25"></div>
//         <div className="container mx-auto px-4 text-center relative z-10">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
//             Post Office Hub Blog
//           </h1>
//           <p className="max-w-2xl mx-auto text-purple-100 text-lg sm:text-xl">
//             Insights & Strategies for maximizing your Post Office investments.
//           </p>
//         </div>
//       </section>

//       {/* Blog Grid */}
//       <div className="container mx-auto px-4 py-12">
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
//           {page === 1
//             ? "Featured & Latest Articles"
//             : `Articles - Page ${page}`}
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//           {displayedPosts.map((post) => (
//             <article
//               key={post.slug}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-[1.02] overflow-hidden"
//             >
//               <div className="relative h-48 w-full">
//                 {post.metadata.image ? (
//                   <Image
//                     src={post.metadata.image}
//                     alt={post.metadata.title}
//                     fill
//                     className="object-cover"
//                     priority
//                   />
//                 ) : (
//                   <div className="bg-gradient-to-br from-purple-400 to-pink-400 w-full h-full" />
//                 )}
//                 {post.metadata.featured && (
//                   <span className="absolute top-2 left-2 bg-white text-purple-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow">
//                     <Star size={12} /> Featured
//                   </span>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-bold mb-2 line-clamp-2">
//                   {post.metadata.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                   {post.metadata.excerpt}
//                 </p>
//                 <div className="flex justify-between items-center text-xs text-gray-500">
//                   <div className="flex gap-3">
//                     <span className="flex items-center gap-1">
//                       <Calendar size={12} />
//                       {new Date(post.metadata.formattedDate).toLocaleDateString(
//                         "en-GB",
//                         {
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         }
//                       )}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Clock size={12} /> {post.metadata.readTime}
//                     </span>
//                   </div>
//                   <Link
//                     href={`/blog/${post.slug}`}
//                     className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
//                   >
//                     Read More <ArrowRight size={12} />
//                   </Link>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-10 space-x-2">
//             {Array.from({ length: totalPages }).map((_, idx) => (
//               <Link
//                 key={idx}
//                 href={`/blog/page/${idx + 1}`}
//                 className={`px-4 py-2 rounded border ${
//                   idx + 1 === page
//                     ? "bg-purple-600 text-white border-purple-600"
//                     : "bg-white text-purple-600 border-gray-300 hover:bg-purple-50"
//                 }`}
//               >
//                 {idx + 1}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Optional: Recent blogs carousel/section */}
//       <BlogSection blogPosts={allPosts} />
//     </div>
//   );
// }
import { redirect } from "next/navigation";

export const metadata = {
  title: "Post Office Hub Blog - Guides, Tips, Updates",
  description:
    "Explore guides, tips, and the latest updates on India Post schemes, GDS, RD, TD, SSA, PPF, and more on Post Office Hub Blog.",
};

export default function BlogHomePage() {
  redirect("/blog/page/1");
}
