import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getGDSCornerContent(type) {
  const dirPath = path.join(process.cwd(), "content", "gds-corner", type);
  const files = fs.readdirSync(dirPath);

  const items = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(path.join(dirPath, filename), "utf-8");
    const { data, content } = matter(fileContent);
    return {
      slug,
      ...data,
      content,
    };
  });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
