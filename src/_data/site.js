// Site-wide settings.
// Email, social links and the organisation's legal details are edited in the admin
// panel (doctren.com/admin -> Site settings) and stored in settings.json.
import { readFileSync } from "node:fs";

const settings = JSON.parse(readFileSync(new URL("./settings.json", import.meta.url), "utf8"));

// A value counts only when it is filled in (not empty, not a "[placeholder]", not "#")
const filled = (v) => typeof v === "string" && v.trim() !== "" && !v.trim().startsWith("[") && v.trim() !== "#";

export default {
  name: "Doctren",
  description: "Independent, non-profit research from Doctren, free to read in English and Bangla.",
  descriptionBn: "Doctren-এর স্বাধীন, অলাভজনক গবেষণা, ইংরেজি ও বাংলায় বিনামূল্যে পড়ুন।",
  url: "https://doctren.com",
  contactEmail: filled(settings.contactEmail) ? settings.contactEmail.trim() : "",

  // Used in the legal pages. Fill these in before launch.
  legal: {
    entityName: filled(settings.entityName) ? settings.entityName.trim() : "",
    abn: filled(settings.abn) ? settings.abn.trim() : "",
    address: filled(settings.address) ? settings.address.trim() : "",
    // "Doctren" or "Doctren Research Inc. (ABN 12 345 678 901)"
    operator:
      (filled(settings.entityName) ? settings.entityName.trim() : "Doctren") +
      (filled(settings.abn) ? ` (ABN ${settings.abn.trim()})` : ""),
    jurisdiction: "New South Wales, Australia",
    lastUpdated: "2026-10-20",
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

  // Only links that have been filled in are shown
  social: (settings.social || []).filter((x) => x && filled(x.name) && filled(x.url)),

  // The topic of every report must match one of these English names exactly.
  // nameBn / descriptionBn are shown on the Bangla site.
  topics: [
    {
      name: "Non-profit sector",
      nameBn: "অলাভজনক খাত",
      slug: "non-profit-sector",
      description: "How non-profit organisations work: volunteers, funding, governance and the difference they make.",
      descriptionBn: "অলাভজনক প্রতিষ্ঠান কীভাবে কাজ করে: স্বেচ্ছাসেবক, অর্থায়ন, পরিচালনা এবং তাদের কাজের প্রভাব।",
    },
    {
      name: "Knowledge",
      nameBn: "জ্ঞান",
      slug: "knowledge",
      description: "Research on learning, scholarship and access to sources, including how Doctren itself does research.",
      descriptionBn: "শিক্ষা, গবেষণাচর্চা ও তথ্যসূত্রে প্রবেশাধিকার নিয়ে গবেষণা, Doctren নিজে কীভাবে গবেষণা করে তাসহ।",
    },
    {
      name: "Rights & justice",
      nameBn: "অধিকার ও ন্যায়বিচার",
      slug: "rights-justice",
      description: "Fair treatment at work, in law and in society, and what the evidence says about closing the gaps.",
      descriptionBn: "কর্মক্ষেত্রে, আইনে ও সমাজে ন্যায্য আচরণ, এবং ব্যবধান কমাতে প্রমাণ কী বলে।",
    },
    {
      name: "Health",
      nameBn: "স্বাস্থ্য",
      slug: "health",
      description: "Public health and wellbeing: what the evidence says about everyday health problems and how communities can respond.",
      descriptionBn: "জনস্বাস্থ্য ও সুস্থতা: দৈনন্দিন স্বাস্থ্য সমস্যা নিয়ে প্রমাণ কী বলে, আর সমাজ কীভাবে সাড়া দিতে পারে।",
    },
    {
      name: "Community improvement",
      nameBn: "সমাজ উন্নয়ন",
      slug: "community-improvement",
      description: "Practical programs that help communities grow: mentoring, education and local services.",
      descriptionBn: "সমাজকে এগিয়ে নেওয়ার বাস্তব উদ্যোগ: মেন্টরিং, শিক্ষা ও স্থানীয় সেবা।",
    },
  ],
};
