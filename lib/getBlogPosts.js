import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blogs");

// consistent date formatter
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }); // "26 Jun 2025"
}

export async function getAllBlogPosts() {
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      metadata: {
        ...data,
        formattedDate: formatDate(data.date),
        category: data.category ?? "General",
        tags: data.tags ?? [],
        readTime: data.readTime ?? "3 min read",
      },
      content,
    };
  });
}

export function getPostBySlug(slug) {
  const filePath = path.join(blogDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    metadata: {
      ...data,
      formattedDate: formatDate(data.date),
      category: data.category ?? "General",
      tags: data.tags ?? [],
      readTime: data.readTime ?? "3 min read",
    },
    content,
  };
}

export function getAllBlogSlugs() {
  const files = fs.readdirSync(blogDir);
  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}
