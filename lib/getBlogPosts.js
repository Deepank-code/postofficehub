import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blogs");

function formatDateToString(dateString) {
  return new Date(dateString).toISOString(); // "2025-06-30T00:00:00.000Z"
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
        formattedDate: formatDateToString(data.date), // store stable ISO string
        category: data.category ?? "General",
        tags: data.tags ?? [],
        readTime: data.readTime ?? "3 min read",
        featured: data.featured ?? false,
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
      formattedDate: formatDateToString(data.date),
      category: data.category ?? "General",
      tags: data.tags ?? [],
      readTime: data.readTime ?? "3 min read",
      featured: data.featured ?? false,
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
