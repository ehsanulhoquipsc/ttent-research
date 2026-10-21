import fs from "node:fs";

// Bangla editions: src/reports/bn/<name>.md  ->  /bn/reports/<name>/
// Use the SAME file name as the English report so the two are linked.
// A Bangla edition is only published while its English report is published.
const isDraft = (file) => /^draft:\s*true\s*$/m.test(fs.readFileSync(file, "utf8").split(/^---\s*$/m)[1] || "");
const englishLive = (slug) => {
  const en = `src/reports/${slug}.md`;
  return fs.existsSync(en) && !isDraft(en);
};

export default {
  lang: "bn",
  eleventyComputed: {
    permalink: (data) =>
      data.draft || !englishLive(data.page.fileSlug) ? false : `/bn/reports/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: (data) => Boolean(data.draft) || !englishLive(data.page.fileSlug),
    altEn: (data) => `/reports/${data.page.fileSlug}/`,
  },
};
