import { notFound } from "next/navigation";
import { getGDSCornerContent } from "@/lib/getGDSCornerContent";
import markdownToHtml from "@/lib/markdownToHtml";
import { Calendar, Bell, Tag, Megaphone } from "lucide-react";

// ✅ Use async for static params generation
export async function generateStaticParams() {
  const posts = await getGDSCornerContent("notifications");
  return posts.map((post) => ({ slug: post.slug }));
}

// ✅ Use async + await in generateMetadata
export async function generateMetadata({ params }) {
  const posts = await getGDSCornerContent("notifications");
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Notification Not Found - Post Office Hub",
      description: "The notification you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NotificationPage({ params }) {
  const posts = await getGDSCornerContent("notifications");
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 flex items-start gap-4">
            <Megaphone size={40} className="text-white shrink-0" />
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-base text-yellow-100 mt-2">{post.excerpt}</p>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="px-8 py-4 flex flex-wrap gap-6 text-sm text-gray-600 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-yellow-600" />
              <span>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-yellow-600" />
              <span>{post.status || "Notification"}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 bg-white">
            <div
              className="prose sm:prose-lg lg:prose-xl max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:my-1 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="px-8 pb-6 flex flex-wrap gap-3 bg-white">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm px-4 py-1.5 rounded-full border border-yellow-300"
                >
                  <Tag size={14} className="mr-1" />#{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 max-w-2xl mx-auto">
          For GDS employees: Stay updated with official India Post
          notifications. Always verify details with your division office or the
          official India Post website.
        </div>
      </div>
    </div>
  );
}
