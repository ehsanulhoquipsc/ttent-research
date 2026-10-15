// Site-wide settings. Edit these, no code knowledge needed.
export default {
  name: "tTENT",
  tagline: "Conducting from Interior",
  description: "Independent, non-profit research from tTENT, free to read in English and Bangla.",
  url: "https://example.netlify.app", // change to your real domain once it is live
  contactEmail: "[contact email]",
  workspaceUrl: "https://ctent.onrender.com",

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
