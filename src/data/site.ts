// Identity and contact details shown in the page chrome (header, hero, about, footer),
// kept in one place so the wording can't drift between sections.
export const site = {
  name: 'Abdul Wasih',
  /** The canonical address; every SEO tag, the sitemap and llms.txt build URLs from it. */
  url: 'https://wasihh.tech',
  role: 'Software Engineer',
  email: 'buildwithwasih@gmail.com',
  github: 'https://github.com/AbdulWasih05',
  /** The sample agents file linked from "How I build with AI". */
  claudeMd: 'https://github.com/AbdulWasih05/Portfolio-new/blob/main/docs/sample-claude-md.md',
  linkedin: 'https://www.linkedin.com/in/iamwasih',
  x: 'https://x.com/iamwasih',
  xHandle: '@iamwasih',
  education: { degree: 'B.E. Computer Science and Engineering', school: 'AITM', graduation: '2027' },
  location: 'Bangalore, IN',
  /** One sentence used for meta descriptions and structured data. */
  summary:
    'Abdul Wasih is a software engineer in Bangalore who builds products end to end, from web apps and payments to AI features. Two startup internships, merged open-source work, and live projects.',
  timezone: 'UTC+5:30',
} as const;
