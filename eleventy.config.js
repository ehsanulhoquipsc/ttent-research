import site from "./src/_data/site.js";

const slug = (html) =>
  String(html)
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9ঀ-৿]+/g, "-")
    .replace(/^-|-$/g, "");

const locale = (lang) => (lang === "bn" ? "bn-BD" : "en-AU");

export default function (eleventyConfig) {
  // Copy static files straight to the output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/files");
  // Admin panel (Sveltia CMS) is copied as-is, not built as a page
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/admin/**");

  // English reports, newest first. Every report starts in English.
  eleventyConfig.addCollection("reports", (api) =>
    api
      .getFilteredByGlob("src/reports/*.md")
      .filter((r) => !r.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  // Bangla editions live in src/reports/bn/ with the same file name as the English report
  eleventyConfig.addCollection("reportsBn", (api) =>
    api.getFilteredByGlob("src/reports/bn/*.md").filter((r) => !r.data.draft && r.data.permalink !== false)
  );

  // Turn reports into plain cards for lists, using the Bangla edition on Bangla pages when there is one
  eleventyConfig.addFilter("cards", (reports, lang, bnReports = []) =>
    reports.map((r) => {
      const bn = bnReports.find((b) => b.page.fileSlug === r.page.fileSlug);
      const src = lang === "bn" && bn ? bn : r;
      return {
        url: src.url,
        title: src.data.title,
        description: src.data.description,
        topic: r.data.topic,
        date: r.date,
        thumbnail: r.data.thumbnail,
        pdf: src.data.pdf || r.data.pdf,
        hasBn: Boolean(bn) || r.data.language === "bn",
        translated: lang === "bn" && (Boolean(bn) || r.data.language === "bn"),
        bnOriginal: r.data.language === "bn",
      };
    })
  );

  // "15 Oct 2026" or "১৫ অক্টোবর ২০২৬"
  eleventyConfig.addFilter("readableDate", (date, lang = "en") =>
    new Date(date).toLocaleDateString(locale(lang), {
      day: "numeric",
      month: lang === "bn" ? "long" : "short",
      year: "numeric",
      timeZone: "UTC",
    })
  );

  // "2026-10-15" for <time datetime>
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));

  // Numbers in the reader's script: 12 or ১২
  eleventyConfig.addFilter("num", (n, lang = "en") => Number(n).toLocaleString(locale(lang)));

  eleventyConfig.addFilter("year", (date, lang = "en") =>
    new Date(date).toLocaleDateString(locale(lang), { year: "numeric", timeZone: "UTC" })
  );

  // "3 reports" or "৩টি প্রতিবেদন"
  eleventyConfig.addFilter("countReports", (n, lang = "en") =>
    lang === "bn"
      ? `${Number(n).toLocaleString("bn-BD")}টি প্রতিবেদন`
      : `${n} ${n === 1 ? "report" : "reports"}`
  );

  // Topic name and description in the reader's language
  const topicFor = (name) => site.topics.find((t) => t.name === name);
  eleventyConfig.addFilter("topicName", (name, lang = "en") => {
    const t = topicFor(name);
    return lang === "bn" && t && t.nameBn ? t.nameBn : name;
  });
  eleventyConfig.addFilter("topicSlug", (name) => (topicFor(name) || {}).slug || "");

  // Reports in one topic
  eleventyConfig.addFilter("byTopic", (reports, topic) => reports.filter((r) => r.data.topic === topic));

  // Up to 3 other reports in the same topic
  eleventyConfig.addFilter("relatedTo", (reports, topic, fileSlug) =>
    reports.filter((r) => r.data.topic === topic && r.page.fileSlug !== fileSlug).slice(0, 3)
  );

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // About 200 words a minute
  eleventyConfig.addFilter("readingTime", (content, lang = "en") => {
    const words = String(content || "")
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    const mins = Math.max(1, Math.round(words / 200));
    return lang === "bn" ? `${mins.toLocaleString("bn-BD")} মিনিটে পড়া` : `${mins} min read`;
  });

  // Section ids for h2 headings: unique and never empty, same order in the contents list and the page
  const headingIds = (texts) => {
    const used = {};
    return texts.map((t, i) => {
      const base = slug(t) || `section-${i + 1}`;
      used[base] = (used[base] || 0) + 1;
      return used[base] === 1 ? base : `${base}-${used[base]}`;
    });
  };

  // Headings in a rendered report, for the contents sidebar
  eleventyConfig.addFilter("toc", (content) => {
    const texts = [...String(content || "").matchAll(/<h2>(.*?)<\/h2>/g)].map((m) => m[1]);
    const ids = headingIds(texts);
    const decode = (x) =>
      x.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
    return texts.map((t, i) => ({ id: ids[i], text: decode(t.replace(/<[^>]+>/g, "")) }));
  });

  // Give every plain h2 an id so the contents links work
  eleventyConfig.addTransform("heading-ids", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const texts = [...content.matchAll(/<h2>(.*?)<\/h2>/g)].map((m) => m[1]);
    const ids = headingIds(texts);
    let i = 0;
    return content.replace(/<h2>(.*?)<\/h2>/g, (_, text) => `<h2 id="${ids[i++]}">${text}</h2>`);
  });

  // A report written with "Heading 1" sections: shift every heading down one level,
  // so sections become h2 (the page title is the only h1) and appear in the contents list
  eleventyConfig.amendLibrary("md", (md) => {
    md.core.ruler.push("shift_headings", (state) => {
      const hasH1 = state.tokens.some((t) => t.type === "heading_open" && t.tag === "h1");
      if (!hasH1) return;
      for (const t of state.tokens) {
        if (t.type === "heading_open" || t.type === "heading_close") {
          const n = Math.min(6, Number(t.tag.slice(1)) + 1);
          t.tag = `h${n}`;
        }
      }
    });
  });

  // Drop empty entries (e.g. a blank author added in the admin panel)
  eleventyConfig.addFilter("compact", (arr) => (Array.isArray(arr) ? arr.filter((x) => x && String(x).trim()) : []));

  // Footer year = the year the site was built
  eleventyConfig.addGlobalData("buildYear", String(new Date().getFullYear()));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
