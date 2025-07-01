// /lib/markdownToHtml.js
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkGfm) // ✅ enables GFM tables, task lists, strikethrough
    .use(html)
    .process(markdown);

  return result.toString();
}
