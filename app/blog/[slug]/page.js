import ShareButton from "@/app/_components/ShareButton";
import { getAllBlogSlugs, getPostBySlug } from "@/lib/getBlogPosts";
import markdownToHtml from "@/lib/markdownToHtml";
import { Calendar, Clock, Tag, Eye } from "lucide-react";

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Post Office Hub",
      description: "The requested blog post was not found on Post Office Hub.",
    };
  }

  const title = `${post.metadata.title} | Post Office Hub`;
  const description =
    post.metadata.excerpt ||
    "Read this detailed guide on Post Office Hub for India Post schemes and GDS updates.";
  const url = `https://postofficehub.in/blog/${post.metadata.slug}`; // Ensure this URL is correct and public
  const image =
    post.metadata.coverImage || "https://postofficehub.in/og-default.png";

  return {
    title,
    description,
    keywords: post.metadata.tags.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Post Office Hub",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: post.metadata.date,
      authors: [post.metadata.author || "Post Office Hub"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@PostOfficeHub",
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  const contentHtml = await markdownToHtml(post.content);

  // Define the share URL dynamically based on the current post
  const shareUrl = `https://postofficehub.in/blog/${post.metadata.slug}`;
  const shareTitle = `${post.metadata.title} | Post Office Hub`;
  const shareText =
    post.metadata.excerpt ||
    "Check out this insightful post from Post Office Hub!";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
                {post.metadata.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              {post.metadata.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.metadata.excerpt}
            </p>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-6">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-blue-500" />
                    <span>
                      Published:{" "}
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
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-green-500" />
                    <span>Reading Time: {post.metadata.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye size={16} className="text-purple-500" />
                    <span>Expert Analysis</span>
                  </div>
                </div>

                <ShareButton
                  title={shareTitle}
                  text={shareText}
                  url={shareUrl}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm px-3 py-2 rounded-full border border-gray-300 hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all"
                >
                  <Tag size={12} />
                  <span>#{tag}</span>
                </span>
              ))}
            </div>
          </header>

          <article className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Complete Investment Guide
              </h2>
              <p className="text-gray-600">
                Comprehensive analysis with actionable insights for smart
                investment decisions
              </p>
            </div>

            <div className="p-8">
              <div
                className="prose prose-lg max-w-none
                                    prose-headings:text-gray-800 prose-headings:font-bold
                                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-blue-700
                                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                                    prose-strong:text-gray-800 prose-strong:font-semibold
                                    prose-ul:my-4 prose-li:my-2 prose-li:text-gray-700
                                    prose-table:text-sm prose-table:border-collapse
                                    prose-th:bg-gray-50 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-3 prose-th:font-semibold
                                    prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-3"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>

            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>
                    This guide provides comprehensive information for
                    educational purposes. Always consult with financial advisors
                    before making investment decisions.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Helpful?</span>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      👍 Yes
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      👎 No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
