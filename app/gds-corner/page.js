import { getGDSCornerContent } from "@/lib/getGDSCornerContent";
import GDSTabs from "../_components/GDSTabs";

export default function GDSCornerPage() {
  const notifications = getGDSCornerContent("notifications");
  const resources = getGDSCornerContent("resources");

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <div className="w-full bg-gradient-to-r from-red-600 to-pink-500 text-white py-12 px-4 text-center shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">📬 GDS Corner</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Your one-stop hub for Gramin Dak Sevaks to access official
          notifications, downloadable resources, and essential tools to stay
          informed and manage your work efficiently under India Post.
        </p>
      </div>
      <GDSTabs notifications={notifications} resources={resources} />
    </div>
  );
}
