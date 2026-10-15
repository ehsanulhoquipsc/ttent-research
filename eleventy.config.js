const slug = (html) =>
  String(html)
    .replace(/<[^>]+>/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9ঀ-৿]+/g, "-")
    .replace(/^-|-$/g, "");

export default function (eleventyConfig) {
  // Copy static files straight to the output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/files");

  // All reports, newest first
  eleventyConfig.addCollection("reports", (api) =>
    api
      .getFilteredByGlob("src/reports/*.md")
      .filter((r) => !r.data.draft && r.data.lang !== "bn") // Bangla copies link from their English report
      .sort((a, b) => b.date - a.date)
  );

  // "15 Oct 2026"
  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
  );

  // "2026-10-15" for <time datetime>
  eleventyConfig.addFilter("isoDate", (date) =>
    new Date(date).toISOString().slice(0, 10)
  );

  // Reports in one topic
  eleventyConfig.addFilter("byTopic", (reports, topic) =>
    reports.filter((r) => r.data.topic === topic)
  );

  // Up to 3 other reports in the same topic
  eleventyConfig.addFilter("relatedTo", (reports, topic, url) =>
    reports.filter((r) => r.data.topic === topic && r.url !== url).slice(0, 3)
  );

  eleventyConfig.addFilter("year", (date) => new Date(date).getUTCFullYear());

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // About 200 words a minute
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content || "")
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.round(words / 200)) + " min read";
  });

  // Headings in a rendered report, for the contents sidebar
  eleventyConfig.addFilter("toc", (content) => {
    const out = [];
    const re = /<h2>(.*?)<\/h2>/g;
    let m;
    while ((m = re.exec(String(content || "")))) {
      out.push({ id: slug(m[1]), text: m[1].replace(/<[^>]+>/g, "") });
    }
    return out;
  });

  // Give every plain h2 an id so the contents links work
  eleventyConfig.addTransform("heading-ids", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    return content.replace(/<h2>(.*?)<\/h2>/g, (_, text) => `<h2 id="${slug(text)}">${text}</h2>`);
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
