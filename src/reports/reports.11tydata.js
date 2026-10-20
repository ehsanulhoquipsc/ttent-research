import fs from "node:fs";

// English reports: src/reports/<name>.md  ->  /reports/<name>/
// If src/reports/bn/<name>.md exists, it is linked as the Bangla edition.
export default {
  layout: "layouts/report.njk",
  permalink: "/reports/{{ page.fileSlug }}/",
  eleventyComputed: {
    altBn: (data) =>
      data.lang !== "bn" && fs.existsSync(`src/reports/bn/${data.page.fileSlug}.md`)
        ? `/bn/reports/${data.page.fileSlug}/`
        : undefined,
  },
};
