import fs from "node:fs";

// English (or Bangla-original) reports: src/reports/<name>.md  ->  /reports/<name>/
// If src/reports/bn/<name>.md exists and is not a draft, it is linked as the Bangla edition.
const isDraft = (file) => /^draft:\s*true\s*$/m.test(fs.readFileSync(file, "utf8").split(/^---\s*$/m)[1] || "");

export default {
  layout: "layouts/report.njk",
  eleventyComputed: {
    // draft: true = not published at all (no page, not in lists or search)
    permalink: (data) => (data.draft ? false : `/reports/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
    altBn: (data) => {
      const bn = `src/reports/bn/${data.page.fileSlug}.md`;
      return data.lang !== "bn" && !data.draft && fs.existsSync(bn) && !isDraft(bn)
        ? `/bn/reports/${data.page.fileSlug}/`
        : undefined;
    },
  },
};
