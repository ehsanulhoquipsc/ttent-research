// Bangla editions: src/reports/bn/<name>.md  ->  /bn/reports/<name>/
// Use the SAME file name as the English report so the two are linked.
export default {
  lang: "bn",
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : `/bn/reports/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
    altEn: (data) => `/reports/${data.page.fileSlug}/`,
  },
};
