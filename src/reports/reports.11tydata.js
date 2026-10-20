import fs from "node:fs";

// English reports: src/reports/<name>.md  ->  /reports/<name>/
// If src/reports/bn/<name>.md exists, it is linked as the Bangla edition.
export default {
  layout: "layouts/report.njk",
  eleventyComputed: {
    // draft: true = not published at all (no page, not in lists or search)
    permalink: (data) => (data.draft ? false : `/reports/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
    altBn: (data) =>
      data.lang !== "bn" && !data.draft && fs.existsSync(`src/reports/bn/${data.page.fileSlug}.md`)
        ? `/bn/reports/${data.page.fileSlug}/`
        : undefined,
  },
};
