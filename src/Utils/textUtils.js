/**
 * Utility functions for text processing and HTML stripping.
 */

export const stripHtml = (html) => {
  if (!html) return "";
  if (typeof html !== "string") return String(html);
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/(h[1-6]|p|li|blockquote|div)>/gi, ' ')
    .replace(/<br\s*[/]?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
};

export const getReadingTime = (text) => {
  const clean = stripHtml(text);
  if (!clean) return "1 min read";
  const words = clean.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
};

/**
 * Extracts a clean, readable prose excerpt for story cards from rich Tiptap HTML.
 * Filters out raw code blocks, headings, quotes, and list structures so feed cards
 * don't look clustered with code or heading artifacts.
 */
export const getPostExcerpt = (html, maxLength = 140) => {
  if (!html) return "";
  if (typeof html !== "string") return String(html).slice(0, maxLength);

  // 1. Remove code blocks, scripts, and styles completely from teaser
  let clean = html
    .replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, '')
    .replace(/<code[^>]*>[\s\S]*?<\/code>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // 2. Try to extract clean prose from paragraph tags (<p>)
  const paragraphMatches = clean.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  let text = "";

  if (paragraphMatches && paragraphMatches.length > 0) {
    for (const p of paragraphMatches) {
      const pText = p
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

      if (pText) {
        text += (text ? " " : "") + pText;
        if (text.length >= maxLength) break;
      }
    }
  }

  // 3. Fallback for content without <p> tags (legacy plain text or other tags)
  if (!text) {
    text = clean
      .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, '')
      .replace(/<blockquote[^>]*>[\s\S]*?<\/blockquote>/gi, '')
      .replace(/<\/(li|div)>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  // 4. Final fallback if text was only in headings/quotes
  if (!text.trim()) {
    text = stripHtml(clean);
  }

  text = text.replace(/\s+/g, ' ').trim();

  // Truncate cleanly at whole word
  if (text.length > maxLength) {
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 60 ? truncated.substring(0, lastSpace) : truncated) + '...';
  }

  return text;
};
