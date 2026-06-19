export function htmlToAiDocument(html, source = "") {
  const cleaned = removeNoise(html);
  const title = textOfFirst(cleaned, /<title[^>]*>([\s\S]*?)<\/title>/i) || textOfFirst(cleaned, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || source;
  const description = metaDescription(cleaned);
  const markdown = htmlToMarkdown(cleaned, title).trim() + "\n";
  return {
    source,
    title: decodeEntities(stripTags(title)).trim(),
    description,
    markdown,
  };
}

export function htmlToMarkdown(html, fallbackTitle = "") {
  const body = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(html)?.[1] ?? html;
  let text = removeNoise(body)
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, value) => `\n# ${inline(value)}\n\n`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, value) => `\n## ${inline(value)}\n\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, value) => `\n### ${inline(value)}\n\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, value) => `\n- ${inline(value)}`)
    .replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `[${inline(label)}](${href})`)
    .replace(/<(p|div|section|article|main|header|footer|br)[^>]*>/gi, "\n")
    .replace(/<\/(p|div|section|article|main|header|footer)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");

  text = decodeEntities(text)
    .split(/\r?\n/)
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!/^#\s/m.test(text) && fallbackTitle) {
    return `# ${decodeEntities(stripTags(fallbackTitle)).trim()}\n\n${text}`;
  }
  return text;
}

function removeNoise(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
}

function metaDescription(html) {
  const match = /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i.exec(html)
    ?? /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i.exec(html);
  return match ? decodeEntities(match[1]).trim() : "";
}

function textOfFirst(html, pattern) {
  return pattern.exec(html)?.[1] ?? "";
}

function inline(html) {
  return decodeEntities(stripTags(html)).replace(/\s+/g, " ").trim();
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ");
}

function decodeEntities(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}
