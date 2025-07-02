"use client";

import { useState } from "react";
import {
  Download,
  FileText,
  Video,
  Info,
  Bell,
  Settings,
  BookOpen,
  Clock,
  DownloadCloudIcon,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 4;
const notifications = [
  {
    id: 1,
    title: "📢 Salary Revision Notice",
    priority: "High",
    description:
      "All GDS employees are informed about the new salary revision effective from next month. Click to read in detail.",
    date: "2024-06-25", // Added date for potential sorting/display
  },
  {
    id: 2,
    title: "🧥 New Uniform Guidelines",
    priority: "Medium",
    description:
      "Instructions on new uniform distribution for GDS staff. Click to view complete guidelines.",
    date: "2024-06-20",
  },
  {
    id: 3,
    title: "📆 Annual Leave Application Deadline",
    priority: "Low",
    description:
      "Reminder for submitting your annual leave application before the cutoff date.",
    date: "2024-06-15",
  },
  {
    id: 4,
    title: "📈 Performance Review Schedule",
    priority: "Medium",
    description:
      "Details regarding the upcoming annual performance reviews for all GDS staff.",
    date: "2024-06-10",
  },
  {
    id: 5,
    title: "💉 Health Camp Announcement",
    priority: "Low",
    description:
      "Free health check-up camp organized for GDS employees and their families.",
    date: "2024-06-05",
  },
];
const resources = [
  {
    id: 1,
    title: "📄 GDS Leave Application Form",
    type: "forms",
    description: "Official form for applying leave as a Gramin Dak Sevak.",
    format: "pdf",
    link: "/downloads/gds-leave-application-form.pdf",
  },
  {
    id: 2,
    title: "📘 Rural Postal Services Guide",
    type: "guides",
    description:
      "Comprehensive guide for providing postal services in rural areas.",
    format: "pdf",
    link: "/downloads/rural-postal-services-guide.pdf",
  },
  {
    id: 3,
    title: "🎥 Digital Services Training Video",
    type: "training",
    description: "Step-by-step training on new digital postal services.",
    format: "video",
    link: "/videos/digital-services-training.mp4",
  },
  {
    id: 4,
    title: " GDS Salary Calculation Method",
    type: "article",
    description: "How to calculate GDS salary and allowances accurately.",
    format: "article",
    link: "/articles/gds-salary-calculation-method",
  },
  {
    id: 5,
    title: "📜 Code of Conduct for GDS",
    type: "forms",
    description:
      "Guidelines outlining professional behavior and ethics for GDS.",
    format: "pdf",
    link: "/downloads/gds-code-of-conduct.pdf",
  },
];

const getResourceIcon = (format) => {
  switch (format) {
    case "pdf":
    case "xlsx":
      return <FileText size={20} />;
    case "video":
      return <Video size={20} />;
    case "article":
      return <BookOpen size={20} />;
    default:
      return <Info size={20} />;
  }
};
const GDSTabs = ({ notifications }) => {
  const [activeTab, setActiveTab] = useState("notifications");

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const priorityColors = {
    High: "border-red-500 bg-red-50 text-red-700",
    Medium: "border-yellow-500 bg-yellow-50 text-yellow-700",
    Low: "border-green-500 bg-green-50 text-green-700",
  };

  const priorityTagColors = {
    High: "bg-red-200 text-red-800",
    Medium: "bg-yellow-200 text-yellow-800",
    Low: "bg-green-200 text-green-800",
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-wrap justify-center gap-4 mb-10 p-2 bg-white rounded-full shadow-lg border border-gray-200">
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
            activeTab === "notifications"
              ? "bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-md transform scale-105"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Bell size={20} /> Notifications
        </button>
        {/* <button
          onClick={() => setActiveTab("resources")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
            activeTab === "resources"
              ? "bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-md transform scale-105"
              : "text-gray-700 hover:bg-gray-100" // Changed dark:text-gray-200 to text-gray-700 and dark:hover:bg-gray-700 to hover:bg-gray-100
          }`}
        >
          <Download size={20} /> Resources
        </button> */}
        {/* tools button */}
        {/* <button
          onClick={() => setActiveTab("tools")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
            activeTab === "tools"
              ? "bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-md transform scale-105"
              : "text-gray-700 hover:bg-gray-100" // Changed dark:text-gray-200 to text-gray-700 and dark:hover:bg-gray-700 to hover:bg-gray-100
          }`}
        >
          <Settings size={20} /> Tools
        </button> */}
      </div>

      {/* Content Area with AnimatePresence */}
      <AnimatePresence mode="wait">
        {activeTab === "notifications" && (
          <motion.div
            key="notifications"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {paginatedNotifications.map((note, idx) => {
              const formattedDate = new Date(note.date).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              );
              console.log(note.slug);
              return (
                <motion.div
                  key={note.title + note.date + idx}
                  className={`bg-white p-6 rounded-xl border border-gray-200 shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                    priorityColors[note.priority].split(" ")[0]
                  } ${priorityColors[note.priority].split(" ")[1]}`} // Removed dark:bg-gray-800 and dark:border-gray-700
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      {" "}
                      {/* Changed dark:text-white to text-gray-800 */}
                      <Bell size={20} className="text-red-500" /> {note.title}
                    </h3>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        priorityTagColors[note.priority]
                      }`}
                    >
                      {note.priority} Priority
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {" "}
                    {/* Changed dark:text-gray-300 to text-gray-600 */}
                    {note.description}
                  </p>
                  <div className="flex justify-between items-center text-gray-500 text-xs">
                    {" "}
                    {/* Changed dark:text-gray-400 to text-gray-500 */}
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{formattedDate}</span>
                    </div>
                    <a
                      href={`gds-corner/notifications/${note.slug}`} // Replace with actual link
                      className="inline-block bg-red-600 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                    >
                      View Details
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* {activeTab === "resources" && (
          <motion.div
            key="resources"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {resources.map((res) => (
              <motion.div
                key={res.id}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]" // Removed dark:bg-gray-800 and dark:border-gray-700
              >
                <div className="flex items-center gap-3 mb-3 text-red-600">
                  {getResourceIcon(res.format)}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {res.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{res.description}</p>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md"
                >
                  <DownloadCloudIcon size={16} className="mr-2" />
                  {res.format === "article" ? "Read Article" : "Download"}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )} */}

        {/* {activeTab === "tools" && (
          <motion.div
            key="tools"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-xl text-center text-gray-700 border border-gray-200 flex flex-col items-center justify-center min-h-[300px]" // Removed dark classes
          >
            <Settings size={48} className="text-red-500 mb-4 animate-pulse" />
            <p className="text-xl font-semibold mb-2 text-gray-800">
              {" "}
          
              🛠️ Tools Section Coming Soon!
            </p>
            <p className="max-w-md text-sm text-gray-600">
    
              We&apos;re actively developing GDS calculators, tracking
              utilities, and more. Stay tuned for exciting updates to boost your
              productivity!
            </p>
          </motion.div>
        )} */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from(
            { length: Math.ceil(notifications.length / ITEMS_PER_PAGE) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default GDSTabs;
