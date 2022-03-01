import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export function markdownToHtml(markdown: string) {
  return DOMPurify.sanitize(marked.parse(markdown, { breaks: true }));
}
