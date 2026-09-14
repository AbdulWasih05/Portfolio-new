// Single source of truth for who Wasih is, outside of projects.
// Feeds the terminal (whoami, sudo hire-me) and the generated /api/me.json
// (see scripts/generate-api.ts), so the site and the API can't disagree.

export const profile = {
    name: "Abdul Wasih",
    handle: "wasih",
    role: "Full-Stack Intern",
    company: "stealth startup",
    company_details: "it's stealth. that's the whole point.",
    previously: ["Saarthi", "IJESTM", "InsForge (YC P26, open source)"],
    location: { region: "Karnataka, IN", tz: "UTC+05:30" },
    motto: "Build. Break. Ship.",
    // TODO(wasih): confirm address. The rest of the site uses buildwithwasih@gmail.com;
    // make sure hello@wasih.tech actually receives mail. Optionally add a booking link.
    email: "hello@wasih.tech",
    links: {
        github: "https://github.com/AbdulWasih05",
        linkedin: "https://linkedin.com/in/iamwasih",
    },
    status: { shipping: true, breaking_things: "on purpose", open_to: "full-stack internships" },
    stack: {
        frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Zustand"],
        backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Socket.IO", "Prisma"],
        infra: ["AWS", "Docker", "Git", "CI/CD"],
        ai: ["Gemini", "Groq", "AWS Bedrock", "Sarvam AI", "DistilBERT"],
    },
    joke: "there are 10 kinds of people: those who read JSON for fun, and those who are about to start.",
    _meta: {
        version: "1.0.0",
        rate_limit: "none. please don't test that.",
        docs: "you're reading them.",
    },
} as const;

// Project slugs featured in /api/me.json.
export const FEATURED_PROJECT_SLUGS = ["vidyutmitra", "ijestm-journal-platform", "real-estate-platform"] as const;
