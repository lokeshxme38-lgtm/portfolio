/**
 * All runtime configuration comes from Vite env vars (see .env.example).
 * Empty strings mean "not configured" — the UI then disables the related
 * action or shows an honest empty state. Nothing here is ever invented.
 */
const read = (value: string | undefined) => (value ?? "").trim();

export const env = {
  siteUrl: read(import.meta.env.VITE_SITE_URL),
  githubUsername: read(import.meta.env.VITE_GITHUB_USERNAME),
  leetcodeUsername: read(import.meta.env.VITE_LEETCODE_USERNAME),
  hackerrankUsername: read(import.meta.env.VITE_HACKERRANK_USERNAME),
  codeforcesHandle: read(import.meta.env.VITE_CODEFORCES_HANDLE),
  linkedinUrl: read(import.meta.env.VITE_LINKEDIN_URL),
  contactEmail: read(import.meta.env.VITE_CONTACT_EMAIL),
  resumeUrl: read(import.meta.env.VITE_RESUME_URL),
  formspreeEndpoint: read(import.meta.env.VITE_FORMSPREE_ENDPOINT),
} as const;

export const profileUrls = {
  github: env.githubUsername ? `https://github.com/${env.githubUsername}` : "",
  leetcode: env.leetcodeUsername ? `https://leetcode.com/u/${env.leetcodeUsername}/` : "",
  hackerrank: env.hackerrankUsername ? `https://www.hackerrank.com/profile/${env.hackerrankUsername}` : "",
  codeforces: env.codeforcesHandle ? `https://codeforces.com/profile/${env.codeforcesHandle}` : "",
  linkedin: env.linkedinUrl,
  email: env.contactEmail ? `mailto:${env.contactEmail}` : "",
  resume: env.resumeUrl,
} as const;
