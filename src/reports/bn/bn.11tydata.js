// Bangla editions: src/reports/bn/<name>.md  ->  /bn/reports/<name>/
// Use the SAME file name as the English report so the two are linked.
export default {
  lang: "bn",
  permalink: "/bn/reports/{{ page.fileSlug }}/",
  eleventyComputed: {
    altEn: (data) => `/reports/${data.page.fileSlug}/`,
  },
};
