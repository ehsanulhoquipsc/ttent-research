// Site-wide settings. Edit these, no code knowledge needed.
export default {
  name: "tTENT",
  tagline: "Conducting from Interior",
  description: "Independent, non-profit research from tTENT, free to read in English and Bangla.",
  url: "https://example.netlify.app", // change to your real domain once it is live
  contactEmail: "[contact email]",
  workspaceUrl: "https://ctent.onrender.com",

  // Used in the legal pages. Fill these in before launch.
  legal: {
    entityName: "[Legal entity name, e.g. tTENT Research Inc.]",
    abn: "[ABN]",
    address: "[Postal address]",
    jurisdiction: "New South Wales, Australia",
    lastUpdated: "2026-10-16",
    contentLicence: {
      name: "Creative Commons Attribution 4.0 International",
      short: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
    },
  },

  // Footer and legal sidebar
  legalPages: [
    { name: "Privacy policy", url: "/privacy/" },
    { name: "Terms of use", url: "/terms/" },
    { name: "Copyright & licensing", url: "/copyright/" },
    { name: "Disclaimer", url: "/disclaimer/" },
    { name: "Editorial policy", url: "/editorial-policy/" },
    { name: "Accessibility", url: "/accessibility/" },
  ],

  // Replace "#" with your real profile links
  social: [
    { name: "Facebook", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "X", url: "#" },
    { name: "LinkedIn", url: "#" },
    { name: "YouTube", url: "#" },
  ],

  // The topic of every report must match one of these names exactly
  topics: [
    {
      name: "Non-profit sector",
      slug: "non-profit-sector",
      description: "How non-profit organisations work: volunteers, funding, governance and the difference they make.",
    },
    {
      name: "Knowledge",
      slug: "knowledge",
      description: "Research on learning, scholarship and access to sources, including how tTENT itself does research.",
    },
    {
      name: "Rights & justice",
      slug: "rights-justice",
      description: "Fair treatment at work, in law and in society, and what the evidence says about closing the gaps.",
    },
    {
      name: "Community improvement",
      slug: "community-improvement",
      description: "Practical programs that help communities grow: mentoring, education and local services.",
    },
  ],
};
